---
sidebar_position: 6
title: Skills and Task Books
---

# Skills and Task Books

**Skills** records hands-on performance: an evaluator grades a member, or a whole crew, against a **skill sheet** of ordered steps with critical criteria, timers, evidence and signatures, and the signed result becomes a sealed record and a training record. **Position task books** collect those evaluations task by task until a final evaluator recommends the trainee and a certifying official certifies them.

Skills and task books are part of the **LMS add-on** ([LMS add-on](/web-app/trainings/lms/)). *Everything recorded stays readable*: while the add-on is lapsed, open evaluations and task books can be finished, but nothing new can be started.

**Where to find it:** **Trainings → Skills** (shown while the `Training.Lms` flag is on). The Skills strip has **Overview**, **Skill sheets**, **Evaluations**, **Task books**, **Definitions** and **Settings**.

| Who | What they can do |
|---|---|
| Every member | Read their own results and task books; sign when an evaluation waits for their signature. |
| Evaluators | Run the sheets their rule allows: members holding a valid certification of a chosen type, or a chosen role. A sheet with no rule is evaluated by LMS managers only. |
| LMS managers: department admins and holders of **Manage Courses** (132) | Author skill sheets and task book definitions, initiate task books, see every evaluation, void evaluations, change settings. |

**Overview** shows **Evaluations I am running**, **Evaluations waiting for my signature**, **Task books you can sign tasks in**, **My results** and **My task books**, with **Start an evaluation**.

## Skill sheets

**Skills → Skill sheets** lists your sheets and the **Skill-sheet template library** (*Resgrid-authored starting points: structure only. Adapt them to your equipment and procedures before use*), for example *SCBA donning*, *Hoseline advance and flow*, *Ground ladder raise*, *Forcible entry (inward-swinging door)*, *Primary search*, *Pump operations*. **Use template** copies one as a draft; **New skill sheet** starts from a **Title**, **Skill code** and **Kind** (**Skill sheet** or **Daily observation report**).

### Sheet details and signers

| Field | Notes |
|---|---|
| **Title**, **Description** | |
| **Skill code** | Used as the course code on the transcript and by *Pass skill evaluations* [requirements](./paths-and-requirements.md). |
| **Training category credited** | Where the hours land. |
| **Who may evaluate** | **Certification types** and **Roles**. None chosen: LMS managers only. |
| **Who the evaluator may pick to sign next** | When set, the evaluator must pick a member this rule allows; that member signs after the evaluator. |
| **Allow team evaluations (one form for several members)** | |
| **Allow members to evaluate themselves** | |

### Steps

The step editor (it needs JavaScript) builds the ordered steps. Each step has a **Key**, the **Step** label, **Instructions to the evaluator** and a **Question type**:

**Pass / fail**, **Rating scale** (with **Lowest passing rating**), **Choose one**, **Choose any** (options one per line: the label, its points, and a fail marker for an option that fails the step), **Number** (**Lowest passing value**, **Highest passing value**), **Duration (timed)**, **Date**, **Time**, **Date and time**, **Text**, **Timestamped notes**, **Photo, video or file**, **Computed value** (**Average**, **Sum**, **Lowest** or **Highest** of the steps it names), plus **Heading** and **Instructions** for layout.

Per step: **Critical** (not meeting it fails the evaluation whatever the score), **Weight**, **Answer required**, **Allow "not applicable"**, **Note when failed** and **Evidence when failed**.

Scoring: **Pass mark (%)**, **Failed attempts allowed (0 = no limit)**, **Attempt window (days)**, **Time limit (seconds, 0 = none)** and **Minutes credited when not timed**.

**Save draft**, then **Publish** (tick **Major version (re-evaluation may be needed)** for a major change) with a **Change summary**. New evaluations use the version in force; **Retire skill sheet** keeps its evaluations on record.

![Skill sheet editor with steps, critical criteria and scoring](/img/web-app/lms/skills-sheet-editor.png)

## Running an evaluation

1. **Start an evaluation**: choose the **Skill sheet** (or **No sheet (pass/fail)**) and the **Members evaluated** — one member, or several for a team evaluation when the sheet allows it. Optionally a **Call number**, **Deployment number** and **Location**. *The timer starts now.*
2. The run page shows each step. Grade it; add an **Annotation**; **Add a note (time is recorded)**; **Add evidence** (photo, video or file up to 30 MB, with *For step*). **Pass all remaining steps** speeds up a clean run. **Elapsed** shows the timer.
3. For a team: everyone gets the same result and record. **Split out** a member who should be graded differently; their answers so far are copied to their own evaluation.
4. **Submit and sign**: *The result is fixed and the signature opens.* If the sheet asks for a next signer, pick them; they sign after you. If the evaluator is from outside, tick **An outside evaluator signs instead** with **Their name**, and either sign on this device or **Send a signing link instead of signing on this device** to **Their email**.

A critical step not met or a time limit exceeded means *not passed*, whatever the score. Signing uses Resgrid's e-signatures, including the multi-signer steps and outside signers by link; see [e-Sign](/web-app/signatures/).

![Evaluator mode running a team evaluation of SCBA donning for two members](/img/web-app/lms/skills-run-evaluation.png)

## The evaluation record

**Skills → Evaluations** lists every evaluation in the department by sheet and state (**Open**, **In progress**, **Awaiting signature**, **Completed**, **Voided**). The evaluation page shows the result, every step, the evidence and the signatures. **Sealed record (PDF)** downloads the sealed record; each evidence file's SHA-256 is part of it. If sealing is still running, the page says *Signed, sealing pending*.

**Void evaluation** (LMS managers) takes a **Reason for voiding**; *its learning records are voided too*.

## Task books

**Skills → Definitions** holds the position task books (and **Task book starters** written by Resgrid: position codes, task numbers and short task names only, for example *Firefighter Type 2 (FFT2)*, *Engine Boss (ENGB)*, *Fire Officer I*, *Driver/Operator - Pumper*, *Powered industrial truck operator*, *NCCP skills verification - EMT*; enter each task's text from your own copy).

**New task book definition** (or **Use template**):

| Field | Notes |
|---|---|
| **Position code**, name, **Description** | |
| **Family** | **Wildland (NWCG)**, **Officer**, **Driver/operator**, **OSHA operator evaluation**, **NCCP skills verification**, **Field training**, **Custom**. |
| **Certification activated** | Initiating a book opens a *Trainee* record of this certification type; certification makes it *Active*. |
| **Valid for (months)** | The book must be finished within it. |
| **Re-evaluate after (months)** | The certified record's expiry (OSHA operators: 36). 0 uses the certification type's own validity. |
| **Tasks** | **Add task**: number, title, the skill sheet it uses, **Evaluations needed** (1 to 50), and **Incident task** for tasks that count only evaluations on a call or deployment. Up to 200 tasks. |
| **Who signs tasks**, **Final evaluator**, **Certifying official** | Rules by certification type or role. |

**Skills → Task books → Initiate task book**: the definition, the trainee and **Initiated on**. Evaluators who meet the *Who signs tasks* rule run each task's sheet on the trainee; each passed evaluation counts toward the task's **Evaluations needed**, and **Tasks complete** tracks progress. When every task is complete, **Request certification** names the **Final evaluator** and the **Certifying official** (three different people from the trainee). *The final evaluator recommends, then the certifying official certifies; both sign at L2.* The book becomes **Certified** and its certification record **Active**. A book can be **Cancel task book** with a reason (signed tasks stay on record); an open book past its validity becomes **Expired**.

Task book statuses: **Open**, **Awaiting certification**, **Certified**, **Cancelled**, **Expired**.

![Position task book FFT2 for Sam Kowalczyk with its tasks](/img/web-app/lms/skills-task-book.png)

## Settings: skill notices

**Skills → Settings** (department setting 146):

| Setting | Notes |
|---|---|
| **Deliver notices** | **Off**, **Immediately**, **Daily digest**, **Weekly digest**. |
| **Digest time (department time)**, **Weekly digest day** | |
| **Notify the evaluated members and trainees about their own evaluations and task books** | |
| **Notify the department admins about every evaluation and task book** | |

Daily and weekly digests collect every notice due into one message per person. Inactive members never receive notices.

## Reports

From [Programs → Reports](./programs-and-plans.md#training-reports): **Skill evaluations: pass/fail** (by sheet or member: passed, not passed, pass rate, critical failures, average score) and **Skill evaluations: ratings by question** (rating-scale answers per sheet, question and month).

## Walkthrough: build a skill sheet and evaluate a crew

1. Dana Whitlock opens **Skills → Skill sheets**, finds *Hoseline advance and flow* in the template library and presses **Use template**.
2. In **Sheet details and signers** she sets **Who may evaluate** to the role *Company Officer* and ticks **Allow team evaluations**. She adds a step for the department's standpipe procedure and marks *Maintains crew integrity* **Critical**. **Save draft**, then **Publish**.
3. At drill, Marcus Ellery (company officer) opens **Start an evaluation**, picks the sheet and Tomas, Owen and Sam.
4. He grades each step, adds a photo of the advance, and splits out Sam, who lost the nozzle on the stairs, to grade him separately.
5. **Submit and sign**. Tomas and Owen pass; Sam does not pass his critical step. The sealed records are on each member's results and transcript.

## Walkthrough: a driver/operator task book

1. **Skills → Definitions → Task book starters**: *Driver/Operator - Pumper* → **Use template**. Set **Certification activated** to *Driver/Operator Pumper*, **Valid for (months)** 12, and the signer rules.
2. **Skills → Task books → Initiate task book** for Owen Thatcher. His *Driver/Operator Pumper* certification is now *Trainee*.
3. Over the year, evaluators run each task's sheet; incident tasks are evaluated with the call number of a real response.
4. With every task complete, Owen's book shows **Request certification**. Marcus Ellery recommends and signs, then Dana Whitlock certifies and signs. The certification becomes *Active*.

## Setup examples

| Organization | How they use skills and task books |
|---|---|
| **Fire** | JPR-style skill sheets for SCBA, ladders and pump operations; Fire Officer I and driver/operator task books; crew evaluations at drill. |
| **EMS** | NCCP skills verification sheets signed by the training officer, with the medical director as next signer for paramedic skills. |
| **Wildland / SAR** | NWCG task books (FFT2, FFT1, ENGB, ICT5) with incident tasks evaluated on real deployments. |
| **Industrial / HAZMAT** | OSHA forklift (powered industrial truck) operator evaluations that expire after 36 months; outside evaluators sign by link. |
| **Law enforcement / security** | Field training daily observation reports with rating scales and timestamped notes. |
| **Business** | Equipment sign-offs for new hires with photo evidence. |

## Technical reference

| Item | Value |
|---|---|
| Controller and routes | `LmsSkillsController`: `/User/LmsSkills/Index`, `Settings`, `Sheets`, `Sheet`, `Start`, `Run`, `Evaluation`, `Evaluations`, `EvidenceFile`, `Pdf`, `TaskBooks`, `TaskBook`, `Definitions`, `Definition`; posts `CreateSheet`, `UseTemplate`, `SaveSheet`, `SaveDraft`, `Publish`, `DeleteSheet`, `Evidence`, `Split`, `Void`, `Initiate`, `RequestCertification`, `CancelTaskBook`, `UseTaskBookTemplate`, `SaveDefinition`, `DeleteDefinition` |
| Permissions | `ManageCourses` (132) and department admins author; evaluator and signer rules per sheet and definition (certification types and roles) |
| Feature flag and add-on | `Training.Lms` and the LMS add-on |
| Setting | `LmsSkillSettings` (146): notice delivery, digest time and day, who is notified |
| Worker | LMS Skills (worker 96, every 5 minutes): sends due evaluation and task book notices (immediate or digest) and expires open task books past their validity |
| Workflow triggers | 262 skill evaluation completed, 263 task book closed |
| Migrations | M0381 (skill sheets), M0382 (evaluations), M0383 (task books), M0384 (skill notifications) |
| v4 API | `LmsSkills/GetMyPendingEvaluations`, `GetEvaluatorSheets`, `GetEvaluation`, `GetMyResults`, `StartEvaluation`, `SaveEvaluation`, `AddEvidence`, `SubmitEvaluation`, `SubmitOfflineEvaluation`, `SignEvaluation`, `GetTaskBooks` |
