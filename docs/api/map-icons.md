---
sidebar_position: 9
---

# Map Icons API

Map markers carry the icon a client should draw, and the map icon legend endpoint returns every icon a department's map can show. Both are part of the v4 API and are built from the same department data, so a client that draws its markers and its legend from them always matches the web map. For what the icons mean and how departments set them up, see [Icons by status and priority](../web-app/mapping#icons-by-status-and-priority), [Map icon legend](../web-app/mapping#map-icon-legend) and [Custom map icons](../web-app/mapping#custom-map-icons).

## Endpoints Overview

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v4/Mapping/GetMapDataAndMarkers` | GET | Bearer token, `Call_View` | The department map: markers for calls, units, stations, personnel, POIs and hydrants |
| `/api/v4/Mapping/GetUnitMapData` | GET | Bearer token, `Call_View` | One unit and the members seated in its roles |
| `/api/v4/Mapping/GetMapIconLegend` | GET | Bearer token, `Call_View` | Every icon the department's map can show, for an in-app legend |
| `/api/v4/TypeIcons/{key}` | GET | Anonymous | A department's uploaded icon (128 × 128 PNG); `?s={style}` adds a badge in the style's color |
| `/api/v4/TypeIcons/Pins/{base}-{style}` | GET | Anonymous | A built-in pin recolored to a style (32 × 37 PNG, tip at the bottom center) |

Icon and pin URLs carry `v=` (the palette version) and are served with `Cache-Control: public, max-age=31536000, immutable`. A changed upload gets a new key and a changed palette a new `v`, so a cached image is never stale.

## Marker icon fields

Call (`Type` 0), unit (1) and personnel (3) markers carry four icon fields:

| Field | Description |
|-------|-------------|
| `IconUrl` | The department's uploaded icon: the one uploaded for the current priority or status, else the type's or role's own icon with a badge in the color of `IconStyle`. Null when there is none |
| `PinIconUrl` | The built-in pin the type picked (or the default call, unit or person pin), recolored to `IconStyle` |
| `ImagePath` | The plain bundled icon name (`fire`, `ambulance`, `Call`, `Engine_Responding`, `Person_RespondingCall`), for clients without styled pins |
| `IconStyle` | The style of the priority or status (see [Styles](#styles)) |

Draw `IconUrl` if set, else `PinIconUrl`, else the bundled `ImagePath` image. If a remote image fails to load, fall back to the next one. Stations, POIs and hydrants have no `PinIconUrl` or `IconStyle`; POIs and POI layers carry their own `IconUrl` when the POI type has an uploaded icon.

## Styles

A style is the color group of a status or priority meaning. Keys are stable wire values.

| Key | Color | Covers |
|-----|-------|--------|
| `available` | `#2E9E44` | Available, Cleared, On Patrol, Completed, In Quarters |
| `dispatched` | `#B7791F` | Dispatched |
| `responding` | `#D93A1E` | Responding, En Route |
| `onscene` | `#1D5FD1` | On Scene, Made Contact, Investigating, At Patient, Searching |
| `transporting` | `#7A3EBE` | Transporting, Delivering, Loading, At Hospital |
| `returning` | `#0C8C99` | Returning |
| `staging` | `#8A6A3A` | Staging, Standby |
| `delayed` | `#607D8B` | On Break |
| `unavailable` | `#3D3D3D` | Unavailable, Maintenance, Not Responding |
| `low` / `medium` / `high` / `emergency` | `#2E8B3E` / `#B59A00` / `#E07800` / `#C8102E` | Call priorities by meaning |
| `unknown` | `#8A8A8A` | A status or priority with no meaning whose name suggests none, or a unit or member with no status |

A member *On Unit* takes the style of their unit's latest status.

## Get Map Icon Legend

```
GET /api/v4/Mapping/GetMapIconLegend
```

Returns the department's legend in the standard v4 envelope. Everything in it comes from the department's own setup: call types, priorities, unit types and their status sets, personnel statuses, roles, POI types, the built-in icon each type picked and every uploaded icon. Fetch it when the legend is opened rather than caching it, so a change shows on the next open.

### Response data

| Field | Description |
|-------|-------------|
| `StatusStyles` | The nine status styles in legend order, then `unknown`. Each has `Key`, `Color`, `Meanings` (status meaning values), `UnitStatuses` and `PersonnelStatuses` (the department's own status names in that style), `UnitPinIconUrl` and `PersonPinIconUrl` |
| `PriorityStyles` | `low`, `medium`, `high`, `emergency`, then `unknown`. Each has `Key`, `Color`, `Priorities` (the department's own priority names) and `CallPinIconUrl` |
| `Calls` | Calls with no type first (`Id` null), then each call type by name; one state per active priority |
| `Units` | Units with no type first (`Id` null), then each unit type by name; one state per status of the type's status set (`StatusSetName`, null for the built-in unit statuses) |
| `Personnel` | Members with no role icon first (`Id` null), then each role with an uploaded icon, in role order; one state per personnel status |
| `PoiTypes` | Each POI type: `PoiTypeId`, `Name`, `Color`, `PoiImage`, `ImagePath`, `Marker`, `IconUrl` |

A row has `Id`, `Name`, `StatusSetName` (units), its own icon (`IconUrl`, `ImagePath`) and `States`. The `Name` of an `Id`-null row is a generic label in the server's language; clients should show their own localized label. A state has:

| Field | Description |
|-------|-------------|
| `Id` | The stored priority id or status id |
| `Name` | The department's name for it |
| `Color` | The priority's or status's own hex color, or null |
| `IconStyle` | Its style; `unknown` when it has no meaning |
| `IconUrl`, `PinIconUrl`, `ImagePath` | The icon a marker of the row shows in it, as on [markers](#marker-icon-fields) |
| `IsVariant` | True when `IconUrl` was uploaded for this very priority or status |
| `FollowsUnitStatus` | True for the built-in *On Unit* personnel status: on the map the member takes their unit's style, and the gray pin given here applies only when there is no unit status to follow |

### Example

```json
{
  "Data": {
    "StatusStyles": [
      {
        "Key": "available",
        "Color": "#2E9E44",
        "Meanings": [0, 7, 19, 22, 23],
        "UnitStatuses": ["Available", "In Quarters"],
        "PersonnelStatuses": ["Standing By"],
        "Priorities": [],
        "UnitPinIconUrl": "https://api.resgrid.com/api/v4/TypeIcons/Pins/engine-available?v=1",
        "PersonPinIconUrl": "https://api.resgrid.com/api/v4/TypeIcons/Pins/person-available?v=1",
        "CallPinIconUrl": null
      }
    ],
    "PriorityStyles": [
      {
        "Key": "emergency",
        "Color": "#C8102E",
        "Meanings": [],
        "UnitStatuses": [],
        "PersonnelStatuses": [],
        "Priorities": ["P1 Life threat"],
        "UnitPinIconUrl": null,
        "PersonPinIconUrl": null,
        "CallPinIconUrl": "https://api.resgrid.com/api/v4/TypeIcons/Pins/call-emergency?v=1"
      }
    ],
    "Calls": [
      {
        "Id": 11,
        "Name": "Structure Fire",
        "StatusSetName": null,
        "IconUrl": null,
        "PinIconUrl": null,
        "ImagePath": "fire",
        "States": [
          {
            "Id": 901,
            "Name": "P1 Life threat",
            "Color": "#ff0000",
            "IconStyle": "emergency",
            "IconUrl": null,
            "PinIconUrl": "https://api.resgrid.com/api/v4/TypeIcons/Pins/fire-emergency?v=1",
            "ImagePath": "fire",
            "IsVariant": false,
            "FollowsUnitStatus": false
          }
        ]
      }
    ],
    "Units": [],
    "Personnel": [],
    "PoiTypes": []
  },
  "PageSize": 1,
  "Status": "success"
}
```

The Responder, Unit and IC apps show this legend as a sheet over their maps; the web app shows it at **Mapping → Map Icon Legend**. Both are built by `MapIconLegendBuilder` from the department's `MapIconResolver`.
