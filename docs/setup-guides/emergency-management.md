---
sidebar_position: 5
title: Emergency Management
---

# Setting Up an Emergency Management Agency / EOC

For county, city, tribal, campus or corporate emergency-management offices that activate an **Emergency Operations Centre**, coordinate **Emergency Support Functions**, manage shelters and resource requests, and work with many partner agencies. In Resgrid a *call* is an **activation or event**, groups are **EOC sections and ESFs**, and Records carry the **situation reports, ICS forms and resource requests**.

## 1 — Department settings

| Setting | Value |
|---|---|
| 24-hour time | On. |
| Modules | Shifts (for activation rosters), Calendar, Documents, Notes, Records, Inventory (warehouse/caches), Checklists on; Trainings optional. |
| Data classification (security policy) | CUI if you handle FOUO material; Government/CUI preset. |
| Staffing reset | Off. |

## 2 — Types

| Type | Values |
|---|---|
| **Unit types** | Mobile command vehicle, Trailer (generator / comms / shelter), Drone, Vehicle. EOC sections are groups, not units. |
| **Call types** | EOC activation, Severe weather, Flood, Wildfire, Hazmat, Power outage, Shelter opening, Resource request, Public health, Exercise, Planned event. |
| **Call priorities** | Monitoring, Partial activation, Full activation, Emergency. |
| **Certification types** | ICS 100/200/300/400/700/800, G-series courses, Shelter management, Damage assessment, PIO. |
| **Document categories** | EOP & annexes, ESF checklists, MOUs, Maps, Contact rosters, Sitreps. |

## 3 — Groups, roles, statuses

- **Stations**: *Primary EOC*, *Alternate EOC*, *Warehouse* with addresses.
- **Organisational groups**: Command, Operations, Planning, Logistics, Finance/Admin; one group per ESF (ESF-1 Transportation … ESF-15 External affairs).
- **Roles**: EOC manager, Section chief, ESF lead, Duty officer, PIO, Liaison, Shelter manager, Damage assessor, Radio operator.
- **Custom statuses**: personnel — Activated (in EOC) · Activated (remote) · Standing by · Off duty · Deployed to field; staffing — Available · Unavailable · Deployed; units — Available · Deployed · Out of service.

## 4 — Personnel and partners

- Invite agency staff **and** partner-agency representatives (they can belong to their own department too and switch).
- **Contacts**: shelter operators, utilities, hospitals, media, mutual-aid coordinators; categories per ESF.
- **Distribution lists**: `esf-leads@`, `shelters@`, `pio@` including external addresses.
- **Department links** to every fire/EMS/law agency that shares a Resgrid department, so the EOC map shows their units.

## 5 — Activations (calls)

- Create an **EOC activation** call with priority *Partial* or *Full*; dispatch to the section groups and ESF roles; the incident chat channel becomes the EOC channel.
- Use **scheduled calls** for planned events (parades, elections) and **call templates** for each activation level.
- **Check-in timers**: *IC* 60-minute briefing cadence.
- **Weather alerts**: subscribe every county zone; threshold *Warning* → duty officer; *Watch* → notes.

## 6 — Records (EOC pack and ICS forms)

From the **EOC Coordination Pack**: *EOC Duty / Shift Log* (Quick entry, one per duty officer shift) and *Agency / ESF Status Report* (Review required, one per ESF per operational period). From the **Disaster Field Assessment Pack**: *Rapid Needs / Initial Damage Assessment* (with photo coordinates retained). From **Incident Support**: ICS 202, 205, 209, 211, 213RR, 214, 215, 260. Number ICS forms **per incident**. Use the **Exercise / AAR** pack after every exercise. Legal holds and records requests handle post-event public-records demands.

**Deployments** track EMAC / state resource orders your agency requests or hosts.

## 7 — Resource orders and logistics

- **Resource orders**: municipalities request cots, generators, pumps; the EOC fills from the warehouse or partner departments.
- **Inventory**: warehouse and trailers as locations; cots, blankets, water, MREs as bulk with reorder points; generators, radios, satellite phones as serialized assets; deployable caches as kits; issue to external agencies via an *External* location.
- **Checklists**: *EOC readiness* (Department, monthly: generators, comms, supplies), *Shelter site inspection* (per shelter group, annual), *Trailer pre-deployment* (Unit).
- **Work orders** (Readiness Pro): generator monthly run and annual load test, trailer inspections.

## 8 — Communication

- **Messages** with acknowledgement responses for activation notices.
- **Chat**: custom channels per ESF with role rules; urgent messages for recalls; export transcripts after each activation.
- **Notifications**: *Document added* (EOP category) → section chiefs; *Weather alert received*.
- **Workflows**: *Call created (EOC activation)* → email all ESF leads + post to the EOC Teams channel; *Record finalized (ESF status)* → compile into the sitrep export nightly.
- **Big Board** on the EOC wall; **Incident Command app** for the EOC manager.
- **Connect** public profile for community preparedness posts.

## First-week checklist

- [ ] Sections and ESFs as groups; leads as group admins
- [ ] Activation templates for partial and full activation
- [ ] Weather zones subscribed and tested
- [ ] EOC Duty Log and ESF Status Report definitions published
- [ ] Warehouse inventory initialised; one resource order run end-to-end
- [ ] Department links to partner agencies established
