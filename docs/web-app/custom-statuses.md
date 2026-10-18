---
sidebar_position: 11
title: Custom Statuses
---

# Custom Statuses

**Custom statuses** replace the built-in status words with your own. There are three sets: **personnel statuses** (*Responding*, *On scene*, *Available at station* …), **staffing levels** (*Available*, *On duty*, *Off duty*, *Light duty* …) and **unit statuses** per unit type (*En route*, *On scene*, *Transporting*, *Out of service* …). Each status has a colour, whether it needs a destination (a station or a call), what it counts as (responding / available), and how it looks on the apps and the Big Board.

**Department menu → Custom Statuses.** Start from a **template** (fire, EMS, SAR, security …) and adjust.

![Custom statuses](/img/web-app/custom-statuses/index.png)

## Overview

**Authorization:** `CustomStates_View` policy

The index page displays all custom states organized into three categories:
- **Unit States** — Custom operational statuses for units
- **Personnel Status** — Custom action/response statuses for personnel
- **Personnel Staffing** — Custom availability/staffing levels for personnel

## Custom State Categories

### Unit States
Define custom operational statuses for units (replaces default statuses like Available, Responding, On Scene, etc.).

### Personnel Status
Define custom response/action statuses for personnel (replaces default statuses like Standing By, Responding, On Scene, etc.).

### Personnel Staffing
Define custom availability levels for personnel (replaces default levels like Available, Delayed, Unavailable, etc.).

## Creating Custom States

**Authorization:** `CustomStates_Create` policy

![New unit status set](/img/web-app/custom-statuses/new-unit.png)

### State Set Configuration

| Field | Required | Description |
|-------|----------|-------------|
| Name | Yes | State set name |
| Description | No | State set description |
| Type | Yes | Unit, Personnel, or Staffing |

### State Details (Options/Buttons)

Each state set contains multiple detail options. At least one is required.

| Field | Description |
|-------|-------------|
| Button Text | Display text on status buttons |
| Button Color | Background color (hex) |
| Text Color | Foreground color (hex, default #000000) |
| Order | Display order |
| Meaning | The option's [meaning](#status-meanings) (its base type): a status meaning for personnel and unit statuses, a staffing meaning for staffing levels |
| GPS Required | Whether GPS location is required when setting this status |
| Note Type | Whether a note is asked for (No Note, Optional, Required) |
| Detail Type | Destination type (No Detail, Stations, Calls, POIs, or a combination) |

### Detail Type Behavior

The Detail Type determines what destination options appear when a user selects this status:

| Detail Type | Behavior |
|-------------|----------|
| **No Detail** | No destination selection |
| **Calls** | Dropdown of active calls |
| **Stations** | Dropdown of station groups |
| **Calls and Stations** | Dropdown of both calls and stations |
| **POIs** | Dropdown of points of interest |
| **Calls and POIs**, **Stations and POIs**, **Calls, Stations and POIs** | Dropdown of the listed destinations together |

### Base types

The **Meaning** (base type) tells Resgrid what a status *means*, whatever you call it. It decides whether a unit or person counts as available to run cards, the nearest-units board, availability alerts and reports, and how calls track the status.

| Counts as | Base types |
|---|---|
| **Available** | Available, Cleared, On Patrol, Completed, **In Quarters** |
| **Delayed** (still dispatchable) | On Break |
| **Committed** (busy on a call or task) | Responding, En Route, Dispatched, On Scene, Made Contact, Investigating, At Patient, Searching, Staging, Transporting, Delivering, At Hospital, Loading, Standby, Returning |
| **Unavailable** | Not Responding, Unavailable, Maintenance |
| No meaning | None — the status is a label only |

![Editing a status option with the In Quarters base type](/img/web-app/custom-statuses/edit-option-in-quarters.png)

**In Quarters** is *Available* plus one extra fact: the unit is at its station. Closest-unit run cards and the New Call nearest-units board then measure the unit from its **station's location** instead of its GPS position, and add the department's **in-quarters turnout time** (see [Run Cards](run-cards#how-closest-unit-mode-measures-a-unit)). Use it for statuses such as *In quarters* or *At station*; keep **Available** for units that are available but out on the road.

:::tip
A status for a unit that is heading back but can already take a new call (for example *radiofonisch* in Belgian EMS, or *Available returning*) should use **Available**, not **Returning**. Returning counts as committed, so run cards and the nearest-units board treat the unit as busy.
:::

<a id="status-meanings"></a>

## Status meanings

An option's **Meaning** (stored as its base type) is what the option is, whatever its button says. Resgrid reads the meaning, never the button text, when it:

- decides whether a person or unit is available, for dispatch recommendations, closest-unit [run cards](run-cards) and the New Call nearest-units board;
- sets a unit's status when it is dispatched to a call and when it is released (see [Unit status on dispatch and release](department-settings#unit-status-on-dispatch-and-release));
- checks [notification](notifications#matching-statuses-by-meaning) rules on status and staffing changes, and the active states of [check-in timers](call-checkin-timers#active-for-states-filtering);
- times units against the [unit status timers](department-settings) and flags them on the Big Board. A unit in a status with no meaning is never timed, so give the status your units get on dispatch a meaning such as *Dispatched*;
- mutes dispatch notifications for the staffing levels you suppress, and counts statuses in reports and rollups;
- handles SMS replies to a dispatch, and shows and sets statuses in the Dispatch, Responder, Unit, Big Board and Incident Commander apps.

The built-in statuses and staffing levels already have a meaning. An option you add has none until you pick one. Resgrid treats an option with no meaning as **unknown**: it is neither available nor busy, dispatch and release never pick it, and a rule that targets a meaning doesn't match it.

Personnel and unit statuses use the base types in the table above. Staffing levels have their own meanings:

| Staffing meaning | Use it for | Counts as |
|---|---|---|
| **Available** | Can respond now. | Available |
| **Delayed** | Can respond, but later than usual (a break, a longer drive). | Delayed |
| **Unavailable** | Can't respond. | Unavailable |
| **Committed** | Busy with another assignment. | Committed |
| **On Shift** | Working at the station or post. | Available |
| **Off Duty** | Off duty and not expected to respond. | Unavailable |
| **On Call** | Away from the station but available when called. | Available |

The built-in staffing templates come with their meanings filled in. The *On / Off Duty* template, for example, gives *On Duty* **On Shift**, *On Call* **On Call**, *On Break* **Delayed** and *Off Duty* **Off Duty**.

### Finding options without a meaning

The **Custom Statuses** list flags every set that has options without a meaning, for example **7 without a meaning**. The [Admin Assist](help-setup) setup report raises the same problem as **Status options have no meaning** and names the sets, counting only sets something reads (the personnel status and staffing sets, and unit sets assigned to a unit type).

![Custom Statuses list with a "1 without a meaning" badge on Engine Statuses and "7 without a meaning" on Rescue Statuses](/img/web-app/custom-statuses/index-missing-meanings.png)

Open the set with **Edit**. A warning above the options says how many have no meaning, and the **Meaning** column shows each option's meaning, in red when it is *None*. Where the button text gives a clear hint, the column also suggests a meaning, for example *None (suggested: En Route)* for *Enroute*.

![Editing a unit status set: the missing-meanings warning and the Meaning column with suggestions](/img/web-app/custom-statuses/edit-meanings.png)

**Use suggested meanings** puts every suggestion into the form and shows *Suggestions applied. Review them, then save.* The warning then counts only the options still without a meaning, and disappears when none are left. Nothing is saved yet. Check each one (here *At Location* was suggested as **On Scene**, like *On Scene* itself), then press **Update**. Resgrid never sets a meaning on its own.

![The same set after Use suggested meanings, before Update](/img/web-app/custom-statuses/edit-meanings-suggested.png)

To set or change a single option, press **Edit** on its row and pick its **Meaning**. The text under the picker explains the chosen meaning; *None* reads "No system meaning".

![Editing one option: the Meaning picker set to None](/img/web-app/custom-statuses/option-meaning.png)

Staffing levels have the same picker in the **New Option** dialog (on the New and Edit pages) and on each option's own page.

![New Option dialog on a staffing set, with the staffing meanings listed](/img/web-app/custom-statuses/staffing-meaning.png)

:::note Why it matters
One department's unit statuses had no meanings. Units in its *Dispatched* status showed as available, and units on a closed call were set to *Returning*. Giving each option a meaning, and setting the unit dispatch and release statuses to **Default** or a meaning, fixed both.
:::

### Choosing meanings

| Button text (examples) | Meaning |
|---|---|
| *Dispatched*, *Alerted*, *Toned* | Dispatched |
| *Responding*, *Code 3* | Responding |
| *Enroute*, *Mobile* | En Route |
| *On Scene*, *At Location*, *Arrived* | On Scene |
| *Patient Contact* | At Patient |
| *Transporting*, *To Hospital* | Transporting |
| *At Hospital* | At Hospital |
| *Back in Service*, *Radio Available* | Available (or Cleared) |
| *At Station*, *In Quarters* | In Quarters |
| *Out of Service*, *Mechanical* | Unavailable or Maintenance |
| Staffing: *Pager Only* | On Call |
| Staffing: *Holiday*, *Sick* | Off Duty or Unavailable |

When several options share a meaning, Resgrid uses the first one by **Order** wherever it has to pick one (for example the dispatch status). Notification rules and reports count them all.

## Editing Custom States

**Authorization:** `CustomStates_Update` policy + `CanUserModifyCustomStatusAsync` runtime check

### Editing State Sets
Modify the state set name, description, and all detail options. Handles both existing detail IDs (update) and new details (create).

### Editing Individual Details
The `EditDetail` action allows editing a single state detail option for fine-grained control.

Creates `AuditEvent` (CustomStatusUpdated / CustomStatusDetailUpdated).

## Deleting Custom States

**Authorization:** `CustomStates_Delete` policy + `CanUserModifyCustomStatusAsync` runtime check

Creates `AuditEvent` (CustomStatusRemoved).

## Default Fallback Statuses

When no custom states are defined, the system provides built-in defaults:

### Default Personnel Statuses
| ID | Status |
|----|--------|
| 0 | Standing By |
| 1 | Not Responding |
| 2 | Responding |
| 3 | On Scene |
| 4 | Available Station |
| 5 | Responding to Station |
| 6 | Responding to Scene |

### Default Personnel Staffing Levels
| ID | Level |
|----|-------|
| 0 | Available |
| 1 | Delayed |
| 2 | Unavailable |
| 3 | Committed |
| 4 | On Shift |

### Default Unit Statuses
13 built-in statuses from Available through Enroute.

## Setup examples

| Department type | How to set it up |
|---|---|
| **Volunteer fire** | Personnel: Standing by, Responding to station, Responding to scene, On scene, Available at station, Not responding. Staffing: Available, Unavailable, On call. Units (Engine/Ladder/Rescue): In quarters (base type In Quarters), En route, On scene, Available, Out of service. |
| **EMS** | Units (Medic): At station (base type In Quarters), Available on the road (Available), En route, On scene, Transporting, At hospital, Returning, Out of service; personnel: On duty / Off duty. |
| **SAR** | Personnel: Available, Responding to CP, At CP, Deployed in field, Returned; units (Team): Staging, Searching, Found, Returning. |
| **Emergency management** | Personnel: EOC activated, Remote, Off; units minimal. |
| **Security** | Personnel: On patrol, At post, Responding, Break, Off duty; units (Patrol): Available, Responding, On site, Out of service. |
| **Delivery / transit** | Units (Vehicle): Loading, En route, Delivering, Returning, Off duty. |

## Technical reference

`CustomStatusesController`; routes `/User/CustomStatuses/{Index,Templates,New,Edit,EditDetail,Delete}?type=1|2|3`; model `CustomState` / `CustomStateDetail` (`DetailType`: none / station / call destination; `BaseType`: an `ActionBaseTypes` value, -1 None to 23 In Quarters, classified by `AvailabilityMatrix`); JSON endpoints `GetPersonnelStatusesForDepartment`, `GetPersonnelStaffingLevelsForDepartment`, `GetUnitStatusesLevelsForDepartment?unitTypeId=`.

### JSON API Endpoints
These endpoints are **consumed by views throughout the application** for building dynamic status dropdowns:

| Endpoint | Purpose |
|----------|---------|
| `GetPersonnelStatusesForDepartment` | Personnel statuses (custom or default) |
| `GetPersonnelStaffingLevelsForDepartment` | Staffing levels (custom or default) |
| `GetUnitStatusesLevelsForDepartment` | Unit statuses for a specific unit type |
| `GetUnitStatusesLevelsForDepartmentCombined` | All unit statuses combined across types |

All endpoints support an `includeAny` parameter to add an "Any" option to the list. With `includeMeanings=true` they also add one *Any "On Scene" status* entry per meaning, with the id `b` + the base type (for example `b3`); the notification editor uses these. `GetUnitStatusesLevelsForDepartmentCombined` also lists the built-in unit statuses (prefixed *Built-in:*) when some unit types have no custom set.

### Meanings

| Item | Value |
|---|---|
| Field | `CustomStateDetail.BaseType`: an `ActionBaseTypes` value for personnel and unit statuses, a `StaffingBaseTypes` value for staffing levels (-1 None, 0 Available, 1 Delayed, 2 Unavailable, 3 Committed, 4 On Shift, 5 Off Duty, 6 On Call; 0–4 equal the built-in staffing levels). Built-in options get theirs from `BuiltInStatusBaseTypes`. |
| Option page | `EditDetail` posts `BaseType` for personnel and unit options and `StaffingBaseType` for staffing options |
| Suggestions | `BaseTypeSuggestions.SuggestStatus(buttonText, type)`; shown on `Edit` for options with no meaning and written to the form only by **Use suggested meanings** (`#applySuggestedMeanings`). Saving is the normal **Update** |
| Templates | `CustomStateTemplateCatalog` (`/User/CustomStatuses/Templates`); every template option, staffing included, carries a meaning |
| Matching | Settings that match statuses store tokens (`StatusMatch`): a status value matches that status only, `b` + base type matches every status with that meaning, built-in or custom, in any set; `-1` is any. Integer lists (staffing suppression) store a meaning as -100 minus the base type |
| Availability | `AvailabilityMatrix` classifies a base type as available, delayed, committed or unavailable; -1 is unknown |

### Interactions with Other Modules
| Module | Interaction |
|--------|-------------|
| **Dashboard** | Custom statuses and staffing levels displayed on main dashboard |
| **Units** | Custom unit states define unit status options |
| **Dispatch** | Custom statuses shown during dispatch operations |
| **Reports** | Custom state names resolved in all reports |
| **Mapping** | Status colors used for map markers |
| **Notifications** | Custom states used for availability alert configuration |
| **Department Settings** | Suppressed staffing levels reference custom states |
