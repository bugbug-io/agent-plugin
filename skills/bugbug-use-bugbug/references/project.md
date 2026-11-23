# Project-level API

## Contents

- bugbug.projects
- bugbug.project
- bugbug.profiles
- bugbug.files
- bugbug.projectArtifacts
- bugbug.visualRegression
- bugbug.docs
- Types

<!-- Generated from the code-mode bindings. Do not edit by hand: run `UPDATE_CODE_MODE_REFERENCE=1 npm run test:mcp -- reference` from public-tools/. -->

Projects, run profiles, settings, the Files library, uploads, visual regression references, and documentation search.
Arguments are validated; unknown or misspelled option keys are rejected. Every function lists its permission (`read` or `write`), description, definition, input, and output. Optional parameters are marked `?`. Named types are defined in full in the `Types` section at the end of this file.

## bugbug.projects

### bugbug.projects.list

Permission: read

Description: List projects the token can access.

Definition:

```ts
bugbug.projects.list(options?: { query?: string; cursor?: string; pageSize?: number }): Promise<{ count: number; nextToken: string | null; results: Project[] }>
```

Input:

```ts
type Input = [options?: { query?: string; cursor?: string; pageSize?: number }];
```

Output:

```ts
type Output = { count: number; nextToken: string | null; results: Project[] };
```

## bugbug.project

### bugbug.project.getSettings

Permission: read

Description: Get project settings including blockedScriptUrls and networkLogsPreset/networkLogsCategories. Read before changing script blocking or diagnosing marketing popups.

Definition:

```ts
bugbug.project.getSettings(): Promise<ProjectSettings>
```

Input:

```ts
type Input = [];
```

Output:

```ts
type Output = ProjectSettings;
```

### bugbug.project.updateSettings

Permission: write

Description: Update only supplied project settings for new sessions. browserLanguage requires a code such as en or de-DE; an empty or null userAgent restores the browser default. A supplied blockedScriptUrls list replaces existing rules; preserve entries when adding a block. Empty disables blocking. Read project.getSettings first and restore previous capture settings after diagnosis. Successful script metadata requires available network capture with full preset or custom other. DOM snapshots normally come from failed/error runs. Change only when requested by the user.

Definition:

```ts
bugbug.project.updateSettings(data: { blockedScriptUrls?: string[]; browserLanguage?: string; userAgent?: string | null; runLogs?: "disabled" | "consoleLogs" | "fullBugBugDebugging"; networkLogsPreset?: "disabled" | "basic" | "full" | "custom"; networkLogsCategories?: ("fetch_xhr" | "doc" | "manifest" | "socket" | "wasm" | "other")[]; domSnapshot?: boolean }): Promise<ProjectSettings>
```

Input:

```ts
type Input = [data: { blockedScriptUrls?: string[]; browserLanguage?: string; userAgent?: string | null; runLogs?: "disabled" | "consoleLogs" | "fullBugBugDebugging"; networkLogsPreset?: "disabled" | "basic" | "full" | "custom"; networkLogsCategories?: ("fetch_xhr" | "doc" | "manifest" | "socket" | "wasm" | "other")[]; domSnapshot?: boolean }];
```

Output:

```ts
type Output = ProjectSettings;
```

## bugbug.profiles

### bugbug.profiles.list

Permission: read

Description: List run profiles.

Definition:

```ts
bugbug.profiles.list(options?: { cursor?: string; pageSize?: number }): Promise<{ count: number; nextToken: string | null; results: Profile[] }>
```

Input:

```ts
type Input = [options?: { cursor?: string; pageSize?: number }];
```

Output:

```ts
type Output = { count: number; nextToken: string | null; results: Profile[] };
```

### bugbug.profiles.get

Permission: read

Description: Get a run profile.

Definition:

```ts
bugbug.profiles.get(profileId: string): Promise<Profile>
```

Input:

```ts
type Input = [profileId: string];
```

Output:

```ts
type Output = Profile;
```

## bugbug.files

### bugbug.files.list

Permission: read

Description: List files from the project Files library (files used by `uploadFile` steps). Find an existing file before uploading a duplicate. `folderId: null` lists the root. Pass a file `id` as `projectArtifactId` of an `uploadFile` step.

Definition:

```ts
bugbug.files.list(options?: { query?: string; folderId?: string | null; extensions?: string[]; sortBy?: "name" | "extension" | "size" | "created"; descOrder?: boolean; page?: number; pageSize?: number }): Promise<{ count: number; results: ProjectFile[] }>
```

Input:

```ts
type Input = [options?: { query?: string; folderId?: string | null; extensions?: string[]; sortBy?: "name" | "extension" | "size" | "created"; descOrder?: boolean; page?: number; pageSize?: number }];
```

Output:

```ts
type Output = { count: number; results: ProjectFile[] };
```

### bugbug.files.get

Permission: read

Description: Get metadata of one file from the project Files library.

Definition:

```ts
bugbug.files.get(fileId: string): Promise<ProjectFile>
```

Input:

```ts
type Input = [fileId: string];
```

Output:

```ts
type Output = ProjectFile;
```

### bugbug.files.getUsage

Permission: read

Description: Return how many steps use a file and which tests contain them. Check it before deleting a file.

Definition:

```ts
bugbug.files.getUsage(fileId: string): Promise<{ stepsCount: number; tests: { id: string; name: string }[] }>
```

Input:

```ts
type Input = [fileId: string];
```

Output:

```ts
type Output = { stepsCount: number; tests: { id: string; name: string }[] };
```

### bugbug.files.listFolders

Permission: read

Description: Return the nested folder tree of the project Files library.

Definition:

```ts
bugbug.files.listFolders(): Promise<{ id: string; name: string; contentCount?: number; children?: FolderNode[] }[]>
```

Input:

```ts
type Input = [];
```

Output:

```ts
type Output = { id: string; name: string; contentCount?: number; children?: FolderNode[] }[];
```

### bugbug.files.upload

Permission: write

Description: Upload a base64-encoded file (max 10 MB) to the project Files library, optionally into a folder. Use the returned id as `projectArtifactId` of an `uploadFile` step.

Definition:

```ts
bugbug.files.upload(file: { fileName: string; contentBase64: string; contentType?: string; name?: string; folderId?: string }): Promise<ProjectFile>
```

Input:

```ts
type Input = [file: { fileName: string; contentBase64: string; contentType?: string; name?: string; folderId?: string }];
```

Output:

```ts
type Output = ProjectFile;
```

### bugbug.files.update

Permission: write

Description: Rename a file and/or move it to another folder (`folderId: null` moves it to the root). Renaming does not affect steps that use the file.

Definition:

```ts
bugbug.files.update(fileId: string, patch: { name?: string; folderId?: string | null }): Promise<ProjectFile>
```

Input:

```ts
type Input = [fileId: string, patch: { name?: string; folderId?: string | null }];
```

Output:

```ts
type Output = ProjectFile;
```

### bugbug.files.createFolder

Permission: write

Description: Create a folder in the project Files library, optionally nested in another file folder.

Definition:

```ts
bugbug.files.createFolder(folder: { name: string; parentId?: string }): Promise<{ id: string; name: string }>
```

Input:

```ts
type Input = [folder: { name: string; parentId?: string }];
```

Output:

```ts
type Output = { id: string; name: string };
```

## bugbug.projectArtifacts

### bugbug.projectArtifacts.upload

Permission: write

Description: Upload a file for uploadFile steps; use the returned id as projectArtifactId. Requires the projectId argument of bugbug_use_bugbug.

Definition:

```ts
bugbug.projectArtifacts.upload(file: { fileName: string; contentBase64: string; contentType?: string }): Promise<ProjectArtifact>
```

Input:

```ts
type Input = [file: { fileName: string; contentBase64: string; contentType?: string }];
```

Output:

```ts
type Output = ProjectArtifact;
```

## bugbug.visualRegression

### bugbug.visualRegression.listReferenceScreenshots

Permission: read

Description: List visual-regression reference screenshots of a step.

Definition:

```ts
bugbug.visualRegression.listReferenceScreenshots(options: { stepId: string; cursor?: string; pageSize?: number }): Promise<{ count: number; nextToken: string | null; results: VisualRegressionRefScreenshot[] }>
```

Input:

```ts
type Input = [options: { stepId: string; cursor?: string; pageSize?: number }];
```

Output:

```ts
type Output = { count: number; nextToken: string | null; results: VisualRegressionRefScreenshot[] };
```

### bugbug.visualRegression.getReferenceScreenshot

Permission: read

Description: Get one visual-regression reference screenshot.

Definition:

```ts
bugbug.visualRegression.getReferenceScreenshot(id: string): Promise<VisualRegressionRefScreenshot>
```

Input:

```ts
type Input = [id: string];
```

Output:

```ts
type Output = VisualRegressionRefScreenshot;
```

## bugbug.docs

### bugbug.docs.ask

Permission: read

Description: Ask the BugBug documentation a natural-language question.

Definition:

```ts
bugbug.docs.ask(question: string): Promise<{ answer: string; sources: { title: string; path: string; uri: string }[] }>
```

Input:

```ts
type Input = [question: string];
```

Output:

```ts
type Output = { answer: string; sources: { title: string; path: string; uri: string }[] };
```

## Types

Exact definitions of the named types used by the functions above.

```ts
type FolderNode = { id: string; name: string; contentCount?: number; children?: FolderNode[] };
type Profile = {
  id: string;
  name: string;
  isDefault?: boolean;
};
type Project = {
  id: string;
  name: string | null;
  homepageUrl: string | null;
  organizationId: string | null;
  organizationName: string;
};
type ProjectArtifact = {
  id: string;
  project: string;
  file: string;
};
type ProjectFile = {
  id: string;
  name: string;
  extension: string;
  size: number | null;
  url: string;
  folderId: string | null;
  testsCount: number;
  created: string;
  modified: string;
};
type ProjectSettings = {
  initialRunProfileId: string | null;
  blockedScriptUrls: string[];
  browserHeight: number;
  browserLanguage: string | null;
  browserWidth: number;
  closeWindowsOnSuccessfulTestRun: boolean;
  domSnapshot: boolean;
  incognitoMode: boolean;
  mobileBrowserHeight: number;
  mobileBrowserWidth: number;
  projectId: string;
  runLogs: "disabled" | "consoleLogs" | "fullBugBugDebugging";
  runTimeoutLocal: number;
  runTimeoutServer: number;
  selectorMethods: {
    name: string;
    isActive: boolean;
    extraValue?: string | null;
    order: number;
  }[];
  selectorsExcludedAttributes: string | null;
  selectorsIncludedAttributes: string | null;
  selectorsNonSemanticClassesEnabled: boolean;
  selectorsPriority: "automatic" | "manual";
  sleep: number;
  timezone: "Africa/Abidjan" | "Africa/Accra" | "Africa/Addis_Ababa" | "Africa/Algiers" | "Africa/Asmara" | "Africa/Bamako" | "Africa/Bangui" | "Africa/Banjul" | "Africa/Bissau" | "Africa/Blantyre" | "Africa/Brazzaville" | "Africa/Bujumbura" | "Africa/Cairo" | "Africa/Casablanca" | "Africa/Ceuta" | "Africa/Conakry" | "Africa/Dakar" | "Africa/Dar_es_Salaam" | "Africa/Djibouti" | "Africa/Douala" | "Africa/El_Aaiun" | "Africa/Freetown" | "Africa/Gaborone" | "Africa/Harare" | "Africa/Johannesburg" | "Africa/Juba" | "Africa/Kampala" | "Africa/Khartoum" | "Africa/Kigali" | "Africa/Kinshasa" | "Africa/Lagos" | "Africa/Libreville" | "Africa/Lome" | "Africa/Luanda" | "Africa/Lubumbashi" | "Africa/Lusaka" | "Africa/Malabo" | "Africa/Maputo" | "Africa/Maseru" | "Africa/Mbabane" | "Africa/Mogadishu" | "Africa/Monrovia" | "Africa/Nairobi" | "Africa/Ndjamena" | "Africa/Niamey" | "Africa/Nouakchott" | "Africa/Ouagadougou" | "Africa/Porto-Novo" | "Africa/Sao_Tome" | "Africa/Tripoli" | "Africa/Tunis" | "Africa/Windhoek" | "America/Adak" | "America/Anchorage" | "America/Anguilla" | "America/Antigua" | "America/Araguaina" | "America/Argentina/Buenos_Aires" | "America/Argentina/Catamarca" | "America/Argentina/Cordoba" | "America/Argentina/Jujuy" | "America/Argentina/La_Rioja" | "America/Argentina/Mendoza" | "America/Argentina/Rio_Gallegos" | "America/Argentina/Salta" | "America/Argentina/San_Juan" | "America/Argentina/San_Luis" | "America/Argentina/Tucuman" | "America/Argentina/Ushuaia" | "America/Aruba" | "America/Asuncion" | "America/Atikokan" | "America/Bahia" | "America/Bahia_Banderas" | "America/Barbados" | "America/Belem" | "America/Belize" | "America/Blanc-Sablon" | "America/Boa_Vista" | "America/Bogota" | "America/Boise" | "America/Cambridge_Bay" | "America/Campo_Grande" | "America/Cancun" | "America/Caracas" | "America/Cayenne" | "America/Cayman" | "America/Chicago" | "America/Chihuahua" | "America/Ciudad_Juarez" | "America/Costa_Rica" | "America/Coyhaique" | "America/Creston" | "America/Cuiaba" | "America/Curacao" | "America/Danmarkshavn" | "America/Dawson" | "America/Dawson_Creek" | "America/Denver" | "America/Detroit" | "America/Dominica" | "America/Edmonton" | "America/Eirunepe" | "America/El_Salvador" | "America/Fort_Nelson" | "America/Fortaleza" | "America/Glace_Bay" | "America/Goose_Bay" | "America/Grand_Turk" | "America/Grenada" | "America/Guadeloupe" | "America/Guatemala" | "America/Guayaquil" | "America/Guyana" | "America/Halifax" | "America/Havana" | "America/Hermosillo" | "America/Indiana/Indianapolis" | "America/Indiana/Knox" | "America/Indiana/Marengo" | "America/Indiana/Petersburg" | "America/Indiana/Tell_City" | "America/Indiana/Vevay" | "America/Indiana/Vincennes" | "America/Indiana/Winamac" | "America/Inuvik" | "America/Iqaluit" | "America/Jamaica" | "America/Juneau" | "America/Kentucky/Louisville" | "America/Kentucky/Monticello" | "America/Kralendijk" | "America/La_Paz" | "America/Lima" | "America/Los_Angeles" | "America/Lower_Princes" | "America/Maceio" | "America/Managua" | "America/Manaus" | "America/Marigot" | "America/Martinique" | "America/Matamoros" | "America/Mazatlan" | "America/Menominee" | "America/Merida" | "America/Metlakatla" | "America/Mexico_City" | "America/Miquelon" | "America/Moncton" | "America/Monterrey" | "America/Montevideo" | "America/Montserrat" | "America/Nassau" | "America/New_York" | "America/Nome" | "America/Noronha" | "America/North_Dakota/Beulah" | "America/North_Dakota/Center" | "America/North_Dakota/New_Salem" | "America/Nuuk" | "America/Ojinaga" | "America/Panama" | "America/Paramaribo" | "America/Phoenix" | "America/Port-au-Prince" | "America/Port_of_Spain" | "America/Porto_Velho" | "America/Puerto_Rico" | "America/Punta_Arenas" | "America/Rankin_Inlet" | "America/Recife" | "America/Regina" | "America/Resolute" | "America/Rio_Branco" | "America/Santarem" | "America/Santiago" | "America/Santo_Domingo" | "America/Sao_Paulo" | "America/Scoresbysund" | "America/Sitka" | "America/St_Barthelemy" | "America/St_Johns" | "America/St_Kitts" | "America/St_Lucia" | "America/St_Thomas" | "America/St_Vincent" | "America/Swift_Current" | "America/Tegucigalpa" | "America/Thule" | "America/Tijuana" | "America/Toronto" | "America/Tortola" | "America/Vancouver" | "America/Whitehorse" | "America/Winnipeg" | "America/Yakutat" | "Antarctica/Casey" | "Antarctica/Davis" | "Antarctica/DumontDUrville" | "Antarctica/Macquarie" | "Antarctica/Mawson" | "Antarctica/McMurdo" | "Antarctica/Palmer" | "Antarctica/Rothera" | "Antarctica/Syowa" | "Antarctica/Troll" | "Antarctica/Vostok" | "Arctic/Longyearbyen" | "Asia/Aden" | "Asia/Almaty" | "Asia/Amman" | "Asia/Anadyr" | "Asia/Aqtau" | "Asia/Aqtobe" | "Asia/Ashgabat" | "Asia/Atyrau" | "Asia/Baghdad" | "Asia/Bahrain" | "Asia/Baku" | "Asia/Bangkok" | "Asia/Barnaul" | "Asia/Beirut" | "Asia/Bishkek" | "Asia/Brunei" | "Asia/Chita" | "Asia/Colombo" | "Asia/Damascus" | "Asia/Dhaka" | "Asia/Dili" | "Asia/Dubai" | "Asia/Dushanbe" | "Asia/Famagusta" | "Asia/Gaza" | "Asia/Hebron" | "Asia/Ho_Chi_Minh" | "Asia/Hong_Kong" | "Asia/Hovd" | "Asia/Irkutsk" | "Asia/Jakarta" | "Asia/Jayapura" | "Asia/Jerusalem" | "Asia/Kabul" | "Asia/Kamchatka" | "Asia/Karachi" | "Asia/Kathmandu" | "Asia/Khandyga" | "Asia/Kolkata" | "Asia/Krasnoyarsk" | "Asia/Kuala_Lumpur" | "Asia/Kuching" | "Asia/Kuwait" | "Asia/Macau" | "Asia/Magadan" | "Asia/Makassar" | "Asia/Manila" | "Asia/Muscat" | "Asia/Nicosia" | "Asia/Novokuznetsk" | "Asia/Novosibirsk" | "Asia/Omsk" | "Asia/Oral" | "Asia/Phnom_Penh" | "Asia/Pontianak" | "Asia/Pyongyang" | "Asia/Qatar" | "Asia/Qostanay" | "Asia/Qyzylorda" | "Asia/Riyadh" | "Asia/Sakhalin" | "Asia/Samarkand" | "Asia/Seoul" | "Asia/Shanghai" | "Asia/Singapore" | "Asia/Srednekolymsk" | "Asia/Taipei" | "Asia/Tashkent" | "Asia/Tbilisi" | "Asia/Tehran" | "Asia/Thimphu" | "Asia/Tokyo" | "Asia/Tomsk" | "Asia/Ulaanbaatar" | "Asia/Urumqi" | "Asia/Ust-Nera" | "Asia/Vientiane" | "Asia/Vladivostok" | "Asia/Yakutsk" | "Asia/Yangon" | "Asia/Yekaterinburg" | "Asia/Yerevan" | "Atlantic/Azores" | "Atlantic/Bermuda" | "Atlantic/Canary" | "Atlantic/Cape_Verde" | "Atlantic/Faroe" | "Atlantic/Madeira" | "Atlantic/Reykjavik" | "Atlantic/South_Georgia" | "Atlantic/St_Helena" | "Atlantic/Stanley" | "Australia/Adelaide" | "Australia/Brisbane" | "Australia/Broken_Hill" | "Australia/Darwin" | "Australia/Eucla" | "Australia/Hobart" | "Australia/Lindeman" | "Australia/Lord_Howe" | "Australia/Melbourne" | "Australia/Perth" | "Australia/Sydney" | "Canada/Atlantic" | "Canada/Central" | "Canada/Eastern" | "Canada/Mountain" | "Canada/Newfoundland" | "Canada/Pacific" | "Europe/Amsterdam" | "Europe/Andorra" | "Europe/Astrakhan" | "Europe/Athens" | "Europe/Belgrade" | "Europe/Berlin" | "Europe/Bratislava" | "Europe/Brussels" | "Europe/Bucharest" | "Europe/Budapest" | "Europe/Busingen" | "Europe/Chisinau" | "Europe/Copenhagen" | "Europe/Dublin" | "Europe/Gibraltar" | "Europe/Guernsey" | "Europe/Helsinki" | "Europe/Isle_of_Man" | "Europe/Istanbul" | "Europe/Jersey" | "Europe/Kaliningrad" | "Europe/Kirov" | "Europe/Kyiv" | "Europe/Lisbon" | "Europe/Ljubljana" | "Europe/London" | "Europe/Luxembourg" | "Europe/Madrid" | "Europe/Malta" | "Europe/Mariehamn" | "Europe/Minsk" | "Europe/Monaco" | "Europe/Moscow" | "Europe/Oslo" | "Europe/Paris" | "Europe/Podgorica" | "Europe/Prague" | "Europe/Riga" | "Europe/Rome" | "Europe/Samara" | "Europe/San_Marino" | "Europe/Sarajevo" | "Europe/Saratov" | "Europe/Simferopol" | "Europe/Skopje" | "Europe/Sofia" | "Europe/Stockholm" | "Europe/Tallinn" | "Europe/Tirane" | "Europe/Ulyanovsk" | "Europe/Vaduz" | "Europe/Vatican" | "Europe/Vienna" | "Europe/Vilnius" | "Europe/Volgograd" | "Europe/Warsaw" | "Europe/Zagreb" | "Europe/Zurich" | "GMT" | "Indian/Antananarivo" | "Indian/Chagos" | "Indian/Christmas" | "Indian/Cocos" | "Indian/Comoro" | "Indian/Kerguelen" | "Indian/Mahe" | "Indian/Maldives" | "Indian/Mauritius" | "Indian/Mayotte" | "Indian/Reunion" | "Pacific/Apia" | "Pacific/Auckland" | "Pacific/Bougainville" | "Pacific/Chatham" | "Pacific/Chuuk" | "Pacific/Easter" | "Pacific/Efate" | "Pacific/Fakaofo" | "Pacific/Fiji" | "Pacific/Funafuti" | "Pacific/Galapagos" | "Pacific/Gambier" | "Pacific/Guadalcanal" | "Pacific/Guam" | "Pacific/Honolulu" | "Pacific/Kanton" | "Pacific/Kiritimati" | "Pacific/Kosrae" | "Pacific/Kwajalein" | "Pacific/Majuro" | "Pacific/Marquesas" | "Pacific/Midway" | "Pacific/Nauru" | "Pacific/Niue" | "Pacific/Norfolk" | "Pacific/Noumea" | "Pacific/Pago_Pago" | "Pacific/Palau" | "Pacific/Pitcairn" | "Pacific/Pohnpei" | "Pacific/Port_Moresby" | "Pacific/Rarotonga" | "Pacific/Saipan" | "Pacific/Tahiti" | "Pacific/Tarawa" | "Pacific/Tongatapu" | "Pacific/Wake" | "Pacific/Wallis" | "US/Alaska" | "US/Arizona" | "US/Central" | "US/Eastern" | "US/Hawaii" | "US/Mountain" | "US/Pacific" | "UTC";
  userAgent: string | null;
  waitingConditions: {
    isActive: boolean;
    type: string;
    timeout?: number | null;
    expected?: string | null;
  }[];
  browserMediaDevicesPermissions: "disabled" | "always_accept" | "always_decline";
  networkLogsPreset: "custom" | "disabled" | "basic" | "full";
  networkLogsCategories: ("fetch_xhr" | "doc" | "manifest" | "socket" | "wasm" | "other")[];
};
type VisualRegressionRefScreenshot = {
  id: string;
  stepId: string;
  projectArtifactId: string | null;
  screenshotUrl: string | null;
  browserName: string | null;
  osName: string | null;
  screenSizeType: string | null;
  runProfileId: string | null;
  runProfileName: string;
  runMode: "server" | "local" | "recording" | null;
  created: string;
  modified: string;
};
```
