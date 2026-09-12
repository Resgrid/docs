---
sidebar_position: 15
title: Indoor Maps
---

# Indoor Maps

Indoor maps — floor plans of a hospital, school, factory, stadium or shopping centre with named **zones** (rooms, wings, corridors, stairwells, hazard zones, assembly points, staging areas, access points, utility rooms, search grids) — are one **type of custom map**. They are created and edited on the [Custom Maps](custom-maps) page with the map type set to **Indoor**:

- each **floor** is a *floor-plan layer* (an image; large images are tiled automatically),
- each **zone** is a *region* drawn in the **Region Editor** with a type, colour, description and a *searchable in dispatch* flag,
- zones can carry **pre-plan attachments** and **hazard markers**.

![Custom maps](/img/web-app/custom-maps/index.png)

Dispatchers pick an **indoor location** (map → floor → zone) on the New Call and Update Call pages; the apps show the floor plan with the zone highlighted, and search teams can mark *Search grid* zones during large-structure searches. Occupancies in [Records](records/occupancies) link to the building's map for pre-plan walk-throughs.

The older `/User/IndoorMaps/*` links still work — they redirect to the equivalent Custom Maps page.

Read the full guide: [Custom Maps → Managing floors, Managing zones, Using custom maps in dispatch](custom-maps).

## Setup examples

| Department | Use |
|---|---|
| **Fire / EMS** | Hospitals, care homes, schools and high-rises in your first-due area: mark FDC, standpipe, utility rooms and hazard zones. |
| **Campus / healthcare security** | Every building; access points and assembly points searchable in dispatch. |
| **Industrial** | Process areas as hazard zones, muster points as assembly points. |
| **Event / venue** | Concourses, gates, medical rooms and staging areas on an *Event* map. |

## Technical reference

| Item | Value |
|---|---|
| Controllers | `CustomMapsController` (`Index?type=0`, `New?type=0`, `Edit`, `Layers`, `RegionEditor`, `Import`, `GetLayerImage`, `GetLayerTile`); `IndoorMapsController` redirects to it |
| Model | `CustomMap` (`CustomMapType.Indoor = 0`), `CustomMapLayer` (floor plan / overlay / data / infrastructure), `CustomMapRegion` |
| Call fields | `Call.IndoorMapFloorId`, `Call.IndoorMapZoneId` |
| API | `api/v4/CustomMaps/*` for the apps |
