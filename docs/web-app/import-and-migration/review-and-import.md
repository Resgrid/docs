---
sidebar_position: 7
title: Review & Import
---

# Review and Import

**Department menu → Import & Migration → (workspace) → Review & import**

**Review & import** is the only place where data is written to your department. It shows exactly what will happen — how many records will be added, linked, updated or skipped, whether your plan has room, and what Resgrid will do afterwards because the data exists — and asks you to confirm it in plain sentences before you approve with your second factor. The import then runs in the background, in small steps you can pause.

:::note Preview feature
Import & Migration is a **Preview** feature: it is off by default and Resgrid turns it on per department while it is being rolled out.
:::

<a id="where"></a>
## Where to find it

The **Review & import** tab of a workspace, or **Review and import** on a ready data set's card or the **Next step** card.

| Area | Contents |
|---|---|
| **Stat tiles** | Totals across the data sets: **Add**, **Update or link**, **Unchanged**, **Invite to join**, **Blocked** (opens the Issues tab). |
| **What will happen** | A bar chart per data set and a table: data set, status, *Add*, *Update or link*, *Unchanged*, *Skip*, *Blocked*. |
| **Approve** | The [capacity statement](#capacity), anything that stops approval, the data sets in this import, the statements to confirm, the [write mode](#write-modes) and **Approve and import**. |

<a id="enable"></a>
## Turning it on

Part of Import & Migration: the `Onboarding.MigrationWizard` flag on for your department and a department administrator signed in. Approving needs **two-factor authentication** — you confirm with your second factor (within the last 10 minutes) when you approve. See [Overview → Turning it on](overview#enable).

<a id="preview"></a>
## Reading the preview

| Decision | Meaning |
|---|---|
| **Add** | A new record will be created. |
| **Update or link** | The row matches a record that already exists. With *Add only* it is **linked** — not changed, but other rows can refer to it. With *Review updates*, rows whose values differ are **updated**. People who were removed from your department before are counted here too: they [come back](people#people-matching) when you confirm it. |
| **Unchanged** | Already imported from this workspace (same Source ID), or nothing to change. |
| **Skip** | Left out: rows you excluded, and people whose email already has a Resgrid account elsewhere (shown separately as **Invite to join** — they are invited to join at activation instead of being added). |
| **Blocked** | Rows with open blocking issues. They are not imported; fix or exclude them on the Issues tab. |

How rows are matched to existing records is described on each field reference page — for example [People](people#people-matching) are matched by email.

<a id="capacity"></a>
## Plan capacity

People and units must fit your plan. The preview reads your plan fresh and says, for example, *This adds 412 people (room for 438) and 27 units (room for 40).* Other data sets — stations, roles, types, statuses, places — use no seats. On plans with one combined limit for people and units, the room is shared.

| Message | Meaning |
|---|---|
| *Your plan doesn't have room for everyone in this import.* | Approval is blocked. Upgrade on [Subscription & Billing](../subscription-billing), exclude rows, or import fewer people or units. |
| *We couldn't check your plan's limits right now. People and units can't be added until the check works.* | Approval is blocked while the plan cannot be read. Try again in a few minutes. |

Capacity is checked again when the import starts, and each new person or unit is counted as it is written, so nothing beyond your plan is ever written.

<a id="blockers"></a>
## What stops approval

- *An import is already waiting or running for this workspace.* Only one import or rollback runs per department at a time.
- *No data set is ready yet: fix the open issues first.*
- The capacity messages above.
- *Another data set must be imported first, or in the same import (for example stations before people).* A data set that refers to another data set of the workspace needs it imported earlier or ticked in the same import.

<a id="statements"></a>
## Please confirm

Before **Approve and import** works you tick every statement:

| Statement | When it appears |
|---|---|
| *N people will be added. None of them will be notified or able to sign in until you invite them.* | Always. |
| *N certifications have already expired. Resgrid will mark them expired and will not email the holders.* | People's certifications with an expiry date in the past. |
| *N certifications expire soon. Reminders wait until the holder is invited.* | Certifications expiring within your department's certification reminder period (60 days if none is set). |
| *N new status sets will become the buttons your people and units see.* | New personnel or staffing status sets. |

<a id="l8-consequences"></a>
### Consequences

The last three statements are **consequences**: things Resgrid would do later, on its own schedule, because the imported data exists. Writing quietly is not enough to stop them, so each one is decided up front and shown as an issue (*A consequence needs your decision*) until you tick it. Expired certifications are imported already marked *Expired*, so the nightly expiry check has nothing to announce; reminders for certifications expiring soon cannot reach anyone while the holder is dormant, and start once the person accepts their invitation.

<a id="write-modes"></a>
## How existing records are treated

**How to treat records that already exist**:

| Mode | What it does |
|---|---|
| **Add only** | Never changes what is already in Resgrid. New rows are added; rows that match an existing record are linked to it. |
| **Review updates** | Also updates matched records — only the fields your file fills, and only where the value differs. It skips any record someone edited in Resgrid after the preview (*records changed after the preview* — review those rows again). For **people** only department data changes: station or group, group administrator, roles, ID number, notes and home address. A person's own profile — name, phone numbers, time zone, language — is never changed by an import. Links to other records (a unit's type and station, a group's parent) and a station's address are set when a record is created and are not changed by an update. |
| **Replace** | Works like *Review updates*, and also **retires** the records of this kind that your file doesn't contain, so what you import becomes the whole set — for example your call priorities or certification types. Only offered while [Resgrid support](getting-help-from-support#import-support-access) has **Prepare** access or more to the workspace, and always needs a second administrator. See [Replace](#replace). |

The default comes from the workspace: *Update a live department (reviewed)* uses **Review updates**; the other modes use the department default in [settings](rollback-and-retention#import-settings) (*Add only* unless changed). The preview — every row's decision and the counts above — is worked out for the workspace's choice. To change it, choose the other mode under **How to treat records that already exist** on the Approve panel and select **Recalculate the preview**: *Saved. We're recalculating the preview; it appears here when it's ready.* Approvals already given are withdrawn, and approval waits until the new preview is ready (*The preview is being recalculated. Refresh this page in a moment.*). Approving always uses the mode the preview was calculated for.

<a id="replace"></a>
### Replace

Replace is for making your file the complete list of one kind of record. It is deliberately hard to reach:

- It is offered only while Resgrid support holds **Prepare** access or more to the workspace (support helps you check the file), or — in a [managed migration](getting-help-from-support#managed) — when your Operate grant includes Replace.
- It covers **one data set** of one kind of record at a time, and works for **call priorities** and **certification types**: records Resgrid can retire and bring back exactly. For any other kind the data set shows *Replace isn't available for this kind of data*.
- The preview lists how many existing records will be retired, as a statement you tick: *N existing records that your file doesn't contain will be retired. Rolling the import back restores them.* The list is fixed when the preview is calculated; a record added afterwards is never retired, and if the list changes you are asked again.
- A record still in use — a certification type people hold — cannot be retired: the data set shows *Some existing records can't be retired*. Add it to your file or use *Review updates*.
- A second administrator always approves a Replace, even when your settings don't require one.

Retired records are marked deleted, as the Types and Certifications screens do, so calls and history that mention them stay intact. [Rolling the import back](rollback-and-retention#rollback-does) brings them back.

<a id="approve"></a>
## Approving

1. Tick the **data sets in this import** (all ready data sets are ticked).
2. Tick every statement.
3. Check the write mode shown on the Approve panel; to change it, recalculate the preview first ([above](#write-modes)).
4. Select **Approve and import** and confirm with your second factor.

The approval freezes exactly what you saw — the rows, your matches and value choices, your fixes and the catalog version. If anything in those data sets changes afterwards, the approval is withdrawn and the data set has to be approved again. The approved data sets show **Approved** and you are taken to the **History** tab.

<a id="two-approvers"></a>
### Second approver

When **Require a second administrator to approve every import** is on ([settings](rollback-and-retention#import-settings)), the import waits as **Waiting for second approval** and the Review & import tab shows *This import waits for a second administrator to approve it.* A **different** department administrator opens the tab, reviews the same preview and selects **Approve as second administrator** (with their own second factor). *Two people, not one person twice*: the first approver cannot approve again. If the data changed after the first approval, the second approval is refused — approve it again from the start.

When Resgrid staff run an import or a rollback for you under a [managed migration](getting-help-from-support#managed), this tab shows its state instead: *Resgrid staff requested this on your department's behalf. It waits for a second Resgrid staff member to approve it.* (no button), then — if you asked to approve before anything is imported — *Two Resgrid staff members approved this. It starts when an administrator of your department approves it.* with **Approve and start** (with your second factor). Your approval is not possible until the second Resgrid staff member has approved.

<a id="running"></a>
## What runs in the background

The import runs on Resgrid's background workers, so you can close the page. It goes through these phases:

1. **Prepare** — checks that the data is still exactly what was approved and that the approver is still an administrator, takes the department's import lock, reads plan capacity once more and creates any [custom fields](matching-columns-and-values#custom-fields) the import needs.
2. **Write** — data sets in dependency order (statuses, certification types, stations and groups, roles, people, people's certifications, unit types, units, call types, call priorities, point of interest types, points of interest), 200 rows at a time. Each group of rows is saved together and every change is journaled for rollback. A row that cannot be written is set aside with an issue and the rest continue.
3. **Finish** — work that needs a whole data set first: parent groups, a status button's next statuses, and roles that waited for certifications to arrive.
4. **Refresh** — caches, the apps and search are refreshed once, and one audit entry per kind of data is recorded.
5. **Verify** — every written record is checked against what was approved; see [Verify and activate](verify-and-activate#verify-results).

While it runs, nobody is notified: no dispatch, message, welcome email or workflow is triggered, and no address is looked up with an outside service. Your department keeps working normally — the import lock only keeps a second import, an Advanced Data Protection migration and department deletion out until it finishes.

<a id="history"></a>
## Watching, pausing and cancelling

The **History** tab lists every run — file checks, imports, verifications and rollbacks — with its status, when it was requested and its progress per kind of data: *N added, N updated or linked, N unchanged, N skipped, N failed*, plus *N checks matched* or *N checks differ* when verified. It refreshes while something runs.

| Status | Meaning | Actions |
|---|---|---|
| **Waiting** | Queued. | **Pause**, **Cancel** |
| **Running** | Writing. | **Pause**, **Cancel** |
| **Checking** | Verifying what was written. | — |
| **Paused** | Stopped at a safe point, by you or because something needs a decision (the reason is shown). | **Resume** |
| **Retrying** | A temporary problem — Resgrid tries again automatically, waiting longer each time (1, 4, 16 minutes … up to 6 hours, at most 8 attempts). | **Resume** to try now |
| **Waiting for second approval** | See [Second approver](#two-approvers). | — |
| **Done** | Finished. The import can be [rolled back](rollback-and-retention#rollback) within its window. | **Roll back** |
| **Cancelled** | Stopped by you. Records already written stay; if any were written, the import can be [rolled back](rollback-and-retention#rollback) like a finished one, within 30 days of the cancellation (until 30 days after sign-off for a new department). | **Roll back** (when it wrote records) |

**Pause** and **Cancel** take effect at the next safe point between groups of rows: *Stop this run at the next safe point? What was already imported stays and can be rolled back.* Use **Pause** if you want to continue later. A run that stops making progress for 15 minutes is restarted automatically from its last checkpoint. You get a [notice](overview#notices) when an import finishes, fails or needs you.
