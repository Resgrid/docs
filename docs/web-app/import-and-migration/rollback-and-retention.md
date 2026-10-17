---
sidebar_position: 9
title: Rollback & Retention
---

# Rollback, Retention and Settings

**Department menu → Import & Migration → (workspace) → History**

Every import is journaled change by change, so for a while afterwards you can **roll it back**: what it created is removed, what it changed gets its earlier values back, and anything people have used since stays for you to check by hand. Uploaded files and the checked copy of your data are kept only as long as they are useful, then deleted on a schedule you can adjust in **Import & Migration settings**.

:::note Preview feature
Import & Migration is a **Preview** feature: it is off by default and Resgrid turns it on per department while it is being rolled out.
:::

<a id="where"></a>
## Where to find it

- **Roll back** is on the **History** tab, next to each finished import that can still be rolled back — and next to a cancelled import that had already written records.
- **Settings** is the button at the top of the Import & Migration landing page (`/User/DepartmentImport/Settings`).
- File states (*Received*, *Deleted after retention*) are on the **Files & data sets** tab.

<a id="enable"></a>
## Turning it on

Part of Import & Migration: the `Onboarding.MigrationWizard` flag on for your department and a department administrator signed in. Rolling back needs your second factor. See [Overview → Turning it on](overview#enable).

<a id="rollback"></a>
## Rolling back an import

1. On the **History** tab, select **Roll back** next to the import.
2. The **Roll back this import** dialog explains what happens — *Records this import created are removed, changed records get their earlier values back, and anything used since stays for you to check by hand* — shows *Rollback is possible until …* and lists, per kind of data, how many records there are **to remove**, **to restore**, **links (nothing to undo)** and **settings to restore**.
3. Select **Roll back** and confirm with your second factor.

A **cancelled** import keeps what it wrote before it stopped, and that part can be rolled back exactly like a finished import.

The rollback runs in the background like an import, under the same department lock, and appears on the History tab as its own run. When it finishes, the data sets it covered go back to **Ready**, so you can fix them and import again.

Instead of the button you may see why a rollback is not possible: *The rollback period for this import has ended*, *This import has already been rolled back*, *An import or rollback is already waiting or running for your department* or *Only a finished import can be rolled back* (shown for an import cancelled before it wrote anything — there is nothing to undo).

<a id="rollback-window"></a>
## The rollback window

| Workspace mode | Rollback is possible |
|---|---|
| **Set up a new department** | At any time until you [sign off](verify-and-activate#checklist), and for **30 days** after that. |
| **Add to a live department**, **Update a live department (reviewed)**, **Continue an earlier import** | For **30 days** after the import finished — or, for a cancelled import, after it was cancelled. |

Each import can be rolled back once, and only one import or rollback runs for a department at a time.

<a id="rollback-does"></a>
## What rollback removes, restores and keeps

Changes are undone in the reverse order they were written — people before the stations they belong to — and each change on its own, so one record that cannot be undone never stops the rest.

| What the import did | What rollback does |
|---|---|
| **Created** a station or group, role, certification type, unit type, call type, point of interest type, point of interest or person's certification | Deletes it through Resgrid's normal delete. |
| **Created** a unit | Marks it deleted, so calls, statuses and logs that mention it stay intact. |
| **Created** a call priority, status set or status button | Marks it deleted, as the Types and Custom Statuses screens do. |
| **Created** a person | If the import created the account, the person never accepted an invitation and has no other department, the account is closed with the membership. If the account belongs to other departments too, only the membership in yours is removed. |
| **Updated** a record (*Review updates*) | Puts back the values the import replaced, field by field. |
| **Updated** an existing member (*Review updates*) | Takes back exactly what the import added: the station or group it gave someone who had none, the roles it added, and the ID number, notes and address it stored when none were stored. Anything changed since (the person was moved to another station, their details were edited) is left as it is and listed for a check by hand. |
| **Brought back** a member removed earlier | Removes them again, as they were before, together with what the import added — unless they accepted their invitation since. |
| **Retired** a record (*Replace*) | Brings it back, unless a record with the same name has been created since. |
| **Made a different call priority the default** | Restores the previous default. |
| **Linked** an existing record | Nothing to undo. |

<a id="rollback-keeps"></a>
### What is kept for a check by hand

Rollback never deletes something people have started to use. These records stay in place and are counted on the rollback run (*N checks differ*):

| Situation | Code |
|---|---|
| The record is in use: a person accepted their invitation; a station still has members, units or child groups; a role still has members; a certification, unit or point of interest type is still used; a status set still has buttons added since. | `IMP-ROLLBACK-HAS-ACTIVITY` |
| Someone changed the record after the import, so restoring the old values would overwrite their work. | `IMP-ROLLBACK-CHANGED-SINCE` |
| Something the import added to an existing member was changed afterwards — review the person's group, roles and details on the Personnel screen. | `IMP-ROLLBACK-MEMBER-UPDATE` |
| An account could not be closed — remove the person on the Personnel screen. | `IMP-ROLLBACK-ACCOUNT` |
| The record could not be undone, or cannot be undone automatically. | `IMP-ROLLBACK-FAILED`, `IMP-ROLLBACK-NO-WRITER`, `IMP-ROLLBACK-MANUAL` |

Custom fields the import created for people or units stay; remove them on [User Defined Fields](../user-defined-fields) if you no longer need them. See the [rollback codes](fixing-issues#issues-rollback).

<a id="retention-schedule"></a>
## Retention

| Data | Kept | Then |
|---|---|---|
| **Uploaded files** (encrypted) | 7 days after the import that used them has been verified (72 hours when Advanced Data Protection is enforced); 30 days after an import fails or the workspace is cancelled; 30 days for a refused file. A deadline that is already earlier is never pushed later. Adjustable in settings. | Deleted from storage. The file list shows *Deleted after retention*. |
| **Unfinished uploads** | 24 hours. | Discarded. |
| **Checked data** — the checked rows, issues and value choices of a workspace | Until 30 days after [sign-off](verify-and-activate#checklist) (adjustable); for a cancelled workspace, as long as its files. | Deleted; the workspace becomes **Closed**. Imported records stay. |
| **Idle workspaces** | A reminder after 30 days without activity. | After 90 days without activity the workspace is closed as **Abandoned** and its files and checked data are deleted. |
| **Saved matches** | While your department exists. | — |
| **Support access** | Until the grant expires or you revoke it. | Expires automatically. |
| **Imported records** | They are your department's data. | Kept like any other record. |

Deletion runs hourly. You can also **Cancel** an unfinished workspace on the landing page — *Uploaded files and checked data will be deleted after the retention period. Records already imported stay.* — which puts its files on the shorter failure schedule. A workspace that is importing, or one that is already live, cannot be cancelled.

<a id="setting-departmentimportconfig"></a>
<a id="import-settings"></a>
## Import & Migration settings

**Import & Migration → Settings** — *How long imported files and checked data are kept, and how imports are approved.* The values apply to the whole department.

| Field | Default | Notes |
|---|---|---|
| **Keep uploaded files after a successful import (days)** | 0 = 7 days (72 hours with Advanced Data Protection) | 0–180. |
| **Keep files that failed (days)** | 0 = 30 days | 0–180. Also used when a workspace is cancelled. |
| **Keep checked data after go-live (days)** | 0 = 30 days | 0–180. *Rollback needs this data* — keep it at least as long as you may want to roll back. |
| **Default for records that already exist** | *Add only* | *Add only* or *Review updates* — the default for new workspaces (see [write modes](review-and-import#write-modes)). |
| **Default support access (days)** | 0 = 7 days | 0–30. The length the **Grant access** dialog starts with on the Support tab. |
| **Require a second administrator to approve every import** | Off | *Two people, not one person twice: the second approver must be a different administrator.* Turning it on applies to every approval from then on; workspaces started while it was on keep requiring it. |

Stored as department setting 83, `DepartmentImportConfig`.
