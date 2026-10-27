---
sidebar_position: 13
title: Roles & Certifications Field Reference
sidebar_label: "Reference: Roles & certifications"
---

# Roles and Certifications — Field Reference

**Department menu → Import & Migration → (workspace) → Files & data sets**

Three data sets cover what people do and what they are qualified for: **Roles** (Engineer, Paramedic, Officer …), **Certification types** (the certifications that exist — Firefighter I, EMT, CPR …) and **People's certifications** (which person holds which certification, with numbers and dates). Roles and certification types come before people; people's certifications come after them.

:::note Preview feature
Import & Migration is a **Preview** feature: it is off by default and Resgrid turns it on per department while it is being rolled out.
:::

<a id="where"></a>
## Where to find it

Fill in the **Roles**, **Certification types** and **People's certifications** sheets of the [starter workbook](starter-workbook) (or `resgrid-roles.csv`, `resgrid-certification-types.csv`, `resgrid-personnel-certifications.csv`), or upload your own lists and match them on the [matching](matching-columns-and-values) page. **Download current data** exports your existing roles and certification types.

After the import, roles are on the [Personnel](../personnel) screen and certifications in [Certifications](../business-ops/certifications) and [Types](../types-configuration#certification-types).

<a id="enable"></a>
## Turning it on

Part of Import & Migration: the `Onboarding.MigrationWizard` flag on for your department and a department administrator signed in. See [Overview → Turning it on](overview#enable).

<a id="sheet-roles"></a>
## Roles sheet

<!-- BEGIN GENERATED: contract roles -->

The roles people fill (Engineer, Paramedic, Officer…).

Starter workbook sheet **Roles**; CSV template `resgrid-roles.csv`.

| Column header | Field key | Type | Required | Notes |
|---|---|---|---|---|
| `Source ID [source_id]` | `source_id` | Text |  | The role's id in the system you are leaving. Lets later files refer to this row and makes a re-import update it instead of adding it twice. Up to 256 characters. Must be unique in the file. Example: `1042`. Headers recognized: id, source id, external id, record id, key. |
| `Name [name]` | `name` | Text | Yes | The role's name. Up to 250 characters. Must be unique in the file. Example: `Engineer`. Headers recognized: name, role, role name, position, rank, title. |
| `Description [description]` | `description` | Text |  | What the role does. Up to 3000 characters. Example: `Drives and pumps the engine`. Headers recognized: description, notes. |

*Contract `roles` version 2026.11.1, generated from the import catalog.*

<!-- END GENERATED: contract roles -->

<a id="sheet-certification-types"></a>
## Certification types sheet

<!-- BEGIN GENERATED: contract certification-types -->

The kinds of certification your people hold (Firefighter I, EMT, CPR…).

Starter workbook sheet **Certification types**; CSV template `resgrid-certification-types.csv`.

| Column header | Field key | Type | Required | Notes |
|---|---|---|---|---|
| `Source ID [source_id]` | `source_id` | Text |  | The certification type's id in the system you are leaving. Lets later files refer to this row and makes a re-import update it instead of adding it twice. Up to 256 characters. Must be unique in the file. Example: `1042`. Headers recognized: id, source id, external id, record id, key. |
| `Name [name]` | `name` | Text | Yes | The certification's name as your people know it. Up to 100 characters. Must be unique in the file. Example: `Firefighter I`. Headers recognized: name, certification, certification name, type, qualification. |
| `Code [code]` | `code` | Text |  | A short code for the certification. Left empty, Resgrid makes one from the name. Up to 50 characters. Must be unique in the file. Example: `FF1`. Headers recognized: code, abbreviation, short name. |
| `Category [category]` | `category` | Choice from a list |  | The group the certification belongs to. Choices: `fire` Fire (also: firefighting); `ems` EMS (also: medical services, emergency medical); `sar` Search and rescue (also: search and rescue, rescue); `wildland` Wildland (also: wildfire); `emergency-management` Emergency management (also: em); `industrial` Industrial; `security` Security; `medical` Medical (also: health); `driver` Driver (also: driving, evoc); `vehicle` Vehicle; `other` Other. Example: `fire`. Headers recognized: category, discipline. |
| `Held by [applies_to]` | `applies_to` | Choice from a list |  | Whether people or units hold this certification. Choices: `person` People (also: people, personnel, member); `unit` Units (also: apparatus, vehicle). Example: `person`. Headers recognized: applies to, scope, held by. |
| `Issuing authority [issuing_authority]` | `issuing_authority` | Text |  | Who issues the certification. Up to 200 characters. Example: `State Fire Academy`. Headers recognized: issuing authority, issuer, issued by, authority. |
| `Valid for (months) [validity_months]` | `validity_months` | Whole number |  | How many months a new certification stays valid. Leave empty when it never expires. From 1 to 600. Example: `24`. Headers recognized: validity, valid months, renewal period, months valid. |
| `Never expires [never_expires]` | `never_expires` | Yes/No |  | Yes when this certification does not expire. Example: `no`. Headers recognized: never expires, no expiry, permanent. |
| `Needs verification [requires_verification]` | `requires_verification` | Yes/No |  | Yes when an administrator must verify a new certification before it counts. Example: `no`. Headers recognized: requires verification, verify. |
| `Description [description]` | `description` | Text |  | Anything people should know about the certification. Up to 2000 characters. Example: `Basic structural firefighting`. Headers recognized: description, notes. |

*Contract `certification-types` version 2026.11.1, generated from the import catalog.*

<!-- END GENERATED: contract certification-types -->

<a id="sheet-personnel-certifications"></a>
## People's certifications sheet

<!-- BEGIN GENERATED: contract personnel-certifications -->

The certifications each person holds, with numbers and dates. Certifications that are already expired are imported as expired without emailing anyone.

Starter workbook sheet **People's certifications**; CSV template `resgrid-personnel-certifications.csv`; imported after [People](people#sheet-personnel), [Certification types](#sheet-certification-types).

| Column header | Field key | Type | Required | Notes |
|---|---|---|---|---|
| `Person [person]` | `person` | Reference | Yes | Who holds the certification, by the person's source ID or email. Refers to [People](people#sheet-personnel). Example: `alex.rivera@example.org`. Headers recognized: person, member, email, employee, name. |
| `Certification [certification_type]` | `certification_type` | Reference | Yes | Which certification, by its name, code or source ID. Refers to [Certification types](#sheet-certification-types). Example: `Firefighter I`. Headers recognized: certification, certification type, qualification, type, course. |
| `Certificate number [number]` | `number` | Text |  | The number on the certificate. Up to 200 characters. Department-only; protected by Advanced Data Protection when your department uses it. Example: `FF-2019-0042`. Headers recognized: number, certificate number, license number, cert number. |
| `Area [area]` | `area` | Text |  | Where the certification is valid (a state or region), when that matters. Up to 200 characters. Department-only. Example: `Illinois`. Headers recognized: area, state, jurisdiction. |
| `Issued by [issued_by]` | `issued_by` | Text |  | Who issued the certificate. Up to 200 characters. Department-only. Example: `State Fire Academy`. Headers recognized: issued by, issuer, authority. |
| `Issued on [issued_on]` | `issued_on` | Date |  | The date the certificate was issued. Example: `2019-05-14`. Headers recognized: issued, issued on, issue date, received, date issued, certified on. |
| `Expires on [expires_on]` | `expires_on` | Date |  | The date the certificate expires. Leave empty when it does not expire. Example: `2027-05-14`. Headers recognized: expires, expires on, expiration, expiration date, expiry, valid until. |

*Contract `personnel-certifications` version 2026.11.1, generated from the import catalog.*

<!-- END GENERATED: contract personnel-certifications -->

<a id="sheet-role-requirements"></a>
## Role requirements sheet

<!-- BEGIN GENERATED: contract role-requirements -->

Which certifications each role requires. A role's other requirements stay as they are. If your department enforces requirements, people lacking one can lose the role at the next nightly check.

Starter workbook sheet **Role requirements**; CSV template `resgrid-role-requirements.csv`; imported after [Roles](#sheet-roles), [Certification types](#sheet-certification-types).

| Column header | Field key | Type | Required | Notes |
|---|---|---|---|---|
| `Role [role]` | `role` | Reference | Yes | Which role, by its name or source ID. Refers to [Roles](#sheet-roles). Example: `Engineer`. Headers recognized: role, position, role name. |
| `Required certification [certification_type]` | `certification_type` | Reference | Yes | Which certification the role requires, by its name, code or source ID. It must be a type people hold. Refers to [Certification types](#sheet-certification-types). Example: `Driver/Operator`. Headers recognized: certification, certification type, required certification, qualification. |
| `Mandatory [mandatory]` | `mandatory` | Yes/No |  | Yes when the role cannot be held without it (the default); no for a recommended certification. Example: `yes`. Headers recognized: mandatory, required, is required. |
| `Any-of group [any_of_group]` | `any_of_group` | Whole number |  | Requirements of one role with the same number are alternatives: holding any one of them is enough. From 1 to 99. Example: `1`. Headers recognized: any of group, group, one of group, alternative group. |
| `Trainee allowed [allow_trainee]` | `allow_trainee` | Yes/No |  | Yes when someone still training for the certification may hold the role. Example: `no`. Headers recognized: allow trainee, trainee allowed, trainee. |
| `Grace days [grace_days]` | `grace_days` | Whole number |  | Days a person keeps the role after the certification lapses, instead of the department's default. From 0 to 3650. Example: `30`. Headers recognized: grace days, grace period, grace. |

*Contract `role-requirements` version 2026.11.1, generated from the import catalog.*

<!-- END GENERATED: contract role-requirements -->

One row is one role and one certification type. A role's other requirements stay as they are; a row for a role and type that already have a requirement is matched to it (and, with *Review updates*, its options are changed). Rows with the same **Any-of group** number for a role are alternatives. The type must be one people hold (*N role requirements use a type meant for units*). If your department enforces role requirements (certification settings, mode *Enforce*), the preview asks you to confirm that people lacking a newly required certification can lose the role at the next nightly check. Rolling the import back removes the requirements it added and puts back the options it changed.

<a id="certifications-matching"></a>
## How rows are matched

| Data set | Matched to existing records by |
|---|---|
| **Roles** | Source ID (same workspace, or the import it [continues](uploading-and-checks#continue)), otherwise **name** — ignoring case, accents, spaces and punctuation. Two existing roles with the same name block the row. |
| **Certification types** | Source ID (same workspace, or the import it [continues](uploading-and-checks#continue)), otherwise **name**. |
| **People's certifications** | **Never** matched to certifications already in Resgrid — the same person can hold two records of one certification. Within a workspace, a row already imported (same person, certification and certificate number) is recognized and not added again; in a different workspace it would be added again, so import each person's certifications once. |

More rules:

- **Person** refers to a person by their Source ID or email — a row in your People file or an existing member. It must point at a person; *Keep as text* is not possible here.
- **Certification** refers to a certification type by its name, code or Source ID. The type must be one that **people** hold — a type for units fails the row (*certifications use a type meant for units*).
- **Expires on** must not be before **Issued on**.
- **Certifications that have already expired** are imported marked *Expired*, and nobody is emailed. **Certifications expiring soon** get no reminders while the holder is dormant. Both are [statements you confirm](review-and-import#l8-consequences) before approving.
- A person's **roles** that require certifications are retried at the end of the import, after the certifications are written — approve People and People's certifications in the same import so [certification requirements](../business-ops/certifications) do not leave those roles out.
- **Certificate number** is protected by [Advanced Data Protection](../data-protection) when your department uses it. **Area** and **Issued by** are not: they describe the qualification, and qualification-based dispatch reads them.
- On the [value matching](matching-columns-and-values#match-values) page, unknown roles and certification types can be **created new** with just their name.
