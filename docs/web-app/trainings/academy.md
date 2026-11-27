---
sidebar_position: 9
title: Resgrid Academy
slug: /web-app/trainings/academy/
---

# Resgrid Academy

The **Resgrid Academy** is a series of short video lessons and walkthroughs on every part of Resgrid, built into Trainings. Each lesson has captions, a three-question check and counts on the member's transcript. Officers assign lessons or whole **role paths** (Member, Dispatcher, Officer, Administrator and more) and follow each member's progress.

The Academy is **free for every department**, with or without the [LMS add-on](/web-app/trainings/lms/). It needs no seat and does not count against plan limits or storage. Resgrid maintains the lessons and updates them with each release.

<AcademyVideo id="00-start" />

**Where to find it:** **Trainings → Academy** (*Short lessons on every part of Resgrid, free for every department. Each has a quick check and counts on your transcript.*). Every member can take the lessons. Department admins and members with **Who can Assign Trainings and see Reports** (126) or **Manage Courses** (132) can assign them. Only the Trainings module switch closes the Academy; the `Training.Lms` flag and the add-on do not.

## Take a lesson

1. Open **Trainings → Academy**. The tiles show **Lessons available** and **Completed by you**.
2. Under **Lessons and walkthroughs**, each row shows the **Lesson** (marked **Lesson** or **Walkthrough**), its **Length** in minutes, the **Hours** it credits and your **Status** (**Not started**, **In progress**, **Completed**).
3. Select **Start** (or **Resume**, or **Watch again** once completed). The lesson opens in the course player with the Academy video, caption tracks and the transcript.
4. Watch the video, then answer **Check your understanding**: three questions, two of three to pass.
5. The completion is written to your transcript in the **Systems training** category (*Resgrid Academy lessons (no CE).*), 0.1 to 0.25 hours depending on the video's length.

![The Resgrid Academy page](/img/web-app/academy/academy-catalog.png)

The **Open academy.resgrid.com** link at the bottom opens the public Academy site.

### Which lessons you see

A lesson appears only when your department has what it teaches: the Mapping lesson needs the Mapping module, Records needs the Records module, the Assistant and AI lessons need the Enhanced AI add-on, Business needs Business Ops, Push-to-talk and Data protection need their add-ons, and so on. A role path lists only the lessons your department can see.

## Role paths

**Role paths** are ordered lists of Academy lessons for a role. *Assigning a path assigns each lesson it holds that your department has.* Each lesson is tracked on its own.

| Path | Audience | Lessons |
|---|---|---|
| **Member / Responder** | Everyone | Orientation, Apps, Communication, Shifts, Training, Knowledge, Checklists, Chat |
| **Dispatcher** | Dispatch staff | Orientation, Units, Calls, Mapping, Communication, Custom statuses, Dispatch settings, Relay |
| **Officer / Incident Command** | Officers and commanders | Orientation, Calls, Communication, Mapping, Knowledge, Deployments, AI, Assistant |
| **Administrator** | Department administrators | Orientation, People, Security, Units, Setup wizard, Department settings, Custom statuses, Automation, Data protection, Plans, Admin Assist, Self-hosting |
| **Training Officer** | Training staff | Orientation, Training, Knowledge, Checklists, People |
| **Records & Reporting** | Report writers and reviewers | Orientation, Records, Calls, Data protection |
| **Logistics & Readiness** | Logistics and readiness officers | Orientation, Checklists, Maintenance, Inventory, Units |
| **Business & Finance** | Finance and business administrators | Orientation, Business, Deployments, Plans |

## Assign a lesson or a path

1. On **Trainings → Academy**, select **Assign** on a lesson row, or **Assign path** on a role path card.
2. In **Assign the role path …** (or the lesson), under **Assign to** choose **Everyone in the department** or pick **Members**, **Groups** and **Roles**, and set an optional **Due date** (*The end of that day in the department's time zone.*).
3. Select **Assign**. The page reports *Assigned to 6 members (1 already had it, 0 could not be assigned).*
4. Members get a **New course assigned** notification and find the lessons under **Trainings → Courses**.

![Assigning the Dispatcher role path](/img/web-app/academy/academy-assign-path.png)

You can also assign from any page: the top bar **Help** menu shows **Lesson for this page (N min)** for the module you are on and, for those who can assign, **Assign this lesson**.

![The Help menu with the lesson for this page](/img/web-app/academy/academy-help-menu.png)

### Follow progress

On a role path card, **Progress (N assigned)** opens the path's progress page: *Each assigned member's progress through the path's lessons.* Each row is a member with the status of every lesson in the path.

![Progress through a role path](/img/web-app/academy/academy-path-progress.png)

### With the LMS add-on

Academy lessons can be steps in your own [learning paths](/web-app/trainings/paths-and-requirements) and targets of requirements. A requirement chooses what happens when a required Academy lesson gets a major update: notify the members who completed it, assign it to them again, or nothing.

## When a lesson is updated

Resgrid updates lessons with each release:

- A **minor** update (wording, captions) keeps every completion. Members already in the lesson keep their progress.
- A **major** update (the feature changed) publishes a new version. Members who completed a lesson your department assigned get **Course updated**, or **Course assigned again** when the lesson is re-assigned.

## Guided tours, What's new and help search

The Academy also drives Resgrid's in-product guidance. These are free and need no add-on.

- **Guided tours**: a short list of first-run tasks per role, each with a link to the page and an Academy lesson (**Watch lesson**). Tours exist for members (*Get started*: complete your profile, install the app, set your status, see your training), dispatchers (*Get ready to dispatch*), administrators (*Set up your department*) and training officers (*Run training*: create a training, assign Academy lessons, track certifications, review your protocols).
- **What's new**: a short lesson for each release, offered on the dashboard for 60 days after the release.
- **Search help**: a keyword search over the Academy lessons your department can see and the product reference.

Your role's tour and the newest What's new appear as a card on the home dashboard. Tick a task (**Mark done**) as you finish it, or select **Hide this tour** / **Hide**; Resgrid remembers your choice. **All tours** lists every tour; **Show this tour again** brings a hidden one back. The **Help** menu has **Search help**, **Guided tours** and **What's new**. With the Enhanced AI add-on, the help search also answers *How do I…?* questions using only the Academy lessons, with links to the lessons it used. See [Setup Wizard, Setup Report and Admin Assist](/web-app/help-setup).

![The guided tour and What's new card on the dashboard](/img/web-app/academy/academy-guidance-card.png)

## Setup examples

| Organization | How they use the Academy |
|---|---|
| **Volunteer fire department** | Assign **Member / Responder** to every new member with a 30-day due date; the completions sit on the transcript next to the department's own trainings. |
| **Dispatch center** | Assign **Dispatcher** to new hires during orientation week and follow the path progress page. |
| **EMS agency** | Officers take **Officer / Incident Command**; the training coordinator takes **Training Officer** before building courses. |
| **Industrial / facility response team** | **Logistics & Readiness** for the people who run checklists, maintenance and inventory. |
| **Business or contractor** | **Business & Finance** for office staff who handle invoicing and deployments. |
| **Self-hosted installations** | Lessons ship with each release; videos play from academy.resgrid.com, or from a bundled media pack on air-gapped servers. |

## Technical reference

| Item | Value |
|---|---|
| Pages | `CoursesController`: `GET /User/Courses/Academy?assign=&path=`, `POST /User/Courses/AcademyAssign` (`lessonId` or `pathKey`, who, due date), `GET /User/Courses/AcademyPath/{pathKey}`; the lesson plays in `/User/Courses/Play/{enrollmentId}` |
| Who | Everyone takes lessons; assigning needs department admin, Assign Training 126 or Manage Courses 132 (`LmsActor.MayAssignAcademy`) |
| Gate | `LmsAccessService.CanRunItemAsync` with `SystemPublished` origin: only the Trainings module switch (`module.TrainingDisabled`); never the `Training.Lms` flag or the add-on |
| Content | `AcademyCourseManifest` (lessons from `Core/Resgrid.Model/Academy/Manifests/Lessons/*.json`, 8 role paths), `AcademyCatalog`; transcript category `RG-ACADEMY` (*Systems training*), 0.1–0.25 h, pass mark 2 of 3 |
| Service | `LmsAcademyService` (seed, catalog, assign lesson or path, path progress); visibility from each lesson's module, flag and add-on keys |
| Worker | 88 LMS Sweeps (seeds the Academy course set when a lesson's revision rises, applies major-update notify or re-assign) |
| Guidance | `AcademyGuidanceService`, `Shared/_AcademyGuidanceCard.cshtml` (dashboard card), `HelpController` (`Search`, `Tours`, `TourTask`, `ReopenTour`, `Dismiss`, `WhatsNew`); tour and What's new manifests under `Academy/Manifests/Tours` and `WhatsNew`; M0375 |
| Strings | `Areas/User/Academy/AcademyCourses` (paths, check), `AcademyGuidance` (tours, help search); lesson titles and questions in the lesson manifests (10 locales) |
| Config | `SystemBehaviorConfig.AcademyUrl` (`https://academy.resgrid.com/`), `SystemBehaviorConfig.AcademyMediaUrl` (blank = the Academy site; a bundled media pack on air-gapped servers) |
| v4 API | `GET api/v4/Lms/GetAcademy`, `POST api/v4/Lms/Enroll` |
| Admin Assist | features `academy`, `academy-guidance` |
