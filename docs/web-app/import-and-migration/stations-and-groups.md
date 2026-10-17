---
sidebar_position: 12
title: Stations & Groups Field Reference
sidebar_label: "Reference: Stations & groups"
---

# Stations and Groups — Field Reference

**Department menu → Import & Migration → (workspace) → Files & data sets**

The **Stations and groups** data set creates your [stations and organizational groups](../groups-stations) with their addresses, locations and where each one sits in your organization. People and units refer to these rows, so import them first — or in the same import.

:::note Preview feature
Import & Migration is a **Preview** feature: it is off by default and Resgrid turns it on per department while it is being rolled out.
:::

<a id="where"></a>
## Where to find it

Fill in the **Stations and groups** sheet of the [starter workbook](starter-workbook) or `resgrid-groups.csv`, or upload your own list and match it to *Stations and groups* on the [matching](matching-columns-and-values) page. **Download current data** exports your existing stations and groups in this layout.

<a id="enable"></a>
## Turning it on

Part of Import & Migration: the `Onboarding.MigrationWizard` flag on for your department and a department administrator signed in. Stations and groups use no plan seats. See [Overview → Turning it on](overview#enable).

<a id="sheet-groups"></a>
## Stations and groups sheet

<!-- BEGIN GENERATED: contract groups -->

Your stations and the groups people belong to, with their addresses and where they sit in your organization.

Starter workbook sheet **Stations and groups**; CSV template `resgrid-groups.csv`.

| Column header | Field key | Type | Required | Notes |
|---|---|---|---|---|
| `Source ID [source_id]` | `source_id` | Text |  | The station or group's id in the system you are leaving. Lets later files refer to this row and makes a re-import update it instead of adding it twice. Up to 256 characters. Must be unique in the file. Example: `1042`. Headers recognized: id, source id, external id, record id, key. |
| `Name [name]` | `name` | Text | Yes | The station's or group's name. Up to 50 characters. Must be unique in the file. Example: `Station 1`. Headers recognized: name, station, group, station name, group name. |
| `Type [type]` | `type` | Choice from a list |  | Station for a place units respond from; organizational for any other group of people. Choices: `station` Station (also: firehouse, house, base, post); `organizational` Organizational (also: organisational, group, team, company, division). Example: `station`. Headers recognized: type, group type, kind. |
| `Belongs to [parent]` | `parent` | Reference |  | The station or group this one sits under, by its source ID or its name. Refers to [Stations and groups](#sheet-groups). Example: `Battalion 1`. Headers recognized: parent, parent group, belongs to, battalion, district. |
| `Street address [street]` | `street` | Text |  | Street and number of the station. Up to 500 characters. Example: `120 Main St`. Headers recognized: address, street, address 1, address1. |
| `City [city]` | `city` | Text |  | City of the station. Up to 150 characters. Example: `Springfield`. Headers recognized: city, town. |
| `State or region [state]` | `state` | Text |  | State, province or region of the station. Up to 100 characters. Example: `IL`. Headers recognized: state, province, region. |
| `Postal code [postal_code]` | `postal_code` | Text |  | Postal or ZIP code of the station. Up to 32 characters. Example: `62701`. Headers recognized: zip, zip code, postal code, postcode. |
| `Country [country]` | `country` | Text |  | Country of the station. Up to 100 characters. Example: `United States`. Headers recognized: country. |
| `Latitude [latitude]` | `latitude` | Latitude |  | Where the station is, as decimal degrees north (negative for south). Example: `39.7817`. Headers recognized: latitude, lat, y. |
| `Longitude [longitude]` | `longitude` | Longitude |  | Where the station is, as decimal degrees east (negative for west). Example: `-89.6501`. Headers recognized: longitude, long, lng, lon, x. |

*Contract `groups` version 2026.11.1, generated from the import catalog.*

<!-- END GENERATED: contract groups -->

<a id="groups-matching"></a>
## How stations and groups are matched

- A row is matched by its **Source ID** when the same workspace — or the import it [continues](uploading-and-checks#continue) — imported it before, otherwise by its **name**, ignoring case, accents, spaces and punctuation (*Station 1*, *station-1* and *STATION 1* are the same).
- A matched station is **linked** with *Add only*. With *Review updates* its type, latitude and longitude are updated where they differ; the address and the parent group are set only when a station or group is created.
- If your department has **two** stations or groups with the same name, rows with that name are blocked (*rows match more than one existing record*) until you rename one in Resgrid.
- Names must be unique within the file.

More rules:

- **Belongs to** can name a row anywhere in the same file — even one further down — or an existing station or group. Parents are set after all rows are written. A loop (A belongs to B, B belongs to A) is blocked.
- **Type** left empty creates an *organizational* group. Use `station` for places units respond from.
- The address is saved with the station. Give both **Latitude** and **Longitude** or neither; addresses are not looked up during the import.
- People's **Station or group** and units' **Station** can refer to a row here by its Source ID or its name. On the [value matching](matching-columns-and-values#match-values) page you can also choose **Create new**, which creates a group with only its name.
