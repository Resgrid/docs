---
sidebar_position: 1
---

# API Information

Here you can find some core information, mainly how to authenticate, about the Resgrid API.

## Supported API Calls

The Resgrid API Exposes our Swagger documentation to showcase every call and operation you can perform against the Resgrid API. You can view the documentation by navigating to the Resgrid API Swagger page.

<https://api.resgrid.com/index.html>

## Key API Areas

| Area | Description |
|------|-------------|
| **Authentication** | JWT/OpenID Connect token management, and [department API keys](authentication#department-api-keys) for system integrations |
| **Statuses** | Personnel and unit status operations |
| **Calls** | Dispatch call management, including [pending and scheduled calls](#pending-and-scheduled-calls) |
| **Recurring calls** | Calls dispatched on a schedule, the scheduled calls calendar and the dispatcher alerts (see [Recurring calls](#recurring-calls)) |
| **Calendar** | Calendar events, types, and RSVP |
| **Calendar Export** | iCal export, department feed subscriptions, and sync token management (see [Calendar Export API](calendar-export)) |
| **Contact Verification** | Email and phone verification |
| **Workflows** | Automated workflow management |

## Pending and scheduled calls

Another system (case management, scheduling, a referral line) can hand work to your dispatchers without paging anyone: create the call as **pending**. It is saved and numbered, nobody is notified, and it stays out of the active call lists and the field apps until a dispatcher sends it from **Pending Calls** in the System or the Dispatch app. See [Pending and scheduled calls](../web-app/dispatch-calls#pending-and-scheduled-calls).

An integration should use a [department API key](authentication#department-api-keys) with the `calls.create` scope rather than a member's login:

```http
POST /api/v4/Calls/SaveCall
X-Resgrid-ApiKey: rgk_XXXXXXXX_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Content-Type: application/json

{
  "Name": "Follow-up: post-discharge wellness check",
  "Nature": "Clinic requests an in-person check within 24 hours.",
  "Priority": 1,
  "Type": "Follow-up",
  "Address": "550 S Vermont Ave, Los Angeles, CA 90020",
  "ContactName": "Client J.R.",
  "ExternalId": "EHR-55120",
  "IsPending": true
}
```

| Endpoint | Purpose |
|---|---|
| `POST Calls/SaveCall` | Create a call. `DispatchList`: `"0"` dispatches everyone and is the only way to; a blank list or one with no entries (`"\|"`) dispatches nobody (an informational call). Until November 2026 a blank list paged everyone. `MapPage` and `ContactId` left out (null) mean the client has no input for them, so the department's requirements for them are not applied. |
| `POST Calls/SaveCall` with `"IsPending": true` | Create a pending call. `DispatchList` is optional and kept as the proposed recipients (empty = none, `"0"` = everyone); `DispatchOn` is ignored; the department's dispatch-list and dispatch-time requirements do not apply. Use `ExternalId` for your own case or ticket number. |
| `GET Calls/GetPendingCalls` | Pending calls, oldest first. A call's `State` is `8` while pending. |
| `PUT Calls/DispatchCallNow` | Body `{ "CallId": "123", "DispatchList": "U:5\|R:7" }`. Sends a pending call, or a scheduled call that has not gone out, right now. Leave `DispatchList` out to use the recipients already on the call. Returns 400 with a message when the call is not waiting or has nobody to send to. |
| `PUT Calls/EditCall` | Edits a call; a pending call is edited without notifying anyone, and a future `DispatchOn` turns it into a scheduled call. `DispatchList`: blank keeps the recipients, `"0"` adds everyone, anything else replaces them (a recipient list the department hides keeps its recipients). A field the department hides keeps its stored value when sent blank or left out. |
| `POST Calls/ReleaseUnit` | Body `{ "CallId": "123", "UnitId": "45", "Notify": true }`. Releases (stands down) one unit from an open call that has gone out, without closing the call. The unit gets the department's release status unless it is already back in service, out of service or on another open call (`StatusApplied` says which); `Notify` sends it a cancellation notice. Allowed for members who may edit the call and for anyone who may set the unit's status. Returns `Data { CallId, UnitId, ReleasedOn, StatusApplied }` (`ReleasedOn` is UTC), or 400 with the reason (call not open or not dispatched yet, unit not on the call, already released). Not available to department API keys. |
| `POST Calls/ReleasePersonnel` | Body `{ "CallId": "123", "UserId": "...", "Notify": true }`. Releases one person from an open call however the call reached them (by name, a group or role, a unit's crew, or a status). Allowed for members who may edit the call, department admins, and the person themselves. Same result and errors as `ReleaseUnit`. Sending a person back takes picking them by name in `EditCall`. |
| `GET Calls/GetCallExtraData` | `Dispatches` lists who is on the call now. Units and people released from it are in `ReleasedUnits` and `ReleasedPersonnel`, each with `ReleasedOn` (UTC, ISO 8601) and `ReleasedBy`. A person released after a group or role page still has that group or role in `Dispatches`, so subtract `ReleasedPersonnel` from the members you show on the call. |
| `GET Calls/GetNewCallFieldPolicy` | The department's [new call form fields](../web-app/department-settings#new-call-form-fields): one rule (`Key`, `Visible`, `Required`) for each field that is not shown-and-optional, including the four dispatch lists (`dispatchPersonnel`, `dispatchGroups`, `dispatchRoles`, `dispatchUnits`). When all four are hidden, offer an explicit *All Call* (`"0"`) and send `"\|"` for a call that pages nobody. |
| `PUT Calls/CloseCall` | Body `{ "Id": "123", "Type": 1, "Notes": "...", "SendNotification": true }`. Closes a call (close states 1–7). With `SendNotification`, everyone on a call that went out is told it closed: the personnel, groups and roles it was dispatched to, its units, and the incident command team. A pending call, or a scheduled call that never went out, notifies nobody. Returns 400 while the call has an active incident command: close the command first (the Incident Command app can close the call in the same step). |
| `GET Calls/GetAllPendingScheduledCalls`, `PUT Calls/UpdateScheduledDispatchTime` | Scheduled calls that have not been sent yet, and moving their dispatch time. |

A **scheduled** call is created the same way without `IsPending`, with a future dispatch time: `DispatchOn` in the department's local time, or `DispatchOnUtc` in UTC (for example `"2026-10-07T14:30:00Z"`; it wins when both are sent). It goes out by itself within five minutes of that time, or earlier with `DispatchCallNow`.

`Priority` is the id of one of your department's call priorities (`GET CallPriorities/GetAllCallPriorites`) and `Type` the name of a call type. Dispatch lists use `P:` personnel, `G:` groups, `R:` roles and `U:` units, separated by `|`.

## Recurring calls

`/api/v4/RecurringCalls/...` manages [recurring calls](../web-app/scheduled-calls) — calls Resgrid creates and dispatches on a schedule — their calendar and the alerts dispatchers act on. Dates are `yyyy-MM-dd` and times `HH:mm` in the department's time zone; instants are ISO 8601 UTC (`2026-11-18T16:00:00Z`). One run of a schedule is identified by its `RecurringCallId` and `OccurrenceOn`. A call a schedule created carries `RecurringCallId` in the `Calls` results.

```http
POST /api/v4/RecurringCalls/SaveRecurringCall
Authorization: Bearer ...
Content-Type: application/json

{
  "RecurringCallId": 0,
  "Name": "Dialysis transfer - Mercy General to Riverside",
  "NatureOfCall": "Scheduled interfacility transfer, stretcher",
  "Priority": 1,
  "Frequency": 2,
  "Days": [2, 4],
  "Times": ["08:00", "13:00", "19:00"],
  "StartsOn": "2026-11-17",
  "CreationMode": 0,
  "LeadTimeMinutes": 1440,
  "UseRunCard": false,
  "FacilityName": "Mercy General Hospital",
  "FacilityDetails": "Dialysis unit, 2nd floor",
  "DestinationName": "Riverside Dialysis Center",
  "ScheduleContactName": "Pat Lee",
  "ScheduleContactNumber": "555-0100",
  "DispatchUnitIds": [12],
  "AlertGroupIds": [3]
}
```

| Endpoint | Purpose |
|---|---|
| `GET GetRecurringCalls` | The department's schedules (paused ones included) with `NextDispatchOn`, `OpenAlertCount` and `CanManage`. |
| `GET GetRecurringCall?recurringCallId=` | One schedule, its next six dispatch times and the calls it created that have not gone out (`IsHeld` when waiting as pending). |
| `GET GetRecurringCallOptions` | What a form needs: `CanCreate`, `RunCardsEnabled`, the time zone, lead time and dispatcher-alert choices and limits. |
| `POST SaveRecurringCall` | Creates (`RecurringCallId` 0) or updates a schedule. `Frequency` 1 daily, 2 weekly (`Days`: 0 = Sunday), 3 monthly (`MonthlyDay`, or `MonthlyWeek` 1–4 / 5 = last with `MonthlyWeekday`). `CreationMode` 0 creates each call `LeadTimeMinutes` ahead and sends it when due; 1 alerts a dispatcher `ManualAlertMinutes` ahead instead. On update `ReplaceUpcomingCalls` (default true) re-creates the calls not yet sent. Returns 400 with `Errors` (`Key` — for example `ErrorDaysRequired`, `NewCallField_address` — and an English `Message`). |
| `POST PauseRecurringCall` | `{ "RecurringCallId": 12, "Reason": "Patient in hospital", "ResumeOn": "2026-12-01", "DeleteUpcomingCalls": false }`. `ResumeOn` optional. |
| `POST ResumeRecurringCall`, `POST DeleteRecurringCall` | `{ "RecurringCallId": 12 }`; delete also takes `DeleteUpcomingCalls` (default true). Only the creator or a department admin. |
| `GET GetScheduledCallsCalendar?start=&end=` | Calendar entries (at most 100 days): `Kind` Scheduled, Dispatched, Cancelled, Projected, Skipped, Due, Missed or Held, with `DispatchOn` (UTC), `DispatchOnLocal` and `OccurrenceOn`. |
| `POST SkipOccurrence`, `RestoreOccurrence` | `{ "RecurringCallId": 12, "OccurrenceOn": "2026-11-19T16:00:00Z" }`. |
| `POST CreateOccurrenceCall` | Creates a run's call without sending it: scheduled for a future run, pending for one already due. Returns `CallId`, `CallState`. |
| `POST DispatchOccurrenceNow` | Creates the run's call if needed and sends it with the schedule's run card and availability rules. `Outcome` `Dispatched` or `Held` (nobody could be sent; it waits as pending), with `UnavailableUnitIds` / `UnavailableUserIds`. |
| `GET GetRecurringCallAlerts?includeClosedHours=` | Open alerts (and, with the parameter, those raised in that many past hours): `Kind` CreateFailed, Missed, NoResources, ResourcesUnavailable or DispatchDue, `Reason`, the call, unavailable resources by name, `CanSend`, `CanAct`. Reload when the hub event `recurringCallAlertsUpdated` arrives. |
| `POST AcknowledgeRecurringCallAlert`, `POST DismissRecurringCallAlert` | `{ "AlertId": "...", "Note": "..." }`. |

Reading needs call view rights; everything else needs call creation rights. Not available to department API keys.
