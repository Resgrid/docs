---
sidebar_position: 52
title: Search
---

# Search

**Search** finds things across the whole department in one place: calls (including call notes), Records reports, people, units, contacts, occupancies, messages, notes, documents, protocols, trainings, calendar events, shifts, groups and stations, points of interest, legacy logs, deployments and — with Business Ops — invoices, bids, contracts and rate cards. Search by name, number, address or any words in the text. You only ever see results you are allowed to open.

There are two ways in:

- **The search box in the top bar** — quick answers while you type, plus **Go to** shortcuts to pages and actions.
- **The Search page** — every match, with type and date filters, sorting, paging and a CSV export. Press **Enter** in the top-bar box (or pick **Search all results**) to open it.

Search is switched on per department by Resgrid (the `Search.Unified` feature flag). When it is off, the Search page says *Search is not available for your account* and the top-bar box offers only the **Go to** shortcuts.

![Search results](/img/web-app/home/search-results.png)

## The top-bar search box

Click the box to see **Go to** shortcuts — the pages and actions you are allowed to use, such as *New Call*, *Archived Calls*, *Add Person*, *Manage Invites* or *Two-Factor Authentication*. Start typing and the list narrows to the best shortcuts (up to 8) and the best matching items (up to 10), grouped by type. Pick one to open it.

- Shortcuts understand everyday words and small typos: *new call*, *invite*, *2fa*, *roster*.
- **Search all results** (always the last row) or **Enter** opens the Search page for what you typed.
- Records reports are not listed in the box — use the Search page for those.
- On phones and small tablets the box is replaced by a **search icon** in the top bar, which opens the Search page.

## The Search page

| Control | What it does |
|---|---|
| **Search box** | The words to look for (see [Writing a search](#writing-a-search)). |
| **Search in** | **Everything**, or one type: Calls, Reports (Records), Logs, Personnel, Units, Contacts, Occupancies (Pre-plans), Points of Interest, Groups & Stations, Messages, Notes, Documents, Protocols, Trainings, Calendar, Shifts, Deployments, Invoices, Bids, Contracts, Rate Cards, Certification Types. Only the types you may view are listed. |
| **From / To** | A date range in your department's time zone. Both days are included; a reversed range is swapped. Which date each type uses is listed in [What you can find](#what-you-can-find). |
| **Sort by** | **Best match** (default), **Newest first** or **Oldest first**. |
| **Export CSV** | Downloads the matching results (see below). Shown once there are results. |

Changing a filter re-runs the search straight away.

### Reading the results

Each result shows an icon and type badge, the **title** (click anywhere on the row to open it), then whatever applies: number, date, status and category. Below that is the item's summary and, when the match was found deeper in the text, an excerpt around it. The words you searched for are highlighted.

Results come 25 to a page with **Previous** / **Next**.

### How many results

When Resgrid can prove the exact number of results you are allowed to see, the page says *Showing 1–25 of 140* and shows the page number. When it cannot, the page says *Showing 1–25* and, if there are more, *There are more matches than can be counted here*.

An **Everything** search with no dates looks at the best 200 matches. Choosing a **type** or a **date range** looks at up to **1,000** — narrow the search that way when you need a complete count or list.

### Export CSV

**Export CSV** downloads every matching result you can open, up to **1,000** rows, with the same type, dates and sort as the page. Columns: *Type, Title, Number, Date, Status, Category, Summary, Match, Link*. Dates are in your department's time zone; *Number* is filled for calls and occupancies; *Match* is the excerpt around the match; *Link* opens the item. The file is named `search-<type>-<date>.csv` (`search-all-…` for Everything).

## Writing a search

| You type | It finds |
|---|---|
| `engine 1` | Results containing **every** word, in any field — title, number, summary or text. |
| `"trouble alarm"` | The exact phrase. Combine phrases and words: `"building 4" sprinkler`. |
| `eng` | The **last word may be unfinished**: names and numbers starting with it match at once (*Engine 1*, *Engineer*); words in the body text match once you have typed 3 letters. |
| `26-1188`, `1HGCM82633A004352` | Numbers and identifiers: call, incident, reference and record numbers, invoice, bid and contract numbers, VIN and plate, member ID, occupancy and parcel numbers. |
| `3125550151` | Phone numbers of callers, contacts and alarm companies — type the digits without spaces or dashes; the start of the number is enough. |
| `110 Main Street` | For calls and occupancies, a street address also finds the same address written differently (*110 Main St*). Address matches come first. |

Matching ignores capitals and common English words (*the*, *and*, *of*). Nothing else is special syntax: `AND`, `OR`, `*` and `-` have no special meaning.

**Reports (Records)** are searched in their own index: all words are required, but quotes do not force an exact phrase and the last word is not completed for you. Under **Best match**, reports are listed after the other results.

## What you can find

Every result is checked again when you search: you see it only if you could open it from its own page, and only while its module is switched on for the department.

| Type | What is searched | Who sees it | Opens | Date used |
|---|---|---|---|---|
| **Calls** | Name, number, incident / reference / external numbers, nature, type, address, caller name and number, dispatch notes, closing notes, **every call note**, and custom call fields | Anyone who can view calls; group-limited dispatch applies | The call | Logged on |
| **Reports (Records)** | Record number, summary, call number and the safe fields of the report; the **narrative** when your department's search index includes it (see [Records → Settings](records/settings#search)) | Administrators and members who can view records, within their group visibility; needs Records activated | The report | Occurred on |
| **Logs** | Log type, course, instructors, agencies and units; narrative, location, cause and people fields | Anyone who can view logs | The log | Started on |
| **Personnel** | Name, ID number, group, roles and custom fields. Phone numbers, e-mail and addresses are **never** searched | Members who can view users (respecting *Group only*); you can always find yourself. Deleted, disabled and hidden members never appear | The person | Profile last updated |
| **Units** | Name, type, station, VIN, plate and custom unit fields | Members who can view units (respecting *Group only*) | The unit's edit page if you may edit it, otherwise its events page | When last indexed |
| **Contacts** | Names, company, addresses, e-mail, phone numbers, category, website, other info, contact notes and custom fields | Anyone who can view contacts | The contact | When last indexed |
| **Occupancies (Pre-plans)** | Name, number, parcel id, address, hazards, alarm company and phone, panel location, tactical summary. Gate codes, Knox box locations, emergency contacts and access notes are **never** searched | Members who can view records, with occupancies enabled | The occupancy | Last modified |
| **Points of Interest** | Name, type, address and note | Anyone, when the Mapping module is on | The point of interest | When last indexed |
| **Groups & Stations** | Name and address | Anyone who can view groups | The group's edit page if you may edit it, otherwise its row on the Groups & Stations list | When last indexed |
| **Messages** | Subject and body | **Only the sender and recipients** — administrators included | The message | Sent on |
| **Notes** | Title and body | Anyone who can view notes; admin-only notes to administrators; expired notes are hidden | The note | Added on |
| **Documents** | Name, description, file name, category and type. The **contents of files are not searched** | Anyone who can view documents; admin-only documents to administrators | The document | Added on |
| **Protocols** | Name, code, description and protocol text | Anyone who can view protocols | The protocol | Last updated |
| **Trainings** | Name, description and training text | Anyone who can view trainings | The training | Created on |
| **Calendar** | Title, location and description (one result per recurring series) | Anyone who can view the calendar | The event | Start |
| **Shifts** | Name and code | Anyone who can view shifts | The shift calendar | Start day |
| **Deployments** | Name, status, incident / resource order / request numbers, RMS order id, cost code, point of hire. Notes, time reports and expenses are **never** searched | Administrators, members who can view deployments, and members **on the deployment's roster** | The deployment | Start |
| **Invoices** | Invoice number, status, issue date, currency, linked deployment and contract. Amounts, lines and customer details are **never** searched | Members who can view invoicing, with [Business Ops](business-ops/overview) | The invoice | Issued on |
| **Rate Cards** | Name, status and description | Members who can view invoicing, with Business Ops | The rate card | Added on |
| **Bids** | Bid number and title, status, incident number, requested start | Members who can view bids, with Business Ops | The bid | Added on |
| **Contracts** | Contract number, name, status and term | Members who can view contracts, with Business Ops | The contract | Start |
| **Certification Types** | Name, code, issuing authority and description. Members' certification records are **never** searched | Administrators and members who can view or set up certifications | The type | When last indexed |

*Custom fields* are searched only when their visibility is **Everyone** and they are not marked sensitive. Very long text is searched up to its first 8,000 characters (32,000 for calls and logs).

### Advanced Data Protection

When the department is enrolled in [Advanced Data Protection](data-protection), protected text is not searchable: call details and notes (the call **number** still works), report narratives, log narratives, message subjects and bodies, document names, personnel ID numbers and custom fields. **Contacts** and **calendar events** drop out of search entirely. Names, numbers and everything that is not protected keep working.

## How up to date it is

- New and edited items are searchable within about **1–2 minutes**.
- The first time anyone in a department searches, Resgrid builds the department's search index. Until it finishes, the page says *Your department's search index is being built* and results may be incomplete for a few minutes.
- *The search index is not available right now* means the search service is briefly unavailable — try again shortly.
- **Every call** the department has ever logged is searchable, active or closed, however old.

## Setup examples

Nothing needs configuring: once search is on, every member can use it within their own permissions. Some ways departments use it:

| Department type | How they use search |
|---|---|
| **Fire** | Type the street address on the way to a call to see earlier calls there and the occupancy pre-plan; search `standpipe` or `"fire alarm panel"` across pre-plans and call notes. |
| **EMS** | Find a run by incident number; choose **Calls** and a date range, sort **Oldest first** and **Export CSV** for a QA review. |
| **SAR** | Search a trailhead or area name to find past callouts and their notes; find members by role (`K9`, `rope`). |
| **Emergency management** | Find partner agencies in Contacts by company, plans in Documents, and past activations by name. |
| **Security / industrial** | Look up a site by address or alarm company phone; find a unit by plate or VIN. |
| **Contract services** | Find a deployment by resource order or incident number, then its bids, contracts and invoices by number. |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/Search` (`Index`: `q`, `type`, `from`, `to`, `sort`, `page`), `/User/Search/Export`, `/User/Search/GetSearchResults?query=` (top-bar box) — all `Department_View` |
| API | `GET api/v4/Search/Search` (`query`, `types`, `skip`, `take` ≤ 100, `fromUtc`, `toUtc`, `sort`), `GET api/v4/Search/Typeahead` (prefix match on titles and identifiers, `take` ≤ 25); administrators: `POST api/v4/Search/Rebuild` (queues a rebuild of the department's index), `GET api/v4/Search/Health` |
| Feature flag | `Search.Unified` (seeded off, M0208); see [Feature flags](../reference/feature-flags) |
| Installation config | `SearchConfig.Enabled` (search host, every process), `IndexPath`, `MaxPageWindow` (1,000), `MaxResults` (200, Records), `CallRebuildYears` (0 = every year; a positive value limits a rebuild to that many recent years and turns the call history backfill off), `CallBackfillBatchSize` (250), `CallBackfillSecondsPerSweep` (20; 0 = off); optional S3 object store `S3Endpoint` / `S3Bucket` / `S3Prefix` (web processes re-read the published index every `ReaderPullSeconds`, 30) |
| Workers | 70 `SearchIndexCommand` — every minute: catches up changed items, rebuilds a department when its index generation changes or a rebuild is requested (up to `MaxRebuildsPerSweep` per run), then spends up to `CallBackfillSecondsPerSweep` on the **call history backfill** — one batch per department per run, newest call first, adding only calls search does not hold (it restores calls that rebuilds before October 2026 left out, without taking any department's results offline); 44 — the Records index |
| Model | `SearchProjections` (one row per searchable item), `SearchIndexStates` (+ `CallBackfillCursor`, `CallBackfillCompletedOn`, M0261), `SearchIndexLeases`; type names in `SearchEntityTypes` |
| Services | `IUnifiedSearchService`, `ISearchProjectionService`, `ISearchIndexMaintenanceService`, `IGlobalSearchService`, `ISystemActionsService` (91 **Go to** shortcuts in `SystemActionCatalog`), `IRecordsSearchService` |
| Limits | 25 results per page; 200 candidates for Everything, 1,000 with a type or dates; export 1,000 rows; query 500 characters |
| Data protection | Protected text is indexed only while Advanced Data Protection is not enforced, and returned only while the department's policy is disabled |

### Interactions with Other Modules
| Module | Interaction |
|--------|-------------|
| **Security** | Every type follows the view permission of its own module, including *Group only* for users and units |
| **Department Settings** | A module switched off (Messaging, Documents, Notes, Training, Calendar, Shifts, Logs, Mapping, Business Operations) removes its type from search |
| **Records** | Reports and occupancies come from Records; narrative search status is shown on [Records → Settings](records/settings#search) |
| **Advanced Data Protection** | Withdraws protected text from search |
