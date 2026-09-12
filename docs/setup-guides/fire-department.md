---
sidebar_position: 2
title: Fire Department
---

# Setting Up a Fire Department

This recipe covers volunteer, combination and career fire departments — from a single-station volunteer company to a multi-battalion career department. Differences between the two ends are called out as you go.

## What you will end up with

- Calls arriving from your dispatch centre (email or SMS page) or created by your own dispatcher, alerting the right stations, roles and units by push, SMS, email and voice.
- Live status of every member and apparatus on the dashboard, the Big Board and the apps.
- Run cards that fill the assignment automatically.
- Daily apparatus and SCBA checks, with failures turning into work orders.
- Run, training and work records with NERIS incident reports (US).
- Hydrants, occupancies, inspections and permits if you run prevention.

## 1 — Department settings

| Setting | Value |
|---|---|
| Time zone / 24-hour time | Your zone; most fire departments use 24-hour time. |
| Department address | Station 1 or the administration office. |
| Default map centre | The middle of your first-due area. |
| Staffing reset | Volunteer: **On**, daily 06:00 → *Available* (clears forgotten *Unavailable* flags). Career: off. |
| Modern notification sounds | On. |
| Modules | All on except *Maintenance* until you have Readiness Pro. |

## 2 — Types

| Type | Values |
|---|---|
| **Unit types** | Engine, Ladder / Truck, Rescue, Tender / Tanker, Brush, Command, Utility, Ambulance (if you run EMS). |
| **Call types** | Structure fire, Vehicle fire, Brush / wildland fire, Fire alarm, MVA, MVA with entrapment, Medical, Hazmat, Gas leak, Water rescue, Public assist, Mutual aid, Standby. |
| **Call priorities** | Low (routine, no sound at night), Medium, High, Emergency (full alert, overrides quiet hours). Keep the four defaults and set colours. |
| **Certification types** | Firefighter I, Firefighter II, Driver/Operator, Fire Officer I, EMT, EMR, Hazmat Ops, CPR. |
| **Document categories** | SOG/SOP, Bylaws, Apparatus manuals, Training, Forms. |
| **Note categories** | Standing orders, Road closures, Hydrants OOS, Minutes. |

## 3 — Groups & stations

- One **Station** group per firehouse with the street address; draw the **geofence** for its first-due area.
- Multi-station: an **Organisational** group per battalion or district as the parent.
- Make each station's captain a **group admin**.

## 4 — Roles

Firefighter, Interior firefighter, Driver/Operator, Officer, Chief officer, EMT/EMR, Support/Fire police, Probationary. Roles are what run cards and dispatch-by-role use — keep them about *capability*, not rank (ranks are separate).

## 5 — Custom statuses

Load the **Fire** template under Custom Statuses and trim:

- **Personnel**: Standing by · Responding to station · Responding to scene · On scene · Available at station · Not responding · Off duty.
- **Staffing**: Available · Unavailable · On call · On shift.
- **Units** (Engine/Ladder/Rescue/Tender/Brush): In quarters · Responding · On scene · Available · Returning · Out of service.

## 6 — Units

Create every apparatus with its type and station, and add **unit roles** — Engine: Driver, Officer, Firefighter ×2 (mark Driver and Officer *required*). Utility and command vehicles: a single Officer/Driver role.

## 7 — Personnel

Use **Department Settings → Invites** to invite everyone by email. Ask members to:

1. Install **Responder**, sign in, verify email and mobile number.
2. Set notification preferences (push for calls; SMS as backup).
3. Fill in their home address (ETA and closest-member logic).

Assign roles and stations; enter certifications with expiry dates.

## 8 — Security & permissions

| Permission | Volunteer | Career |
|---|---|---|
| Create calls | Admins + Officers | Admins + Dispatcher role |
| Close / delete calls | Officers / Dept admins | Dispatcher / Dept admins |
| View personal info | Everyone | Admins + Officers |
| Create shifts | Dept admins | Dept admins |
| Manage checklists / work orders | Admins + Apparatus officer role | Same |
| 2FA for admins | Dept admins | All admins |

## 9 — Dispatch

- **Call import**: forward CAD pages to the dispatch import email; choose the matching **email format** (Active911, IAmResponding, county-specific formats, or Generic).
- **Text messaging**: provision a number if members will text `responding` / `available`.
- **Dispatch settings**: *Also dispatch to entire group* on unit dispatch (volunteer); *Use shift for group dispatch* (career); default statuses dispatched → *Responding*, released → *Available*.
- **Run cards** (`Dispatch.RunCards`): *Structure fire* (High + Structure fire): L1 Engine ×2, Ladder ×1, Rescue ×1, Chief officer ×1; L2 adds Engine ×1, Tender ×1. *Brush fire*: Brush ×2, Engine ×1. *Medical*: Rescue ×1 + EMT ×2. Station-based mode; auto-dispatch **off** for volunteers until confident, **on** for career.
- **Check-in timers**: PAR 20 min on Structure fire; Rehab 45 min.
- **Protocols**: structure-fire and gas-leak protocols with questions and attachments.

## 10 — Readiness: checklists, work orders, inventory

- **Checklists** (free): from templates — *Fire apparatus daily* (Unit, each shift or daily 07:00, window 120 min, critical items brakes/lights/pump), *Fire apparatus weekly*, *SCBA weekly* (Serialized equipment, witness required), *Station facility monthly*.
- **Work orders** (Readiness Pro): enable Maintenance; preventive schedules per apparatus (annual pump test, ladder test, oil change every 250 hours by meter); *Create a work order on failure* on the daily checklist; operations policy with a $500 approval threshold.
- **Inventory**: SCBA packs, cylinders, TICs, radios and gas meters as serialized assets; foam, absorbent, medical supplies as bulk with reorder points; turnout gear kits issued to members.

## 11 — Records

- Enable `Records.System` and **activate**. Locked types cover Run, Training, Work, Meeting. Preset: *Quick entry* for volunteers, *Review required* for career (officer reviews).
- **NERIS** (US): enter entity ID and credentials, map every call type in the crosswalk, auto-submit after the first few are checked.
- **Prevention**: hydrants (import from the water utility), occupancies for target hazards, inspection programs if you have a bureau, permits (burn, fireworks), CRR activities for accreditation.
- **Analytics**: set turnout target 80 s and travel target 240 s (NFPA 1710) or your standard of cover.

## 12 — Communication and engagement

- **Shifts**: signup *duty crew* shifts (volunteer) or assigned platoon shifts (career).
- **Calendar**: trainings with RSVP; business meetings.
- **Trainings**: annual refreshers with quizzes.
- **Notifications**: *Driver/Operator available < 2* → officers; *Unit out of service* → chief.
- **Workflows**: *High/Emergency call* → email chief + Discord; *Certification expiring* → member + training officer.
- **Communication tests**: monthly all-call page test.
- **Chat**: department and station channels; incident channels are automatic.

## First-week checklist

- [ ] Every member verified email + mobile and installed Responder
- [ ] Every apparatus created with roles; Unit app on each tablet
- [ ] A test call dispatched to a test group and received on all channels
- [ ] Run card test/simulate matches expectations
- [ ] Daily apparatus checklist scheduled and running
- [ ] Records activated; one Run record finalized end-to-end
- [ ] Security permissions reviewed; 2FA on for admins
