---
sidebar_position: 10
title: Maps & Routing API
---

# Maps & Routing API

The v4 API serves everything a map client needs from the Resgrid server: the department's base map as a MapLibre style, static map images, routes and drive times from the installation's routing provider, live navigation ETAs, route plan routing, and offline map packs. No client calls Mapbox, Google, Valhalla or OSRM directly, and no routing or geocoding token ever leaves the server. For what users see, see [Mapping](../web-app/mapping), [Routes](../web-app/routes) and [Department Settings → Mapping](../web-app/department-settings#mapping--big-board-settings); for setting up providers on your own server, see [Maps & Routing (self-hosted)](../self-hosted/maps-and-routing).

## Configuration fields

`GET /api/v4/Config/GetConfig` returns these fields beside the existing map fields, which keep their meaning for older app builds:

| Field | Description |
|-------|-------------|
| `MapRenderer` | `maplibre` when the fields below are filled |
| `MapLibreStyleUrlDay`, `MapLibreStyleUrlNight` | Signed `Mapping/GetStyle` URLs for the department's day and night base map |
| `MapRasterTileUrl` | Raster XYZ tiles (`{z}/{x}/{y}`) for pixel-space maps and fallbacks |
| `StaticMapUrlTemplate` | Signed `Mapping/GetStaticMap` URL with the placeholders `{lat}` `{lon}` `{zoom}` `{width}` `{height}` `{scale}` `{scheme}` |
| `TrafficAvailable`, `TrafficTileUrl`, `TrafficRefreshSeconds` | Live traffic vector tiles (Mapbox Traffic v1, public token included) and how often to reload them |
| `TrafficRasterTileUrl` | The department's own traffic image tiles (`{z}/{x}/{y}`, for example TomTom flow), set in Mapping Settings. When it is set, `TrafficAvailable` is false and `TrafficTileUrl` is empty, so clients that only draw vector traffic show none instead of misreading the images |
| `RoutingProvider`, `RoutingSupportsTraffic`, `RoutingSupportsIncidents`, `RoutingSupportsVoice` | What the installation's routing can do |
| `NavigationAvailable` | In-app navigation may be offered: the routing provider is Valhalla or Mapbox, navigation is enabled on the installation and the department has `Navigation.InApp` |
| `OfflineMapsAvailable`, `OfflineManifestUrl` | Offline packs are on for the department (`Maps.Offline`), and the signed manifest URL to call exactly as given |
| `AmbientCacheMaxBytes` | The tile cache budget a native client should set |

## Signed URLs

Map sources in native and web map libraries cannot send an `Authorization` header, so map resources accept a **signature** instead of a bearer token: `d` (department), `e` (expiry, Unix seconds) and `sig` (HMAC) query parameters. The signature covers the department, the kind of resource and the expiry, not the other query values, so a signed template stays valid after its placeholders are filled. URLs live `SignedMapUrlTtlHours` (24 hours by default); refresh them by fetching the configuration again. An expired or wrong signature answers **401**, or **410** for offline downloads so the client knows to fetch a new manifest.

`POST /api/v4/Mapping/SignMapResourceUrls` (bearer, `Call_View`) signs custom map tile and image URLs and indoor floor image URLs of the caller's department; template URLs (`{z}/{x}/{y}`) stay valid after signing, and URLs for other resources or other departments come back null.

## Styles and static maps

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v4/Mapping/GetStyle?key=&variant=day\|night` | GET | Bearer or signed | The department's base map as MapLibre style JSON: a Mapbox style with every `mapbox://` URL rewritten, the installation's self-hosted style, or a raster style. `key` is the app surface (empty for the website) |
| `/api/v4/Mapping/GetStaticMap?lat&lon&zoom&width&height&scale&scheme[&marker=0][&style=]` | GET | Signed | A PNG/JPEG map image. `zoom` is a MapLibre zoom, `scale` 1 or 2, `scheme` `day` or `night`; a centre pin is drawn unless `marker=0`. `style` (a `MapStyleTypes` value) previews that style instead of the department's own, as the Mapping Settings page does |
| `/api/v4/Mapping/GetCustomMapMercatorTile/{layerId}/{z}/{x}/{y}` | GET | Bearer or signed | A georeferenced custom map layer as Web Mercator tiles; 204 outside the layer, 404 for a layer with no geographic position |

`GetStaticMap` uses Mapbox Static Images on a Mapbox installation; on a self-hosted one it uses the style server's static images (TileServer GL `…/styles/{id}/static/…`) when the style comes from one, else it stitches the installation's raster tiles.

## Routing

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v4/Routing/GetCapabilities` | GET | Bearer, `Call_View` | Provider, attribution, and whether it has steps, traffic, incidents, navigation and which vehicle limits it applies |
| `/api/v4/Routing/GetRoute` | POST | Bearer, `Call_View` | A route through two or more points |
| `/api/v4/Routing/GetCallRoute?callId&latitude&longitude[&heading][&unitId][&navigation][&language][&metric]` | GET | Bearer, `Call_View` | From the caller's position to a call (navigation start and reroute) |
| `/api/v4/Routing/ReportNavigationProgress` | POST | Bearer, `Unit_View` | A navigating unit's progress (sets the live ETA) |
| `/api/v4/Routing/GetActiveNavigations?callId=&unitId=` | GET | Bearer, `Unit_View` | Units navigating now, with their live ETAs |

### GetRoute

```json
{
  "Points": [ { "Latitude": 39.53, "Longitude": -119.81, "Heading": 270, "IsStop": true }, { "Latitude": 39.60, "Longitude": -119.75 } ],
  "Profile": 0,
  "Avoid": 0,
  "UnitId": 12,
  "Steps": true,
  "Navigation": false,
  "Language": "en",
  "Metric": false
}
```

| Field | Description |
|-------|-------------|
| `Points` | Two or more points in travel order; `IsStop: false` passes through a point; `Heading` (degrees) on the first point helps a reroute keep the direction of travel |
| `Profile` | `0` Driving, `1` Driving with traffic, `2` Truck, `3` Walking, `4` Cycling |
| `Avoid` | Flags: `1` tolls, `2` highways, `4` ferries, `8` unpaved |
| `UnitId` | Apply this unit's [vehicle size and weight](../web-app/units#vehicle-size-and-weight) (the unit must be in the caller's department) |
| `Steps` / `Navigation` | Return turn-by-turn steps / voice and banner instructions (navigation is ignored when the provider cannot navigate) |

The result's `Data`:

| Field | Description |
|-------|-------------|
| `Provider`, `Attribution` | Who answered, and the text to show with the route |
| `DistanceMeters`, `DurationSeconds`, `TypicalDurationSeconds` | Totals; the typical duration is the provider's no-traffic figure where it gives one |
| `IsTrafficAware`, `VehicleRestricted`, `VehicleLimitsEnforced` | Whether live traffic and the unit's vehicle limits (`all`, `size` or `none`) went into the route |
| `IsEstimate` | A straight-line estimate, not a road route: the provider and its fallback both failed |
| `Geometry` | The route line as a GeoJSON LineString string |
| `Legs` | `DistanceMeters` and `DurationSeconds` per leg (point to point) |
| `Incidents` | Accidents, closures and roadworks along the route, where the provider reports them |
| `RoadClosureDelaySeconds` | Seconds the department's own [road closures](#road-closures) added to `DurationSeconds` (slowdowns, and detours the provider could not take); `0` when none |
| `RoadClosures` | The department's active road closures near the route and what each did: `RoadClosureId`, `Name`, `Effect` (`0` avoided, `1` slowed, `2` crossed: the provider could not avoid it and the detour time was added) and `DelaySeconds` |
| `Route` | With `Steps`: the full route in the OSRM v5 / Mapbox Directions shape (legs, steps, maneuvers, and voice and banner instructions with `Navigation`) |
| `NavigationAvailable` | In-app navigation may use this route |

Every request goes to the installation's routing provider, then its fallback provider, and finally to a straight-line estimate, so a route always comes back.

### ReportNavigationProgress

Sent by an app navigating a unit: on start, reroute, arrival and end, and at most every 15 seconds while navigating. Dispatch and Big Board show the ETA live.

| Field | Description |
|-------|-------------|
| `UnitId` | The navigating unit |
| `CallId` or `RouteInstanceId` (+ `RouteInstanceStopId`) | Where it is going |
| `State` | `0` Started, `1` Progress, `2` Rerouted, `3` Arrived, `4` Ended. Arrived and Ended clear the unit's live ETA, as does the unit setting a status such as On Scene or Available |
| `EtaUtc`, `RemainingSeconds`, `RemainingMeters` | The estimate; without `EtaUtc` the server uses now + `RemainingSeconds` |
| `IsTrafficAware`, `Provider` | How the estimate was made |

`GetActiveNavigations` lists each navigation the caller may see (the call, and the unit's location) with the same fields, `ReportedOn`, and `IsStale` after 60 seconds without a report. A change is pushed on the eventing hub as `unitNavigationUpdated`, carrying ids only; read the ETA from `GetActiveNavigations`.

### Travel modes

`GetCallRoute` with a `unitId` follows the unit's [travel mode](../web-app/units#travel-mode): a walking unit is routed on foot (profile `3`) and a cycling unit by bike (`4`), without vehicle limits; driving and air units get the road route with their vehicle size and weight, as before. `GetRoute` uses the `Profile` you send.

`GET /api/v4/Dispatch/GetNearestUnits` (the nearest-units board) measures each unit by its travel mode. Each row of `Data.Units` also has:

| Field | Description |
|-------|-------------|
| `TravelMode` | `0` Driving, `1` Cycling, `2` Walking, `3` Air |
| `EtaSource` | Gains `3` Direct: an air unit's straight-line time at its air speed, not an estimate (`1` Estimated and `2` Road as before) |
| `RoadClosureDelaySeconds` | Seconds active road closures added to the routed time; `0` when none |
| `RoadClosures` | Names of the active road closures the unit's route was measured against (avoided, slowed by or crossing) |

Personnel rows are always measured as driving.

## Road closures

The department's [road closures](../web-app/mapping#road-closures) are drawn and managed on the website. The routing endpoints apply them; apps can read them to draw on their maps.

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v4/RoadClosures/GetRoadClosures[?activeOnly=true]` | GET | Bearer, `Call_View` | The closures in effect now and those still to come; `activeOnly=true` returns only those in effect now. Ended and switched-off closures are left out |

Each item of `Data`:

| Field | Description |
|-------|-------------|
| `RoadClosureId`, `Name` | The closure |
| `ClosureType` | `0` Other, `1` Event, `2` Road works, `3` Incident, `4` Police, `5` Weather, `6` Hazard on the road, `7` Bridge, tunnel or crossing |
| `Severity` | `0` Full (no through traffic), `1` Partial (slowed) |
| `SpeedPercent` | Speed inside the closure, as a percentage of normal |
| `AppliesTo` | Flags of the traffic it stops: `1` vehicles, `2` bicycles, `4` pedestrians |
| `State` | `0` In effect, `1` Scheduled |
| `IsEnabled` | Switched on (always true in this list) |
| `Geometry` | The closed areas and road lines as a GeoJSON FeatureCollection of Polygons and LineStrings |
| `Windows` | Closure times in UTC: `StartsOn` and `EndsOn` (null: until further notice). Empty: in effect until switched off |
| `Reason`, `ClosedBy`, `Authority`, `ContactName`, `ContactDetails`, `Notes` | The details entered on the website |
| `UpdatedOn` | Last change, UTC |

`GetRoute` and `GetCallRoute` apply the department's closures that are switched on and in effect at the time of the request, for the route's profile: pedestrian closures for `3` Walking, bicycle closures for `4` Cycling, vehicle closures for the driving profiles. Full closures near the route are avoided as far as the provider can (Valhalla avoids drawn areas and road lines; Mapbox driving profiles avoid points along closed roads and re-route up to twice out of a closed area; Google and OSRM cannot avoid them), and a route that still crosses one is charged the closure's detour time. Partial closures, and a full closure the route starts or ends in, slow the time spent inside them to the closure's `SpeedPercent`. `DurationSeconds` includes all of this, `RoadClosureDelaySeconds` says how much of it the closures added, and `RoadClosures` lists them. Route plans do not apply closures.

## Route plans

Route plan endpoints keep their existing shapes; these are new or extended:

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v4/Routes/CreateRoutePlan`, `/api/v4/Routes/UpdateRoutePlan` | POST / PUT | Bearer, `Route_Create` / `Route_Update` | Accept optional `RoutingProfile`, `AvoidOptions`, `StartDepartmentGroupId`, `EndDepartmentGroupId`, and per-stop `ContactId` and geofence radius. `UpdateRoutePlan` changes the stops only when a `Stops` array is sent. Both regenerate the route |
| `/api/v4/Routes/GenerateRoute/{routePlanId}` | POST | Bearer, `Route_Update` | Generates (or regenerates) and stores the plan's route |
| `/api/v4/Routes/PreviewOptimization/{routePlanId}` | GET | Bearer, `Route_Update` | The best stop order with start and end fixed, and the totals before and after; nothing is saved |
| `/api/v4/Routes/ApplyStopOrder/{routePlanId}` | POST | Bearer, `Route_Update` | Saves a stop order (every stop once, renumbered 1..n) and regenerates the route |
| `/api/v4/Routes/GetDirections/{routePlanId}` | GET | Bearer, `Route_View` | The stored route with legs, steps and planned arrival offsets per stop; regenerated if the plan changed |
| `/api/v4/Routes/GetInstanceDirections/{instanceId}?latitude&longitude[&heading]` | GET | Bearer, `Route_View` | With a position: a live route through the stops still to do, with an ETA per stop. Without: the stored plan route, as before |
| `/api/v4/Routes/GetActiveRouteForUnit/{unitId}?includePaused=true` | GET | Bearer, `Route_View` | `includePaused=true` also returns a paused route; without it only a route in progress, as before |
| `/api/v4/Routes/CheckOutFromStop` | POST | Bearer, `Route_Update` | Optional `Latitude` / `Longitude`; the stop must belong to the caller's department |
| `/api/v4/Routes/RecordDeviation` | POST | Bearer, `Route_Update` | Records a deviation for a running route, e.g. *off route* from in-app navigation |

`MapboxRouteGeometry` on a plan now holds the generated route as a GeoJSON LineString string, and `MapboxRouteProfile` keeps its old values (`driving`, `driving-traffic`, `walking`, `cycling`; Truck is `driving`).

## Offline map packs

The offline manifest lists everything an app downloads for use without a network (see [Offline maps](../web-app/department-settings#offline-maps)). Call the signed `OfflineManifestUrl` from the configuration exactly as given; every URL in the manifest is signed and on the same origin.

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v4/Mapping/GetOfflineManifest` | GET | Bearer or signed | Base map cells over the department's response area, custom map rasters, indoor and custom map images, the department data bundle, sprite and offline styles, each with a size, SHA-256 and download URL |
| `/api/v4/Mapping/GetOfflinePack/{packId}[?file=]` | GET | Bearer or signed | A built pack (PMTiles), or one sprite file. Supports HTTP `Range`; the ETag is the SHA-256 |
| `/api/v4/Mapping/GetOfflineDepartmentData` | GET | Bearer or signed | The department data bundle: gzip JSON of GeoJSON collections (layers, POIs, stations, hydrants …) |
| `/api/v4/Mapping/GetOfflineAsset/{name}` | GET | Bearer or signed | An offline style or glyph archive (`day.json`, `night.json`, `glyphs.zip`) |
| `/api/v4/Mapping/EstimateResponseArea` | POST | Bearer, `Department_View` | `{ "GeoJson": "…" }`: the base map download size of a response area against the installation's limit; an empty area measures the default circle |

Packs are built in the background by the worker, the first time a manifest asks for them. Each pack carries a `Status`; one not built yet has no download until it is, so fetch the manifest again later.

Outside the response area the manifest also lists incident packs (`Kind` 1: base map cells around each active call) and route corridor packs (`Kind` 2: cells along each active route plan). These carry `CallIds` (the calls whose radius touches the cell) and `RoutePlanIds` (the route plans whose corridor touches it), so a device downloads only the packs for the calls and routes it works on. One cell can be near several calls and routes at once, so both are lists, and a cell can list route plans whatever its `Kind`. Other packs return `null` for both.
