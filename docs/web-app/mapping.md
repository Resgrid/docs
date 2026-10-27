---
sidebar_position: 13
title: Mapping
---

# Mapping

The **Mapping** page is the live operational map: every unit and person with a recent location, active calls, stations, hydrants, points of interest and your own map layers. Use it to see who is where, route a unit to a call, and keep reference layers (districts, water sources, staging areas) at hand.

**Left menu → Mapping.** Layers and points of interest are managed from the buttons on the map page; map behaviour (how long a location stays on the map) is under **Department Settings → Mapping**. **Map Icon Legend** explains every pin and its colors ([below](#map-icon-legend)).

![Mapping](/img/web-app/mapping/index.png)

<AcademyVideo id="07-mapping" />

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
| **Custom Maps** | `ShowCustomMaps` | Uploaded floor plans, schematics, and event maps with named zones |

:::note Permission Control
Personnel location visibility is controlled by the `CanSeePersonnelLocations` permission. This is configurable per department in the Security settings.
:::

### Icons by status and priority

Call, unit and personnel pins change with what they are doing, so the map can be read at a glance:

![Call pins in the colors of their priorities, with labels hidden](/img/web-app/mapping/status-pins.png)

- a **call** pin takes the color of its **priority**;
- a **unit** pin takes the color of its **status**;
- a **member's** pin takes the color of their **status**. A member *On Unit* takes the color of their unit's status. Staffing levels never change a pin.

The color comes from the *meaning* of the status or priority, not its name, so built-in and [custom statuses](custom-statuses) and your own call priorities all land on the same colors:

| Color | Statuses with these meanings |
|---|---|
| Green — *Available* | Available, Cleared, On Patrol, Completed, In Quarters |
| Amber — *Dispatched* | Dispatched |
| Red — *Responding* | Responding, En Route |
| Blue — *On scene* | On Scene, Made Contact, Investigating, At Patient, Searching |
| Purple — *Transporting* | Transporting, Delivering, Loading, At Hospital |
| Teal — *Returning* | Returning |
| Brown — *Staging and standby* | Staging, Standby |
| Slate — *On break* | On Break |
| Charcoal — *Unavailable* | Unavailable, Maintenance, Not Responding |
| Gray — *No meaning or no status* | A status with no meaning whose name suggests none; a unit or member that has set no status |

![Status colors on the Map Icon Legend](/img/web-app/mapping/status-colors.png)

Call priorities: **Low** green, **Medium** yellow, **High** orange, **Emergency** red. A status or priority with no meaning set takes the color its name suggests (a priority named *Emergency*, a status named *Out of Service*), the same suggestion the settings pages make; one whose name suggests nothing shows a **gray** pin, as does a unit or member that has set no status. Set meanings on the [Custom Statuses](custom-statuses) and Call Priorities pages to be sure. The guess only colors the pin: everything else still treats the option as having no meaning.

The built-in pin keeps its picture (the fire, the ambulance, the person) and only its color changes. A type or role with a [custom icon](#custom-map-icons) shows that icon with a small colored badge in its lower right corner, unless an icon was uploaded for that exact status or priority ([status and priority icons](#status-and-priority-icons)). The map redraws a pin within a few seconds of a status or call change.

## Map icon legend

**Mapping → Map Icon Legend** shows every icon the map can show for your department, built from your own call types, priorities, unit types, status sets and roles:

![Map Icon Legend](/img/web-app/mapping/map-icon-legend.png)

| Section | Shows |
|---|---|
| **How an icon is picked** | The order: an icon uploaded for the exact priority or status, else the type's or role's own icon with a badge, else the built-in pin in the color of the priority or status. |
| **Status colors / Priority colors** | Each color, the meanings it covers, sample unit, person and call pins, and your own unit statuses, personnel statuses and priorities that show in that color. A status or priority listed under gray has no meaning set. |
| **Calls** | One row per call type (and calls with no type), one column per priority. |
| **Units** | One row per unit type (and units with no type) with every status of the type's status set, or the built-in unit statuses. |
| **Personnel** | Members with no role icon, then every role with an icon, in role order, across the department's personnel statuses. |
| **Stations, hydrants and points of interest** | Icons that do not change with status. |

Hover over an icon to see whether it is an icon uploaded for that status or priority, a type icon with a badge, or a built-in pin. Department administrators get an **Edit icons** button on each call type, unit type and role row, which opens its [status or priority icons](#status-and-priority-icons) page. The legend is open to every member who can open the map.

Nothing on the legend is fixed: the names are your own call types, priorities, unit types, status sets, statuses and roles, and the icons are what the map draws for them, including the built-in icon a type picked and every uploaded icon. Rename a priority, add a custom status, give a unit type another built-in icon or upload an icon, and the legend shows it the next time it is opened.

The built-in personnel status **On Unit** is not listed under any color: a member On Unit takes the color of their unit's status, and shows the gray pin only when there is no unit status to follow. Hover its icon on the legend to see this.

The Responder, Unit and IC apps show the same legend from the **legend** button on their maps ([in the apps](#in-the-apps)); app developers can read it from the [Map Icons API](../api/map-icons).

## Map Layers

Map layers provide custom GeoJSON overlays on the map.

![Map layers](/img/web-app/mapping/layers.png)

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

![Points of interest](/img/web-app/mapping/pois.png)

Create categories for points of interest with custom markers and images. A POI type can also have its own [custom icon](#custom-map-icons), set when you add the type or on its **View** page (Information tab); it replaces the marker on the map and in the apps.

![POI type custom icon](/img/web-app/mapping/poi-type-icon.png)

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

## Custom Maps

Custom Maps allow departments to upload building floor plans, venue layouts, schematics, and satellite imagery, draw named polygon zones on those images, and use zone names as call locations. See the dedicated [Custom Maps](custom-maps) documentation for full details.

On the main map view, use the **Custom Maps** layer control (alongside Layers, POIs, and Geofences) to toggle custom map overlays. When one or more custom maps are enabled, a **Building Selector** sidebar appears for switching between maps and floors.

## Custom map icons

Departments can replace the built-in map icons with their own images, so an ambulance, a MUG, a PIT, a first responder car and a bicycle team are told apart at a glance instead of by reading names. Icons can be set for:

| What | Where you set it | Where the icon shows |
|---|---|---|
| **Unit types** | **Department → Types → Unit Types**, new or edit | Beside units of the type in the Units list, the dispatch dashboard unit grid, New Call and View Call, the Types table, and on unit pins on the map; in the apps' unit lists and pickers and on their map pins |
| **Call types** | **Department → Types → Call Types**, new or edit | Beside the call type in the active and archived call grids and the Types table, and on call pins on the map; in the apps' call cards and call screens and on their map pins |
| **POI types** | **Mapping → Points of Interest**: on **Add POI Type**, or the type's **View** page (Information tab) | On every point of interest of the type on the map, and in the apps' POI lists and map pins |
| **Personnel roles** | **Personnel → Manage Roles**: **Add Role** or **Edit** | On the map pin of each member, by [role order](#personnel-role-icons-and-role-order); beside the role on the Roles page; on personnel cards in the apps |

A type or role without its own icon keeps what it showed before: the built-in map icon chosen on the type, the POI marker, or the standard person pin.

### Choosing an image

The picker lists these rules next to the file input:

| Rule | Detail |
|---|---|
| Format | PNG, JPEG, GIF or WebP. SVG is not accepted, and an animated GIF uses its first frame |
| File size | Up to 1 MB |
| Dimensions | At least 16 px on the longest edge and at most 4096 px on each edge. A square image of 128 × 128 px or larger looks sharpest |
| Background | Transparent. An image with an opaque background shows as a filled square on the map |
| Design | A bold, simple shape. The map draws the icon at 32 × 32 px and lists at 20 × 20 px, so fine detail and text will not be readable |
| What is stored | Every icon is resized to 128 × 128 px and saved as PNG, with the file's metadata removed. An image that is not square is centered on a transparent square; nothing is cropped |

### Preview and checks

As soon as you choose a file, the page checks it and shows a preview of the stored image on a light map and a dark map (with the name label the map shows under a pin), in a list row, and as the saved 128 × 128 image. The previews use the name typed on the form.

![Custom icon preview](/img/web-app/types/custom-icon-preview.png)

Some files are accepted with a warning, so you can decide whether to use a better image:

- the image is smaller than 128 × 128 px and will be enlarged (it may look blurry);
- the image is not square and will be centered on a transparent square;
- the image has no transparent background and will show as a filled square.

![Warnings for a small, wide, opaque image](/img/web-app/types/custom-icon-warnings.png)

A file that cannot be used is refused before anything is uploaded, the file input is cleared and the reason is shown under it. The server repeats the same checks when the form is saved, so a file that gets past the browser is still refused with the same message.

![A refused file](/img/web-app/types/custom-icon-rejected.png)

| Message | Cause |
|---|---|
| Only PNG, JPEG, GIF and WebP images can be used as icons. | Any other file type, including SVG, BMP, TIFF and HEIC |
| The icon file must be 1 MB or smaller. | The file is over 1 MB (the size of the chosen file is shown) |
| The icon must be at least 16 px on its longest edge. | The image is too small (its size is shown) |
| The icon must be 4096 px or smaller on each edge. | The image is too large (its size is shown) |
| The file could not be read as a PNG, JPEG, GIF or WebP image. | A damaged file, or one whose contents do not match its name |

The icon is saved together with the rest of the form. Before you save, the preview says *Showing the new icon*; after saving, the edit page shows the current icon and a **Remove the custom icon** box. Ticking it and saving removes the icon, and the type or role goes back to its default. Choosing a new file replaces the old icon.

### Personnel role icons and role order

A person can hold several roles, so their map pin uses the icon of **the first role they hold, in the department's role order, that has an icon**. People whose roles have no icon keep the standard person pin.

Set the order on **Personnel → Manage Roles**: drag the rows, or use the up and down arrows, then click **Save order**. Only department administrators see the order controls. Until a department saves an order, roles are listed by name and that is the order used. A role added after the order was saved goes to the end.

![Roles with icons and order controls](/img/web-app/personnel/roles.png)

For example, with the order *Officer*, *Paramedic*, *Firefighter*, where Officer and Paramedic have icons:

| Member's roles | Map pin |
|---|---|
| Officer, Firefighter | Officer icon |
| Paramedic, Firefighter | Paramedic icon |
| Officer, Paramedic | Officer icon (Officer is first) |
| Firefighter | Standard person pin (Firefighter has no icon) |

See [Personnel Roles](../configuration/personnel-roles#role-order-and-map-icons).

### Status and priority icons

A call type can also have an icon for each **priority**, and a unit type or role an icon for each **status**. While that priority or status holds, the map shows it instead of the type's own icon. Use them when a color alone is not enough, for example an ambulance drawn with its lights on while transporting.

![The Status map icons button on Edit Unit Type](/img/web-app/types/status-map-icons-link.png)

Open **Department → Types**, edit a unit type or call type and choose **Status map icons** or **Priority map icons**; for a role, **Personnel → Manage Roles → Edit → Status map icons**. The **Edit icons** buttons on the [Map Icon Legend](#map-icon-legend) open the same page.

The page lists the type's statuses (the options of the unit type's status set, the built-in unit statuses, or the department's personnel statuses for a role) or the department's priorities, with:

| Column | Shows |
|---|---|
| **Status** / **Priority** | The option and its own color. |
| **Map color** | The color its meaning gives, or *No meaning or no status* (gray). |
| **Default** | What shows without an upload: the type's own icon with the badge of that color, or the built-in pin in that color. |
| **Uploaded icon** | The icon uploaded for it, if any. |

![Status map icons of a unit type, with an icon uploaded for Enroute](/img/web-app/mapping/status-icons.png)

Choose a file and press **Upload** on a row; **Remove** returns that row to the default. The same [image rules](#choosing-an-image) apply. Removing or replacing the type's own icon keeps its status and priority icons; deleting the type removes them all. An icon is tied to the option it was uploaded for: when a unit type moves to another status set, upload icons for the new set's options.

Unit and call type icons need the permission to edit department types, as on the Types pages; role icons need the permission to edit roles.

### In the apps

The Unit, Responder, IC, Dispatch and BigBoard apps draw the same pins as the web map: uploaded icons, status and priority icons, badges, and the built-in pins in the color of the status or priority, on phones and tablets, in the browser and in the desktop (Electron) apps, at the same 32 × 32 px as the web map. If an icon cannot be loaded, the pin falls back to its built-in image. Older app versions keep showing the plain built-in pins and any uploaded status or priority icons.

The Responder, Unit and IC apps also have the [map icon legend](#map-icon-legend). Tap the round **legend** button (an *i*) on the map to open it as a sheet over the map:

| App | Where the legend button is |
|---|---|
| Responder | Top right of the Map tab |
| Unit | Bottom right of the main map, above the recenter button |
| IC | Bottom right of the main map, above the layers button, and bottom right of an incident's command map |

The sheet has the same sections as the web page (status and priority colors with your own statuses and priorities, calls, units, personnel, stations and points of interest), draws every icon exactly as that app's map does, and loads fresh each time it is opened, so it follows any change to your types, statuses, priorities or icons. The Calls, Units and Personnel headings use your [terminology](department-settings#terminology) when you have renamed those modules. A few things follow what the app's map shows:

- In Responder, members who can't see personal information don't see personnel pins on the map, so their legend leaves out the Personnel section too.
- Hydrants are listed only while the map is showing hydrants. The apps draw hydrants with a generic pin, on the map and in the legend.
- On IC's command map the legend is the whole department's, although that map shows only the incident's resources. Unit and call type icons also show in the apps' unit lists, pickers and call cards, and the Responder, IC and Dispatch personnel lists show each person's role icon. In Dispatch, role icons also show beside each role and person in the dispatch recipient picker and on the role chips of a person's screen. Icons are served from the Resgrid API with a long cache lifetime, so after the first load they show even on a slow connection.

### Technical reference for custom icons

| Item | Value |
|---|---|
| Storage | `TypeIcons` (M0285): one row per type or role, `TypeKind` 1 unit type, 2 call type, 3 POI type, 4 personnel role (M0286); the PNG bytes, size and checksum. `IconKey` (an unguessable 32-character key) is copied to `UnitTypes`, `CallTypes`, `POITypes` and `PersonnelRoles`. No foreign keys: type and role deletes and the department purge remove the rows |
| Status and priority icons | `TypeIcons.Variant` (M0289): null for the type's own icon, `p{priority}` on a call type, `s{built-in status}` or `o{custom status option id}` on a unit type or role. Pages `GET /User/Mapping/StatusIcons?kind=&typeId=`, `POST UploadStatusIcon` / `RemoveStatusIcon`; the department's slots are cached and cleared on every change |
| Icon choice | `MapIconResolver` (shared by the v4 map, the legend and the icon pages): the upload for the exact priority or status, else the own icon with a badge, else the built-in pin in the style of the meaning (`MapIconStyles`) |
| Styled pins and badges | Drawn by the server from the built-in artwork: web `GET /TypeIcons/Pins/{base}-{style}`, API `GET /api/v4/TypeIcons/Pins/{base}-{style}` (32 × 37 PNG); a badge is `?s={style}` on an icon URL. Both carry `v=` (the palette version) and are cached for a year |
| Role order | `PersonnelRoles.SortOrder` (M0286, default 0); ties order by name. Saved by `POST /User/Personnel/SetRoleOrder` (department admins, `Role_Update`) through `IPersonnelRolesService.SetRoleOrderAsync`; ids from another department are ignored |
| Icon URLs | Web `GET /TypeIcons/{key}`, API `GET /api/v4/TypeIcons/{key}`: anonymous, `Cache-Control: public, max-age=31536000, immutable`, `ETag`. Every upload gets a new key, so a changed icon gets a new URL |
| Upload rules | `TypeIconRenditions`: PNG, JPEG, GIF (first frame) or WebP; ≤ 1 MB (checked before the file is read); 16 to 4096 px (from the header, before decoding); resized to 128 × 128 on a transparent canvas and re-encoded as PNG without metadata. Rejections are `TypeIconRejections` values with localized messages |
| Pages | Unit and call type new/edit (`TypesController`), POI type add and `SetPOITypeIcon` (`MappingController`), role add/edit and Roles (`PersonnelController`); shared partial `_TypeIconPicker`, scripts `resgrid.types.iconpicker.js` and `resgrid.personnel.roleorder.js` |
| v4 API | `IconUrl` on map markers (`GetMapDataAndMarkers` and `GetUnitMapData`: calls 0, units 1, personnel 3, POIs 4), plus `PinIconUrl` (the styled built-in pin) and `IconStyle` (`available` … `unavailable`, `low` … `emergency`, `unknown`) on call, unit and personnel markers; `ImagePath` stays the plain built-in icon for older apps; `IconUrl` also on call types, POI types, POIs and POI layers; `TypeIconUrl` / `TypeMapIcon` on units, unit statuses, calls, call dispatches and recipients (unit rows; role rows carry the role's icon as `TypeIconUrl`); `RoleIconUrl` on personnel; `IconUrl` and `SortOrder` on roles. `GET /api/v4/Mapping/GetMapIconLegend` returns the legend for the apps: status and priority styles (color, pin URLs, the department's statuses and priorities in each), call, unit and personnel rows (the "none" row first, `Id` null) with each priority's or status's `IconUrl` / `PinIconUrl` / `ImagePath` / `IconStyle` (and `FollowsUnitStatus` on the built-in On Unit status), and the POI types. The web page and the API are built from the same `MapIconLegendBuilder`. See the [Map Icons API](../api/map-icons) |
| Admin Assist | Capabilities *Custom map icons* and *Map icon legend* (mapping area), plus the unit types, call types, POIs and personnel roles entries |

## Map visualizations

**Mapping → Visualizations** turns your call history, responses and unit movement into map overlays: call heat maps ("where are our hot zones?"), counts per area, response times by area, calls far from a station, where units and members went, and recorded paths. Start from the built-in library, adjust it, and save your own versions.

<!-- Screenshot pending: /img/web-app/mapping/visualizations.png (library + call hot zones heat map) and visualizations-customize.png (Customize tab). Needs a dev database migrated to M0288. -->

**Where to find it:** the **Visualizations** button at the top of the Mapping page, or search "heat map" in the omnibar. Anyone who can view calls can open it.

### The library

The library lists ready-made visualizations. Those that match your [operating profile](help-setup#operating-profile) (its sectors, and a volunteer or combination workforce) are shown first; every visualization stays available to every department, and **Show all** lists every one by category.

| Category | Visualizations |
|---|---|
| **Call demand** | Call hot zones (heat map, 12 months) · Busiest areas (hexagon grid with counts) · Calls by type · Main call type by area · Calls by priority · Call outcomes · Time of day · Weekday vs weekend · Seasonal patterns |
| **Response performance** | Response time by area (90th percentile) · Response time bands · Time to first responding by area · Time committed by area |
| **Coverage** | Calls outside station coverage (distance bands and 1.5 / 2.5 / 5 mile rings) · Workload by station area · Where responders come from |
| **Units and personnel** | Where units go · Demand by unit type · Personnel response footprint |
| **Community risk** | Repeat locations (3+ calls at the same place) · False alarm hot spots |
| **Tracking** | Unit movement (last 24 hours) · Patrol coverage · Search coverage · Incident footprint (one call: paths, status positions and where responders came from) |

Click a dot to see the call and open it, or **Show this call's footprint** to switch to the Incident footprint for that call.

### Customizing

The **Customize** tab changes what the map shows. The map updates as you edit.

- **When:** a rolling window (last 24 hours to last 5 years) or fixed dates, plus days of the week and hours of the day (in your department's time zone).
- **Which calls:** call types, priorities, outcomes, home station or group, units involved, and a minimum number of calls at the same location. Or pick **one call** to show only that call.
- **Layers** (up to 6, drawn in order): each layer has its **data** (calls, unit responses, personnel responses, responder origins, unit status positions, unit paths, personnel paths), how to **show** it (heat map, dots, hexagon grid, paths), what to **color by** (call type, priority, outcome, home station, time of day, hour, day, weekday or weekend, month, year, unit, unit type, unit's station, person, status, response time band, distance band, repeat count) and a **measure** (count, minutes to first on scene, minutes to first responding, minutes until closed, units dispatched, personnel responded, distance to station, calls at the location). A hexagon grid combines its cells' values with a count, total, average, median, 90th percentile or maximum; colored by a category, each cell shows its most common category. Colors, opacity, heat radius and intensity, cell size and dot size are set per layer.
- **Stations and distances:** show stations, draw coverage rings, choose kilometers or miles, and set the distance and response time bands.

Below the map: calls in view, how many have a location, median and 90th-percentile time to on scene (when a layer uses response times), a weekday-by-hour chart and the most common call types. **Download CSV** exports the visible layers' points and paths.

### Saving and sharing

**Save as new** keeps the current visualization in **My visualizations**, visible only to you. Department admins can tick **Share with the whole department** so it appears under **Shared with the department** for everyone who can view calls; only department admins can change or delete a shared visualization. **Copy link** copies a link that opens the saved visualization (or library entry) directly.

Only the settings are saved, never the data. Each person who opens a visualization sees it with their own permissions: calls outside their dispatch scope, and members or units whose locations they may not see, are left out (the page says so).

### What the numbers mean

- **Response time** is from the call being logged to the first unit setting an on-scene status (custom statuses count through their base type). **First responding** is the first responding or en route status. Calls with no such status are left out of the times. Times over 24 hours are treated as bad data.
- **Distance to station** is straight-line distance to the nearest station with a location (a unit response uses the unit's own station). Rings are straight lines too, not drive times.
- **Repeat locations** group calls within about 11 m of each other.
- **Home station** follows the call summary rules: the station geofence containing the call, otherwise the station that most of the dispatched units and members belong to.

### Limits

| Limit | Value |
|---|---|
| Longest date range | About 5 years |
| Calls read for one view | 100,000 (the newest; the page says when more matched) |
| Points per layer | 75,000 |
| Paths | At most 7 days; for one call, from 15 minutes before it was logged to 15 minutes after it closed |
| Status positions and responder origins | At most the last 12 months of the range |
| Saved visualizations | 250 per department |

### Technical reference for visualizations

| Item | Value |
|---|---|
| Page | `MapVisualizationsController` (`/User/MapVisualizations`, `Call_View`); query `?id=`, `?template=`, `?callId=`. React element `rg-map-visualizer` (Leaflet, canvas heat and dot layers, client-side hexagon binning) |
| Endpoints | `GET Bootstrap`, `POST Data` (runs a definition), `POST Save`, `POST Delete`, `GET CallDetail`, `GET SearchCalls`; writes need the anti-forgery header |
| Storage | `MapVisualizations` (M0288): name, description, `DefinitionJson`, `TemplateKey`, `IsShared`, creator and updater. No foreign keys; removed by the department purge |
| Definition | `MapVisualizationDefinition` (filters, layers, options) with stable string keys in `MapVisualizationKeys`; `MapVisualizationDefinitionValidator` clamps and repairs every definition on read and save |
| Library | `MapVisualizationLibrary` (25 templates; recommended by operating profile archetype and workforce, never by organization type) |
| Data | `IMapVisualizationService.RunAsync`: thin call read, `ICallGroupAssignmentService` for home stations, `ICallStatusAttributionService` and `CallUnitTimesCalculator` for unit and personnel times (in slices of at most a year and 2,500 calls), unit status history, action logs, and unit and personnel location history (document database; indexes `ix_unitlocations_department_timestamp`, `ix_personnellocations_department_timestamp`) |
| Visibility | `IDispatchScopeService` for calls; `CanUserView{Unit,Person}ViaMatrixAsync` and the location variants for units, members and their locations |
| Admin Assist | Capability *Map visualizations* (mapping area) |

## Setup examples

| Department type | How to set it up |
|---|---|
| **Fire** | POI types: Hydrants (or use the Records hydrant layer), Knox boxes, Dry hydrants/draft sites, Staging areas; layers: district boundaries (KML from the county GIS), water main map. Visualizations: Call hot zones and Response time by area for standards-of-cover reviews; Calls outside station coverage with 1.5 / 2.5 / 5 mile rings; Weekday vs weekend and Where responders come from for volunteer staffing; share them with the department. |
| **EMS** | POI types: Hospitals (with ED phone numbers in the description), Landing zones, Nursing homes; destinations on calls point at hospital POIs. Custom icons for unit types such as Ambulance, MUG, PIT, First Responder and Bicycle Team, and for roles such as Paramedic and Nurse, with Paramedic ordered above EMT so a paramedic's pin shows the paramedic icon. Visualizations: Response time bands (set the bands to your contract times), Repeat locations for frequent-caller and community paramedicine follow-up, Time committed by area. |
| **SAR** | Layers: trail systems, search segments (GeoJSON from CalTopo/SARTopo), cell coverage; POI types: trailheads, huts, helispots. Location TTL 240+ minutes. Visualizations: Search coverage over the mission window and the Incident footprint of the search call. |
| **Emergency management** | Layers: flood zones, evacuation zones, shelters; POI types: shelters, PODs, fuel sites, sandbag stations. Visualizations: Seasonal patterns, and Call hot zones filtered to weather call types. |
| **Security** | POI types: Client sites, Gates, Cameras; personnel location TTL 15 minutes so stale markers drop. Visualizations: Patrol coverage (7-day unit position heat map) and Repeat locations for problem sites. |
| **Delivery / transit** | Depots and customer sites as POIs; routes drawn with the Routes module; vehicle trackers for live positions. |

## Technical reference

`MappingController`; routes `/User/Mapping/{Index,Layers,NewLayer,EditLayer,POIs,AddPOIType,AddPOI,EditPOI,ImportPOIs,LiveRouting,StationRouting}`; data via `api/v4/Mapping/GetMapDataAndMarkers` and `GetMayLayers` (web component `rg-map`). Visualizations: see [Map visualizations](#map-visualizations). Permissions `CanSeePersonnelLocations`, `CanSeeUnitLocations` (group-lockable). Map provider (Mapbox / Leaflet-OSM / Google) is an installation setting; the department picks its Mapbox base map style (day and night) under [Mapping & Big Board settings](department-settings#mapping--big-board-settings).

### Data Endpoints
| Endpoint | Purpose |
|----------|---------|
| `GetMapData` | All map markers and geofences based on flag settings |
| `GetTypesMapData` | Map data for a specific POI type |
| `GetPoisForType` | POI list for a specific type |
| `GetCustomMaps` | Active custom maps with floor metadata for the overlay control |

### Interactions with Other Modules
| Module | Interaction |
|--------|-------------|
| **Calls** | Call locations displayed as markers; zone names used as call locations from custom maps |
| **Groups** | Station locations and geofences displayed |
| **Units** | Unit positions shown (from GPS tracking); zone-entry notifications triggered |
| **Personnel** | Personnel locations shown (permission-controlled); plotted on indoor floors when positioning data available |
| **Department** | Map center, zoom, and refresh settings |
| **Security** | Personnel location visibility permission Visualizations: Patrol coverage (7-day unit position heat map) and Repeat locations for problem sites. |
| **Custom Maps** | Uploaded floor plans and zone overlays; see [Custom Maps](custom-maps) |
