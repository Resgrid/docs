---
sidebar_position: 6.5
title: Configure Resgrid
---

# Configure Resgrid

**Department menu → Import & Migration → (workspace) → Configure**

The **Configure** tab lists the settings an import can change in your department: the department record, your profile and logo, which modules are turned on, the names your department uses, the map, call, document and record numbering, and a few permissions. Resgrid suggests values from your [operating profile](../help-setup) and from the data you are importing; you accept, change or decline each one. Nothing changes until you approve an import: accepted settings are changed first, before any data, and each change can be rolled back while nobody has changed that setting since.

:::note Preview feature
Import & Migration is a **Preview** feature: it is off by default and Resgrid turns it on per department while it is being rolled out.
:::

<a id="where"></a>
## Where to find it

The **Configure** tab of a workspace, between **Issues** and **Review & import**. The **Configure Resgrid** step of the journey on the Overview tab opens it too.

| Area | Contents |
|---|---|
| **Your department** | Your operating profile (kinds of department, workforce, dispatch model, operating hours) and **Edit your operating profile** — or **Describe your department** when you have not saved one yet. |
| **Stat tiles** | **Will be changed** (accepted settings that differ from what your department has now; opens Review & import) and **Waiting for your decision** (suggestions you have not accepted or declined). |
| **Accept all suggestions** | Accepts every suggestion still waiting, except permissions you cannot preview. Each group also has **Accept the suggestions in this group**. |
| **Groups** | **Department**, **Profile and logo**, **Modules**, **Names**, **Map**, **Numbering** and **Permissions**. A group with something to change or decide opens by itself. |

Each group is a table with the columns **Setting**, **Now**, **Proposed** and **Status**, and per row **Accept**, **Decline**, **Change** and **Undo**.

<a id="enable"></a>
## Turning it on

Part of Import & Migration: the `Onboarding.MigrationWizard` flag on for your department and a department administrator signed in. See [Overview → Turning it on](overview#enable).

**Permissions** additionally need Admin Assist's impact preview, so the department administrator must be able to use Admin Assist (the `Admin.Assist` flag). Without it the Permissions group says *Permission changes need Admin Assist's impact preview, which is not available to you. Use the Security page to change permissions.* and offers no change.

<a id="profile"></a>
## Describe your department

The suggestions come from your department's operating profile — the same profile Admin Assist uses. **Describe your department** (or **Edit your operating profile**) opens it; it is saved straight away, without waiting for an import. Choose every kind of department you are (fire, EMS, search and rescue, security…), your workforce, how you are dispatched and your operating hours.

Without a saved profile, nothing is suggested from it; data sets can still ask for the modules they need.

<a id="suggestions"></a>
## Where suggestions come from

Every proposed value carries its origin under it:

| Origin | What it suggests |
|---|---|
| **Suggested from your operating profile** | **Modules** that each of your kinds of department works in, when they are turned off (the pack's name is shown, for example *Search and rescue*). **Names** that departments of your kind commonly use, when the module still has Resgrid's name: search and rescue *Missions* for Calls and *Teams* for Units, security *Incidents* for Calls and *Officers* for Personnel, industrial *Incidents* for Calls. A name is suggested only when every kind you chose that names it agrees. With an upstream CAD as your dispatch model, **Who can Create Calls** set to **Department and Group Admins** (*calls come from an upstream CAD*). |
| **From the data you are importing** | A module that a data set needs, when it is turned off — for example **Mapping** for points of interest (*for Points of interest*). A data set whose module is off is refused when the import starts, so turning it on here lets the same import write it. And the **Map centre**, when your department has none yet: the middle of the stations you are importing (*the middle of the 12 stations you are importing*), worked out from the latitude and longitude of the station rows that passed the checks and aren't left out. It uses the median position, so a station or two in the wrong place doesn't pull the map away; a position of 0, 0 counts as missing. |
| **Suggested from the products you are moving from** | **Names** the products you chose under [Where your data comes from](uploading-and-checks#products) use for Resgrid's features, when the feature still has Resgrid's name (the products are shown, for example *Aladtec*): *Members* for Personnel (Aladtec, Active911, D4H Team Manager, IamResponding), *Apparatus* for Units (First Due, Emergency Reporting, NFIRS 5.0), *Vehicles* for Units (DIVERA 24/7; *Fahrzeuge* when you use Resgrid in German) and *Incidents* for Calls (D4H Team Manager). Only a word in the language you use Resgrid in is suggested, because the name is shown in every language. When two of your products name the same feature differently, neither is suggested. |
| **Entered by you** | Any value you type or choose with **Change**. |
| **Entered by Resgrid Support** | A value Resgrid support entered with **Prepare** or **Operate** [support access](getting-help-from-support#import-support-access). |

Suggestions never turn a module off, never replace a name you have chosen, and never touch a setting that already has the suggested value. They are worked out again every time the page opens, so changing your profile or your data sets changes them; your decisions are kept.

<a id="settings"></a>
## The settings

<a id="department"></a>
### Department

| Setting | What it changes |
|---|---|
| **Department name** | The department's name (up to 150 characters). |
| **Time zone** | The time zone calls, shifts, numbering and reports use. |
| **24-hour clock** | Whether times are shown in 24-hour format. |
| **Address** | The department's address (street, city, state or region and country required; postal code optional). |

An import never changes the department's managing user.

<a id="branding"></a>
### Profile and logo

**Short name** (up to 50 characters), **Description** (up to 2,000), **Phone number** (up to 50) and **Website** (an `http` or `https` address) are shown on your profile, printouts and emails. Leave one empty to clear it.

**Logo**: **Upload a logo** takes a PNG or JPEG of at most 2 MB and at least 200 pixels on the longer side, and accepts it as the proposed logo. The image is checked when you upload it and re-encoded into the logo, print header, email masthead and thumbnail when the import runs — exactly as on the Profile screen; the file you uploaded is never shown to anyone. An uploaded logo is kept with the workspace's other files and purged with them.

<a id="modules"></a>
### Modules

**Messaging**, **Mapping**, **Shifts**, **Logs**, **Reports**, **Documents**, **Calendar**, **Notes**, **Trainings**, **Inventory**, **Maintenance and Work Orders (Readiness Pro)**, **Checklists** and **Business Operations**, each **On** or **Off** — the same switches as [Module settings](../department-settings). Turning a module off hides it from everyone; its data is kept. Calls, Personnel and Units are always on, and AI features are turned on or off on their own screen.

With Admin Assist, a module change shows *What this changes*: how many members' menus change and how much existing data the module holds.

<a id="names"></a>
### Names

Every module and record type your department can rename (see [Department settings → Terminology](../department-settings#terminology)): Calls, Personnel, Units, Contacts, Mapping, Shifts, Records, Logs, Reports, Documents, Calendar, Notes, Trainings, Inventory, Readiness, Work Orders, Checklists, Workforce & Business, and the record types Run, Training, Work, Meeting, Coroner, Callback, Unit activity and NERIS incident report.

A name is up to 50 characters and is shown in every language. Leave it empty to keep Resgrid's name (shown as *Resgrid's name (Calls)*). When both your operating profile and a product you are moving from suggest a name for the same feature, the product's word is suggested.

<a id="map"></a>
### Map

| Setting | What it changes |
|---|---|
| **Map centre** | Where maps open: a latitude and longitude in decimal degrees. Suggested from your stations' positions when you have none. |
| **Map zoom level** | From 0 (the whole world) to 15 (streets). |
| **Map style by day** / **Map style by night** | The map styles of [Mapping settings](../mapping), or **Automatic**. |

<a id="numbering"></a>
### Numbering

| Setting | What it changes |
|---|---|
| **Call numbers · pattern** | How call numbers are written, for example `{YYYY}-{SEQ}`. |
| **Call numbers · sequence digits** | How many digits the sequence has (1 to 8, zero-padded). |
| **Call numbers · numbering year starts** | The first day of the numbering year, when numbers start again from 1. |
| **Call numbers · next number** | The sequence the next call receives: continue your old system's numbering. |
| **Document numbers · numbering year starts** | The same for work orders, invoices, bids and time reports. |
| **Work orders / Invoices / Bids / Time reports · pattern, sequence digits, next number** | Each kind's own pattern (empty = Resgrid's built-in numbers), digits and next number. |

Patterns use `{YYYY}`, `{YY}`, `{MM}`, `{DD}` and `{SEQ}` (exactly once) with letters, digits and `- _ . /`, as on [Call settings](../department-settings) and Document numbering. Rules:

- **The next number can only go up.** It can't be lower than the number Resgrid would use next already, and a rollback does not lower it.
- **A document kind needs its own pattern** before it takes sequence digits or a next number: Resgrid's built-in numbers have neither. Accept the pattern and the next number together.
- A next number accepted together with a new pattern or year start is checked against the new numbering when the import runs.
- Record numbers have their own group, below.

<a id="record-numbering"></a>
### Record numbering

Shown only while Records is turned on for your department. These are the settings of [Records settings → Numbering](../records/settings#numbering).

| Setting | What it changes |
|---|---|
| **Record numbers · pattern** | How record numbers are written, for example `{PREFIX}-{YYYY}-{SEQ}` (RUN-2026-0153). |
| **Record numbers · sequence digits** | How many digits the sequence has (3 to 8, zero-padded). |
| **Record numbers · numbering year starts** | The first day of the numbering year. Records request, prevention, investigation and evidence numbers follow it too. |
| **Run, Training, Work, Meeting, Coroner, Callback, Unit activity, NERIS incident report · prefix** | What `{PREFIX}` writes for the record type: 2 to 6 letters or digits. Empty is the type's default (RUN, TRN, WRK, MTG, COR, CBK, UNT, INC). A new prefix starts its own sequence. Record types are named as your department names them. |
| **… · next number** | The sequence the type's next record receives this numbering year, for records with no station or group: continue the numbers your old system issued. |
| **Records requests / Occupancies / Inspections / Permits / Investigations / Evidence · pattern, sequence digits, next number** | Each kind's own pattern (empty = Resgrid's built-in numbers), digits and next number. |

The record pattern uses `{PREFIX}`, `{YYYY}` or `{YY}`, `{GROUP}` (the station, followed by `-`, `_` or `.`) and `{SEQ}` (exactly once) with letters, digits and `- _ .`, up to 40 characters. The other kinds use the call-number tokens. Besides the numbering rules above:

- **Shared sequences.** A pattern without `{PREFIX}`, or two types given the same prefix, gives those types one sequence; two different next numbers for it are named before you can approve (*These record types share one sequence, so give them the same next number.*).
- **Station sequences.** A pattern with `{GROUP}` numbers each station separately; set those next numbers in the Records settings (*This pattern numbers each station separately…*).
- The pattern, digits, year start and prefixes are written before the next numbers, so a next number is checked against the numbering it lands in.
- If Records is turned off after you decided record numbering, the decisions stay visible with *Records isn't turned on for your department…* and hold the import back until you undo them.

<a id="permissions"></a>
### Permissions

**Who can Create Calls**, **Who can Create Notes**, **Who can View Personal Info**, **Who can view users**, **Who can view units**, **Who can see the Location of Personnel** and **Who can see the Location of Units** — the permissions Admin Assist can preview. For each, choose who can do it (**Everyone**, **Department Admins**, **Department and Group Admins**, or **Department Admins and Select Roles** with the roles), and for the four viewing permissions (users, units and their locations) whether it applies **Only within their own group**.

Permissions are never read from a file: they are suggested or chosen here. Each proposed change shows Admin Assist's *What this changes* — how many members gain or lose the permission — before you accept it. Other permissions are set on the [Security](../security-permissions) page.

<a id="support"></a>
## When Resgrid support prepares settings

With **Prepare** or **Operate** [support access](getting-help-from-support#import-support-access), Resgrid support can prepare settings for you from BackOffice: accept or decline suggestions, enter values and upload a logo. Their drafts show a **Resgrid staff** label (and *Entered by Resgrid Support* when they typed the value), appear on the timeline as Resgrid staff actions, and change nothing until an import is approved — by you, or under a managed migration by two Resgrid staff members (and you, when you asked to approve imports).

- Support **never changes permissions**: those stay your decision, with Admin Assist's preview.
- Support **never overrides a value you decided**. They can ask you in the message thread instead.
- You can change or undo any staff draft; once you decide a setting yourself it is yours. Support can undo only their own drafts.
- With **Observe** or **Inspect** access, support can see this tab as you do, but change nothing. At **Observe** the map centre suggestion is hidden from them, because it comes from the station positions in your files.

<a id="statuses"></a>
## Statuses

| Status | Meaning |
|---|---|
| **Suggested** | A suggestion waiting for your decision. |
| **Will be changed** | Accepted, and different from what your department has now: the next approval changes it. |
| **Already set** | Accepted, but your department already has this value: nothing to change. |
| **Declined** | You declined the suggestion; it stops waiting. **Undo** brings it back. |
| **Changed** | Changed by an import. |
| **Not changed** | The import could not change it; the reason is shown (for example *The next number can't be lower than the number Resgrid would use next already.*). Change the value and approve again. |
| **Rolled back** | Changed by an import and undone by its rollback. |

An accepted value that cannot be changed as it stands — a document's next number without its own pattern, a role that no longer exists, a logo that was purged — shows the reason under its status and stops approval until you fix it.

<a id="approval"></a>
## When the settings change

Accepted settings go with every import you approve:

- [Review & import](review-and-import) shows *N settings will be changed first, before any data.* with the count per group, and adds the statement *I have reviewed the settings that will change. Each one can be rolled back while nobody has changed it since.* An import can be settings alone, with no data set.
- While an import or rollback is waiting or running, the Configure tab is read-only: the approval covers the exact values, and changing one would make it stale.
- When the import runs, settings are changed first, one at a time, each through the same screen logic as the department's own settings pages. Then the data sets are written — so a module turned on here is on before the data that needs it.
- Each change is recorded with the value it replaced, and appears in Admin Assist's **Change history** like any other settings change.
- The check after the import confirms each setting still reads as it was written; History shows **Configuration** with the number changed, already set and not changed.

<a id="rollback"></a>
## Rolling back settings

[Rolling back](rollback-and-retention) the import puts each setting back to the value it replaced — but only when nobody has changed that setting since. A setting someone changed after the import is left as they set it and listed for you to check. Two kinds of change can't be undone:

- **Next numbers** only ever go up; the numbers already issued stay issued.
- **A replaced logo** is not kept, so the previous logo is not restored; upload it again on the Profile screen. A logo added where there was none is removed.
