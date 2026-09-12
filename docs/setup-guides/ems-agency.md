---
sidebar_position: 3
title: EMS Agency
---

# Setting Up an EMS Agency

For ambulance services, fire-based EMS divisions, inter-facility transport companies and community-paramedicine programs. The emphasis is on **units and crews**, **controlled substances**, **expiring supplies** and **protecting patient information**.

:::caution Patient data
Resgrid is not an ePCR. Keep patient care records in your ePCR system; use Resgrid calls, records and chat for dispatch, response, logistics and QA. Enrol in [Advanced Data Protection](../web-app/data-protection) if call notes or records will contain patient identifiers, and treat that as one control inside your own HIPAA program.
:::

## 1 — Department settings

| Setting | Value |
|---|---|
| 24-hour time | On. |
| Staffing reset | Off (crews are on shift, not on call). |
| Require password reset via email | On. |
| Modules | Shifts, Checklists, Inventory, Records on; Maintenance with Readiness Pro. |
| Dispatch settings | Default statuses dispatched → *Responding*, released → *Available*; rest period 10 min; unit status timers 2 min (dispatched without en route) and 20 min (at hospital). |

## 2 — Types

| Type | Values |
|---|---|
| **Unit types** | ALS ambulance, BLS ambulance, Supervisor, Wheelchair van, Bariatric, Community paramedic. |
| **Call types** | By nature: Cardiac, Respiratory, Trauma, Stroke, OB, Behavioral, Overdose, Fall, Sick person, Interfacility transfer, Standby / event, Mutual aid. |
| **Call priorities** | If you use MPDS: Echo, Delta, Charlie, Bravo, Alpha, Omega (Echo/Delta = Emergency sound). Otherwise Emergency, Urgent, Routine, Scheduled. |
| **Certification types** | EMR, EMT, AEMT, Paramedic, CPR/BLS, ACLS, PALS, PHTLS, Driver (EVOC). |
| **Note categories** | Hospital diversion, Protocol updates, Drug shortages. |

## 3 — Groups, roles, statuses

- **Stations**: one per base/post with address and geofence (used for closest-unit selection).
- **Roles**: EMT, AEMT, Paramedic, Supervisor, Dispatcher, Driver.
- **Custom statuses** (EMS template): units — Available · Responding · On scene · Transporting · At hospital · Returning · Out of service · Posting; personnel — On duty · Off duty · Responding · On scene.

## 4 — Units and crews

Create each ambulance with roles **Driver/EMT** and **Attendant/Paramedic** (both required). Use **Unit staffing** at the start of every shift (or from the Unit app) so the crew is known — checklists, chat DMs to the unit and accountability rely on it. Add [hardware GPS tracking](../web-app/unit-tracking) bindings if the ambulances have trackers.

## 5 — Dispatch

- Calls from your CAD by email import; or dispatchers use the **Dispatch app**.
- **Run cards**: *ALS emergency* (Echo/Delta): ALS ambulance ×1 + Paramedic role ×1; *BLS*: BLS ambulance ×1; *MCI* alarm level 2 adds ALS ×2 + Supervisor ×1. Closest-unit mode, *Order by driving ETA* on, minimum staffing *Fully staffed*, auto-dispatch on with a 10-minute rest period.
- **Destinations**: create hospital and ED POIs under Mapping so crews pick a destination on the call.
- **Protocols**: pre-arrival instruction protocols by chief complaint if you dispatch in-house.

## 6 — Shifts

Assigned 12-hour or 24-hour shifts per station; supervisors approve trades. Turn on *Use shift for group dispatch* so a station page goes to the on-duty crew only. Create matching **workshifts** so checklists can run *each shift*.

## 7 — Checklists

| Checklist | Target | Schedule | Notes |
|---|---|---|---|
| Ambulance start-of-shift | Unit | Each shift | Critical: drug box seals, O2 level, stretcher lock, monitor self-test. |
| Controlled substance count | Unit | Each shift | **Witness required**, photo on failure, *Create work order on failure* off. |
| Monitor / defib daily | Serialized equipment | Daily | Pads and battery expiry. |
| Station restock weekly | Group | Weekly | |

## 8 — Inventory

- Items with **lot tracking + expiration**: medications, IV fluids, airway supplies; set minimum and reorder point; run the **expiration** alert weekly.
- **Controlled substances**: flag the items; every movement needs a witness; print the controlled-substance log monthly.
- Serialized assets: monitors, ventilators, stretchers, radios, tablets.
- Kits: jump bags per unit; issue to the unit at shift start.
- Purchasing: suppliers from Contacts; receive against purchase orders.

## 9 — Records and QA

- Activate Records with the *Review required* preset; use **Run** records for response documentation that does not belong in the ePCR, **Unit activity** per unit per call.
- **Quality review**: a rubric *Run report QA* (times complete, narrative matches interventions, protocol cited) sampling 10 per month.
- Restrict narrative and participant fields; enrol in ADP; set the disclosure statutory clock to your state's value.
- Analytics: response performance by call type; turnout target 60 s, travel target per your contract.

## 10 — Communication

- Messages with responses for shift coverage.
- Notifications: *ALS unit available < 1* → supervisor; inventory alerts → logistics.
- Workflows: *Call created* → API call to billing/ePCR; *Checklist failed (narcotics)* → email medical director; *Record finalized* → export template to the medical director weekly.
- Chat: incident channels for handoffs; images off in general channels unless ADP is on.

## First-week checklist

- [ ] Every ambulance created with two required roles and a Unit tablet
- [ ] Crews set unit staffing at shift start
- [ ] Hospital destination POIs created
- [ ] Narcotics checklist with witness runs each shift
- [ ] Medication lots with expiry entered; expiration alert reviewed
- [ ] ADP decision made and, if enrolled, verification prompt tested on the Dispatch console
