---
sidebar_position: 4
title: Certifications
---

# Certifications

**Certifications** tracks every credential your department relies on — firefighter and officer certifications, EMT / paramedic registry and state licences, CPR cards, NWCG red cards, guard cards, CDLs and DOT medical certificates for people; pump tests, aerial certifications, DOT inspections, registration, insurance and ambulance permits for **units** — with expiry dates, verification, continuing-education credits and **role requirements** that can warn or even remove a member from a role when a mandatory certification lapses.

Free for every department. Menu: **Workforce & Business Ops → Certifications** (administrators and members with *View certifications*). Every member sees and manages **their own** certifications under **Profile → Certifications**.

![Certification dashboard](/img/web-app/certifications/dashboard.png)

## The pages

| Tab | What it is for |
|---|---|
| **Dashboard** | Who holds what, what is expiring and what has lapsed — for **People** or **Units**, filtered by category, group and role; **Export CSV**. |
| **Certification types** | The catalog: your own types and a **template gallery** of 90+ common credentials. |
| **Settings** | Enforcement mode, grace period, expiry notification days. |
| **Compliance report** | Printable / exportable report of role requirements versus what members hold (under Reports). |

## Setting up

### 1. Certification types

**Certifications → Certification types.** A type has a stable **code** (used by role requirements, rate schedules and integrations — it cannot change once a role requirement references it), a **category** (Fire, EMS, SAR, Wildland, Emergency management, Industrial, Security, Medical, Driver, Vehicle, Other), a scope (**Person** or **Unit**), an **issuing authority**, a **default validity in months** or *Never expires*, **credit hours per renewal** for con-ed cycles, and **Requires supervisor verification** (new records stay *Pending verification* until someone with *Manage certifications* signs them off).

![Certification types](/img/web-app/certifications/types.png)

The fastest start is the **Template gallery**: filter, tick the credentials you track and **Add selected**. Each template becomes a type your department owns and can edit.

![Template gallery](/img/web-app/certifications/types-template-gallery.png)

Highlights:

| Category | Templates |
|---|---|
| **Fire** | Firefighter I/II, Driver/Operator Pumper and Aerial, Hazmat Operations and Technician (12 months), Fire Officer I/II, Instructor I, Inspector I, Fire con-ed (24 months, 24 credit hours) |
| **EMS / Medical** | NREMT EMR / EMT / AEMT / Paramedic (24 months with 16–60 credit hours), State EMT / AEMT / Paramedic licences, BLS, ACLS, PALS, PHTLS, medical-director skills verification, First Aid/CPR/AED, Wilderness First Aid / First Responder |
| **SAR** | SARTECH I–III, rope and swiftwater technician, avalanche, K9 team, helicopter operations |
| **Wildland** | NWCG FFT2 / FFT1 / CRWB / ENGB / DIVS, Red Card, RT-130 annual refresher, Work Capacity Test |
| **Emergency management** | ICS-100/200/300/400, IS-700/800, CEM, AEM |
| **Industrial** | OSHA 10/30, HAZWOPER 40 and 8-hour refresher, forklift, confined space, lockout/tagout, respirator fit test, hearing conservation, bloodborne pathogens, TWIC, NCCCO crane |
| **Security** | Guard card, armed endorsement, firearm requalification, baton/OC permit, use of force, PI licence, BC security worker licence |
| **Driver** | CDL A/B and P/S/H/N/T endorsements, DOT medical certificate, annual MVR review, Clearinghouse query, ELDT, road test, drug & alcohol program, school-bus permit |
| **Vehicle (units)** | DOT annual inspection, registration, insurance, IFTA, state ambulance permit, NFPA 1911 pump test, aerial and ground-ladder tests, crane/hoist and equipment annual inspections |

**Show inactive** reveals retired types; a type with records can be deactivated but not deleted.

### 2. Settings

**Certifications → Settings.**

![Certification settings](/img/web-app/certifications/settings.png)

| Setting | Meaning |
|---|---|
| **Enforcement mode** | **Off** — requirements are informational (default). **Warn only** — role changes are allowed, warnings are shown and notifications sent. **Enforce** — adding an unqualified member to a role is blocked and members are **removed** from a role after the grace period once a mandatory certification lapses (audited; the member is notified). Switching to Enforce asks you to confirm how many mandatory requirements exist. |
| **Grace period (days)** | Days after a mandatory certification lapses before removal (default 30); each requirement can override it. |
| **Treat records pending verification as valid** | Whether an unverified record satisfies a requirement. |
| **Notify (days before expiry)** | Comma-separated lead days, e.g. `60,30,14,7,1`; one notice per record per listed day. |
| **Notify the holder directly** / **Send department administrators a nightly digest** | Who hears about expiring and expired certifications. Group audiences for the *Certification Expiring / Expired / Role Removed* and *Unit Certification* events are configured under [Notifications](../notifications). |

### 3. Role requirements

**Personnel → Roles → *role* → Required certifications** (or **Certifications → Certification types → Requirements**).

![Role requirements](/img/web-app/certifications/role-requirements.png)

Add one row per certification type: **Mandatory** (blocks or removes under *Enforce*; optional rows only show as *Optional missing*), an **Any-of group** number (rows sharing a number are alternatives — *EMT or AEMT or Paramedic*), **Allow trainee** and a **grace override**. The **Member eligibility** table below shows every member of the role as *Qualified*, *Optional missing* or *Not qualified* with the removal date under Enforce.

## Day to day

### Personal certifications

**Profile → Certifications** (yours) or **Personnel → member → Certifications**: **Add Certification** with the name, **type**, number, valid area, issuing authority, issued and expiry dates and an attachment (PDF, image or office document up to 10 MB). Records typed with a type that *requires verification* wait for sign-off.

![Personal certifications](/img/web-app/certifications/profile-certifications.png)

Open a record for the full **certification record** page: **Verify**, **Renew** (new expiry and optionally a new number — reactivates an expired record), **Suspend / Revoke / Mark trainee / Reinstate** with a reason, and **continuing-education credits** (date, hours, category, description, file) with progress toward the hours the type needs per renewal.

![Certification record](/img/web-app/certifications/record.png)

| Status | Meaning |
|---|---|
| **Active** | Valid; counts toward requirements. |
| **Pending verification** | Entered but not yet signed off. |
| **Trainee** | Working toward the credential; satisfies a requirement only where *Allow trainee* is ticked. |
| **Expired** | Past the expiry date (set nightly by the worker); renew to reactivate. |
| **Suspended / Revoked** | Withdrawn by the department with a reason. |

### Unit certifications and inspections

**Units → unit → Certifications & inspections** (or the dashboard's **Units** scope): registration, insurance, permits, pump and ladder tests and annual inspections with number, issuer, issued/expiry dates, notes and a file. Units can be **suspended** (with a reason) and reinstated; the dashboard flags expiring and expired unit records the same way as people.

![Unit certifications](/img/web-app/certifications/unit.png)

### Dashboard and report

The dashboard cards count **Expired**, **Expiring within N days**, **Suspended or revoked** and **Pending verification**; the grid below is one row per person (or unit) and one column per type, coloured *Valid / Expiring soon / Expired, suspended or revoked*. **Export CSV** downloads the grid. The **Compliance report** (Reports → Certification Compliance) lists role requirements against holders for auditors and accreditation.

![Compliance report](/img/web-app/certifications/compliance-report.png)

## Notifications and workflows

The certification worker runs once a day per department (in the department's time zone): it expires records, sends the lead-day notices, and under *Enforce* removes members whose grace period has ended. [Workflow](../workflows) triggers: **Certification Expiring, Added, Renewed, Expired, Role Removed, Status Changed, Removed, Credit Added** and **Unit Certification Added / Expiring / Expired / Status Changed / Removed**.

## Setup examples

| Organization | Types | Requirements | Enforcement |
|---|---|---|---|
| **Career fire** | FF1/FF2, DO-Pumper/Aerial, Hazmat Ops, FO1, NREMT-EMT + state licence, BLS; units: NFPA 1911 pump test, aerial cert, registration, insurance. | *Firefighter*: FF1 + Hazmat Ops + (EMT or Paramedic any-of group); *Engineer*: DO-Pumper; *Lieutenant*: FO1. | Warn only for a year, then Enforce with 30-day grace. |
| **Volunteer fire** | FF1, Hazmat Awareness/Ops, BLS, DO-Pumper. | *Interior firefighter*: FF1 (allow trainee); *Driver*: DO-Pumper. | Off or Warn only; notify holders 60/30/7 days. |
| **EMS agency** | NREMT-EMT/AEMT/P, state licences, BLS/ACLS/PALS, driver MVR; units: ambulance permit, DOT inspection. | *Paramedic*: NREMT-P **and** state paramedic licence (two mandatory rows), ACLS. | Enforce — an expired licence must not run calls. |
| **SAR team** | SARTECH II, WFR, rope, swiftwater, K9, ICS-100/200. | *Field team member*: SARTECH II or III; *Team leader*: SARTECH I. | Warn only. |
| **Wildland contractor** | NWCG FFT2/FFT1/CRWB/ENGB, RT-130, WCT, Red Card, First Aid. | *Crew member*: FFT2 + RT-130 + WCT; *Crew boss*: CRWB. Rate schedule entries key on the same codes. | Enforce; the deployment wizard flags expiring cards. |
| **Security company** | Guard card, first aid/CPR, use of force, armed endorsement + requalification. | *Security officer*: guard card; *Armed officer*: armed endorsement + requalification. | Enforce; 0-day grace for the guard card. |
| **Industrial ERT** | HAZWOPER 40 + 8-hour refresher, confined space, respirator fit, first aid. | *ERT member*: HAZWOPER (annual refresher) + respirator fit. | Enforce. |
| **Delivery / transit** | CDL-A/B, DOT medical, MVR review, Clearinghouse query, drug & alcohol program; units: DOT inspection, registration, insurance, IFTA. | *Driver*: CDL + DOT medical + D&A program. | Enforce — DOT compliance. |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/Certifications/{Index,DashboardCsv,Types,EditType,AddFromTemplate,Settings,RoleRequirements,Unit,Record}`; POST `SetStatus`, `Verify`, `Renew`, `AddCredit`, `DeleteCredit`, `SaveUnitCertification`, `SetUnitStatus`; `/User/Profile/{Certifications,AddCertification,EditCertification}`; `/User/Reports/CertificationComplianceReport` |
| Model | `DepartmentCertificationType` (code, category, applies-to, validity, verification, credit hours), `PersonnelCertification` (+ status, verification, type), `PersonnelCertificationCredit`, `UnitCertification`, `PersonnelRoleCertificationRequirement`, `DepartmentCertificationSettings`; template catalog `CertificationTypeTemplateCatalog` (93 templates) |
| Permissions | *Manage certifications* (42), *View certifications* (43), *Manage certification setup* (44) — default department administrators; members always see their own records |
| Worker | 34 `CertificationExpiryLogic` — hourly tick, one sweep per department per local day at `CertificationConfig.SweepLocalHour` |
| Notifications | Event types 25–29 (*Certification Expiring / Expired / Role Removed / Unit Certification Expiring / Expired*) through department notifications |
| Workflow triggers | 23, 87–93, 180–184 |
| Data protection | Certification name/number/issuer, unit certification fields, credits and status reasons are ADP-protected (catalog 26/27) when the department is enrolled |
| API | `api/v4/Certifications/*` |
