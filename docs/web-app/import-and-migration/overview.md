---
sidebar_position: 1
title: Import & Migration Overview
---

# Import & Migration — Overview

**Department menu → Import & Migration**

**Import & Migration** brings the data your department already has into Resgrid: people and their emergency contacts, stations and groups, roles and the certifications they require, certification types and the certifications people hold, unit types, units and their certifications, custom statuses, call types, call priorities, and points of interest with their types. You work from a spreadsheet (CSV, Excel `.xlsx`, JSON, JSON Lines or GeoJSON), from the Resgrid starter workbook, or from an export of the system you are leaving. Every row is checked and shown to you before anything is saved, every import is journaled so it can be rolled back, and imported people stay **dormant** — they cannot sign in and receive nothing — until you invite them.

:::note Preview feature
Import & Migration is a **Preview** feature: it is off by default and Resgrid turns it on per department while it is being rolled out.
:::

<a id="import-migration"></a>
## What you can bring

Each kind of data is a **data set** with a fixed list of fields (its *contract*). One uploaded CSV file, or one sheet of a workbook, becomes one data set. Data sets are imported in dependency order: stations before the people who belong to them, unit types before the units that use them.

| Data set | What it holds | Field reference |
|---|---|---|
| **Statuses** | Status buttons for people, units and staffing levels, grouped into sets. | [Statuses](statuses) |
| **Certification types** | The certifications your people (or units) hold — Firefighter I, EMT, CPR … | [Roles & certifications](roles-and-certifications#sheet-certification-types) |
| **Stations and groups** | Stations and organizational groups, with addresses and parent groups. | [Stations & groups](stations-and-groups) |
| **Roles** | The roles people fill — Engineer, Paramedic, Officer … | [Roles & certifications](roles-and-certifications#sheet-roles) |
| **People** | Members with contact details, station or group, roles and department-only details. | [People](people) |
| **People's certifications** | Which certifications each person holds, with numbers and dates. | [Roles & certifications](roles-and-certifications#sheet-personnel-certifications) |
| **Unit types** | The kinds of apparatus you run — Engine, Ladder, Ambulance … | [Units](units#sheet-unit-types) |
| **Units** | Apparatus and other units, with type, station, vehicle details and seats. | [Units](units#sheet-units) |
| **Call types** | The kinds of call you are dispatched to. | [Call types & priorities](call-types-and-priorities#sheet-call-types) |
| **Call priorities** | Priorities with colours and dispatch behaviour. | [Call types & priorities](call-types-and-priorities#sheet-call-priorities) |
| **Point of interest types** | The kinds of place on your map — Hydrants, Hospitals, Schools … | [Points of interest](points-of-interest#sheet-poi-types) |
| **Points of interest** | Places on your map, each with a type and a location. | [Points of interest](points-of-interest#sheet-pois) |

Passwords, national ID numbers, card and bank numbers, dates of birth, alarm and gate codes and medical information are **never** imported — see [Before you start](before-you-start#not-imported).

<a id="where"></a>
## Where to find it

- **Department menu → Import & Migration** (below *Subscription & Billing*). The item appears only for department administrators, and only when the feature is turned on for your department.
- **Setup Wizard → step 1 → Import or migration → Open Import & Migration** — the starting point for a new department. See [Help & Setup](../help-setup#start-setup).
- Directly at `/User/DepartmentImport`.

The landing page lists your **import workspaces** (name, what you are doing, status, last activity) with **Resume** / **Open** and **Cancel**, a **Start an import** panel, a link to these pages and a **Settings** button ([Import & Migration settings](rollback-and-retention#import-settings)). Two banners can appear: *File storage for imports is not set up on this system yet* (uploads are disabled until the server's import storage is configured) and *An import is running for your department right now* (you can prepare another workspace, but only one import writes at a time).

A **workspace** holds everything for one migration: the files, the checked rows, your decisions, the import runs and the support conversation. You can leave and come back at any time; long steps run in the background and keep going if you close the page.

| Start an import field | Notes |
|---|---|
| **What are you doing?** | *Set up a new department*, *Add to a live department*, *Update a live department (reviewed)* or *Continue an earlier import* — see [Workspace modes](#modes). |
| **Name** | For example *Move from our old system*. |
| **Internal reference** | Optional — a ticket or project number. |
| **Target go-live date** | Optional; shown in the workspace heading. |

Inside a workspace the heading shows the mode, the target go-live date, *N of N data sets ready*, the **support access** badge (*Off*, or the level and its expiry), open support requests, unread messages and when it was last saved. The tabs are:

| Tab | What it is for | Page |
|---|---|---|
| **Overview** | Your progress (journey steps with *Done* / *Needs attention* / *To do* chips), the **Next step** card, stat tiles (rows checked, ready to import, need attention, imported, people to invite), one card per data set, the top issues, help from Resgrid and the timeline. | this page |
| **Files & data sets** | Upload files, download the starter workbook and templates, see each data set; open one to match its columns and values. | [Uploading and checks](uploading-and-checks), [Matching](matching-columns-and-values) |
| **Issues** | Everything the checks found, grouped by problem, with one-click fixes. The tab shows the number of open blocking issues. | [Fixing issues](fixing-issues) |
| **Review & import** | The preview, the statements you confirm and **Approve and import**. | [Review and import](review-and-import) |
| **Verify & activate** | Results, the activation checklist, administrators, invitations and sign-off. | [Verify and activate](verify-and-activate) |
| **History** | Every run with its progress and counts; pause, resume, cancel and roll back. | [Rollback and retention](rollback-and-retention) |
| **Support** | Support requests, messages, suggestions and support access. | [Getting help from support](getting-help-from-support) |

<a id="enable"></a>
## Turning it on

| Requirement | Notes |
|---|---|
| **Feature flag `Onboarding.MigrationWizard`** | Off by default. On the hosted service Resgrid turns it on per department; on a self-hosted installation the operator does (see [Feature flags](../../reference/feature-flags)). |
| **Department administrator** | Only department administrators and the managing user can open the module — permission **72** *Manage Department Import* (`ManageDepartmentImport`). It is fixed to administrators: it is not on the Security screen and cannot be widened to roles. There is no read-only view for other members. |
| **Two-factor authentication** | Approving an import, rolling back, signing off and granting support access ask you to confirm with your second factor (within the last 10 minutes). Set it up under [Account security](../account-security). |
| **File storage** (self-hosted) | Uploaded files are stored encrypted in the installation's S3-compatible object store (`ImportConfig.S3*`, bucket `resgrid-imports`). Without it uploads are disabled. |
| **Virus scanning** (for Excel) | Excel workbooks are accepted only when the server scans uploads (`AttachmentScanningConfig`). Without scanning, CSV, text and JSON files still work. |
| **Mapping module** | Needed only for points of interest and their types. |

<a id="journey"></a>
## The journey

The **Your progress** list on the Overview tab follows these steps. Steps 3–6 repeat for each data set, and you can import in **waves** — for example stations and roles first, check them in Resgrid, then come back for people.

| # | Step | You | Resgrid |
|---|---|---|---|
| 1 | **Start** | Start a workspace and choose what you are doing. | Creates the workspace. |
| 2 | **Get your files** | Download the [starter workbook](starter-workbook) or export from your current system, then upload. | Uploads in pieces, scans the file, splits workbooks into data sets and works out what each one contains ([details](uploading-and-checks)). |
| 3 | **Match columns and values** | Confirm what each file contains, which column fills which field, and how codes in your file map to Resgrid options ([details](matching-columns-and-values)). Skipped for the starter workbook. | Re-checks after every change. |
| 4 | **Fix issues** | Work through grouped issues: accept a warning, exclude rows, set a value, or fix the file and upload it again ([details](fixing-issues)). | Runs the [verification ladder](uploading-and-checks#ladder). |
| 5 | **Review & approve** | Read the preview, tick the statements, choose how existing records are treated, approve with your second factor ([details](review-and-import)). | Freezes what you approved; a second administrator may need to approve too. |
| 6 | **Import** | Watch progress on the History tab, or leave. You can pause or cancel between chunks. | Writes in dependency order, in small chunks, journaling every change. |
| 7 | **Verify** | Review the checks that compare what was written with what was approved ([details](verify-and-activate)). | Reconciles counts and refreshes caches and search. |
| 8 | **Activate & invite** | Confirm administrators, invite people, sign off ([details](verify-and-activate#invite-people)). | Sends invitations in small batches outside night hours. |
| 9 | **After import** | Roll back within the window, or let files and checked data expire ([details](rollback-and-retention)). | Deletes files and checked data on schedule. |

<a id="modes"></a>
## Workspace modes

| Mode | Use it when | Default for existing records | Rollback window |
|---|---|---|---|
| **Set up a new department** | You are moving everything into a department that is not live yet. | Your department default (*Add only* unless changed in Settings). | Until you sign off, then 30 more days. |
| **Add to a live department** | Adding records — new members, more units — while people keep working. | Your department default. | 30 days after each import. |
| **Update a live department (reviewed)** | Correcting or enriching records that already exist — plates, phone numbers, groups. | **Review updates**. | 30 days after each import. |
| **Continue an earlier import** | A later export from the same system, or the next part of a phased move. | Your department default. | 30 days after each import. |

Within one workspace, a row that was already imported is recognized by its **Source ID** when you upload a corrected file again, so it is not added twice. A new workspace recognizes an earlier workspace's Source IDs only when you say it [continues that import](uploading-and-checks#continue) on its Files tab — do that first when you choose *Continue an earlier import*. Otherwise, rows are matched to existing records by name (people by email) — see the matching rules on each [field reference](people#people-matching) page.

<a id="principles"></a>
## Safety principles

- **Nothing is saved before you approve it.** Uploading, matching and fixing only change the workspace. Records are written only by an import you approved on **Review & import**, and only for the data sets you ticked.
- **Imported people are dormant.** They cannot sign in, password reset is refused, and they receive no dispatches, messages, reminders or digests until you invite them. Nobody is emailed during an import — not even a welcome email. See [Dormant members](verify-and-activate#import-dormant-members).
- **Existing data is not overwritten by default.** *Add only* never changes what is already in Resgrid; *Review updates* changes only fields of matched records, skips anything someone edited after the preview, and never touches a person's own profile (name, phone numbers, language).
- **Every import can be rolled back** within its window. Records the import created are removed, changed records get their earlier values back, and anything used since stays for you to check by hand. See [Rollback](rollback-and-retention).
- **One import writes at a time.** An import holds a department lock that keeps a second import, an Advanced Data Protection migration and department deletion out — but your department keeps working normally while it runs.
- **Resgrid support sees only what you choose to share,** for as long as you choose, and every staff action is on your timeline. See [Getting help from support](getting-help-from-support).
- **Sensitive data stays out.** Columns that look like passwords, ID numbers, card numbers, dates of birth or medical data are dropped before anything is stored, and uploaded files are encrypted and deleted on a schedule.

<a id="not-yet"></a>
## Not in this release

- **Configuration presets** (setting Resgrid up from your operating profile) and **historical data** (closed calls, training history, Records) are not part of this release.
- **Product packs** that recognize a specific vendor's export automatically are planned for later releases; until a pack is published, every file other than the Resgrid starter workbook goes through column matching, which works for any spreadsheet.
- ZIP packages, KML, KMZ and GPX files are recognized but not imported yet.

<a id="notices"></a>
## Notices you receive

The administrator who started the workspace (or, if they are no longer an administrator, the first active administrator) gets a notification when an import or rollback finishes, fails, pauses or waits for a decision; when Resgrid support posts a message, a suggestion or a status change; and after 30 days without activity. Notices name the outcome and link to the workspace — they never contain imported data. Each administrator receives them in the language set on their own profile (English when none is set).

[Admin Assist](../help-setup) also follows imports: **Setup Report** counts the area as complete once an import has been verified, and findings appear when an import has been stuck on blocking issues for over a week, finished with unexplained differences, left imported people uninvited for over two weeks, or kept files longer than usual.

<a id="tech-ref"></a>
## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/DepartmentImport/{Index,Create,CancelWorkspace,Workspace,Files,Dataset,Values,Issues,Review,History,Verify,Support,Settings}`; JSON actions `Summary`, `UploadStart`, `UploadChunk`, `UploadComplete`, `UploadStatus`, `SaveMapping`, `SaveValues`, `IssueAction`, `RunStatus`; downloads `Template`, `CurrentData`; a form post per action (`SetDestination`, `Approve`, `ApproveAsChecker`, `RunControl`, `Rollback`, `Invite`, `SignOff`, `GrantAccess`, `RevokeAccess` …) |
| v4 API | `api/v4/DepartmentImport/{GetContracts,GetTemplate,GetWorkspaces,GetWorkspace,GetProgress,StartUpload,UploadChunk,CompleteUpload,StartAnalysis}` — read-mostly. Approval, import, rollback and activation need two-factor confirmation and exist only in the web application; department API keys get no import access. |
| Permissions | `ManageDepartmentImport` (72) — department administrators only, not on the Security screen; `ManageRecordImports` (73) — reserved for Records history imports, department administrators only |
| Feature flags | `Onboarding.MigrationWizard` (master, seeded off); `Onboarding.OperationsData`, `Onboarding.ReadinessData`, `Onboarding.OperationalHistory`, `Onboarding.HistoricalRecords`, `Onboarding.VendorPacks`, `Onboarding.DepartmentPackage` (later waves, seeded off); `Onboarding.ManagedMigration` (operator-only, per department) — see [Feature flags](../../reference/feature-flags#onboarding-flags) |
| Workers | **47** `DepartmentImportCommand` — every minute: runs checks, imports and rollbacks, a watchdog every five minutes, and sends due invitations in batches. **48** `DepartmentImportMaintenanceCommand` — hourly: aborts abandoned uploads, expires support access, deletes files and checked data past retention, reminds and closes idle workspaces, sends support requests to the helpdesk. |
| Department setting | `DepartmentSettingTypes.DepartmentImportConfig` (83) |
| Notifications | `EventTypes.DepartmentImportRunFinished` (50), `EventTypes.DepartmentImportSupportMessage` (51) — sent to the workspace owner, not department broadcasts |
| Department lock | `DepartmentOperationLockType.DepartmentImport` (2) — held by import and rollback runs; does not block normal department work |
| Member state | `DepartmentMembers.ImportActivationState` — empty (not imported or active), 1 Dormant, 2 Invited, 3 Activated |
| Contracts | `Providers/Resgrid.Providers.Import/Catalog/contracts/*.json` (catalog 2026.11.1) |
| Configuration | `ImportConfig` (object store, limits, engine), `AttachmentScanningConfig` (virus scanning), `SupportConfig` (helpdesk) |
| Design | `int-Coordination/docs/architecture/department-onboarding-migration-wizard-plan.md` |
