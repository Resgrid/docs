---
sidebar_position: 15
title: Statuses Field Reference
sidebar_label: "Reference: Statuses"
---

# Statuses — Field Reference

**Department menu → Import & Migration → (workspace) → Files & data sets**

The **Statuses** data set creates [custom status](../custom-statuses) buttons — what people press when they respond, what units report, and staffing levels. Each row is **one button**; rows with the same **Set name** and **Set type** make one status set. Statuses are imported first, so unit types can refer to their unit status set.

:::note Preview feature
Import & Migration is a **Preview** feature: it is off by default and Resgrid turns it on per department while it is being rolled out.
:::

<a id="where"></a>
## Where to find it

Fill in the **Statuses** sheet of the [starter workbook](starter-workbook) or `resgrid-custom-statuses.csv`, or upload your own list and match it to *Statuses* on the [matching](matching-columns-and-values) page. After the import the sets are on the [Custom Statuses](../custom-statuses) screen.

<a id="enable"></a>
## Turning it on

Part of Import & Migration: the `Onboarding.MigrationWizard` flag on for your department and a department administrator signed in. See [Overview → Turning it on](overview#enable).

<a id="sheet-custom-statuses"></a>
## Statuses sheet

<!-- BEGIN GENERATED: contract custom-statuses -->

Status buttons for people, units and staffing levels. Each row is one button; rows with the same set name make one set.

Starter workbook sheet **Statuses**; CSV template `resgrid-custom-statuses.csv`.

| Column header | Field key | Type | Required | Notes |
|---|---|---|---|---|
| `Set name [set_name]` | `set_name` | Text | Yes | The status set the button belongs to. Up to 200 characters. Example: `Engine statuses`. Headers recognized: set, set name, status set, group. |
| `Set type [set_type]` | `set_type` | Choice from a list | Yes | Who the statuses are for: people (responding), units or staffing levels. Choices: `personnel` Personnel (also: people, person, member, responder, response); `unit` Units (also: units, apparatus, vehicle); `staffing` Staffing (also: availability, staffing level). Example: `unit`. Headers recognized: set type, type, applies to, for. |
| `Button text [button_text]` | `button_text` | Text | Yes | The words on the status button. Up to 100 characters. Example: `En route`. Headers recognized: status, button, button text, name, label. |
| `Button colour [button_color]` | `button_color` | Colour |  | The button's colour, as a hex code such as #2a78d6. Example: `#2a78d6`. Headers recognized: color, colour, button color, background. |
| `Text colour [text_color]` | `text_color` | Colour |  | The colour of the button's words. Left empty, white. Example: `#ffffff`. Headers recognized: text color, text colour, font color. |
| `Location required [gps_required]` | `gps_required` | Yes/No |  | Yes when choosing this status must send the device's location. Example: `no`. Headers recognized: gps, gps required, location required. |
| `Note [note]` | `note` | Choice from a list |  | Whether a note can or must be added when choosing this status. Choices: `none` None (also: no); `optional` Optional (also: allowed); `required` Required (also: mandatory). Example: `none`. Headers recognized: note, note type, comment. |
| `Destination [destination]` | `destination` | Choice from a list |  | What the person or unit may pick as a destination with this status. Choices: `none` None; `stations` Stations (also: station); `calls` Calls (also: call); `calls-and-stations` Calls and stations; `pois` Points of interest (also: poi, points of interest); `calls-and-pois` Calls and points of interest; `stations-and-pois` Stations and points of interest; `calls-stations-and-pois` Calls, stations and points of interest (also: all). Example: `none`. Headers recognized: destination, destination type, detail type. |
| `Order [order]` | `order` | Whole number |  | The button's position in its set. From 0 to 1000. Example: `1`. Headers recognized: order, sort, position, sequence. |
| `Next statuses [next_statuses]` | `next_statuses` | List of text |  | Buttons offered after this one, by their button text, separated by semicolons. Separate values with `;`. Example: `On scene; Available`. Headers recognized: next, next statuses, next status. |

*Contract `custom-statuses` version 2026.11.1, generated from the import catalog.*

<!-- END GENERATED: contract custom-statuses -->

<a id="statuses-matching"></a>
## How statuses are matched

- A button is matched by **set name + set type + button text**, ignoring case, accents, spaces and punctuation. A matching button that already exists is linked (or, with *Review updates*, updated) instead of added again.
- A **set** with the same name and type that already exists is reused: new buttons are added to it. Otherwise the set is created with the first row that names it.

More rules:

- **A new personnel or staffing set becomes the set your people see.** The preview shows this as a statement — *N new status sets will become the buttons your people and units see* — which you confirm before approving. Unit sets apply only to the unit types that name them.
- **Next statuses** names other buttons **of the same set** by their button text (`On scene; Available`). They are filled in after every row has been written, so the order of rows does not matter.
- **Button colour** and **Text colour** are hex codes; an empty text colour is white.
- Rolling back marks the imported buttons and sets deleted, as the Custom Statuses screen does.
