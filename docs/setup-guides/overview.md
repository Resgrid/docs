---
sidebar_position: 1
title: Choosing a Setup Guide
---

# Setting Up Resgrid for Your Organization

Resgrid started as computer-aided dispatch for fire departments, but the same building blocks — **calls, people, units, groups, statuses, schedules, records, checklists, inventory, maps and notifications** — configure into very different organizations. These guides give you a recipe for each kind, with concrete values to enter, which modules to switch on or off, and which mobile app each person should use.

Every guide assumes you have already created your department (hosted at [resgrid.com](https://resgrid.com) or [self-hosted](../self-hosted/installation)) and are signed in as its administrator. The generic, screen-by-screen walk-through is in [How-tos → Setup department](../how-tos/setup-department); the guides below tell you *what to put in*.

## Pick the guide closest to you

| Organization | Guide | Typical modules |
|---|---|---|
| Volunteer, combination or career fire department | [Fire department](fire-department) | Dispatch, run cards, personnel/units, shifts, checklists, work orders, inventory, Records + NERIS, prevention |
| Ambulance service, fire-based EMS, community paramedicine | [EMS agency](ems-agency) | Dispatch, units, shifts, checklists (narcotics), inventory (lots/expiry), records, ADP |
| Search and rescue team, mountain / cave / swiftwater / K9 | [Search & rescue](search-and-rescue) | Dispatch to roles, mapping & custom maps, routes, records (SAR pack), calendar, inventory |
| County / city emergency management, EOC | [Emergency management](emergency-management) | Calls as activations, groups per section/ESF, records (EOC pack, ICS forms), weather alerts, links, resource orders |
| Incident management team, wildland / all-hazards | [Incident management team](incident-management-team) | Command definitions, records (ICS 201–225, OF/SF forms), deployments, IC app |
| CERT / community response / auxiliary | [CERT & community response](cert-community-response) | Personnel, calendar, trainings, messages, records (CERT pack), simple dispatch |
| Private security, campus / healthcare security, facilities | [Security & facilities](security-and-facilities) | Calls by client site, custom statuses, patrol routes, indoor maps, records (patrol log / incident report), checklists |
| Industrial fire brigade, plant emergency response team | [Industrial emergency response](industrial-emergency-response) | Dispatch, units, hazmat protocols, checklists, work orders with safety holds, inventory (serialized), records (industrial pack), indoor maps |
| Delivery, courier, field service, bus / transit operator | [Delivery, transit & field service](delivery-transit-field-service) | Units as vehicles, routes, calls as jobs, records (delivery run / route EOD), hardware GPS tracking |
| Central dispatch centre serving several agencies | [Multi-agency dispatch centre](multi-agency-dispatch-center) | Department links, resource orders, run cards, Dispatch app, Big Board |

## The order that works for everyone

Whatever the guide, this order avoids rework:

1. **Department settings** — name, time zone, address, map centre, 24-hour time.
2. **Types** — unit types, call types, call priorities, certification types (guides list them).
3. **Groups & stations** — the physical places first, organisational groups second; draw geofences.
4. **Roles** — what you dispatch by and report on.
5. **Custom statuses** — from a template; adjust wording.
6. **Units** — with unit roles (seats).
7. **Personnel** — invite in bulk; ask everyone to verify email and phone and install the app.
8. **Security & permissions** — tighten what the defaults leave open (delete calls, view PII).
9. **Dispatch settings** — how groups/units/shifts dispatch; email/SMS import; run cards.
10. **Everything else** — records, checklists, inventory, shifts, calendar, workflows, notifications — one module at a time, with a champion for each.

## Which app for whom

| App | Who uses it |
|---|---|
| **Responder** | Every member: receive calls, set status and staffing, chat, checklists, records in the field. |
| **Unit** | The apparatus / vehicle / team tablet: unit status, crew, AVL, checklists, unit records. |
| **Dispatch** | Dispatchers and duty officers: create and manage calls, see everything. |
| **Incident Command** | Incident commanders: command boards, accountability, incident channels, ICS records. |
| **Big Board** | Station and EOC wall displays. |

## Getting help

The [support portal](https://resgrid.zohodesk.com/portal/en/home), the community Discord and GitHub issues are linked under **Help** in the web app.
