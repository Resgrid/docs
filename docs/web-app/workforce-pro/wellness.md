---
sidebar_position: 3
title: Wellness & Exposures
slug: /web-app/personnel/my-exposures
---

# Wellness and exposure tracking

Wellness and exposure tracking keeps a lifelong record of what your members were exposed to on the job, and the health records that follow from it. It has two parts:

- **Exposure log** — each member's own log of carcinogen, bloodborne-pathogen, hazardous-substance and critical-incident exposures. Entries are suggested from the calls a member was on, and the member confirms them. Critical incidents can send an anniversary reminder to the member or the peer support team.
- **Health records** — bloodborne-pathogen and infectious-disease exposure cases (Ryan White Part G), injuries with duty status and return to duty, medical clearance (NFPA 1582), and the OSHA 300 and 301 log.

These records are restricted. A member sees their own. The officers you name in **Wellness settings** see the rest. Department administrators see none of it unless they hold one of those roles.

:::note Workforce Pro add-on
Wellness and exposure tracking is part of the [Workforce Pro add-on](./index.md). It is not free, and it is not part of Training or the LMS add-on.

- **Workforce Pro not available** to your department: wellness is hidden, and nothing is deleted.
- **Not licensed** (never bought, cancelled or lapsed): read-only. Every member still sees and exports their own records, officers still see what their role opens, and nothing can be recorded or changed. No reminders or alerts are sent.
- **Licensed**: records can be added and changed only for members who hold a [Workforce Pro seat](./seats.md). Officers acting on a seated member need no seat of their own.

A member's own data download and retention erasure always work. A cancelled add-on becomes read-only at the end of the paid month; a failed renewal keeps everything working for 7 days while the payment is retried. See [What works when](./index.md#what-works-when).
:::

**Where to find it:**

- **Personnel → My exposures** (every member). The page strip has the tabs **My exposures**, **Health records**, **Member report**, **Medical clearance**, **OSHA log**, **Post-call flags** and **Settings**. You only see the tabs your role allows. There is no sidebar item.
- **Dispatch → View call → Wellness follow-up** (members who can create calls). This flags the call so the members on it are asked to log the exposure.
- The **Duty status board** panel on the Personnel page (health officers and supervisors).

![My exposures page with two confirmed carcinogen exposures](/img/web-app/wellness/my-exposures.png)

## Who can see what

Access comes from the roles and certification types chosen in **Wellness settings**, not from Security & Permissions. What anyone can **change** also depends on Workforce Pro: while it is licensed, records about a member can be added or changed only if that member holds a [seat](./seats.md); while it is not licensed, everything below is read-only.

| Who | What they can do |
|---|---|
| **Every member** | Read, add, confirm and export their own exposure log. Report their own exposure or injury. See their own exposure cases, injuries, duty status and medical clearance. |
| **Wellness officer** (members of the **Wellness officer role**) | Read every member's exposure log, flag members for increased screening, add follow-ups, run the **Member exposure report**. Also a health officer. |
| **Designated officer** (members of the **Designated officer role**; the wellness officer role when none is set) | Receive and run bloodborne-pathogen and infectious-disease exposure cases, including reporting one for another member. Also a health officer. |
| **Health officers** (designated and wellness officers) | Injuries for other members, duty status, return to duty, medical clearance and the OSHA log. |
| **Supervisors** (department admins and group admins) | The duty status board: who is on restricted or off duty, or not fully cleared. Never why. Group admins see their own group only. |
| **Members who can edit a call**, wellness officers and admins | Flag or clear a call under **Post-call flags**. |
| **Department admins** | **Wellness settings** only. The help on the role field says it plainly: *Department administrators cannot read the logs unless they hold this role.* |

In a department with [Advanced Data Protection](../data-protection.md), the protected details also need the **View protected personnel data** permission (34) and a verified second factor. See [Privacy and retention](#privacy-and-retention).

## Set it up

1. Create a personnel role for your wellness officer (for example *Wellness Officer*, held by Rosa Delgado) and, if you want a separate one, a role for the designated officer who runs exposure cases. Roles are on [Personnel → Roles](../personnel.md).
2. If you have a peer support team, give its members a certification type, such as *Peer Support Team*, under [Certifications](../business-ops/certifications.md).
3. Open **Personnel → My exposures → Settings**.
4. Fill in the fields and click **Save**:

| Field | What it does |
|---|---|
| **Wellness officer role** | Members of this role read every member's exposure log and keep screening flags. |
| **Peer support team certification** | Members holding a current certification of this type get the anniversary reminders members choose to share. Leave it empty if you have no team. |
| **Keep entries for (years)** | At least 30 (OSHA 29 CFR 1910.1020), at most 100. Entries under a legal hold are kept longer. |
| **Designated officer role** | Members of this role receive bloodborne-pathogen and infectious-disease exposure reports (Ryan White Part G) and run the cases. **The wellness officer role** uses the role above. |
| **Bloodborne-pathogen training certification** | The certification type for your annual BBP training (OSHA 1910.1030). Each exposure case shows the member's status in it. |
| **Medical clearance certification** | The certification type each medical evaluation is also recorded as. The *Medical Clearance (NFPA 1582)* certification template fits. |
| **Keep injury records for (years)** | At least 5 after the end of the injury's year (OSHA 1904.33). |

![Wellness settings with the officer roles and certification types chosen](/img/web-app/wellness/settings.png)

## Flag a call for follow-up

After a call with an exposure or a potentially traumatic event, flag it so everyone on it is asked to log it.

1. Open the call (**Dispatch → View call**) and click **Wellness follow-up**.
2. On **Wellness follow-up: call 26-0412**, click **Flag** beside each category that applies: Carcinogen, Bloodborne pathogen, Hazardous substance, Critical incident or Other. *Critical incident* is separate from the call's dispatch priority.
3. Click **Back to the call**.

While the call is active the page says suggestions are built once it ends. The worker builds them when the call closes, or 12 hours after the flag if the call is still open. A suggestion goes to every active member who holds a [Workforce Pro seat](./seats.md) and was placed on the call by their status, a unit crew, a check-in or unit response times. Flagging a call needs Workforce Pro to be licensed; while it is not, flags are not turned into suggestions. A suggested duration is never more than 24 hours. **Clear flag** removes the suggestions nobody has confirmed yet.

![Wellness follow-up page for call 26-1 with the categories to flag](/img/web-app/wellness/flag-call.png)

## Your exposure log

**Personnel → My exposures** shows your tiles (**Confirmed entries**, **Critical incidents**, **Awaiting review**), any **Suggested from recent calls**, and your **Entries**.

You can always read and export your own log. To add or confirm entries you need a [Workforce Pro seat](./seats.md); without one the page says *Workforce Pro is not switched on for you, so your records here are read-only. Ask an administrator to switch it on.*

**Confirm a suggestion:**

1. Under **Suggested from recent calls**, click **Review**.
2. Check the details on **Review a suggested entry**. Add what you know under **Details (protected)**: **Substance or agent**, **Protective equipment worn**, **Decontamination afterwards**, **What happened** and **Health details**.
3. Click **Confirm entry**, or **This doesn't apply to me - dismiss**.

Nothing counts until you confirm it. **Save without confirming** keeps your changes and leaves it waiting.

**Log an exposure yourself:** click **Log an exposure**, fill in **When and what** (category, **Date and time**, **Duration (minutes)**, the call or **No call**) and the protected details, then **Confirm entry**.

**Anniversary reminders** (critical incidents only): tick **Remind me before the anniversary**, **Let the peer support team know before the anniversary**, or both. Reminders go out 7 days before the anniversary, from 09:00 department time.

**Recorded in error** → **Confirm** marks an entry as a mistake. It is kept, but no longer counted.

**Export PDF** and **Export CSV** download your own log (`exposure-log-<date>.pdf` / `.csv`).

## Officers: screening, follow-ups and the member report

A wellness officer opens a member's log from **Member report** → **Open log** (**Exposure log: Tomas Okafor**). It adds **Screening and follow-up**:

1. Click **Flag for increased screening**. Choose what prompted it (**Prompted by**), set **Next review** and write the **Follow-up plan** (protected), then **Save screening**.
2. **Add a follow-up** → choose the kind (Screening appointment, Baseline test, Medical review, Wellness check-in, Other follow-up), who does it (the member or a wellness officer) and the date, then **Add follow-up**.
3. **End increased screening** when it is no longer needed.

**Member report** lists members with their counts for a **From** / **To** range, and the **Recent post-call flags**. **Export CSV** holds counts only.

![A member's exposure log as the wellness officer sees it](/img/web-app/wellness/member-log.png)

## Report a bloodborne-pathogen or infectious-disease exposure

1. Go to **Health records** and click **Report an exposure**.
2. Choose **From one of your exposure entries** (a confirmed Bloodborne pathogen or Other entry) or **A new exposure**.
3. Pick **How exposed** (Needlestick or sharps; Splash to eyes, nose or mouth; Contact with broken skin; Airborne infectious disease; Other), **When it happened**, the call, **What happened** and **Protective equipment worn**. Never enter the source patient's name or record number.
4. Click **Send the report**. The designated officers are notified.

The designated officer runs the **Exposure case** through its stages with **Move to: …**: Reported → Source follow-up requested (needs the receiving facility) → Notification requested (Ryan White) → Notification answered → Post-exposure follow-up → Closed. The facility's answer is due 48 hours after the request; after that the case shows **Answer overdue** and the officers are told.

- **Protected notes**: **Source follow-up**, **Notification answer**, **Testing and treatment notes**, **Closing notes**.
- **Post-exposure follow-up tasks**: Baseline testing, Prophylaxis review, Six-week test, Three-month test, Six-month test, Counselling, Other. **Add task**, **Done**, **Cancel**. A case closes only when every task is done; a closed case can reopen into follow-up.
- **Bloodborne-pathogen training** shows the member's status in the BBP training certification: Current, Expiring soon (30 days), Expired, No record, or *Not tracked by the department*.
- **Record as an injury** copies a contaminated sharps exposure to an injury for the OSHA log.

![Exposure case in the Notification requested stage with follow-up tasks](/img/web-app/wellness/exposure-case.png)

## Injuries, duty status and return to duty

1. **Health records → Report an injury**. Under **What happened** fill in **Where it happened**, **Job title**, **What the member was doing and what happened**, **The injury, the part of the body and what caused it** and **Physician, facility and treatment**.
2. A member can report their own injury. A health officer completes the **OSHA classification**: **Injury or illness type**, **OSHA-recordable case**, **Privacy case**, **Treated in an emergency room**, **Hospitalized overnight**, **Date of death**.
3. Under **Restricted or off duty**, the officer chooses the status, start date, expected return and the restrictions (protected), then **Set duty status**. Supervisors see only that the member is on restricted duty.
4. When the member is back, write the **Clearance notes** and click **Clear for full duty**. This closes the injury.

Days away and restricted are counted from the duty status history, at most 180. When the expected return date passes, the health officers get a return-to-duty review notice. **Recorded in error** takes an injury off the OSHA log; it is kept for its retention period.

## Medical clearance

**Medical clearance (NFPA 1582)** lists the **Current clearance by member** and the **History**. To record one, use **Record an evaluation**: the member, **Evaluated**, **Next evaluation**, the status (Cleared, Cleared with restrictions, Not cleared) and **Restrictions and reasons** (protected), then **Record evaluation**. Each evaluation is also recorded as a certification of the medical clearance type; *Not cleared* suspends it. Officers and staffing see only the status.

## OSHA 300 and 301

**OSHA log** shows the recordable injuries of a year (choose it and click **Show**) with the 300A totals. Download **300 log (CSV)**, **300 log (PDF)**, **301 reports (CSV)** or **301 reports (PDF)**. A privacy case shows *Privacy case* instead of the member's name on the 300 log. Keep these records for five years after the end of the year they cover (29 CFR 1904.33).

![OSHA 300 and 301 page for the current year with totals and export buttons](/img/web-app/wellness/osha-log.png)

## Duty status board

The **Duty status board** on the Personnel page lists members on restricted or off duty, or not fully cleared. It shows the status only, never why.

## Notifications

| Notice | Who gets it |
|---|---|
| Exposure reported / Exposure notification overdue | The designated officers |
| Injury reported / Return to duty review | The health officers |
| Please review your exposure log | A member with a new suggestion |
| Thinking of you | The member, before a critical incident's anniversary (when they asked) |
| Peer support reminder | The peer support team, before an anniversary the member shared |

They are sent only while Workforce Pro is licensed, and only about members who hold a [Workforce Pro seat](./seats.md). They go to active members only, never to the person who acted, through each member's own push, e-mail and text settings. The text names no health detail. They are not department notification rules, so they do not appear under [Notifications](../notifications.md).

## Privacy and retention

- **Protected with ADP**: the substance, narrative, protective equipment, decontamination, health details and screening plan of exposure entries; case notes; injury descriptions, restrictions, treatment and clearance notes; clearance restrictions. Without a grant the pages show *Protected* and *Some details are protected by your department's Advanced Data Protection and are not shown here.*
- **Operational, readable without a grant**: the member, the call, the category, dates, the case stage, duty and clearance status and OSHA codes.
- Health data is never indexed for search, never used by any AI feature, never in a department export, and raises no [workflow](../workflows.md) events.
- **Retention**: exposure entries and cases at least 30 years (up to 100), clearances 30 years, injuries at least 5 years after the end of their year. A legal hold keeps records longer.
- Every change and export is in the [audit log](../security-permissions.md#audit-logs), with ids, stages and dates but never the protected values.
- A member's own data download (GDPR archive) includes `exposures.json` and `health_records.json`.

## Links to training

Wellness does not link to courses or trainings. It reads three certification types you choose in **Wellness settings**: the annual bloodborne-pathogen training shown on each exposure case, the peer support team, and medical clearance. The certification templates *Bloodborne Pathogens* (BBP) and *Medical Clearance (NFPA 1582)* and the training category item *Bloodborne pathogens (annual)* fit these. Keep the certifications current with [Training](/web-app/trainings/) or [Certifications](../business-ops/certifications.md).

## Setup examples

| Organization | How they use it |
|---|---|
| **Career or volunteer fire** | Flag working structure fires as *Carcinogen* so crews log smoke exposure; flag line-of-duty deaths and child fatalities as *Critical incident* with peer support reminders; the captain who runs the wellness program holds the wellness officer role. |
| **EMS** | The infection control officer holds the designated officer role and runs needlestick cases through the Ryan White notification; BBP training status is read from the annual certification. |
| **SAR** | Critical incident flags after body recoveries, with the peer support team on the anniversary; few injuries, so the OSHA log is used only if the team is an employer. |
| **Industrial / HAZMAT** | *Hazardous substance* entries with the substance and decontamination; the site safety lead keeps the OSHA 300 log and medical clearance for respirator wearers. |
| **Law enforcement / security** | Critical incident entries and peer support; injuries and duty status for officers on restricted duty. |
| **Canada / EU** | The log and duty status work as they are; the OSHA forms and Ryan White stages are US-specific, so keep using your own provincial or national forms for reporting. |

## Technical reference

| Item | Value |
|---|---|
| Routes (exposure log) | `/User/Wellness/{Index,Member,New,Entry,Save,Dismiss,Void,Confirm,Reminders,ExportPdf,ExportCsv,Report,ReportCsv,SetScreening,ClearScreening,AddFollowUp,CompleteFollowUp,CancelFollowUp,FlagCall,ClearCallFlag,Settings}` (`WellnessController`) |
| Routes (health records) | `/User/MemberHealth/{Index,ReportExposure,Case,AdvanceCase,SaveCaseNotes,AddCaseFollowUp,CompleteCaseFollowUp,CancelCaseFollowUp,ReportInjury,SaveInjury,Injury,SetDutyStatus,ClearReturnToDuty,VoidInjury,Clearances,RecordClearance,VoidClearance,Osha,OshaLogCsv,OshaLogPdf,OshaReportsCsv,OshaReportsPdf}` (`MemberHealthController`); duty board view component `MemberDutyBoard` |
| Access | Roles from the wellness settings; no `PermissionTypes` entry. ADP reveals need `ViewProtectedPersonnelData` (34). |
| Setting | Department setting 141 `WellnessSettings` (wellness officer role, peer team certification, retention years, designated officer role, BBP training certification, medical clearance certification, injury retention years) |
| Feature flag / add-on | Flag `Workforce.Pro` (off: the routes and v4 endpoints answer 404, the **My exposures** button, **Wellness follow-up** and duty board are hidden). Add-on `PlanAddonTypes.WorkforcePro = 8`, checked by `WorkforceProAccessService`: not licensed refuses every change with `workforce_pro_required`; licensed refuses a change about a member without a seat with `workforce_pro_seat_required` (v4: 400 with the code). See [Workforce Pro add-on](./index.md#technical-reference). |
| Worker | 91 *Member Wellness*, every 15 minutes: builds suggestions, anniversary reminders, due notices (licensed, seat holders only), retention (always) |
| Notices | Event types 68 `ExposureIncidentNotice` (push code `EI:`) and 69 `DutyStatusNotice` (`DS:`), not mapped to department notification rules |
| ADP | Catalog 37 (exposure log) and 38 (health records), Personnel family |
| Migrations | M0360 (exposure log), M0372 (exposure cases), M0373 (injuries), M0374 (medical clearances) |
| v4 API | `Wellness/GetMyExposures`, `CreateExposure`, `ConfirmSuggestion`, `DismissSuggestion`; `MemberHealth/GetMyHealth`, `GetMyDutyStatus`, `GetMyInjuries`, `GetDutyBoard`, `ReportExposure`, `ReportInjury`, all on the caller's own records (the duty board by role) |
