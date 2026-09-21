---
sidebar_position: 9
title: Industrial Emergency Response
---

# Setting Up an Industrial Emergency Response Team

For plant fire brigades, refinery / chemical / mining / utility emergency response teams, and large-site ERTs that combine fire, hazmat, rescue and medical capability inside a fence line, under OSHA / process-safety regulation. The emphasis is on **safety-critical maintenance**, **serialized equipment with calibration**, **hazardous-work controls**, **shift handover** and **near-miss reporting**.

## 1 — Department settings

| Setting | Value |
|---|---|
| 24-hour time | On. |
| Modules | Everything on including Maintenance (Readiness Pro) and Checklists. |
| Security policy | Enterprise preset; SSO with the corporate IdP; MFA for all; data classification *Confidential*. |
| Dispatch settings | Default statuses dispatched → *Responding*; unit status timers 3 min. |

## 2 — Types

| Type | Values |
|---|---|
| **Unit types** | Fire brigade engine, Hazmat trailer, Rescue truck, Medical unit, Foam unit, Utility. |
| **Call types** | Fire, Spill / release, Gas detection, Confined-space rescue, Medical, Evacuation / muster, Drill, Mutual aid (municipal FD), Standby (hot work). |
| **Priorities** | Level 1 (local), Level 2 (site-wide), Level 3 (off-site impact / mutual aid) — Level 3 = Emergency sound. |
| **Certifications** | NFPA 1081 brigade member, Hazmat technician, Confined-space rescue, Rope rescue, EMR/EMT, Incident commander, Forklift, Respirator fit test (expiry!). |

## 3 — Groups, roles, statuses

- **Stations**: *Main plant fire station*, *Tank farm*, *Warehouse* with addresses and geofences per process area.
- **Organisational groups**: Day ERT / Night ERT (matching plant crews).
- **Roles**: Brigade member, Hazmat technician, Rescue technician, Medical responder, Incident commander, Safety officer, Control-room operator.
- **Custom statuses**: personnel — Available (on site) · Responding · On scene · Staging · Off site; units — In service · Responding · On scene · Out of service · Decon.

## 4 — Dispatch

- Calls from the control room via the **Dispatch app** or **email import** from the plant alarm system; **text-to-call** from operators.
- **Run cards**: *Spill/release* (Level 2 + Spill): Hazmat trailer ×1, Hazmat tech ×2, Safety officer ×1, Brigade engine ×1; *Confined-space rescue*: Rescue truck ×1, Rescue tech ×3, Medical ×1; **station coverage minimum** keeps one crew in the plant when a unit leaves for mutual aid.
- **Protocols** per hazard class with attached SDS and isolation procedures.
- **Indoor maps** of process buildings with hazard zones and muster points; **occupancies** per building with utility shutoffs, hazmat inventory and tactical summaries.
- **Check-in timers**: *Hazmat exposure* 20/30 min, *PAR* 15 min.

## 5 — Readiness (the core)

- **Checklists**: *Rescue equipment weekly* (Serialized equipment, critical items), *Gas monitor bump test* (Serialized, daily, numeric reading with passing range), *SCBA weekly* (witness), *Safety audit* (Group, monthly, photo on failure), *Foam unit monthly* — all with **Create a work order on failure** and **Place equipment out for repair**.
- **Work orders** (Readiness Pro): use **Safety-critical** and **Hazardous work** routinely — procedure, version, permit, isolation reference and qualified personnel are then mandatory; safety-hold release requires an independent reviewer; operations policy with spending thresholds and working-hours calendar; preventive schedules by **meter** (pump hours) and **calendar** (annual hydrostatic tests), with **condition triggers** on gas-monitor readings.
- **Inventory**: every gas monitor, SCBA, harness, rope and radio as a serialized asset with **calibration / retirement date as expiry**; spill supplies and foam as bulk with reorder points; controlled items (e.g. antidote kits) with witnessing; purchasing through site suppliers.

## 6 — Records (industrial pack)

From the **Industrial Operations and Process Safety Pack**: *Operator / Control-Room Shift Handover* (Quick entry, one per unit per shift) and *Incident / Near Miss* (Approval preset, HSE manager approves, restricted fields). From **HAZMAT Response Pack**: *HAZMAT Release / Response*. Add *Exercise / AAR* for drills and *Run* for every response. **Investigations** for significant events with chain of custody. Quality-review rubric on near-miss reports.

## 7 — Communication

- Chat: ERT channel, control-room channel, incident channels per event; **urgent** messages for muster.
- Notifications: *Hazmat tech available < 2* → ERT lead; *Equipment out for repair* → maintenance.
- Workflows: *Call created (Level 2+)* → email site management + SMS the municipal FD liaison; *Work order safety hold applied* → Teams post to maintenance; *Record finalized (Near miss)* → export to the EHS system nightly.
- **Weather alerts** for wind (release modelling) and lightning.

## 8 — Workforce & Business Ops

- **Certifications** (free): HAZWOPER 40 + 8-hour refresher, confined space entry, lockout/tagout, respirator fit test, hearing conservation, bloodborne pathogens, first aid/CPR/AED, NCCCO crane where relevant; unit inspections for plant apparatus (pump tests, equipment annual inspections). Role requirements *ERT member* = HAZWOPER + respirator fit + first aid in **Enforce** — OSHA compliance depends on it; the compliance report to EHS monthly.
- **Deployment Finance** (free): plant turnarounds and mutual-aid responses to neighbouring sites as deployments (*Operational only* or *Cost recovery*); time reports and expenses for internal chargebacks.
- **Workforce & field costing** (Business Ops): workers per shift, establishments per plant, labor contractors for contract crews, compensation profiles and resource cost profiles for apparatus; call and deployment cost runs for chargebacks and budget justification. California sites with 100+ employees: employer profile, job assignments and the CRD pay data report (needs Advanced Data Protection).
- **Invoicing** (Business Ops, optional): bill standby (*Confined-space standby*, *Fire watch*) to internal cost centres or neighbouring plants.

See the [Workforce & Business Ops overview](../web-app/business-ops/overview) for what is free and what needs the add-on.

## First-week checklist

- [ ] All ERT members with certifications and fit-test expiry dates
- [ ] Every serialized asset entered with calibration expiry; expiration alert reviewed
- [ ] Gas monitor and rescue equipment checklists scheduled with work-order-on-failure
- [ ] Hazardous-work work order run through hold → release with an independent reviewer
- [ ] Shift Handover and Near Miss definitions published
- [ ] OSHA training types enforced on the ERT role; compliance report scheduled to EHS
