---
sidebar_position: 7
title: Recording Completions
---

# Recording Completions

When members take a training together — a station drill, a class, a group viewing of a video — a training officer or instructor can **record the completion for all of them at once** instead of asking each member to open it. Each member's record then shows that it was **recorded by instructor**, by whom and when; it is never shown as the member's own completion. A recorded completion can be **voided** with a reason, and a void rolls back what the completion caused, including a certification it issued or renewed.

| Recording from | Free or LMS |
|---|---|
| A **training**'s assignee list | Free. |
| An **LMS course**'s enrolment list | LMS add-on; each member needs an [LMS seat](/web-app/trainings/lms/seats/). |
| A **class roster** | LMS add-on (classes are LMS). A class linked to a baseline training records it without seats; a class linked to an LMS course needs seats. |

**Where to find it:** a **Record completion** button on a training's page and its **Report**, on a published course's page, and a **Record completion** panel on a class session page. All need the **Record Training Completions** permission (135).

| Rule | Detail |
|---|---|
| Permission | **Record Training Completions** (135). With no saved rule: department admins only. Set it under **Department → Permissions** ([Security & permissions](/web-app/security-permissions)). |
| Group admins | When the rule includes *Department and group admins*, a group admin records (and voids) only for their own group's members. |
| Yourself | Nobody records their own completion. |
| Members | Active members only; at most 500 at a time. |

## Recording from a training or a course

1. Open the training (or its **Report**), or the course page, and press **Record completion**.
2. The page explains: *Record that the selected members completed* the training *together, for example in a class or a group viewing. Each member's record will show that you recorded it; it is never shown as their own completion.* If the training has a quiz: *A recorded completion notes the quiz as waived (not taken).*
3. Under **Members**, the people on the assignee or enrolment list come first, marked **Assigned**. Tick the members who took part. A member who cannot be recorded has no tick box and says why (below); a member already recorded shows **Recorded by instructor**.
4. **Note** is required here: say how and when the training was completed (for example *Station 2 drill night, 18:30 to 20:30, hands-on with the department's SCBA*).
5. Tick the attestation: *I attest that these members completed this training under my instruction or supervision.*
6. **Record completion**. The result says *Recorded for N member(s); M not recorded*, with the reasons and their counts.

![Record completion page for a training with members, note and attestation](/img/web-app/trainings/record-completions-training.png)

## From a class roster

On a class session page (**Trainings → Classes → Open the class**), the **Record completion** panel lists the roster: attendees are ticked by default, marked **Attended**, and external learners on the roster are marked **External learner**. The **Note** is optional here, because the class itself says how and when. The attestation is still required.

- The class must be linked to an LMS course or a training (*This class is not linked to a course or a training*), must have started, and must not be cancelled.
- Only people on the class roster can be recorded.
- External learners can be recorded only for a course from a class roster, not for a baseline training ([External learners](/web-app/trainings/external-learners)).

![Record completion panel on a class session roster](/img/web-app/trainings/record-completions-class.png)

## Why a member cannot be recorded

| Shown next to the member | Meaning |
|---|---|
| *Not an active member* | Deleted, disabled or not a current member. |
| *Not a member of your group* | A group admin can record only their own group's members. |
| *You cannot record your own completion* | |
| *Already completed* | The first completion stands: a member who completed it themselves (or was recorded earlier) keeps that completion. |
| *No LMS seat* | LMS course: the member has no seat. |
| *The LMS add-on is not active* | LMS course or class. |
| *Not on the class roster* | Class recordings only. |
| *External learners can only be recorded for a course from a class roster* | |

## What a recorded completion does

For each member recorded:

- **The assignment is complete.** A member who was not assigned (a walk-in) is assigned and completed in one step, without the new-training notice. The quiz is noted as waived, and a later quiz attempt cannot overwrite the recorded completion.
- **For an LMS course**, the course is completed through the player's normal path: the lessons are marked complete and the enrolment is completed.
- **The transcript record** is written with the training's hours, category and CE details, and the *recorded by* details. Credits follow as for any completion, including [certifications issued from training](/web-app/trainings/certifications-from-training).
- **The member is told**: *Training completion recorded*, *Ben Adair recorded your completion of "Annual SCBA Refresher 2026" on* the date.
- An audit entry and the workflow trigger **Training completion recorded** (244) are raised.

## Where the "recorded by instructor" label shows, and who sees it

| Where | What it shows | Who sees it |
|---|---|---|
| The member's [transcript](/web-app/trainings/transcript/) | **Recorded by instructor**, *Recorded by Ben Adair on* the date, the source (*Recorded manually* or *Recorded from a class*), *Quiz waived* if the training has a quiz, and the note. | The member; department-wide training record managers (*Assign Training* department-wide); group admins for their group's members. |
| The **Recorded completions** list on the training's, course's or class's recording page | Each recording: member, source, *Recorded by ... on ...*, *Quiz waived*, the note; or *Voided by ... on ...:* the reason. | Holders of *Record Training Completions*. |
| The [compliance matrix](./paths-and-requirements.md#the-compliance-matrix) (LMS) | **Recorded by instructor** under the cell. | Those who may read the matrix. |
| Certification progress (LMS) | **Recorded by instructor** next to a done requirement item. | The member and certification readers. |

![Transcript row with the recorded by instructor label](/img/web-app/trainings/recorded-by-label-transcript.png)

## Supervised practicals

A [certification requirement set](./programs-and-plans.md#certification-requirements) item can be marked **Supervised practical: only a completion recorded by an authorized instructor counts**. For such an item the member's own completion is not enough: the instructor records it from the training's or course's **Record completion** page, or from a class roster. Certification progress marks the item *supervised practical*.

## Voiding a recorded completion

A recording made by mistake (wrong member, wrong training, the person was not there) is voided, not deleted.

**Who can void:** any holder of *Record Training Completions* who could record for that member — not only the person who recorded it. Group admins void only for their own group's members, and nobody voids a recording of their own completion.

**How:**

1. Open the same **Record completion** page (training, course) or the class session's panel.
2. Under **Recorded completions**, find the member's row, enter the **Reason for voiding** (required, up to 500 characters) and press **Void**.
3. *The recorded completion was voided.* The row now shows **Voided** and *Voided by ... on ...:* the reason. A recording can be voided once.

![Recorded completions with one recording voided and its reason](/img/web-app/trainings/record-completions-void.png)

**What a void does:**

- **The transcript record** that recording wrote is voided and its credits (hours, certification credits) are removed. Only that member's record is touched.
- **The assignment reopens**, so the member takes the training themselves, as long as that recording was still its completion. For an LMS course, the lessons the recording completed are open again and the enrolment reopens (or is withdrawn if the member has opened another enrolment meanwhile).
- **A certification it issued or renewed is rolled back.** The certification engine looks again at what still stands:
  - if another valid completion still covers the certification, it stays and its expiry moves to what that completion gives (*... Another completion still covers it, so it now expires on* the date);
  - otherwise a certification the engine created is withdrawn (*... so the certification it issued was withdrawn. Complete the requirements again to be issued it*), and a renewal is taken back to its earlier expiry (*... so its renewal was taken back. Its expiry is* the date *again*);
  - a certification someone changed by hand since is left for an officer to review.

  See [Certifications from training](/web-app/trainings/certifications-from-training).
- **The member is told**: *Recorded completion voided — Your recorded completion of* the training *was voided. Reason:* the reason.
- An audit entry and the workflow triggers **Training completion recording voided** (285) and, when a certification was taken back, **Certification revoked by void** (277) are raised. The workflow payload of 285 never carries the reason.

## Walkthrough: record a station drill

1. On drill night Ben Adair (instructor, *Record Training Completions*) runs the SCBA refresher hands-on with eight members of Station 2.
2. Afterwards he opens **Trainings → Manage Trainings → Annual SCBA Refresher 2026 → Report → Record completion**.
3. He ticks the eight members. Rosa Delgado already completed the quiz herself, so she shows *Already completed*.
4. **Note**: *Station 2 drill night 2026-11-18, 18:30 to 20:30, hands-on donning and air management.* He ticks the attestation and presses **Record completion**.
5. *Recorded for 8 member(s); 0 not recorded.* Each member is told, and their transcripts show **Recorded by instructor**, *Recorded by Ben Adair*.

## Walkthrough: void a mistaken recording

1. Dana Whitlock notices Sam Kowalczyk was recorded, but he was on shift at Station 1 that night.
2. She opens the same **Record completion** page, finds Sam's row under **Recorded completions**, types *Recorded by mistake: was on shift at Station 1* and presses **Void**.
3. Sam's transcript record is voided, his hour is removed, and *Annual SCBA Refresher 2026* is open again on his My Training. If the completion had renewed his *SCBA Qualified* certification, that renewal is taken back to its earlier expiry and he is told.

## Setup examples

| Organization | How they use recorded completions |
|---|---|
| **Fire** | Company officers hold the right for their group; drill-night refreshers recorded for the crew; supervised practicals for live-fire certification items. |
| **EMS** | CPR and skills days recorded from the class roster for the course; the medical director's recordings count as supervised practicals. |
| **SAR** | Field exercises recorded by the training lead with a note of the location and hours. |
| **Industrial / HAZMAT** | Toolbox talks and evacuation drills recorded for the shift by the safety coordinator. |
| **Law enforcement / security** | Range days recorded by the range master; voids with a reason when a qualification is challenged. |
| **Business** | Facilitated workshops recorded for attendees instead of each person opening the training. |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/Trainings/RecordCompletions?targetId=N` (GET and POST), `/User/Trainings/VoidRecordedCompletion`; `/User/Courses/RecordCompletions?targetId=N`, `/User/Courses/VoidRecordedCompletion`; `/User/LmsClasses/RecordCompletions`, `/User/LmsClasses/VoidRecordedCompletion` (panel on `/User/LmsClasses/Session`) |
| Views | `Trainings/RecordCompletions`, `Courses/RecordCompletions`, `Shared/_RecordCompletions`, `LmsClasses/_ClassRecordCompletions` |
| Permission and policy | `RecordTrainingCompletions` (135); policy `Training_RecordCompletions` |
| Rules | Attestation required (version `2026-11-25`); note required for training and course recordings; 1 to 500 members; first completion stands; never yourself; group admins their own group |
| Feature flag and add-on | Training recordings: free. Course and class recordings: `Training.Lms`, the LMS add-on and seats |
| Audit types | `TrainingCompletionRecorded`, `TrainingCompletionRecordVoided` |
| Workflow triggers | 244 training completion recorded, 285 training completion recording voided, 277 certification revoked by void |
| Migrations | M0400 (training completion recordings), M0401 (LMS recorded completion columns), M0406 (certification issuances) |
| v4 API | `LmsClasses/GetRecordCompletions`, `LmsClasses/RecordCompletions`, `LmsClasses/VoidRecordedCompletion` |
| Data export | The member's GDPR export includes `recorded_completions.json` (completions recorded for them, with source, note, attestation version and any void) |
