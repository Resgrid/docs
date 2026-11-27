---
sidebar_position: 8
title: Hours report, ISO and NCCP
slug: /web-app/trainings/hours-report
---

# Training hours report, ISO and NCCP reports

The **Training hours** report answers how many hours the department trained, and in what: verified hours by **category**, **member** or **month** for any period, with CE hours, targets, and CSV and PDF export. It is free for every department.

With the LMS add-on, two formatted reports join it: the **ISO report** (each member's hours in the ISO FSRS categories against their targets) and **NCCP progress** (each EMS member's national, local and individual hours in their current NREMT recertification cycle).

**Where to find it:** **Trainings → Records → Hours**, and with the LMS add-on **ISO report** and **NCCP progress** in the same strip (department administrators and the roles named on **Assign Training**, permission 126, held department-wide). The same reports, scheduled and e-mailed, are in the LMS report catalog under **Trainings → Programs → Reports** ([programs and plans](/web-app/trainings/programs-and-plans)).

![The training hours report grouped by category with targets](/img/web-app/trainings/rec-hours-report.png)

## Run the hours report

1. Open **Trainings → Records → Hours**. It opens on 1 January of this year to today, grouped by category.
2. Choose **From** and **To**, **Group by** (*Category*, *Member* or *Month*), and optionally one **Category**.
3. Tick **Include former members** to count people who have left (marked *Former member*), or **On duty now only** to count only the members on duty right now (from the department's shifts).
4. Select **Filter**.

The tiles show **Total hours**, **Records**, **Members** and **Pending** records. If records are still pending, **Open the queue** takes you to the [records queue](./transcript.md#the-records-queue); if unresolved possible duplicates exist, the total says how many (*Unresolved possible duplicates: N*), so you know the figure may still change.

Each row shows the group, the number of **Records**, **Members** (when not grouped by member), **Hours**, **CE hours**, and, grouped by category, the category's **Target** (for example *192 h per member*). **CSV** and **PDF** export the report with the same filter; the PDF says who generated it and when.

Only verified records count: pending, rejected and voided records are left out.

### Walkthrough: the annual report

1. For Cedar Valley's annual report, Marcus Ellery sets **From** to 1 January and **To** to 31 December of last year, **Group by** *Category*, and ticks **Include former members**.
2. He selects **Filter**, checks that **Pending** is 0, and exports **PDF** for the board packet.
3. He changes **Group by** to *Month* and exports **CSV** for the chart in the budget request.

## ISO report (LMS)

**Trainings → Records → ISO report** lists each member's hours in the ISO FSRS training categories for the period, beside each category's target, and marks *Target met*. It needs the categories of the **ISO FSRS training** template (*Apply the ISO FSRS category template first*). Choose **From** and **To** (default this year), optionally **Include former members**, then **Filter**; export **CSV** or **PDF**. The report shows targets only, not ISO point values, and says *Resgrid is not a continuing-education accreditor*.

![The ISO FSRS training report filters](/img/web-app/lms/rec-iso-report.png)

## NCCP progress (LMS)

**Trainings → Records → NCCP progress** lists each member who holds a certification at an NREMT level (EMR, EMT, AEMT or Paramedic, read from the certification type's code or name) with the **Certification type**, **Level**, **Cycle** and their **National**, **Local** and **Individual** hours in the current cycle against the level's targets, for example *14 of 20 h*.

| Level | National | Local | Individual (per 2-year cycle) |
|---|---|---|---|
| Paramedic | 30 h | 15 h | 15 h |
| AEMT | 25 h | 12.5 h | 12.5 h |
| EMT | 20 h | 10 h | 10 h |
| EMR | 8 h | 4 h | 4 h |

It needs the **NREMT NCCP recertification** categories (codes NCCP-NAT, NCCP-LOC, NCCP-IND) and members' certification records with their issue and expiry dates (the cycle). Export **CSV** or **PDF**; **Include former members** adds people who have left. The LMS report catalog also has *NCCP export for a member*, every verified record of one member's current cycle with CE provider and course numbers, ready for their own recertification.

![The NCCP progress page](/img/web-app/lms/rec-nccp-progress.png)

## Setup examples

| Organization | Report |
|---|---|
| **Career fire / ISO** | ISO report each quarter for the ISO review file; hours report by member for officer evaluations |
| **EMS agency** | NCCP progress monthly; before a paramedic re-registers, the training officer runs the *NCCP export for a member* for them |
| **Volunteer fire** | Hours report by category for the annual meeting and grant applications; by month for drill attendance trends |
| **Search and rescue** | Hours by member with **Include former members** for the sheriff's annual report |
| **Industrial ERT** | Hours by category filtered to *HAZWOPER refresher* for the OSHA file |
| **Security / law enforcement** | Hours by member, **On duty now only**, to see who on the current shift is behind on in-service hours |
| **Canada / EU** | Hours by category with the Canada or EU workplace categories; the PDF prints on A4 in the reader's language |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/TrainingRecords/Hours?from=&to=&groupBy=&categoryId=&former=&onDuty=`, `HoursCsv`, `HoursPdf`; `/User/TrainingRecords/IsoReport?from=&to=&former=&format=` (`csv` or `pdf`); `/User/TrainingRecords/NccpReport?former=&format=` |
| Permissions | Department-wide record managers (Assign Training 126, or department admin) |
| Grouping | 0 Category, 1 Member, 2 Month |
| LMS gate | ISO report and NCCP progress: operator flag `Training.Lms`, an active LMS add-on, and the records right; otherwise the pages answer *not found* |
| Report catalog keys | `training-hours` (free), `iso-fsrs`, `nccp-progress`, `nccp-member` (LMS) |
| Counted | Verified records only; up to 50,000 records read per report |
