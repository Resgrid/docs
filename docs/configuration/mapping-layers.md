---
sidebar_position: 18
---

# Mapping Layers

Mapping Layers in Resgrid allow you to add custom geographic data overlays to your department's maps. Layers are defined using GeoJSON data and can represent district boundaries, response zones, hazard areas, water sources, or any other geographic information relevant to your operations. In addition to layers, you can also configure **Points of Interest (POIs)** to mark specific locations on the map.

## Why Mapping Layers Matter

Standard maps show streets and terrain but lack the operational context your department needs. Mapping layers let you overlay your own geographic data — such as first-due response districts, hydrant locations, pre-plan locations, mutual aid boundaries, or flood zones — directly onto the maps your personnel use for dispatch and response. POIs mark important fixed locations that responders need to quickly find during operations.

## Scope

Mapping layers and POIs are department-wide. All layers and POIs are visible on the department map for all personnel. Layers can be toggled on or off by individual users, and some can be configured to show by default.

## Map Layers

### Viewing Layers

Navigate to **Mapping → Layers** to see all configured map layers.

### Creating a Layer

Click **New Layer** to create a new map layer.

| Field            | Required | Description                                                     |
| ---------------- | -------- | --------------------------------------------------------------- |
| Name             | Yes      | A descriptive name for the layer (e.g., "First Due Districts")  |
| Color            | Yes      | The color used to render the layer on the map                   |
| GeoJSON          | Yes      | The GeoJSON FeatureCollection data defining the geographic shapes |
| Is Searchable    | No       | Whether the layer's features are included in map search results |
| Is On By Default | No       | Whether the layer is visible by default when the map loads      |

:::tip GeoJSON Format
The GeoJSON data must be a valid **FeatureCollection**. You can create GeoJSON data using tools like [geojson.io](https://geojson.io), QGIS, or by exporting from your existing GIS system. Each feature in the collection will be rendered as a separate shape on the map.
:::

### Editing a Layer

Click on an existing layer to edit its name, color, GeoJSON data, or visibility settings.

### Deleting a Layer

Layers can be deleted (soft delete) from the Layers page. Deleting a layer removes it from all map views.

## Points of Interest (POIs)

POIs mark specific locations on the map with a marker icon. They are organized by **POI Type**, which defines the icon and color used for all POIs of that type.

### POI Types

Before creating individual POIs, you must define POI Types to categorize them.

Navigate to **Mapping → POIs** to view all POI types.

#### Creating a POI Type

Click **Add POI Type** to create a new type.

| Field   | Required | Default   | Description                                         |
| ------- | -------- | --------- | --------------------------------------------------- |
| Name    | Yes      | —         | The name of the POI type (e.g., "Hydrant", "AED")   |
| Image   | No       | —         | Custom image for the map marker                     |
| Color   | No       | —         | Color of the map marker                             |
| Marker  | No       | MAP_PIN   | Marker style to use on the map                      |

#### Deleting a POI Type

Deleting a POI type removes all POIs of that type from the map.

### Creating Individual POIs

Navigate to a POI type and click **Add POI** to add a specific location.

| Field     | Required | Description                                    |
| --------- | -------- | ---------------------------------------------- |
| Latitude  | Yes      | GPS latitude in decimal format                 |
| Longitude | Yes      | GPS longitude in decimal format                |
| Note      | No       | A descriptive note about the location          |

### Importing POIs from KML/KMZ

If you have location data in KML or KMZ format (common export formats from Google Earth, GIS systems, and other mapping tools), you can bulk-import POIs.

Navigate to a POI type and click **Import POIs**.

| Field | Required | Description                                              |
| ----- | -------- | -------------------------------------------------------- |
| File  | Yes      | A KML or KMZ file containing the point data to import    |

**Allowed file types:** .kml, .kmz

**Maximum file size:** 10 MB

The import process extracts coordinates from the KML file and creates individual POIs for each point. All imported POIs are assigned to the selected POI type.

## How the Map Displays Data

The department map combines multiple data sources into a single view:

| Data Source      | Description                                                |
| ---------------- | ---------------------------------------------------------- |
| Layers           | Custom GeoJSON overlay layers                              |
| POIs             | Points of Interest markers                                 |
| Active Calls     | Markers for currently active dispatch calls                |
| Personnel        | GPS locations of personnel (subject to permissions)        |
| Units            | GPS locations of units                                     |
| Stations         | Station markers with their configured locations            |
| Geofences        | Station district boundaries (configured in Groups)         |

### Map Visibility Controls

Users can toggle the visibility of map data using controls on the map view:

| Control          | Description                                    |
| ---------------- | ---------------------------------------------- |
| Show Calls       | Toggle active call markers                     |
| Show Personnel   | Toggle personnel location markers              |
| Show Units       | Toggle unit location markers                   |
| Show Stations    | Toggle station markers                         |
| Show Districts   | Toggle station geofence/district boundaries    |
| Show POIs        | Toggle point of interest markers               |

## Routing

The mapping module also supports routing:
- **Live Routing** — Route from your current location to a call
- **Station Routing** — Route from a station to a call location

## How Mapping Layers Connect to Other Features

| Feature             | Connection                                                       |
| ------------------- | ---------------------------------------------------------------- |
| Stations/Groups     | Station locations and geofences appear on the map                |
| Dispatch            | Active calls are shown on the map with location markers          |
| Personnel           | Personnel GPS locations appear on the map (permission-dependent) |
| Units               | Unit GPS locations appear on the map                             |
| Department Settings | Map center, zoom level, and location TTL are configured in settings |
| Permissions         | Personnel and unit location visibility is controlled by permissions |

## Common Errors and Resolutions

| Error                                       | Resolution                                                           |
| ------------------------------------------- | -------------------------------------------------------------------- |
| Layer not appearing on map                  | Verify the GeoJSON is a valid FeatureCollection; check "Is On By Default" setting |
| "File type is not importable"               | Only .kml and .kmz files are supported for POI import                |
| "File is too large"                         | POI import files must be smaller than 10 MB                          |
| GeoJSON parse error                         | Validate your GeoJSON at geojson.io before pasting into Resgrid      |
| POIs not showing on map                     | Ensure the POI type is not deleted and POIs have valid coordinates    |
| Map centered on wrong location              | Update department address or Map Center settings in Department Settings |