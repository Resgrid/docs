---
sidebar_position: 11
title: Workforce
---

# Workforce

**Workforce** is where a department that is also an **employer** keeps what its people cost: the employer identity and **establishments** (physical locations), **workers** with their employment periods and job assignments, **compensation profiles** (base pay, differentials, employer costs), **work entries** (hours per day from payroll, deployments and calls) and **annual pay facts** (W-2 earnings, hours, weeks). It feeds [Field Costing](field-costing) (what a bid, call or deployment really costs), the Cal OES MARS **Salary Survey**, and [Pay Data Reporting](pay-data-reporting).

Business Ops add-on with `Workforce.InternalCosting`. Menu: **Workforce & Business Ops → Workforce** (administrators and holders of a workforce permission).

:::caution Protected data
Identifiers, addresses, pay rates, earnings, demographic responses and export files are [Advanced Data Protection](../data-protection) fields. They render **REDACTED** without a current Protected Data Grant (verify with your authenticator), are never cached or logged, and a *REDACTED* value left unchanged on a form keeps what is stored. Enrol the department in ADP before entering real pay data.
:::

![Workforce](/img/web-app/workforce/index.png)

## The pages

The workforce home shows three panels — **Employer**, **Field costing** and **Pay data reporting** — with counts and links.

### Employer

**Workforce → Employer**: the legal entity the CRD report is filed under — legal name, **FEIN**, **SEIN (EDD)**, CA Secretary of State number, NAICS, EDD and headquarters addresses, filing contact, **coverage status** (*Not covered, Covered — payroll, Covered — labor contractor, Covered — both*; declared by you after reading the CRD guidance — Resgrid never decides whether you must file), US and California employee counts and whether you are part of an **integrated enterprise** (then list the **affiliated entities**).

![Employer](/img/web-app/workforce/employer.png)

### Establishments

**Workforce → Establishments**: every physical location employees are assigned to — code, name, street address, city, state, ZIP, NAICS, major activity, affiliate, active window, time zone, **Headquarters** and **Reported in the prior year**. The CRD report is filed per establishment; a fire department's stations are usually one establishment each unless payroll treats them as one.

![Establishments](/img/web-app/workforce/establishments.png)

### Labor contractors

**Workforce → Contractors**: firms that supply **labor contractor employees** (covered by the second CRD report) — legal name, ownership, DBA, FEIN or other identifier, contact details, relationship window and where the identity came from (contract, W-9, portal record).

### Workers, employments, job assignments

**Workforce → Workers**: every person you pay or report on. **Add worker** from a department member, or an **external worker** by payroll key and label (both protected). Open a worker:

![Worker](/img/web-app/workforce/worker.png)

| Section | Fields |
|---|---|
| **Employments** (never overlap) | **Worker kind** (*Payroll employee, Labor contractor employee, Volunteer, Independent contractor*), start/end, employment type (full-time, part-time, intermittent), exemption status, **California basis** (assigned to a California establishment, works in California, both, not California), default establishment, **personnel role** (used to pick a role-default compensation profile), labor contractor, affiliate. |
| **Job assignments** (per employment, over time) | Job title, **CRD job category** (one of the ten categories of the reviewed schema profile), SOC code and version, establishment, work mode (*non-remote, remote within California, remote outside California assigned to a California establishment*), work country / state, **Cal OES MARS classification** and authority profile, mapping provenance. |
| **Compensation** | Link to the worker's compensation profiles. |
| **Demographic record** | For a compliance officer to record a worker who has not self-identified (see [Pay Data Reporting](pay-data-reporting)). |

### Compensation

**Workforce → Compensation** (from a worker's page or the *Compensation* tab): **employee profiles**, **role defaults** and a **department default**. Estimates use the employee profile, then the role default, then the department default; the payroll system's approved cost always wins.

![Compensation profile](/img/web-app/workforce/compensation-profile.png)

| Panel | Fields |
|---|---|
| **Profile** | Scope, effective/expiry, **pay basis** (*hourly, salary, daily, shift, stipend*), currency, **base amount**, regular hourly equivalent (optional override), standard hours per day / week / year, **rate multipliers** JSON by pay code (defaults 1.5 overtime, 2 double time), source. |
| **Pay components** | Differentials, incentives, longevity, education, EMS, hazmat, USAR, specialty pay — per hour, percent of base, per shift, per pay period or fixed annual, with eligible pay codes and *per OT hour*. |
| **Employer cost components** | Payroll taxes, workers' compensation, pension, health and other benefits, fixed labor cost, allocated overhead — percent of eligible pay, per hour / shift / day or fixed annual, with an optional cap. |
| **Approval** | **Approve profile**: unapproved profiles still price estimates but flag every line for review; any rate change removes the approval. The **loaded cost of a regular 8-hour day** is previewed. |

### Work entries

**Workforce → Work entries**: hours per worker and day — **hours type** (*regular, overtime, double time, standby, travel, paid leave, other*), establishment, work mode and location, the call or deployment they belong to, and the **approved payroll cost** (when present it replaces any estimate for that day). Entries can come from payroll (external source and id), from deployments' time reports or be typed.

### Annual pay facts

**Workforce → Annual pay facts** (per reporting year and report type): **W-2 Box 5** (or **Box 1** as fallback), client-allocated earnings for labor contractors, actual worked hours, paid-leave hours, days worked, an **exempt-hours proxy** method (actual + paid leave, or days × average hours), weeks worked, reconciliation flag and approval. Facts are **immutable and versioned** — correcting one creates a new version. **Import (CSV)** takes the payroll export in the canonical column order: a **dry run** validates and reconciles every row before **Commit import**; imported facts arrive unapproved.

![Annual pay facts](/img/web-app/workforce/annual-facts.png)

## Setup examples

| Organization | What to set up |
|---|---|
| **Career fire department (California)** | Employer + one establishment per station, every member as a worker with role-default compensation per rank, work entries fed from deployments, annual pay facts imported from payroll each January → CRD report and MARS Salary Survey. |
| **Career fire / EMS outside California** | Employer and establishments optional; compensation profiles per role and employer cost components so deployment cost runs and bid estimates are realistic. |
| **Volunteer / combination department** | Workers as *Volunteer* with stipend profiles; work entries per call to value volunteer hours for grants; no pay data reporting. |
| **Wildland / security contractor** | Employee profiles per crew member with overtime multipliers and per-OT-hour components; department default for bid estimates before the roster is known. |
| **Industrial site** | Workers per shift, establishments per plant, labor contractors for contract crews; compensation profiles for internal chargebacks. |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/Workforce/{Index,Employer,Establishments,Contractors,Workers,Worker,Compensation,CompensationProfile,WorkEntries,AnnualFacts}` and their `Save*/Delete*` POSTs; `ImportAnnualFacts` (dry run / commit) |
| Model | `Core/Resgrid.Model/Workforce/` — employer profile, affiliated entities, establishments, labor contractors, workers, employments, job assignments, compensation profiles + pay / cost components, work entries, annual pay facts (versioned); `WorkforceProtectedFields` = ADP catalog 28 (41 columns; decimals stored as protected text) |
| Permissions | *Manage workforce and compensation* (75), *View workforce compensation* (76) — plus a current Protected Data Grant to read values |
| Flag | `Workforce.InternalCosting` (child of `Business.Operations`) |
| Config | `WorkforceConfig` (overtime threshold 8 h/day, usage conflict 10 %, export retention 30 days, filing season Jan–May) |
| Services | `IWorkforceService`, `IWorkforceImportService`, `ICompensationCostService` (employee → role → department fallback; approval dropped on rate edit) |
| Search | Workforce data is never indexed |
