---
sidebar_position: 4
title: Dispatch & Calls
---

# Dispatch & Calls

**Calls** are the incidents, jobs, events and tasks your people respond to. Dispatching a call tells the right people and units about it — by push notification, text, email and voice — tracks who is responding and who is on scene, collects notes, photos and files, and closes with a disposition that feeds your records and reports.

![Calls dashboard](/img/web-app/dispatch/calls-dashboard.png)

## Where to find it

**Left menu → Calls.** The Calls page shows:

- **Unit statuses** — every unit with its current state and when it changed.
- **Active calls** — open calls with number, name, priority and time, plus **View**, **Update** and **Close** buttons.
- A **map** of active calls and units.
- **Pending calls** — a panel above Active calls, shown while any call is waiting for a dispatcher (see [Pending and scheduled calls](#pending-and-scheduled-calls)).
- Buttons for **Routes**, **Archived calls**, **Pending calls** and **Scheduled calls** (each with a count badge while calls are waiting) and **New Call**.

## Creating a call

**New Call** (the same form is used by the Dispatch app and by email/SMS import).

![New call](/img/web-app/dispatch/new-call.png)

| Field | What to enter |
|---|---|
| **Name** | Short title — this is the headline in every notification (`Structure Fire - 1450 Pine Ridge Rd`). |
| **Priority** | Low, Medium, High, Emergency or your [custom priorities](types-configuration#call-priorities). Priority decides the notification sound, colour and whether the call overrides quiet hours in the apps. |
| **Type** | Fire, Medical, Rescue … from your [call types](types-configuration#call-types). Type drives protocols, run cards, NERIS crosswalk and reporting. |
| **Reporter name / contact info** | Who called it in. |
| **Primary / additional contacts** | Link [Contacts](contacts) (a premises, a client, a company). Contacts with **alert notes** pop up a warning. |
| **Call identifier / Incident Id / Reference Id** | External CAD, parent incident and partner numbers for cross-referencing. |
| **Nature of the call** | The dispatch text; rich text supported. |
| **Notes** | Additional notes. |
| **Map page** | Map-book reference. |
| **Location** | Type an address and **Find Address**, enter a **what3words** address, enter latitude/longitude, or **Set pin on map**. Reverse geocoding fills the address from a pin. A call saved with an address but no pin is geocoded when it is created, so run cards and maps still get a location. |
| **Destination** | A point of interest such as a hospital, shelter, transfer centre or staging area (from [Mapping → POIs](mapping#points-of-interest)). |
| **Indoor location** | A zone from an [indoor map](indoor-maps). |
| **Protocols** | Matching [dispatch protocols](protocols) are listed; answer their questions to attach guidance. |
| **Call links** | Link related calls. |
| **Personnel / Groups / Roles / Units tabs** | Who to dispatch (see below). |
| **Call template** | Load a [quick template](templates) to pre-fill the form. |
| **Check-in timers** | Enable [accountability timers](call-checkin-timers) for this call. |
| **Schedule dispatch** | Delay the dispatch to a future time (at least 15 minutes ahead) — the call appears under *Scheduled calls* until then and is sent automatically at that time. |
| **Save as pending** | Save the call without dispatching it: nobody is notified and it waits under *Pending calls* until a dispatcher sends it. Any recipients you tick are kept as the proposed dispatch. Overrides *Schedule dispatch*. |
| **Custom fields** | Any [User Defined Fields](user-defined-fields) configured for calls. |

![Schedule dispatch and Save as pending on New Call](/img/web-app/dispatch/new-call-save-as-pending.png)

### Who gets dispatched

Tick any combination of:

| Target | Effect |
|---|---|
| **Personnel** | Named members. The grid shows ETA to the call, current status, staffing and roles. |
| **Groups** | Every member of a station or group. With **Dispatch shift instead of group** on (Department Settings), only members signed up for today's shift are dispatched. |
| **Roles** | Every member holding a role (e.g. *Driver*, *Paramedic*). |
| **Units** | Apparatus and their crews. |

If [Run Cards](run-cards) are enabled, the recommendation for the call's priority/type is pre-filled here (or dispatched automatically). The recommendation panel refreshes when you change the priority or type and again as soon as the call is placed (Find Address, what3words, a map click or dragging the pin), so you can pick the type first and the location second. Units it recommends show their distance and, in closest-unit mode, their response time in minutes.

### Nearest units

Once the call has a location, the **Nearest Units** table lists every unit you may see (a unit can be a team, an apparatus or an individual):

![Run card recommendation and Nearest Units for a placed call](/img/web-app/dispatch/new-call-nearest-units.png)

| Column | Shows |
|---|---|
| **Unit** | Name, unit type, station and service area, and a badge when the call is inside the unit's own (or parent) boundary. |
| **Status** | Current status, green when available. |
| **ETA** | Time to the call. When the department sets [turnout times](run-cards#how-closest-unit-mode-measures-a-unit) it is the full response time, with *incl. N s turnout* underneath. *est.* marks a straight-line estimate; without the mark it is a routed drive time (Dispatch Settings → *Order by driving ETA*). Distance in km below. |
| **Position** | *Live GPS* or *Station location*. A unit in an **In Quarters** status, or with no GPS position, is placed at its station. A GPS position older than the maximum location age is marked **stale**. |
| **Shift / Role mix** | Crew on shift and the roles they hold. |

Available units come first, ordered by response time — the fastest unit is at the top. A stale position is flagged on the row but does not push the unit down the list. Units with no position at all, and unavailable units, come last.

Press **Create Call**. Notifications go out immediately through the queue: push to the apps, SMS, email and voice according to each member's [notification preferences](profile-account#notifications) and [contact verification](../configuration/contact-verification) status. Notification text is generic when the department is enrolled in [Advanced Data Protection](data-protection). A call saved as pending or scheduled for later sends nothing until it is dispatched, and opens on the *Pending calls* page instead of the Calls dashboard.

## Working an active call

**View** opens the call page.

![View call](/img/web-app/dispatch/view-call.png)

| Panel | What you can do |
|---|---|
| **Call details** | Everything entered above, with the dispatch audio if the call came from a radio/TTS source. |
| **Map** | Call location, responding personnel and units live, route lines. |
| **Dispatched personnel / units** | Who was dispatched, their current status and timestamps (responding, on scene …). |
| **Notes** | Add notes (with your location if allowed); **flag** a note for follow-up with a reason. |
| **Images and files** | Attach photos, documents, audio and video up to 10 MB; flag inappropriate items for [moderation](chat#moderation). |
| **Check-in timers** | PAR / rehab / IC / hazmat countdowns with **Check In** buttons and history. |
| **Incident report** | Start the [NERIS incident report](records/incident-reports) or a [Run record](records/authoring). |
| **Export** | Printable call export, PDF, and a shareable anonymous export link. |

**Update** changes any field, adds or removes dispatch targets (only the differences are applied) and can **rebroadcast** the notification. When the department uses [Run Cards](run-cards), a **Run card** panel above the dispatch lists shows what the call's run card still needs at its current alarm level, after the units and people already on the call; it follows the priority, type and location on the form, so changing them before saving updates it. **Select recommended** ticks those units and people in the lists; nothing is ticked on its own, so saving another change never adds resources, and nothing is sent until you save. **Close** asks for a **close state** (Completed, Cancelled, Unfounded, False alarm …) and closing notes. Tick **Send notification** to tell everyone on the call that it is closed: the personnel, groups and roles it was dispatched to (Responder app, text and email per their notification settings), its units (Unit app) and the incident command team — commander, people holding incident roles, and the people and units on the command board (Incident Command app). The notice names the call and how it was closed; the closing notes are not sent. Closed calls move to **Archived calls** and can be **re-opened**.

![Close call](/img/web-app/dispatch/close-call.png)

A call that is being run under an **active incident command** cannot be closed from here, the API, the chatbot or the auto-close job: close the command first. In the Incident Command app, **End Command** has an **Also close the call** option (with its own *Notify everyone on the call* switch) that closes the call right after the command; offline, both are queued and the call closes only once the command has.

![Close call refused while an incident command is active](/img/web-app/dispatch/close-call-incident-command.png)

### Closing a call automatically

With **Close call when last unit clears** on ([Dispatch Settings](department-settings#call--dispatch-settings), off by default), an active call closes on its own when the last unit dispatched to it goes from working the call to back in service or out of service: a status whose [base type](../configuration/custom-statuses) is Available, In Quarters, Cleared, Completed or On Patrol, or Unavailable, Not Responding or Maintenance. An ambulance going *On Scene, Departing to Hospital, Arrived Hospital, Radio Available* closes the call when it reports *Radio Available*, as long as every other unit on the call has also cleared.

The call stays open for the dispatcher to close when:

- another unit on the call is still working it (returning, transporting, at the hospital), or has not reported a status since it was dispatched;
- the call has an active incident command, or no unit was dispatched to it (only units count, not personnel, groups or roles);
- the status has no base type, or the unit was not working the call (an available unit going out of service closes nothing);
- the status was set by Resgrid itself (dispatch and release statuses), or is an offline status replayed later.

The call is closed as **Closed** with a note naming the last unit, by the member who set that status. Release statuses are applied as on any close (units that cleared keep their statuses), the **Call Closed** workflow trigger fires, and nobody is notified. Calls where units skip statuses (no patient found, false alarm, patient deceased on scene) are still closed by the dispatcher.

Closing a call, by hand or automatically, never overrides a unit someone took out of service: the [release status](department-settings#call--dispatch-settings) only moves units still working the call.

**Delete** soft-deletes a call with a reason (it can be restored by support).

### Which call a status belongs to

Crews often set a status without choosing a call: they tap *On Scene* and carry on. Resgrid then puts the status on the call the unit or person is working, so it shows on that call's record and counts toward its times. In order:

1. **A call they chose** is kept.
2. **The call of their previous status**, while that call is open and the previous status did not clear it. *On Scene* after *Responding* to call 26-153 goes on 26-153, and so does the *Available* that ends it (that records when the unit cleared).
3. **The one open call they are dispatched to**, for a status that is not itself a clear. Calls their last clear already ended are left out:
   - a clear that named a call ended that call;
   - a clear that named no call (back in quarters, available at a station, or no destination at all) ended every call they had been sent to before it. Only a dispatch, or a re-dispatch, after that clear is new work.

   With more than one call left, the status is not linked to any.

A *clear* is a status whose [base type](../configuration/custom-statuses) is Available, In Quarters, Completed, On Patrol, Cleared, Returning, Unavailable, Not Responding or Maintenance, plus the built-in unit statuses Available, Unavailable, Out of Service, Returning, Cancelled and Released and the built-in personnel statuses Available, Not Responding and Available Station.

For example, Medic 12 is dispatched to 26-153, clears *In Quarters* at its station while 26-153 stays open for the engine, then reports *Responding* without picking a call. That status is not put on 26-153. If Medic 12 has been dispatched to 26-160 since it cleared, the status goes on 26-160.

Some statuses are placed differently:

- A person put on a unit by a unit status goes on that unit status's call.
- A [scheduled call](#pending-and-scheduled-calls) counts only once it has gone out or its dispatch time has passed, and a pending call only once it is dispatched. Statuses set before then are not linked to it.
- A status replayed from an app's offline queue skips steps 2 and 3 when it arrives. The call record still shows statuses without a call that a dispatched unit or person set while working it, placed by their own time.

The same rules pick the call a unit's next status starts on in the [Dispatch app](../apps/dispatch#personnel--unit-action-panels).

## Pending and scheduled calls

Two kinds of call can wait before anyone is notified:

- **Pending calls** have no dispatch time. They wait until a dispatcher picks one up, chooses who to send it to and dispatches it — the typical use is follow-up work fed in from another system (a case-management or scheduling system, a referral line) or calls taken now for a team to pick up later.
- **Scheduled calls** have a dispatch time and are sent automatically when it arrives.

Both show as count badges on the **Pending calls** and **Scheduled calls** buttons of the Calls dashboard, and pending calls also get a panel above Active calls (see the screenshot at the top of this page).

**How a call becomes pending:** tick **Save as pending** on New Call (web or the [Dispatch app](../apps/dispatch)), or create it through the API with `"IsPending": true` (see [Technical reference](#technical-reference)). A pending call is numbered and saved like any other call, but:

- nobody is notified, and dispatch statuses are not applied;
- it does not appear in the active calls lists, on maps, the Big Board or the Responder and Unit apps;
- it does not count as active or archived; it is listed only under **Pending calls**;
- the New Call form's dispatch-list and dispatch-time requirements (Department Settings → *New call form fields*) do not apply to it — the dispatcher chooses recipients when sending it; every other required field still does.

**Pending calls page** (the **Pending Calls** button on the Calls page, or **View all** on the dashboard panel) lists waiting calls oldest first with **View**, **Update**, **Dispatch Now**, **Close** and **Delete**.

![Pending calls](/img/web-app/dispatch/pending-calls.png)

**Working a pending call**

| Action | What happens |
|---|---|
| **View** | The call page shows a *Pending* banner and a **Dispatch Now** button; Re-Open and Strike Alarm are not offered. |
| **Update** | Edit any field and pick who to send it to. Saving keeps it pending and notifies nobody; **Save and Dispatch Now** saves and sends it in one step. |
| **Dispatch Now** | Sends the call to everyone on its dispatch list. If the list is empty you are taken to *Update* to choose recipients first. |
| **Schedule** | Give it a *Schedule dispatch* time on *Update*: it becomes a scheduled call. |
| **Close** | Cancel it (or close it with any close state) without notifying anyone. |

![A pending call: banner and Dispatch Now](/img/web-app/dispatch/view-call-pending.png)

**When a waiting call is dispatched** it becomes an active call, its dispatch time is recorded separately from the time it was received, run card auto-dispatch is applied, notifications go out, and dispatch statuses are set. For a pending call this is also when the **Call Added** [workflow](workflows) trigger fires and the call's incident chat channel is created (when chat is on), not when it was saved.

**Scheduled calls page** (the **Scheduled Calls** button on the Calls page) lists calls waiting for their time, with **View**, **Update**, **Dispatch Now** (send early), **Close** and **Delete**. A scheduled call is sent within five minutes of its time by the scheduled-calls job. Adding or removing recipients before then notifies nobody — the updated list is used when it goes out. Until then the units and people on its list are not on the call: a status they set is not [linked to it](#which-call-a-status-belongs-to), and it is not the call a unit's next status starts on in the Dispatch app. A scheduled call closed before its time is never sent.

![Scheduled calls](/img/web-app/dispatch/scheduled-calls.png)

The [Dispatch app](../apps/dispatch) has the same two lists, with tiles on its console.

## Archived calls

**Archived calls** — closed calls by year, with view and export. **Add archived call** creates a historical call with a custom date and pre-set closed state (optionally recalculating the year's call numbers with your department's [call number pattern](department-settings#call-numbering); not available for a pattern with no year) — useful when importing history or logging a call that happened outside Resgrid. New calls are numbered with that pattern too. Pending calls are never listed here.

![Archived calls](/img/web-app/dispatch/archived-calls.png)

## Other ways calls arrive

| Source | How to set it up |
|---|---|
| **Email** | Send or forward CAD pages to your department's dispatch import address ([Call import settings](department-settings#call-import-settings)); choose the parser format for your CAD. |
| **SMS / text** | Text to the department number ([Text messaging](department-settings#text-messaging)). |
| **Dispatch app** | Same form on tablet or desktop. |
| **API** | `api/v4/Calls/SaveCall` with an API key or OAuth token. Add `"IsPending": true` to queue it under *Pending calls* for a dispatcher instead of dispatching it. |
| **Workflows / Assistant** | Workflow actions and the chat Assistant can create calls when allowed. |
| **Voice** | Automated voice dispatch reads the call out over the phone or radio TTS. |

## Setup examples

| Department | Recommended call configuration |
|---|---|
| **Volunteer fire** | Priorities Low/Medium/High/Emergency; types Fire, Medical, MVA, Rescue, Alarm, Public assist; dispatch to Groups (stations) with *Dispatch shift instead of group* off; email import from county CAD; run cards for structure fires. |
| **Career fire / combination** | Run cards with auto-dispatch; closest-unit mode; check-in timers (PAR every 20 min) on Fire types; NERIS crosswalk for every type. |
| **EMS** | Types by determinant (ALS/BLS/IFT); dispatch to Units; destination POIs for hospitals; ADP enrolled. |
| **SAR** | Types Search, Rescue, Recovery, Training; dispatch to Roles (Team leader, K9, Technical rescue); what3words locations; long check-in timers for field teams. |
| **Emergency management** | Types Activation, Weather, Shelter, Resource request; dispatch to Roles (ESF leads) and Groups (EOC sections); scheduled calls for planned activations. |
| **Security / facilities** | Types Alarm, Patrol request, Escort, Medical, Incident; contacts for client sites with alert notes and gate codes; indoor locations. |
| **Behavioral health / crisis teams** | Types Crisis evaluation, Welfare check, Follow-up, Referral; follow-ups pushed from the case-management system as **pending calls** through the API, dispatched by a dispatcher to the closest team; teams as Units with Clinician and Peer seats; check-in timers on field visits; [Advanced Data Protection](data-protection) and the *42 CFR Part 2* consent flag. |
| **Delivery / transit** | Types Delivery, Pickup, Breakdown, Route deviation; dispatch to Units (vehicles); destination POIs; link calls to [Routes](routes). |

## Technical reference

| Item | Value |
|---|---|
| Controller | `DispatchController` |
| Routes | `/User/Dispatch/{Dashboard,NewCall,ViewCall,UpdateCall,CloseCall,DeleteCall,ReOpenCall,ArchivedCalls,AddArchivedCall,ScheduledCalls,PendingCalls,CallData,CallExport,CallExportEx,CallExportPdf,GetCallDispatchAudio}` (`?callId=`); `DispatchCallNow` (POST, antiforgery, `callId`) |
| Call states | `CallStates`: 0 Active, 1 Closed, 2 Cancelled, 3 Unfounded, 4 Founded, 5 Minor, 6 Transferred, 7 False alarm, **8 Pending**. A scheduled call is Active with `DispatchOn` in the future and `HasBeenDispatched = false`. |
| Pending / scheduled | `IPendingCallsService` (`IsWaitingForDispatch`, `DispatchNowAsync`); scheduled calls sent by the worker `DispatchScheduledCallsTask` every 5 minutes (calls due in the last 15 minutes, active only) |
| Status linking | `ICallStatusAttributionService`: `AttributeUnitStateAsync` / `AttributeActionLogAsync` on save (rules 2 and 3 only for statuses at most five minutes old, `CallStatusAttribution.IsLiveStatus`), stored as `DestinationSource` (`StatusDestinationSources` Explicit, CarryForward, Dispatch, Unit); read-time `Inferred` statuses are never stored. Rules in `CallStatusAttribution` (`CanCarryForward`, `ClearedByPrevious`, `PickDispatchCall`); clears per `CallStatusLinkage.IsClearingUnitState` / `IsClearingPersonnelStatus`. Open dispatches from `ICallDispatchUnitRepository.GetOpenCallUnitDispatchesForUnitAsync` and `ICallDispatchesRepository.GetOpenCallDispatchesForUserAsync` (direct, group and role rows; time = `LastDispatchedOn` else `DispatchedOn`; active calls only, a scheduled call once `HasBeenDispatched` or `DispatchOn` ≤ now). The Dispatch app's starting call is v4 `UnitsInfoResultData.ActiveCallId` (`GetWorkingCallIdsForUnitsAsync` → `UnitCallInvolvement.ResolveWorkingCallId`); null means no single working call, not that the unit is unassigned. |
| Policies | `Call_View`, `Call_Create`, `Call_Update`, `Call_Delete` + `IAuthorizationService.CanUser{Create,Edit,Close,Delete}CallAsync` |
| Permissions | `CreateCall`, `DeleteCall`, `CloseCall`, `AddCallData` |
| Events | `CallAddedEvent`, `CallUpdatedEvent`, `CallClosedEvent`; broadcast via `IQueueService.EnqueueCallBroadcastAsync` (push/SMS/email/voice) |
| Closing | `ICallAutoCloseService` (setting 116 `CloseCallWhenUnitsClear`, run from `UnitsService.SetUnitStateAsync` for unit reports only; `UnitCallInvolvement.HasFinishedCall` = Available or Unavailable availability class). Release statuses skip units per `UnitCallInvolvement.KeepsStatusOnRelease` or on another open call. `ICallClosureService`: `GetBlockingIncidentCommandAsync` (an active `IncidentCommand` on the call blocks every close path: web, v4 `CloseCall`, chatbot, auto-close), `NotifyCallClosedAsync` (Send notification; push event code `NC:{callId}` — leads with `N` so it is sent as an ordinary notification, not a critical call alert — opens the call in the apps; Unit app gets the notification sound, never the dispatch tone; IC-app push for the command team) |
| Data endpoints | `GetActiveCallsList`, `GetArchivedCallsList?year=`, `GetScheduledCallsList`, `GetPendingCallsList`, `GetWaitingCallCounts`, `GetCallNotes`, `GetPersonnelForCall`, `GetAllDispatchesForCall`, `GetMapDataForCall`, `GetCallTypes`, `GetCallPriorities`, `GetCallsForSelectList`, `GetCoordinatesFromW3W`, `GetAlertNotesForContact`, `GetDispatchRecommendation`, `GetNearestUnits?latitude=&longitude=`, `CallsYTD`, `CallsTypesInRange`, `CallsStatesInRange` |
| Attachments | 10 MB; images jpg/jpeg/png/gif/bmp; documents pdf/doc/docx/ppt/pptx/xls/xlsx/txt; audio mp3/m4a/ogg/wav; video mp4/m4v/mov/wmv/avi/mpg |
| Soft delete | `IsDeleted`, `DeletedOn`, `DeletedByUserId`, `DeletedReason` |
| Protected data | Name, nature, notes, address and attachments are ADP-protected fields |
| API | `api/v4/Calls/*`. Pending and scheduled: `POST SaveCall` with `IsPending` (empty `DispatchList` = no proposed recipients; `"0"` = everyone; `DispatchOn` ignored), `GET GetPendingCalls`, `PUT DispatchCallNow` `{ "CallId", "DispatchList"? }` (pending or not-yet-sent scheduled call; 400 when it is not waiting or has nobody to send to), `GET GetAllPendingScheduledCalls`, `PUT UpdateScheduledDispatchTime`. Scheduled: `DispatchOn` (department local time) or `DispatchOnUtc` (UTC; wins when both are sent). `EditCall` accepts a pending call and notifies nobody; `CloseCall` takes close states 1–7 and `SendNotification`, and returns 400 while an incident command is active. Integrations can use a [department API key](../api/authentication#department-api-keys) instead of a member's login. |
