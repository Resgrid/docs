---
sidebar_position: 3
title: Requirements and Learning Paths
---

# Requirements and Learning Paths

**Requirements** say what members must complete, who must complete it and by when, and keep score: every active member against every requirement that applies to them. **Learning paths** put courses, Academy lessons and trainings in order with prerequisites and electives. **Onboarding** assigns a path automatically when someone joins or is given a role, and **enforcement** can let an overdue refresher expire the certification it backs.

All of this is part of the **LMS add-on** ([LMS add-on](/web-app/trainings/lms/)). Without an active add-on the pages stay readable but nothing can be created or changed, and requirements are paused. Resgrid Academy role paths are free and can be used inside a requirement.

**Where to find it:** **Trainings → Requirements** (shown on the LMS pages while the `Training.Lms` flag is on). The section has its own strip:

| Sub-section | Who sees it |
|---|---|
| **Requirements** | LMS managers: department admins and holders of **Manage Courses** (132). |
| **Compliance** | LMS managers; holders of **Assign Training** (126) department-wide; group admins, for their group. |
| **Recommendations** | Everyone, while the add-on is active (their own; officers can pick a member in their scope). |
| **Paths** | LMS managers and those who may assign paths. |
| **Onboarding**, **Enforcement** | LMS managers. |

Members see their own requirements on **Trainings → My Training**: **Next requirement**, **My requirements** with status, due date and progress, and the steps of their paths (*done*, *available*, *locked*).

## Requirements

**Requirements → New requirement** opens the editor in five parts.

### What

| Field | Notes |
|---|---|
| **Name**, **Description** | |
| **Requirement type** | **Complete a course** (a department course or an Academy lesson), **Complete a training**, **Log hours in a category** (**Hours needed per period**), **Finish a learning path**, **Pass skill evaluations** (**Skill code** and **Passed evaluations needed**; see [Skills](./skills-and-task-books.md)). |

### When

| Field | Notes |
|---|---|
| **How often** | **Once**, **Every few months** (**Every how many months**, 1 to 120) or **Every calendar year**. |
| **Days to complete** | Counted from the day the member joins, is given the role, or otherwise enters the audience. |
| **Grace days** | After the due date the member shows *At risk* for this many days, then *Overdue*. |
| **Warn this many days before the due date** | The at-risk warning (default from Enforcement settings, 14 days). |
| **Only members who enter the audience from now on (onboarding)** | Existing members are not caught up. |
| **Assign the course or path to each member automatically (onboarding)** | The engine assigns it with the due date. |
| **When the Resgrid Academy publishes a major update of a lesson this requires** | **Tell the members who completed it**, **Re-assign it to the members who completed it, due in this requirement's days**, or **Do nothing**. Your own courses follow the choice made when each version is published. |
| **Active** | |

### Who

**Everyone**, or any mix of **Roles**, **Groups**, **Certifications**, **Shifts** and **Members**. Members who join, are given the role or otherwise enter the audience later get their own due date.

### Alerts

- **Tell the member's group admins when the member is overdue**.
- **Also tell these people** (named members).
- **Also tell them when a member completes or renews it**.

Members themselves get an at-risk notice and an overdue notice.

### Enforcement

- **Backs certification**: a certification type that expires. When a member is overdue past the grace period, their certification of this type can be expired.
- **Enforce: expire the certification when the member is overdue**. This also needs enforcement turned on for the department (below). Roles that require the certification are then removed by the certification module after its own grace period, and everything is given back when the member completes the requirement.

The **Requirements** list shows each requirement's **What**, **Who**, **How often**, member count, and badges for *Enforces*, *Auto-assigns* and *Inactive*.

![Requirement editor with What, When, Who, Alerts and Enforcement](/img/web-app/lms/requirements-editor.png)

## The compliance matrix

**Requirements → Compliance** shows each active member against each requirement that applies to them.

- Filters: **Requirement**, **Group**, **Status**; exports **CSV** and **PDF**.
- Each cell shows the state — **Compliant**, **Due later**, **At risk**, **Overdue**, **Exempt**, **On leave**, **Not licensed** — progress (for hours and paths), *Enforced* when enforcement acted, and *Recorded by instructor* when the completion was [recorded by someone else](./recording-completions.md). *Does not apply* marks requirements outside the member's audience.
- **Exempt or extend** per member: **Exempt** with a **Reason** and optional **Until**, **Lift exemption**, or **Extend** to a **New due date** with a reason. Group admins act only on their group's members.

Members without an [LMS seat](/web-app/trainings/lms/seats/) show as *Not licensed* and are never overdue. Leave periods entered under [Leave of Absence](./index.md#leave-of-absence) pause due dates here as well.

![Compliance matrix with states and the exempt or extend panel](/img/web-app/lms/requirements-compliance.png)

## Learning paths

**Requirements → Paths** lists **Department paths** and **Resgrid Academy role paths** (free; Resgrid maintains their steps, you can assign them and use them in requirements).

**New path**:

1. **Name**, **Description**, and optionally **Issue a certification on completion** (a certification type; see [Certifications from training](/web-app/trainings/certifications-from-training)).
2. **Steps**: each step is a **Course or Academy lesson** or a **Training**. Steps run in order.
   - **Needs steps**: the numbers of earlier steps that must be done first, for example `1,2`. A step can only need earlier steps.
   - **Elective group** and **Electives needed**: steps with the same group number are electives; the learner needs as many of them as *Electives needed* says.
   - Up to 60 steps; the same course or training cannot be listed twice.
3. **Save**.

**Assign this path** to **Everyone**, **Roles**, **Groups** or **Members**, with a **Due date**. **Progress** lists each assigned member, the due date, completed steps (*N of M steps*) and when they finished. Deleting a path keeps its assignments and completions.

![Learning path Probationary Firefighter Year One with three steps and prerequisites](/img/web-app/lms/requirements-path.png)

## Onboarding

**Requirements → Onboarding** lists the requirements marked for onboarding: *A learning path per role, assigned automatically with a due date when someone joins or is given the role.* **New onboarding** opens the requirement editor with the onboarding options set; pick **Finish a learning path**, the role in **Who**, the days to complete, and tick **Assign the course or path to each member automatically**.

## Enforcement

**Requirements → Enforcement** lets an overdue refresher expire the certification it backs, with a guard that stops any run that would empty a role.

**Settings** (department setting 143):

| Setting | Notes |
|---|---|
| **Turn on training-backed enforcement** | Off by default. Each requirement must also opt in. Nothing is enforced while the LMS add-on is inactive. |
| **Largest share of a role's members one run may remove (%)** | Default 20. A run that would remove more than this share of a role's members is refused, and the admins are told. |
| **Default warning for new requirements (days before due)** | Default 14. |
| **I have reviewed who would lose which role** | Needed to turn enforcement on. |

**Who would lose which role today** previews, before you save, each overdue member on an enforcing requirement, the certification that would expire, and the roles they would lose. It also says the certification module's own mode (*off*, *warn only*, *Enforce*) and its grace days, because roles are removed only in *Enforce* mode, after that grace (see [Certifications](/web-app/business-ops/certifications)). If today's run would break the share limit, the preview says it would be refused.

**Enforcement history** lists every action with its date, status (*In force* or *Undone*) and **Undo** (*The certification and the roles it took are given back*). Actions are undone automatically when the member completes, when the requirement no longer applies, or when the add-on lapses.

![Enforcement settings with the who-would-lose-which-role preview](/img/web-app/lms/requirements-enforcement.png)

## Recommendations

**Requirements → Recommendations** (and **Recommended for you** on My Training) lists learning paths, courses and Academy lessons to take next, each with **Why**: a requirement overdue, at risk or not met yet, a path in progress, a competency with no evidence or out-of-date evidence ([competency frameworks](./programs-and-plans.md#competency-frameworks-and-the-gap-report)), or a course offered to the member's role. **Continue** or **Open** goes straight to it. Officers pick a member in their scope and press **Show**.

With Enhanced AI, **Explain with AI** writes a short explanation from the reasons shown. Only the titles and reasons are sent to the department's AI model, never names; nothing is saved.

## When the add-on lapses

*The LMS add-on is not active, so requirements are paused: nothing becomes overdue and nothing is enforced until it is reactivated.* Open enforcement actions are undone. On reactivation due dates are moved on.

## Walkthrough: an annual refresher with enforcement

Dana Whitlock wants every interior firefighter to complete the SCBA refresher each year, or lose interior status.

1. Check that the certification type *SCBA Qualified* expires, and that the role *Interior Firefighter* requires it (Certifications setup).
2. **Requirements → New requirement**: **Name** *Annual SCBA Refresher*, **Requirement type** *Complete a training* → *Annual SCBA Refresher 2026*.
3. **How often** *Every calendar year*, **Days to complete** 30, **Grace days** 14.
4. **Who**: roles *Firefighter* and *Engineer*. **Alerts**: tell group admins when overdue.
5. **Backs certification** *SCBA Qualified*, tick **Enforce**. **Save**.
6. **Requirements → Enforcement**: review **Who would lose which role today**, tick **I have reviewed who would lose which role**, **Turn on training-backed enforcement**, **Save**.
7. Watch **Compliance**: when Sam Kowalczyk stays overdue past the grace days, his certification expires and the history shows the action; when he completes the refresher, it is undone automatically.

## Walkthrough: onboarding probationary firefighters

1. **Requirements → Paths → New path** *Probationary Firefighter Year One* with the orientation course, the SCBA refresher, the Academy lesson on using Resgrid and a driver course that needs the first two steps.
2. **Requirements → Onboarding → New onboarding**: **Finish a learning path** → *Probationary Firefighter Year One*; **Who** role *Probationary Firefighter*; **Days to complete** 365; tick **Only members who enter the audience from now on** and **Assign the course or path to each member automatically**.
3. When Sam Kowalczyk is given the role, the path is assigned to him with a due date a year out, and the steps appear on his My Training.

## Setup examples

| Organization | How they use requirements and paths |
|---|---|
| **Fire** | Annual SCBA and hazmat refreshers that back certifications; ISO hours as *Log hours in a category* every calendar year; a probationary path per role. |
| **EMS** | CE hours per category every two years (*Every few months*, 24), a path for new EMTs, enforcement on CPR currency. |
| **SAR** | A field team path (navigation, radio, search tactics) with electives; skill evaluation requirements for rope work. |
| **Industrial / HAZMAT** | OSHA annual topics as calendar-year requirements per shift; forklift operator evaluations as *Pass skill evaluations*. |
| **Law enforcement / security** | Use-of-force and post-order refreshers every 12 months, enforcement that expires an armed-post qualification. |
| **Business** | Onboarding paths for new hires by role, compliance matrix exported to PDF for audits. |

## Technical reference

| Item | Value |
|---|---|
| Controller and routes | `LmsRequirementsController`: `/User/LmsRequirements/Index`, `Onboarding`, `Requirement`, `Compliance`, `ComplianceCsv`, `CompliancePdf`, `Paths`, `Path`, `Enforcement`, `Recommendations`; posts `SaveRequirement`, `DeleteRequirement`, `Exempt`, `Extend`, `SavePath`, `DeletePath`, `AssignPath`, `SaveSettings`, `UndoEnforcement`, `ExplainRecommendations` |
| Permissions | `ManageCourses` (132) and department admins author; `AssignTraining` (126) department-wide and group admins read the matrix and exempt or extend |
| Feature flag and add-on | `Training.Lms`; the LMS add-on to create or change anything; LMS seats decide who is licensed |
| Setting | `LearningRequirementSettings` (143): enforcement on or off, the share limit (default 20 %), the default at-risk window (14 days) |
| Worker | LMS Requirements (worker 93, every 15 minutes): links Academy role-path assignments, runs each department's daily pass (states, notices, onboarding, enforcement under the guard, paths) and undoes enforcement for members who completed |
| Workflow triggers | 224 training assigned, 225 training completed, 226 training failed, 227 training overdue, 228 requirement at risk, 229 requirement enforced, 264 requirement enforcement undone |
| Migrations | M0364 (requirements), M0365 (paths), M0366 (enforcement) |
| v4 API | `LmsRequirements/GetMyRequirements`, `GetMyPaths`, `GetRecommendations`, `ExplainRecommendations` |
