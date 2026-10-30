---
sidebar_position: 18
title: Workshifts
---

# Workshifts

Workshifts (static shifts) provide a simpler scheduling mechanism compared to the full Shifts module. They are managed by the `WorkshiftsController`.

![New workshift](/img/web-app/workshifts/new.png)

<AcademyVideo id="08-shifts" />

## Overview

Workshifts define fixed time blocks with assigned units, differing from the dynamic signup-based Shifts system.

## Creating Workshifts

**Authorization:** `Shift_Create` policy

| Field | Required | Description |
|-------|----------|-------------|
| Name | Yes | Workshift name |
| Start Time | Yes | Shift start, in department time (stored in UTC) |
| End Time | Yes | Shift end, in department time (stored in UTC) |
| Units Assigned | No | Units assigned to this workshift |

### Unit Assignment
Units are assigned as `WorkshiftEntity` objects linked to backing unit IDs.

## Editing Workshifts

**Authorization:** `Shift_Update` policy

Validates department ownership. Updates:
- Workshift details (name, times)
- Unit assignments (re-created on each save)
- Full audit trail with IP and user agent

## Viewing Workshift Days

**Authorization:** `Shift_View` policy

A workshift covers one continuous period; its days are that period cut into 24-hour pieces from the start time (the last day ends at the end time). The day view shows, in department time:
- Parent workshift details
- Department units
- Assigned personnel with limits
- Ownership chain validation (day → shift → department)

![Static shift day](/img/web-app/workshifts/view-day.png)

## Staffing a workshift

A workshift schedules units, so its people come from the units: each day is staffed **automatically** by the current crew of every unit on it (the people in the unit's roles). To record who actually crewed the units on a day, a department-wide supervisor opens **Shifts → Shift Staffing**, chooses **Static Shift**, the workshift and the day, adjusts the people under each unit and chooses **Approve Staffing**; **Revert to Automatic** goes back to the unit crews. See [Shift Staffing](/web-app/shifts/#shift-staffing).

Each person on a workshift day counts for that day's hours in the [On-Shift Hours report](/web-app/reports/#on-shift-hours-report) (a 07:00–19:00 three-day workshift gives two 24-hour days and a 12-hour last day), counted for the unit's station when a group report is run.

## Deleting Workshifts

**Authorization:** `Shift_Delete` policy

Requires confirmation via a dedicated confirmation page. Full audit trail recorded.

## Setup examples

| Department type | How to set it up |
|---|---|
| **Career fire** | A/B/C platoon workshifts used as the *each shift* anchor for checklist schedules and for shift-based dispatch. |
| **EMS** | 12-hour day/night workshifts. |
| **Security** | Site shift patterns per client. |

## Technical reference

### Interactions with Other Modules
| Module | Interaction |
|--------|-------------|
| **Shifts** | Workshift days appear on the shift calendar alongside traditional shifts |
| **Units** | Units are assigned to workshifts |
| **Personnel** | Personnel loaded for day view |
| **Department** | Timezone used for time conversion |
| **Shift Staffing** | Approved day staffing stored as `WorkshiftFills` (`Approved`, `FilledById` = user id); automatic staffing from `UnitActiveRoles` |
| **Reports** | Workshift days count toward the On-Shift Hours report |
