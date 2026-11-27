---
sidebar_position: 4
title: Training categories
slug: /web-app/trainings/categories
---

# Training categories

**Training categories** group training hours the way your regulator, licensing body, insurer or accreditor counts them: ISO company training, NCCP national component, HAZWOPER refresher, CPD structured learning. Every learning record can carry one category. Categories drive the category totals and targets on the [transcript](./transcript.md), the [hours report](./hours-report.md), which outside submissions [need review](./training-reviews.md), which hours [count toward a certification](./credit-mappings.md), and the CE / CPD files.

A category can have a **target** (hours per year, per month, per certification cycle, once, or within the first year) and a **retention** in years. Start from one of the built-in **templates** or make your own. **Categorize history** gives old, uncategorized records a category in bulk.

Categories, templates and bulk categorize are free for every department.

**Where to find it:** **Trainings → Records → Categories** and **Trainings → Records → Categorize** (department administrators and the roles named on **Assign Training**, permission 126, held department-wide). A training's own editor and the calendar event types choose a default category for the records they write.

![The training categories page with the department's categories and the template gallery](/img/web-app/trainings/rec-categories.png)

## Add or edit a category

1. Open **Trainings → Records → Categories**. The list shows each category's **Name**, **Code**, **Kind**, **Target** and **Keep records (years)**.
2. Under **Add a category** (or **Edit** on a row) fill in:

| Field | Meaning |
|---|---|
| **Name** | Required, up to 200 characters |
| **Code** | Optional, up to 50 characters, unique in the department. History imports match categories by code or name |
| **Kind** | Custom, ISO FSRS, NREMT NCCP, OSHA, State or province. The ISO report reads the ISO FSRS categories; the NCCP report reads the categories with the codes NCCP-NAT, NCCP-LOC and NCCP-IND |
| **Target hours** and **Target period** | The hours a member should reach: *Per year*, *Per month*, *Per certification cycle*, *Once*, *Within the first year*, or *No target* |
| **Target applies to** | Who the target is for, in your words, for example *per member* or *per licensed officer* |
| **External code** | The code a regulator, licensing body or third-party export uses for this category |
| **Keep records (years)** | Minimum years records in this category are kept after a member leaves (0–75). Empty uses the department default from the [settings](./settings.md) |
| **Description** | Optional, up to 1,000 characters |

3. Select **Save category**.

**Delete** removes a category from the pickers. Records keep it and show it as *Name (removed)* on the transcript and in reports; nothing is lost.

:::note
Resgrid keeps former members' training records; it does not delete them when someone leaves. The retention years are stored with the category and included in the [data export](/web-app/trainings/exports-and-currency#data-export) as your policy. No automatic purge uses them.
:::

## Start from a template

**Category templates** add a ready set of categories with their codes and targets. Applying a template only adds the categories you do not have yet; nothing is applied automatically. **Add missing categories** appears when part of a template is already there, and **Applied** when all of it is. Templates are listed in your language, and the ones that fit the department's organization type are marked **Suggested for your organization** and listed first. The targets are hours, not ISO point values.

| Template | Categories (code) and targets |
|---|---|
| **ISO FSRS training** | Use of training facilities (ISO-FAC) 18 h per year; Company training (ISO-CO) 192 h per year; Officer training (ISO-OFF) 12 h per year; New driver/operator (ISO-DRV-NEW) 60 h once; Existing driver/operator (ISO-DRV) 12 h per year; Hazardous materials (ISO-HAZ) 6 h per year; Recruit training (ISO-REC) 240 h in the first year; Pre-fire planning inspections (ISO-PFP), credited from Records with the LMS add-on |
| **NREMT NCCP recertification** | National (NCCP-NAT), Local (NCCP-LOC) and Individual (NCCP-IND) components per 2-year cycle; the hours per level (EMR, EMT, AEMT, Paramedic) are in *Target applies to* and in the NCCP report |
| **OSHA annual topics** | Bloodborne pathogens, annual (OSHA-BBP, kept 3 years); HAZWOPER refresher (OSHA-HAZWOPER) 8 h per year |
| **Workplace compliance training** | Onboarding, policy acknowledgments, conduct and anti-harassment, workplace safety, data protection |
| **Industrial and hazardous materials safety** | Hazardous materials refresher, confined space, lockout/tagout, respiratory protection and fit testing, hazard communication, ERT drills |
| **Search and rescue team training** | Navigation, search tactics, wilderness first aid, technical rescue, exercises and callout drills |
| **Law enforcement in-service training** | In-service hours, use of force and de-escalation, weapons qualification, legal updates, first aid |
| **Security officer licensing hours** | Initial licensing training, licence renewal training, site and post orders, first aid, use of force and restraint |
| **Continuing professional development (CPD)** | Structured learning, self-directed learning, practice and skills, per cycle |
| **Canada workplace training** | Hazard communication (WHMIS-style), workplace first aid, health and safety committee, workplace violence and harassment, transportation of dangerous goods |
| **EU workplace training** | First aid at work, fire safety and evacuation, explosive atmospheres (ATEX-style), manual handling, display screen work |

Apart from ISO, NCCP and OSHA, the templates give the structure only: set each target to the rule that applies where you operate.

## Categorize history in bulk

Records written before you had categories (completed trainings, imported rows without a category) land in *Uncategorized*, and so does every training log participant record, because training logs carry no category. **Categorize** fixes them in groups; a record keeps its category when its log is edited later.

1. Open **Trainings → Records → Categorize**. Optionally limit the period with **From** and **To**, then **Filter**.
2. **Uncategorized records** lists groups with the same course name and code, largest first, with the number of **Records**, the **Dates** they span and the **Hours**.
3. For a group, choose a **Category** and select **Apply**. The page says how many records were categorized.

Records in a category that a certification counts become [certification credits](./credit-mappings.md) only from the date the mapping was turned on; use **Apply history to credits** for older ones.

![Bulk categorizing uncategorized records grouped by course name](/img/web-app/trainings/rec-categorize.png)

### Walkthrough: categorize last year's drill nights

Cedar Valley has a year of training logs titled *Monday night drill* with no category.

1. Dana Whitlock applies the **ISO FSRS training** template on **Categories**.
2. On **Categorize** she sets **From** to 1 January and **To** to 31 December of last year and selects **Filter**.
3. Next to *Monday night drill (46 records)* she picks *Company training* and selects **Apply**: *46 records categorized.*
4. The hours report grouped by category now shows the company training hours against the 192-hour target.

## Setup examples

| Organization | Categories |
|---|---|
| **Career fire (US)** | ISO FSRS template; a custom *EMS continuing education* (24 h per year) for the EMT certification credit |
| **EMS agency** | NREMT NCCP template plus a state category (Kind *State or province*, external code from the state office) |
| **Volunteer fire** | Custom *Drill night*, *Hazmat awareness*, *Driver training*, with a yearly target for the drill category |
| **Search and rescue** | SAR template; *Technical rescue* reviewed when members submit outside courses |
| **Industrial ERT** | Industrial and hazardous materials safety template, OSHA annual topics; *Bloodborne pathogens* kept 3 years |
| **Law enforcement / security** | Law enforcement in-service or security licensing template; renewal hours *Per certification cycle* |
| **Canada / EU** | Canada or EU workplace template, targets set to the provincial or national rules |
| **Business / CPD** | CPD template, cycle targets set to the professional body's rules |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/TrainingRecords/Categories?id=`, POST `SaveCategory`, `DeleteCategory`, `ApplyTemplate?key=`; `/User/TrainingRecords/Categorize?from=&to=` (GET, POST) |
| Permissions | Department-wide record managers: department admins and the roles on Assign Training (126); no-row default follows Create Training (3) |
| Model | `TrainingCategories` (name, code, kind, target hours and period, applies to, external code, retention years, template key, soft delete); migration M0344 |
| Kinds | 0 Custom, 1 ISO FSRS, 2 NREMT NCCP, 3 OSHA, 4 State or province |
| Target periods | 0 No target, 1 Per year, 2 Per month, 3 Per certification cycle, 4 Once, 5 Within the first year |
| Templates | `TrainingCategoryTemplateCatalog`: `iso-fsrs`, `nremt-nccp`, `osha-annual`, `workplace-compliance`, `industrial-safety`, `sar-team`, `law-enforcement-in-service`, `security-licensing`, `cpd-hours`, `canada-workplace`, `eu-workplace` |
| Audit log | Training category changed |
| v4 API | `GET api/v4/Trainings/GetTrainingCategories` |
