---
sidebar_position: 21
title: Certifications from training
---

# Certifications from training

Training can keep [certifications](/web-app/business-ops/certifications) up to date by itself. When a member finishes what a certification requires (an LMS course, a course set, a supervised practical recorded by an instructor, a yearly required reading, a number of CE hours), Resgrid **issues** the certification or **renews** it, with an expiry that follows the department's own validity rule for that certification type. If the completion behind it is later **voided**, the certification goes back to where it was. Certificates of completion carry a code anyone can check on the public **certificate verification** page.

| Part | Add-on |
|---|---|
| Validity rules on certification types (how a certification expires, grace period, renewal window) | Free (the fields); they are used when training issues or renews |
| Training hours counting toward renewal ([credit mappings](/web-app/trainings/credit-mappings)) | Free |
| Yearly required readings (a training members confirm they have read, with a due date and a yearly repeat) | Free |
| Automatic issue and renewal from LMS courses, learning paths, requirement sets and certification cycles; requirement progress; the verification page | LMS add-on |

The LMS add-on is not generally available yet. Its pages appear when it is switched on for your department (see [LMS](/web-app/trainings/lms/)). Until then, certifications are issued and renewed by hand on the [certification record](/web-app/business-ops/certifications#personal-certifications).

**Where to find it:** validity rules under **Certifications → Certification types → Edit** (*Manage Certification Setup*, permission 44); requirement sets under **Trainings → Programs → Certification requirements** (reading: *View Certifications*, 43; editing: *Manage Certifications*, 42; both default to department admins); automatic cycles under **Trainings → Programs → Certification cycles** (*Manage Certifications*, 42).

## Ways training issues a certification

| Source | Set up in | What happens |
|---|---|---|
| **An LMS course** | Course builder → settings → **Completion issues or renews** | Completing the course issues the certification, or renews the member's current one |
| **A learning path** (a course set or series) | **Trainings → Requirements → Paths** → path → **Issue a certification on completion** | Finishing every required step issues or renews it |
| **A requirement set** | **Trainings → Programs → Certification requirements** | When every item is done inside the cycle window, the certification is issued (to members who do not hold it) or renewed (for holders) |
| **A certification cycle** | **Trainings → Programs → Certification cycles** → **Next cycle** | Once a cycle's renewal hours are met, the next cycle starts (*Starts when the renewal hours are met*, or *Starts at expiry when the renewal hours were met*) |

Rules every source follows:

- The new expiry comes from the certification type's **validity rule**, on the department-local date of the completion.
- A **suspended** or **revoked** record is never touched. A record already valid at least as long is left alone. An **expired** record is renewed in place (reactivated); otherwise a new record is created.
- A certification type that **requires supervisor verification** is issued or renewed as *Pending verification*, for an officer to verify.
- Only active members are issued, renewed or told; former, disabled and hidden members are skipped.
- Every change is kept in an issuance history with the record's earlier state and the completions behind it, written to the audit log, sent to the member by push and email (for a requirement set, when **Tell members** is on) and raised as a workflow event.

## Validity rules

**Certifications → Certification types → Edit** a person or unit type. Below **Default validity (months)**:

| Field | Options |
|---|---|
| **How it expires** | *A number of months after it is issued (the validity above)*; *At the end of each calendar year (31 December)*; *At the end of our own year (fiscal, training or license year)*; *On a fixed date* |
| **Our year ends on** | Month and day, for the own-year rule (for example 30 June) |
| **Expires on** | The date, for the fixed-date rule |
| **Grace period (days)** | *After the expiry, completing the requirements within this many days still renews the same cycle* (0–365) |
| **Renewal window (months)** | *Only completions in this many months before the expiry count toward a renewal. Empty: the whole cycle* (1–60) |

The rule is used when training issues or renews the certification and for automatic cycles; dates follow the department's time zone, so a member who finishes at 23:30 on 31 December renews the year that is ending.

| Rule | A new certification expires | A renewal expires |
|---|---|---|
| **Months after issue** | Completion date + the months (31 January + 1 month is the end of February) | Completion date + the months |
| **Calendar year end** / **own year end** | At the first year end on or after the completion; if the completion falls inside the renewal window of that year end, at the next one | At the year end after the current expiry |
| **Fixed date** | On that date | On that date |

A type set to **Never expires** gets no expiry from training. With the LMS flag on, a person type shows **Requirement set** with **Edit the requirement set**.

![The validity rule fields on a certification type](/img/web-app/trainings/rec-validity-rules.png)

## Requirement sets {#requirement-sets}

A **requirement set** lists everything a member must complete in each cycle to be issued a certification or to keep it.

1. Open **Trainings → Programs → Certification requirements**. Each person certification type shows what its set **Requires**, its **Holders**, and **Needs attention** (*N due soon*, *N in grace*). The tiles count **Requirement sets**, **Due soon** and **In grace period**.
2. Select **Define** (no set yet) or **Edit**.
3. Set the options:

| Option | Meaning | Default |
|---|---|---|
| **Active** | The set is evaluated | On |
| **Issue it to members who complete every item** | Members without a live record get the certification | On |
| **Renew it for holders who complete every item** | Holders are renewed | On |
| **Tell members (push and email)** | Issued, renewed, taken back by a void, and items due | On |
| **Remind holders this many days before expiry** | Holders with items still open are told once (0 turns it off; up to 180) | 30 |

4. Add up to 25 **Items** (leave a row's **Type** empty to skip it; save to get more empty rows):

| Type | Target | Extra |
|---|---|---|
| **LMS course** | The course | **Supervised practical** |
| **Training** | A baseline training (for example a yearly reading) | **Supervised practical** |
| **Continuing-education hours** | A [training category](/web-app/trainings/categories) | **Hours** |
| **Course set or series (learning path)** | The learning path | |
| **Skill evaluations** | **Skill sheet code** | **Passed evaluations** (how many) |

   **Name shown to members** replaces the target's name on the member's page (for example *Slow speed course*). **Supervised practical: only a completion recorded by an authorized instructor counts**: the member's own completion does not satisfy it; an instructor records it from the training's or course's record completion page or from a class roster ([Recording completions](/web-app/trainings/recording-completions)).

5. Select **Save**. Saving needs an active LMS add-on (*This needs an active LMS add-on.*).

**The window.** Completions count when they fall inside the current cycle: from the start of the cycle that ends at the holder's expiry (or the renewal window set on the type) to the end of its grace period. For a first issue, the last cycle length counts. Completions that produced the current expiry never renew it again.

**Remove the requirement set** stops it; certifications already issued stay as they are.

![Editing the requirement set of a certification type](/img/web-app/lms/rec-requirement-set-edit.png)

### Who holds it and what is open

**Progress** on a row opens *Who holds …*: members closest to lapsing first, with their **State** (*Not held*, *Current*, *Due soon*, *In grace period*, *Lapsed*, *Suspended or revoked*, *Complete*), **Done** (*3 of 4 done*), **Expires** and **Still open**.

Each member sees the same on their certification record under **Certification requirements**: what is done and open, *counting … to …*, *Recorded by instructor* on practical items, and *Complete: issued or renewed to …* once everything is done. If the add-on is not active the panel says *nothing is issued or renewed automatically until it is*.

Issue and renewal happen as soon as the last item completes. A daily catch-up (worker 94, once per department-local day) also issues or renews anything that was missed and sends the due-soon reminders: *Your … certification expires on …. 2 of 4 requirements are done: complete the rest to keep it.*

![Who holds a certification and what each member still has open](/img/web-app/lms/rec-requirement-progress.png)

## Walkthrough: issue an EVOC authorization from a course and a supervised practical

Cedar Valley authorizes drivers once they pass the EVOC classroom course and drive the slow speed course with an instructor, every 24 months.

1. Dana Whitlock creates the certification type *EVOC driver authorization* (code EVOC-AUTH, person, **Default validity** 24 months, **How it expires** *A number of months after it is issued*, **Grace period** 30 days, **Renewal window** 6 months).
2. She selects **Edit the requirement set** and adds two items: **LMS course** *EVOC classroom module*, and **Training** *Slow speed course* with **Supervised practical** ticked. She saves.
3. Sam Kowalczyk completes the online module. His certification record shows *1 of 2 done*.
4. Ben Adair (instructor) runs the slow speed course and records Sam's completion from the training's record completion page.
5. The last item is done: Sam is issued *EVOC driver authorization*, valid 24 months from the course day, and gets *Your EVOC driver authorization certification was issued: you completed what it requires.*

## Yearly required readings

A handbook, code of conduct or site rule that every member must review each year is a baseline training (free):

1. Create a training with the document attached or written in, tick **Members confirm they have read and reviewed it**, set a **Due date**, and set **Repeat every (months)** to *12*. Opening the training is not enough: the member ticks *I have read and reviewed this training.* and selects **Confirm**. With a quiz, passing the quiz completes it instead.
2. Each year the audience is assigned again with a fresh due date; earlier confirmations stay on the transcript.
3. With the LMS add-on, to hold a dated proof that each member is current, create a certification type such as *Annual policy review* that expires **At the end of each calendar year**, and add the training to its requirement set as a **Training** item. Each confirmation issues or renews it to 31 December, and the certification dashboard shows who has lapsed.

For a versioned policy members sign, use a protocol with acknowledgment instead (see [Protocols](/web-app/protocols/)).

## What a void does {#what-a-void-does}

A completion can be voided: an officer voids it on the [transcript](/web-app/trainings/transcript#audit-view-and-voiding-a-record), an instructor voids a completion they recorded, its source changes (a corrected log or check-out), or a duplicate is merged. When that completion was behind a certification training issued or renewed, Resgrid looks again at what still stands:

| Situation | Result | The member reads |
|---|---|---|
| Another valid completion still covers it | The certification stays; its expiry moves to what that completion gives | *Another completion still covers it, so it now expires on …* |
| It was a renewal | The renewal is taken back: the earlier expiry and status return | *…so its renewal was taken back. Its expiry is … again.* |
| Training created the record | The certification is withdrawn (removed) | *…so the certification it issued was withdrawn. Complete the requirements again to be issued it.* |
| A later issue or renewal stands on it | The chain unwinds: the later one takes over the earlier state | (as above, for what changed) |
| Someone changed the record by hand since (renewed, re-dated, suspended) | Left as it is for an officer to decide; audited | — |

This runs even when the LMS add-on is not active, because it only undoes what training did. Certification credits derived from the voided record are removed as well. Workflow trigger 277 (*Certification revoked by void*) fires.

## Public certificate verification {#public-certificate-verification}

With the LMS add-on, every [certificate of completion](/web-app/trainings/transcript#certificates-of-completion) a member downloads carries a **verification code**, a QR code and a link `https://<your Resgrid address>/verify/certificate/<code>`. Anyone (an employer, a state office, another agency) can open it without signing in.

The page, **Certificate verification**, shows only:

- *This certificate is valid.* when the record is still verified, or *This certificate is no longer valid.* when it was voided or rejected;
- **Name**, **Course**, **Completed on**, **Issued by** (the department) and **Status**;
- *Certificates are issued by the department named above. Resgrid is not a continuing-education accreditor.*

Nothing else about the member is shown. An unknown code shows *not found*. The page is not cached and asks search engines not to index it, and one address can look up 30 codes a minute. Codes issued while the add-on was active keep verifying after it lapses.

![The public certificate verification page for a valid certificate](/img/web-app/lms/rec-certificate-verify.png)

## Setup examples

| Organization | Certification | How training keeps it |
|---|---|---|
| **Career fire** | Driver/Operator Pumper (24 months) | Requirement set: LMS pump operations course + supervised pumping evolution + 12 h *Driver training* |
| **Volunteer fire** | Interior firefighter authorization (calendar year end) | Requirement set: SCBA confidence course (supervised practical) + live-fire training, each year |
| **EMS agency** | NREMT EMT | Credit mappings for the NCCP categories; certification cycle *Starts when the renewal hours are met* |
| **Search and rescue** | Field team member (own year ends 30 September) | Learning path *SAR field team series* issues it; grace 30 days |
| **Industrial ERT / HAZMAT** | HAZWOPER refresher (annual) | LMS course *HAZWOPER 8-hour refresher* issues or renews it |
| **Security company** | Site authorization (fixed date: contract end) | Requirement set: site orders reading (yearly reading) + use of force course |
| **Business / EU** | Annual data protection training (calendar year end) | Yearly required reading in the requirement set; certification dashboard shows who lapsed |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/Certifications/EditType` (validity rules); `/User/LmsPrograms/CertificationRequirements`, `EditCertificationRequirements?typeId=`, POST `SaveCertificationRequirements`, `DeleteCertificationRequirements`, `CertificationProgress?typeId=`; `/User/LmsPrograms/Cycles`, POST `SaveCycleRule`; public `/verify/certificate/{code}` |
| Permissions | Manage Certification Setup (44) for types; View Certifications (43) to read sets and progress; Manage Certifications (42) to edit sets and cycles; department admins always |
| Model | `DepartmentCertificationTypes.ValidityRule` (0 months after issue, 1 calendar year end, 2 own year end, 3 fixed date), `ValidityYearEndMonth/Day`, `ValidityFixedDate`, `RenewalGraceDays`, `RenewalWindowMonths` (M0404, free); `LmsCertificationRequirementSets` / `Items` (M0405); `LmsCertificationIssuances` (M0406); `LmsCertificationCycleRules` (M0370); `Trainings.RequiresAcknowledgment` (M0407, free); course versions and paths `IssuesCertificationTypeId` |
| Item kinds | 0 LMS course, 1 Training, 2 Continuing-education hours, 3 Course set or series (learning path), 4 Skill evaluations; up to 25 items |
| Issue sources | 0 Course completion, 1 Path completion, 2 Requirement set, 3 Cycle auto-renew |
| LMS gate | Operator flag `Training.Lms` and an active LMS add-on to issue, renew and save; the void roll-back always runs |
| Worker | 94 (LMS programs): daily requirement-set catch-up and due-soon reminders, certification cycle renewals and alerts |
| Notifications | Event types 77 *Certification changed by training* (issued, renewed, withdrawn, restored, adjusted) and 78 *Certification requirements due*; push code `CR:` |
| Workflow triggers | 275 Certification issued by training, 276 renewed by training, 277 revoked by void, 278 requirements due |
| Verification page | `CertificateVerifyController` (anonymous, no-store, 30 lookups a minute per address); shows name, course, completion date, department, status |
| v4 API | `GET api/v4/LmsPrograms/GetMyCertificationProgress`; `api/v4/Certifications/*` for records |
