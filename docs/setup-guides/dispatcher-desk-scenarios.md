---
sidebar_position: 13
title: Dispatcher Desk Walkthroughs
---

# Dispatcher Desk Walkthroughs

The [dispatcher desk](../web-app/dispatcher-desk) offers pending calls, scheduled calls, texts and phone calls to the dispatchers on duty in the [Dispatch app](../apps/dispatch#dispatcher-desk), one at a time, and keeps their breaks covered. These walkthroughs show how eight different kinds of organization set it up, and what a day on the desk looks like for each. Pick the one closest to you; the settings mix and match.

Every setting named here is on **Shifts → Dispatcher Desk Settings** unless it says otherwise. The full list, with defaults and limits, is in [Desk settings](../web-app/dispatcher-desk#desk-settings).

## Before any walkthrough

These steps are the same for everyone:

1. **Create a *Dispatcher* role** (Personnel → Roles) and give it to everyone who will work the desk.
2. **Limit who is a dispatcher.** On **Department menu → Security and Permissions**, set **Dispatch app login** to **Admins + selected roles** and tick *Dispatcher*. Only these members can be put on a dispatch roster or sign in to the desk.
3. **Install the Dispatch app** on each dispatcher's phone, tablet or computer, sign in, and allow notifications. On a phone, allow critical alerts too.
4. **Check phone numbers.** The desk rings a dispatcher's phone to connect callers: each dispatcher's profile mobile number should be right, or they enter a **Callback number** when signing in.
5. **Turn routing on** last: tick **Route work to on-duty dispatchers** once rosters are ready. Until then, rosters and breaks work but nothing is offered.

## 1 — Volunteer fire department: dispatchers on their phones {#volunteer-fire}

### Who and why

A rural volunteer department. The county 911 center dispatches emergencies, which arrive by email and page everyone at once. The department also gets **non-emergency** work it has to handle itself: residents texting or calling the department's number (the text-to-call number on **Text Messaging**) about a downed branch or a burn permit, the chief's pending calls for "check the hydrant on Elm when someone is free", standbys for the Friday football game. Volunteers take turns covering the desk **from home, on their phones**, in the evenings and at weekends.

### Settings

| Setting | Value | Why |
|---|---|---|
| **Send to the desk** | **Pending calls**, **Scheduled calls**, **Text messages**, **Phone calls** | Emails stay out: county pages are emergencies. |
| **Emailed calls** | **Dispatch immediately** | County pages still go straight out to everyone. |
| **Items per dispatcher** | 1 | One volunteer, one thing at a time. |
| **Offer timeout (seconds)** | 60 | Time to find the phone. |
| **Missed offers before away** | 2 | A volunteer who has stepped away is set Away, and work waits for the next one. |
| **Escalate waiting work after (minutes)** | 5 | With no desk supervisor on duty, the department's administrators (the chief) are told too. |
| **Heartbeat timeout (minutes)** | 0 | Phones sleep; push still reaches them. |
| **Text messages** (overflow) | **Keep it waiting in the queue** | No Enhanced AI needed. |
| **Phone calls** (overflow) / **Hold callers for** | **Voicemail into a pending call** / 20 | A caller nobody answers leaves a message that becomes a pending call. |
| **Minimum available** | 0 | Only one dispatcher at a time, so a break never "drops below" anyone. |

### Roster and breaks

1. **Shifts → New Shift**: *Desk: Evenings*, **Sign-up** shift, 18:00 to 23:00, Monday to Friday. On the **Dispatchers** tab tick **This shift takes dispatchers** and **Dispatch-only shift**, **Dispatchers needed** 1. No break plan: the shifts are short.
2. A second Sign-up shift, *Desk: Weekends*, 08:00 to 20:00, Saturday and Sunday. No break plan either: a volunteer who needs a break presses **Take break** → **A new break now**, and work waits in the queue until they are back.
3. Volunteers open a shift day and press **Sign up as dispatcher**.

### A day on the desk

- **18:00** Maria, signed up for Tuesday evening, opens the Dispatch app → **Dispatcher Desk** → **Sign in to the desk**. (Before 18:00 she is not on duty yet, and the desk would refuse the sign-in.) Her profile mobile is right, so she leaves **Callback number** empty.
- **19:12** A resident texts the department number: *Big branch down across Elm Rd near the church.* Maria's phone buzzes and shows **Work offered to you**. She taps **Accept**, reads the text and replies *Thanks, we'll send someone to look.* She presses **Create call**, which opens New Call filled in from the text, adds the address and sends it to the duty officer. Back on the item, she presses **Complete** → **Call created**.
- **20:35** The chief, at home, saves *Hydrant 114 leaking* as a pending call in his Dispatch app for someone to deal with tonight. It is offered to Maria straight away. She calls the water department, presses **Complete** → **Referred elsewhere** with a note, and closes the call from **Open call**.
- **21:30** Maria needs to drive her daughter home, so she presses **Away** on the status bar. Work waits in the queue meanwhile. Back home, **Go available**.
- **23:00** Her shift ends and the desk signs her off (**Sign off at the end of the shift**).

### Tips

- If you have more volunteers than slots, set **Dispatchers needed** to 2 and both get offers in turn.
- Let a volunteer who is going to be busy sign in with **Start as away**, then **Go available** when ready.
- The **Activity** report shows how long texts waited for an answer: a good number to share at the monthly meeting.

## 2 — Career fire / EMS: 24/7 dispatch, staggered lunches, minimum coverage {#career-fire-ems}

### Who and why

A combination fire and EMS department running its own dispatch center around the clock: four dispatch shifts (A to D) on 12-hour rotations, three dispatchers each, one of them the shift's senior dispatcher. Two must stay on the desk at all times. The desk takes the non-emergency side: interfacility transfers booked as [recurring calls](../web-app/scheduled-calls), pending transfer requests from the hospitals' [email intake channel](../web-app/intake-channels/overview), and texts to the department number. Lunches have to be staggered so that two dispatchers are always available.

### Settings

| Setting | Value | Why |
|---|---|---|
| **Send to the desk** | **Pending calls**, **Scheduled calls**, **Text messages** | |
| **Scheduled call review (minutes before)** | 30 | Transfers come up for a check half an hour ahead. |
| **Items per dispatcher** | 2 | A dispatcher can hold a transfer and a text at once. |
| **Offer timeout (seconds)** | 30 | Dispatchers are at their consoles. |
| **Escalate waiting work after (minutes)** | 2 | |
| **Heartbeat timeout (minutes)** | 5 | Desktop consoles do not sleep; a console that drops off stops getting offers. |
| **Minimum available** | 2 | |
| **Prevent breaks below the minimum** | On | Only the desk supervisor can start a break that leaves fewer than two. |
| **Break reminder (minutes before)** | 10 | |
| **Auto return after (minutes)** | 10 | A dispatcher who forgets **I'm back** is made available 10 minutes after their break ends. |
| **Tell supervisors when a dispatcher is late back** | On | |
| **Emailed calls** | **Dispatch immediately** | Mutual-aid pages from the county still go straight out. |

### Roster and breaks

1. Four **Assigned** shifts, *Dispatch A* to *Dispatch D*, 07:00 to 19:00 (days) or 19:00 to 07:00 (nights) on your rotation, each with **This shift takes dispatchers** and **Dispatch-only shift**.
2. **Dispatchers needed** 3, **Minimum on desk** 2, **Dispatchers plan their own breaks** off.
3. **Break plan**: *Break 15* at 120, *Meal 30* at 330, *Break 15* at 570 (minutes after the shift starts).
4. **Dispatch roster**: tick the three dispatchers of each platoon, and **Desk supervisor** for the senior dispatcher.

### A day on the desk

- **07:00** As the shift starts, the A shift signs in on their consoles with **Start as away** while they take handover, then press **Go available** at 07:10. The night shift is signed off automatically as their shift ends, and anything they still held goes back to the queue.
- **07:05** Lee, the desk supervisor, opens today's shift day → **Break planner** → **Plan breaks**. *9 breaks planned.* The three dispatchers' lunches land at 12:30, 13:00 and 13:30, so two are always on the desk. The **Warnings** list is empty.
- **08:15** A transfer (a recurring call) comes up for review 30 minutes ahead. It is offered to Sam, who checks the patient is ready. At 08:45 the call goes out by itself and the item leaves the desk.
- **09:05** Priya gets *Your Break starts in 10 min*. At 09:15 she presses **Take break**, ticks **Return my work to the queue (held: 1)**, and her pending transfer request goes back to the queue, where Sam takes it.
- **12:40** Sam tries to start his lunch early while Priya is still on hers. With Sam gone only Jordan would be left, so the app says *Coverage is too low to start your break now. A desk supervisor can start it for you.* He waits for Priya.
- **13:00** Priya's lunch has run its 30 minutes, but she is not back. At 13:10 the desk returns her automatically, and Lee is told.
- **Weekly** Lee opens **Shifts → Dispatcher Activity** to check the average time to answer and any missed breaks.

### Tips

- Rerun **Plan breaks** with **Replace planned breaks** when someone calls in sick and the day's roster changes.
- Keep the 911 phones and radio on your existing systems: the desk handles the work that reaches Resgrid.
- Give the floor supervisor the web **Dispatcher Desk** board on a wall screen: it shows who is on break, who is busy, and the coverage strip.

## 3 — Search and rescue: the on-call dispatcher {#search-and-rescue}

### Who and why

A volunteer SAR team. The sheriff's office emails search requests, and families sometimes call or text the team's number. Before paging 40 members, the **on-call coordinator** of the week checks each request. There are no dispatch shifts: whoever is on call carries the desk on their phone, often from the field.

### Settings

| Setting | Value | Why |
|---|---|---|
| **Dispatchers must be on a shift** | Off | Whoever signs in is on duty; no roster to keep. |
| **Send to the desk** | **Pending calls**, **Text messages**, **Phone calls**, **Emails (calls saved as pending)** | |
| **Emailed calls** | **Save as pending** | The sheriff's requests wait for the coordinator instead of paging everyone. |
| **Items per dispatcher** | 2 | |
| **Offer timeout (seconds)** | 90 | The coordinator may be driving or on a trail. |
| **Missed offers before away** | 3 | |
| **Escalate waiting work after (minutes)** | 10 | Then the team's administrators are told too. |
| **Phone calls** (overflow) / **Hold callers for** | **Voicemail into a pending call** / 30 | |
| **Minimum available** | 0 | |

### Roster and breaks

No shifts and no break plan. The coordinators agree a weekly rotation on the team calendar; at handover the outgoing coordinator presses **Sign off** and the incoming one signs in.

### A day on the desk

- **Monday 08:00** Alex takes the on-call week: **Sign in to the desk**, **Callback number** his satellite-capable phone.
- **Tuesday 14:20** The sheriff emails an overdue hiker request. It becomes a pending call and is offered to Alex as an **Email**. He reads it, presses **Open call**, adds the trailhead and dispatches it to the *Ground searcher* and *Team leader* roles, then **Completes** the item as **Call created**.
- **Tuesday 15:05** The hiker's sister calls the team number. The call is offered to Alex, but he is on the radio; after 30 seconds she is sent to voicemail, and her message becomes a pending call with the recording. Alex listens to it when he is free and phones her back.
- **Wednesday 03:10** A text arrives while Alex is asleep and the offer runs out. The text waits as a pending call, and when it has waited 10 minutes the team's administrators are alerted too. After two missed offers in a row the desk sets Alex **Away**, until he presses **Go available** in the morning.

### Tips

- With **Dispatchers must be on a shift** off, anyone with Dispatch app login who signs in gets offers. Keep that permission to the coordinators.
- A second coordinator can sign in as backup at big searches: offers go to whoever is free.
- **Save as pending** also suits teams that the sheriff calls for "standby only" requests that may never need a page.

## 4 — Multi-agency dispatch center: desk supervisors and text conversations {#multi-agency}

### Who and why

A regional center dispatching for six fire and EMS agencies ([Multi-agency dispatch center](multi-agency-dispatch-center)). Day and night shifts of six dispatchers with two desk supervisors. The public texts the center's [Private Inbound Dispatch Number](../web-app/intake-channels/dedicated-number) for non-emergency matters, and partner agencies send requests to [email intake channels](../web-app/intake-channels/overview). The center has Enhanced AI.

### Settings

| Setting | Value | Why |
|---|---|---|
| **Send to the desk** | All | |
| **Items per dispatcher** | 3 | A dispatcher can carry several text conversations. |
| **Offer timeout (seconds)** | 30 | |
| **Escalate waiting work after (minutes)** | 2 | |
| **Text messages** (overflow) | **Enhanced AI fills in a pending call** | |
| **Phone calls** (overflow) | **Enhanced AI voice intake** | |
| **Emailed calls** | **Enhanced AI into pending** | Partner agencies' emails to the center's dispatch address are read into pending calls. |
| **Minimum available** / **Prevent breaks below the minimum** | 4 / On | |
| **Auto return after (minutes)** | 5 | |

On **Department menu → Intake Channels**, edit *Dispatch number SMS …* and set **Processing** to **Enhanced AI**, so Enhanced AI asks texters for their location until a dispatcher connects.

### Roster and breaks

1. Two **Assigned** dispatch-only shifts, *Center Days* 07:00 to 19:00 and *Center Nights* 19:00 to 07:00, **Dispatchers needed** 6, **Minimum on desk** 4.
2. Break plan: *Break 15*, *Meal 30*, *Break 15*, all left blank (spread evenly).
3. Standing roster per shift with **Desk supervisor** ticked for the two floor supervisors.
4. A desk supervisor presses **Plan breaks** at the start of each shift; the planner lets at most two dispatchers be on break at once (six on duty, minimum four).

### A day on the desk

- **09:30** A resident texts the private number: *There's a dog loose on the highway near exit 12.* A pending call is created and Enhanced AI replies, asking for the direction of travel. The item is offered to Kim.
- **09:31** Kim **Accepts**. The texter gets *You are now connected with Kim. Please describe the situation you are having and your location.* and the AI goes quiet. Kim replies, presses **Open call**, sets the call type to *Animal* and dispatches the county's animal control unit. Back on the item she presses **Complete** → **Call created**, with **Tell the texter the conversation ended** on.
- **11:15** A text arrives: *WIN A FREE CRUISE reply YES*. Enhanced AI labels the call *Enhanced AI: likely not an incident*, so it is not offered: it waits on **Waiting**. Supervisor Dev opens the call and presses **Dismiss as spam** with the sender blocked for 30 days. The call is cancelled, the conversation ends without a reply, and the item leaves the desk.
- **14:00** Kim has to leave early. Dev hands her two open conversations to Ravi with **Hand over** and a note, and Kim signs off.
- **19:00** The night shift signs in; the day shift's held work goes back to the queue at shift end and is offered to the night shift.

### Tips

- Desk supervisors see **Transfer** and **Return to queue** on everyone's work on the web board.
- Partner agencies' requests through email intake channels arrive as pending calls with *via Email: …* in the banner, so dispatchers see who asked.
- Check the **Blocked senders** list on Intake Channels from time to time; blocks end by themselves after 30 days.

## 5 — Campus or hospital security and facilities: duty without a shift {#security-facilities}

### Who and why

A university's security and facilities team. Officers on patrol carry the **dispatch phone** in turns; there is no fixed dispatcher shift. Students text the number printed on parking permits and residence hall doors (a Private Inbound Dispatch Number), facilities requests come in from a Microsoft Teams channel, and escorts and building lock-ups are booked as scheduled and recurring calls.

### Settings

| Setting | Value | Why |
|---|---|---|
| **Dispatchers must be on a shift** | Off | Whoever carries the dispatch phone signs in and is on duty. |
| **Send to the desk** | **Pending calls**, **Scheduled calls**, **Text messages**, **Phone calls** | |
| **Scheduled call review (minutes before)** | 15 | Escorts and lock-ups come up a quarter of an hour ahead. |
| **Items per dispatcher** | 3 | |
| **Offer timeout (seconds)** | 45 | |
| **Minimum available** | 1 | |
| **Text messages** (overflow) | **Keep it waiting in the queue** | |

A Microsoft Teams [intake channel](../web-app/intake-channels/overview#channel-types) *Facilities requests* with **Default priority** *Low*, so those requests come to the desk as pending calls.

### Roster and breaks

No dispatch roster. Hand the desk over with breaks: the officer taking a meal presses **Take break** with **Return my work to the queue**, a colleague signs in on their own phone, and work moves to them.

### A day on the desk

- **07:00** Officer Diaz signs in on the dispatch phone.
- **08:45** A facilities request in Teams (*Room 210 heating not working*) becomes a pending call, offered to Diaz. She presses **Dispatch now**, picks the facilities unit, and the item completes as *Dispatched*.
- **17:45** The recurring *Library lock-up* (18:00) comes up for review. Diaz checks the library is empty; the call goes out by itself at 18:00 and leaves the desk.
- **21:15** A student texts the number: *Can someone walk me to Lot C from the library?* Diaz accepts, replies *An officer will meet you at the front doors in 5 minutes*, dispatches the escort from **Open call**, and completes the item as **Call created**.
- **23:00** Officer Chen signs in on her own phone first, so the desk stays covered. Diaz then presses **Take break** with **Return my work to the queue**; her held item is offered to Chen.

### Tips

- With no shifts, the **Activity** report is the record of who covered the desk and when.
- Use **Allow duty without a shift** instead (with **Dispatchers must be on a shift** on) if you have a scheduled dispatcher most of the time and only need cover now and then.
- Hospitals: put the security desk's internal extension on the Private Inbound Dispatch Number's signs only for non-emergencies; emergencies stay on the hospital's code line.

## 6 — Industrial emergency response team {#industrial}

### Who and why

A refinery's fire brigade. The control room operators double as dispatchers on the plant's existing 12-hour crew shifts, beside the brigade members. The plant alarm system emails emergencies (they must go out at once). The desk handles the planned work: **fire-watch requests** for hot-work permits, sent by the permit system through a [webhook intake channel](../web-app/intake-channels/overview#webhook-channels), and confined-space standbys booked as scheduled calls.

### Settings

| Setting | Value | Why |
|---|---|---|
| **Send to the desk** | **Pending calls**, **Scheduled calls** | |
| **Emailed calls** | **Dispatch immediately** | Alarm-system emails are emergencies. |
| **Scheduled call review (minutes before)** | 30 | Standby crews need time to suit up. |
| **Items per dispatcher** | 2 | |
| **Minimum available** / **Prevent breaks below the minimum** | 1 / On | |
| **Break reminder (minutes before)** | 5 | |

### Roster and breaks

1. On each crew shift (*A Crew* to *D Crew*, Assigned), tick **This shift takes dispatchers**. Leave **Dispatch-only shift** off: the same shift has the brigade.
2. **Dispatchers needed** 2, **Minimum on desk** 1.
3. **Dispatch roster**: the two control room operators of the crew, and the crew's shift supervisor as **Desk supervisor** (give the supervisor the *Dispatcher* role too).
4. Break plan: *Meal 30* and *Break 15*, both spread evenly. The supervisor runs **Plan breaks** at the start of the shift so the two operators never break together.

### A day on the desk

- **06:00** Both operators sign in at the control room console.
- **07:40** The permit system posts a hot-work permit for Unit 4. The webhook creates a pending call *Fire watch: Unit 4 welding*, offered to operator Burke. He presses **Dispatch now** and sends it to the fire-watch role; the item completes as *Dispatched*.
- **09:30** A confined-space entry scheduled for 10:00 comes up for review. Burke confirms the rescue standby crew is ready; the call goes out by itself at 10:00.
- **11:50** Operator Novak's meal is due. Burke holds an item, but Novak holds none, so her break starts at once; the desk never lets both go together.

### Tips

- Give the webhook an `externalId` per permit so a resent permit never creates a second call.
- Keep alarm-system emails on **Dispatch immediately**; use the desk for work a person should check first.

## 7 — Emergency management: EOC activation {#emergency-management}

### Who and why

A county emergency management agency activating its EOC for a winter storm. A call center of volunteers and staff takes residents' reports of damage and needs. Residents text or call the county's Private Inbound Dispatch Number; voice intake lets callers without a smartphone leave a report. Spontaneous volunteers turn up and need to help straight away.

### Settings

| Setting | Value | Why |
|---|---|---|
| **Allow duty without a shift** | On | A spontaneous volunteer can sign in with **Unscheduled duty** and **On duty until**. |
| **Send to the desk** | All | |
| **Items per dispatcher** | 3 | |
| **Escalate waiting work after (minutes)** | 5 | |
| **Text messages** (overflow) | **Enhanced AI fills in a pending call** | |
| **Phone calls** (overflow) | **Enhanced AI voice intake** | |
| **Minimum available** | 2 | |
| **Auto return after (minutes)** | 15 | |

On the Private Inbound Dispatch Number page, turn on **Create pending calls from texts** and **Take incident reports by voice**.

### Roster and breaks

1. Two **Sign-up** dispatch-only shifts, *EOC Call Center: Day* (07:00 to 19:00) and *Night* (19:00 to 07:00), added for the days of the activation, with approval required.
2. **Dispatchers needed** 4, **Minimum on desk** 2, **Dispatchers plan their own breaks** on.
3. Break plan: *Meal 30* at 360, *Break 15* and *Break 15* spread evenly. The EOC manager (a department admin, or a shift manager for the whole department) approves sign-ups on each day's page and runs **Plan breaks**.

### A day on the desk

- **06:30** Staff and volunteers sign up on the day's page; the EOC manager approves them.
- **07:00** Call takers sign in on the EOC's laptops; two registered volunteers sign in on their own phones from home.
- **09:10** A resident calls the number, presses 1, and answers the four spoken questions about a tree on her roof. A pending call is created and Enhanced AI fills in the address. It is offered to a call taker, who checks it and sends it to the *Public Works* group.
- **10:30** A spontaneous volunteer arrives. She is given the *Dispatcher* role and signs in with **Unscheduled duty** until 15:00.
- **12:55** Call taker Okafor moves her own lunch to 13:30 on **Breaks → Change**: the team timeline shows a gap at 13:30.

### Tips

- Turn the desk's routing on when the EOC activates and off when it stands down; rosters and history stay.
- After the event, the **Activity** report (up to 92 days) gives call volumes and answer times for the after-action report.

## 8 — CERT and event medical {#cert-event}

### Who and why

A CERT program running first aid and net control for a city marathon. Two volunteer dispatchers sit at the medical tent with a tablet. Course marshals and event staff (not CERT members) text the department number when a runner needs help; the dispatchers send the nearest roving first-aid team.

### Settings

| Setting | Value | Why |
|---|---|---|
| **Send to the desk** | **Pending calls**, **Text messages** | |
| **Items per dispatcher** | 3 | |
| **Offer timeout (seconds)** | 30 | |
| **Escalate waiting work after (minutes)** | 1 | A runner in trouble should never wait. |
| **Acknowledge texts automatically** | On | Marshals know their text arrived. |
| **Minimum available** | 1 | |

### Roster and breaks

1. A **Sign-up** shift *Marathon net control* on race day, 06:00 to 14:00, with **This shift takes dispatchers**, **Dispatch-only shift**, **Dispatchers needed** 2, **Minimum on desk** 1.
2. Break plan: *Meal 20*, spread evenly. The CERT coordinator (a department admin) runs **Plan breaks** in the morning so the two meals never overlap.

### A day on the desk

- **06:00** Both dispatchers sign in, one on the tablet and one on a phone.
- **09:42** A marshal texts: *Runner down at mile 18, conscious, cramping.* The text is offered to Tasha, who accepts, replies *Team 3 on the way*, presses **Create call** and dispatches *Team 3*. She completes the item as **Call created**.
- **10:15** Two texts arrive at once: one goes to Tasha, the other to Ben.
- **11:00** Ben's meal reminder comes; he takes his break and gets no desk alerts until he presses **I'm back**.

### Tips

- On a tablet the desk shows the lists and the open item side by side; on a phone it uses tabs. Use whichever the volunteers have.
- Print the department's number on the marshals' briefing sheet, with *Emergencies: call 911*.

## At a glance

| Walkthrough | Shifts | Key settings |
|---|---|---|
| [Volunteer fire](#volunteer-fire) | Sign-up, dispatch-only | Offer 60 s, heartbeat 0, minimum 0, emails dispatch at once |
| [Career fire / EMS](#career-fire-ems) | Assigned A–D, dispatch-only | 2 items, offer 30 s, minimum 2 enforced, auto return 10 min, Plan breaks |
| [Search and rescue](#search-and-rescue) | None | No shift needed, emails saved as pending, offer 90 s |
| [Multi-agency center](#multi-agency) | Assigned days/nights, 2 supervisors | Private number with Enhanced AI, 3 items, minimum 4 enforced |
| [Security and facilities](#security-facilities) | None | No shift needed, 3 items, scheduled call review 15 min |
| [Industrial ERT](#industrial) | Existing crew shifts | Beside responders, minimum 1 enforced, webhook fire-watch requests |
| [Emergency management](#emergency-management) | Sign-up with approval | Duty without a shift, voice intake, own breaks |
| [CERT / event medical](#cert-event) | Event-day sign-up | Escalate after 1 min, text acknowledgement |
