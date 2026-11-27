---
sidebar_position: 5
title: Classes and Sessions
---

# Classes and Sessions

**Classes** are instructor-led sessions on the department calendar: enrolment with capacity and a waitlist, reminders, sign-in by rotating QR code on members' own phones, attendance, and the instructor's sign-off, which writes a training record for every attendee and keeps the signed roster. Lesson plans, facilities and props, instructors and class costs sit beside them.

Class sessions are part of the **LMS add-on** ([LMS add-on](/web-app/trainings/lms/)). While the add-on is lapsed, *classes stay readable and existing ones can still be run and signed off, but nothing new can be made.* Without the add-on, a department can still make calendar event types [count as training](#calendar-events-that-count-as-training) (free).

**Where to find it:** **Trainings → Classes** (shown while the `Training.Lms` flag is on). The Classes strip has **Classes**, **My classes**, **Lesson plans**, **Facilities and props** and **Class costs**.

| Who | What they can do |
|---|---|
| Every member | **My classes**: enrol, request a place, join a waitlist, withdraw (when allowed), sign in, see classes they teach. |
| Class managers: department admins and holders of **Manage Courses** (132) or **Assign Training** (126) | Create, edit, cancel and delete classes; manage rosters, approvals, instructors, costs and bookings; facilities and props; lesson plans (approving and publishing a lesson plan needs **Manage Courses**). |
| A session's instructors | Run its roster: attendance, walk-ins, QR, meeting report import, sign-off. |
| **Record Training Completions** (135) holders | Record completions from the roster ([Recording completions](./recording-completions.md)). |

## The class list and My classes

**Classes** shows tiles for **Scheduled**, **Seats taken**, **On waitlists** and **Requests awaiting approval**, a **Tag** filter, and **Upcoming** and **Recent** sessions with seats (*N of M seats taken*), status (**Scheduled**, **Signed off**, **Cancelled**) and **Open**.

**My classes** lists classes the member is enrolled in or teaches (**You teach this class**, **Classes you taught**) and the ones they can still join, with **Enrol** or **Request a place**.

![Classes list with tiles and upcoming sessions](/img/web-app/lms/classes-list.png)

## Creating a class

**Classes → New class**. Times are in the department's time zone.

### What is taught

| Field | Notes |
|---|---|
| **LMS course** or **Training** | The course or baseline training the class delivers. Attendees' completions and the linked course's quiz follow from it. |
| **Lesson plan** | A published [lesson plan](#lesson-plans). |
| **Title** | Leave empty to use the course or training's name. |
| **Training category**, **Course code**, **Description** | |
| **Content summary (roster)** | What was covered, as the signed roster records it. |

### When and where

**Starts**, **Ends**, **Location**, **Meeting link** (a Teams, Zoom or Meet link for a virtual or hybrid class), **Repeat** (**Once**, **Every day**, **Every week**) with **Number of sessions** (1 to 100) for a series, and **Instructors**.

### Enrolment rules

| Field | Notes |
|---|---|
| **Capacity** | 0 for no limit. |
| **Enrolment closes (days before)** | |
| **Reminder (hours before; 0 for none)** | Enrolled members get a class reminder. |
| **Tags** | For the list filter. |
| **Members may enrol themselves** | Otherwise only class managers place people. |
| **A class manager approves each request** | Requests wait under **Requests awaiting approval**. |
| **Waitlist when full (promoted in order)** | When a seat opens, the next member is enrolled and told. |
| **Members may withdraw themselves** | |
| **Only these groups may enrol**, **Only these groups see it** | None selected: every member. |

### Sign-in

- **Sign-in by rotating QR (a photo of it stops working)**.
- **Require the phone's location within the radius**: **Latitude**, **Longitude**, **Radius (metres)**, or **Use my location**.

### Records and evaluation

- **After the class**: **None**, or **Assign the linked course (its quiz) to every attendee**, started for every attendee at the first sign-off.
- **Keep the roster for (years)**: empty uses the category's retention (for example 3 years for bloodborne pathogens training).
- **Currency** for class costs: empty uses the department's training currency.

**Create class** puts the session on the [calendar](/web-app/calendar). The calendar item's page says *This calendar item is a class: enrolment, sign-in and attendance are on the class page* with **Open the class**.

![New class form with what, when, enrolment and sign-in sections](/img/web-app/lms/classes-edit.png)

## Series

A class created with **Repeat** is a series: each session shows *Session N of M in a series*. **Series attendance** lists each member's attendance across the sessions, and the **Class series attendance** report covers it for a period.

## Running a session

The session page holds everything for the day:

- **Roster** with each member's enrolment state (**Enrolled**, **On the waitlist** with its position, **Awaiting approval**, **Declined**, **Withdrawn**, **Removed**) and attendance (**Attended**, **Absent**, **Excused**, **Not marked**), with an hours override. **Enrol a member** / **Add people**, **Approve** or **Decline** requests, **Remove**.
- **Signed in** with the time and method (**QR sign-in**, **Calendar check-in**, **Meeting report**, **By the instructor**).
- **Show the sign-in QR** and the kiosk view (below); **Issue a new QR (old photos stop working)**.
- **Mark a walk-in present** for someone who came without enrolling.
- **Import a meeting attendance report**: the CSV attendance report from Teams, Zoom or Google Meet. People are matched by e-mail, then by name; the result says how many matched, were added as walk-ins, or were not matched.
- **Instructors** (**Lead instructor**, **Assistant instructor**, **Safety officer**, or an **Outside instructor** by name), with qualifications and **Hours taught**.
- **Costs**: **Instructor**, **Materials**, **Outside fees**, **Backfill overtime**, **Other**, with an amount.
- **Facilities and props**: **Book for this class**; a resource is never booked twice at once.
- **Message the roster**, **Cancel class** (with a reason; the roster is told), **Delete class**.

### Sign-in with the kiosk

The kiosk view (**Class sign-in**) is a full-screen page for a screen or tablet at the door: *Scan this code with your phone to sign in.* The code changes every 30 seconds. Each member scans it, sees **Sign in to the class**, and presses **Sign me in**; if the class asks for it, the phone's location is checked against the radius. A member can **Sign out**.

![Kiosk sign-in page (sign-in is not open yet for this session)](/img/web-app/lms/classes-kiosk.png)

### Signing off

**Sign off the roster** (instructors and class managers). *Signing off writes a training record for every attendee (none for the absent) and keeps the roster for its retention. Members nobody marked are absent unless they signed in.* The result line says how many attended and were absent, and how many records were written or replaced. **Sign off again** after a correction rewrites the records without duplicating them.

The signed roster keeps the date, content summary, trainers and qualifications, and each attendee with their job title, the form the **Class rosters** report prints. *No timecard takes training time in this department yet (Workforce Pro)*: offering training time to timecards is planned for the [Workforce Pro add-on](../workforce-pro/index.md) and is not built yet.

Once the class has started, a holder of *Record Training Completions* can also record the linked course or training as completed for the attendees from the **Record completion** panel on the session page ([Recording completions](./recording-completions.md#from-a-class-roster)).

![Session page with the roster, the waitlist and the instructors](/img/web-app/lms/classes-session-roster.png)

## Reminders, waitlist and notices

The LMS Classes worker sends class reminders at the hours you set, promotes waitlisted members into free seats in order, and purges deleted rosters once their retention has passed. Members are told when they are enrolled, waitlisted, promoted (*A seat opened: you are now enrolled*), declined, removed, and when a class is cancelled.

## Shift conflicts

The **Shifts** page shows **Training on the shift calendar (next 14 days)**: each upcoming class with the enrolled members who are **On shift** at that time (a shift that overlaps the class), so officers can arrange cover or move people. The **Class enrolment exceptions** report lists enrolled members on shift as well as no-shows and members left on a waitlist or awaiting approval.

## Lesson plans

**Classes → Lesson plans**: *Objectives, competencies, materials, ratio, safety plan and pre-brief checklist, versioned and approved before use.*

1. **New lesson plan** with a **Title**, or **Copy as a draft** from a **Resgrid starter plan**: *Emergency vehicle operation*, *Annual hose evolutions*, *Annual ladder evolutions*, *Live-fire evolution (burn plan)*, *Physical ability test*, *Annual pump evolutions*, *SCBA proficiency*, *Evacuation drill*, *Confined space rescue drill*, *Search and rescue field exercise*, *De-escalation scenario training*. Starters are structure and checklists in plain language, no standard's text.
2. Fill in **Objectives**, **Competencies covered** (from your [competency frameworks](./programs-and-plans.md#competency-frameworks-and-the-gap-report)), **Materials**, **Props and facilities**, **Students per instructor**, **Safety plan** and **Pre-brief checklist** (one per line). **Save draft**.
3. **Submit for approval** with a **Change summary**. A holder of *Manage Courses* **Approve**s or **Send back** (a note is required to send back).
4. **Publish** (tick **Major change** for a major version). A plan is taught from its published version; every submitted version is kept. **New draft** starts the next version.

![Lesson plan editor copied from the live-fire starter](/img/web-app/lms/classes-lesson-plan.png)

## Facilities and props

**Classes → Facilities and props**: training grounds, classrooms, props, vehicles and equipment. **New facility or prop** with a **Name**, kind (**Facility**, **Training prop**, **Vehicle or apparatus**, **Equipment**, **Other**), capacity and notes. The list shows **Bookings (next 90 days)**.

## Class costs

**Classes → Class costs**: *Instructor, materials, outside fees and backfill overtime per course, member or year, beside training request costs*, with **Group by** and a year filter. **Open as a report** runs the **Class costs** report from the [report catalog](./programs-and-plans.md#training-reports).

## Calendar events that count as training

Free for every department, without the LMS add-on: under **Calendar → Manage Types**, an event type can be marked **Counts as training** with a **Training category**. *Check-in/out on events of this type becomes training hours on the attendees' transcripts. A check-in without a check-out waits for an officer.* Use it for weekly drill nights that need hours but not a roster sign-off.

## Walkthrough: schedule a class with a waitlist

1. Ben Adair opens **Classes → New class**: **Training** *Annual Hose Evolutions 2026*, **Lesson plan** *Hose Evolutions*, Station 2, Tuesdays 18:30 to 21:30, **Repeat** *Every week*, 4 sessions.
2. **Capacity** 16, **Waitlist when full**, **Reminder** 24 hours, **Members may enrol themselves**. **Sign-in by rotating QR** with the station's location and a 150 m radius.
3. **Create class**. Members see it on **My classes** and on the calendar; the 17th member to enrol goes on the waitlist.
4. Two days before, the Shifts page shows Owen Thatcher **On shift** during session 1; Marcus Ellery swaps him to session 2.

## Walkthrough: run sign-in and sign off

1. On the night, Ben opens the session and the kiosk view on the bay tablet.
2. Members scan the code and press **Sign me in**. Jules Fontaine came without enrolling: **Mark a walk-in present**.
3. After the drill Ben marks Lena Hartwell **Excused**, checks the roster and presses **Sign off the roster**.
4. Twelve training records are written with 3 hours each in *Fire Suppression*; the signed roster is kept for the category's retention.

## Setup examples

| Organization | How they use classes |
|---|---|
| **Fire** | Monthly evolutions as weekly series with QR sign-in on the apparatus floor; live-fire with approval required and a safety officer on the instructors list; backfill overtime as a class cost. |
| **EMS** | CE classes linked to an LMS course so attendees take its quiz after sign-off; virtual sessions with a meeting link and the Zoom attendance report imported. |
| **SAR** | Field exercises from the SAR starter plan, GPS radius at the trailhead, rope props booked from Facilities and props. |
| **Industrial / HAZMAT** | Confined space rescue drills per shift, roster retention set to the regulator's years, shift conflicts checked before each drill. |
| **Law enforcement / security** | De-escalation scenario training with a pre-brief checklist and capacity limits per instructor ratio. |
| **Business** | Evacuation drills per building with wardens as instructors; attendance as the drill record. |
| **Canada / EU** | Class costs in CAD or EUR (per class or the department's training currency). |

## Technical reference

| Item | Value |
|---|---|
| Controller and routes | `LmsClassesController`: `/User/LmsClasses/Index`, `My`, `New`, `Edit`, `Session`, `Series`, `Kiosk`, `Code`, `SignIn`, `Resources`, `Costs`, `LessonPlans`, `LessonPlan`; posts `Cancel`, `Delete`, `FromPlanItem`, `Enroll`, `Unenroll`, `AddMember`, `RemoveMember`, `Decide`, `Attendance`, `WalkIn`, `ImportAttendance`, `SignOff`, `RotateQr`, `SignInPost`, `SignOutOfClass`, `AddInstructor`, `RemoveInstructor`, `AddCost`, `RemoveCost`, `Book`, `Unbook`, `SaveResource`, `DeleteResource`, `CreateLessonPlan`, `SaveLessonPlan`, `SubmitLessonPlan`, `DecideLessonPlan`, `PublishLessonPlan`, `NewLessonPlanDraft`, `DeleteLessonPlan`, `RecordCompletions`, `VoidRecordedCompletion` |
| Permissions | Class managers: department admins, `ManageCourses` (132), `AssignTraining` (126); lesson plan approval: `ManageCourses`; `RecordTrainingCompletions` (135) |
| Feature flag and add-on | `Training.Lms` and the LMS add-on (calendar "Counts as training" is free) |
| Calendar and shifts | `Calendar/_TrainingTypeFields` (Counts as training, category); `LmsClassSessionLink` on the calendar item page; `LmsClassShiftConflicts` on the Shifts page |
| Worker | LMS Classes (worker 95, every 10 minutes): reminders, waitlist promotion, purging deleted rosters after retention |
| Workflow triggers | 240 class session scheduled, 241 cancelled, 242 signed off, 243 waitlist promoted |
| Migrations | M0378 (class sessions), M0379 (lesson plans), M0380 (class costs and resources) |
| v4 API | `LmsClasses/GetMyClasses`, `Enroll`, `Unenroll`, `SignIn`, `SignOut`, `GetRoster`, `GetSignInCode`, `MarkAttendance`, `SignOff`, `GetRecordCompletions`, `RecordCompletions`, `VoidRecordedCompletion` |
