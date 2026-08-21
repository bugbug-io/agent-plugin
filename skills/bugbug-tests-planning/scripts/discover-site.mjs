#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const MAX_PAGES = 10;
const DEFAULT_MAX_PAGES = 3;
const MAX_SITEMAP_FILES = 3;
const MAX_SITEMAP_URLS = 50;
const MAX_BYTES = 1_000_000;
const FETCH_TIMEOUT_MS = 10_000;
const MAX_REPORTED_ELEMENTS = 80;

const usage = `Usage: node scripts/discover-site.mjs <url> [--mode shallow|deep] [--max-pages 3] [--output <directory>]`;

const parseArgs = (argv) => {
  const [url, ...rest] = argv;
  if (!url || url.startsWith('-')) {
    throw new Error(usage);
  }

  const options = {
    url,
    mode: 'shallow',
    maxPages: DEFAULT_MAX_PAGES,
    output: resolve(process.cwd(), 'bugbug-site-discovery'),
  };

  for (let index = 0; index < rest.length; index += 1) {
    const arg = rest[index];
    const value = rest[index + 1];
    if (arg === '--mode' && value) {
      options.mode = value;
      index += 1;
      continue;
    }
    if (arg === '--max-pages' && value) {
      options.maxPages = Number(value);
      index += 1;
      continue;
    }
    if (arg === '--output' && value) {
      options.output = resolve(process.cwd(), value);
      index += 1;
      continue;
    }
    throw new Error(`Unknown or incomplete argument: ${arg}\n${usage}`);
  }

  if (!['shallow', 'deep'].includes(options.mode)) {
    throw new Error('--mode must be shallow or deep');
  }
  if (!Number.isInteger(options.maxPages) || options.maxPages < 1 || options.maxPages > MAX_PAGES) {
    throw new Error(`--max-pages must be an integer from 1 to ${MAX_PAGES}`);
  }

  new URL(options.url);
  return options;
};

const fetchText = async (url, context) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`${context}: ${response.status} ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      return response.text();
    }

    const chunks = [];
    let bytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      bytes += value.byteLength;
      if (bytes > MAX_BYTES) {
        throw new Error(`${context}: response exceeded ${MAX_BYTES} bytes`);
      }
      chunks.push(value);
    }

    return new TextDecoder().decode(Buffer.concat(chunks));
  } finally {
    clearTimeout(timeout);
  }
};

const trimText = (value, maxLength = 120) => {
  const text = (value ?? '').replace(/\s+/g, ' ').trim();
  return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text || undefined;
};

const extractAttributes = (html, tagMatch) => {
  const attrs = {};
  const attrText = tagMatch.match(/^<[^>\s]+([^>]*)>/s)?.[1] ?? '';
  for (const [, name, value] of attrText.matchAll(
    /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*["']([^"']*)["']/g,
  )) {
    if (
      [
        'id',
        'data-testid',
        'data-test',
        'aria-label',
        'name',
        'role',
        'type',
        'href',
        'placeholder',
        'value',
        'action',
        'method',
      ].includes(name)
    ) {
      attrs[name] = value;
    }
  }
  return attrs;
};

const stripTags = (value) => trimText(value.replace(/<[^>]+>/g, ' '));

const extractElements = (html, pattern, mapper) =>
  Array.from(html.matchAll(pattern), mapper).slice(0, MAX_REPORTED_ELEMENTS);

const extractPageFacts = (html) => ({
  title: trimText(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]),
  headings: extractElements(html, /<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/gi, (match) => ({
    level: Number(match[1]),
    text: stripTags(match[2]) ?? '',
  })).filter((heading) => heading.text),
  forms: extractElements(html, /<form\b[\s\S]*?<\/form>/gi, (match) => ({
    action: extractAttributes(html, match[0]).action,
    method: extractAttributes(html, match[0]).method,
    fields: extractElements(match[0], /<(input|textarea|select)\b[^>]*>/gi, (field) => ({
      tag: field[1].toLowerCase(),
      attributes: extractAttributes(html, field[0]),
    })),
    buttons: extractElements(
      match[0],
      /<button\b[^>]*>([\s\S]*?)<\/button>|<input\b[^>]*type=["']submit["'][^>]*>/gi,
      (button) => ({
        tag: button[0].startsWith('<input') ? 'input' : 'button',
        text: stripTags(button[1] ?? ''),
        attributes: extractAttributes(html, button[0]),
      }),
    ),
  })),
  buttons: extractElements(
    html,
    /<button\b[^>]*>([\s\S]*?)<\/button>|<input\b[^>]*type=["'](?:button|submit)["'][^>]*>/gi,
    (match) => ({
      tag: match[0].startsWith('<input') ? 'input' : 'button',
      text: stripTags(match[1] ?? ''),
      attributes: extractAttributes(html, match[0]),
    }),
  ),
  links: extractElements(html, /<a\b[^>]*href=["'][^"']+["'][^>]*>([\s\S]*?)<\/a>/gi, (match) => ({
    tag: 'a',
    text: stripTags(match[1]),
    attributes: extractAttributes(html, match[0]),
  })),
});

const parseSitemapLocs = (xml) =>
  Array.from(xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi), (match) => match[1].trim());

const discoverSitemapUrls = async (url) => {
  const notes = [];
  const { origin } = new URL(url);
  const robotsUrl = new URL('/robots.txt', origin).toString();
  const fallbackSitemapUrl = new URL('/sitemap.xml', origin).toString();

  try {
    const robotsResponse = await fetch(robotsUrl);
    let sitemapCandidates = [];

    if (robotsResponse.ok) {
      const robotsText = await robotsResponse.text();
      sitemapCandidates = robotsText
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => /^sitemap:/i.test(line))
        .map((line) => line.replace(/^sitemap:\s*/i, '').trim())
        .filter(Boolean);
      notes.push(
        sitemapCandidates.length > 0
          ? `Found ${sitemapCandidates.length} sitemap reference(s) in robots.txt.`
          : 'No sitemap references in robots.txt; using /sitemap.xml.',
      );
    } else {
      sitemapCandidates = [fallbackSitemapUrl];
      notes.push('robots.txt was unavailable; using /sitemap.xml.');
    }

    const queue = (sitemapCandidates.length > 0 ? sitemapCandidates : [fallbackSitemapUrl]).slice(
      0,
      MAX_SITEMAP_FILES,
    );
    const visited = new Set();
    const discoveredUrls = [];

    while (
      queue.length > 0 &&
      visited.size < MAX_SITEMAP_FILES &&
      discoveredUrls.length < MAX_SITEMAP_URLS
    ) {
      const sitemapUrl = queue.shift();
      if (!sitemapUrl || visited.has(sitemapUrl)) {
        continue;
      }

      visited.add(sitemapUrl);
      const xml = await fetchText(sitemapUrl, 'Failed to fetch sitemap');
      const locs = parseSitemapLocs(xml);

      if (/<sitemapindex[\s>]/i.test(xml)) {
        for (const loc of locs) {
          if (queue.length + visited.size >= MAX_SITEMAP_FILES) {
            break;
          }
          queue.push(loc);
        }
      } else {
        discoveredUrls.push(...locs);
      }
    }

    return { urls: Array.from(new Set(discoveredUrls)).slice(0, MAX_SITEMAP_URLS), notes };
  } catch (error) {
    notes.push(
      `Sitemap inspection skipped: ${error instanceof Error ? error.message : String(error)}`,
    );
    return { urls: [], notes };
  }
};

const createPageKey = (url, index) => {
  const pathname = new URL(url).pathname.replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9]+/gi, '-');
  return `${index + 1}-${pathname || 'home'}`.toLowerCase().slice(0, 80);
};

export const discoverSite = async ({ url, mode, maxPages, output }) => {
  const createdAt = new Date();
  const sitemap = mode === 'deep' ? await discoverSitemapUrls(url) : { urls: [], notes: [] };
  const urlsToFetch = [
    url,
    ...(mode === 'deep' ? sitemap.urls.filter((candidate) => candidate !== url) : []),
  ].slice(0, maxPages);
  const outputDirectory = resolve(
    output,
    `${createdAt.toISOString().replace(/[:.]/g, '-')}-${basename(new URL(url).hostname)}`,
  );

  await mkdir(outputDirectory, { recursive: true });

  const pages = [];
  for (const [index, pageUrl] of urlsToFetch.entries()) {
    const html = await fetchText(pageUrl, 'Failed to fetch page');
    const key = createPageKey(pageUrl, index);
    const htmlFile = `${key}.html`;
    await writeFile(resolve(outputDirectory, htmlFile), html);
    pages.push({
      key,
      url: pageUrl,
      status: 200,
      htmlBytes: Buffer.byteLength(html),
      htmlFile,
      interactiveElements: extractPageFacts(html),
    });
  }

  const discovery = {
    createdAt: createdAt.toISOString(),
    url,
    mode,
    maxPages,
    notes: sitemap.notes,
    sitemapUrls: sitemap.urls,
    sitemapUrlCount: sitemap.urls.length,
    pageCount: pages.length,
    pages,
  };
  const discoveryPath = resolve(outputDirectory, 'discovery.json');
  await writeFile(discoveryPath, `${JSON.stringify(discovery, null, 2)}\n`);

  return { discoveryPath, discovery };
};

export const main = async (argv = process.argv.slice(2)) => {
  const options = parseArgs(argv);
  const { discoveryPath, discovery } = await discoverSite(options);
  console.log(`Wrote ${discoveryPath}`);
  console.log(`Pages sampled: ${discovery.pageCount}`);
  console.log(`Sitemap URLs found: ${discovery.sitemapUrlCount}`);
};

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
