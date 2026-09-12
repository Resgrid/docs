---
sidebar_position: 10
title: Delivery, Transit & Field Service
---

# Setting Up a Delivery, Transit or Field-Service Operation

For courier and delivery fleets, bus / paratransit / shuttle operators, utility and field-service crews, tow operators and any business that dispatches vehicles and people to jobs. In Resgrid a **vehicle is a unit**, a **job is a call**, a **planned sequence of stops is a route**, and end-of-day summaries are **records**.

## 1 — Department settings

| Setting | Value |
|---|---|
| 24-hour time | Per preference. |
| Use branding in emails | On. |
| Modules | Routes, Units, Shifts, Checklists, Work orders (Readiness Pro), Inventory, Records on; Mapping on; Trainings optional. |
| Dispatch settings | Default statuses dispatched → *En route*, released → *Available*; rest period 5 min; *Order by driving ETA* on. |
| Mapping settings | Unit location TTL 30 min. |

## 2 — Types

| Type | Values |
|---|---|
| **Unit types** | Van, Box truck, Bus, Paratransit van, Service truck, Tow truck, Bike / cargo bike. |
| **Call types** | Delivery, Pickup, Service call, Breakdown, Accident, Passenger incident, Route deviation, Customer complaint. |
| **Priorities** | Scheduled, Same-day, Urgent, Emergency. |
| **Certifications** | Driver licence class, DOT medical card (expiry), Forklift, Hazmat endorsement, First aid, Passenger assistance. |

## 3 — Groups, roles, statuses

- **Stations**: each depot / yard with address and geofence (service area).
- **Organisational groups**: regions or contracts.
- **Roles**: Driver, Helper, Technician, Dispatcher, Supervisor, Mechanic.
- **Custom statuses**: units — Off duty · Loading · En route · On site / Delivering · Returning · Breakdown · Out of service; personnel — On duty · Off duty · On break; staffing — Available · Unavailable.

## 4 — Vehicles and drivers

- One **unit** per vehicle with a *Driver* role (and *Helper* where used); User Defined Fields on units for plate, VIN, capacity, lift-equipped.
- **Hardware GPS tracking** bindings per vehicle (Teltonika / Digital Matter / Traccar) with source priority above the phone; the Unit app on the driver's device for status, checklists and routes.
- Drivers verify contact methods and install Responder or use the Unit app only.

## 5 — Routes and jobs

- **Routes**: build route plans with **stops** (address, contact, planned arrival/departure, dwell time, notes), assign a unit, optionally optimise stop order and use the depot as start/end; drivers **start** the route in the Unit app and stops are marked on geofence arrival. Link stops to **calls** where each stop is a job.
- **Calls** for ad-hoc jobs: dispatch to a unit; **destination** POIs for customer sites; **call templates** for Delivery / Pickup / Service call with UDFs (order number, PO, customer reference).
- **Run cards**: *Breakdown* → Service truck ×1 closest-unit auto-dispatch; *Urgent delivery* → Van ×1 closest.
- **Contacts**: customers with addresses, delivery instructions as alert notes; categories per contract.

## 6 — Records

From the **Operational report templates** pack: *Delivery Run Report* (Quick entry, one per unit per day), *Bus/Route End-of-Day Summary* (transit), *Job/Service Completion* (field service, signature field, photo attachments). Reviewer: dispatcher. **Report exports** to email customers proof-of-delivery or to upload to the ERP nightly through a workflow.

## 7 — Readiness

- **Checklists**: *Vehicle pre-trip* (Unit, each shift, reported location required, critical: brakes, lights, tyres) with *Create a work order on failure* and *Place unit out of service*; *Lift inspection weekly* (paratransit); *Load securement* (trucks).
- **Work orders** (Readiness Pro): preventive schedules by **meter** (miles / kilometres from the tracker) — oil change every 8,000 km, brake inspection every 30,000 km; business calendar Mon–Sat; vendor charges for outside shops; parts from inventory.
- **Inventory**: depot as a facility; parts (filters, bulbs, wipers) as bulk with reorder points and a preferred supplier; handhelds and scanners as serialized assets issued to drivers; purchasing with purchase orders.
- **Shifts**: assigned driver shifts per depot; workshifts anchor *each shift* checklists.

## 8 — Communication

- Chat: depot channels; DMs to units for turn-by-turn changes; urgent messages for recalls.
- Notifications: *Unit breakdown* → dispatcher + mechanic; *Driver available < N* per depot before the morning wave.
- Workflows: *Call closed (Delivery)* → email the customer contact with the proof-of-delivery export; *Record finalized (Run report)* → upload to the ERP SFTP; *Work order overdue* → Slack.
- Weather alerts for winter operations.

## First-week checklist

- [ ] Every vehicle as a unit with a tracker binding
- [ ] Depot geofences drawn; customers imported as contacts
- [ ] One route built and run end-to-end in the Unit app
- [ ] Pre-trip checklist scheduled per vehicle with out-of-service on failure
- [ ] Delivery Run Report definition published and exported via workflow
