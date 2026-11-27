---
sidebar_position: 1
title: LMS add-on
slug: /web-app/trainings/lms/
---

# LMS add-on

The free [Training](/web-app/trainings/) module is enough to *run* training: write a training, add a quiz, assign it, let members take it on the web or in the apps, and keep one transcript that feeds certifications. The **LMS add-on** builds on top of it for departments that need to *manage training at scale and prove compliance*: multi-lesson courses with question banks and hosted video, learning paths and requirements that can enforce certifications, the compliance matrix and formal reports, class sessions, skill sheets and task books, external learners, e-learning standards (SCORM, cmi5, xAPI, LTI) and AI course drafting with Enhanced AI.

The add-on never replaces Training. Existing trainings keep working and can be used as lessons inside courses, nothing is migrated when you buy it, and nothing is deleted when it ends. The [Resgrid Academy](/web-app/trainings/academy/) runs on the same course player and is free for every department, with or without the add-on.

The LMS is being rolled out. It appears for a department once Resgrid switches on the `Training.Lms` rollout flag for it. Until then the LMS pages are hidden and only the free Training module and the Academy show.

The LMS screens, notices and e-mails are available in the 10 product languages. The non-English text is a first machine-translated pass.

**Where to find it:** **Left menu → Trainings** (or the name your department gave the module). The LMS adds sections to the strip under the page title: **Course library** and **Standards** (for course managers and graders), **Requirements**, **Programs**, **Classes** and **Skills**, and **External learners** (for those who manage training). Members see their courses under **Courses** and the Academy under **Academy**. The add-on is bought under **Subscription and Billing → LMS**, and seats are switched on the **Personnel** pages.

![The Trainings section strip with the LMS sections](/img/web-app/lms/lms-training-sections.png)

## What the add-on adds

| Area | Free Training | With the LMS add-on |
|---|---|---|
| Content | Single-page trainings with text, attachments and video links | Multi-module [courses](/web-app/trainings/courses) whose lessons are reading, video, documents, protocol versions, SCORM or cmi5 packages, LTI tools, assessments and course evaluations; versions with approval; [starter courses](/web-app/trainings/drafting-aids/#starter-courses) |
| Video | YouTube, Vimeo and links | Hosted video uploads with captions, 100 GB included per department; group viewing with per-member QR attendance |
| Assessments | Quiz with a pass mark, retakes and attempt history | Question banks, a grading queue for free-text answers, item analysis |
| Assignment | Users, groups, roles, due dates, extensions, exemptions, leave, one simple repeat | [Learning paths and requirements](/web-app/trainings/paths-and-requirements), role onboarding, at-risk and overdue notices, training-backed certification enforcement, the compliance matrix |
| Programs | Hours report, categories, transcript | [Annual plans, competencies, training requests, scheduled reports, certification cycles](/web-app/trainings/programs-and-plans) |
| Hands-on | Calendar check-in hours and Training Records | [Class sessions](/web-app/trainings/classes) with rosters, waitlists, QR sign-in, kiosk and lesson plans; [skill sheets and task books](/web-app/trainings/skills-and-task-books) |
| Records | The transcript, submissions and imports ([Training records](/web-app/trainings/records)) | ISO FSRS and NREMT NCCP reports, certificates with a verification code, QR and public verify page on your own template, CE reporting exports |
| Reach | Members only | [External learners](/web-app/trainings/external-learners) on a branded learner portal, public classes with fees |
| Standards | — | [SCORM 1.2 and 2004, cmi5, LTI 1.3 and xAPI](/web-app/trainings/standards) |
| AI (Enhanced AI add-on) | [Drafting aids](/web-app/trainings/drafting-aids/) in the training editor | Course drafts from a protocol or SOP, flashcards and "Ask this course" (Enhanced AI **and** the LMS) |
| Academy | [All of it](/web-app/trainings/academy/) | — |

## When the LMS is on

The LMS works for your department when **all three** of these are true. The add-on is checked live on every request (there is no cached entitlement), so buying, renewing or cancelling takes effect on the next page you open.

1. The **Trainings module** is on (**Department Settings → Module Settings**, setting `module.TrainingDisabled`). Turning the module off closes every training page, the Academy included.
2. The **`Training.Lms` rollout flag** is on for your department. Resgrid controls this flag.
3. The department holds an **active LMS add-on** (25-member [packs](/web-app/trainings/lms/packs/), bought by the managing member).

A member also needs an **LMS seat** to be *trained* through LMS features (counted by requirements, the compliance matrix and the formal reports). Nobody needs a seat to author, teach, evaluate, grade or report. See [LMS seats](/web-app/trainings/lms/seats/).

| State | What members and officers see |
|---|---|
| Module off | No Trainings pages at all. |
| Module on, flag off | Free Training and the Academy. The LMS pages return "not found". |
| Flag on, add-on never bought | The LMS sections show with a notice that the feature is part of the LMS add-on. Nothing can be authored or assigned. |
| Add-on active | Everything, for the packs you bought. |
| Payment failed | Everything keeps working for 7 days while the card is retried. **Trainings → Records → Settings** shows *A payment failed. The LMS keeps working until …* |
| Add-on ended | Read-only, under the lapse rules below. |

On a self-hosted server the LMS add-on cannot be bought: like Resgrid's other paid add-ons it depends on Resgrid's hosted billing service. The free Training module and the Academy work.

### Getting started: Cedar Valley Fire & Rescue

Cedar Valley has 62 members. The training officer, Dana Whitlock, wants courses and requirements for the 48 firefighters and EMTs; the dispatchers keep using free Training and the Academy.

1. The managing member opens **Subscription and Billing → LMS**, enters **2** packs (50 seats), checks the preview *2 packs (50 seats): $158 a month.* and selects **Buy LMS**. See [LMS packs](/web-app/trainings/lms/packs/).
2. Dana opens **Personnel**, picks the group **Station 1** in the **LMS seats** panel and selects **Enable group**, then does the same for **Station 2**. See [LMS seats](/web-app/trainings/lms/seats/).
3. Under **Department → Security**, Dana gives **Manage Courses** to the instructor role (Ben Adair) and **Grade Assessments** to Rosa Delgado, the EMS lieutenant. See [Permissions](#permissions).
4. Dana opens **Trainings → Course library → Starter courses**, copies *Incident safety basics* as a draft, adapts it and submits it for approval. See [Starter courses](/web-app/trainings/drafting-aids/#starter-courses) and [Courses](/web-app/trainings/courses).
5. Under **Trainings → Academy**, Dana assigns the **Member / Responder** role path to the new probationary firefighter, Sam Kowalczyk. See [Resgrid Academy](/web-app/trainings/academy/).
6. Under **Trainings → Requirements**, Dana adds an annual SCBA refresher requirement for the firefighter role. See [Paths and requirements](/web-app/trainings/paths-and-requirements).
7. **Trainings → Records → Settings** now shows **LMS packs and seats**: 2 packs, *48 of 50 seats in use* and next month's price.

## Permissions

Set these under **Department → Security** (see [Security & Permissions](/web-app/security-permissions)). Rights are read from the department's permission rows on each request.

| Permission (label on the Security page) | Id | With no saved rule | What it allows in the LMS |
|---|---|---|---|
| **Manage Courses** | 132 | Department admins only | Build courses and question banks, upload course video, submit and publish course versions (approval is signed with an identity check), assign courses and see results. Also the Standards pages, starter courses and AI course drafts. |
| **Grade Assessments** | 133 | Department admins only | The grading queue for free-text answers, attempt answers and item analysis. Nobody grades their own attempt. |
| **Who can Assign Trainings and see Reports** (Assign Training) | 126 | Follows **Who can Create Trainings** | Assign Academy lessons and role paths. Together with Manage Courses, it also lets a member run classes and manage external learners. |
| **Record Training Completions** | 135 | Department admins only | Record that members completed a training or course they took together. See [Recording completions](/web-app/trainings/recording-completions). |
| Department admin | — | — | Everything above, plus the per-member and per-group LMS seat switches. |
| Managing member | — | — | Buy the add-on, change the number of packs and cancel the renewal. |

![Manage Courses and Grade Assessments on the Security page](/img/web-app/lms/lms-security-permissions.png)

## Every LMS page

| Page | Where | Route | Needs the add-on | Guide |
|---|---|---|---|---|
| My courses, course player | **Trainings → Courses** | `/User/Courses/My`, `/User/Courses/Play/{id}` | Department courses: yes (see lapse rules); Academy lessons: no | [Courses](/web-app/trainings/courses) |
| Resgrid Academy | **Trainings → Academy** | `/User/Courses/Academy`, `/User/Courses/AcademyPath/{path}` | No | [Resgrid Academy](/web-app/trainings/academy/) |
| Course library, builder, banks, grading, item analysis, video storage, group viewing | **Trainings → Course library** | `/User/Courses/Library`, `/User/Courses/Grading` | Yes | [Courses](/web-app/trainings/courses) |
| Starter courses, Draft with AI, flashcards | **Course library → Starter courses / Draft with AI** | `/User/LmsStudio/Starters`, `/User/LmsStudio/Draft`, `/User/LmsStudio/Flashcards/{courseId}` | Yes (drafts and flashcards also need Enhanced AI) | [Drafting aids](/web-app/trainings/drafting-aids/) |
| Content packages, LTI tools, xAPI | **Trainings → Standards** | `/User/LmsStandards/Index`, `/Tools`, `/Xapi` | Yes | [Content standards](/web-app/trainings/standards) |
| Requirements, compliance matrix, learning paths, recommendations, enforcement | **Trainings → Requirements** | `/User/LmsRequirements/Index`, `/Compliance`, `/Paths`, `/Recommendations`, `/Enforcement` | Yes | [Paths and requirements](/web-app/trainings/paths-and-requirements) |
| Overview, annual plans, competencies, training requests, reports, certification cycles, certification requirements, settings | **Trainings → Programs** | `/User/LmsPrograms/Index`, `/Plans`, `/Frameworks`, `/Requests`, `/Reports`, `/Cycles`, `/CertificationRequirements`, `/Settings` | Yes | [Programs and plans](/web-app/trainings/programs-and-plans), [Certifications from training](/web-app/trainings/certifications-from-training) |
| Class sessions, QR sign-in, kiosk, lesson plans, resources, costs | **Trainings → Classes** | `/User/LmsClasses/Index`, `/LessonPlans`, `/Resources` | Yes | [Classes](/web-app/trainings/classes) |
| Skill sheets, evaluations, task books | **Trainings → Skills** | `/User/LmsSkills/Index`, `/Sheets`, `/TaskBooks` | Yes | [Skills and task books](/web-app/trainings/skills-and-task-books) |
| External learners, learner portal, public class fees | **Trainings → External learners** | `/User/LmsExternalLearners/Index`, `/Learn/{portal}` | Yes | [External learners](/web-app/trainings/external-learners) |
| ISO report, NCCP progress, certificate templates | **Trainings → Records** | `/User/TrainingRecords/IsoReport`, `/NccpReport`, `/CertificateTemplates` | Yes | [Training records](/web-app/trainings/records) |
| CE reporting exports | **Trainings → Programs → CE / CPD reporting** | `/User/LmsExports/Ce` | Yes | [Exports and currency](/web-app/trainings/exports-and-currency) |
| Training data export (department admins) | **Trainings → Records → Data export** (also under **Programs**) | `/User/LmsExports/Index` | No: works without the LMS and after a lapse | [Exports and currency](/web-app/trainings/exports-and-currency) |
| Record completions | From a course's enrolment list or a class roster | `/User/Courses/RecordCompletions` | — | [Recording completions](/web-app/trainings/recording-completions) |
| LMS packs | **Subscription and Billing → LMS** | `/User/LmsBilling/Index` | — | [LMS packs](/web-app/trainings/lms/packs/) |
| LMS seats | **Personnel** list and each member's page | `/User/Personnel/Index`, `/User/Personnel/ViewPerson` | — | [LMS seats](/web-app/trainings/lms/seats/) |
| LMS packs and seats summary | **Trainings → Records → Settings** | `/User/TrainingRecords/Settings` | — | [LMS seats](/web-app/trainings/lms/seats/#the-summary-on-the-training-records-settings-page) |

## When the add-on ends

### How it ends

- **Renewal cancelled:** the LMS keeps working until the paid-through date shown on the billing page, then the lapse rules apply.
- **A renewal payment failed:** the LMS keeps working for **7 days** past the paid-through date while the payment provider retries the card. If the payment still fails, the lapse starts at the end of those 7 days.
- **Refund or charge-back:** the lapse starts at once.
- **Resgrid plan cancelled:** cancelling the plan also ends paid add-ons, the LMS included.

The billing page and **Trainings → Records → Settings** show *The LMS add-on has ended. Records, certificates and transcripts stay available and exportable.*

### What happens during a lapse

1. **Nothing is deleted.** Courses, banks, enrolments and seats stay as they are.
2. **Members' evidence stays visible and exportable:** learning records, attempts, certificates and transcripts. The [training data export](/web-app/trainings/exports-and-currency) keeps working.
3. **Authoring and new LMS assignments stop**, self-enrolment included. LMS pages stay readable and show a notice. Open training requests can still be decided, withdrawn or completed, and class sessions already scheduled can still be run and signed off.
4. **Courses assigned before the lapse stay takeable until their due date**, so nobody is stranded mid-course.
5. **A course with no due date stays takeable for 30 days** after the lapse.
6. **Hosted video is read-only:** no uploads; videos keep streaming for **90 days** after the lapse, then they are archived (kept and exportable, no longer streamed). YouTube, Vimeo and Academy videos are not affected.
7. **The requirements engine pauses:** no new overdue states and no enforcement action. Anything enforcement already did is undone: certifications it expired go back to what their own dates say, and role removals it caused are reversed.
8. **External learners are suspended.** The learner portal shows *This training portal is not available right now.* and no learner can be added.
9. **Issued certificates keep verifying.** The public verify page and QR code of every certificate issued while the add-on was active keep working.
10. **The Academy and free Training are not affected.**

![The course library after the add-on ended](/img/web-app/lms/lms-lapsed-notice.png)

### Coming back

When the add-on is bought again, paused work is re-based so the roster is not marked overdue in one run:

- time spent lapsed does not count toward lateness, and paused due dates move later by the length of the lapse;
- nothing that was running across the lapse becomes overdue or enforceable until **14 days** after the add-on came back;
- a due date that was already overdue before the lapse is not moved, but it is still held from enforcement until those 14 days pass.

If you buy fewer packs than members who are still LMS-enabled, seats are licensed in the order they were switched on and the rest show **Not licensed** until you add packs or switch members off. See [LMS seats](/web-app/trainings/lms/seats/).

## Member notifications

LMS notices go through Resgrid's normal notification delivery: a push notification to the apps, an e-mail and a text message, each according to the member's own notification settings on their profile. Each notice is written in the member's language. Only active members receive them.

| Notice (title as sent) | Who gets it | When |
|---|---|---|
| **New course assigned** | The member | A course or an Academy lesson is assigned to them (directly, by audience or through a role path). The message links to the course. |
| **Course reminder** | The member | A course they started has had no activity for 7 days. Sent at most once per idle period. |
| **Course updated** | Members who completed the course | A new major version is published and the course's policy is to notify. |
| **Course assigned again** | Members who completed the course | A new major version is published and the policy is to re-assign it. The same applies to an Academy lesson your department assigned. |
| **Weekly protocol question** | Members with an LMS seat | The week's protocol question is ready under **Protocols → My acknowledgments → Weekly questions**. |
| **Training requirement** | The member | A requirement starts to apply to them, with its due date when it has one. |
| **Training requirement due soon** | The member | The requirement enters its at-risk window (14 days by default, set per requirement). |
| **Training requirement overdue** | The member, plus their supervisors and any named members when the requirement sends alerts | The requirement is past due. Sent once per due date. |
| **Training requirement completed** | The member's supervisors and named members, when the requirement alerts on completion | The member completed a requirement that was pending, at risk or overdue. |
| **Certification expired by training requirement** | The member | Training-backed enforcement expired a certification because the requirement is overdue. |
| **Training requirement met** | The member | Their completion restored the certification and roles enforcement had affected. |
| **Training enforcement refused** | Department admins | The daily enforcement run stopped because it would have removed more than the allowed share of a role's members. |
| **Class roster** | The member | They were enrolled, put on the waitlist, moved from the waitlist into a seat, declined or removed. |
| **Class cancelled** | Members on the roster | A class session was cancelled. |
| **Class reminder** | Members on the roster | Before a class session starts. |
| **Training skills** / **Training skills digest** | The evaluated member and the officers chosen under **Trainings → Skills → Settings** | A skill evaluation passed or not passed; a task book was initiated, a task signed, the book is ready for certification, certified or expired. Sent at once or as a daily or weekly digest, as the Skills settings say. |
| **Training request** | Approvers, then the member | A request waits for approval; it was approved, rejected or cancelled. |
| **Certification** | Supervisors, department admins and members named on a certification cycle rule (never the holder) | The holder met the renewal hours, started a new cycle, or the certification is expiring or expired. |
| **Training completion recorded** / **Recorded completion voided** | The member | An instructor recorded, or voided, their completion. |
| Scheduled report (the report's name) | The report's recipients | An e-mail with the PDF or CSV attached, on the report's schedule. |

External learners have no Resgrid account and get e-mail only: their account e-mails and class e-mails. See [External learners → E-mails learners receive](/web-app/trainings/external-learners#e-mails-learners-receive).

## Setup examples

| Organization | How they use the LMS |
|---|---|
| **Volunteer fire department** (25 members) | One pack. Academy role paths for new members, two adapted starter courses, an annual refresher requirement. Dispatch volunteers who only take Academy lessons need no seat, but one pack covers everyone anyway. |
| **Career fire / EMS** | Packs for every operational member; requirements with training-backed enforcement for EMT and driver certifications; ISO FSRS and NCCP reports; class sessions with QR sign-in for drills; skill sheets signed off by evaluators. |
| **Regional training center or county academy** | Classes and courses opened to external learners from partner departments through the learner portal; public CPR classes with fees invoiced through Business Ops; partner CE launched over LTI. |
| **Search and rescue** | Task books for field positions, skill sheets for rope and navigation, external learners for mutual-aid partners who join joint exercises. |
| **Industrial / HAZMAT response team** | Requirements tied to OSHA-style annual refreshers, a SCORM package bought from a content provider, compliance matrix exported for audits. |
| **Security / facilities** | A small number of packs for the response team; onboarding requirements per role; contractors trained as external learners without becoming members. |
| **EU departments** | Billed in EUR through Paddle. External learners see a privacy page that names your department as responsible for their data and can download or delete their data at any time. |

## Not available yet

These parts of the plan are not built and are not offered in the product:

- publishing course sets to other departments, and subscribing to them;
- sponsored seats (one department paying for another department's learners);
- sharing courses with linked departments through Department Links.

## Technical reference

| Item | Value |
|---|---|
| Add-on | `PlanAddonTypes.Lms = 9`; catalog row `7d4e2b91-3c58-4f0a-9e16-5b8a2c4d7f93` (M0351); card key `Lms`, slug `lms` |
| Gate services | `LmsAccessService` (flag, module, add-on window, no cache, fails closed; Academy content needs only the module), `LmsGateService` (gate + lapse clock, actor rights), `LmsRequestGate` (once per request) |
| Feature flag | `Training.Lms` (seeded off by M0346) |
| Module setting | `module.TrainingDisabled` (`DepartmentModuleSettings.TrainingDisabled`) |
| Permissions | Manage Courses 132, Grade Assessments 133, Assign Training 126 (no-row default: the Create Training row), Record Training Completions 135 |
| Config | `LmsAddonConfig` (pack size 25, 1–400 packs, tier breaks at packs 5 and 21, `DunningGraceDays` 7, `ReactivationGraceDays` 14); `LmsConfig` (media store, 100 GB included, in-progress reminder after 7 idle days); `LmsStandardsConfig` |
| Lapse windows | `LmsLapseRules`: undated courses 30 days, hosted video 90 days; `LmsLapseRebase` (reactivation) |
| Department settings | 143 `LearningRequirementSettings`, 144 `LmsProgramSettings`, 146 `LmsSkillSettings`, 147 `LmsStandardsSettings` (xAPI), 148 `LmsCeReportingSettings` |
| Workers | 87 LMS Media (video transcoding), 88 LMS Sweeps (Academy seed, in-progress reminders, lapse housekeeping), 93 LMS Requirements, 94 LMS Programs, 95 LMS Classes, 96 LMS Skills, 98 LMS Standards, 99 LMS Data Export |
| Workflow triggers | 259 CourseVersionPublished, 260 CourseCompleted, 261 AssessmentGraded, 262 SkillEvaluationCompleted, 263 TaskBookClosed, 264 RequirementEnforcementUndone, 265 TrainingRequestSubmitted, 266 TrainingRequestDecided, 267 LmsAddonLapsed, 268 LmsAddonReactivated, 269 LmsDataExportReady, 271 CourseAssigned, 272 AssessmentAwaitingGrading, 273 CourseRetired, 274 LmsSeatsChanged, 275–278 certification issuance and requirements |
| Audit log types | `LmsSeatsChanged`, `LmsPacksChanged`, `LmsCourse*`, `LmsClass*`, `LmsPath*`, `LmsTrainingRequest*` and others |
| Tables | `LmsAddonStates`, `LmsAddonLapses`, `LmsDepartmentStates` (lapse clock), `LmsMemberSeats` (M0351, M0352) |
| v4 API | `api/v4/Lms/{GetMyCourses, GetCourse, SaveProgress, CompleteLesson, StartAttempt, SubmitAttempt, GetAttemptResult, GetOfflineManifest, CrewScan, GetAcademy, Enroll}`, `api/v4/LmsStandards/GetLaunch`, `api/v4/LmsFlashcards/GetDeck`, plus `LmsClasses`, `LmsPrograms`, `LmsRequirements`, `LmsSkills` |
| Admin Assist | Area `lms` in `Catalog/training.yaml` (feature ids such as `addon-lms`, `lms-seats`, `lms-packs`, `lms-course-builder`, `lms-requirements`) |
