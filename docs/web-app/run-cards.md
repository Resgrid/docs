---
sidebar_position: 5
title: Run Cards & Automatic Dispatch
---

# Run Cards & Automatic Dispatch

A **run card** is a pre-planned response package: *"for a high-priority structure fire in District 1 send two engines, a truck, a rescue and a chief; on the second alarm add a tender and a brush unit."* Resgrid matches every new call against your run cards by **priority and call type**, works out which specific units and people should go — by **station response area** or by **closest available unit** — and either dispatches them automatically or pre-populates the New Call page for the dispatcher to confirm. Optional **move-up / backfill** recommendations keep station coverage intact.

Feature flag: `Dispatch.RunCards`. Menu: **Department dropdown → Dispatch Settings → Run Cards**, or `/User/RunCards`.

![Run cards](/img/web-app/run-cards/index.png)

<AcademyVideo id="05-calls" />

## Department-wide dispatch settings

**Department → Dispatch Settings → Run Cards & Automatic Dispatch** sets the defaults every card inherits:

| Setting | Options / meaning |
|---|---|
| **Automatic resource selection mode** | *Manual only* (cards define requirements but nothing is selected automatically), *Station based* (units from the station whose response area contains the call, cascading to the next nearest station on shortfall), *Closest unit* (nearest available resources by GPS / station location). |
| **Automatically dispatch recommended resources** | On: matched cards dispatch immediately when the call is created (including calls from email/SMS import and the API). Off: recommendations pre-populate the New Call page for dispatcher review. |
| **Minimum unit staffing to dispatch** | Units staffed below this level (Partially staffed, Degraded …) are not selected even if their status matches. Units without defined roles always pass. |
| **Enable move-up / backfill recommendations** | After selection, check station coverage minimums and recommend relocating resources to depleted stations. |
| **Closest unit response tuning** | For closest-unit mode: what "closest" means (**Rank closest units by**: *Fastest response* or *Shortest distance*, see [below](#fastest-response-or-shortest-distance)), maximum age of a GPS position, maximum radius, whether stale positions may still be used, ordering by driving ETA (and how many candidates get a drive-time lookup), and the two **turnout times** — *In-quarters turnout* and *Mobile turnout* (see below). |
| **Station coverage minimums** | Per station: minimum number of each unit type or personnel role that should remain available, a radius for closest-unit mode, enabled flag. |

Station response areas come from the **geofences** you draw on [Groups & Stations](groups-stations).

## How closest-unit mode measures a unit

Closest-unit mode ranks units by **response time**: how long the crew needs to get moving (the *turnout*) plus the travel time to the call. Where a unit is measured from decides which turnout applies:

![Closest unit response tuning with turnout times](/img/web-app/run-cards/closest-unit-tuning.png)

| The unit is… | Measured from | Turnout added |
|---|---|---|
| In a status whose **base type is In Quarters** (see [Custom Statuses](custom-statuses)) | Its **station's location**, whatever its GPS says | **In-quarters turnout** |
| In any other available status, with a GPS position | Its **live GPS position** (subject to the maximum location age) | **Mobile turnout** |
| Without any GPS position | Its **station's location** — it is taken to be at home | **In-quarters turnout** |

- Using the station for an in-quarters unit matters when the GPS comes from a tablet or phone: a device left on a desk, or a crew member's phone that went home, is not where the vehicle is.
- Both turnout times default to **0**, which ranks purely by distance (the behaviour before turnout times existed). Values above 1,800 seconds are capped.
- Travel time is a straight-line estimate unless **Order by driving ETA** is on, in which case the best candidates are re-ranked on turnout plus routed drive time.
- Example: an ambulance at its station 1 km away (2 min turnout + ~2 min travel) is ranked after an ambulance already on the road 1.5 km away (30 s turnout + ~3 min travel).
- A station needs coordinates (or a geofence, or an address that can be geocoded) on [Groups & Stations](groups-stations) for units to be placed there.

### Fastest response or shortest distance

**Rank closest units by** decides what "closest" means, for every closest-unit run card and for the [Nearest Units](dispatch-calls#nearest-units) list on New Call and Update Call:

| Option | Units are ranked by | Drive times |
|---|---|---|
| **Fastest response (turnout + travel time)** (the default) | Turnout plus travel time, as described above. | With **Order by driving ETA** on, the **ETA shortlist size** fastest candidates for each requirement get a routed drive time and are re-ranked on it. They are picked ahead of the units that only have a straight-line estimate. |
| **Shortest distance** | Straight-line distance to the call, whatever the turnout or drive time. Response time only breaks a tie. | With **Order by driving ETA** on, the **ETA shortlist size** nearest candidates for each requirement still get a routed drive time. It is shown with the pick, but never changes the order. |

- In a conditional run card, rows that ask for the *first arriving* unit still go to the fastest unit in either mode, and time conditions (*arrives before*, *available within*) measure the unit the card would pick, on its drive time when it has one.
- Station-based run cards ignore this setting: they fill from the station cascade as before.
- A straight-line estimate can be far too optimistic where the roads don't go straight to the call: a river, a one-way system or a city circulation plan can turn 3 km into a 13-minute drive. If a unit that should win sits just outside the shortlist, raise **ETA shortlist size** so its real drive time is looked up.
- Example: MUG 1 is 13 minutes away by road and MUG 2 is 6 minutes away in a straight line. With a shortlist of 1 only MUG 1's drive time is known, so MUG 1 is picked. With a shortlist of 2 both are looked up and MUG 2 wins if its drive really is shorter.

### When the call has no location

Closest-unit and station-based selection need the call's location. If the call has none, the card's **home station** is used instead and the recommendation says so; without a home station every requirement is reported as a shortfall (*"Call has no usable location"*).

- On the **New Call** page the recommendation refreshes as soon as the call is placed on the map — by **Find Address**, **What3Words**, clicking the map or dragging the pin. Picking the priority and type first is fine.
- When a call is saved with an address but no map pin (from the web, the apps, the API, email or SMS import), Resgrid geocodes the address (or What3Words) before the run card runs.

## Building a run card

**New Run Card** opens an editor with five tabs.

![Run card editor](/img/web-app/run-cards/new.png)

| Tab | What to set |
|---|---|
| **General** | Name, description, **Disabled**, per-card overrides of the department defaults (selection mode, auto-dispatch, minimum staffing) and a **home station** used when a call has no location. |
| **Triggers** | One or more triggers by **call priority**, **call type**, or **priority and type**. A card matches a call when *any* trigger matches; the most specific match wins (priority + type beats type, which beats priority). |
| **Alarm levels** | Level 1, 2, 3 … each with **unit type requirements** (e.g. Engine × 2, Ladder × 1) and **personnel role requirements** (e.g. Chief × 1, Paramedic × 2). Levels are **additive**: escalating to level 2 dispatches level 2's resources on top of what is already assigned. Name levels (*Working fire*) if you like. |
| **Dispatchable statuses** | Which unit statuses, personnel statuses and staffing levels count as *available* for this card. Leave empty to use the standard availability rules. |
| **Test / Simulate** | Pick a priority, type, location and alarm level and see what would be dispatched right now — nothing is actually dispatched. |

## How it plays out on a call

1. A call is created (web, app, email/SMS import, API).
2. The best-matching run card is found. Its alarm-level-1 requirements are filled from available resources using the selection mode.
3. If **auto-dispatch** is on, those resources are dispatched immediately; otherwise the New Call page shows the recommendation for the dispatcher to accept or edit.
4. Escalating the call's **alarm level** (from the call page or the apps) fills the next level's requirements.
5. **Adding resources** to an active call, on the web [Update Call](dispatch-calls) page or in the [Dispatch app](../apps/dispatch#run-cards-and-recommendations), shows what the call's run card still needs at its current alarm level: the units and people already on the call count toward the requirements first (a unit of the required type, a person holding the required role, each counted once), and only what is missing is recommended. Nothing is dispatched until the dispatcher confirms.
6. If **move-up** is on and a station drops below its coverage minimum, a recommendation to relocate a unit appears.
7. The decision is recorded and can be captured as **evidence** on a [Record](records/authoring#evidence).

## Setup examples

| Department | Run cards |
|---|---|
| **Volunteer fire, 2 stations** | *Structure fire* (priority High + type Fire): L1 Engine×2, Tender×1, Chief role×1; L2 adds Engine×1 from the neighbouring station. *Medical*: Rescue×1, EMT role×2. Station-based mode, auto-dispatch off (officer reviews). |
| **Career fire, 5 stations** | Cards per type with closest-unit mode, auto-dispatch on, coverage minimums (1 engine per station), move-ups enabled. |
| **EMS** | *ALS emergency*: Ambulance×1 + Paramedic role×1; *BLS*: Ambulance×1. Minimum staffing *Fully staffed*. |
| **EMS with recognised turnout times** (e.g. Belgian ambulance / MUG) | Closest-unit mode ranked by **Fastest response**, **Order by driving ETA** on with a shortlist of 3–5; *At station* status with base type **In Quarters**; *Available on the road* (radiofonisch) with base type **Available**; In-quarters turnout **120**, Mobile turnout **30**. |
| **SAR** | *Missing person*: Team leader role×1, Searcher role×6, K9 role×1 — manual selection (people, not apparatus). |
| **Security** | *Alarm response*: Patrol unit×1 closest-unit, auto-dispatch on; *Medical on site*: adds First-aid role×1. |
| **Industrial ERT** | *Hazmat release*: Hazmat team×1 + Safety officer role×1 + Fire brigade×1; coverage minimum keeps one crew in the plant. |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/RunCards/{Index,New,Edit,Preview}`, `/User/Dispatch/GetDispatchRecommendation?priority=&type=&latitude=&longitude=&alarmLevel=`; v4 `GET RunCards/GetRecommendation` (new call) and `GET RunCards/GetCallRecommendation?callId=&alarmLevel=` and `/User/Dispatch/GetCallDispatchRecommendation?callId=&priority=&type=&latitude=&longitude=` (Update Call; form values override the stored call) (adding resources, both built by `DispatchRecommendationRequest.ForCallInProgress`: `DispatchRecommendationRequest.CountDispatchedTowardRequirements` at the call's current level; a higher level previews Strike Next Alarm, filled in full) |
| Settings | Department settings 58–60 (dispatch mode, auto-dispatch, tuning). Setting 60 is `DispatchRecommendationConfig`: location ages, radius, stale inclusion, routed ETA + shortlist, rest period, staffing gate, move-up, `InQuartersTurnoutSeconds`, `MobileTurnoutSeconds`, `ClosestUnitRanking` (`ClosestUnitRankingModes`: `FastestResponse` 0, `ShortestDistance` 1; distance mode makes no routed lookups). Station coverage rows per group |
| Unit placement | `UnitResponseOrigin` (shared with the New Call nearest-units board): In Quarters base type (23) → station, else GPS fix, else station. Results carry `PositionSource`, `TurnoutSeconds`, `ResponseSeconds` (turnout + travel); `EtaSeconds` is travel only |
| Model | `RunCard`, `RunCardTrigger`, `RunCardAlarmLevel`, `RunCardUnitRequirement`, `RunCardRoleRequirement`, `RunCardStatusSelection`, `StationCoverageMinimum` |
| Feature flag | `Dispatch.RunCards` (seeded by M0116) |
| Workflow events | Run-card activation, escalation and move-up events (48–51) are available as triggers |
| Design | `int-Coordination/docs/architecture/run-cards-dispatch-design.md` |
