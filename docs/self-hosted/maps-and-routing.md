---
sidebar_position: 9
title: Maps & Routing
---

# Maps & Routing

A Resgrid installation chooses its own map providers: where base map tiles come from, which service plans routes and drive times, which ones turn addresses into locations, and whether live traffic is shown. Clients never talk to these services directly — the website and the apps get styles, routes and images from the Resgrid server — so a self-hosted installation can run entirely on its own servers, use Mapbox or Google, or mix them.

Every setting below uses the usual pattern `RESGRID__MappingConfig__{Field}` in `~/resgrid/.env` (see [Configuration](installation#configuration)). For what members see, see [Mapping](../web-app/mapping); for the API, see [Maps & Routing API](../api/maps-and-routing).

## Feature flags

Three [feature flags](../reference/feature-flags) switch the newer map features on per department; all three are off until you turn them on.

| Flag | Turns on |
|---|---|
| `Maps.MapLibreWeb` | MapLibre maps on the website: the department's map style, Terra Draw drawing, live traffic. Off = the standard raster map |
| `Maps.Offline` | Offline map packs for the apps. Also needs `OfflineMapsEnabled` and pack storage (below) |
| `Navigation.InApp` | Turn-by-turn navigation in the Unit app and the live ETAs it shares. Also needs a Valhalla or Mapbox routing provider |

## Base map

| Setting | Default | Description |
|---|---|---|
| `TileProvider` | `auto` | `mapbox`, `selfhosted`, or `auto` (Mapbox when the installation has a website Mapbox token, else self-hosted) |
| `WebsiteMapboxAccessToken` | | Public (`pk.`) Mapbox token for the website. With `mapbox` tiles, department map styles are Mapbox styles |
| `SelfHostedStyleUrlDay`, `SelfHostedStyleUrlNight` | | MapLibre style JSON for your own tiles (a TileServer GL or Protomaps style). Empty: a raster style is built from the raster tiles below |
| `SelfHostedStyleCatalog` | | JSON object of map kind → style URL, so department style picks find a counterpart: `{"streets": "…", "light": "…", "dark": "…", "outdoors": "…", "satellite": "…"}` |
| `SelfHostedRasterTileUrl` | | Raster XYZ tiles (`{z}/{x}/{y}`) for the image-based editors, static maps and the raster style; empty uses `LeafletTileUrl` |
| `LeafletTileUrl`, `LeafletAttribution` | | The standard web map's tiles, used where MapLibre web maps are off |
| `MapAttributionOverride` | | Attribution text forced into every style (OpenStreetMap data needs visible attribution) |
| `SignedMapUrlTtlHours` | `24` | How long the signed style, tile and image URLs the server hands out stay valid |

On a self-hosted base map the [Map Style](../web-app/department-settings#map-style) setting lists only the styles your server can draw: no Mapbox community styles, and the satellite styles only when `SelfHostedStyleCatalog` has a `satellite` entry. A style kind with no catalog entry uses the day or night style. The style previews on that page, and every static map image, use your style server's static images when the style URL has the TileServer GL form `…/styles/{id}/style.json`, and otherwise stitch the raster tiles.

A department's own **Mapbox override** (Department Settings → Mapping) works on any installation, because it brings its own token.

## Routing

| Setting | Default | Description |
|---|---|---|
| `RoutingProvider` | `google` | `valhalla`, `mapbox`, `google`, `osrm` or `estimate` (straight line) |
| `RoutingFallbackProvider` | `estimate` | Used when the first provider fails, times out, or can't route a particular request. When Valhalla is the provider or the fallback, Mapbox (if it has a token) is always tried next, before the estimate. The straight-line estimate always remains the last resort, so a route always comes back |
| `ValhallaUrl`, `ValhallaApiKey` | | Your Valhalla server (`http://valhalla:8002`; private addresses are fine) or a hosted Valhalla service, and an optional key |
| `ValhallaAuthScheme` | `apikey` | How `ValhallaApiKey` is sent: `apikey` as an `X-Api-Key` header (a gateway in front of your own server), `bearer` as `Authorization: Bearer <key>` (hosted services such as SimpleRouting) |
| `ValhallaCoverage` | | Where the Valhalla server has map data, as `west,south,east,north` boxes separated by `;`. A request with any point outside every box goes straight to the fallback provider without calling Valhalla. Empty: everywhere |
| `ValhallaMaxWaypoints`, `ValhallaMaxExcludePoints` | `20`, `50` | Most stops in one route and most road-closure points Valhalla accepts. Match the server's `service_limits` (`auto.max_locations`, `max_exclude_locations`); the setup kit's routing server raises them to `50` and `200`. Larger requests go to the fallback provider |
| `MapboxRoutingAccessToken` | | Server-side Mapbox token for Directions, Matrix and Optimization. May be a secret (`sk.`) token; it never leaves the server. Empty: the web app's Mapbox map token (`WebsiteMapboxAccessToken`, then `WebsiteMapboxKey`) is used, sent with `SystemBehaviorConfig.ResgridBaseUrl` as the referrer, so a public token restricted to your web app's URL works. That URL must be on the token's allowed list |
| `GoogleMapsApiKey`, `GoogleRoutingApi` | `legacy` | Google key; `legacy` uses Directions and Distance Matrix, `routes` the Routes API (required for Google Cloud projects created after March 2025) |
| `OsrmUrl` | public demo server | Your OSRM server. The default public server is for testing only |
| `RoutingTrafficAware` | `true` | Use live traffic where the provider has it (Mapbox, Google) for *Driving with traffic* and drive times |
| `RoutingTimeoutMs` | `4000` | Timeout per routing call (matrix calls get twice this) |
| `RoutingMatrixMaxOrigins` | `100` | Most units one drive-time lookup routes at once on a provider without per-request cost (Valhalla, OSRM) |
| `NavigationEnabled` | `true` | Allows in-app navigation (with the `Navigation.InApp` flag and a Valhalla or Mapbox provider) |

What each provider can do:

| | Valhalla | Mapbox | Google | OSRM |
|---|---|---|---|---|
| Routes, drive times, stop order | Yes | Yes | Yes | Yes |
| Live traffic in routes | No | Yes | Yes | No |
| Vehicle limits (Truck) | All: height, width, length, weight, axle load, axles, hazardous materials | Height, width, weight | None | None |
| In-app navigation | Yes | Yes | No (Google's terms do not allow it) | No |

Routing is used for route plans and their directions, Live and Station Routing, run card and nearest-unit drive times, and in-app navigation. Results are cached briefly, so the same route asked twice in a row costs one request.

A department can also use its own Mapbox, Google, Valhalla or OSRM account, live traffic layer and geocoding key ([Your own map providers](../web-app/department-settings#your-own-map-providers)). Its account is tried first, then the chain above. A department's Valhalla or OSRM server must be a public `https` address: the server refuses private and internal addresses on every connection, unlike `ValhallaUrl`, which may be on your private network.

When a provider fails (an error, a timeout, a rejected key, a rate limit), it is skipped for a minute and the fallback answers. When Valhalla is working but refuses one request (a point outside its map data or far from any road, or more stops or closure points than it accepts), only that request goes to the fallback. Either way, a Valhalla install with a Mapbox token (its own or the web map's) gets Mapbox before the straight-line estimate, even with `RoutingFallbackProvider` left at `estimate`.

### Hosted Valhalla

A hosted Valhalla service works like your own server. For example, for [SimpleRouting](https://www.simplerouting.io), which covers North America and Europe, with Mapbox answering everywhere else:

```
RESGRID__MappingConfig__RoutingProvider=valhalla
RESGRID__MappingConfig__ValhallaUrl=https://api.simplerouting.io/valhalla
RESGRID__MappingConfig__ValhallaApiKey=<your SimpleRouting key>
RESGRID__MappingConfig__ValhallaAuthScheme=bearer
RESGRID__MappingConfig__ValhallaCoverage=-170,14,-50,84;-32,27,45,82
RESGRID__MappingConfig__RoutingFallbackProvider=mapbox
RESGRID__MappingConfig__MapboxRoutingAccessToken=<server-side Mapbox token, or leave empty to use the web map token>
```

Hosted services count requests against a daily quota and a requests-per-second limit. Over either one the service answers with HTTP 429, and Valhalla is skipped for a minute while the fallback answers.

### Routing usage

Every call Resgrid makes to a routing provider is counted per day in Redis (kept 400 days): calls that reached the provider and how they ended, requests answered without calling it, and the origin-destination pairs of drive-time lookups. The console prints the counts, this month's projection, each provider's busiest day (what a daily quota has to cover), and the Mapbox bill the numbers imply at list prices:

```bash
dotnet Resgrid.Console.dll --RoutingUsage --Days=31
```

Calls made with departments' own accounts are counted separately (marked `*`) and left out of the Mapbox bill and the busiest-day figures, since the departments pay for them. Counting needs the cache (`SystemBehaviorConfig.CacheEnabled`).

## Geocoding

| Setting | Default | Description |
|---|---|---|
| `GeocodingProviders` | `google,locationiq,bing` | Ordered chain, comma separated: any of `google`, `mapbox`, `nominatim`, `locationiq`, `bing`. Each is tried in turn |
| `NominatimUrl`, `NominatimUserAgentEmail` | public server | Your Nominatim server, and the contact address its usage policy asks for. Production installations should run their own |
| `MapboxGeocodingAccessToken` | | Mapbox Geocoding (v6) |
| `LocationIQApiKey`, `BingMapsApiKey` | | LocationIQ; Bing (Microsoft retired Basic keys in 2025, only enterprise keys still answer) |

Plus Codes are decoded on the server without any provider. Station and department-centre locations are cached for 30 days, so geocoding is not repeated for every map.

## Live traffic

| Setting | Default | Description |
|---|---|---|
| `TrafficProvider` | `none` | `mapbox` shows live traffic on MapLibre maps |
| `MapboxTrafficAccessToken` | | Public (`pk.`) token for the traffic tiles. A self-hosted base map can show Mapbox traffic with only this token |
| `TrafficRefreshSeconds` | `300` | How often maps reload traffic (Mapbox updates it about every 8 minutes) |

## Offline map packs

The worker builds offline packs for the apps in the background; the API serves them. Both need the same pack storage.

| Setting | Default | Description |
|---|---|---|
| `OfflineMapsEnabled` | `true` | Installation-wide switch (each department also needs the `Maps.Offline` flag) |
| `OfflinePackStorage` | | `file` or `s3`; empty turns offline packs off |
| `OfflinePackStoragePath` | | Directory for `file`; it must be shared by the API and the worker |
| `OfflinePackS3Endpoint`, `AccessKey`, `SecretKey`, `Bucket`, `Region`, `UseSsl`, `Prefix` | bucket `resgrid-offline-maps` | Any S3-compatible store (S3, MinIO, RustFS). A prefix keeps several installations apart in one bucket |
| `OfflineBasemapArchiveUrl`, `OfflineBasemapVersion` | | The PMTiles archive base map packs are cut from: an `https` URL that honours Range requests, or a local path (a regional extract). Never point it at the public Protomaps build. Change the version when the archive changes, and packs are rebuilt. Empty: no base map packs (department data still downloads) |
| `OfflineBasemapMaxZoom` | `15` | Highest zoom in base map packs |
| `ResponseAreaMaxBytes` | 500 MB | Largest base map download a department's [response area](../web-app/department-settings#offline-maps) may produce (ceiling 1 GB) |
| `ResponseAreaFallbackRadiusKm` | `40` | The circle used when a department has not drawn an area |
| `OfflinePackMaxBytes` | 2 GB | Cap per pack; the builder lowers the zoom until a pack fits |
| `AmbientCacheMaxBytes` | 256 MB | The tile cache the apps keep for maps viewed online |
| `OfflineStyleUrlDay`, `OfflineStyleUrlNight`, `OfflineGlyphsArchiveUrl`, `OfflineStyleVersion` | | The styles and fonts the apps use offline (Protomaps styles with `{basemap}`, `{glyphs}` and `{sprite}` placeholders); copied into pack storage |

## Self-hosting checklist

1. Base map: run a tile server (the setup kit's `maps` profile serves tiles from an OpenStreetMap extract, see [Optional services](installation#optional-services)) or a style server such as TileServer GL or Protomaps, set `TileProvider=selfhosted`, and point `SelfHostedRasterTileUrl` (and, with a style server, `SelfHostedStyleUrlDay`/`Night`) at it.
2. Routing: run Valhalla (recommended: vehicle limits and navigation) or OSRM, and set `RoutingProvider` and its URL.
3. Geocoding: run Nominatim and put `nominatim` first in `GeocodingProviders`.
4. Turn on `Maps.MapLibreWeb` for your department and check the Mapping page, a New Call map and Department Settings → Mapping (the provider summary at the top of Map Style shows what the server uses).
5. Offline packs: set pack storage and a base map archive, then turn on `Maps.Offline`.
