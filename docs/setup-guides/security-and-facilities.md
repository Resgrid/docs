---
sidebar_position: 8
title: Security & Facilities
---

# Setting Up a Security Company, Campus Security or Facilities Team

For contract security companies with many client sites, campus / healthcare / corporate security departments, and facilities teams that respond to alarms, incidents and service requests. In Resgrid a **client site is a station group**, a **patrol vehicle or post is a unit**, an **incident or request is a call**, and patrol logs and incident reports are **records**.

## 1 — Department settings

| Setting | Value |
|---|---|
| 24-hour time | On. |
| Use branding in emails | On (clients see your logo). |
| Staffing reset | At shift boundaries → *Off duty*. |
| Suppress notifications for | *Off duty*. |
| Mapping settings | Personnel location TTL 15 min. |
| Modules | Shifts, Checklists, Work orders (Readiness Pro), Inventory, Records, Routes on; Trainings on. |
| Security policy | SSO with the corporate IdP where available; *Require SSO*; session timeout 720; view users / units **group only** so client sites are isolated. |

## 2 — Types

| Type | Values |
|---|---|
| **Unit types** | Patrol vehicle, Foot post, Bike patrol, Mobile supervisor, K9. |
| **Call types** | Alarm response, Suspicious activity, Trespass, Escort request, Medical, Fire alarm, Access control, Maintenance request, Incident report, Welfare check. |
| **Priorities** | Routine, Urgent, Emergency. |
| **Certifications** | Guard licence (with expiry), First aid/CPR, Use of force, Firearms (if armed), Fire warden, Forklift. |
| **Contact note types** | Site instructions, Key-holder, Alarm code (restricted). |

## 3 — Groups, roles, statuses

- **Organisational group per client**; **station group per site** with the address and a geofence (alarm-response area); site supervisors as group admins.
- **Roles**: Security officer, Supervisor, Dispatcher / operations centre, Site lead, Armed officer, Fire warden.
- **Custom statuses** (security template): personnel — On patrol · At post · Responding · On scene · On break · Off duty; staffing — On duty · Off duty · Available for overtime; units (Patrol) — Available · Responding · On site · Out of service.

## 4 — Units and tracking

One unit per patrol vehicle (role *Officer*) and per fixed post; **hardware GPS tracking** on vehicles (source priority above the phone app) so the operations centre always sees them.

## 5 — Calls and dispatch

- Dispatchers use the **Dispatch app**; alarm-centre emails create calls via **email import**; client requests by **text-to-call**.
- **Contacts** per site: client contact, key-holders, alarm company — with **alert notes** (dogs, access hazards) and gate codes in the [occupancy](../web-app/records/occupancies) record.
- **Run cards**: *Alarm response* (Urgent + Alarm): Patrol vehicle ×1 closest-unit, auto-dispatch; *Medical on site* adds First-aid role ×1.
- **Indoor maps** for campuses and large buildings: access points and assembly points searchable in dispatch.
- **Templates**: Alarm response, Escort, Medical; call-note templates for standard dispositions (*False alarm — reset*, *Owner notified*).

## 6 — Shifts and routes

- **Assigned shifts** per site with rotating patterns; trades within the same site group; workshifts for *each shift* checklists.
- **Routes**: patrol routes per site with checkpoint stops and geofence radius; officers run them in the Unit app; the end-of-shift *Security Patrol Log* record captures checkpoints and exceptions.

## 7 — Records

From the **Operational report templates** pack: *Security Patrol Log* (Quick entry, prefix PAT, sequence per site group) and *Security Incident Report* (Review required, involved persons restricted). Add *Job/Service Completion* for facilities work. Group-scope Records so clients' reports stay separate; use **report exports** to email a client a nightly patrol summary through a workflow. Legal holds and records requests cover subpoenas.

## 8 — Readiness

- **Checklists**: *Patrol vehicle start-of-shift* (Unit, each shift, reported location required), *Post orders acknowledgement* (Group per site), *Fire extinguisher monthly* (Serialized equipment), *Lighting and camera check* (Group, weekly) with *Create a work order on failure*.
- **Work orders** (Readiness Pro): *Facility* type for door, camera, lighting faults; business calendar Mon–Fri 08:00–17:00 with response targets per priority; vendor charges for outsourced repairs; spending approval above a threshold.
- **Inventory**: uniforms, radios and body cameras issued to officers; keys and access cards as serialized assets; vehicle equipment on units.

## 9 — Communication

- Chat: custom channel per client site (group rule) and a supervisors channel; GIFs off; moderation delegated to site supervisors.
- Notifications: *Patrol unit out of service* → operations; *Checklist missed* → site supervisor.
- Workflows: *Call closed* → email the client contact a summary from a Records export; *Form submitted (incident statement)* → create a work order via API.
- **Communication tests** quarterly.

## First-week checklist

- [ ] Client and site groups with geofences; officers assigned; SSO tested
- [ ] Patrol vehicles as units with trackers
- [ ] Alarm-response run card tested with *Run Test*
- [ ] Patrol Log and Incident Report definitions published; group scoping on
- [ ] Start-of-shift checklist scheduled per vehicle
