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
| **Calendar** | Calendar events, types, and RSVP |
| **Calendar Export** | iCal export, department feed subscriptions, and sync token management (see [Calendar Export API](calendar-export)) |
| **Contact Verification** | Email and phone verification |
| **Workflows** | Automated workflow management |

## Pending and scheduled calls

Another system (case management, scheduling, a referral line) can hand work to your dispatchers without paging anyone: create the call as **pending**. It is saved and numbered, nobody is notified, and it stays out of the active call lists and the field apps until a dispatcher sends it from **Pending Calls** in the web app or the Dispatch app. See [Pending and scheduled calls](../web-app/dispatch-calls#pending-and-scheduled-calls).

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
| `POST Calls/SaveCall` with `"IsPending": true` | Create a pending call. `DispatchList` is optional and kept as the proposed recipients (empty = none, `"0"` = everyone); `DispatchOn` is ignored; the department's dispatch-list and dispatch-time requirements do not apply. Use `ExternalId` for your own case or ticket number. |
| `GET Calls/GetPendingCalls` | Pending calls, oldest first. A call's `State` is `8` while pending. |
| `PUT Calls/DispatchCallNow` | Body `{ "CallId": "123", "DispatchList": "U:5\|R:7" }`. Sends a pending call, or a scheduled call that has not gone out, right now. Leave `DispatchList` out to use the recipients already on the call. Returns 400 with a message when the call is not waiting or has nobody to send to. |
| `PUT Calls/EditCall` | Edits a pending call without notifying anyone. A future `DispatchOn` turns it into a scheduled call. |
| `PUT Calls/CloseCall` | Body `{ "Id": "123", "Type": 1, "Notes": "...", "SendNotification": true }`. Closes a call (close states 1–7). With `SendNotification`, everyone on a call that went out is told it closed: the personnel, groups and roles it was dispatched to, its units, and the incident command team. A pending call, or a scheduled call that never went out, notifies nobody. Returns 400 while the call has an active incident command: close the command first (the Incident Command app can close the call in the same step). |
| `GET Calls/GetAllPendingScheduledCalls`, `PUT Calls/UpdateScheduledDispatchTime` | Scheduled calls that have not been sent yet, and moving their dispatch time. |

A **scheduled** call is created the same way without `IsPending`, with a future dispatch time: `DispatchOn` in the department's local time, or `DispatchOnUtc` in UTC (for example `"2026-10-07T14:30:00Z"`; it wins when both are sent). It goes out by itself within five minutes of that time, or earlier with `DispatchCallNow`.

`Priority` is the id of one of your department's call priorities (`GET CallPriorities/GetAllCallPriorites`) and `Type` the name of a call type. Dispatch lists use `P:` personnel, `G:` groups, `R:` roles and `U:` units, separated by `|`.
