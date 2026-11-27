---
sidebar_position: 2
title: Courses and the Course Library
---

# Courses and the Course Library

A **course** is a structured, multi-lesson training: modules and lessons of reading, video, documents, protocol versions, tests and course evaluations, played in a course player that remembers where each member left off. Courses are versioned and approved before they are published, and every completion goes on the member's [transcript](/web-app/trainings/transcript/).

| Part | Free or LMS |
|---|---|
| **My courses** and the [Resgrid Academy](/web-app/trainings/academy/) (its lessons and role paths, assignable by *Assign Training* holders) | Free for every department. |
| Department courses: the **Course library**, the course builder, question banks, the grading queue, item analysis, hosted video, group viewing, starter courses | **LMS add-on** ([LMS add-on](/web-app/trainings/lms/)). Members need an [LMS seat](/web-app/trainings/lms/seats/) to be enrolled in a department course. |
| **Draft with AI** and flashcards drafted from a source | LMS add-on and Enhanced AI ([Drafting aids](/web-app/trainings/drafting-aids/)). |

Department courses stay dark until the `Training.Lms` feature flag is on for the department; until then only My courses and the Academy show.

**Where to find it:**

- **Trainings → Courses**: *My courses* for every member.
- **Trainings → Course library**: the authoring side (sometimes called the course studio). The section shows for holders of **Manage Courses** (permission 132) and **Grade Assessments** (133); a course owner without those rights opens `/User/Courses/Library` and sees only the courses they own. Its toolbar holds **Question banks**, **Grading queue** (graders), **Video storage**, **Starter courses** and **Draft with AI** (Manage Courses).

| Permission | Allows | Default with no saved rule |
|---|---|---|
| **Manage Courses** (132) | Build courses and question banks, upload video, submit, approve and publish course versions, assign courses, read results. | Department admins. |
| **Grade Assessments** (133) | The grading queue for short answers and item analysis. Nobody grades their own attempt. | Department admins. |
| **Assign Training** (126) | Assign Resgrid Academy lessons and role paths, and run a group viewing of an Academy lesson. | Follows *Create Training*. |
| **Record Training Completions** (135) | Record that members completed a course together ([Recording completions](./recording-completions.md)). | Department admins. |

A course can also name **Course owners** with their own rights — **edit**, **assign** and **reports** — so a lieutenant can maintain one course without holding *Manage Courses*.

## Taking a course: My courses and the player

**Trainings → Courses** lists **Next up**, **Assigned and in progress** (with progress and due date), **Courses you can join** (with **Enrol**), the Academy (**Browse the Resgrid Academy**) and **Completed** (a pre-test pass shows *Tested out*). **Transcript** opens the member's transcript.

The player shows the **Course outline** on the side and the lesson in the middle:

- Progress is honest: *N% of the required lessons are complete*. A lesson can be *locked until the earlier lessons are complete*; optional lessons are marked *optional*.
- **Video**: **Playback speed**, captions and the **Transcript**, and **Resume** where the member stopped. A lesson can require *Watch at least N%*.
- **Reading** lessons can ask for a free-response answer or a file (PDF, image, text, Word or Excel, up to 10 MB).
- A lesson can require a minimum time on it (*This lesson needs at least N min*).
- **Protocol** lessons show the protocol version *as it was published*, even after the protocol changes.
- **Mark complete**, **Previous** and **Next** move through the course.
- **Assessment** lessons show the pass mark, attempts allowed, time limit and any wait between attempts, then **Start the assessment**. Short answers show *Waiting for a grader* until graded.
- **Course evaluation** lessons are anonymous: officers see only totals, from three responses.
- **Practice cards** (flashcards), when the course has them, are practice only and never graded or recorded.

When the last required lesson is done: *Course complete. It is on your transcript.*

![The course player with the outline and a completed reading lesson](/img/web-app/lms/courses-player.png)

## The Course library

**Trainings → Course library** lists the department's courses you may edit, assign or report on: **Course**, **Version** in force, **Enrolled**, **Completed**, with **Open** and **Edit the draft**. **Waiting for approval** lists versions in review with **Review**. With *Manage Courses* and an active add-on, **New course** takes a **Title**, **Course code** and **Summary** and opens the builder on the first draft.

![Course library with the toolbar and the course list](/img/web-app/lms/courses-library.png)

## Building a course: the course builder

The builder edits one **draft version**. A published version is never edited in place: **Start a new version** makes a new draft from it.

1. **Version settings**: **Title**, **Overview**, **Hours credited**, **Training category**, **CE provider** and **CE course number** (Resgrid is not a CE accreditor: they are recorded as entered), **Completion issues or renews** (a certification type; see [Certifications from training](/web-app/trainings/certifications-from-training)) and **Certificate template**.
2. **Add module**, then **Add a lesson** of a kind:

| Lesson kind | What it holds |
|---|---|
| **Reading** | Rich text (YouTube, Vimeo and Google Docs embeds allowed), optional **Free-response task** and **File request**. |
| **Video** | **YouTube or Vimeo** link, or **Uploaded (LMS)** hosted video with **Watch at least (%)**, a transcript and caption files; **Available offline** lets the apps keep one copy per device with a size cap and an expiry in days. |
| **Document** | A document link (https) and its name. |
| **Protocol** | A published protocol version, shown exactly as published. |
| **Assessment** | A test drawn from a question bank (below). |
| **Course evaluation** | Anonymous survey questions (rating, text or choice), one per line in **Survey questions**. |
| **SCORM package**, **cmi5 package**, **LTI tool** | Standards content; see [Standards](/web-app/trainings/standards). |

Survey questions are written one per line as `rating: text` (1 to 5), `text: text`, or a choice question with its options separated by vertical bars, for example `choice: Was the pace right? | Too slow | About right | Too fast`.

3. Every lesson has a **Title**, its **Module**, **Minimum time on the lesson (seconds)** and **Required to complete the course**. **Move up** reorders modules and lessons; **Rename** and **Delete** are on each module.
4. For uploaded video: **Upload a video** (processed in the background; it plays when *Ready*) and **Upload captions** (a WebVTT file with its language and label).

### Assessment settings

| Field | Notes |
|---|---|
| **Question bank** | The pool the questions come from. |
| **Questions per attempt (0 = all)**, **Only questions tagged** | Each attempt draws its own random set. |
| **Pass mark** | Percentage. |
| **Attempts allowed (0 = unlimited)**, **Hours between attempts** | A failed member waits before trying again. |
| **Time limit (minutes, 0 = none)** | A timed-out attempt shows *Time ran out*. |
| **Show answers** | **Score only**, **Which answers were right, without the key**, **The key, once passed**, **The key after every attempt**. |
| **Shuffle answer order** | |
| **Pre-test (passing it completes the course)** | A member who already knows the material tests out. |
| **Ask the learner to confirm they are taking it themselves** | The member ticks *I am completing this assessment myself.* |

Questions are drawn and scored on the server; the answer key never reaches the browser or the apps.

![The course builder for the driver course with modules, lessons and version settings](/img/web-app/lms/courses-builder.png)

## Question banks

**Course library → Question banks**: pools of questions drawn at random for each attempt. A **Shared** bank is open to every course author; a **Private** bank only to its owner. **Create bank** takes a **Name**, **Tags** and *Shared with every course author*.

Each question has a **Question type** — **Single choice**, **Multiple choice**, **True or false**, **Put in order** or **Short answer (graded by hand)** — **Points**, **Tags**, the **Question**, an optional **Image link (https, optional)**, **Options** with **Correct**, and an **Explanation** (shown after the attempt; the model answer for short answers). **Retire** takes a question out of future draws; attempts that drew it keep their copy.

## Submitting, approving and publishing

1. **Submit for approval** with **What changed**. The draft must have at least one lesson.
2. A holder of *Manage Courses* opens it from **Waiting for approval**, **Review**, then **Approve and sign**. You confirm your identity again (step-up) and the signature covers this exact version; your department may require a passkey. **Send back to draft** takes a reason. The submitter can take it back with **Back to draft**.
3. **Publish this version**: **Minor version: completions stand**, or **Major version: choose what happens to people who completed it** — **Nothing: completions stand**, **Tell people who completed it**, or **Assign it again to people who completed it** with **Days to complete when re-assigned**. People in the middle of the course keep the version they started; people who have not started move to the new one.

A draft that was never submitted can be thrown away with **Discard draft**; a version that was submitted is kept for the record. **Approvals and signatures** lists each round and whether its signature still matches the version.

## The course page: catalog, owners, assignment and results

**Open** from the library shows the course:

- **Course details**: **Title**, **Course code**, **Tags**, **Summary**, **Members may enrol themselves from the catalog**, and **Who sees it in the catalog** (pick nobody for the whole department).
- **Assign this course**: **Assign to** **Everyone in the department**, **Members**, **Groups** or **Roles**, with an optional **Due date** (the end of that day in the department's time zone). A version must be published first. The notice says how many were assigned, already had it, or could not be assigned (for example, no LMS seat).
- **Enrollments**: member, version, status (*Not started*, *In progress*, *Completed*, *Withdrawn*), progress and due date, with **Withdraw** (progress is kept).
- **Versions** with their change summaries, and **Course owners** with **Add owner**.
- **Item analysis**, **Printable test** (and **With answer key**, for editors and graders) and **Course evaluation** results.
- **Flashcards**, **Start a new version**, **Retire** (the course leaves the catalog; enrolled members can still finish).
- **Record completion** for *Record Training Completions* holders on a published course.

![Course page with the lessons, the assignment form and owners](/img/web-app/lms/courses-course-page.png)

## Grading short answers

**Course library → Grading queue** (*Grade Assessments*) lists short answers waiting for a grader. Each shows the question, the member's answer and the **Model answer**. The grader enters **Points awarded (out of N)** and **Grader's notes**, then **Save grade**. Nobody grades their own attempt. Once every short answer is graded, the attempt's result is final and the member sees it under **Result**.

## Item analysis, printed tests and course evaluations

- **Item analysis** (graders): for each question, **Responses**, **Difficulty (p)** — the share of correct responses, higher is easier — **Discrimination (D)** — correct share in the top 27 % of attempts minus the bottom 27 %; below 0.2 is worth a look — and how often each option was chosen. Discrimination needs at least 10 finished attempts; attempts waiting for a grader are left out.
- **Printable test**: a paper copy drawn from the bank, with name and date lines; **With answer key** adds the key. Print it with the browser's print command.
- **Course evaluation** results: totals and the average rating, shown only from three responses so no answer can be traced to a member.

## Group viewing (crew viewing)

A station can watch one lesson together on a shared screen, and each member is marked present from their own phone.

1. In the player, on the lesson, press **Watch together (group viewing)** (needs the assign right on the course; for an Academy lesson, *Assign Training*).
2. The shared screen shows the **Group viewing** page with a QR code. *The code changes every 30 seconds, so a photo of it stops working.*
3. Each member scans it with their own phone and presses **I am here** (*Mark yourself present for this group viewing? The lesson shown counts as watched; you then take any quiz on your own phone.*).
4. The **Present** list grows as people scan. **End the viewing** closes it; a viewing nobody ends stops accepting scans after four hours.

Presence completes only the lesson shown, for each member who scanned. Nobody completes a course because a colleague pressed play.

![Group viewing screen with the rotating QR and present list](/img/web-app/lms/courses-group-viewing.png)

## Video storage

**Course library → Video storage** (*Manage Courses*) shows hosted video against the 100 GB the LMS add-on includes: **Used**, **Included**, **Videos**, and each file's status (*Uploading*, *Waiting to be processed*, *Processing*, *Ready*, *Could not be processed*, *Archived (add-on ended)*). Above the included amount nothing is charged today. If the installation has no video storage configured, uploads are off and YouTube and Vimeo links still work.

## Starter courses

**Course library → Starter courses** lists courses written by Resgrid to start from (for example *Getting started with Resgrid*, *Incident safety basics*, *Hazardous materials awareness (outline)*, *Driver and emergency vehicle operation basics*). **Copy as a draft** copies one into your department as a draft with its attribution; adapt it and publish it through your normal approval. Starters are Resgrid's own plain-language text, with no standard's text and no accreditation. Copying needs *Manage Courses* and an active add-on.

Starters that fit your department's [operating profile](/web-app/help-setup/#operating-profile) are listed first with the badge **Suggested for your organization**.

**Draft with AI** turns a published protocol or an SOP document into a draft course (Enhanced AI and the LMS add-on); see [Drafting aids](/web-app/trainings/drafting-aids/).

## When the add-on lapses

*The LMS add-on has ended: courses and records stay readable, assigned courses stay open until they are due (or 30 days), hosted video is read-only for 90 days, and new courses or assignments need the add-on again.* The Academy keeps working.

## Walkthrough: build a course with lessons and a test

Rosa Delgado, EMS lieutenant at Cedar Valley Fire & Rescue, holds *Manage Courses*.

1. **Course library → Question banks → Create bank**: *Pediatric Assessment*, shared. Add 25 questions: single choice and true or false, plus two **Short answer (graded by hand)** with a model answer in **Explanation**.
2. **Course library → New course**: **Title** *Pediatric Assessment Refresher*, **Course code** *EMS-PED-01*. The builder opens.
3. **Version settings**: **Hours credited** 2, **Training category** *EMS continuing education*, **CE provider** and **CE course number** from the county's CE office.
4. **Add module** *Assessment triangle*. Add a **Reading** lesson and a **Video** lesson (YouTube link, **Watch at least (%)** 90).
5. **Add module** *Test*. Add an **Assessment** lesson: bank *Pediatric Assessment*, 15 questions per attempt, **Pass mark** 80, **Attempts allowed** 2, **Hours between attempts** 24, **Show answers** *The key, once passed*.
6. Add a **Course evaluation** lesson, not required.
7. **Submit for approval** with *First version*. Dana Whitlock opens **Waiting for approval → Review**, checks the lessons, **Approve and sign** with step-up.
8. **Publish this version** (minor). On the course page, **Assign to → Roles** *EMT* and *Paramedic*, due at the end of next month.

## Walkthrough: grade a written answer

1. Priya Raman submits the test. Her two short answers show *Waiting for a grader*.
2. Ben Adair (instructor, *Grade Assessments*) opens **Course library → Grading queue** (badge 2).
3. He reads her answer beside the **Model answer**, enters **Points awarded** 4 of 5 and a note, **Save grade**, and grades the second answer.
4. Her attempt now has its final score; Priya sees it under **Result** with the grader's notes.

![Grading queue (nothing waiting)](/img/web-app/lms/courses-grading-queue.png)

## Walkthrough: run a group viewing

1. At the Tuesday drill, Marcus Ellery opens *Driver Operator Pumps* on the station's wall screen and goes to the lesson *Friction loss*.
2. **Watch together (group viewing)**. The QR appears.
3. Tomas Okafor, Owen Thatcher and Sam Kowalczyk scan it with their phones and press **I am here**.
4. The crew watches the video. Marcus presses **End the viewing**.
5. Each of them has *Friction loss* complete and takes the lesson's test on their own phone.

## Setup examples

| Organization | How they use courses |
|---|---|
| **Fire** | Driver/operator and officer development courses with protocol lessons and a test; group viewing on drill nights. |
| **EMS** | CE courses with CE provider and course numbers, a pre-test to test out, short answers graded by the EMS lieutenant. |
| **SAR** | A new-member course: navigation reading, radio video, a printable test for the field. |
| **Industrial / HAZMAT** | Hazmat awareness from the starter outline, adapted to site procedures; major versions reassign the course when procedures change. |
| **Law enforcement / security** | Post orders and use-of-force refreshers with attestation and time limits. |
| **Business** | Onboarding courses copied from *Getting started with Resgrid*, assigned to every new hire through a [learning path](./paths-and-requirements.md). |

## Technical reference

| Item | Value |
|---|---|
| Controllers and routes | `CoursesController`: `/User/Courses/My`, `Academy`, `AcademyPath`, `Play`, `Open`, `Attempt`, `Result`, `Library`, `Course`, `Builder`, `Banks`, `Bank`, `Grading`, `ItemAnalysis`, `PrintTest`, `SurveyResults`, `CrewViewing`, `CrewScan`, `Storage`, `RecordCompletions`; posts `Create`, `SaveCourse`, `Assign`, `WithdrawEnrollment`, `SaveOwner`, `StartDraft`, `Retire`, `SaveSettings`, `SaveModule`, `SaveLesson`, `Move`, `Submit`, `Withdraw`, `Discard`, `Approve`, `Reject`, `Publish`, `UploadVideo`, `UploadCaptions`, `SaveBank`, `SaveQuestion`, `RetireQuestion`, `StartAttempt`, `SubmitAttempt`, `Grade`, `StartCrewViewing`, `EndCrewViewing`. `LmsStudioController`: `/User/LmsStudio/Starters`, `Draft`, `Flashcards` |
| Permissions | `ManageCourses` (132), `GradeAssessments` (133), `AssignTraining` (126, Academy), `RecordTrainingCompletions` (135) |
| Feature flag and add-on | `Training.Lms` (seeded off by M0346) and the LMS add-on; the Academy needs neither |
| Workers | LMS Media (worker 87, every 2 minutes: transcodes uploaded video to HLS); LMS Sweeps (worker 88, every 30 minutes: Academy seeding, in-progress course reminders, archiving hosted media 90 days after a lapse) |
| Notices | *New course assigned*, *Course assigned again*, *Course updated*, *Course reminder* (in progress) |
| Workflow triggers | 259 course version published, 260 course completed, 261 assessment graded, 271 course assigned, 272 assessment awaiting grading, 273 course retired |
| Migrations | M0349 (courses), M0350 (learner tables), M0398 (course studio), M0401 (recorded completion columns) |
| v4 API | `Lms/GetMyCourses`, `GetCourse`, `SaveProgress`, `CompleteLesson`, `StartAttempt`, `SubmitAttempt`, `GetAttemptResult`, `GetOfflineManifest`, `CrewScan`, `GetAcademy`, `Enroll`; `LmsFlashcards/GetDeck` |
