---
sidebar_position: 13
title: Pay Data Reporting (California)
---

# Pay Data Reporting (California CRD)

California employers with **100 or more employees** (or 100 or more workers hired through labor contractors) must file an annual **pay data report** with the Civil Rights Department (CRD) under Government Code §12999: employee counts and pay bands by **job category, race/ethnicity and sex**, per establishment. This module prepares the **Payroll Employee** and **Labor Contractor Employee** reports from your [Workforce](workforce) data and each member's **voluntary self-identification**, validates them against the reviewed CRD template, and exports the CSV / XLSX files and a **portal worksheet**. You file in the CRD portal yourself.

:::info Resgrid prepares and exports; it never files
It never decides whether you are covered and never certifies. Every input and output here is a protected field served *no-store*; the department must have [Advanced Data Protection](../data-protection) **enabled** (not just purchased) before these pages open.
:::

Business Ops add-on with `Compliance.CaliforniaPayDataReporting` **and** Advanced Data Protection enabled. Menu: **Workforce & Business Ops → Workforce → Pay data reporting** (administrators, *Manage California pay data reporting*, *Export California pay data reports*). Every member sees **My demographic response** while the flag is on.

## Before the first run

1. **Workforce → Employer**: legal name, FEIN, SEIN, CA SOS number, NAICS, addresses, filing contact and the **coverage status** you declare.
2. **Establishments** with NAICS and *reported in the prior year*.
3. **Workers → employments → job assignments** with the **CRD job category**, establishment and work mode for every California employee; **labor contractors** and their employees for the second report.
4. **Annual pay facts** for the reporting year (import the payroll export; approve).
5. **Demographic responses** — ask every member to answer **My demographic response**; a compliance officer records the rest from employment records.

## My demographic response

Every member's own page (**Workforce & Business Ops → My demographic response** or from the profile menu): *Hispanic or Latino* (yes / no / no answer), **race / ethnicity** (select every category that applies — two or more are reported as multiracial — or *Decline to state*) and **sex** (or decline). Answers are stored separately from the personnel record, encrypted, used only for the aggregate report and never shown on any other screen. Answering is voluntary; *Decline to state* is a valid answer and is reported as such. The page explains *why we ask*.

A compliance officer with *Manage California pay data reporting* can open a worker's **Demographic record** for someone who has not self-identified: **collection source** (*employment record*, *other reliable record*, or — as a last resort — *observer perception*, which is flagged on every report run), a required **reason** (audited), and the same answers. Responses are versioned.

## The report run

**Workforce → Pay data reporting** shows the **readiness** for the year: due date, the reviewed **schema profile** (`CRD-RY2025` in this release), coverage status, open runs, unresolved exceptions, demographic responses missing, annual pay facts missing, and **demographic completeness** (self-identified / declined / observer perception). **New run**: report type, reporting year and the **snapshot period** (a single pay period between the dates the CRD allows).

A run is a four-step wizard, then attestation:

| Step | What happens |
|---|---|
| **1. Build snapshots** | One row per California employee in the snapshot period: worker, establishment, CRD job category, demographic code, **pay band** (from annual pay facts), hours, hourly rate and work mode, with *Included* yes/no. **Override** a snapshot (category, work mode, inclusion) with a reason — audited. Demographic responses are matched as they stand today, not as of the snapshot date. |
| **2. Aggregate rows** | Counts per establishment × job category × demographic code × pay band, plus mean and median hourly rates and the non-remote / remote-in-CA / remote-outside-CA split. |
| **3. Validate** | Errors block freezing (missing job category, employee with no pay facts …); warnings do not. **Clarifying remarks** (up to 500 characters) are required when Box 1 earnings were used or an exempt-hours proxy applies. |
| **4. Freeze and export** | A frozen run is immutable; the **CSV** and **XLSX** files in the CRD template column order (checksum-stable for unchanged input) are downloadable — no-store, audited — until purged after the retention window (30 days by default). The **Portal worksheet** lists the employer-level values you type into the portal beside the upload. |
| **Attest in the portal** | Certify in the CRD portal, then **Record certification** here with the portal's reference → *Certified externally*. |

**Create correction** after filing marks the exported run *Correction* and opens a new draft; **Void** discards a run and purges its files. Run statuses: *Draft, Validated, Frozen for export, Exported, Certified externally, Correction, Void*.

During the filing season (January–May) administrators receive a daily **readiness digest** — due date, run state and counts of unresolved exceptions, missing responses and missing pay facts — never a name, code, rate or earnings figure.

## Setup examples

| Organization | Applies? |
|---|---|
| **California city / county fire or EMS with 100+ employees** | Yes — both reports if you also use labor contractors (e.g. contract dispatchers). Run the wizard in April; certify in the CRD portal by the deadline. |
| **California private ambulance / security company with 100+ workers** | Yes — usually the payroll report only; labor contractor report if you use staffing agencies. |
| **Smaller California employers, volunteer departments, employers outside California** | No filing duty — leave the flag off; the demographic questionnaire stays hidden. |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/Workforce/{PayData,PayDataRun?tab=snapshots\|rows\|validation\|artifacts,Worksheet,MyDemographics,WorkerDemographics}`; POST `CreatePayDataRun`, `BuildSnapshots`, `OverrideSnapshot`, `AggregateRows`, `SaveRemarks`, `ValidateRun`, `FreezeAndExport`, `MarkCertified`, `CreateCorrection`, `VoidRun`, `SaveMyDemographics`, `SaveWorkerDemographics`; `DownloadArtifact` |
| Model | `PayDataEntities` — report runs, employee snapshots, aggregate rows, validation, export artifacts (protected binary), demographic responses (versioned, `DemographicCollectionSources`); `CaPayDataSchemaProfile` `CRD-RY2025` (source checksum pinned by the reviewer) |
| Permissions | *Manage California pay data reporting* (77), *Export California pay data reports* (78); members always answer their own response |
| Gates | Flag `Compliance.CaliforniaPayDataReporting` + `DepartmentDataProtectionState.Enabled` (`CanUsePayDataReportingAsync`) |
| Worker | 49 `PayDataReportingReadinessLogic`, daily: filing-season digest and artifact purge |
| Services | `IPayDataDemographicsService`, `ICaPayDataReportingService`, pure `PayDataAggregator` (dependency-free XLSX writer) |
| Config | `WorkforceConfig.ExportArtifactRetentionDays` 30, `FilingSeasonStartMonth`–`EndMonth` (1–5) |
