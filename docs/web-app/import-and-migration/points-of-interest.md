---
sidebar_position: 17
title: Points of Interest Field Reference
sidebar_label: "Reference: Points of interest"
---

# Points of Interest — Field Reference

**Department menu → Import & Migration → (workspace) → Files & data sets**

Two data sets put places on your [map](../mapping#points-of-interest-pois): **Point of interest types** (Hydrants, Hospitals, Schools …, each with a marker colour and whether it can be a status destination) and **Points of interest** (each place with its type and location). Types come first, or in the same import. GeoJSON files work well here: a point's coordinates become the latitude and longitude columns automatically.

:::note Preview feature
Import & Migration is a **Preview** feature: it is off by default and Resgrid turns it on per department while it is being rolled out.
:::

<a id="where"></a>
## Where to find it

Fill in the **Point of interest types** and **Points of interest** sheets of the [starter workbook](starter-workbook) (or `resgrid-poi-types.csv` and `resgrid-pois.csv`), or upload a spreadsheet or GeoJSON export and match it on the [matching](matching-columns-and-values) page. **Download current data** exports your existing point of interest types.

<a id="enable"></a>
## Turning it on

Besides Import & Migration itself (the `Onboarding.MigrationWizard` flag and a department administrator), both data sets need the **Mapping** module switched on under **Department Settings → Module Settings**. Without it the data sets are blocked (*This data needs a feature your department hasn't turned on*). See [Overview → Turning it on](overview#enable).

<a id="sheet-poi-types"></a>
## Point of interest types sheet

<!-- BEGIN GENERATED: contract poi-types -->

The kinds of place on your map (Hydrants, Hospitals, Schools…).

Starter workbook sheet **Point of interest types**; CSV template `resgrid-poi-types.csv`; needs the **Mapping** module switched on.

| Column header | Field key | Type | Required | Notes |
|---|---|---|---|---|
| `Source ID [source_id]` | `source_id` | Text |  | The point of interest type's id in the system you are leaving. Lets later files refer to this row and makes a re-import update it instead of adding it twice. Up to 256 characters. Must be unique in the file. Example: `1042`. Headers recognized: id, source id, external id, record id, key. |
| `Name [name]` | `name` | Text | Yes | The type's name. Up to 100 characters. Must be unique in the file. Example: `Hospital`. Headers recognized: name, type, category, layer. |
| `Colour [color]` | `color` | Colour |  | The map marker's colour, as a hex code. Example: `#1baf7a`. Headers recognized: color, colour. |
| `Destination [is_destination]` | `is_destination` | Yes/No |  | Yes when people and units can pick these places as a destination with a status. Example: `no`. Headers recognized: destination, is destination. |

*Contract `poi-types` version 2026.11.1, generated from the import catalog.*

<!-- END GENERATED: contract poi-types -->

<a id="sheet-pois"></a>
## Points of interest sheet

<!-- BEGIN GENERATED: contract pois -->

Places on your map, each with its type and location.

Starter workbook sheet **Points of interest**; CSV template `resgrid-pois.csv`; imported after [Point of interest types](#sheet-poi-types); needs the **Mapping** module switched on.

| Column header | Field key | Type | Required | Notes |
|---|---|---|---|---|
| `Source ID [source_id]` | `source_id` | Text |  | The point of interest's id in the system you are leaving. Lets later files refer to this row and makes a re-import update it instead of adding it twice. Up to 256 characters. Must be unique in the file. Example: `1042`. Headers recognized: id, source id, external id, record id, key. |
| `Type [type]` | `type` | Reference | Yes | The place's type, by name. Refers to [Point of interest types](#sheet-poi-types). Example: `Hospital`. Headers recognized: type, category, layer, poi type. |
| `Name [name]` | `name` | Text |  | The place's name. Up to 200 characters. Example: `Memorial Hospital`. Headers recognized: name, title, place. |
| `Latitude [latitude]` | `latitude` | Latitude | Yes | Where the place is, as decimal degrees north (negative for south). Example: `39.7990`. Headers recognized: latitude, lat, y. |
| `Longitude [longitude]` | `longitude` | Longitude | Yes | Where the place is, as decimal degrees east (negative for west). Example: `-89.6440`. Headers recognized: longitude, long, lng, lon, x. |
| `Address [address]` | `address` | Text |  | The place's address, shown with it on the map. Up to 500 characters. Example: `701 N First St`. Headers recognized: address, street, location. |
| `Note [note]` | `note` | Text |  | Anything responders should know about the place. Up to 2000 characters. Example: `Helipad on roof`. Headers recognized: note, notes, description, comments. |

*Contract `pois` version 2026.11.1, generated from the import catalog.*

<!-- END GENERATED: contract pois -->

<a id="pois-matching"></a>
## How places are matched

- **Point of interest types** are matched by Source ID (same workspace, or the import it [continues](uploading-and-checks#continue)), otherwise by **name**, ignoring case, accents, spaces and punctuation. New types get the standard map pin marker.
- **Points of interest** are matched by Source ID (same workspace, or the import it [continues](uploading-and-checks#continue)), otherwise by **name and exact position** together: the same name at the same latitude and longitude is the same place. A place that moved, or two places with one name, are separate records.

More rules:

- **Type** is required and refers to a point of interest type by name — a row in your types file or an existing type. Unknown types can be **created new** on the [value matching](matching-columns-and-values#match-values) page.
- **Latitude** and **Longitude** are required, in decimal degrees. Addresses are never looked up during an import; the **Address** column is shown with the place as text.
- From GeoJSON, each feature's properties become columns (nested properties as `parent.child`), and a `Point` geometry becomes `latitude` and `longitude`.
- Rolling back deletes imported places and types; a type that places still use (including ones added since) is kept for you to check.
