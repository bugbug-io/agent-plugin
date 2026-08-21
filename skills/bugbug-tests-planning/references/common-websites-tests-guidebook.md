# Typical Website E2E Scenarios

Use this as a scenario catalog. Start with `## Contents`, then read only the
sections that match the requested site type or flow.

## Contents

- [1. Website entry and landing pages](#1-website-entry-and-landing-pages)
- [2. Homepage journey](#2-homepage-journey)
- [3. Main navigation](#3-main-navigation)
- [4. Content listing and category pages](#4-content-listing-and-category-pages)
- [5. Site search](#5-site-search)
- [6. Search filtering and sorting](#6-search-filtering-and-sorting)
- [7. Article and content consumption](#7-article-and-content-consumption)
- [8. Table of contents and in-page navigation](#8-table-of-contents-and-in-page-navigation)
- [9. Related and recommended content](#9-related-and-recommended-content)
- [10. Author and contributor journeys](#10-author-and-contributor-journeys)
- [11. Publication dates and content freshness](#11-publication-dates-and-content-freshness)
- [12. Breaking news and live-content scenarios](#12-breaking-news-and-live-content-scenarios)
- [13. Marketing landing pages](#13-marketing-landing-pages)
- [14. Calls to action](#14-calls-to-action)
- [15. Contact and lead-generation forms](#15-contact-and-lead-generation-forms)
- [16. Newsletter subscription](#16-newsletter-subscription)
- [17. Resource download journey](#17-resource-download-journey)
- [18. Documentation navigation](#18-documentation-navigation)
- [19. Documentation versioning](#19-documentation-versioning)
- [20. Code examples and technical content](#20-code-examples-and-technical-content)
- [21. Documentation feedback](#21-documentation-feedback)
- [22. Help-centre and knowledge-base journey](#22-help-centre-and-knowledge-base-journey)
- [23. Login-gated content](#23-login-gated-content)
- [24. Paywall and subscription content](#24-paywall-and-subscription-content)
- [25. Social sharing](#25-social-sharing)
- [26. Comments and community interaction](#26-comments-and-community-interaction)
- [27. Media consumption](#27-media-consumption)
- [28. Events and webinars](#28-events-and-webinars)
- [29. Careers and job applications](#29-careers-and-job-applications)
- [30. Language and localization](#30-language-and-localization)
- [31. Accessibility-focused user journeys](#31-accessibility-focused-user-journeys)
- [32. Mobile website journeys](#32-mobile-website-journeys)
- [33. Consent, cookies, and privacy preferences](#33-consent-cookies-and-privacy-preferences)
- [34. Error pages and recovery](#34-error-pages-and-recovery)
- [35. Broken and redirected links](#35-broken-and-redirected-links)
- [36. Browser history and state preservation](#36-browser-history-and-state-preservation)
- [37. Performance from the user perspective](#37-performance-from-the-user-perspective)
- [38. Third-party integrations](#38-third-party-integrations)
- [39. Analytics and conversion tracking from the user journey perspective](#39-analytics-and-conversion-tracking-from-the-user-journey-perspective)

For regular websites, organize E2E coverage around the **visitor lifecycle**: arrival, discovery, content consumption, engagement, conversion, return visits, and recovery.

These scenarios apply to:

* Blogs
* News and publishing websites
* Corporate and marketing websites
* Product and campaign websites
* Documentation portals
* Knowledge bases
* Help centres
* Public resource libraries

## 1. Website entry and landing pages

Typical paths:

* Direct URL → homepage
* Search engine → article or landing page
* Social media link → article
* Email campaign → landing page
* Advertisement → campaign page
* Referral website → resource page
* Bookmark → previously visited content
* Shared deep link → section within a page
* QR code → mobile landing page

Test:

* Homepage entry
* Article deep link
* Campaign deep link
* URL containing tracking parameters
* URL containing an anchor
* Expired campaign URL
* Changed or removed content URL
* Country or language redirect
* Returning visitor entry

Key checks:

* The visitor reaches the intended page
* Tracking parameters do not break the page
* Anchor links scroll to the correct section
* Redirects preserve relevant context
* Removed pages provide a useful recovery route
* No redirect loops occur
* The main content is visible without unnecessary blockers

---

## 2. Homepage journey

Typical path:

* Homepage → featured content → article or conversion page

Test:

* Main navigation
* Hero section
* Featured content
* Latest content
* Popular content
* Promotional blocks
* Calls to action
* Newsletter section
* Footer links
* Social media links

Key checks:

* Content is current and correctly ordered
* Featured links open the correct destination
* Calls to action are understandable
* Images and media load correctly
* Layout remains usable on mobile
* Visitors can identify the website’s purpose quickly
* Important content is not hidden by banners or overlays

---

## 3. Main navigation

Test:

* Open each main navigation item
* Open dropdown or mega menu
* Navigate to a subcategory
* Open mobile navigation
* Close mobile navigation
* Navigate using keyboard
* Return to homepage through the logo
* Use sticky navigation after scrolling
* Open navigation links in a new tab

Failure and edge cases:

* Long menu labels
* Multiple navigation levels
* Navigation item with no landing page
* Current page highlighted incorrectly
* Menu remains open after navigation
* Menu is covered by another element
* User resizes the browser while the menu is open

Key checks:

* Each item leads to the correct page
* Current location is clear
* Mobile and desktop menus provide equivalent access
* Navigation does not trap keyboard users
* Dropdowns remain usable at different screen sizes
* Browser back returns to the expected page

---

## 4. Content listing and category pages

Relevant to blogs, news sites, resource centres, and documentation collections.

Typical path:

* Homepage → category → content item

Test:

* Open category
* Open tag page
* Open author page
* Open topic page
* Browse latest content
* Browse popular content
* Use pagination
* Use infinite scrolling
* Apply content filters
* Sort content
* Open content and return

Key checks:

* Relevant items appear
* Titles, images, dates, and summaries are correct
* Pagination does not duplicate or skip content
* Returning from an article preserves position where possible
* Filters remain applied
* Empty categories are handled clearly
* Draft, restricted, or unpublished content does not appear

---

## 5. Site search

Typical paths:

* Search icon → query → results → content
* Documentation search → result → target section
* Help-centre search → article → related article

Test:

* Exact phrase
* Partial phrase
* Misspelled phrase
* Synonym
* Product name
* Article title
* Author name
* Error code
* Search with no results
* Empty search
* Very long query
* Special characters
* Search from mobile navigation

Key checks:

* Relevant results appear
* Search term remains visible
* Results contain useful titles and summaries
* Restricted or unpublished content is excluded
* No-result state offers alternatives
* Search handles spelling variations where expected
* Clicking a result opens the intended content
* Browser back restores search results

---

## 6. Search filtering and sorting

Test:

* Filter by content type
* Filter by category
* Filter by topic
* Filter by date
* Filter by author
* Apply multiple filters
* Remove one filter
* Clear all filters
* Sort by relevance
* Sort by newest
* Sort by popularity
* Share a filtered search URL

Key checks:

* Filters update results correctly
* Applied filters are clearly visible
* Result counts are accurate
* Removing one filter preserves others
* Shared URLs reproduce the same result set
* Filters work consistently on mobile
* Invalid filter combinations show a useful state

---

## 7. Article and content consumption

Typical path:

* Listing or search → article → related content

Test:

* Open article
* Read long-form content
* Scroll through headings
* Open inline links
* Open footnotes or references
* View images
* Play embedded media
* Open downloadable resources
* Navigate to related content
* Return to category
* Use previous and next article controls

Key checks:

* Title, author, date, and content are correct
* Text is readable at different screen sizes
* Headings follow a logical structure
* Images have appropriate captions where needed
* Internal and external links work
* Embedded content does not break the layout
* Related content is relevant
* Reading progress or table of contents works where supported

---

## 8. Table of contents and in-page navigation

Especially relevant to documentation and long articles.

Test:

* Open a table-of-contents link
* Use sticky section navigation
* Scroll between sections
* Copy a section link
* Open a section URL directly
* Use browser back after navigating between anchors
* Expand collapsed sections
* Navigate using keyboard

Key checks:

* Each link opens the correct section
* The active section updates correctly
* Sticky navigation does not cover headings
* Shared anchor links work on a fresh page load
* Collapsed content becomes visible when linked directly
* Focus moves appropriately for accessibility

---

## 9. Related and recommended content

Test:

* Open related article
* Open recommended guide
* Open next article
* Open popular content
* Follow a topic recommendation
* Follow a personalized recommendation where available
* Return to the original content

Key checks:

* Links point to existing content
* Recommendations are relevant
* Restricted content is not recommended to unauthorized users
* Repeated items are avoided
* Recommendation blocks do not interrupt reading
* Back navigation behaves predictably

---

## 10. Author and contributor journeys

Relevant to blogs and publishers.

Test:

* Open author profile
* View author biography
* View all content by author
* Follow links to author social profiles
* Open contributor page
* Navigate between author content pages

Key checks:

* Author information matches the article
* Published content is attributed correctly
* Removed authors are handled appropriately
* Social and profile links work
* Draft or internal content is not visible
* Pagination works on author archives

---

## 11. Publication dates and content freshness

Test:

* Newly published content
* Updated article
* Scheduled article
* Archived article
* Evergreen article
* Content with corrected information
* Content with future publication date
* Content displayed across time zones

Key checks:

* Publication and update dates are accurate
* Future content remains hidden until release
* Scheduled content becomes available at the correct time
* Updated content indicates revision where expected
* Category and homepage ordering update correctly
* Cached pages do not continue showing stale content

---

## 12. Breaking news and live-content scenarios

Relevant to publishers and news websites.

Test:

* Breaking-news banner
* Live blog
* Frequently updated article
* Auto-refreshing content
* Manual refresh
* Multiple simultaneous updates
* Breaking-news notification link
* Content correction
* Article removed during an active session

Key checks:

* Updates appear without duplicating content
* Timestamps are understandable
* Manual and automatic refresh preserve reading position where possible
* Corrected information replaces outdated content
* Removed content displays an appropriate explanation
* High traffic does not make the core page unusable

---

## 13. Marketing landing pages

Typical path:

* Campaign source → landing page → conversion

Test:

* Paid-ad landing page
* Email campaign landing page
* Product launch page
* Event landing page
* Downloadable-resource page
* Webinar registration page
* Waitlist page
* Pricing or plans page
* Comparison page
* Partner campaign page

Key checks:

* Campaign headline and offer are correct
* Call to action is visible
* Tracking parameters are preserved
* Form and CTA lead to the correct next step
* Mobile layout supports conversion
* Expired offers are removed or clearly marked
* Thank-you page matches the submitted offer
* Duplicate conversions are avoided

---

## 14. Calls to action

Test:

* Primary CTA
* Secondary CTA
* Sticky CTA
* Header CTA
* Footer CTA
* Inline article CTA
* Popup CTA
* Exit-intent CTA
* Mobile CTA
* CTA after form completion

Examples:

* Contact sales
* Start free trial
* Request demo
* Download report
* Subscribe
* Register for event
* View pricing
* Contact support

Key checks:

* CTA label matches its destination
* CTA opens the correct page or form
* CTA remains usable on mobile
* Repeated CTAs behave consistently
* Disabled or unavailable actions are explained
* Tracking records the correct source where required

---

## 15. Contact and lead-generation forms

Typical path:

* Landing page → form → confirmation → follow-up

Test:

* Contact form
* Demo request
* Quote request
* Consultation request
* Partner enquiry
* Media enquiry
* Support enquiry
* Newsletter signup
* Event registration
* Resource download
* Job application

For each form, test:

* Successful submission
* Required fields
* Invalid email
* Invalid phone number
* Invalid file
* Large file
* Special characters
* Very long values
* Optional fields
* Consent checkbox
* Duplicate submission
* Slow response
* Server failure
* Refresh after submission

Key checks:

* Validation is clear
* Entered data remains after recoverable errors
* One submission creates one record
* Confirmation is displayed
* Confirmation email is sent where expected
* Correct campaign or page source is captured
* Sensitive information is not exposed in the URL

---

## 16. Newsletter subscription

Test:

* Subscribe from homepage
* Subscribe from article
* Subscribe from footer
* Subscribe from popup
* Subscribe with an existing email
* Confirm double opt-in
* Use expired confirmation link
* Unsubscribe
* Resubscribe
* Manage preferences

Key checks:

* Subscription status updates correctly
* Duplicate contacts are handled safely
* Confirmation messaging is accurate
* Consent is recorded
* Unsubscribe takes effect
* Visitor is not repeatedly prompted after subscribing
* Links in subscription emails open correctly

---

## 17. Resource download journey

Typical path:

* Landing page → form → download page or email

Test:

* Download without a form
* Gated download
* Download after form submission
* Download from confirmation email
* Repeat download
* Expired download link
* Removed file
* Large file
* Mobile download
* Download in a new tab

Key checks:

* Correct file is delivered
* File name and format are correct
* Download starts once
* Form is not resubmitted unnecessarily
* Restricted resources require appropriate access
* Expired links show a useful next step
* Analytics records the download where expected

---

## 18. Documentation navigation

Typical paths:

* Documentation homepage → product → version → guide
* Search → article → related reference
* Sidebar → section → page
* API reference → endpoint → example
* Error code → troubleshooting guide

Test:

* Documentation sidebar
* Expand and collapse sections
* Previous and next page
* Breadcrumbs
* Product selector
* Version selector
* Language or SDK selector
* Documentation search
* Table of contents
* Copy section link
* Copy code example
* Open external API reference

Key checks:

* Navigation reflects the current location
* Selected product and version remain consistent
* Links do not move users into the wrong version unexpectedly
* Sidebar state remains after navigation
* Mobile documentation navigation is usable
* Direct page URLs load without prior navigation

---

## 19. Documentation versioning

Test:

* Open current documentation
* Switch to older version
* Open an old bookmarked page
* Open a page removed from the latest version
* Follow link between versions
* Search within a selected version
* Open version-specific examples
* View end-of-life documentation

Key checks:

* Current version is clearly identified
* Version choice remains selected
* Search respects the selected version
* Links do not silently move to another version
* Deprecated content is clearly marked
* Missing old pages provide suitable alternatives
* Version-specific code examples remain accurate

---

## 20. Code examples and technical content

Relevant to developer documentation.

Test:

* Copy code
* Switch programming language
* Expand full example
* Open example repository
* Download sample file
* Run interactive example where supported
* Use tabs within examples
* Open command-line snippets
* Copy multiline content

Key checks:

* Copied text matches displayed code
* Formatting is preserved
* Language selection remains consistent
* Hidden characters are not added
* Long lines remain readable
* Examples correspond to the selected version
* Interactive examples fail gracefully

---

## 21. Documentation feedback

Test:

* Mark article as helpful
* Mark article as not helpful
* Submit written feedback
* Report outdated content
* Report broken example
* Submit feedback anonymously
* Submit feedback while logged in
* Attempt duplicate feedback

Key checks:

* Feedback is submitted once
* Confirmation is shown
* Feedback is associated with the correct article and version
* Personal data is handled appropriately
* A failed submission can be retried
* Feedback controls remain usable on mobile

---

## 22. Help-centre and knowledge-base journey

Typical path:

* Help centre → search → article → support escalation

Test:

* Browse help categories
* Search for an issue
* Open troubleshooting article
* Follow step-by-step instructions
* Open related article
* Mark article helpful
* Contact support
* Return to product

Key checks:

* Search results are relevant
* Instructions are complete and readable
* Links to product settings open the correct location
* Escalation path is available when self-service fails
* Restricted account information is not exposed
* Content reflects the current product version

---

## 23. Login-gated content

Relevant to member sites, premium publishers, customer portals, and private documentation.

Test:

* Open restricted page while logged out
* Login and return to the requested page
* Open restricted content with expired session
* Open content with insufficient permission
* Access premium article
* Access customer-only documentation
* Logout while viewing restricted content
* Use a shared restricted URL

Key checks:

* Logged-out users are redirected correctly
* Intended destination is preserved after login
* Unauthorized users do not see protected content
* Session expiry does not expose content
* Access restrictions apply to direct URLs and search
* Logout removes access immediately

---

## 24. Paywall and subscription content

Relevant to publishers.

Test:

* Open free article
* Open metered article
* Reach article limit
* Open premium article
* Subscribe from paywall
* Login as subscriber
* Cancel subscription
* Subscription expires
* Restore subscription access
* Open shared or gifted article

Key checks:

* Article limits are counted correctly
* Subscribers receive access immediately
* Non-subscribers cannot bypass restrictions through direct URLs
* Paywall messaging is clear
* Subscription state remains consistent across devices
* Cancellation and expiry change access at the correct time

---

## 25. Social sharing

Test:

* Share to social platform
* Copy article link
* Share through mobile share controls
* Share an anchor link
* Share article with tracking parameters
* Open shared link while logged out
* Share unavailable content

Key checks:

* Shared URL opens the correct content
* Page title, description, and image are appropriate
* Sensitive session information is not included
* Tracking parameters do not break the link
* Removed content provides a recovery route
* Copy-link feedback is clear

---

## 26. Comments and community interaction

Relevant to blogs and publishers.

Test:

* Submit comment
* Reply to comment
* Edit comment
* Delete comment
* Report comment
* Like or react to comment
* Login before commenting
* Comment anonymously where supported
* Submit duplicate comment
* Submit prohibited content
* Load additional comments

Key checks:

* Comment appears according to moderation rules
* Replies are attached correctly
* Users cannot edit another person’s comment
* Deleted comments are handled clearly
* Spam protection does not block legitimate users unnecessarily
* Comment counts update correctly
* Notifications link to the correct discussion

---

## 27. Media consumption

Test:

* View image gallery
* Open image fullscreen
* Play video
* Pause and resume video
* Enable captions
* Change volume
* Play audio
* Open podcast episode
* Download media
* Continue reading after media playback

Failure cases:

* Media unavailable
* Slow connection
* Unsupported format
* Third-party embed blocked
* Autoplay restricted
* Caption file missing

Key checks:

* Media does not block the page
* Controls work on desktop and mobile
* Captions and transcripts are available where required
* Failed media shows a useful fallback
* Playback does not start unexpectedly
* Layout remains stable while media loads

---

## 28. Events and webinars

Typical path:

* Event page → registration → confirmation → event access

Test:

* Browse event listing
* Open event details
* Register
* Add event to calendar
* Receive confirmation
* Open event link
* Cancel registration
* Join waitlist
* Register after capacity is reached
* Open past event recording

Key checks:

* Event date and time are correct
* Time zone is clear
* Registration creates one attendee
* Confirmation contains the correct access details
* Cancelled registrations free capacity where expected
* Past and future events are clearly separated
* Calendar file contains accurate details

---

## 29. Careers and job applications

Relevant to corporate and marketing websites.

Test:

* Browse job listings
* Filter by location or department
* Open job details
* Apply through internal form
* Apply through external provider
* Upload résumé
* Save job
* Share job
* Submit duplicate application
* Open expired job link

Key checks:

* Job details are accurate
* Closed roles are not presented as available
* Filters remain applied
* Application redirects preserve the selected role
* Files upload correctly
* Confirmation is shown
* Candidate information is handled securely

---

## 30. Language and localization

Test:

* Change language
* Open localized URL directly
* Navigate between translated pages
* Search in selected language
* Submit localized form
* Open localized email link
* View untranslated content
* Use browser language preference
* Change region independently of language

Key checks:

* Language remains selected
* Navigation and content are translated consistently
* Links remain within the chosen language where appropriate
* Missing translations use the expected fallback
* Dates, numbers, and currencies use local formats
* Search results match the selected language
* Localized forms create correct records

---

## 31. Accessibility-focused user journeys

Test complete journeys using:

* Keyboard only
* Screen reader
* Browser zoom
* High text magnification
* Reduced motion setting
* Voice control where relevant

Journeys:

* Navigate from homepage to article
* Search and open result
* Complete contact form
* Open mobile menu
* Use table of contents
* Play media with captions
* Access documentation sidebar

Key checks:

* Focus order is logical
* Focus is visible
* Skip links work
* Forms have understandable labels
* Errors are announced
* Modals can be closed
* Headings provide clear structure
* Interactive controls have meaningful names

---

## 32. Mobile website journeys

Test:

* Mobile homepage → navigation → article
* Mobile search → result → content
* Open link from social application
* Submit form with mobile keyboard
* Open documentation sidebar
* Copy code example
* Watch embedded video
* Download resource
* Switch between portrait and landscape
* Return after switching applications

Common risks:

* Menu cannot be closed
* Sticky banners hide content
* Keyboard covers fields
* Tables overflow without controls
* Code blocks are unreadable
* Popups cannot be dismissed
* Buttons are too close together
* Scroll position is lost

---

## 33. Consent, cookies, and privacy preferences

Test:

* First visit
* Accept all cookies
* Reject optional cookies
* Customize preferences
* Save preferences
* Return visit
* Change consent later
* Open privacy policy
* Open cookie policy
* Submit privacy request

Key checks:

* Preferences are stored
* Rejected scripts do not run where prohibited
* Essential website functions remain usable
* Consent banner does not repeatedly reappear
* Preference controls remain accessible
* Tracking behavior matches the selected choice
* Policies open correctly

---

## 34. Error pages and recovery

Test:

* Invalid URL
* Removed article
* Removed documentation page
* Server error
* Search service unavailable
* Form service unavailable
* Media unavailable
* Maintenance page
* Access denied
* Rate-limited request

Key checks:

* Error message is understandable
* No sensitive technical information is shown
* Visitor can return to homepage, search, or relevant category
* Retry is safe
* Navigation remains available where possible
* Correct HTTP state is reflected in the user experience
* Temporary errors are distinguishable from permanent removal

---

## 35. Broken and redirected links

Test:

* Internal link
* External link
* Changed article URL
* Changed documentation route
* Old campaign URL
* Shortened URL
* Redirect chain
* Link containing anchor
* Link to downloadable file

Key checks:

* Internal links reach valid destinations
* Permanent redirects preserve intended context
* Redirect chains are minimized
* Anchors remain intact
* External links open as intended
* Removed resources offer suitable alternatives
* No circular redirects occur

---

## 36. Browser history and state preservation

Test:

* Open article from category and go back
* Open search result and go back
* Apply filters, open item, and return
* Navigate between documentation pages
* Move between anchor links
* Refresh a long article
* Open content in multiple tabs

Key checks:

* Back and forward navigation work predictably
* Search queries and filters remain
* Scroll position is preserved where appropriate
* No duplicate analytics or form submissions occur
* Direct refresh loads the same content
* Tab activity does not corrupt shared state

---

## 37. Performance from the user perspective

Test journeys under:

* Fast connection
* Slow mobile connection
* Delayed images
* Delayed third-party scripts
* Large article
* Large documentation page
* Heavy embedded media
* High-traffic event

Key checks:

* Main content appears promptly
* Visitors can begin reading before secondary content finishes
* Layout does not shift excessively
* Navigation remains responsive
* Forms do not become unusable
* Slow third-party tools do not block core content
* Loading and error states are understandable

---

## 38. Third-party integrations

Common integrations:

* Analytics
* Tag manager
* Video platform
* Social embeds
* Chat widget
* Marketing automation
* CRM forms
* Event platform
* Applicant tracking system
* Search provider
* Documentation search
* Translation service

Test:

* Integration loads successfully
* Integration is blocked by consent choice
* Provider is unavailable
* Provider responds slowly
* Widget overlaps content
* Form submission reaches the integration
* Duplicate events are prevented
* Integration is disabled

Key checks:

* Core website remains usable when integration fails
* Visitor data is sent only when allowed
* The correct campaign and page context are recorded
* Third-party failures do not expose technical errors
* Mobile experience remains usable

---

## 39. Analytics and conversion tracking from the user journey perspective

Test important journeys such as:

* Landing page → CTA
* Article → newsletter signup
* Resource page → download
* Pricing page → demo request
* Event page → registration
* Documentation page → feedback
* Help article → support escalation

Key checks:

* One user action creates one expected event
* Refreshing does not duplicate conversions
* Failed form submissions are not recorded as successful
* Campaign attribution survives navigation
* Consent choices are respected
* Success is recorded only after the actual outcome

---

## 40. Reliability and interruption scenarios

Test realistic interruptions:

* Refresh during form submission
* Lose network while loading article
* Lose network during file download
* Close browser during registration
* Session expires while reading restricted content
* Third-party search fails
* Embedded media provider fails
* Multiple rapid CTA clicks
* Open the same form in several tabs
* Content is unpublished while being viewed

Expected behavior:

* No duplicate submissions
* Entered form information is preserved where safe
* Visitor can retry
* Core content remains accessible where possible
* Errors explain the next action
* No private or unpublished content is exposed
* Final submission state is clear

# Recommended Website Smoke Suite

Run after every deployment:

1. Open the homepage.
2. Use the main navigation.
3. Open a category or content listing.
4. Search for content.
5. Open an article or documentation page.
6. Use an internal link.
7. Use browser back.
8. Submit the primary form.
9. Verify the confirmation state.
10. Open a deep link directly.
11. Verify the mobile navigation.
12. Open the 404 page and recover.
13. Verify the primary CTA.
14. Check a downloadable or embedded resource.

# Critical Regression Suite

Before major releases, include:

* Homepage and navigation
* Search and no-result behavior
* Category and listing navigation
* Article and documentation rendering
* Deep links and anchor links
* Forms and validation
* Newsletter subscription
* Resource downloads
* Marketing landing-page conversion
* Documentation version selection
* Login-gated content
* Language selection
* Consent preferences
* Mobile navigation
* Error-page recovery
* Redirects
* Third-party integration failure
* Browser back and state preservation
* Accessibility of critical journeys

# Useful Website Test Matrix

| Dimension     | Examples                                           |
| ------------- | -------------------------------------------------- |
| Visitor state | New, returning, subscriber, authenticated          |
| Entry source  | Direct, search, social, email, advertisement       |
| Content type  | Article, landing page, guide, documentation, video |
| Access state  | Public, gated, premium, restricted                 |
| Navigation    | Menu, search, category, deep link, related content |
| Language      | Default, translated, fallback                      |
| Device        | Desktop, mobile, tablet                            |
| Browser state | New tab, refresh, back navigation, multiple tabs   |
| Consent state | Unset, accepted, rejected, customized              |
| Network       | Normal, slow, interrupted                          |
| Content state | Current, updated, removed, archived                |
| Outcome       | Success, validation failure, unavailable service   |

The strongest E2E suite for regular websites answers one main question:

**Can a visitor find the right information, understand it, complete the intended action, and recover from problems without becoming lost or blocked?**
