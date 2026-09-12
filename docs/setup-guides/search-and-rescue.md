---
sidebar_position: 4
title: Search & Rescue
---

# Setting Up a Search & Rescue Team

For volunteer SAR teams — ground, mountain, K9, technical rope, swiftwater, cave, drone — that are paged by a sheriff, park service or coordination centre and deploy for hours or days. The emphasis is on **dispatching by capability (roles)**, **maps**, **availability polling** and **mission records**.

## 1 — Department settings

| Setting | Value |
|---|---|
| Disable auto-available | **On** (members should not drift back to *Available* automatically). |
| Staffing reset | Off — availability is set deliberately. |
| Mapping settings | Personnel and unit location TTL 240–480 minutes (field teams report rarely). |
| New Call form fields | Show what3words and coordinates; make location required. |
| Modules | Shifts off (unless you run an on-call rota); Inventory, Checklists, Records, Calendar, Trainings on. |

## 2 — Types

| Type | Values |
|---|---|
| **Unit types** | Ground team, K9 team, Technical team, Swiftwater team, UTV/ATV, Drone, Command post, Vehicle. |
| **Call types** | Missing person, Overdue hiker, Injured hiker / rescue, Recovery, Evidence search, Mutual aid, Training / exercise, Standby (event). |
| **Call priorities** | Urgent (immediate response, full alert), Standard (respond within the hour), Planned (scheduled search / training). |
| **Certification types** | SARTECH II/III, Wilderness first aid / WFR, Rope technician, Swiftwater, K9 certification, Avalanche, Drone pilot (Part 107), ICS 100/200/700. |

## 3 — Groups, roles, statuses

- **Station**: the cache / meeting point (with address). **Organisational** groups: Ground, Technical, K9, Support/Logistics, Command.
- **Roles** (what you dispatch by): Ground searcher, Team leader, K9 handler, Rope tech, Swiftwater, Medical (WFR+), Drone pilot, Radio operator, Incident commander, Logistics.
- **Custom statuses**: personnel — Available · Responding to CP · At command post · Deployed in field · Returning · Not available; staffing — Available this week · Limited · Unavailable · Deployed elsewhere. Units (Team) — Staging · Assigned · Searching · Subject located · Returning.

## 4 — Personnel and units

- Invite members; ask for verified email + mobile, home address (for ETA to the trailhead) and the Responder app.
- Certifications with expiry drive who may be dispatched to technical roles.
- Units are your **teams** (Team Alpha … with roles Team leader, Navigator, Medic, Searcher ×4) and **vehicles** (UTVs, command trailer). Staff teams at the CP from the Unit app.

## 5 — Dispatch

- Callouts arrive by SMS or email from the sheriff — set up **email import** (Generic format) or **text-to-call**; or the duty officer creates the call in the Dispatch app.
- Dispatch to **roles**, not groups: *Missing person* → Ground searcher + Team leader + K9 handler; *Rescue* → Rope tech + Medical.
- **Run cards**: *Missing person* (Urgent + Missing person): Team leader ×1, Ground searcher ×6, K9 team ×1; manual selection mode (people choose to respond).
- **Messages with responses** for availability polls: *Available for a callout starting 06:00 tomorrow? Yes / No / Later*.
- **Check-in timers**: *Sector rotation* 2 h per field team.

## 6 — Mapping

- Layers: trail systems, land ownership, search segments exported from CalTopo/SARTopo (GeoJSON/KML), cell coverage.
- POI types: trailheads, huts, helispots, water sources, gates.
- **Custom maps**: raster tiles of your operating area for offline use; region maps for segments with POA.
- Consider hardware trackers on UTVs and the command trailer.

## 7 — Records (SAR pack)

Enable Records and create definitions from the **SAR Mission Pack**: *SAR Mission Summary*, *SAR Segment Debrief* (coverage / POD), *SAR Clue Report* (restricted). Add *Exercise / AAR* for trainings and *ICS 214* from the Incident Support pack for personal activity logs. Preset *Review required* with the operations chief as reviewer. Capture **unit tracking fixes** and **incident chat** as evidence on the mission summary.

## 8 — Readiness

- **Checklists**: *Personal 24-hour pack* (Personnel target, monthly, self-run), *Team cache inventory* (Group, quarterly), *UTV pre-trip* (Unit), *Rope kit inspection* (Serialized equipment, annual, witness).
- **Inventory**: team cache as a facility with containers; ropes, hardware, GPS units, radios and PLBs as serialized assets with retirement dates as expiry; issue personal gear to members with expected return.
- **Calendar**: trainings with sign-up sheets, fitness sessions, debriefs.
- **Trainings**: navigation, radio, ICS refreshers with quizzes for probationary members.

## 9 — Communication

- Chat channels per team; the incident channel is automatic per callout; **urgent** messages for recall.
- Notifications: *Team leader availability < 2* → coordinator.
- Workflows: *Call created* → email the sheriff's dispatch a confirmation; *Message sent (poll)* → webhook to a roster sheet.
- Voice: PTT channels per team where radio coverage is poor.

## First-week checklist

- [ ] Roles match your capability matrix; certifications entered
- [ ] Custom statuses reflect CP → field → return flow
- [ ] Test callout by SMS import received by all
- [ ] Search-area layers loaded on the map and in Responder
- [ ] SAR Mission Summary definition published; a training mission recorded end-to-end
