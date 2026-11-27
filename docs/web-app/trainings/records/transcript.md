---
sidebar_position: 1
title: Transcript
slug: /web-app/trainings/transcript
---

# Training transcript

The **transcript** is one list of everything a member has trained: trainings they completed, training records (drill and class logs) they took part in, calendar events they checked in to, outside training and CE / CPD hours they submitted, certification credits typed in by hand, imported history and, with the LMS add-on, online courses, classes, skill evaluations and task books. Each entry is a **learning record** with its date, hours, category and whether it counts. Only verified records count toward hours, targets and certification credits.

The transcript, the records queue, the certificate of completion and the PDF and CSV exports are free for every department. Verification codes on certificates and custom certificate layouts need the LMS add-on (see [Certificates of completion](#certificates-of-completion)).

**Where to find it:** **Trainings → Transcript**. Every member opens their own transcript (**My transcript**). An officer who reviews a member's records picks the member at the top of the page. Officers find the records queue under **Trainings → Records → Queue**. The whole Trainings module, including the transcript, is hidden when the department switches Trainings off in its module settings.

![A member's own transcript with category totals and records from several sources](/img/web-app/trainings/rec-transcript-my.png)

## Who sees which transcript

| Who | Transcript | Can also |
|---|---|---|
| Every member | Their own | Download it as PDF or CSV, submit outside training, open their submissions |
| Department administrators and the roles named on **Assign Training** (permission 126, when set to *Department admins and select roles*) | Every member's, former members included | Open the **Audit view**, void records, work the records queue |
| Group admins, when **Assign Training** is set to *Department and group admins* | The members of the group they administer | The same, for those members |

Nobody verifies, rejects or voids their own record. When Assign Training has no saved rule it follows the **Create Training** permission.

## Read a transcript

1. Open **Trainings → Transcript**. An officer chooses a member under **Member** and selects **Open transcript** (former members are listed with *(Former member)*; **My transcript** goes back to your own).
2. Narrow the list with **From**, **To**, **Category** and **Source**, then **Filter**. **Clear** removes the filter.
3. The tiles at the top show **Total hours**, the number of **Records**, how many are **Pending**, and the counted hours of each category. A category with a target shows it underneath, for example *24 h · Per year*.
4. Each row shows the **Date**, the **Course** with its code, CE provider, CE course number, CE hours, method and instructors, the **Source** with how it was recorded, the **Category**, the **Hours** and the **Status**. Rows that do not count are greyed.
5. **PDF** and **CSV** in the page header download the transcript with the same filter. The PDF lists hours by category and the total; it is printed on Letter paper in English and A4 in the other languages, with its headings in the reader's language (the non-English texts are a first machine-translated pass).

When your Resgrid installation has document sealing configured, the transcript PDF is sealed (a tamper-evident signature over its content); a copy downloaded before sealing was available is sealed the next time it is downloaded.

![An officer's view of Tomas Okafor's transcript with the member picker and Audit view button](/img/web-app/trainings/rec-transcript-officer.png)

### Record sources

The **Source** column says where a record came from. The **Source** filter offers the six baseline sources in the first rows of this table; records from the other sources appear in the list but cannot be filtered by source yet.

| Source (as shown) | Written when | Add-on |
|---|---|---|
| **Course completion** | A member completes a training assigned to them (one record per assignment cycle, so a yearly refresher writes a new record each year) | Free |
| **Training record** | A member is a participant of a training log, or of a finalized Records (RMS) training record | Free |
| **Calendar event** | A member checks in and out of a calendar event whose type has **Counts as training** ticked (hours rounded per [settings](./settings.md)); a check-in without a check-out waits in the queue | Free |
| **Outside training** | A member submits outside training or CE / CPD hours with evidence ([submissions](./external-submissions.md)) | Free |
| **Certification credit** | Someone types a continuing-education credit onto a certification record | Free |
| **Imported history** | A row of a [history import](./history-import.md) | Free |
| **Academy lesson** | A Resgrid Academy lesson is completed | Free |
| **Protocol acknowledgment** | A member acknowledges a protocol they were asked to read | Free |
| **Online course** | An LMS course is completed | LMS |
| **Class session**, **Skill evaluation**, **Task book sign-off** | An LMS class is signed off, a skill sheet is evaluated, a task book is closed | LMS |
| **Building familiarization** | A Records occupancy inspection or pre-plan review is credited to the person who did it | LMS |

Under the source (and in the *How recorded* column of the PDF and CSV), a short line says who stands behind the record: *Recorded by the system*, *Self-reported* (the member reported it and nobody reviewed it), *Reviewed* (an officer or reviewer approved it), *Recorded by an instructor* (an instructor recorded the completion for the member, see [Recording completions](/web-app/trainings/recording-completions)) or *Imported* (history import or backfill). Records from the [history backfill](./history-backfill.md) and the history import also show **From history**.

### Record statuses

| Status | Meaning | Counts |
|---|---|---|
| **Pending** | Waiting for an officer or reviewer: outside training under review, or a calendar check-in without a check-out | No |
| **Verified** | Counts toward hours, targets and certification credits. A verified record is never edited: a correction voids it and writes a new record | Yes |
| **Rejected** | An officer or reviewer refused it with a reason the member can read | No |
| **Voided** | Replaced or withdrawn (its source changed or was removed, an officer voided it, or it was merged as a duplicate). Shown only in the Audit view | No |

A record whose times overlap another of the same member's records on the same day is flagged **Possible duplicate** until an officer resolves it in the queue.

## Audit view and voiding a record

Officers who review a member see **Audit view** in the transcript header.

1. Select **Audit view**. Voided records appear, with their **Void reason**.
2. A record that replaced an earlier version shows **History (N versions)**; open it to see every version with its date, hours and status.
3. To withdraw a record, select **Void** on its row, enter a **Reason** and select **Void record**.

Voiding a record removes the certification credits it produced. If the record was the completion behind a certification the LMS issued or renewed, the certification goes back to its earlier state unless another completion still covers it (see [What a void does](/web-app/trainings/certifications-from-training#what-a-void-does)). **Hide audit view** returns to the normal list.

## The records queue

**Trainings → Records → Queue** lists what waits for an officer, oldest first, for the members you review.

- **Waiting for review**: calendar check-ins with no check-out, and other pending records. **Verify** asks for the **Hours** actually attended (an open check-in has none) and an optional note, then **Verify record**. **Reject** needs a reason the member can read, then **Reject record**.
- **Possible duplicates**: two records of the same member whose times overlap on the same day, side by side. **Keep both** when they were different sessions; **Merge** voids this record as the same session as the other one.
- Members' training hours submissions are reviewed in [Training reviews](./training-reviews.md); the queue shows how many are waiting for you there.

Your own records show *Your own record: another officer reviews it.*

![The records queue; outside training submissions now go to Training reviews](/img/web-app/trainings/rec-queue.png)

### Walkthrough: close an open check-in

Sam Kowalczyk checked in to the Tuesday ladder drill on the Cedar Valley calendar but forgot to check out.

1. Dana Whitlock opens **Trainings → Records → Queue**. The drill shows under **Waiting for review** with *Checked in: 18:30*.
2. She selects **Verify**, enters **2.5** in **Hours** and the note *Drill ended 21:00 per the log*, then **Verify record**.
3. The record is verified and the 2.5 hours count on Sam's transcript and in the hours report.

## Certificates of completion

Every verified row has a **Certificate** button. It downloads a one-page PDF *Certificate of completion*: the member, the course and its code, the completion date, hours, CE hours, CE provider and course number, category, instructors, and *Issued by* with the department name (and the reviewer who verified it). The note *Resgrid is not a continuing-education accreditor* is printed on every certificate. Members download their own; officers download those of members they review. The certificate is sealed like the transcript when sealing is configured.

With the LMS add-on:

- the certificate carries a **verification code** and a QR code that open the public [certificate verification page](/web-app/trainings/certifications-from-training#public-certificate-verification), which anyone can use to check it;
- the department's default **certificate template** replaces the standard layout.

If the add-on lapses, certificates that already had a verification code keep printing it and the verification page keeps answering for them. No new codes are issued and the standard layout is used again.

### Custom certificate templates (LMS)

**Trainings → Records → Certificate templates** (department-wide record managers, with the LMS add-on active).

1. Under **Add a template**, enter a **Name** and the **Layout (HTML)**. Scripts and unsafe markup are removed when you save. Use the placeholders `{{member}}`, `{{course}}`, `{{date}}`, `{{hours}}`, `{{department}}` and `{{code}}`.
2. Tick **Use for every certificate** to make it the default, then **Save template**. When you edit a template, **Preview** shows the saved layout (the placeholders as written).
3. With no default template, certificates use the standard layout. Only one template is the default; certificates always print with it.

![The certificate templates page](/img/web-app/lms/rec-certificate-templates.png)

## Setup examples

| Organization | How they use the transcript |
|---|---|
| **Volunteer fire** | Members check in to drill nights on the calendar (event type counts as training); the training officer closes the few open check-ins in the queue each week and prints a transcript PDF for state FF1 renewal. |
| **Career fire / ISO** | Company training logs write *Training record* rows; after a bulk [categorize](./categories.md#categorize-history-in-bulk) into the ISO FSRS categories, the transcript tiles show each member's hours against the yearly targets. |
| **EMS agency** | Paramedics submit outside CE with certificates; reviewed records count toward NREMT renewal and print as certificates with CE provider and course numbers. |
| **Search and rescue** | Team members' training logs and imported history from the old spreadsheet sit on one transcript per member for the sheriff's annual review. |
| **Industrial ERT / HAZMAT** | The HAZWOPER refresher assigned each year writes a new *Course completion* each cycle; the safety lead audits a former employee's transcript years later for an OSHA inquiry. |
| **Security / law enforcement** | Officers' in-service hours and use-of-force classes are on the transcript; a group admin reviews only their own shift's members. |
| **Canada / EU employers** | The transcript and certificate print in the member's language on A4; categories from the Canada or EU workplace templates group the hours. |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/TrainingRecords/Transcript?userId=&from=&to=&categoryId=&source=&audit=`, `TranscriptPdf`, `TranscriptCsv`, `Certificate?id=`, `Evidence?fileId=`, `Queue`; POST `Verify`, `Reject`, `Void`, `ResolveDuplicate` |
| Permissions | Every member reads their own (Training view). Review: department admins, the roles on **Assign Training** (126) or, under *Department and group admins*, group admins for their group. No-row default follows **Create Training** (3) |
| Model | `LearningRecords` (source kind, status, hours, category, CE fields, supersedes, void reason, verification code), `LearningRecordFiles`; migrations M0344, M0345 |
| Source kinds | 0 Course completion, 1 Class session, 2 Training record, 3 Outside training, 4 Skill evaluation, 5 Task book sign-off, 6 Protocol acknowledgment, 7 Academy lesson, 8 Certification credit, 9 Imported history, 10 Calendar event, 11 Online course, 12 Building familiarization |
| Statuses | 0 Pending, 1 Verified, 2 Rejected, 3 Voided |
| Module switch | `DepartmentModuleSettings.TrainingDisabled` closes every records page |
| LMS gate | Operator flag `Training.Lms` plus an active LMS add-on: verification codes, QR, certificate templates (`/User/TrainingRecords/CertificateTemplates`, `LmsCertificateTemplates`) |
| Sealing | Transcript and certificate PDFs are sealed when sealing is configured (signature subject kinds Training transcript / Training certificate); a pending seal is completed by worker 90 |
| Audit log | Learning record verified, rejected, voided, duplicate resolved |
| v4 API | `GET api/v4/Trainings/GetTranscript?userId=&from=&to=`, `GET api/v4/Trainings/GetTrainingCategories` |
