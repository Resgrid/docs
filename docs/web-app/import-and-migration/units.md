---
sidebar_position: 14
title: Units Field Reference
sidebar_label: "Reference: Units"
---

# Units — Field Reference

**Department menu → Import & Migration → (workspace) → Files & data sets**

Two data sets cover your apparatus: **Unit types** (Engine, Ladder, Ambulance …, each optionally with its own unit status set) and **Units** (each unit with its type, home station, vehicle details and riding positions). Units refer to unit types and stations, so those come first — or in the same import. Each new unit uses a unit seat on your plan.

:::note Preview feature
Import & Migration is a **Preview** feature: it is off by default and Resgrid turns it on per department while it is being rolled out.
:::

<a id="where"></a>
## Where to find it

Fill in the **Unit types** and **Units** sheets of the [starter workbook](starter-workbook) (or `resgrid-unit-types.csv` and `resgrid-units.csv`), or upload your apparatus list and match it on the [matching](matching-columns-and-values) page. **Download current data** exports your existing unit types and units. After the import they are on the [Units](../units) screen and under [Types](../types-configuration#unit-types).

<a id="enable"></a>
## Turning it on

Part of Import & Migration: the `Onboarding.MigrationWizard` flag on for your department and a department administrator signed in. Units need room on your plan — see [Plan capacity](review-and-import#capacity). See [Overview → Turning it on](overview#enable).

<a id="sheet-unit-types"></a>
## Unit types sheet

<!-- BEGIN GENERATED: contract unit-types -->

The kinds of apparatus you run (Engine, Ladder, Ambulance…).

Starter workbook sheet **Unit types**; CSV template `resgrid-unit-types.csv`; imported after [Statuses](statuses#sheet-custom-statuses).

| Column header | Field key | Type | Required | Notes |
|---|---|---|---|---|
| `Source ID [source_id]` | `source_id` | Text |  | The unit type's id in the system you are leaving. Lets later files refer to this row and makes a re-import update it instead of adding it twice. Up to 256 characters. Must be unique in the file. Example: `1042`. Headers recognized: id, source id, external id, record id, key. |
| `Name [name]` | `name` | Text | Yes | The unit type's name. Units refer to their type by this name. Up to 100 characters. Must be unique in the file. Example: `Engine`. Headers recognized: name, type, unit type, apparatus type, vehicle type. |
| `Status set [status_set]` | `status_set` | Reference |  | The unit status set this type uses, by name. Left empty, the default unit statuses are used. Refers to [Statuses](statuses#sheet-custom-statuses). Example: `Engine statuses`. Headers recognized: status set, statuses, status. |
| `Class [base_type]` | `base_type` | Choice from a list |  | What kind of unit this type is. Resgrid uses the class, not the name, for reports, defaults and integrations. Choices: `engine` Engine (also: pumper, pump, fire engine); `aerial` Aerial (also: ladder, truck, tower, platform); `rescue` Rescue (also: rescue unit, heavy rescue, squad); `tanker` Tanker (also: tender, water tender); `ambulance` Ambulance (also: als, bls, medic, transport); `medical-response` Medical Response (also: first responder, qrv, fly car, response vehicle); `wildland` Wildland (also: brush, brush truck, type 6, type 3); `hazardous-materials` Hazardous Materials (also: hazmat, haz mat); `command` Command (also: chief, command vehicle, battalion); `support` Support (also: utility, logistics, rehab, air unit); `watercraft` Watercraft (also: boat, fire boat, vessel); `aircraft` Aircraft (also: helicopter, drone, uav); `patrol` Patrol (also: police, security vehicle, patrol car); `other` Other (also: misc, miscellaneous). Leave it empty to set it later on the Types screen; an import never guesses it from the name. Example: `engine`. Headers recognized: base type, unit class, apparatus class, class, classification. |

*Contract `unit-types` version 2026.11.1, generated from the import catalog.*

<!-- END GENERATED: contract unit-types -->

<a id="sheet-units"></a>
## Units sheet

<!-- BEGIN GENERATED: contract units -->

Your apparatus and other units, with their type, station and vehicle details.

Starter workbook sheet **Units**; CSV template `resgrid-units.csv`; imported after [Unit types](#sheet-unit-types), [Stations and groups](stations-and-groups#sheet-groups); extra columns can be kept as custom fields.

| Column header | Field key | Type | Required | Notes |
|---|---|---|---|---|
| `Source ID [source_id]` | `source_id` | Text |  | The unit's id in the system you are leaving. Lets later files refer to this row and makes a re-import update it instead of adding it twice. Up to 256 characters. Must be unique in the file. Example: `1042`. Headers recognized: id, source id, external id, record id, key. |
| `Name [name]` | `name` | Text | Yes | The unit's name or call sign. Up to 100 characters. Must be unique in the file. Example: `Engine 1`. Headers recognized: name, unit, unit name, call sign, callsign, apparatus, vehicle. |
| `Type [type]` | `type` | Reference |  | The unit's type, by name. Refers to [Unit types](#sheet-unit-types). Example: `Engine`. Headers recognized: type, unit type, apparatus type, vehicle type. |
| `Station [station]` | `station` | Reference |  | The station the unit runs from, by its source ID or name. Refers to [Stations and groups](stations-and-groups#sheet-groups). Example: `Station 1`. Headers recognized: station, group, home station, quarters. |
| `VIN [vin]` | `vin` | Text |  | The vehicle identification number. Up to 50 characters. Example: `1FDUF5HT1JDA00000`. Headers recognized: vin, vehicle identification number, serial number. |
| `Plate number [plate_number]` | `plate_number` | Text |  | The license plate. Up to 50 characters. Example: `FD 1234`. Headers recognized: plate, plate number, license plate, registration, tag. |
| `Four-wheel drive [four_wheel_drive]` | `four_wheel_drive` | Yes/No |  | Yes when the unit has four-wheel drive. Example: `no`. Headers recognized: 4wd, four wheel drive, 4x4, awd. |
| `Special permit [special_permit]` | `special_permit` | Yes/No |  | Yes when driving the unit needs a special permit. Example: `no`. Headers recognized: special permit, permit, cdl. |
| `Seats [seats]` | `seats` | List of text |  | The unit's riding positions, separated by semicolons. Separate values with `;`. Example: `Officer; Driver; Firefighter; Firefighter`. Headers recognized: seats, positions, riding positions, roles, crew. |

*Contract `units` version 2026.11.1, generated from the import catalog.*

<!-- END GENERATED: contract units -->

<a id="sheet-unit-certifications"></a>
## Unit certifications sheet

<!-- BEGIN GENERATED: contract unit-certifications -->

Each unit's inspections, registrations and tests, with numbers and dates. Records that are already expired are imported as expired, so nothing is announced.

Starter workbook sheet **Unit certifications**; CSV template `resgrid-unit-certifications.csv`; imported after [Units](#sheet-units), [Certification types](roles-and-certifications#sheet-certification-types).

| Column header | Field key | Type | Required | Notes |
|---|---|---|---|---|
| `Source ID [source_id]` | `source_id` | Text |  | The record's id in the system you are leaving. Lets a re-import recognize the record instead of adding it twice. Up to 256 characters. Must be unique in the file. Example: `1042`. Headers recognized: id, source id, external id, record id, key. |
| `Unit [unit]` | `unit` | Reference | Yes | Which unit, by its source ID or name. Refers to [Units](#sheet-units). Example: `Engine 1`. Headers recognized: unit, apparatus, vehicle, unit name. |
| `Certification [certification_type]` | `certification_type` | Reference | Yes | Which certification, by its name, code or source ID. It must be a type meant for units. Refers to [Certification types](roles-and-certifications#sheet-certification-types). Example: `Annual pump test`. Headers recognized: certification, certification type, inspection, registration, type. |
| `Certificate number [number]` | `number` | Text |  | The number on the certificate or registration. Up to 200 characters. Department-only; protected by Advanced Data Protection when your department uses it. Example: `PT-2026-117`. Headers recognized: number, certificate number, registration number, inspection number. |
| `Issued by [issued_by]` | `issued_by` | Text |  | Who issued it or carried out the inspection. Up to 200 characters. Department-only; protected by Advanced Data Protection when your department uses it. Example: `County Fleet Services`. Headers recognized: issued by, issuer, inspector, authority. |
| `Issued on [issued_on]` | `issued_on` | Date |  | The date it was issued or the inspection took place. Example: `2026-03-02`. Headers recognized: issued, issued on, issue date, inspected on, date. |
| `Expires on [expires_on]` | `expires_on` | Date |  | The date it expires or is due again. Leave empty when it does not expire. Example: `2027-03-02`. Headers recognized: expires, expires on, expiration, expiration date, expiry, valid until, due. |
| `Notes [notes]` | `notes` | Text |  | Findings or remarks about the record. Up to 4000 characters. Department-only; protected by Advanced Data Protection when your department uses it. Example: `Passed with minor findings`. Headers recognized: notes, comments, remarks. |

*Contract `unit-certifications` version 2026.11.1, generated from the import catalog.*

<!-- END GENERATED: contract unit-certifications -->

Unit certifications are never matched automatically — a unit can hold two records of one type — so give them a Source ID if you may upload the file again. A record whose **Expires on** date has passed is imported as *Expired*, so nothing announces it; the preview asks you to confirm *N unit certifications have already expired*. The certification type must be one meant for units (*N unit certifications use a type meant for people*). Rolling the import back removes the records it added.

<a id="units-matching"></a>
## How units are matched

- **Unit types** and **units** are matched by Source ID (same workspace, or the import it [continues](uploading-and-checks#continue)), otherwise by **name**, ignoring case, accents, spaces and punctuation. Deleted units are not matched.
- Two existing records with the same name block the row until you rename one in Resgrid.
- With *Review updates*, a matched unit's VIN, plate number, four-wheel drive and special permit are updated where they differ; its type, station and seats are set only when the unit is created.
- An import never renames a unit type: units and calls refer to types by name, so a rename would break those links. Rename types on the [Types](../types-configuration) screen.

More rules:

- A unit's **Type** is a unit type by name — a row in your Unit types file or an existing type. With **Keep as text** on the value matching page the name is stored on the unit as it is; with **Create new** a unit type with that name is created.
- A unit's **Station** refers to a station or group by Source ID or name.
- **Seats** become the unit's riding positions, in the order given. Repeat a name for each seat of that kind: `Officer; Driver; Firefighter; Firefighter` creates four seats.
- A unit type's **Status set** names a set of *unit* statuses — a set in your Statuses file or one that already exists. Empty means the default unit statuses.
- Extra columns can be [kept as custom fields](matching-columns-and-values#custom-fields) on units.
- Units are counted against your plan when they are written; if the plan runs out of room, the remaining units are skipped rather than written.
