---
sidebar_position: 5
title: Certification credit mappings
slug: /web-app/trainings/credit-mappings
---

# Certification credit mappings

A **credit mapping** says that the verified hours of a [training category](./categories.md) count toward the renewal of a [certification type](/web-app/business-ops/certifications). Once a mapping is on, every verified record in that category becomes a **continuing-education credit** on the member's certification record, in the cycle that contains the completion date. Renewal progress then fills in from the training members already do, instead of being typed onto each certification.

Records completed before a mapping was turned on, and history from the [backfill](./history-backfill.md) or an [import](./history-import.md), never become credits by themselves. **Apply history to credits** shows each proposed credit beside the credits already in the cycle, and writes only what you tick.

Credit mappings are free for every department.

**Where to find it:** **Trainings → Records → Credits**. Department-wide record managers (department admins and the roles named on **Assign Training**, permission 126) see the page. Adding, changing or deleting mappings and applying history also needs **Manage Certifications** (permission 42) or department admin; everyone else reads *Department administrators and certification managers change credit mappings.* Only person certification types can be mapped.

![Credit mappings page with the Add a mapping form](/img/web-app/trainings/rec-credit-mappings.png)

## How a credit is made

A verified record becomes a credit when all of these hold:

- it has hours and a category, and an enabled mapping counts that category (and component, when the mapping names one);
- it was completed on or after the day the mapping was turned on;
- the member has a record of that certification type whose issue and expiry dates contain the completion date, and that record is not revoked;
- it is not itself a credit typed by hand on a certification (those already are credits).

The credit carries the completion date, the hours, the category name and the course title, and shows as **From transcript** on the certification record, next to the hand-entered credits. The certification record shows the progress, for example *8 of 24 hours toward the next renewal*.

If the record is later voided or corrected, its credit is removed (and a corrected record makes a new one). Deleting a mapping stops new credits; credits already written stay on the certification records.

## Add a mapping

1. Open **Trainings → Records → Credits**. If the page says *Add person certification types and training categories first*, create them under **Certifications → Certification types** and **Categories**.
2. Under **Add a mapping** choose the **Certification type** and the **Category**.
3. Optionally enter a **Component** to count only that part of the category; empty counts all of it.
4. Leave **Counting** ticked and select **Save mapping**. *Verified records completed from today become credits in the certification cycle that contains them.*

A certification can count several categories (one mapping each), and one category can count toward several certifications. The same certification and category (and component) can be mapped only once.

**Pause** stops new credits without deleting the mapping; **Resume** turns it on again from that day, so records completed while it was paused need **Apply history to credits**.

## Apply history to credits

1. On **Credits**, under **Apply history to credits**, select **Apply history to credits** next to a certification type.
2. The tiles show the **Proposed credits**, the **Proposed hours** and how many records fall **Outside every cycle** (the member holds no record of that certification covering the date).
3. Each certification cycle lists the member, the cycle dates, the hours required, *Manual credits … · from the transcript … · proposed …*, the **Credits already in this cycle**, and the proposed records, all ticked. Backfilled records show **From history**.
4. Untick any record that should not become a credit (for example hours the member already typed in as a manual credit), then select **Apply selected credits**. *Nothing is written until you apply.*

![Apply history to credits for the NREMT EMT certification type](/img/web-app/trainings/rec-apply-history.png)

## Walkthrough: count EMS CE toward the EMT licence

Cedar Valley's EMTs need 24 hours of continuing education per two-year licence cycle. Rosa Delgado's EMS CE nights are calendar events of the type *EMS CE night*, which counts as training with the default category *EMS continuing education*; members check in and out.

1. Dana Whitlock (admin) opens **Trainings → Records → Credits**, chooses **Certification type** *State EMT licence* and **Category** *EMS continuing education*, leaves **Component** empty and **Counting** ticked, and selects **Save mapping**.
2. From now on, each verified CE night check-in becomes a credit on the member's *State EMT licence* record, and approved outside CE submissions in that category do the same.
3. For the CE nights before today, Dana selects **Apply history to credits** for *State EMT licence*, checks Priya Raman's cycle (she typed one 4-hour conference in by hand already), unticks the matching imported row, and selects **Apply selected credits**: *14 credits written.*
4. Priya's certification record now shows her hours toward renewal, with the derived credits marked **From transcript**.

## Setup examples

| Organization | Certification type ← category |
|---|---|
| **EMS agency** | NREMT EMT / Paramedic ← NCCP national, local and individual components; state licence ← *EMS continuing education* |
| **Career fire** | Fire con-ed (24 h) ← *Company training*; Hazmat Technician ← *Hazardous materials* |
| **Volunteer fire** | Driver/Operator ← *Driver training* |
| **Industrial ERT** | HAZWOPER (annual refresher) ← *HAZWOPER refresher* |
| **Security company** | Guard card renewal ← *Licence renewal training* |
| **Law enforcement** | Peace officer licence ← *In-service training hours* |
| **CPD (UK, EU, Canada)** | Professional registration ← *Structured learning* and *Practice and skills* (one mapping each) |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/TrainingRecords/Credits?id=`, POST `SaveMapping`, `DeleteMapping`; `/User/TrainingRecords/ApplyHistory?typeId=` (GET preview, POST `recordIds[]`) |
| Permissions | View: Assign Training (126) department-wide or department admin. Change and apply history: also Manage Certifications (42) or department admin |
| Model | `CategoryCreditMappings` (certification type, category, component, enabled, enabled on); `PersonnelCertificationCredits.LearningRecordId` links a derived credit to its record; migrations M0344, M0345 |
| Rules | Credits only for verified records with hours and a category, completed on or after the mapping's enabled date, inside a non-revoked certification cycle; backfilled and imported records only through Apply history; one credit per record and cycle |
| Audit log | Category credit mapping changed; certification credit added |
| Workflow triggers | Certification credit added (see [Certifications](/web-app/business-ops/certifications#notifications-and-workflows)) |
| v4 API | `GET api/v4/Certifications/GetCertificationCredits`, `POST api/v4/Certifications/AddCertificationCredit` (hand-entered credits) |
