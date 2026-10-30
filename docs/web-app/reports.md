---
sidebar_position: 22
title: Reports
---

# Reports

**Reports** are the printable, exportable views of what happened: personnel and staffing, certifications, calls, shifts, department activity, action logs, event attendance, checklist compliance and more. Most take a date range or filter; all can be printed, exported and — from **Profile → Report delivery** — scheduled to be emailed on a recurring basis.

**Left menu → Reports.** The Records module adds its own [saved reports, analytics and exports](records/reports-and-exports); Inventory, Work Orders and Checklists have report pages of their own.

![Reports](/img/web-app/reports/index.png)

## Report Dashboard

**Authorization:** `Reports_View` policy

The report index page provides access to all available report types.

## Available Reports

### Personnel Status History Report

**Parameters:** Group selection, user selection, date range

Displays all action log entries (status changes) for selected personnel within a date range.

**Custom Status Resolution:** For status IDs > 25, the report resolves custom state names from the department's custom status configuration.

### Personnel Roster Report

Comprehensive personnel listing including:
- Full name
- Group/station assignment
- Personnel roles
- Email address
- Username and ID
- Phone number
- Mailing address

**Privacy:** Respects the visibility matrix — users only see personnel they have permission to view.

### Staffing Report

Current staffing levels for all personnel:
- Per-person staffing status
- Group breakdowns
- Next scheduled staffing changes
- Supports custom staffing levels

### Certifications Report

Lists all certifications across the department:
- User name
- Certification name, number, and type
- Issuer
- Expiry date
- Area of certification

### Certification Compliance Report

The typed-catalog counterpart of the certifications report, built from the [Certifications](business-ops/certifications) dashboard: one grid for **people** and one for **units**, a column per certification type, cells coloured valid / expiring within the notification window / expired, with the *run on* date for auditors and accreditation files. Respects the personnel visibility matrix; can be scheduled like any other report.

![Certification compliance report](/img/web-app/certifications/compliance-report.png)

### Log Report

**Parameters:** Log ID

Detailed report for a single work log:
- Full log details
- User data
- Station attendance calculation

**Authorization:** `CanUserViewAndEditWorkLogAsync` check required.

### Upcoming Shift Readiness Report

Analyzes upcoming shifts for operational readiness:
- Role requirements per group
- Current signups vs. requirements
- Delta (surplus/deficit)
- Readiness status

### On-Shift Hours Report

Each person's hours on shift for a period across **assigned**, **signup** and **static** shifts, for the whole department, one group or one shift — with every hour marked as coming from **approved** staffing (set by a supervisor on [Shift Staffing](/web-app/shifts/#shift-staffing)) or **automatic** staffing (worked out from the shift). Use it for payroll, LOSAP/volunteer-hour credit and duty-hour compliance.

**Reports → On-Shift Hours Report.** Pick the start and end (time is counted up to the end, which is not included; the default is the current month) and what the report is for:

| Report for | Counts |
|---|---|
| **Entire department** | Everyone on every shift and static shift day. |
| **A group** | People filling a slot for the group or one of its child groups, plus the group's members on slots that have no group (a static shift's slots belong to the unit's station). A member filling another group's slot counts for that group, not theirs. |
| **A shift** | One assigned, signup or static shift. |

![On-Shift Hours report parameters](/img/web-app/reports/on-shift-hours-params.png)

The report shows:

- **Totals** — total, approved and automatic hours, people, shift days and approved shift days.
- **Personnel** — per person: shifts, total hours, approved and automatic hours, hours on assigned, signup and static shifts, and a staffing badge (*Approved*, *Automatic* or *n of m approved*). Rows with any approved hours have a green edge.
- **Shift Days** — every shift day in the period with its time, hours, people and staffing; approved days show who approved them, when, and how the approved staffing differs from the shift (*+added / -left off*). **Open** jumps to the day on Shift Staffing.
- **Detail by Person** — each person's shift days with the group or unit they filled. A shift that crosses the start or end of the period counts only the part inside it (marked \*).

**Download CSV** gives the detail rows (ID, name, group, shift, type, group/unit, start, end, hours, staffing) for a spreadsheet or payroll import. The report and the CSV only list members the signed-in user may see.

![On-Shift Hours report](/img/web-app/reports/on-shift-hours.png)

Counting rules: a person counts once per shift day even if they fill two slots; two different shifts that overlap both count. A day nobody has approved uses the shift's automatic staffing as the shift is set up now, so approve the days that need an exact record before relying on the report for payroll.

### Department Activity Report

Annual activity overview:
- Call counts by type
- Training counts by month
- Per-person response statistics
- Per-person training participation
- Action log analysis

### Personnel Hours Report

**Parameters:** Date range

Calculates hours worked per person:
- **Call hours** — Time from call logged to closed
- **Work hours** — Time from work log start to end
- **Training hours** — Training participation time
- **Total hours** — Combined total

Hours calculation uses multiple data sources:
- Log start/end times
- Unit dispatch/in-quarters timestamps
- Call logged/closed timestamps

### Personnel Hours Detail Report

**Parameters:** User ID, date range

Individual breakdown of hours:
- Per-call detail
- Per-work-log detail
- Per-training detail

### Personnel Staffing History Report

**Parameters:** Group selection, user selection, date range

All staffing level changes within a date range with custom state resolution.

### Call Summary Report

**Parameters:** Date range, group (optional)

Comprehensive call analysis:
- Summary tiles: total and still-open calls, average time to on scene, average call length, unit and personnel responses
- Counts by call type, with a pie chart
- Counts by close state
- Calls by group, with a pie chart (when calls fall in more than one group)
- Per-call details (group, personnel count, unit count, first on-scene time)

**Group filter.** Each call is counted in exactly one group:

1. If the call's location falls inside a group's geofence, it belongs to that group. Where geofences overlap, the most deeply nested group wins, then a station over an organizational group, then the smaller geofence.
2. Otherwise (no location, or outside every geofence) it belongs to the group that most of its dispatched units and personnel belong to. Each unit counts for its station group and each person for their group; a dispatched group counts through its members. Ties go to the group with more units, then to the station nearest the call.
3. If nothing with a group was dispatched, the units and personnel that set a status on the call decide it the same way.

Calls that none of these place show as **Unassigned**. Choosing a group also includes the groups beneath it, so a battalion shows all of its stations' calls. Group membership and unit stations are today's, not as they were when the call ran.

**Period statistics.** Sections are added when the date range calls for them:

| Range | Sections added |
|---|---|
| Crosses a month boundary | Monthly statistics: per-month table (calls, year to date, averages, units, personnel), calls by month stacked by call type, call types by month |
| Crosses a quarter boundary | Quarterly statistics: the same per quarter, plus a call type pie for each quarter listing the department's call types with no calls that quarter |
| Covers at least one whole calendar year | Yearly statistics: the same per year, with a trend line when the range spans more than one year |

Periods the range only partly covers are marked with an asterisk.

### Call Unit Times Report

**Parameters:** Date range. For a single call, use **Unit Times** at the top of the call's page.

For each call in the period, one row per unit that was dispatched to it or set a status on it:

| Column | Shows |
|---|---|
| **Dispatched**, **En Route**, **On Scene**, **Staging**, **Cleared** | When the unit reached each step on this call, from the statuses on the call's record. Steps are recognised by the status's **base type**, so custom statuses count (see [Custom Statuses](custom-statuses)). |
| **End of Commitment** | When the unit was available, in quarters or out of service again after the call: the end of its status history. Empty while the unit is still working the call. |
| **Committed** | Dispatch to the end of commitment: how long the call kept the unit busy. |
| **Linked By** | How the statuses were tied to the call: *Unit status* (sent for this call), *Auto-linked*, *Inferred* or *Dispatch only*, explained in the report's legend and under [Which call a status belongs to](dispatch-calls#which-call-a-status-belongs-to). |

**Status history.** Under each unit is every status it set from dispatch until it was back in service, with the time, how long it stayed in each and the status's own colour. That is the unit's whole part in the call, including statuses the call's record doesn't hold:

- a status pointing somewhere else, such as *At Hospital* with the hospital as its destination, and the *Returning* and *In Quarters* that follow;
- statuses set after the call was closed, since a transport often outlasts the call.

Those rows are marked **Unit history** and shown in grey. The history stops at the unit's first back-in-service or out-of-service status. It also stops when the unit is dispatched to another call or sets a status for one, or 12 hours after the call. A release Resgrid applied as the call closed (see [Unit status on dispatch and release](department-settings#unit-status-on-dispatch-and-release)) is marked *set by Resgrid*. The history carries on past it when the crew's next status is a working one, such as *Transporting*. It stops there when the crew's next status is back in service too.

**Downloads:**

- **Download CSV** gives one row per unit per call: the unit type and group, the times above, **End of Commitment** and **Committed Minutes**.
- **Download status history CSV** gives one row per status. Each row has the status, its **meaning** (base type, such as *Transporting* or *At Hospital*), when it started and ended, the minutes in it, how it was linked and whether Resgrid set it.

Filter the history CSV on the meaning for hospital turnaround (*At Hospital* minutes), or group it by unit type, call type or group for time committed and utilisation.

### Unit State History Report

**Parameters:** Group selection or unit selection, date range

All unit state changes within a date range:
- By group or individual unit
- State name resolution (including custom states)

### Active Calls Resource Report

Real-time snapshot of active calls and assigned resources:
- Currently open calls
- Dispatched personnel with names, roles, and groups
- Dispatched units with active role holders

## Report Parameters

Several reports have parameter selection pages that allow filtering:

![Call summary parameters](/img/web-app/reports/call-summary-params.png)

| Report | Parameters |
|--------|-----------|
| Personnel Hours | Date range, specific user (optional) |
| Staffing History | Group, user, date range |
| Unit State History | Group, unit, date range |
| Action Logs | Group, user, date range |
| Call Summary | Date range, group (optional) |
| Call Unit Times | Date range (or one call, from the call's page) |
| On-Shift Hours | Date range; entire department, a group or a shift (assigned, signup or static) |

All parameter pages respect the **visibility matrix** — only showing personnel/groups the user has permission to view.

## Setup examples

| Department type | How to set it up |
|---|---|
| **Volunteer fire** | Schedule the *Personnel hours* and *Call summary* reports monthly to the chief and treasurer (LOSAP points, run reimbursements); *Certification compliance* quarterly to the training officer. |
| **Career fire** | *Unit state history* and *Personnel staffing history* for payroll reconciliation; *On-Shift Hours* per pay period (approve each tour's staffing first) exported as CSV for payroll; *Upcoming shift readiness* each morning. |
| **EMS** | *Call summary* by type for the medical director; *Call unit times* status history CSV for hospital turnaround and time committed per ambulance / MUG; *Event attendance* for CE credit. |
| **SAR** | *Personnel hours* per mission for volunteer-hour grants; *Department activity* YTD for the board. |
| **Emergency management** | *Action logs* during activations for the after-action report; *Event attendance* for exercises. |
| **Security / business** | *Active calls and resources* live view for the operations centre; *Flagged call notes* for supervisor review. |

## Technical reference

`ReportsController` (+ `ChecklistReportsController`); routes `/User/Reports/{Index,PersonnelReport,StaffingReport,CertificationsReport,CertificationComplianceReport,UpcomingShiftReadinessReport,DepartmentActivityReport,PersonnelHoursReportParams,PersonnelStaffingHistoryReportParams,UnitStateHistoryReportParams,ActionLogsParams,CallSummaryReportParams,CallUnitTimesReportParams,CallUnitTimesReport,CallUnitTimesReportCsv,CallUnitTimesHistoryCsv,ActiveCallsResourcesReport,FlaggedCallNotesReportParams,EventAttendanceReportParams,ChecklistComplianceReport,LogReport,OnShiftHoursReportParams,OnShiftHoursReport,OnShiftHoursReportCsv}`; scheduled delivery via `ProfileController.Reporting` and the worker; module switch `ReportsDisabled`. Call Unit Times reads `ICallStatusAttributionService.GetUnitTimelinesForCallsAsync` (`CallUnitTimeline.Build`: the call's record plus `StatusDestinationSources.FollowOn` (6) copies, never stored, until `UnitCallInvolvement.HasFinishedCall`) and `CallUnitTimesCalculator`.

### Internal Report Generation
The `InternalRunReport` endpoint is an **anonymous access** endpoint intended for system-internal use (e.g., scheduled report delivery). It supports generating:
- Staffing Report
- Personnel Report
- Certifications Report
- Shift Readiness Report

:::warning Security Note
`InternalRunReport` uses `[AllowAnonymous]` and should be network-restricted in production to prevent unauthorized access.
:::

### Interactions with Other Modules
| Module | Interaction |
|--------|-------------|
| **Calls** | Call data for summary and activity reports |
| **Personnel** | Personnel data for roster and hours reports |
| **Units** | Unit state data for history reports |
| **Shifts** | Shift data for readiness report; shift, signup and static shift staffing for On-Shift Hours (`IShiftStaffingService.GetOnShiftHoursAsync`, `OnShiftHoursCalculator`; at most 366 days per run) |
| **Logs** | Work log data for hours and activity reports |
| **Trainings** | Training data for activity and hours reports |
| **Custom Statuses** | Status name resolution throughout |
| **Groups** | Group filtering on parameter pages |
| **Certifications** | Certification data for report |
| **Profile** | Scheduled report delivery via ProfileController |
| **Security** | Visibility matrix filtering |
| **Department Settings** | Module can be enabled/disabled |
