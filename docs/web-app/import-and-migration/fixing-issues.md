---
sidebar_position: 6
title: Fixing Issues
---

# Fixing Issues

**Department menu → Import & Migration → (workspace) → Issues**

The checks rarely find one problem at a time — usually it is *23 people have a phone number we couldn't read*. So the **Issues** tab groups problems by kind, explains why each matters and how to fix it, and offers one-click fixes for the whole group. Every issue has a stable code (`IMP-…`) that support can look up; this page lists all of them.

:::note Preview feature
Import & Migration is a **Preview** feature: it is off by default and Resgrid turns it on per department while it is being rolled out.
:::

<a id="where"></a>
## Where to find it

- The **Issues** tab of a workspace. Its badge is the number of open **blocking** issues.
- **Issues to fix** on the Overview tab (the five most important groups), the blocked count on each data set, and the **Fix issues** link on a data set page all open it filtered to that data set.

Filter by **Data set** and tick **Show resolved issues** to see what has been accepted or excluded. When nothing is left, the tab shows *No issues — Everything we checked is ready to import* and a button to **Review and import**.

<a id="enable"></a>
## Turning it on

Part of Import & Migration: the `Onboarding.MigrationWizard` flag on for your department and a department administrator signed in. See [Overview → Turning it on](overview#enable).

<a id="groups"></a>
## How an issue group works

Each group is a panel with:

| Part | Contents |
|---|---|
| **Heading** | A severity chip — **Blocking**, **Warning** or **Note** — and the title with the number of open rows, for example *12 dates couldn't be read*. The code is shown on the right. |
| **Where** | The data set, the column and the first affected row numbers. |
| **Why and how** | The explanation and the fix, in plain words. |
| **Actions** | The fixes that apply to this group (below). |

Values from your file are never written into an issue; the rows are named by number.

| Severity | What it means |
|---|---|
| **Blocking** | The rows cannot be imported as they are. Fix them or exclude them — a data set with open blocking issues cannot be approved. |
| **Warning** | The rows can be imported, but something will be different from your file (a value left empty, a text shortened). **Accept** the warning to go ahead, or fix it. |
| **Note** | Information — for example that rows match records that already exist and will be linked rather than added. |

<a id="fixes"></a>
## Ways to fix

| Action | What it does | Offered when |
|---|---|---|
| **Accept** | Accepts a warning or note for every row in the group. | Warnings and notes |
| **Exclude these N rows** | Leaves the rows out of the import (you are asked to confirm). They can be included again later with **Reopen**. | The issue is on rows |
| **Use this value** | Replaces the problem cell in every row of the group with the value you type, then checks the rows again — for example the same station for every row with an unknown one. | The issue is on one column of some rows |
| **Ask support about this** | Opens the Support tab with the issue code attached. | Always |
| **Reopen** | Puts an accepted or excluded group back to open. | With *Show resolved issues* |

Other fixes happen elsewhere:

- **Match columns or values** — most *value doesn't match* and *reference doesn't match* issues are fixed on the data set's [matching](matching-columns-and-values) pages.
- **Fix the file and upload it again** — often quickest for many small problems. Upload the corrected file, then **Exclude** the old data set on **Files & data sets** so only the new one is imported.
- **Change something in Resgrid** — rename a duplicate record, switch on a module, add custom fields, upgrade the plan.

Every fix re-checks only what it affects, and the counts on the Overview tab update as it finishes. Accepting and excluding are remembered: a re-check does not bring back an issue you have already decided.

<a id="shown-as"></a>
## Where issues show up

The **Shown as** column in the tables below says where you meet each code:

| Shown as | Where | What to do |
|---|---|---|
| **Blocking**, **Warning**, **Note** | On the Issues tab, before approval. | Fix, exclude, accept — as above. |
| **Blocking if the field is required, otherwise a warning** | On the Issues tab. A required field's value is needed; for an optional field the value is left empty if you accept. | Fix, exclude, or accept for optional fields. |
| **File refused** | On the **Uploaded files** list. The file was not read at all. | Fix the file and upload it again. |
| **Upload stopped** | While uploading, under the upload button. Nothing was stored. | Upload again, or fix the file first. |
| **Run status** | On the **History** tab, next to a run. | Mostly nothing — Resgrid retries or waits automatically; some need a new approval. |
| **Row not imported** | After an import, on the rows the import skipped. | Check the rows, fix them and import again, or ask support. |
| **Warning after import** | After an import, on the data set. | Check by hand; see [Verify the result](verify-and-activate#verify-results). |
| **Check by hand** | After a rollback, on the History tab. | Compare the record with your source and fix it in Resgrid. |

<a id="issue-codes"></a>
## Every issue code

Grouped by the stage that raises them. Titles and explanations are the ones shown on screen; *N* stands for the number of rows or values.

<!-- BEGIN GENERATED: issues all -->

<a id="issues-file-safety"></a>

### File safety and storage

Checked when the file arrives, before anything in it is read. A refused file is never opened; upload a corrected copy.

| Code | Title | What to do | Shown as |
|---|---|---|---|
| <a id="imp-file-too-large"></a>`IMP-FILE-TOO-LARGE` | The file is larger than your plan allows | Split the file into smaller files, or remove sheets and columns you don't need. **Tip:** Limits by plan are on [Before you start](before-you-start#file-limits). | Upload stopped |
| <a id="imp-file-signature"></a>`IMP-FILE-SIGNATURE` | The file's content doesn't match its type | Export it again from your system as CSV or Excel (.xlsx). | File refused |
| <a id="imp-file-macro"></a>`IMP-FILE-MACRO` | Files with macros can't be imported | Save the workbook as a plain Excel workbook (.xlsx) without macros and upload it again. | File refused |
| <a id="imp-file-encrypted"></a>`IMP-FILE-ENCRYPTED` | The file is password-protected | Remove the password in the program that created it, save it again and upload the new copy. | File refused |
| <a id="imp-file-embedded-objects"></a>`IMP-FILE-EMBEDDED-OBJECTS` | The workbook contains embedded objects | Embedded files and objects aren't read. Remove them or copy the data into a new workbook. | File refused |
| <a id="imp-file-external-links"></a>`IMP-FILE-EXTERNAL-LINKS` | The workbook links to other files | Formulas that read other files can't be refreshed here. Paste the values in place and save again. | File refused |
| <a id="imp-file-empty"></a>`IMP-FILE-EMPTY` | The file has no data | Check that you exported the right report and that the first row holds the column names. | File refused |
| <a id="imp-file-encoding"></a>`IMP-FILE-ENCODING` | We had to guess the text encoding | If names with accents look wrong, export the file again as UTF-8 CSV. | Warning |
| <a id="imp-file-field-too-long"></a>`IMP-FILE-FIELD-TOO-LONG` | A cell is too long to read | One cell holds more text than Resgrid accepts. Shorten it or remove the column. | Blocking |
| <a id="imp-file-hash-mismatch"></a>`IMP-FILE-HASH-MISMATCH` | The upload was damaged on the way | The file we received differs from the one you chose. Upload it again. | File refused |
| <a id="imp-file-infected"></a>`IMP-FILE-INFECTED` | The file failed the virus scan | Resgrid didn't open this file. Check your computer, export the data again and upload the new file. | File refused |
| <a id="imp-file-scan"></a>`IMP-FILE-SCAN` | The file couldn't be scanned | Try again later. If it keeps happening, ask Resgrid support. | File refused |
| <a id="imp-file-scan-pending"></a>`IMP-FILE-SCAN-PENDING` | Waiting for the virus scan | The scanner is busy; Resgrid keeps trying automatically. | Run status |
| <a id="imp-file-scan-unavailable"></a>`IMP-FILE-SCAN-UNAVAILABLE` | Virus scanning is unavailable | Resgrid keeps trying for a while. If it doesn't recover, upload a CSV file instead. | File refused |
| <a id="imp-file-scanning-required"></a>`IMP-FILE-SCANNING-REQUIRED` | This kind of file needs a virus scan | Scanning isn't available here, so only CSV, text and JSON files are accepted. Export the data as CSV. **Tip:** Excel workbooks need virus scanning on the server; CSV always works. | Upload stopped |
| <a id="imp-file-too-many-rows"></a>`IMP-FILE-TOO-MANY-ROWS` | The file has more rows than your plan allows | Only the first rows were checked. Split the file into smaller files. | Blocking |
| <a id="imp-file-too-wide"></a>`IMP-FILE-TOO-WIDE` | The file has too many columns | Remove columns you don't need, or split the file. | Blocking |
| <a id="imp-file-unsupported"></a>`IMP-FILE-UNSUPPORTED` | This kind of file isn't supported yet | Upload CSV, Excel (.xlsx) or JSON. **Tip:** ZIP packages, KML, KMZ and GPX are recognized but not imported yet. | File refused |
| <a id="imp-file-control-char"></a>`IMP-FILE-CONTROL-CHAR` | N cells contain hidden control characters | Invisible characters were found that Resgrid can't store. Remove them in your spreadsheet, or exclude the rows. | Blocking |
| <a id="imp-zip-entries"></a>`IMP-ZIP-ENTRIES` | The archive holds too many files | Unpack it and upload the files you need one by one. | File refused |
| <a id="imp-zip-nested"></a>`IMP-ZIP-NESTED` | The archive contains another archive | Unpack both and upload the files you need one by one. | File refused |
| <a id="imp-zip-path"></a>`IMP-ZIP-PATH` | The archive contains an unsafe file path | Unpack it and upload the files you need one by one. | File refused |
| <a id="imp-zip-ratio"></a>`IMP-ZIP-RATIO` | The archive expands to an unusually large size | Unpack it and upload the files you need one by one. | File refused |
| <a id="imp-zip-too-large"></a>`IMP-ZIP-TOO-LARGE` | The archive is too large | Unpack it and upload the files you need one by one. | File refused |
| <a id="imp-artifact-corrupt"></a>`IMP-ARTIFACT-CORRUPT` | The stored file is damaged | Upload the file again. | Run status |
| <a id="imp-artifact-key-invalid"></a>`IMP-ARTIFACT-KEY-INVALID` | The stored file can't be read | Upload the file again. If this keeps happening, ask Resgrid support. | Run status |
| <a id="imp-artifact-key-missing"></a>`IMP-ARTIFACT-KEY-MISSING` | The stored file can't be read | Upload the file again. If this keeps happening, ask Resgrid support. | Run status |
| <a id="imp-artifact-missing"></a>`IMP-ARTIFACT-MISSING` | The file is no longer available | It may have passed its retention date. Upload it again. | Run status |
| <a id="imp-artifact-purged"></a>`IMP-ARTIFACT-PURGED` | The file was deleted after its retention period | Upload it again to continue. | Run status |
| <a id="imp-artifact-tampered"></a>`IMP-ARTIFACT-TAMPERED` | The stored file failed its integrity check | Resgrid didn't use it. Upload the file again and tell Resgrid support. | Run status |
| <a id="imp-artifact-truncated"></a>`IMP-ARTIFACT-TRUNCATED` | The stored file is incomplete | Upload the file again. | Run status |
| <a id="imp-store-unavailable"></a>`IMP-STORE-UNAVAILABLE` | File storage is unavailable | Resgrid retries automatically. You can close this page. | Run status |

<a id="issues-reading"></a>

### Reading the file

The file passed the safety checks but its rows or columns could not be read cleanly.

| Code | Title | What to do | Shown as |
|---|---|---|---|
| <a id="imp-parse-columns"></a>`IMP-PARSE-COLUMNS` | N rows have more values than there are columns | A stray comma or tab usually shifts the row. Fix the rows in your file, or exclude them. | Blocking |
| <a id="imp-parse-csv"></a>`IMP-PARSE-CSV` | The CSV file couldn't be read | Check that quotes are balanced. Saving it again from Excel usually fixes it. | Blocking |
| <a id="imp-parse-header-dup"></a>`IMP-PARSE-HEADER-DUP` | Two columns have the same name | Only one of them can be matched. Rename one in the file if both hold data you need. | Warning |
| <a id="imp-parse-json"></a>`IMP-PARSE-JSON` | The JSON file couldn't be read | Check that the file is valid JSON. | Blocking |
| <a id="imp-parse-json-shape"></a>`IMP-PARSE-JSON-SHAPE` | The JSON file isn't a list of records | Upload a list of objects, one per record. | Blocking |
| <a id="imp-parse-timeout"></a>`IMP-PARSE-TIMEOUT` | Reading the file took too long | Split the file into smaller files. | Blocking |
| <a id="imp-parse-xlsx"></a>`IMP-PARSE-XLSX` | The Excel workbook couldn't be read | Open it in Excel and save it again as .xlsx. | Blocking |

<a id="issues-matching"></a>

### Matching columns

What the file contains and which column fills which Resgrid field.

| Code | Title | What to do | Shown as |
|---|---|---|---|
| <a id="imp-detect-low-confidence"></a>`IMP-DETECT-LOW-CONFIDENCE` | We're not sure what this file contains | Choose what the file contains under Destination, then check the column matches. | Blocking |
| <a id="imp-map-required-unmapped"></a>`IMP-MAP-REQUIRED-UNMAPPED` | A required field has no column | Match a column to it, or set the same value for every row: the issue offers the field's value and **Use for every row** (see [Same value for every row](matching-columns-and-values#same-value)). | Blocking |
| <a id="imp-map-field-twice"></a>`IMP-MAP-FIELD-TWICE` | Two columns are matched to the same field | Match only one column to each Resgrid field. | Blocking |

<a id="issues-values"></a>

### Values

Each matched value is converted to its field's type. A value that cannot be read blocks the row when the field is required; otherwise it is a warning and the value is left empty if you accept it.

| Code | Title | What to do | Shown as |
|---|---|---|---|
| <a id="imp-type-boolean"></a>`IMP-TYPE-BOOLEAN` | N values aren't yes or no | Use yes/no, true/false, 1/0, or x and blank. | Blocking if the field is required, otherwise a warning |
| <a id="imp-type-colour"></a>`IMP-TYPE-COLOUR` | N colours couldn't be read | Use a hex colour such as #D32F2F. | Blocking if the field is required, otherwise a warning |
| <a id="imp-type-coordinate"></a>`IMP-TYPE-COORDINATE` | N coordinates are out of range | Latitude is between -90 and 90 and longitude between -180 and 180, in decimal degrees. | Blocking if the field is required, otherwise a warning |
| <a id="imp-type-date"></a>`IMP-TYPE-DATE` | N dates couldn't be read | Use a full date such as 2026-03-04. | Blocking if the field is required, otherwise a warning |
| <a id="imp-type-date-ambiguous"></a>`IMP-TYPE-DATE-AMBIGUOUS` | N dates could be read two ways | Tell us whether the column is day/month or month/day; we ask once per column. On the Issues tab, answer *Does 03/04/2026 mean 3 April 2026 or 4 March 2026?* with **Day first** or **Month first**, or choose under [How dates are written](matching-columns-and-values#dates) on the data set page. **Tip:** Dates written as YYYY-MM-DD (2026-03-04) are never ambiguous: fix the column in your spreadsheet and upload it again, or exclude the rows. | Blocking |
| <a id="imp-type-datetime"></a>`IMP-TYPE-DATETIME` | N dates and times couldn't be read | Use a full date and time such as 2026-03-04 14:30. | Blocking if the field is required, otherwise a warning |
| <a id="imp-type-datetime-dst"></a>`IMP-TYPE-DATETIME-DST` | N times fall in a daylight-saving gap | These local times don't exist on that date. Check them in your system. | Blocking if the field is required, otherwise a warning |
| <a id="imp-type-decimal"></a>`IMP-TYPE-DECIMAL` | N values aren't numbers | Use digits with a point or comma for decimals. | Blocking if the field is required, otherwise a warning |
| <a id="imp-type-integer"></a>`IMP-TYPE-INTEGER` | N values aren't whole numbers | Use whole numbers without units. | Blocking if the field is required, otherwise a warning |
| <a id="imp-type-language"></a>`IMP-TYPE-LANGUAGE` | N languages weren't recognized | Use a language code such as en, es or fr. | Blocking if the field is required, otherwise a warning |
| <a id="imp-type-range"></a>`IMP-TYPE-RANGE` | N values are out of range | Check the allowed range shown with the field. | Blocking if the field is required, otherwise a warning |
| <a id="imp-type-time"></a>`IMP-TYPE-TIME` | N times couldn't be read | Use 24-hour times such as 14:30. | Blocking if the field is required, otherwise a warning |
| <a id="imp-type-timezone"></a>`IMP-TYPE-TIMEZONE` | N time zones weren't recognized | Use a time zone name such as America/Chicago, or leave it empty for your department's time zone. | Blocking if the field is required, otherwise a warning |
| <a id="imp-type-too-long"></a>`IMP-TYPE-TOO-LONG` | N values are too long | They are shortened if you accept the warning, or you can edit them in your file. | Blocking if the field is required, otherwise a warning |
| <a id="imp-type-unknown"></a>`IMP-TYPE-UNKNOWN` | N values couldn't be read | Check the values in your file. | Blocking if the field is required, otherwise a warning |
| <a id="imp-type-url"></a>`IMP-TYPE-URL` | N web addresses couldn't be read | Use a full address that starts with https://. | Blocking if the field is required, otherwise a warning |
| <a id="imp-email-invalid"></a>`IMP-EMAIL-INVALID` | N email addresses look wrong | Each person needs a working email address to be invited. | Blocking if the field is required, otherwise a warning |
| <a id="imp-phone-unparseable"></a>`IMP-PHONE-UNPARSEABLE` | N phone numbers couldn't be read | Phone numbers need a country code, for example +1 555 123 4567. We assumed your department's country; check these numbers. | Blocking if the field is required, otherwise a warning |
| <a id="imp-choice-unmapped"></a>`IMP-CHOICE-UNMAPPED` | N values don't match a Resgrid option | Match each value to a Resgrid option under Match values. **Tip:** See [Matching values](matching-columns-and-values#match-values). | Blocking if the field is required, otherwise a warning |

<a id="issues-row-rules"></a>

### Row rules

Rules that look at a whole row.

| Code | Title | What to do | Shown as |
|---|---|---|---|
| <a id="imp-required-missing"></a>`IMP-REQUIRED-MISSING` | N rows are missing a required value | Fill in the value in your file, set a value for these rows, or exclude them. | Blocking |
| <a id="imp-row-expires-before-issued"></a>`IMP-ROW-EXPIRES-BEFORE-ISSUED` | N certifications expire before they were issued | Check the dates; one of them is probably wrong. | Blocking |
| <a id="imp-row-coordinates-pair"></a>`IMP-ROW-COORDINATES-PAIR` | N rows have only a latitude or only a longitude | Give both or neither. | Blocking |
| <a id="imp-excluded-sensitive"></a>`IMP-EXCLUDED-SENSITIVE` | A column was left out on purpose | Resgrid never imports passwords, national ID numbers, card numbers or similar data. Nothing to do. **Tip:** See [what is never imported](before-you-start#not-imported). | Note |

<a id="issues-file-rules"></a>

### File-wide rules

Rules that look across every row of the data set.

| Code | Title | What to do | Shown as |
|---|---|---|---|
| <a id="imp-dup-in-file"></a>`IMP-DUP-IN-FILE` | N rows are duplicates within the file | Each value may appear only once. Remove the extra rows or exclude them. | Blocking |
| <a id="imp-dup-source-id"></a>`IMP-DUP-SOURCE-ID` | N rows share the same record ID | Each record ID must be unique. Fix the IDs or exclude the extra rows. | Blocking |
| <a id="imp-hierarchy-cycle"></a>`IMP-HIERARCHY-CYCLE` | N groups form a loop of parents | A group can't be its own parent's parent. Change one parent to break the loop. | Blocking |

<a id="issues-references"></a>

### References

Values that point at another record: a row in another file of the workspace or a record already in Resgrid.

| Code | Title | What to do | Shown as |
|---|---|---|---|
| <a id="imp-ref-unresolved"></a>`IMP-REF-UNRESOLVED` | N references don't match anything | The value names a record we couldn't find in your files or in Resgrid. Match it under Match values, or add the record. **Tip:** See [Matching values](matching-columns-and-values#match-values). | Blocking |
| <a id="imp-ref-ambiguous"></a>`IMP-REF-AMBIGUOUS` | N references match more than one record | Make the names unique, or match the value under Match values. | Blocking |

<a id="issues-department"></a>

### Your department

Checks against what your department already has, your plan and the modules you use.

| Code | Title | What to do | Shown as |
|---|---|---|---|
| <a id="imp-match-existing"></a>`IMP-MATCH-EXISTING` | N rows match records that already exist | They are linked to the existing records, not added again. | Note |
| <a id="imp-match-ambiguous"></a>`IMP-MATCH-AMBIGUOUS` | N rows match more than one existing record | Your department has two records with this name. Rename one in Resgrid, or exclude these rows. | Blocking |
| <a id="imp-person-existing-account"></a>`IMP-PERSON-EXISTING-ACCOUNT` | N people already have a Resgrid account | They are invited to join your department at activation instead of being added. **Tip:** See [Existing Resgrid accounts](people#people-accounts). | Note |
| <a id="imp-person-deleted-member"></a>`IMP-PERSON-DELETED-MEMBER` | N people were removed from your department before | They come back when you confirm it on Review & import, and can't sign in or receive anything until you invite them. Exclude their rows to leave them out. | Note |
| <a id="imp-person-inactive"></a>`IMP-PERSON-INACTIVE` | N people are marked inactive | They are imported disabled and hidden. | Note |
| <a id="imp-person-will-be-admin"></a>`IMP-PERSON-WILL-BE-ADMIN` | N people will become administrators | You confirm each one before going live; until then they are normal members. | Note |
| <a id="imp-plan-capacity"></a>`IMP-PLAN-CAPACITY` | Your plan doesn't have room for everyone | Upgrade your plan, or import fewer people or units. **Tip:** Your plan's limits are on [Subscription & Billing](../subscription-billing). | Blocking |
| <a id="imp-plan-capacity-unknown"></a>`IMP-PLAN-CAPACITY-UNKNOWN` | We couldn't check your plan's limits | Try again shortly. Nothing that needs a seat is imported until the check works. | Blocking |
| <a id="imp-entitlement-missing"></a>`IMP-ENTITLEMENT-MISSING` | This data needs a feature your department hasn't turned on | Turn on the module, or ask Resgrid support. **Tip:** Points of interest need the Mapping module switched on under Department Settings → Module Settings. | Blocking |
| <a id="imp-custom-fields-missing"></a>`IMP-CUSTOM-FIELDS-MISSING` | Add these custom fields first: ‹field names› | Your department already has custom fields. Add fields with these names on the Custom Fields screen, then check the file again. **Tip:** The screen is [User Defined Fields](../user-defined-fields) (Department menu). | Blocking |

<a id="issues-consequences"></a>

### Consequences

What Resgrid will do later because the imported data exists. Each one is a statement you tick on Review & import.

| Code | Title | What to do | Shown as |
|---|---|---|---|
| <a id="imp-consequence-undecided"></a>`IMP-CONSEQUENCE-UNDECIDED` | A consequence needs your decision | Read the statement under Review & import and tick it to continue. **Tip:** See [Consequences](review-and-import#l8-consequences). | Blocking |
| <a id="imp-replace-unsupported"></a>`IMP-REPLACE-UNSUPPORTED` | Replace isn't available for this kind of data | Replace works for call priorities and certification types. Choose Add only or Review updates, or leave this data set out. **Tip:** See [Replace](review-and-import#replace). | Blocking |
| <a id="imp-replace-one-dataset"></a>`IMP-REPLACE-ONE-DATASET` | Replace takes one file per kind of data | Another data set has the same destination. Exclude one of them, or put all the rows in one file. | Blocking |
| <a id="imp-replace-cannot-retire"></a>`IMP-REPLACE-CANNOT-RETIRE` | Some existing records can't be retired | They are still in use, for example a certification type people hold, so Replace can't retire them. Add them to your file, or choose Review updates. | Blocking |

<a id="issues-import"></a>

### Import and approval

Shown on the History tab while an import runs, or on the rows an import could not write.

| Code | Title | What to do | Shown as |
|---|---|---|---|
| <a id="imp-approval-stale"></a>`IMP-APPROVAL-STALE` | The data changed after it was approved | Review it and approve it again. | Run status |
| <a id="imp-approver-not-authorized"></a>`IMP-APPROVER-NOT-AUTHORIZED` | The approver can no longer approve imports | Another administrator needs to approve the import again. | Run status |
| <a id="imp-department-locked"></a>`IMP-DEPARTMENT-LOCKED` | Another operation is running for your department | Resgrid tries again automatically when it finishes. | Run status |
| <a id="imp-run-error"></a>`IMP-RUN-ERROR` | A temporary problem interrupted the work | Resgrid tries again automatically. | Run status |
| <a id="imp-run-transient"></a>`IMP-RUN-TRANSIENT` | A temporary problem interrupted the work | Resgrid tries again automatically. | Run status |
| <a id="imp-run-no-handler"></a>`IMP-RUN-NO-HANDLER` | This kind of run isn't available | Ask Resgrid support. | Run status |
| <a id="imp-run-nothing-approved"></a>`IMP-RUN-NOTHING-APPROVED` | Nothing was approved for this run | Approve data sets under Review & import. | Run status |
| <a id="imp-run-stalled"></a>`IMP-RUN-STALLED` | The work stopped making progress | Resgrid restarts it automatically from the last checkpoint. | Run status |
| <a id="imp-workspace-closed"></a>`IMP-WORKSPACE-CLOSED` | The workspace is closed | Start a new workspace. | Run status |
| <a id="imp-changed-since-preview"></a>`IMP-CHANGED-SINCE-PREVIEW` | N records changed after the preview | Someone edited them in Resgrid. Review those rows again. | Row not imported |
| <a id="imp-target-missing"></a>`IMP-TARGET-MISSING` | N matched records no longer exist | They were deleted after the preview. | Row not imported |
| <a id="imp-row-write-failed"></a>`IMP-ROW-WRITE-FAILED` | N rows couldn't be imported | The rest of the import continued. Ask Resgrid support about these rows. | Row not imported |
| <a id="imp-person-account-failed"></a>`IMP-PERSON-ACCOUNT-FAILED` | N accounts couldn't be created | The rest of the import continued. Ask Resgrid support about these people. | Row not imported |
| <a id="imp-cert-type-scope"></a>`IMP-CERT-TYPE-SCOPE` | N certifications use a type meant for units | Choose a certification type that people hold. | Row not imported |
| <a id="imp-unit-cert-type-scope"></a>`IMP-UNIT-CERT-TYPE-SCOPE` | N unit certifications use a type meant for people | Choose a certification type meant for units. | Row not imported |
| <a id="imp-requirement-type-scope"></a>`IMP-REQUIREMENT-TYPE-SCOPE` | N role requirements use a type meant for units | A role can only require a certification type that people hold. | Row not imported |
| <a id="imp-protected-write-blocked"></a>`IMP-PROTECTED-WRITE-BLOCKED` | N rows couldn't be saved with their protection | Advanced Data Protection could not protect these values, so they were not saved. Try the import again later, or ask Resgrid support. | Row not imported |
| <a id="imp-deferred-failed"></a>`IMP-DEFERRED-FAILED` | Some finishing steps didn't complete | Group parents, next statuses or roles may need a check by hand. | Warning after import |
| <a id="imp-replace-retire-failed"></a>`IMP-REPLACE-RETIRE-FAILED` | Some records weren't retired | They were taken into use after the preview, so they were kept. | Warning after import |
| <a id="imp-reconcile-mismatch"></a>`IMP-RECONCILE-MISMATCH` | The check after the import found a difference | Compare the counts under History, and ask Resgrid support if they don't match. **Tip:** See [Verify the result](verify-and-activate#verify-results). | Warning after import |

<a id="issues-rollback"></a>

### Rollback

Items a rollback left in place for you to check by hand.

| Code | Title | What to do | Shown as |
|---|---|---|---|
| <a id="imp-rollback-account"></a>`IMP-ROLLBACK-ACCOUNT` | An account couldn't be closed | Remove the person on the Personnel screen. | Check by hand |
| <a id="imp-rollback-changed-since"></a>`IMP-ROLLBACK-CHANGED-SINCE` | A record changed after the import | It was left as it is; check it by hand. | Check by hand |
| <a id="imp-rollback-failed"></a>`IMP-ROLLBACK-FAILED` | A record couldn't be undone | Check it by hand. | Check by hand |
| <a id="imp-rollback-has-activity"></a>`IMP-ROLLBACK-HAS-ACTIVITY` | A record is in use | It was used after the import (for example on a call, or the person signed in), so it was kept. **Tip:** See [what rollback keeps](rollback-and-retention#rollback-keeps). | Check by hand |
| <a id="imp-rollback-manual"></a>`IMP-ROLLBACK-MANUAL` | A record needs a check by hand | Compare it with your source and fix it in Resgrid if needed. | Check by hand |
| <a id="imp-rollback-member-update"></a>`IMP-ROLLBACK-MEMBER-UPDATE` | Changes to an existing member need a check by hand | Something the import added to this person was changed afterwards, so it was left as it is. Review their group, roles and details on the Personnel screen. | Check by hand |
| <a id="imp-rollback-no-commit"></a>`IMP-ROLLBACK-NO-COMMIT` | The import to undo wasn't found | Ask Resgrid support. | Run status |
| <a id="imp-rollback-no-writer"></a>`IMP-ROLLBACK-NO-WRITER` | This kind of record can't be undone automatically | Check it by hand. | Check by hand |

<a id="issues-upload"></a>

### Upload

Shown while a file is being sent. Nothing was stored; start the upload again.

| Code | Title | What to do | Shown as |
|---|---|---|---|
| <a id="imp-upload-chunk-conflict"></a>`IMP-UPLOAD-CHUNK-CONFLICT` | Two uploads of the same file overlapped | Wait a moment and try again. | Upload stopped |
| <a id="imp-upload-chunk-empty"></a>`IMP-UPLOAD-CHUNK-EMPTY` | Part of the upload was empty | Upload the file again. | Upload stopped |
| <a id="imp-upload-chunk-hash"></a>`IMP-UPLOAD-CHUNK-HASH` | Part of the upload was damaged | Upload the file again. | Upload stopped |
| <a id="imp-upload-chunk-order"></a>`IMP-UPLOAD-CHUNK-ORDER` | Parts of the upload arrived out of order | Upload the file again. | Upload stopped |
| <a id="imp-upload-chunk-size"></a>`IMP-UPLOAD-CHUNK-SIZE` | Part of the upload had the wrong size | Upload the file again. | Upload stopped |
| <a id="imp-upload-expired"></a>`IMP-UPLOAD-EXPIRED` | The upload took too long | Start the upload again. | Upload stopped |
| <a id="imp-upload-incomplete"></a>`IMP-UPLOAD-INCOMPLETE` | The upload didn't finish | Upload the file again. | Upload stopped |
| <a id="imp-upload-too-much"></a>`IMP-UPLOAD-TOO-MUCH` | More data arrived than the file's size | Upload the file again. | Upload stopped |
| <a id="imp-workspace-full"></a>`IMP-WORKSPACE-FULL` | The workspace holds as much data as your plan allows | Delete files you don't need, or start a new workspace. | Upload stopped |

*121 codes, from the English UI text.*

<!-- END GENERATED: issues all -->
