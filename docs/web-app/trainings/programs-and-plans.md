---
sidebar_position: 4
title: Programs, Plans and Training Requests
---

# Programs, Plans and Training Requests

**Programs** holds the tools a training officer uses to run a year of training: the **annual training plan** compared with the hours actually recorded, **competency frameworks** and each member's gaps, **training requests** for outside classes with their cost and approval, the **training report** catalog with scheduled reports, **certification cycles** and **certification requirements**.

Programs is part of the **LMS add-on** ([LMS add-on](/web-app/trainings/lms/)). *Everything here stays readable; new plans, requests, schedules and changes need an active add-on.* While the add-on is lapsed, open training requests can still be decided, withdrawn or completed.

**Where to find it:** **Trainings → Programs** (shown while the `Training.Lms` flag is on). The Programs strip:

| Tab | Who sees it |
|---|---|
| **Overview** | Everyone. |
| **Annual plans**, **Reports**, **Settings** | Officers: department admins and holders of **Assign Training** (126) department-wide. |
| **Competencies** | Everyone reads; officers edit. |
| **Training requests** | Everyone (their own requests); approvers see what waits for them; officers see all requests. |
| **Certification cycles** | Department admins and holders of **Manage Certifications** (42). |
| **Certification requirements** | Holders of **Manage Certifications** (42) edit; **View Certifications** (43) reads. |
| **CE reporting**, **Data export** | Officers, and department owners and admins; see [Exports and currency](/web-app/trainings/exports-and-currency). |

## Overview

The **Overview** shows the member's own items — **My open requests**, **Waiting for my decision**, **My competency gaps**, **My NCCP export** — and, for officers, counts for plans, frameworks and cycles and the **Saved reports**.

![Programs overview with the tab strip and summary tiles](/img/web-app/lms/programs-overview.png)

## Annual training plans

**Programs → Annual plans → New annual plan**: **Name**, **Year**, **Covers** (**The whole department**, **A group** or **A shift**) and **Notes**, then **Create plan**.

On the plan:

1. **Plan a session**: the category, month, title, **Hours per member per session**, **Sessions**, an optional **Planned date** and notes.
2. **Planned against actual**: per category, the annual target (set on the training category), hours planned for the year, hours recorded so far, the **forecast** (recorded so far plus everything still planned) and the status, **On track** or **At risk**. *The plan alone does not reach the target* and *Short by N h* point out gaps. Hours are per member of the plan's audience. A callout says how many categories are forecast to miss their target.
3. **By month (planned / actual)** shows the same month by month.
4. **Make it a calendar item** on a planned session creates a [class session](./classes.md) on the calendar from it; **Open the class** follows it.
5. **Adopt plan** when it is agreed, **Archive plan** at year end, **Copy to year** to start next year's plan as a new draft, **As a report** to run it from the report catalog.

Plan statuses are **Draft**, **Adopted** and **Archived**.

![Annual plan with planned against actual and the planned sessions](/img/web-app/lms/programs-annual-plan.png)

## Competency frameworks and the gap report

**Programs → Competencies** holds the job performance requirements, positions and skills your training builds toward, what evidences each one, and every member's gaps.

- **Catalog**: frameworks Resgrid ships, with structure and public identifiers only (position codes, qualification levels, skill names), never a standard's text: *NFPA 1010 qualification levels*, *NFPA 1020 qualification levels*, *NWCG wildland positions*, *NREMT EMT psychomotor skills*. **Apply** adds one to your department.
- **Import a CASE 1.1 framework**: upload the JSON package a regulator, standards body or college publishes (up to 10 MB, 5,000 items). Importing the same document again updates it.
- **New custom framework**: **Name**, **Publisher**, **Edition**, **Description**, and **Evidence counts as current for (months)** (0 means evidence never ages).

On a framework, **Add an item** with its public identifier (for example a JPR number), a **Short label**, a **Kind** and where it sits (**Under**). Do not paste the standard's text. **Tag** each item with what evidences it — a **Course**, **Training**, **Skill sheet**, **Task-book task**, **Category** or **Certification** — and **Remove tag** to undo.

**Gap report**: for each item of a framework, the member's newest evidence and how old it is: **Current**, **Aged**, **No evidence** or **Not tagged**. Every member reads their own gaps; officers and group admins pick a member. Gaps also drive [recommendations](./paths-and-requirements.md#recommendations).

![Competency gap report for one member](/img/web-app/lms/programs-gap-report.png)

## Training requests

A member asks to attend an outside class with its cost; their supervisor and a training officer approve it, and once taken it goes on the transcript.

**Programs → Training requests → Request an outside class**: **Class**, **Provider**, **Location**, course code, **Starts**, **Ends**, **Tuition**, **Travel**, **Other costs** and **Why this class**, then **Submit request**.

Approval runs in steps set under **Settings**:

1. **Supervisor approval**: the admins of the member's group (and its parent groups), or the department admins when the member has no group.
2. **Training officer approval**: a department-wide training records manager (*Assign Training* department-wide) or a department admin.

With both on, the supervisor decides first; with both off, requests are approved as they are submitted. The steps are fixed on a request when it is submitted. Nobody decides their own request, and if two approvers decide at once only the first counts.

Approvers see **Waiting for my decision** and open a request: **Approve**, or **Reject** with a note (required). The member can **Withdraw** an open request; a training officer can cancel an approved one with **Cancel request** and a note.

After the class, the member opens the approved request and presses **I took this class**: **Completed on**, hours, **Actual cost** and a **Certificate or evidence** file. *Recorded. The class is on the transcript, waiting for an officer to verify it*: it becomes an [outside submission](/web-app/trainings/external-submissions/) the officer verifies.

Request statuses: **Submitted**, **Approved**, **Rejected**, **Withdrawn**, **Completed**, **Cancelled**. Officers see **All requests in** a year and the **Training request costs** report (committed and pending, per member, course or year).

Notices: the approver whose turn it is (*... asks to attend ... Please approve or reject it in Trainings > Programs > Training requests*), and the member when the request is approved, rejected or cancelled.

![A training request with its approval steps](/img/web-app/lms/programs-training-request.png)

## Training reports

**Programs → Reports** (officers) has three parts: the report catalog, **Saved reports** in folders, and reports sent on a schedule.

| Report | Tier | What it shows |
|---|---|---|
| **Training hours** | Free | Hours by category, member or month for a period. |
| **ISO training report** | LMS | Each member's hours in the ISO FSRS training categories for a period. |
| **NREMT NCCP progress** | LMS | National, local and individual hours of each member's current recertification cycle against the level's targets. |
| **NCCP export for a member** | LMS | Every verified record in a member's NCCP categories in their current cycle, with CE provider and course numbers. Members can run their own (**My NCCP export**). |
| **Annual plan against actual** | LMS | A plan's planned and actual hours per category, the forecast and any shortfall. |
| **Competency gaps** | LMS | A member's evidence per framework item. |
| **Training request costs** | LMS | Committed and pending request costs per member, course or year. |
| **Certification exceptions** | LMS | Expired, expiring, suspended, revoked and unverified certifications of active members. |
| **Compliance matrix** | LMS | Each active member against each live learning requirement. |
| Class reports | LMS | Class rosters, class enrolment, enrolment exceptions, series attendance, class costs, instructor hours ([Classes](./classes.md)). |
| Skill reports | LMS | Skill evaluations pass/fail and ratings by question ([Skills](./skills-and-task-books.md)). |

**Run** a report with its settings: **Period** (**This month so far**, **Last month**, **This quarter so far**, **This year so far**, **Last 12 months**, **Last year**, **From and to dates**), **Group by**, the plan, framework or member it needs, and **Include former members**. Download it as CSV or PDF.

**Save this report** keeps its settings in a **Folder** (**New folder**). A saved report can be sent on a **Schedule**: **Daily**, **Weekly** (day of the week), **Monthly** (day of the month 1 to 28), at an **Hour (department time)**, as a CSV or PDF **Attachment**, to **Recipients**. Recipients are members who manage training records and department admins; a member can also receive their own per-member report. Members who leave or are disabled are skipped. **Recent runs** shows each run as *Sent*, *Failed* or *Skipped*.

## Certification cycles

**Programs → Certification cycles** lists your person certification types with their renewal hours and validity, and a rule for each:

- **Next cycle**: **Not automatic**, **Starts when the renewal hours are met**, or **Starts at expiry when the renewal hours were met** (needs renewal hours and a validity in months on the certification type).
- **Alert days before expiry**, **Alert when the renewal hours are met**, **Alert when a cycle starts**, **Alert on expiry**.
- Who is told: **Tell the member's supervisors**, **Tell the department admins**, and **Also tell** named members.

The LMS Programs worker runs the rules once per department-local day; every renewal and alert happens once.

## Certification requirements

**Programs → Certification requirements** lists each certification with its requirement set: what a member must complete in each cycle to be issued the certification or to keep it — LMS courses, a course set or learning path, trainings, skill evaluations, continuing-education hours, and *supervised practicals* that count only when [recorded by an authorized instructor](./recording-completions.md#supervised-practicals). **Progress** shows who holds it and what is still open. Issuing, renewing and taking back certifications are described in [Certifications from training](/web-app/trainings/certifications-from-training).

## Program settings

**Programs → Settings** (officers, department setting 144):

| Setting | Notes |
|---|---|
| **The member's supervisor approves training requests** | On by default. |
| **A training officer approves training requests** | On by default. |
| **Training currency (ISO code, e.g. EUR, CAD, USD)** | Request costs are entered in it; classes default to it. Default USD. |
| **Credit building familiarization** | Completed occupancy inspections and pre-plan reviews in [Records](/web-app/records/overview) go on the transcript of the person who did them, in the **Category** you choose (for example ISO pre-fire planning). Choose **From occupancy inspections**, **From pre-plan reviews**, and **Minutes per visit when it has no start and end**. |

## Walkthrough: build the annual plan

1. Dana Whitlock opens **Programs → Annual plans → New annual plan**: *2026 Training Plan*, year 2026, **The whole department**. **Create plan**.
2. **Plan a session** for each monthly drill: *Fire Suppression*, January, *Hose evolutions*, 3 hours per member, 1 session; and so on through the year.
3. **Planned against actual** shows *Driver Operator* at risk: the plan alone gives 9 of the 12 hours the category targets. She adds a session in June.
4. **Adopt plan**. For the June session, **Make it a calendar item**; the class appears on the calendar and members can enrol.
5. In December, **Copy to year** 2027 starts next year's draft.

## Walkthrough: request and approve an outside class

1. Owen Thatcher (engineer) opens **Programs → Training requests → Request an outside class**: *Pump Operator Certification Class*, county fire academy, two days in May, tuition 450, travel 60, *Needed for the driver/operator task book*. **Submit request**.
2. Marcus Ellery, admin of Owen's group, is notified, opens the request from **Waiting for my decision** and **Approve**s it.
3. Dana Whitlock, as training officer, approves the second step. Owen is told it was approved.
4. After the class, Owen opens the request, **I took this class**, enters the date, 16 hours, the actual cost and uploads his certificate.
5. Dana verifies it from the outside submissions queue; the 16 hours go on Owen's transcript and the cost appears in **Training request costs**.

## Setup examples

| Organization | How they use Programs |
|---|---|
| **Fire (US)** | An annual plan against ISO FSRS category targets; the ISO training report monthly to the chief; building familiarization credit from pre-plan reviews; NFPA 1010 framework from the catalog with local JPR labels. |
| **EMS** | NREMT NCCP progress and member exports; certification cycles that start automatically when renewal hours are met; training requests for paramedic refreshers. |
| **SAR** | NWCG positions framework; requests for outside courses with travel costs. |
| **Industrial / HAZMAT** | A plan per shift; certification exceptions report weekly to the safety manager. |
| **Law enforcement / security** | A CASE framework imported from the state academy; training request approval by supervisor only. |
| **Canada / EU** | **Training currency** CAD or EUR; custom frameworks for provincial or national standards. |

## Technical reference

| Item | Value |
|---|---|
| Controller and routes | `LmsProgramsController`: `/User/LmsPrograms/Index`, `Settings`, `Plans`, `Plan`, `Frameworks`, `Framework`, `Gaps`, `Requests`, `ViewRequest`, `Reports`, `Report`, `ReportFile`, `NccpExport`, `Cycles`, `CertificationRequirements`, `EditCertificationRequirements`, `CertificationProgress`; posts `SavePlan`, `SetPlanStatus`, `CopyPlan`, `DeletePlan`, `SavePlanItem`, `DeletePlanItem`, `MakeCalendarItem`, `ApplyCatalog`, `ImportCase`, `SaveFramework`, `SaveCompetency`, `Tag`, `Untag`, `SubmitRequest`, `Decide`, `Withdraw`, `CancelRequest`, `CompleteRequest`, `SaveReport`, `SaveFolder`, `SaveCycleRule`, `SaveCertificationRequirements` |
| Permissions | Officers: department admins and `AssignTraining` (126) department-wide; `ManageCertifications` (42), `ViewCertifications` (43) |
| Feature flag and add-on | `Training.Lms` and the LMS add-on |
| Setting | `LmsProgramSettings` (144): request approval steps, currency, building familiarization |
| Worker | LMS Programs (worker 94, every 15 minutes): sends due scheduled reports, runs certification cycle auto-renew and alerts once per department-local day, credits building familiarization from Records |
| Workflow triggers | 265 training request submitted, 266 training request decided; certification events 275 to 278 |
| Migrations | M0367 (plans), M0368 (competency frameworks), M0369 (training requests), M0370 (reports and certification cycles), M0405 and M0406 (certification requirement sets and issuances) |
| v4 API | `LmsPrograms/GetMyTrainingRequests`, `GetMyCertificationProgress`, `GetTrainingRequestsAwaitingMe`, `SubmitTrainingRequest`, `WithdrawTrainingRequest`, `DecideTrainingRequest`, `CompleteTrainingRequest`, `GetMyCompetencyGaps` |
