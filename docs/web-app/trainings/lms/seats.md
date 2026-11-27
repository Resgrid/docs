---
sidebar_position: 2
title: LMS seats
slug: /web-app/trainings/lms/seats/
---

# LMS seats

An **LMS seat** marks a member as someone your department trains through the [LMS add-on](/web-app/trainings/lms/). Seats come from the [packs](/web-app/trainings/lms/packs/) you buy: each pack holds 25 seats. You decide who holds one, member by member or a whole group at a time, so a department of 80 that trains 45 people through courses and requirements pays for two packs, not four.

**Where to find it:** **Personnel** (the LMS seats panel on the list) and each member's page (the **LMS seat** panel). Department admins only. The panels appear while the Trainings module and the `Training.Lms` rollout flag are on for your department. A read-only summary is on **Trainings → Records → Settings**.

## Who needs a seat

| Person | Needs a seat? |
|---|---|
| A member you train through LMS courses, requirements, paths, classes, skill sheets or task books | **Yes** |
| An instructor, evaluator, grader or training officer | No. Authoring, teaching, evaluating, signing, grading and reporting need a [permission](/web-app/trainings/lms/#permissions), not a seat. A medical director who only signs skills costs nothing. |
| A member who only uses free Training, their transcript, protocol acknowledgments and the Academy | No |
| A deleted, disabled or hidden member | Cannot hold a counted seat |
| An [external learner](/web-app/trainings/external-learners) | Included free up to 25% of your purchased seats (at least 25); beyond that each one uses a seat |
| A person in two Resgrid departments | Counted in each department that switches them on |

### What a seat changes

A member with a licensed seat is counted by the LMS: the requirements engine tracks them, the [compliance matrix](/web-app/trainings/paths-and-requirements) and the ISO FSRS and NCCP reports show their status, the weekly protocol question goes to them, and instructors can [record completions](/web-app/trainings/recording-completions) of LMS courses for them.

A member without a seat keeps everything in the free Training module. The requirements engine shows them as **Not licensed**: never compliant, never overdue and never enforced, so a gap in licensing never looks like a gap in training.

## Switch one member on or off

1. Open **Personnel** and select the member.
2. In the **LMS seat** panel, read the current state: **LMS-enabled** (*This member can be trained through LMS courses and requirements.*) or **Not LMS-enabled** (*This member keeps the free Training module, their transcript and the Academy.*). The counter under it shows *41 of 50 seats in use*.
3. Select **Enable LMS** or **Disable LMS**. The page reloads with *LMS seat updated.*

![The LMS seat panel on a member's page](/img/web-app/lms/lms-seat-member.png)

If every seat is taken, the change is refused with *All 50 seats are in use. Packs to add: 1.* and an **Add a pack** link to the [LMS billing page](/web-app/trainings/lms/packs/). Nothing is switched on for free until the packs are bought.

![Enabling a seat when all seats are in use](/img/web-app/lms/lms-seats-full.png)

Other refusals you may see:

- *Only active members can hold an LMS seat; deleted, disabled and hidden members cannot.*
- *Your department has no active LMS add-on, so no member can be LMS-enabled.* (with **Add a pack**)

## Switch a whole group on or off

1. Open **Personnel**. The **LMS seats** panel shows the counter, for example **41 of 50 seats in use**.
2. Choose the **Group**, for example *Station 2*.
3. Select **Enable group** or **Disable group**.
4. Read the result: *12 changed, 3 already set, 1 skipped because they are not active, 0 refused because no seats were left.*

When the group holds more members than free seats, the members are switched on until the seats run out and the rest are counted as refused. Add packs and run **Enable group** again; members already switched on are left as they are.

![The LMS seats panel on the personnel list](/img/web-app/lms/lms-seats-personnel-list.png)

The panel also says *Members who are not LMS-enabled keep the free Training module, their transcript and the Academy. Instructors, evaluators and officers need no seat.* and links to **Manage packs**.

## How seats are counted

- **Only active members count.** A member who is deleted, disabled or hidden keeps their seat row, but it is not counted. The panel shows these as *N seats belong to members who are no longer active and are not counted.* If the member becomes active again, the seat counts again.
- **External learners** count toward packs only beyond the free allowance (25% of purchased seats, at least 25).
- **More switched-on members than seats.** This happens when a member comes back from being disabled, or when packs are bought back lower after the add-on ended. Seats are then licensed in the order they were switched on, and the newest ones show the **Not licensed** label on the member's page until you add packs or switch members off.
- **Two admins at the same moment.** Two admins taking the last seat at once can both succeed; the licensing order then decides who is licensed until a pack is added.
- **A lapse does not clear seats.** Seats stay switched on while the add-on is not active, and nobody is licensed until it is active again.

## The summary on the training records settings page

**Trainings → Records → Settings** has an **LMS packs and seats** section with three tiles, **Packs**, **LMS seat** (*48 of 50 seats in use*) and **Next month** (the monthly price), plus *From 1 March 2027: 2 packs.* when a pack decrease is scheduled. Buttons lead to **Manage packs** and **Manage LMS seats on the personnel page**. The section also shows the add-on state:

- *Your department has not bought the LMS add-on.*
- *A payment failed. The LMS keeps working until …* (the 7-day payment grace)
- *The LMS add-on has ended. Records, certificates and transcripts stay available and exportable.*

![LMS packs and seats on the training records settings page](/img/web-app/lms/lms-settings-summary.png)

## Setup examples

| Organization | How seats are usually given |
|---|---|
| **Combination fire department** | Enable the station groups that run requirements and courses; leave the auxiliary and dispatch groups on free Training and the Academy. |
| **EMS agency** | Enable every clinician (EMT, paramedic) for CE tracking and NCCP; supervisors who only grade and sign off skill sheets need no seat. |
| **Volunteer SAR team** | Enable members who are working through task books; switch off members who leave so their seat is free for the next recruit. |
| **Industrial emergency response team** | Enable the ERT roster only; plant staff who only take the annual awareness training stay on free Training. |
| **Training academy** | Enable staff who are trained; bring partner students in as external learners instead of members. |

## Technical reference

| Item | Value |
|---|---|
| Controller | `LmsSeatsController`: `POST /User/LmsSeats/SetSeat` (`userId`, `enabled`) returns to `Personnel/ViewPerson`; `POST /User/LmsSeats/SetGroup` (`groupId`, `enabled`) returns to `Personnel/Index`. Department admins only; "not found" while the LMS is off for the department. |
| View components | `LmsSeatSwitch` (`Shared/_LmsSeatSwitch.cshtml`, member page), `LmsSeatSummary` (`Shared/_LmsSeatSummary.cshtml`, personnel list), `LmsSettingsSummary` (`Shared/_LmsSettingsSummary.cshtml`, training records settings) |
| Service | `LmsSeatService` (`SetSeatAsync`, `SetSeatsForGroupAsync`, `GetSummaryAsync`, `GetMinimumPacksAsync`); rules in `LmsSeatRules` (counted seats, licensing order, packs needed) |
| Seat size | `LmsAddonConfig.PackSize` = 25 |
| External learner allowance | `LmsExternalLearnerRules.Allowance`: 25% of purchased seats, minimum 25 |
| Table | `LmsMemberSeats` (M0351) |
| Audit log | `LmsSeatsChanged` |
| Workflow trigger | 274 `LmsSeatsChanged` (counts only, never which members) |
| Admin Assist | feature `lms-seats` (`Catalog/training.yaml`) |
