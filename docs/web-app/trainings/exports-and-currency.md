---
sidebar_position: 22
title: Exports and training currency
---

# Training exports, CE / CPD files and training currency

Training data leaves Resgrid in three ways:

- **Everyday exports** from the pages you already use: a member's transcript, a certificate, the hours report, the ISO and NCCP reports, the certification dashboard.
- The **training data export**: a zip of everything the department put into Training, for your own archive or a move to another system. Free, and it keeps working without the LMS add-on and after a lapse.
- **CE / CPD reporting**: files for a regulator, professional body, employer or insurer, including the US CAPCE, state CE and state roster files. Part of the LMS add-on.

This page also covers the department's **training currency**, the money currency that training request costs, class costs and class fees use.

**Where to find it:** **Trainings → Records → Data export** (department owners and administrators). With the LMS flag on, **Trainings → Programs** also shows **CE / CPD reporting** (department administrators and department-wide record managers) and **Data export**; the training currency is under **Trainings → Programs → Settings**.

## Which export answers which question

| You need | Use | Format | Add-on |
|---|---|---|---|
| One member's training for a renewal or an audit | [Transcript](/web-app/trainings/transcript) → **PDF** / **CSV** | PDF, CSV | Free |
| Proof of one completion | Transcript → **Certificate** | PDF (verification code with the LMS) | Free |
| Department hours by category, member or month | [Hours report](/web-app/trainings/hours-report) → **CSV** / **PDF** | CSV, PDF | Free |
| ISO FSRS hours against targets; NREMT NCCP progress | [ISO report, NCCP progress](/web-app/trainings/hours-report#iso-report-lms) | CSV, PDF | LMS |
| Who holds which certification; role compliance | [Certifications](/web-app/business-ops/certifications#dashboard-and-report) dashboard **Export CSV**; Compliance report | CSV, PDF | Free |
| Scheduled, e-mailed reports (hours, ISO, NCCP, compliance matrix, competency gaps, certification exceptions, training request and class costs) | **Trainings → Programs → Reports** ([programs and plans](/web-app/trainings/programs-and-plans)) | Report catalog | LMS (hours report free) |
| A file to upload to a regulator or professional body | [CE / CPD reporting](#ce-cpd-reporting) | CSV | LMS |
| Everything, to keep or to move | [Training data export](#data-export) | zip | Free |
| A member's own personal data | The personal data (GDPR) export includes their training submissions | JSON | Free |

## Training data export {#data-export}

Department owners and administrators can export everything the department put into Training at any time: courses with their versions, lessons and media, question banks with answer keys, assessment answers, lesson plans, skill sheets, requirements, plans, and every record.

1. Open **Trainings → Records → Data export** (or **Trainings → Programs → Data export**).
2. Under **New export**, choose **What to include**:
   - **Everything**: all content and records, including question banks with their answer keys and learners' answers (*Keep it private*);
   - **Records only**: learning records, enrollments, assessment scores, certificates, members and categories as CSV, plus xAPI statements. No course content and no answer keys.
3. Tick **Copy hosted videos into the zip** to include LMS videos; otherwise the zip lists download links.
4. Select **Start export**. *The export was queued. This page shows when it is ready.*
5. The export is built in the background. When **Status** is **Ready**, select **Download**. The download link works for 7 days (**Link expires**); after that start a new export.

**Exports** lists every export with **Requested**, **Included**, **Status** (*Queued*, *Building*, *Ready*, *Failed*, *Expired*), **Size and counts** (*N records, N courses, N attempts*) and **Link expires**. Two exports can be built at a time.

The zip holds `manifest.json` with the count of every entity and a checksum of every file. CSV files are UTF-8; times are UTC. If the LMS add-on is not active the page says *Exports keep working: your records and content stay yours.*

![The training data export page](/img/web-app/trainings/rec-data-export.png)

## CE / CPD reporting (LMS) {#ce-cpd-reporting}

**Trainings → Programs → CE / CPD reporting** builds training hours and CE / CPD files from verified records. *Resgrid builds the files; it does not submit them and is not an accreditor. Check each file before you upload it.*

Who: department administrators and department-wide record managers (Assign Training, permission 126), while the LMS flag is on and the add-on is active or lapsed. Changing the settings and columns needs a department administrator and an active add-on (*Changing the CE / CPD reporting settings needs an active LMS add-on.*).

### Build a file

1. Under **Build a file**, choose the **File**, the period (**From**, **To**; default last month), optionally a **Training category**, and **Include removed, disabled and hidden members** if needed.
2. Select **Preview**. The first 50 rows show, with *N rows in the file* and warnings such as *12 rows have no value for "NREMT number"*.
3. Select **Download CSV**.

Each file has one row per verified completion in the period. The CAPCE, CE Broker, Virginia, New Jersey and other-state CE files leave out records without a CE course number, and the CAPCE and CE Broker files take only your own CE courses (your provider).

| File | For | Layout |
|---|---|---|
| **Training hours / CE / CPD file (any reporting body)** | Any regulator, professional body, employer or insurer, in any country: dates as yyyy-MM-dd, hours with a full stop, headings in your language | Configurable CSV |
| **CAPCE completion file** | Departments that are CAPCE-accredited providers: verified completions of your own CE courses | Configurable CSV (CAPCE publishes no column order) |
| **Florida EMS (CE Broker)** | CE Broker's Easy Excel provider upload, columns A to H, no header row; save as an Excel workbook before uploading | Published layout |
| **Virginia EMS**, **New Jersey EMS**, **Florida fire training** | State offices that publish no file layout | Configurable CSV |
| **Other US state CE (CSV)** | Any other US state's CE office | Configurable CSV |
| **US state-ready roster (Acadis and others)** | A course completion roster for state systems without an import template | Configurable CSV |

### Settings

**CE / CPD reporting settings** (department administrators, active add-on): **CAPCE provider number**, **CAPCE provider name (as entered on courses)**, **CE Broker provider tracking number (Florida)**, and which certification types hold the numbers the files need: **License or registration certification type**, **NREMT registration certification type**, **National EMS ID certification type**. *The files read these numbers from each member's certifications of the chosen type: the number, the area as the state, province or region, the type as the level, and the expiry date.*

### Columns

**Columns** on a file opens **File columns**: for each column a **Heading**, a **Value** (first name, last name, full name, email, member number, completion date, course title, course code, training provider, CE / CPD activity number, CE / CPD hours, hours, category name or code, method, location, instructors, license or registration number, licensing state, license level and expiry, NREMT number and re-registration date, National EMS ID, provider numbers, learning record ID, certificate verification code, record source, or **Fixed text**) and a **Format or text**. For dates use `yyyy-MM-dd` unless the body asks for another format such as `dd.MM.yyyy` or `MM/dd/yyyy`; for hours `0.##`. Leave a heading empty to remove a column. **Save columns**; **Restore default columns** goes back to the defaults.

When the department uses [Advanced Data Protection](/web-app/data-protection), license, NREMT, National EMS ID and member numbers are protected: a plain download carries them as *REDACTED*, and the page's download asks for step-up first and then carries them as recorded. Every download is audited.

![The CE / CPD reporting page](/img/web-app/lms/rec-ce-reporting.png)

### Walkthrough: last month's CE file for the state EMS office

1. Dana Whitlock opens **CE / CPD reporting settings** and sets **License or registration certification type** to *State EMT licence*, then **Save settings**.
2. On the **Other US state CE (CSV)** file she selects **Columns**, renames *License or registration number* to *Cert #*, sets the completion date format to `MM/dd/yyyy`, and selects **Save columns**.
3. Under **Build a file** she chooses that file and last month, and selects **Preview**: two rows have no license number. She adds the missing numbers on those members' certification records.
4. She selects **Download CSV** and uploads it to the state portal.

## Training currency {#training-currency}

**Trainings → Programs → Settings → Training currency (ISO code, e.g. EUR, CAD, USD)**. *The department's training currency, as an ISO code such as CAD, EUR, GBP or USD. Training request costs are entered in it, and new classes, class costs and public class fees use it unless a class names another.* The **Training request costs** and class cost reports total in it.

Until the department chooses one, the currency is EUR on the EU cluster and USD elsewhere. Training officers (department administrators and department-wide record managers) change it; saving needs an active LMS add-on. It has nothing to do with whether members are *current*: for that, see the category targets on the [transcript](/web-app/trainings/transcript), the [certification dashboard](/web-app/business-ops/certifications), the [requirement progress](/web-app/trainings/certifications-from-training#who-holds-it-and-what-is-open) of each certification, and the compliance matrix under **Trainings → Requirements → Compliance**.

## Setup examples

| Organization | Exports |
|---|---|
| **EMS agency (US)** | Monthly CE file for the state office; CAPCE completion file as an accredited provider; members' NREMT numbers held on an *NREMT registration* certification type |
| **Florida EMS** | Florida EMS (CE Broker) file each month, opened in a spreadsheet and saved as Excel before upload |
| **Fire department** | Hours report PDF for the annual report; ISO report for the ISO review; a *Records only* data export each January for the archive |
| **Industrial ERT** | Training hours file filtered to the *HAZWOPER refresher* category for the insurer |
| **Canada** | Training currency CAD; training hours file with headings in French or English for the provincial regulator |
| **EU / UK CPD** | Training currency EUR or GBP; training hours / CPD file with `dd.MM.yyyy` dates for the professional body |
| **Department moving systems** | An *Everything* data export with hosted videos copied into the zip |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/LmsExports` (`Index`), POST `Queue?scope=&includeMedia=`, `Download?id=`; `/User/LmsExports/Ce`, `CePreview?key=&from=&to=&former=&categoryId=`, `CeDownload`, POST `CeSettings`; `/User/LmsExports/CeColumns?key=` (GET, POST); `/User/LmsPrograms/Settings` (training currency) |
| Permissions | Data export: department owners and administrators. CE files: department administrators and department-wide record managers (Assign Training 126). CE settings and columns: department administrators |
| LMS gate | Data export: none (works without the flag, the add-on, or after a lapse). CE reporting: `Training.Lms` flag on and the add-on active or lapsed; settings need it active. Training currency: saving needs it active |
| Worker | 99 *LMS data export* (every 5 minutes) builds the zip; expired exports are purged |
| Model | `LmsDataExports`, `LmsDataExportBlobs` (M0395); scopes 0 Everything, 1 Records only; at most 2 building per department; link `LmsDataExitConfig.DownloadLinkDays` (default 7) |
| Settings | 148 `LmsCeReportingSettings` (provider numbers, identifier certification types, column maps); 144 `LmsProgramSettings.RequestCurrency` (training currency) |
| CE exporter keys | `training-hours`, `capce`, `fl-ems`, `va-ems`, `nj-ems`, `fl-fire`, `state-ce`, `state-roster` |
| Workflow trigger | 269 LMS data export ready |
| Data protection | CE downloads go through the protected read pipeline; plain downloads carry protected numbers as REDACTED |
