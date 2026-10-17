---
sidebar_position: 3
title: Starter Workbook & Templates
---

# Starter Workbook, Templates and Current Data

**Department menu → Import & Migration → (workspace) → Files & data sets**

The **Resgrid starter workbook** is an Excel file built for your department: one sheet per kind of data, an example row on each sheet, and drop-down lists of the accepted options and of the stations, roles and types you already have. Fill it in and upload it, and Resgrid knows exactly which column is which — no column matching needed. If you prefer CSV there is one template per kind of data, and **Download current data** gives you what your department already has in the same layout, ready to edit and upload again.

:::note Preview feature
Import & Migration is a **Preview** feature: it is off by default and Resgrid turns it on per department while it is being rolled out.
:::

<a id="where"></a>
## Where to find it

Open a workspace and choose the **Files & data sets** tab. The right-hand panel **Resgrid starter workbook** has:

| Control | What you get |
|---|---|
| A tick box per kind of data (all ticked) + **Download workbook** | `resgrid-starter-workbook.xlsx` with a sheet for each ticked kind of data. |
| *Prefer CSV? Download one template per kind of data* | One `resgrid-<data set>.csv` per kind of data, for example `resgrid-personnel.csv`. |
| **Download current data** | `resgrid-current-data.xlsx` with your department's existing records (see [below](#current-data)). |

<a id="enable"></a>
## Turning it on

Available wherever Import & Migration is: the `Onboarding.MigrationWizard` flag on for your department and a department administrator signed in. See [Overview → Turning it on](overview#enable).

<a id="workbook"></a>
## What is in the workbook

| Part | Details |
|---|---|
| **Instructions** sheet | Five short rules: fill in one sheet per kind of data and delete the sheets you don't need; keep the column headers exactly as they are; the first row of each sheet is an example and is never imported; columns with a drop-down accept the listed values (other text is matched when you upload); save as `.xlsx` and upload — nothing is saved until you review and approve it. |
| **One sheet per kind of data** | In import order: Statuses, Certification types, Stations and groups, Roles, Role requirements, People, Emergency contacts, People's certifications, Unit types, Units, Unit certifications, Call types, Call priorities, Point of interest types, Points of interest. The header row is frozen. |
| **Column headers** | `Label [field_key]` — for example `First name [first_name]` or `Station or group [group]`. The code in brackets tells Resgrid which field the column fills, so the headers must stay as they are. Each field is described on its [field reference](#all-fields) page. |
| **Example row** | Row 2 of every sheet holds example values and an `x` in the last column, `resgrid:example`. Any row with `x` in that column is skipped, so you can leave the example in place. Add your own rows below it with that column empty. Completely blank rows are skipped too. |
| **Drop-down lists** | Choice columns (for example *Type* on Stations and groups: `station` or `organizational`) list the accepted codes. Reference columns list the names your department **already has** — stations and groups, roles, certification types, unit types and point of interest types. The lists live on a hidden *Lists* sheet and cover the first 2,000 rows. |
| **Date columns** | Checked by Excel as dates. |

The drop-downs are guides, not locks: Excel warns but lets you type something else. That is on purpose — a station you add on the Stations and groups sheet is not in Resgrid yet, so it is not in the list, but People can still name it. Anything not in a list is matched when you upload.

<a id="fill-in"></a>
## Filling it in

1. Delete the sheets you don't need (or leave them with only the example row — an empty sheet is simply not imported).
2. Fill in rows below the example. Keep one record per row.
3. Give records a **Source ID** — the ID from the system you are leaving, or one you invent (`ST-1`, `ST-2` …). Other sheets can then refer to a record by its Source ID or by its name, and uploading a corrected copy later updates rows instead of adding them twice.
4. Use the formats Resgrid reads without questions:

   | Type | Write it as |
   |---|---|
   | Dates | `2026-03-04` (year-month-day). `03/04/2026` can be read two ways: you are asked once per column whether the day or the month comes first. |
   | Yes / No | `yes` / `no`, `true` / `false`, `1` / `0`, or `x` and blank. |
   | Phone numbers | With the country code: `+1 555 123 4567`. |
   | Lists | Several values separated by semicolons: `Engineer; EMT`. |
   | Colours | Hex codes: `#2a78d6`. |
   | Coordinates | Decimal degrees: `39.7817`, `-89.6501`. |

5. Save as **`.xlsx`** (not `.xlsm` or `.xls`) and upload it on **Files & data sets**.

When the workbook arrives, each sheet becomes a data set, its destination is confirmed automatically and every column is already matched. You still see any [issues](fixing-issues) the checks find — a missing email, a station name that matches nothing, a value that is not in a list — and you still [review and approve](review-and-import) before anything is saved.

<a id="csv"></a>
## CSV templates

Each CSV template has the same headers as the matching workbook sheet, the `resgrid:example` column and one example row. It is saved as UTF-8 with a byte-order mark so Excel shows accented names correctly; if you edit it in Excel, save it again as *CSV UTF-8*. Upload one CSV file per kind of data.

| Template | Data set |
|---|---|
| `resgrid-custom-statuses.csv` | Statuses |
| `resgrid-certification-types.csv` | Certification types |
| `resgrid-groups.csv` | Stations and groups |
| `resgrid-roles.csv` | Roles |
| `resgrid-personnel.csv` | People |
| `resgrid-personnel-certifications.csv` | People's certifications |
| `resgrid-unit-types.csv` | Unit types |
| `resgrid-units.csv` | Units |
| `resgrid-call-types.csv` | Call types |
| `resgrid-call-priorities.csv` | Call priorities |
| `resgrid-poi-types.csv` | Point of interest types |
| `resgrid-pois.csv` | Points of interest |

<a id="current-data"></a>
## Download current data

**Download current data** exports your department's existing records in the template layout, one sheet per kind of data, so you can correct or complete them in a spreadsheet and upload them again. It covers **stations and groups, roles, certification types, unit types, units, call types, call priorities and point of interest types**. People are never exported (personal data does not leave Resgrid this way), and statuses, people's certifications and points of interest are not exported in this release.

Each exported row has a Source ID of the form `resgrid:<number>` and the example row at the top. To use it for corrections:

1. Start a workspace as **Update a live department (reviewed)** (or choose **Review updates** when you approve).
2. Edit the values you want to change; delete the rows you don't want to touch.
3. Upload the file. Rows are matched to your existing records by **name**, and the preview shows which records will be updated.

:::caution Don't rename records this way
Because rows are matched by name, a row whose name you changed no longer matches its record and would be added as a **new** record. Rename stations, units and types on their own screens in Resgrid instead.
:::

Values in every download are written as plain text — never as formulas — so a cell starting with `=` cannot run anything when the file is opened.

<a id="all-fields"></a>
## Field reference

Every column of every sheet, with its type, whether it is required, its length limit, the accepted choices and an example:

- [People](people) — people and emergency contacts
- [Stations and groups](stations-and-groups)
- [Roles and certifications](roles-and-certifications) — roles, certification types, role requirements and people's certifications
- [Units](units) — unit types, units and unit certifications
- [Statuses](statuses)
- [Call types and priorities](call-types-and-priorities)
- [Points of interest](points-of-interest) — point of interest types and points of interest
