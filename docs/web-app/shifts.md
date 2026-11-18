---
sidebar_position: 17
title: Shifts
---

# Shifts

**Shifts** schedule who is on duty. Resgrid supports **assigned** shifts (you put people on the roster), **signup** shifts (members sign up for open slots, with per-group quotas), recurring shift patterns, trades between members and attendance tracking — and shifts can drive dispatch (*dispatch shift instead of group*) and checklist scheduling.

**Left menu → Shifts.** *Your Shifts* shows the signed-in member's upcoming duty; *Shift Staffing* shows and approves who worked each shift day, past days included ([below](#shift-staffing)); administrators create shifts and set the days, groups and quotas. Settings: **Department Settings → Shifts**.

![Shifts](/img/web-app/shifts/index.png)

<AcademyVideo id="08-shifts" />

## Shift Lifecycle

```
Create Shift → Assign Groups/Roles → Set Days → Personnel Signup → Trades → Process
```

## Shift List

**Authorization:** `Shift_View` policy

Displays all shifts with visibility based on whether the user is a department admin or group admin.

## Creating Shifts

**Authorization:** `Shift_Create` policy

![New shift](/img/web-app/shifts/new-shift.png)

### Shift Configuration

| Field | Description |
|-------|-------------|
| Shift Name | Display name |
| Shift Code | Short code identifier |
| Color | Color for calendar display |
| Start Time | Shift start time |
| End Time | Shift end time |
| Assignment Type | How personnel are assigned (e.g., "Assigned") |

### Group Assignments

Shifts are associated with specific station groups. Each group-shift assignment includes:
- **Role requirements** — Specify which personnel roles are needed and how many
- **Personnel assignments** — Pre-assign specific people to groups

### Date Selection

Shift days specify the actual dates the shift is active.

### Events
Fires `ShiftCreatedEvent` on creation.

## Editing Shifts

**Authorization:** `Shift_Update` policy

Editing is split into three separate views:

### Edit Shift Details
- Name, code, color, start/end time
- Personnel assignments
- Fires `ShiftUpdatedEvent`

### Edit Shift Days
- Add or modify shift dates
- Fires `ShiftDaysAddedEvent`

### Edit Shift Groups
- Modify group assignments and role requirements

## Deleting Shifts

**Authorization:** `Shift_Delete` policy

Validates department ownership before deletion.

## Shift Signup

**Authorization:** `Shift_View` policy

Personnel can sign up for shift days:

### Signup Process
1. View available shift day with group needs
2. Check if already signed up (respects multi-group signup setting)
3. Sign up for a specific group within the shift day
4. Receive signup confirmation

### Multi-Group Signup
When enabled in department settings, personnel can sign up for shift days under groups other than their own.

## Viewing a Shift Day

**Authorization:** `Shift_View` policy

The shift day view shows:
- All signups per group
- Role requirement fulfillment
- Open needs (unfilled roles)

## Your Shifts

**Authorization:** `Shift_View` policy

![Your shifts](/img/web-app/shifts/your-shifts.png)

Shows the current user's:
- Upcoming shift signups
- Open trade requests directed at them

## Shift Trades

The trade system enables personnel to swap shifts:

### Trade Workflow

```
1. Request Trade → 2. Other User Processes → 3. Propose Days → 4. Accept/Reject → 5. Complete
```

### 1. Request Trade
**Action:** `RequestTrade`
- Select a shift signup to trade
- Choose target personnel
- Fires `ShiftTradeRequestedEvent`

### 2. Process Trade
**Action:** `ProcessTrade`
- View trade request details
- Propose alternate shift days
- Fires `ShiftTradeProposedEvent`

### 3. Reject Trade
**Action:** `RejectTrade`
- Provide a rejection reason
- Fires `ShiftTradeRejectedEvent`

### 4. Finish Trade
**Action:** `FinishTrade`
- Complete the trade by selecting a user or target signup
- Fires `ShiftTradeFilledEvent`

## Shift Staffing

Shift Staffing is where a supervisor records **who actually worked** each shift day. Every shift day is staffed **automatically** from the shift itself until a supervisor **approves** its staffing here; the approved staffing then replaces the automatic one for that day, and the [On-Shift Hours report](/web-app/reports/#on-shift-hours-report) shows which hours come from each.

**Shifts → Shift Staffing**, or **Shift Staffing** at the top of a shift day's page (that opens the editor on the day). Department admins and department-wide shift managers see every shift and static shift; a group admin sees the shifts with one of their groups and staffs only those groups' slots.

![Shift staffing](/img/web-app/shifts/shift-staffing.png)

### Staffing by Day

The list at the top shows every shift day and [static shift](/web-app/workshifts/) day in a date range (past days included, up to 62 days at a time), with its type, time, hours, the number of people staffing it and whether its staffing is **Automatic** or **Approved** (with who approved it and when). An approved day also shows how it differs from the shift: *+2 / -0* means two people on the approved staffing are not on the shift's roster and nobody on the roster was left off. Filter it by shift type, and choose **Select** on a row to open that day below.

### Automatic staffing

| Shift type | Automatic staffing is |
|---|---|
| **Assigned** | The shift's standing roster, less anyone taken off that day, plus anyone a supervisor added for the day or who took the slot in a completed trade. |
| **Signup** | Everyone signed up for the day (a signup still waiting for approval does not count), plus supervisor additions and trades. |
| **Static shift** | The current crew of each of the static shift's units (the people in its unit roles). |

Automatic staffing always reflects the shift as it is set up now, so changing a standing roster or a unit crew also changes the automatic staffing of past days. Approve the days you need recorded exactly.

![A past day still staffed automatically](/img/web-app/shifts/shift-staffing-automatic.png)

### Setting the staffing

1. Choose the **Shift Type** (assigned or signup shift, or a static shift — static shifts are for department-wide supervisors), the shift and the day. Past days can be picked.
2. **Current Staffing** shows the day's time, whether it is in progress or over, how it is staffed now, who the shift itself puts on the day and, for an approved day, who approved it, the note and the differences from the shift.
3. Change the people in each picker. Shifts have one picker per group plus *Non-group personnel*; a static shift has one picker per unit, starting from the unit's current crew. A group another supervisor runs is shown but kept as it is.
4. Choose **Approve Staffing**.

What approving does depends on the day:

- **The day has not ended:** the day's roster follows the approved staffing. People added are put on the day (a pending signup is approved), and people you remove from the pickers are taken off the day. Someone who joined the roster after the staffing was last approved is never taken off without being shown.
- **The day is over:** the roster is not changed; the approved staffing records who worked it.

**Revert to Automatic** removes the approved staffing of the day so it is staffed automatically again (it needs the whole shift, so a group admin of only some of its groups cannot). The roster is left as it is.

![Static shift staffing by unit](/img/web-app/shifts/shift-staffing-static.png)

## Shift Calendar

**Authorization:** `Shift_View` policy

![Shift calendar](/img/web-app/shifts/shift-calendar.png)

### Calendar Views
- **All Shifts Calendar** — Shows all shift days across all shifts
- **Single Shift Calendar** — Calendar view for a specific shift

### Calendar Data
Calendar items include:
- Fill status (fully staffed vs. needs)
- User signup status
- Group requirement details
- Color-coded by shift
- Links to signup/view pages

**Workshift Integration:** Workshift days are also displayed on the shift calendar alongside traditional shifts.

## Setup examples

| Department type | How to set it up |
|---|---|
| **Volunteer fire** | Signup shifts per station (e.g. *Night duty crew* 18:00–06:00) with a quota of 4 and a required *Driver* role; allow multi-group signup for neighbouring stations; turn on *Dispatch shift instead of group* only once signups are reliable. |
| **Career fire / EMS** | Assigned shifts on a 24/48 or 48/96 pattern, one shift group per station, personnel assigned by platoon; trades require officer approval. The company officer approves each tour's staffing on **Shift Staffing** after it ends (call-backs added, sick leave removed), so the On-Shift Hours report matches payroll. |
| **SAR** | Signup *on-call* weeks rather than shifts; use the Calendar for trainings. |
| **Emergency management / EOC** | Assigned 12-hour EOC shifts during activations; roles per section; signup for volunteer positions. |
| **Security** | Assigned shifts per client site, rotating patterns, trades allowed within the same site group. |
| **Industrial ERT** | Assigned shifts matching plant crews; minimum quota per qualification (confined space, hazmat). |

## Technical reference

`ShiftsController`; routes `/User/Shifts/{Index,NewShift,EditShiftDetails,EditShiftDays,EditShiftGroups,ShiftCalendar,YourShifts,ShiftStaffing,ClearShiftStaffing,ViewShift,Signup,RequestTrade,ProcessTrade}`; permission `CreateShift`; events `ShiftCreatedEvent`, `ShiftTradeRequestedEvent`, `ShiftTradeFilledEvent`; module switch `ShiftsDisabled`.

Staffing: `IShiftStaffingService` (`ShiftStaffingService`) resolves each occurrence's effective staffing (`ShiftDayStaffing`, source `Automatic` or `Manual`). A shift day's approved staffing is the latest `ShiftStaffings` row (with `ShiftStaffingPersons`) for its shift and date; saving again adds a row, **Revert to Automatic** deletes them. A static shift day's approved staffing is its `WorkshiftFills` rows (`Approved`, `FilledById` = user id since migration M0305). Automatic staffing comes from `ShiftRosterBuilder` (on-duty roster entries) and, for static shifts, `UnitActiveRoles`. Roster changes on save go through `AssignUserToShiftDayAsync` / `RemoveUserFromShiftDayAsync`, so the usual roster-change notifications fire.

### Data Endpoints
| Endpoint | Purpose |
|----------|---------|
| `GetShiftCalendarItems` | Calendar items for all shifts + workshifts |
| `GetShiftCalendarItemsForShift` | Calendar items for one shift |
| `GetShiftCalendarItemTypes` | Shift types with colors for calendar legend |
| `GetPersonnelForShift` | Personnel assigned to a shift (optionally by group) |
| `GetShiftGroups` | Groups assigned to a shift |
| `GetShiftDays` | Shift days with processed status |
| `GetShiftJson` | Full shift object |
| `GetShiftsForDepartmentJson` | All shifts (id, name) |
| `GetPersonnelNotOnShiftDay` | Personnel matching role requirements but not signed up |
| `GetShiftDaysUserIsOn` | Shift days the current user is on |
| `GetStaffingOverview` | Shift and static shift days in a range (at most 62 days) with their staffing source, for *Staffing by Day* |
| `GetShiftDayStaffing` | One shift day's automatic and approved staffing, groups and differences |
| `GetWorkshiftDays` | A static shift's days (department-local dates) |
| `GetWorkshiftDayStaffing` | One static shift day's staffing per unit |

### Interactions with Other Modules
| Module | Interaction |
|--------|-------------|
| **Dispatch** | Shift-based dispatch replaces group dispatch with shift personnel |
| **Groups** | Shifts reference groups for assignments |
| **Personnel Roles** | Role requirements define shift needs |
| **Dashboard** | Staffing levels affected by shift assignments |
| **Calendar** | Shift days displayed on shift calendar |
| **Workshifts** | Workshift days integrated into shift calendar |
| **Department** | Multi-group signup and dispatch settings |
| **Reports** | Shift readiness report analyzes fulfillment; the On-Shift Hours report totals hours from each day's staffing |
