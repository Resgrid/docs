---
sidebar_position: 10
title: Mapping
---

# Mapping

The Mapping module provides interactive maps for visualizing department resources, calls, and geographic data. It is managed by the `MappingController`.

## Map View

The main map view displays an interactive map centered on the department's configured location (GPS coordinates or geocoded department address).

### Map Data Layers

The `GetMapData` endpoint is the primary aggregation endpoint, supporting these toggleable layers:

| Layer | Flag | Description |
|-------|------|-------------|
| **Stations** | `ShowStations` | Station group locations with geofences |
| **Calls** | `ShowCalls` | Active call locations with priority markers |
| **Units** | `ShowUnits` | Current unit positions |
| **Personnel** | `ShowPersonnel` | Personnel locations (permission-controlled) |
| **POIs** | `ShowPOIs` | Points of interest |
| **Districts** | `ShowDistricts` | Response district boundaries |

:::note Permission Control
Personnel location visibility is controlled by the `CanSeePersonnelLocations` permission. This is configurable per department in the Security settings.
:::

## Map Layers

Map layers provide custom GeoJSON overlays on the map.

### Creating Layers

Layers are defined using GeoJSON `FeatureCollection` format and stored in MongoDB.

| Field | Description |
|-------|-------------|
| Layer Name | Display name |
| GeoJSON Data | Feature collection defining shapes and properties |

### Editing Layers

Modify layer name and GeoJSON data. Validates department ownership and not-deleted status.

### Deleting Layers

Layers are **soft-deleted** (`IsDeleted = true`) rather than permanently removed.

## Points of Interest (POIs)

### POI Types

Create categories for points of interest with custom markers and images.

### Individual POIs

Add specific locations under a POI type with:
- Name and description
- GPS coordinates (latitude/longitude)

### POI Import (KML/KMZ)

Import multiple POIs from KML or KMZ files:
- Uses `IKmlProvider` for parsing
- Validates file type (.kml or .kmz)
- Maximum file size: 10 MB

### Viewing POIs by Type

The `ViewType` action filters the map to show only POIs of a specific type.

## Live Routing

### Call Routing
The `LiveRouting` action provides a routing view to a specific call location.

### Station-to-Call Routing
The `StationRouting` action shows routing from a station to a call:
- Resolves start coordinates from station address or GPS coordinates
- End coordinates from call location

## Data Endpoints

| Endpoint | Purpose |
|----------|---------|
| `GetMapData` | All map markers and geofences based on flag settings |
| `GetTypesMapData` | Map data for a specific POI type |
| `GetPoisForType` | POI list for a specific type |

## Interactions with Other Modules

| Module | Interaction |
|--------|-------------|
| **Calls** | Call locations displayed as markers |
| **Groups** | Station locations and geofences displayed |
| **Units** | Unit positions shown (from GPS tracking) |
| **Personnel** | Personnel locations shown (permission-controlled) |
| **Department** | Map center, zoom, and refresh settings |
| **Security** | Personnel location visibility permission |
