---
sidebar_position: 10
title: Community Risk Reduction
---

# Community Risk Reduction (CRR)

Record the outreach and prevention work your department does — smoke-alarm installs, school visits, station tours, public education, car-seat checks, senior fall-prevention visits — so it counts toward accreditation, grant reporting and the community-risk dashboard.

Feature flag: `Records.Prevention.Crr`. Menu: **Records → Community risk reduction**.

![CRR activities](/img/web-app/prevention/crr.png)

## Recording an activity

**New activity**:

| Field | Notes |
|---|---|
| **Title / Kind** | Smoke alarm installation, public education, station tour, home safety visit, school program, media, other. |
| **Occurred on / Location / Coordinates / Occupancy** | Where and when; link to an [occupancy](occupancies) when it was at a tracked property. |
| **Audience** | Number of people reached. |
| **Hours** | Staff hours spent. |
| **Staff** | Members who took part. |
| **Smoke alarms installed** | Count. |
| **Outcome** | Free text. |

![New CRR activity](/img/web-app/prevention/crr-new.png)

The list shows a **summary for the period** (activities, audience reached, hours, smoke alarms) and feeds the **Community risk** analytics dashboard.

## Setup examples

| Department | Use |
|---|---|
| **Fire / accreditation (CFAI)** | Log every public-education contact; export the period summary for the CRR standard of cover. |
| **EMS** | Community paramedicine visits and CPR classes as *Public education*. |
| **CERT / emergency management** | Preparedness fairs, neighbourhood training, sandbag distribution events. |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/RecordCrr/{Index,Edit}` |
| Model | `RmsCrrActivity` |
| Flag / permission | `Records.Prevention.Crr`; `RecordsPreventionAdmin` to create/edit |
