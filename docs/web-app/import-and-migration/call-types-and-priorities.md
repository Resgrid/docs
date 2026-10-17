---
sidebar_position: 16
title: Call Types & Priorities Field Reference
sidebar_label: "Reference: Call types & priorities"
---

# Call Types and Priorities — Field Reference

**Department menu → Import & Migration → (workspace) → Files & data sets**

Two data sets bring over your dispatch vocabulary: **Call types** (Structure fire, Medical …) and **Call priorities** (with their colours, order and whether they page people and units). After the import they are on the [Types](../types-configuration) screen.

:::note Preview feature
Import & Migration is a **Preview** feature: it is off by default and Resgrid turns it on per department while it is being rolled out.
:::

<a id="where"></a>
## Where to find it

Fill in the **Call types** and **Call priorities** sheets of the [starter workbook](starter-workbook) (or `resgrid-call-types.csv` and `resgrid-call-priorities.csv`), or upload lists from your CAD and match them on the [matching](matching-columns-and-values) page. **Download current data** exports your existing call types and priorities.

<a id="enable"></a>
## Turning it on

Part of Import & Migration: the `Onboarding.MigrationWizard` flag on for your department and a department administrator signed in. See [Overview → Turning it on](overview#enable).

<a id="sheet-call-types"></a>
## Call types sheet

<!-- BEGIN GENERATED: contract call-types -->

The kinds of call you are dispatched to (Structure fire, Medical…).

Starter workbook sheet **Call types**; CSV template `resgrid-call-types.csv`.

| Column header | Field key | Type | Required | Notes |
|---|---|---|---|---|
| `Source ID [source_id]` | `source_id` | Text |  | The call type's id in the system you are leaving. Lets later files refer to this row and makes a re-import update it instead of adding it twice. Up to 256 characters. Must be unique in the file. Example: `1042`. Headers recognized: id, source id, external id, record id, key. |
| `Name [name]` | `name` | Text | Yes | The call type's name. Calls refer to their type by this name. Up to 100 characters. Must be unique in the file. Example: `Structure fire`. Headers recognized: name, type, call type, nature, incident type. |

*Contract `call-types` version 2026.11.1, generated from the import catalog.*

<!-- END GENERATED: contract call-types -->

<a id="sheet-call-priorities"></a>
## Call priorities sheet

<!-- BEGIN GENERATED: contract call-priorities -->

Your call priorities with their colours and dispatch behaviour. Importing priorities replaces the four built-in ones.

Starter workbook sheet **Call priorities**; CSV template `resgrid-call-priorities.csv`.

| Column header | Field key | Type | Required | Notes |
|---|---|---|---|---|
| `Source ID [source_id]` | `source_id` | Text |  | The call priority's id in the system you are leaving. Lets later files refer to this row and makes a re-import update it instead of adding it twice. Up to 256 characters. Must be unique in the file. Example: `1042`. Headers recognized: id, source id, external id, record id, key. |
| `Name [name]` | `name` | Text | Yes | The priority's name. Up to 100 characters. Must be unique in the file. Example: `Emergency`. Headers recognized: name, priority, priority name, level. |
| `Colour [color]` | `color` | Colour |  | The priority's colour, as a hex code such as #e34948. Example: `#e34948`. Headers recognized: color, colour. |
| `Order [sort]` | `sort` | Whole number |  | The priority's position in lists; lower comes first. From 0 to 1000. Example: `0`. Headers recognized: order, sort, rank, position. |
| `Default [is_default]` | `is_default` | Yes/No |  | Yes for the one priority new calls start with. Example: `no`. Headers recognized: default, is default. |
| `Page people [dispatch_personnel]` | `dispatch_personnel` | Yes/No |  | Yes when a call with this priority pages the people dispatched to it. Example: `yes`. Headers recognized: dispatch personnel, page people, notify personnel. |
| `Page units [dispatch_units]` | `dispatch_units` | Yes/No |  | Yes when a call with this priority pages the units dispatched to it. Example: `yes`. Headers recognized: dispatch units, page units, notify units. |
| `Notify everyone [notify_everyone]` | `notify_everyone` | Yes/No |  | Yes when a call with this priority notifies every member, whatever their notification settings. Example: `no`. Headers recognized: notify all, force notify, notify everyone. |

*Contract `call-priorities` version 2026.11.1, generated from the import catalog.*

<!-- END GENERATED: contract call-priorities -->

<a id="calls-matching"></a>
## How call types and priorities are matched

- Both are matched by Source ID (same workspace, or the import it [continues](uploading-and-checks#continue)), otherwise by **name**, ignoring case, accents, spaces and punctuation. Two existing records with the same name block the row until you rename one.
- An import never renames a call type: calls, quick templates and protocols refer to call types by name. Rename call types on the [Types](../types-configuration#call-types) screen.

More rules:

- **Importing priorities replaces the four built-in ones.** A department without priorities of its own uses Resgrid's built-in set; once you import any, your department's own priorities are used instead — so import the full list you want.
- **Default** — the one priority new calls start with. When an imported priority is marked default, the previous default stops being the default (and gets it back if the import is rolled back).
- **Page people** and **Page units** are on for a new priority unless your file says *no*.
- **Notify everyone** notifies every member for calls of this priority, whatever their notification settings.
- Rolling back marks imported priorities deleted (calls keep showing their priority), and deletes imported call types.
