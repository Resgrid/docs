---
sidebar_position: 2
title: Before You Start
---

# Before You Start an Import

**Department menu → Import & Migration**

A migration goes fastest when you have the right exports in hand before you open a workspace. This page lists what to ask your current vendor for, what Resgrid imports and what it deliberately leaves behind, the file formats it reads and the size limits for your plan.

:::note Preview feature
Import & Migration is a **Preview** feature: it is off by default and Resgrid turns it on per department while it is being rolled out.
:::

<a id="where"></a>
## Where to find it

**Department menu → Import & Migration**, or **Setup Wizard → Import or migration → Open Import & Migration**. You do not need a workspace to read this page — but you can start one at any time and come back; nothing is saved to your department until you approve an import.

<a id="enable"></a>
## Turning it on

The module needs the `Onboarding.MigrationWizard` feature flag (off by default, turned on per department by Resgrid) and is available to **department administrators only** (permission 72, `ManageDepartmentImport`). See [Overview → Turning it on](overview#enable).

<a id="plan"></a>
## Plan the move

| Decide | Why it matters |
|---|---|
| **What to bring** | Pick the data sets you need (see [What you can bring](overview#import-migration)). You can import in waves: stations, roles and types first, people next, certifications and units after. |
| **Who approves** | Any department administrator can approve. Turn on **Require a second administrator to approve every import** in [settings](rollback-and-retention#import-settings) if two people should sign off. Approving needs two-factor authentication — set it up first. |
| **Who is an administrator in Resgrid** | People marked as administrators in your file become administrators only after you confirm each one at activation. |
| **When people hear about it** | Imported people receive nothing until you invite them. Pick a go-live date and tell your members before invitations go out. |
| **Plan capacity** | New people and units must fit your plan. Check **Subscription & Billing** before importing a large roster. |
| **Custom fields** | If you want to keep extra columns (badge colour, locker number …) as custom fields and your department already uses custom fields for people or units, add matching fields on the [User Defined Fields](../user-defined-fields) screen first. See [Keep as a custom field](matching-columns-and-values#custom-fields). |

<a id="exports"></a>
## Exports to request from your current vendor

Ask for these while your contract is still active. One file per kind of data, or one workbook with a sheet each, is ideal.

| Export | Needed for | Ask for these columns |
|---|---|---|
| **Member roster** | People | A stable member ID, first and last name, **email** (required — every member signs in with one), mobile and home phone, station or group, roles or positions, badge or ID number, active / inactive, whether the person is an administrator. |
| **Stations and groups** | Stations and groups | A stable ID, name, type (station or other group), parent group, street address, city, state, postal code, country, latitude and longitude if available. |
| **Roles / positions / ranks** | Roles | Name and description. |
| **Certification list** | Certification types | Name, short code, category, issuing authority, how long it is valid. |
| **Member certifications** | People's certifications | Member ID or email, certification name or code, certificate number, issued and expiry dates, issuing body, state or region. |
| **Apparatus list** | Unit types, Units | A stable ID, unit name or call sign, type, home station, VIN, plate, seats or riding positions. |
| **Status lists** | Statuses | Each status button with its set, text, colour and order. |
| **CAD call types and priorities** | Call types, Call priorities | Names; for priorities also colour, order and whether they page people and units. |
| **Map locations** | Point of interest types, Points of interest | Type, name, latitude, longitude, address, notes. |

Ask for the files to be:

- **CSV (UTF-8) or Excel `.xlsx`**, one row per record and the column names in the first row.
- **With the record IDs kept.** Map them to **Source ID** — later files can refer to a row by it (a person's station, a certification's holder), and re-uploading a corrected file updates instead of duplicating.
- **With full dates** — ideally `YYYY-MM-DD`. For dates like `03/04/2026`, which can be read two ways, you are asked once per column whether the day or the month comes first ([Dates](matching-columns-and-values#dates)).
- **With phone numbers including the country code** — `+1 555 123 4567`. Numbers without one are read using your department's country, and anything that cannot be read is flagged.
- **Without passwords, ID numbers or other sensitive data** (below). Resgrid drops those columns anyway, but it is better if they never leave your vendor.

<a id="not-imported"></a>
## What is and isn't imported

**Imported in this release:** the twelve data sets on the [overview](overview#import-migration), with the fields listed on each field reference page. Columns that do not match a field can be left out or, for people and units, [kept as custom fields](matching-columns-and-values#custom-fields).

**Never imported**, whatever the file says:

| Kind of data | How it is recognized |
|---|---|
| Passwords and PINs | Headers containing *password*, *passwd*, *pwd*, *pin*, *pincode*. Each person sets their own password when they accept the invitation. |
| National and government ID numbers | *SSN*, *social security*, *SIN*, *national insurance*; driver's licence numbers (*driver's license / licence*). Values shaped like US social security numbers. |
| Card and bank details | *credit card*, *card number*, *CVV*, *CVC*, *IBAN*, *routing number*, *account number*. Values that look like payment card numbers. |
| Secrets | *API key*, *secret*, *token*. |
| Dates of birth and demographics | *date of birth*, *DOB*, *birthdate*, *birthday*, *race*, *ethnicity*. |
| Physical-access codes | *Knox*, *gate code*, *alarm code*, *Supra*. |
| Medical information | *diagnosis*, *medical condition*, *allergies*, *medication*. |

Short words match only as whole words in the header (*Race* is dropped, *Trace* is not); longer terms also match inside run-together headers such as `DateOfBirth` or `user_password`. A column is also dropped when most of its values look like card numbers or social security numbers. A dropped column is shown as **Never imported (sensitive data)** on the matching screen, its values are not stored or displayed, and a resolved note (`IMP-EXCLUDED-SENSITIVE`, *A column was left out on purpose*) records it.

**Not part of this release:** sign-in data (passwords, passkeys, two-factor and SSO links — people set these up themselves), department secrets and API keys, billing, audit history, historical calls and Records, shifts, calendars, inventory, checklists, work orders and contacts.

<a id="file-limits"></a>
## File limits by plan

"Paid" means any plan other than the free plan.

| Limit | Free plan | Paid plans |
|---|---|---|
| One uploaded file | 50 MiB | 200 MiB |
| All files in one workspace | 500 MiB | 2 GiB |
| Rows in one data set | 20,000 | 500,000 |
| Columns in one sheet | 512 | 512 |
| Text in one cell | 32 KiB | 32 KiB |
| Sheets in one workbook | 50 | 50 |
| Time to read one data set | 5 minutes | 5 minutes |

These limits are about the **files**. How many people and units you can actually add is your **plan capacity**, checked separately: you can upload a 500-person roster on a smaller plan, but only the people your plan has room for can be imported, and the preview says so before you approve. See [Review and import](review-and-import#capacity).

<a id="formats"></a>
## Supported file formats

| Format | Notes |
|---|---|
| **CSV, TSV, `.txt`, `.tab`** | The delimiter is detected. UTF-8 (with or without a byte-order mark) is expected; another encoding is guessed and flagged with a warning so you can check accented names. Always accepted, even where the server does not scan uploads. |
| **Excel `.xlsx`** | Every visible sheet becomes its own data set; hidden sheets and the starter workbook's *Instructions* and *Lists* sheets are skipped. Formulas are never calculated — the value Excel last saved is used. Dates follow the workbook's 1900 or 1904 date system. Macro-enabled (`.xlsm`), binary (`.xlsb`) and old (`.xls`) workbooks, password-protected files, embedded objects and links to other workbooks are refused. Needs virus scanning on the server. |
| **JSON** | A list of objects (one per record), or an object holding exactly one list — the `{"data": [ … ]}` shape many API exports use. Nested objects become columns with dotted names such as `address.city`. |
| **JSON Lines** (`.jsonl`, `.ndjson`) | One object per line. |
| **GeoJSON** | A `FeatureCollection`. Each feature's properties become columns; a `Point` geometry becomes `latitude` and `longitude` columns, ready for points of interest. |
| ZIP, KML, KMZ, GPX | Recognized but not imported yet. |

Resgrid checks what a file really contains, not just its name: a file whose content does not match its type is refused (`IMP-FILE-SIGNATURE`). See [Uploading and checks](uploading-and-checks) for everything that happens next.
