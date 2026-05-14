---
sidebar_position: 8
title: Custom Maps API
---

# Custom Maps API

The Custom Maps API provides programmatic access to department-owned custom maps, floors, zones, and coordinate resolution. All endpoints are scoped to the authenticated user's department.

**Base URL:** `/api/v4/CustomMaps`

## Authentication

All Custom Maps API endpoints require a valid JWT bearer token. See [API Authentication](authentication) for details.

---

## Enumerations

### Map Type

| Value | Name | Description |
|-------|------|-------------|
| `0` | Indoor | Building floor plans, arenas, hospitals |
| `1` | Satellite | Custom or classified satellite imagery |
| `2` | Schematic | Engineered drawings, utility diagrams |
| `3` | Event | Temporary event maps; auto-archived after end date |

### Zone Type

| Value | Name | Description |
|-------|------|-------------|
| `0` | Room | General room or enclosed space |
| `1` | Hallway | Corridor or passage |
| `2` | StairWell | Stairwell |
| `3` | Elevator | Elevator shaft or lobby |
| `4` | Hazard | Hazmat storage, chemical area, electrical panel |
| `5` | StagingArea | ICS resource or equipment staging |
| `6` | MusterPoint | Evacuation assembly / muster point |
| `7` | Exit | Emergency egress point |
| `8` | Parking | Parking area |
| `9` | Gate | Entry/exit gate (events, secured facilities) |
| `10` | Checkpoint | Security or access checkpoint |
| `11` | Custom | User-defined zone |

---

## Custom Maps

### Get All Custom Maps

Returns all active custom maps for the department.

```
GET /api/v4/CustomMaps/GetCustomMaps
```

**Response:** Array of `CustomMapResult`

```json
[
  {
    "customMapId": "cm_abc123",
    "departmentId": 42,
    "name": "Station 4 — Main Building",
    "description": "Three-story main station building",
    "type": 0,
    "boundsTopLeftLat": 40.7128,
    "boundsTopLeftLng": -74.0060,
    "boundsBottomRightLat": 40.7120,
    "boundsBottomRightLng": -74.0050,
    "imageUrl": "https://storage.resgrid.com/maps/cm_abc123/base.jpg",
    "tileUrlTemplate": "https://storage.resgrid.com/tiles/cm_abc123/{z}/{x}/{y}.png",
    "defaultZoom": 18,
    "minZoom": 15,
    "maxZoom": 22,
    "isActive": true,
    "floorCount": 3,
    "addedOn": "2026-02-01T09:00:00Z",
    "updatedOn": "2026-03-10T14:30:00Z"
  }
]
```

---

### Get Custom Map

Returns full detail for a specific custom map including all floors and zone summaries.

```
GET /api/v4/CustomMaps/GetCustomMap/{id}
```

| Parameter | Type | Location | Description |
|-----------|------|----------|-------------|
| `id` | string | Path | Custom map ID |

**Response:** `CustomMapDetailResult`

```json
{
  "customMapId": "cm_abc123",
  "departmentId": 42,
  "name": "Station 4 — Main Building",
  "description": "Three-story main station building",
  "type": 0,
  "boundsTopLeftLat": 40.7128,
  "boundsTopLeftLng": -74.0060,
  "boundsBottomRightLat": 40.7120,
  "boundsBottomRightLng": -74.0050,
  "imageUrl": "https://storage.resgrid.com/maps/cm_abc123/base.jpg",
  "tileUrlTemplate": "https://storage.resgrid.com/tiles/cm_abc123/{z}/{x}/{y}.png",
  "defaultZoom": 18,
  "minZoom": 15,
  "maxZoom": 22,
  "isActive": true,
  "addedOn": "2026-02-01T09:00:00Z",
  "updatedOn": "2026-03-10T14:30:00Z",
  "floors": [
    {
      "customMapFloorId": "cmf_001",
      "floorNumber": 1,
      "name": "1st Floor",
      "imageUrl": "https://storage.resgrid.com/maps/cm_abc123/floor1.jpg",
      "tileUrlTemplate": "https://storage.resgrid.com/tiles/cm_abc123/f1/{z}/{x}/{y}.png",
      "sortOrder": 1,
      "isDefault": true,
      "elevationFt": 0.0,
      "zoneCount": 12
    }
  ]
}
```

---

### Save Custom Map

Creates a new custom map. Use multipart/form-data to upload the map image.

```
POST /api/v4/CustomMaps/SaveCustomMap
```

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Display name |
| `description` | string | No | Description |
| `type` | int | Yes | Map type enum (0–3) |
| `boundsTopLeftLat` | decimal | Yes | Geo-bounds top-left latitude |
| `boundsTopLeftLng` | decimal | Yes | Geo-bounds top-left longitude |
| `boundsBottomRightLat` | decimal | Yes | Geo-bounds bottom-right latitude |
| `boundsBottomRightLng` | decimal | Yes | Geo-bounds bottom-right longitude |
| `defaultZoom` | int | No | Default zoom level (1–22) |
| `minZoom` | int | No | Minimum zoom level |
| `maxZoom` | int | No | Maximum zoom level |
| `eventStartDate` | string | No | ISO 8601 date; Event type only |
| `eventEndDate` | string | No | ISO 8601 date; Event type only |
| `isActive` | bool | No | Defaults to `true` |
| `imageFile` | file | Yes | PNG, JPG, or SVG — max 50 MB |

**Response:** `CustomMapResult` (the newly created map, including assigned ID and tile URL once processing completes)

---

### Update Custom Map

Updates an existing custom map. To replace the image, use the `imageFile` field; omit it to keep the existing image.

```
PUT /api/v4/CustomMaps/UpdateCustomMap/{id}
```

**Content-Type:** `multipart/form-data`

Same fields as `SaveCustomMap`. `imageFile` is optional on update.

**Response:** `CustomMapResult`

---

### Delete Custom Map

Permanently deletes a custom map and all associated floors, zones, tile files, and share links.

```
DELETE /api/v4/CustomMaps/DeleteCustomMap/{id}
```

| Parameter | Type | Location | Description |
|-----------|------|----------|-------------|
| `id` | string | Path | Custom map ID |

**Response:** `200 OK` on success.

---

## Floors

### Get Floors

Returns all floors for a custom map.

```
GET /api/v4/CustomMaps/GetFloors/{customMapId}
```

| Parameter | Type | Location | Description |
|-----------|------|----------|-------------|
| `customMapId` | string | Path | Custom map ID |

**Response:** Array of `CustomMapFloorResult`

```json
[
  {
    "customMapFloorId": "cmf_001",
    "customMapId": "cm_abc123",
    "floorNumber": 1,
    "name": "1st Floor",
    "imageUrl": "https://storage.resgrid.com/maps/cm_abc123/floor1.jpg",
    "tileUrlTemplate": "https://storage.resgrid.com/tiles/cm_abc123/f1/{z}/{x}/{y}.png",
    "sortOrder": 1,
    "isDefault": true,
    "elevationFt": 0.0
  },
  {
    "customMapFloorId": "cmf_002",
    "customMapId": "cm_abc123",
    "floorNumber": 2,
    "name": "2nd Floor",
    "imageUrl": "https://storage.resgrid.com/maps/cm_abc123/floor2.jpg",
    "tileUrlTemplate": "https://storage.resgrid.com/tiles/cm_abc123/f2/{z}/{x}/{y}.png",
    "sortOrder": 2,
    "isDefault": false,
    "elevationFt": 12.0
  }
]
```

---

### Save Floor

Adds a new floor to a custom map. Use multipart/form-data.

```
POST /api/v4/CustomMaps/SaveFloor/{customMapId}
```

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `floorNumber` | int | Yes | Numeric floor level (negative for sub-levels) |
| `name` | string | Yes | Floor display name |
| `sortOrder` | int | No | Display sort order in tab bar |
| `isDefault` | bool | No | Set as the default floor |
| `elevationFt` | decimal | No | Physical elevation above sea level in feet |
| `imageFile` | file | Yes | Floor plan image (PNG, JPG, SVG — max 50 MB) |

**Response:** `CustomMapFloorResult`

---

### Update Floor

Updates floor metadata. Omit `imageFile` to keep the existing floor image.

```
PUT /api/v4/CustomMaps/UpdateFloor/{floorId}
```

**Content-Type:** `multipart/form-data`

Same fields as `SaveFloor`. `imageFile` is optional on update.

**Response:** `CustomMapFloorResult`

---

### Delete Floor

Permanently deletes a floor and all of its zones.

```
DELETE /api/v4/CustomMaps/DeleteFloor/{floorId}
```

| Parameter | Type | Location | Description |
|-----------|------|----------|-------------|
| `floorId` | string | Path | Floor ID |

**Response:** `200 OK` on success.

---

## Zones

### Get Zones

Returns all zones for a floor including full polygon GeoJSON.

```
GET /api/v4/CustomMaps/GetZones/{floorId}
```

| Parameter | Type | Location | Description |
|-----------|------|----------|-------------|
| `floorId` | string | Path | Floor ID |

**Response:** Array of `CustomMapZoneResult`

```json
[
  {
    "customMapZoneId": "cmz_001",
    "customMapFloorId": "cmf_001",
    "name": "Building 1, Room 405a",
    "zoneType": 0,
    "polygonGeoJson": "{\"type\":\"Feature\",\"geometry\":{\"type\":\"Polygon\",\"coordinates\":[[[-74.0058,40.7126],[-74.0056,40.7126],[-74.0056,40.7124],[-74.0058,40.7124],[-74.0058,40.7126]]]},\"properties\":{}}",
    "color": "#3388ff",
    "metadata": "{\"capacity\": \"20\", \"wing\": \"North\"}",
    "elevationFt": 45.0,
    "isSearchable": true,
    "isActive": true
  }
]
```

---

### Get Zone

Returns a single zone by ID.

```
GET /api/v4/CustomMaps/GetZone/{zoneId}
```

| Parameter | Type | Location | Description |
|-----------|------|----------|-------------|
| `zoneId` | string | Path | Zone ID |

**Response:** `CustomMapZoneResult`

---

### Save Zone

Creates a new zone on a floor.

```
POST /api/v4/CustomMaps/SaveZone/{floorId}
```

**Content-Type:** `application/json`

```json
{
  "name": "Building 1, Room 405a",
  "zoneType": 0,
  "polygonGeoJson": "{\"type\":\"Feature\",\"geometry\":{\"type\":\"Polygon\",\"coordinates\":[[[-74.0058,40.7126],[-74.0056,40.7126],[-74.0056,40.7124],[-74.0058,40.7124],[-74.0058,40.7126]]]},\"properties\":{}}}",
  "color": "#3388ff",
  "metadata": "{\"capacity\": \"20\"}",
  "elevationFt": 45.0,
  "isSearchable": true,
  "isActive": true
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Human-readable zone name; used as call location |
| `zoneType` | int | Yes | Zone type enum (0–11) |
| `polygonGeoJson` | string | Yes | GeoJSON Feature with a Polygon geometry; coordinates must be real-world lat/lng |
| `color` | string | No | Hex color code for polygon fill |
| `metadata` | string | No | JSON string of key/value metadata |
| `elevationFt` | decimal | No | Zone elevation in feet |
| `isSearchable` | bool | No | Include zone in map search |
| `isActive` | bool | No | Defaults to `true` |

**Response:** `CustomMapZoneResult`

---

### Update Zone

Updates an existing zone. All fields may be updated including the polygon geometry.

```
PUT /api/v4/CustomMaps/UpdateZone/{zoneId}
```

**Content-Type:** `application/json`

Same body shape as `SaveZone`.

**Response:** `CustomMapZoneResult`

---

### Delete Zone

Permanently deletes a zone.

```
DELETE /api/v4/CustomMaps/DeleteZone/{zoneId}
```

| Parameter | Type | Location | Description |
|-----------|------|----------|-------------|
| `zoneId` | string | Path | Zone ID |

**Response:** `200 OK` on success.

---

## Coordinate Resolution

### Resolve Coordinate to Zone

Given a custom map, floor, and real-world latitude/longitude, performs a point-in-polygon test against all active zones on that floor and returns the matching zone name.

This endpoint is used by mobile apps and CAD integrations to automatically resolve a GPS position to a room or area name.

```
POST /api/v4/CustomMaps/ResolveCoordinate
```

**Content-Type:** `application/json`

```json
{
  "customMapId": "cm_abc123",
  "floorId": "cmf_001",
  "latitude": 40.7125,
  "longitude": -74.0057
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `customMapId` | string | Yes | Custom map ID |
| `floorId` | string | Yes | Floor ID to test against |
| `latitude` | decimal | Yes | Point latitude |
| `longitude` | decimal | Yes | Point longitude |

**Response:** `CoordinateResolveResult`

```json
{
  "matched": true,
  "customMapZoneId": "cmz_001",
  "zoneName": "Building 1, Room 405a",
  "zoneType": 0,
  "floorName": "1st Floor",
  "mapName": "Station 4 — Main Building"
}
```

If no zone matches:

```json
{
  "matched": false,
  "customMapZoneId": null,
  "zoneName": null,
  "zoneType": null,
  "floorName": "1st Floor",
  "mapName": "Station 4 — Main Building"
}
```

---

## Map Metadata in GetMapDataAndMarkers

The existing map data endpoint includes a `customMaps` collection in its response when the department has active custom maps. This allows map clients to discover available custom maps without a separate API call.

```
GET /api/v4/Mapping/GetMapDataAndMarkers
```

The response includes:

```json
{
  "customMaps": [
    {
      "customMapId": "cm_abc123",
      "name": "Station 4 — Main Building",
      "type": 0,
      "boundsTopLeftLat": 40.7128,
      "boundsTopLeftLng": -74.0060,
      "boundsBottomRightLat": 40.7120,
      "boundsBottomRightLng": -74.0050,
      "defaultZoom": 18,
      "tileUrlTemplate": "https://storage.resgrid.com/tiles/cm_abc123/{z}/{x}/{y}.png",
      "floorCount": 3,
      "defaultFloorId": "cmf_001"
    }
  ]
}
```

---

## Offline Sync (Mobile)

Mobile clients use a version-check endpoint before deciding whether to download map data.

### Get Map Version Manifest

Returns a lightweight manifest of all custom maps and their current versions. Mobile apps compare this against their local cache and download only what has changed.

```
GET /api/v4/CustomMaps/GetVersionManifest
```

**Response:** `CustomMapVersionManifest`

```json
{
  "generatedAt": "2026-03-14T08:00:00Z",
  "maps": [
    {
      "customMapId": "cm_abc123",
      "mapVersion": 7,
      "floors": [
        {
          "customMapFloorId": "cmf_001",
          "floorVersion": 3,
          "zoneVersion": 12
        },
        {
          "customMapFloorId": "cmf_002",
          "floorVersion": 1,
          "zoneVersion": 5
        }
      ]
    }
  ]
}
```

The mobile app:
1. Calls `GetVersionManifest` on launch or foreground.
2. Compares each `mapVersion`, `floorVersion`, and `zoneVersion` to the locally cached values.
3. For any entry with a higher server version, downloads the relevant floor image and/or zone GeoJSON.
4. Stores updated data in local storage for offline use.

---

## Error Responses

All endpoints return standard HTTP status codes with a JSON error body:

```json
{
  "error": "CustomMapNotFound",
  "message": "No custom map with ID 'cm_xyz' was found for this department.",
  "statusCode": 404
}
```

| Status Code | Meaning |
|-------------|---------|
| `400` | Invalid request body or missing required fields |
| `401` | Missing or expired authentication token |
| `403` | Caller does not have permission for this operation |
| `404` | Requested map, floor, or zone not found for this department |
| `413` | Uploaded image exceeds the 50 MB limit |
| `422` | Invalid GeoJSON polygon; polygon must be closed and have ≥ 3 vertices |
| `500` | Internal server error |
