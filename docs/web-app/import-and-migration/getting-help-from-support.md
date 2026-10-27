---
sidebar_position: 10
title: Getting Help from Support
---

# Getting Help from Resgrid Support

**Department menu → Import & Migration → (workspace) → Support**

If an import is stuck, open a **support request** from the workspace. Resgrid support sees the request with its context — which data set, which issue codes, which run — but none of your data. If they need to see more, you decide how much and for how long by granting **support access**, and you can take it back at any time. Every action a Resgrid staff member takes in your workspace appears on its timeline.

:::note Preview feature
Import & Migration is a **Preview** feature: it is off by default and Resgrid turns it on per department while it is being rolled out.
:::

<a id="where"></a>
## Where to find it

- The **Support** tab of a workspace — its badge counts unread messages.
- **Help from Resgrid** on the Overview tab (*Stuck? Ask Resgrid support. We see what you choose to share, never more.*) with **Get help from Resgrid support**, your recent requests and any waiting suggestions.
- **Ask support about this** on every issue group, which opens the Support tab with the issue code attached.
- The workspace heading shows the current support access (*Off*, or the level and its expiry), open requests and unread messages.

<a id="enable"></a>
## Turning it on

Part of Import & Migration: the `Onboarding.MigrationWizard` flag on for your department and a department administrator signed in. Granting access needs your second factor. See [Overview → Turning it on](overview#enable).

<a id="requests"></a>
## Support requests

**Get help from Resgrid support** — *Describe what you need. We attach the workspace and the item you came from; your data stays private unless you grant access below.*

| Field | Notes |
|---|---|
| **About** | The issue code you came from, attached automatically. |
| **What do you need?** | *Something went wrong* (handled with higher priority), *A problem with my data* or *A question*. *Please do the migration for us* appears only when Resgrid has set up a [managed migration](#managed) for your department. |
| **Subject** | Required, up to 200 characters. |
| **Details** | Up to 4,000 characters. *Please don't paste personal information here; grant access instead if support needs to see your data.* |

**Send request** — *Request sent. We'll reply here and by email.* The request gets a number and is listed under **Support requests** with its category and status:

| Status | Meaning |
|---|---|
| **Open** | Waiting for Resgrid support. |
| **Acknowledged** | Support is working on it. |
| **Waiting for you** | Support needs something from you — see Messages. |
| **Resolved** | Support thinks it is fixed: **Confirm resolved** to close it, or **Reopen** it. |
| **Closed** | Done. |

A request carries the workspace, the data set or run you came from, the issue codes with their counts and the number of blocking issues — never values from your files, file names or column names. On Resgrid's hosted service it is also filed in Resgrid's helpdesk with your department's name, the category, your own words and those codes and counts. On a self-hosted installation without a helpdesk configured, requests stay inside the application.

<a id="thread"></a>
## Messages

Each workspace has one conversation with Resgrid support. Your messages are labelled *Your department*, staff messages *Resgrid support*; status updates appear here too. Staff messages are plain text. When support posts a message, a suggestion or a status change, the administrator who started the workspace gets a notification and the unread count appears on the Support tab. On Resgrid's hosted service, support's replies about a request are also copied to that request's helpdesk ticket as internal notes, so the support team sees the whole conversation there; your own messages stay in the workspace.

<a id="suggested-fixes"></a>
## Suggestions

With access at **Observe** or above, support can propose fixes instead of telling you what to click. They appear on the Support tab labelled **Suggested by Resgrid Support** — *Suggested column matches*, *Suggested value matches*, *Suggested fix for an issue* or a *Note* — and the Overview tab says how many are waiting. **Accept** applies the suggestion as your own decision and checks the data set again; **Reject** discards it. Nothing support suggests changes your workspace until you accept it, and accepted changes still need your approval on Review & import before anything is imported.

<a id="import-support-access"></a>
## Support access

**Support access** — *Choose how much Resgrid support may see or do in this workspace, and for how long. You can revoke it at any time.*

| Level | Support can see | Support can do |
|---|---|---|
| **Off** (default) | Only how the import is going: statuses, row and issue counts, issue codes, run times and errors, file sizes and scan results, your requests and messages. No workspace, data set, file or column names and no values. | Reply in the message thread and set a request's status (*Acknowledged*, *Waiting for you*, *Resolved*). Recovery actions that change none of your data: retry a failed run, release a run whose worker lease has expired, pause a run, re-run the checks (approvals already given are withdrawn), flag the workspace for Resgrid engineering, and — at your request — keep files up to 30 days longer or delete the stored files now. |
| **Observe** | *Progress, counts and issue codes, no values* — plus the names of your workspace, data sets and files, your column names and how they are matched, the row numbers of issues, and your [Configure](configure) tab as you see it (your settings, suggestions and decisions). | Everything above, plus suggest column and value matches. |
| **Inspect** | *Also sample values to diagnose a problem*: up to 20 rows behind one issue, with personal values (such as emails and phone numbers) partly masked and restricted or protected values never shown. Each time, your timeline shows *Sample rows viewed to diagnose an issue* with support's reason, and you get a notification. | Everything above, plus suggest fixes for issues. |
| **Prepare** | Everything above. | *Also fix mappings and values as drafts you approve*: choose a data set's destination, match its columns and values (including how dates are written, a column used for two fields and a value every row should share), choose how existing records are treated (the preview is recalculated), say which earlier import this one continues and which [products you are moving from](uploading-and-checks#products), prepare [settings](configure) (accept or decline suggestions, enter values, upload a logo — never permissions, and never over a value you decided), and — while this access lasts — let you choose [Replace](review-and-import#replace), and upload files into your workspace on your behalf. Support can also download a file you uploaded to work on it, unless your department uses Advanced Data Protection; each download appears on your timeline as *Uploaded file downloaded to work on it* with the reason, and you get a notification. Uploads are labelled as staff-authored and every change appears on the timeline as *Resgrid staff*. Staff never approve or import at this level. |
| **Operate** | Shown only for an agreed managed migration — see [below](#managed). | *Run the import for you, with two-person control.* |

To grant access choose the **Access** level, **For how many days** (it starts at your department's [Default support access](rollback-and-retention#import-settings), 7 days unless changed; at most 30, or 90 for Operate), an optional **Note for support**, and **Grant access**, then confirm with your second factor. The panel then shows, for example, *Observe access until …* with **Revoke access**. Granting a new level replaces the current one, and access ends by itself when it expires.

Values protected by [Advanced Data Protection](../data-protection) are never shown to Resgrid staff through Import & Migration, at any level.

The **Access log** lists every grant with its date and level and whether it was revoked or expired. Grants, revocations and every staff action are also on the workspace **Timeline** (Overview tab), where staff actions carry a **Resgrid staff** label. Grants and revocations are recorded in your department's [audit log](../security-permissions#audit-logs) as well.

<a id="managed"></a>
## If Resgrid is running your migration

Some departments arrange for Resgrid to carry out the migration for them (a **managed migration**). This is agreed with Resgrid separately; it is described here so you know what you will see.

- **Operate access.** It is granted either by one of your administrators — the **Operate** level appears in the Access list only once Resgrid has set up the engagement for your department — or, under a contract, by two different Resgrid super-administrators, in which case your department is notified straight away.
- **The banner.** While Operate access is active every workspace page shows *Managed by Resgrid (engagement) until (date). Resgrid staff can run this import for you; every action is logged.* with **Revoke access**.
- **Two-person control.** A Resgrid operator prepares an import or a rollback and asks for approval; a **different** Resgrid staff member reviews the same preview and approves it. Nobody approves their own work. If you ticked **Ask me before anything is imported** when granting access, the import or rollback then also waits for an administrator of your department: Review & import shows *Two Resgrid staff members approved this. It starts when an administrator of your department approves it.* with **Approve and start**. Before the second staff approval it shows *Resgrid staff requested this on your department's behalf. It waits for a second Resgrid staff member to approve it.* and you cannot approve yet.
- **Allowed actions.** Operate covers preparing data, fixing issues, importing and rolling back, and, when your grant allows it, confirming administrators, inviting your people and signing off. **Replace** is never included unless you tick it when granting access. Those last three always show up first on your [Verify & activate tab](verify-and-activate#managed), where you can approve or cancel them. Under a contract authorization every administrator is told 24 hours ahead, and nothing happens sooner unless one of you approves it.
- **Fixing rows.** To fix an issue, an operator may open the row behind it. Each time, the timeline shows *Row values viewed to fix an issue* with the operator's reason. Rather than a notification per row, every administrator gets one summary a day saying how many rows Resgrid staff opened since the last one, and by how many staff members. Protected (ADP) values are never shown, and staff cannot change them.
- **The timeline.** Every staff action is on your workspace timeline labelled *Resgrid staff*, and you are notified when an import Resgrid prepared is approved or waiting for you.
- **Revoking.** **Revoke access** takes effect immediately for viewing; an import that is running stops at its next safe point. Anything already imported stays, and it is your decision whether to roll it back.
