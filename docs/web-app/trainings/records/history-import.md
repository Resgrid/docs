---
sidebar_position: 7
title: History import
slug: /web-app/trainings/history-import
---

# Import training history

A department moving from another training system or a spreadsheet brings its past completions in with a **CSV file**: one row per completion, with the member, course, date and hours, and optionally the category, CE fields, instructor, method and a certification. Resgrid checks the file first and shows how each row matched a member; you fix the rows that did not match, then import. Imported rows land on members' [transcripts](./transcript.md) as verified **Imported history**, and the same file can be imported again safely.

History import is free for every department. (Importing course content, such as SCORM or cmi5 packages, is part of the LMS; see [LMS](/web-app/trainings/lms/).)

**Where to find it:** **Trainings → Records → Import** (department administrators and the roles named on **Assign Training**, permission 126, held department-wide).

![The import page with the template download, the file picker and how the import works](/img/web-app/trainings/rec-import-upload.png)

## The file

**Download the template** gives an empty CSV with every column. Columns are matched by name in any order; spaces, punctuation and case do not matter, and common names from other systems are understood. Unknown columns are listed and ignored.

| Column | Also read as | Required | Notes |
|---|---|---|---|
| `Email` | E-mail, EmailAddress | One member column | Matched first |
| `MemberId` | UserId, ResgridId | One member column | The Resgrid user ID |
| `MemberExternalId` | EmployeeId, EmployeeNumber, PersonnelId, IdNumber, BadgeNumber, ExternalId | One member column | Matched against the member's identification number |
| `MemberName` | Name, Member, FullName | One member column | Exact, unique full name ("First Last" or "Last, First"); flagged *Matched by name only* |
| `Course` | CourseName, Training, Title, Class | Yes | |
| `CourseCode` | Code, CourseNumber | | |
| `CompletedOn` | Date, CompletionDate, Completed | Yes | ISO dates (`2025-03-18`) or the date format of your language; not in the future |
| `Hours` | Duration, CreditHours | Yes | 0 to 999 |
| `Category` | CategoryCode, TrainingCategory | | A [category](./categories.md) code or name. Unknown: the row is imported *Uncategorized* |
| `CeProvider`, `CeCourseNumber`, `CeHours` | Provider; CeNumber, CapceNumber; CeuHours, ContinuingEducationHours | | |
| `Instructor` | Instructors, Trainer | | |
| `Method` | MethodOfTraining, Delivery | | classroom, online, drill / field, virtual / webinar, self-study, on the job (OJT); unknown values are left empty |
| `RecordId` | ExternalRecordId, CompletionId | | The other system's id for the completion; makes repeat imports reliable |
| `Notes` | | | |
| `CertificationType` | Certification, CertificationCode | | A certification type code or name; see below |
| `CertificationNumber`, `CertificationIssuedOn`, `CertificationExpiresOn` | IssuedOn, CertifiedOn; ExpiresOn, Expiration | | |

The file must be a UTF-8 `.csv` (or `.txt`) of at most 5 MB and 10,000 rows, with a header row.

## Import a file

1. Open **Trainings → Records → Import** and, if you need it, **Download the template**.
2. Under **Upload a file** choose the **CSV file** and select **Check the file**. Nothing is written yet.
3. **Review matches** shows the totals (**Rows**, **Matched**, **No member**, **Ready to import**) and one line per row with its member, course, code, date, hours, category and **Notes**: errors (red, the row is not imported) and warnings.
4. For a row with *No member matches this row*, or one *Matched by name only* that is wrong, select **Change**, pick the member under **Member for row N** (former members are listed too: history may belong to people who have left), then **Check again**.
5. Select **Import N rows** and confirm. **Done** shows **Records written**, **Skipped** (already imported), **Certifications created** and **Credits created**. **Import another file** starts over.

![Reviewing how each imported row matched a member, with one unmatched row being assigned](/img/web-app/trainings/rec-import-review.png)

### Errors and warnings

| Message | Effect |
|---|---|
| *Course is missing.* / *Date is missing.* / *The date could not be read.* / *The date is in the future.* / *Hours are missing or not a number between 0 and 999.* / *The row could not be read.* | Row not imported |
| *No member matches this row. Pick one below.* | Row not imported until you choose a member |
| *Matched by name only. Check the member.* | Imported; check it |
| *Unknown category: the record lands in Uncategorized.* | Imported without a category |
| *Unknown certification type: no certification is written for this row.* | The training record is imported; no certification |
| *CE hours could not be read and were left empty.* / *Unknown method of training: left empty.* / *A certification date could not be read.* | Imported without that value |
| *The same completion appears earlier in the file.* | The repeat is held back |
| *Already imported* | Skipped: the row was imported before |

## What the import writes

- **Training records.** Each row becomes a verified *Imported history* record on the member's transcript, recorded as *Imported*. Imported records never become certification credits through a [credit mapping](./credit-mappings.md); use **Apply history to credits** for that, or the certification columns below.
- **Certifications and credits.** When a row names a `CertificationType`, the import finds the member's record of that certification whose dates contain the completion date. If there is none and the row gives an issue date or a certification number, it creates the certification record (an already-expired one is imported as *Expired*). The row's hours are then added to that record as a credit linked to the imported training record.
- **Repeat imports.** Every row has a stable reference: its `RecordId`, or a fingerprint of its member, course, code, date and hours. A row whose reference was imported before is skipped (*Already imported*), so after fixing the rows that were refused you can import the whole file again. Changing a row that was already imported does not change its record: void the record on the transcript and import the corrected row with a new `RecordId` (or none).

## Walkthrough: import last year's history

Cedar Valley kept last year's training in a spreadsheet: *Name, Employee #, Class, Date, Hours, Category*.

1. Dana Whitlock saves the sheet as `cedar-valley-2024-training.csv` (UTF-8). She leaves the headings as they are: *Employee #* is read as `MemberExternalId` and *Class* as `Course`.
2. On **Trainings → Records → Import** she chooses the file and selects **Check the file**.
3. **Review matches** shows 412 rows, 409 matched. Three rows for *J. Fontaine* have no member: she selects **Change**, picks *Jules Fontaine* for each, and selects **Check again**.
4. Four rows say *Unknown category* because the sheet says *Hazmat* while the category is *Hazardous materials*. She imports anyway and categorizes them afterwards on **Categorize**.
5. She selects **Import 412 rows** and confirms. **Done**: *412 records imported.*
6. To count the EMS rows toward the EMT licence, she opens **Credits → Apply history to credits** for *State EMT licence*.

## Setup examples

| Organization | What they import |
|---|---|
| **Fire department leaving another records system** | Its completions export with `RecordId`, the ISO category codes in `Category`, and `CertificationType` for FF1/FF2 rows |
| **EMS agency** | CE history with `CeProvider`, `CeCourseNumber` and `CeHours`, and `CertificationType` *NREMT-EMT* so the hours land on the current registration |
| **Volunteer fire / SAR** | A spreadsheet of drill attendance by name; most rows match by name, the rest are picked by hand |
| **Industrial ERT** | Contractor safety training from the site's learning system, matched by employee number |
| **Security / law enforcement** | Licence renewal hours with `CertificationType`, `CertificationNumber` and dates, creating the licence records at the same time |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/TrainingRecords/Import`, `ImportTemplate` (CSV), POST `ImportPreview` (dry run, `member_<row>` picks), POST `ImportCommit` |
| Permissions | Department-wide record managers (Assign Training 126, or department admin) |
| Limits | 5 MB, 10,000 rows, hours 0–999, text fields up to 4,000 characters |
| Member matching | User id, e-mail, identification number, then an exact unique full name; former (deleted, disabled, hidden) members included |
| Records written | Source kind 9 *Imported history*, status Verified, `IsBackfill = true` (no automatic credits); certification records and credits when `CertificationType` is given |
| Idempotency | Source reference from `RecordId`, else a hash of the row's facts |
| Services | `ITrainingHistoryImportService` (`TrainingHistoryImportCsv` parser) |
| Audit log | Training history imported |
