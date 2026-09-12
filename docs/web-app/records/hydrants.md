---
sidebar_position: 8
title: Hydrants & Water Sources
---

# Hydrants & Water Sources

Track every hydrant and water source in your district: location, owner, main size, flow tests with the **NFPA 291 flow class**, maintenance history and in/out-of-service status — shown on a colour-coded map and available to the apps and dispatch.

Feature flag: `Records.Prevention.Hydrants`. Menu: **Records → Hydrants**.

![Hydrants](/img/web-app/prevention/hydrants.png)

## The hydrant list and map

The header shows *N hydrants, N out of service, N due for a flow test*. The **Map** colours each hydrant by flow class (black = out of service). Filter, search by number or address, or open one for details.

## Adding hydrants

**New hydrant** or **Import hydrants** (CSV with a header row: `number, latitude, longitude, type, address, main_size, flow_gpm, owner` — existing numbers are updated).

![New hydrant](/img/web-app/prevention/hydrant-new.png)

| Field | Notes |
|---|---|
| **Hydrant #** | Your identifier; unique per department. |
| **Type** | Dry barrel, wet barrel, standpipe, draft site, tank, cistern … |
| **Address / Coordinates / Point of interest** | Position; can be linked to a map POI. |
| **Owner / Owner name** | Municipal, private, utility. |
| **Main size (in)** | Water main diameter. |
| **Flow (gpm), Static / Residual (psi)** | The last known values. Recording a flow test updates them automatically. |

## Flow tests and maintenance

On the details page:

- **Record flow test** — enter static pressure, residual pressure, pitot pressure and outlet diameter. Flow is computed as `29.83 × c × d² × √pitot`, rounded to 10 gpm, and the NFPA 291 class (AA / A / B / C) is set from it.
- **Record maintenance** — date, kind (flush, paint, repair, replace cap …) and note.
- **Take out of service / Return to service** — with a reason; out-of-service hydrants are black on every map and flagged to crews.

![Hydrant details](/img/web-app/prevention/hydrant-details.png)

Analytics reports hydrants **tested in the last 12 months**, **in service** and **by flow class**.

## Setup examples

| Department | Notes |
|---|---|
| **Municipal fire** | Import from the water utility's GIS export; schedule annual flow tests by district; use *Owner* to distinguish private hydrants. |
| **Rural / wildland** | Add draft sites, cisterns and tanks as water sources with their capacity in the notes; flow tests optional. |
| **Industrial site** | Plant hydrants and monitors keyed to the site grid; maintenance log for the fire-water system. |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/RecordHydrants/{Index,Details,Edit}` |
| Model | `RmsHydrant`, `RmsHydrantFlowTest`, `RmsHydrantMaintenance` |
| Flag / permission | `Records.Prevention.Hydrants`; `RecordsPreventionAdmin` to edit |
| Apps | Hydrant layer is available to the Unit and Responder maps and to the dispatch call map. |
