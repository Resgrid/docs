---
sidebar_position: 4
title: Uploading & Automatic Checks
---

# Uploading Files and the Automatic Checks

**Department menu → Import & Migration → (workspace) → Files & data sets**

You upload each file once; Resgrid does the rest in the background. Files are sent in pieces, scanned for viruses, split into **data sets** (one per CSV file or workbook sheet), matched to the kind of data they contain, and run through a ladder of checks. You can close the page at any point — the Overview tab shows *Work is running in the background* while something is still being processed, and the counts update by themselves.

:::note Preview feature
Import & Migration is a **Preview** feature: it is off by default and Resgrid turns it on per department while it is being rolled out.
:::

<a id="where"></a>
## Where to find it

**Files & data sets** tab of a workspace:

| Panel | Contents |
|---|---|
| **Upload a file** | File picker (CSV, TSV, text, Excel `.xlsx`, JSON, JSON Lines and GeoJSON) and **Upload**. |
| **Data sets** | One row per data set: name, destination (with an *N% sure* chip while it is unconfirmed), status, rows, ready, blocked (links to its issues), **Open** and **Exclude** / **Include**. |
| **Uploaded files** | Each file with its size, upload time and state: *Uploading*, *Received*, *Deleted after retention*, or the reason it was refused. |
| **Resgrid starter workbook** | Templates and current data — see [Starter workbook](starter-workbook). |

<a id="enable"></a>
## Turning it on

Uploads need the module turned on for your department (`Onboarding.MigrationWizard`), a department administrator, and — on self-hosted installations — the import file store configured. Excel files also need virus scanning on the server. See [Overview → Turning it on](overview#enable).

<a id="upload"></a>
## Uploading

1. Choose the file and select **Upload**.
2. *Preparing the file…* — your browser computes the file's fingerprint (SHA-256) first.
3. *Uploading… N%* — the file is sent in 8 MiB pieces. Each piece is checked against its own fingerprint as it arrives and stored encrypted.
4. *Finishing the upload…* — the pieces are joined and the whole file is checked against the fingerprint from step 2. A file damaged on the way is refused (*The upload was damaged on the way*).
5. *Uploaded. We're checking the file now; you can close this page.*

If the connection drops or the page reloads, select the **same file** again and **Upload**: in the same browser tab, the page asks Resgrid where the upload stopped and continues from the next piece. A different file — or the same file changed since (different size or modified time) — starts a fresh upload, and so does an upload that has expired. An upload left unfinished is cleared after 24 hours. Size limits depend on your plan — see [File limits](before-you-start#file-limits); a file over the limit, or one that would take the workspace over its total, is stopped before any of it is sent.

The original file name is shown to you but never used to store the file, and the file itself is kept only for its [retention period](rollback-and-retention#retention-schedule).

<a id="continue"></a>
## Continuing an earlier import

When the files are a later export from the same system — next month's roster, or the second part of a phased move — tell Resgrid which import they continue. On the Files tab, **Continue an earlier import** lists the department's earlier imports that brought rows in (*Spring roster — 2 data set(s) imported, last on 4/3/2026*). Choose one under **This import continues** and select **Save**: *Saved. This import continues "Spring roster"; we're checking the files again.*

From then on, for every file in this workspace:

- a row whose **Source ID** that import already brought in is recognized instead of added again — *Unchanged* with **Add only**, or an update to review with **Review updates** ([write modes](review-and-import#write-modes));
- another file can refer to that import's records by their Source IDs — for example people pointing at stations imported last time by `ST-1`.

The choice applies to every file of the workspace and is shown as *Continues "Spring roster".* Choose **No earlier import** and **Save** to stop. Once this workspace has imported rows the choice is locked (*This import has already brought in rows, so it can no longer continue another one.*), because its own Source IDs are recorded under it. Continuing an import that itself continued an earlier one keeps the chain: all three share the first import's Source IDs. Without this choice, a new workspace matches records only by name (people by email).

<a id="scan"></a>
## Virus scan and file safety

Before anything in a file is read:

- **Virus scan.** Where the server scans uploads, every file is scanned. A file that fails is never opened (*The file failed the virus scan*). If the scanner is busy, Resgrid keeps trying for up to 24 hours (*Waiting for the virus scan*). Where the server does not scan uploads, only CSV, text and JSON files are accepted.
- **Content over name.** The content must match the type: a CSV must be text, an `.xlsx` must be a real Excel workbook. Macro-enabled, binary, old-format and password-protected workbooks, workbooks with embedded objects and workbooks that link to other files are refused, each with its own explanation.
- **Formulas are never run.** Resgrid reads the values Excel last saved.
- **Size and shape.** Row, column, cell-length and sheet limits are enforced; hidden control characters in a cell are flagged.

Every refusal has a code and a plain explanation — see [File safety and storage](fixing-issues#issues-file-safety).

<a id="data-sets"></a>
## From files to data sets

- A **CSV, TSV, text or JSON** file becomes one data set.
- An **Excel workbook** becomes one data set per visible sheet. Hidden sheets, and the starter workbook's *Instructions* and *Lists* sheets, are skipped.
- The first row holds the column names. Completely blank rows and starter-workbook example rows are skipped.

**What each data set contains** (its *destination*) is worked out from its column headers:

| The file is… | Result |
|---|---|
| A **Resgrid starter workbook** sheet or CSV template | Recognized by its `Label [field_key]` headers and the `resgrid:example` column. Destination and column matches are confirmed automatically — 100% sure. |
| **Any other file** | Its headers are compared with every data set's fields and the header names each field is known by (for example *e-mail*, *mail* and *email address* for a person's email). The best fit is proposed with a confidence. When Resgrid is at least 85% sure **and** every required field has a column, the proposal is confirmed automatically; otherwise the data set waits for you as *Needs matching*. |

Open the data set to confirm or change its destination and its column matches — see [Matching columns and values](matching-columns-and-values). A data set you do not want can be **excluded** (and included again later) from the Data sets table; it is then never imported.

<a id="statuses"></a>
## Data set statuses

| Status | Meaning |
|---|---|
| **Uploading** / **Scanning** / **Checking** | Work in progress. |
| **Needs matching** | Confirm what the file contains, or match a required field. |
| **Needs attention** | Blocking issues are open — see the Issues tab. |
| **Ready** | Everything left is ready to import (warnings accepted, problem rows excluded). |
| **Approved** | Included in an approved import that has not finished yet. |
| **Importing** / **Imported** / **Verified** | Being written; written; written and reconciled. |
| **Excluded** | You left this data set out. |
| **Failed** | The data set could not be read — the reason is on the Issues tab. |

<a id="ladder"></a>
## The verification ladder

Every data set climbs the same ten-level ladder. The early levels run as soon as a file arrives and again after every change you make; the department-level checks run again when you approve and when the import starts, because their answers can change in the meantime. A **blocking** result stops that data set from being approved until you fix it or exclude the rows; a **warning** needs you to accept it.

| Level | What is checked | Example codes | When |
|---|---|---|---|
| **L0 File safety** | Virus scan, real file type, macros, password protection, embedded objects, external links, size and row/column/cell limits, control characters, encoding. | `IMP-FILE-INFECTED`, `IMP-FILE-SIGNATURE`, `IMP-FILE-MACRO` | Upload |
| **L1 Reading** | Well-formed CSV / Excel / JSON, consistent columns, duplicate column names, empty files. | `IMP-PARSE-COLUMNS`, `IMP-PARSE-HEADER-DUP` | Checking |
| **L2 Shape** | What the file contains is confirmed; every required field has a column; no field matched twice. | `IMP-DETECT-LOW-CONFIDENCE`, `IMP-MAP-REQUIRED-UNMAPPED` | Checking |
| **L3 Type** | Each value converts to its field's type: lengths, number ranges, dates, phone numbers (read with your department's country), emails, coordinates, colours, time zones, languages, choices. | `IMP-TYPE-DATE-AMBIGUOUS`, `IMP-PHONE-UNPARSEABLE`, `IMP-EMAIL-INVALID`, `IMP-CHOICE-UNMAPPED` | Checking, and again after each fix |
| **L4 Row rules** | Required values present; expiry not before issue; latitude and longitude together; sensitive columns dropped. | `IMP-REQUIRED-MISSING`, `IMP-ROW-EXPIRES-BEFORE-ISSUED`, `IMP-EXCLUDED-SENSITIVE` | Checking |
| **L5 File rules** | Unique names, emails and Source IDs within the file; no loops of parent groups. | `IMP-DUP-IN-FILE`, `IMP-DUP-SOURCE-ID`, `IMP-HIERARCHY-CYCLE` | Checking |
| **L6 References** | Every reference finds exactly one row in another file of the workspace or one existing record. | `IMP-REF-UNRESOLVED`, `IMP-REF-AMBIGUOUS` | Checking |
| **L7 Your department** | Matches with existing records, Resgrid accounts that already exist, plan capacity, modules switched on, custom fields. | `IMP-MATCH-EXISTING`, `IMP-PERSON-EXISTING-ACCOUNT`, `IMP-PLAN-CAPACITY`, `IMP-ENTITLEMENT-MISSING` | Preview, approval, import start |
| **L8 Consequences** | What Resgrid will do later because the data exists — expired certifications, status sets your people will see. Each needs your tick. | `IMP-CONSEQUENCE-UNDECIDED` | Preview |
| **L9 Approval** | The data is still exactly what was approved, and the approver is still an administrator. | `IMP-APPROVAL-STALE`, `IMP-APPROVER-NOT-AUTHORIZED` | Import start |
| **L10 Reconciliation** | What was written matches what was approved, every reference is intact, people created by the import are dormant. | `IMP-RECONCILE-MISMATCH` | After the import |

Checks never put the contents of a cell in an issue: issues name the column, the rows and the code, and the value is looked up only when you open the row. The same file, matches and catalog always produce the same issues. Every code is listed on [Fixing issues](fixing-issues#issue-codes).

<a id="api"></a>
## Uploading from a script

Automation can use the v4 API with a department administrator's sign-in: `StartUpload` (file name, size and SHA-256), `UploadChunk` (raw bytes, 1-based part number and the piece's SHA-256), `CompleteUpload`, then poll `GetProgress`. `StartAnalysis` re-runs the checks for a workspace's data sets. Matching, approval and everything after it happen in the web application. See the [technical reference](overview#tech-ref).
