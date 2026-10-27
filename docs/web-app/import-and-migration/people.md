---
sidebar_position: 11
title: People Field Reference
sidebar_label: "Reference: People"
---

# People — Field Reference

**Department menu → Import & Migration → (workspace) → Files & data sets**

The **People** data set brings in your members: names, email, phone numbers, station or group, roles and department-only details such as an ID number or home address. Every imported person is created **dormant** — they cannot sign in and receive nothing until you [invite them](verify-and-activate#invite-people). Because email addresses are unique across all of Resgrid, people are matched by email and some rows become *invitations to join* rather than new members; the rules are [below](#people-matching).

:::note Preview feature
Import & Migration is a **Preview** feature: it is off by default and Resgrid turns it on per department while it is being rolled out.
:::

<a id="where"></a>
## Where to find it

Fill in the **People** sheet of the [starter workbook](starter-workbook) or `resgrid-personnel.csv`, or upload your own roster and match it to *People* on the [matching](matching-columns-and-values) page. People refer to [stations and groups](stations-and-groups) and [roles](roles-and-certifications#sheet-roles), so import those first or in the same import.

<a id="enable"></a>
## Turning it on

Part of Import & Migration: the `Onboarding.MigrationWizard` flag on for your department and a department administrator signed in. New people use seats on your plan. See [Overview → Turning it on](overview#enable).

<a id="sheet-personnel"></a>
## People sheet

<!-- BEGIN GENERATED: contract personnel -->

Your members: names, contact details, station or group, roles and department-only details. Imported people cannot sign in and receive nothing until you invite them.

Starter workbook sheet **People**; CSV template `resgrid-personnel.csv`; imported after [Stations and groups](stations-and-groups#sheet-groups), [Roles](roles-and-certifications#sheet-roles); extra columns can be kept as custom fields.

| Column header | Field key | Type | Required | Notes |
|---|---|---|---|---|
| `Source ID [source_id]` | `source_id` | Text |  | The person's id in the system you are leaving. Lets later files refer to this row and makes a re-import update it instead of adding it twice. Up to 256 characters. Must be unique in the file. Example: `1042`. Headers recognized: id, source id, external id, record id, key. |
| `First name [first_name]` | `first_name` | Text | Yes | The person's first name. Up to 100 characters. Example: `Alex`. Headers recognized: first name, firstname, given name, first. |
| `Last name [last_name]` | `last_name` | Text | Yes | The person's last name. Up to 100 characters. Example: `Rivera`. Headers recognized: last name, lastname, surname, family name, last. |
| `Email [email]` | `email` | Email | Yes | The person's email address. Every Resgrid member needs one; it is how they are invited and sign in. Must be unique in the file. Example: `alex.rivera@example.org`. Headers recognized: email, e-mail, email address, mail. |
| `Mobile phone [mobile_phone]` | `mobile_phone` | Phone |  | The number Resgrid texts and calls for dispatches. Include the country code, for example +1 555 123 4567. Example: `+1 555 123 4567`. Headers recognized: mobile, cell, mobile phone, cell phone, mobile number, phone. |
| `Home phone [home_phone]` | `home_phone` | Phone |  | A second number Resgrid can call. Example: `+1 555 765 4321`. Headers recognized: home phone, home, home number, landline. |
| `Station or group [group]` | `group` | Reference |  | The station or group the person belongs to, by its source ID or its name. A person belongs to one group. Refers to [Stations and groups](stations-and-groups#sheet-groups). Example: `Station 1`. Headers recognized: group, station, company, assigned station, home station. |
| `Group administrator [group_admin]` | `group_admin` | Yes/No |  | Yes when the person manages their station or group. Example: `no`. Headers recognized: group admin, group administrator, station officer. |
| `Roles [roles]` | `roles` | List of reference |  | The person's roles, separated by semicolons, by name or source ID. Separate values with `;`. Refers to [Roles](roles-and-certifications#sheet-roles). Example: `Engineer; EMT`. Headers recognized: roles, role, positions, qualifications. |
| `Department administrator [will_be_admin]` | `will_be_admin` | Yes/No |  | Yes when the person should become a department administrator. It is applied only when you activate them, after you confirm it. Example: `no`. Headers recognized: admin, administrator, department admin, is admin. |
| `ID number [identification_number]` | `identification_number` | Text |  | The department-issued member or badge number. Up to 100 characters. Department-only; protected by Advanced Data Protection when your department uses it. Example: `E-1042`. Headers recognized: id number, badge, badge number, employee number, member number, employee id. |
| `Time zone [time_zone]` | `time_zone` | Time zone |  | The person's time zone. Left empty, the department's is used. Example: `Central Standard Time`. Headers recognized: time zone, timezone, tz. |
| `Language [language]` | `language` | Language |  | The language Resgrid uses for the person, such as en, es or fr. Left empty, the department's is used. Example: `en`. Headers recognized: language, locale, preferred language. |
| `Notes [notes]` | `notes` | Text |  | Department-only notes about the person. Up to 4000 characters. Department-only; protected by Advanced Data Protection when your department uses it. Example: `Prefers night shifts`. Headers recognized: notes, comments, remarks. |
| `Home street address [home_street]` | `home_street` | Text |  | The person's home street and number, kept as department-only data. Up to 500 characters. Department-only; protected by Advanced Data Protection when your department uses it. Example: `15 Oak Ave`. Headers recognized: home address, street, address. |
| `Home city [home_city]` | `home_city` | Text |  | The person's home city. Up to 150 characters. Department-only; protected by Advanced Data Protection when your department uses it. Example: `Springfield`. Headers recognized: home city, city. |
| `Home state or region [home_state]` | `home_state` | Text |  | The person's home state, province or region. Up to 100 characters. Department-only; protected by Advanced Data Protection when your department uses it. Example: `IL`. Headers recognized: home state, state. |
| `Home postal code [home_postal_code]` | `home_postal_code` | Text |  | The person's home postal or ZIP code. Up to 32 characters. Department-only; protected by Advanced Data Protection when your department uses it. Example: `62704`. Headers recognized: home zip, zip, postal code. |
| `Home country [home_country]` | `home_country` | Text |  | The person's home country. Up to 100 characters. Department-only; protected by Advanced Data Protection when your department uses it. Example: `United States`. Headers recognized: home country, country. |
| `Active [active]` | `active` | Yes/No |  | No for former or inactive members: they are imported disabled and hidden, and never invited. Example: `yes`. Headers recognized: active, status, is active, enabled. |

*Contract `personnel` version 2026.11.1, generated from the import catalog.*

<!-- END GENERATED: contract personnel -->

<a id="sheet-emergency-contacts"></a>
## Emergency contacts sheet

<!-- BEGIN GENERATED: contract emergency-contacts -->

Who to call for each person in an emergency. Every value except the order and the primary flag is protected when your department uses Advanced Data Protection, and Resgrid staff never see them.

Starter workbook sheet **Emergency contacts**; CSV template `resgrid-emergency-contacts.csv`; imported after [People](#sheet-personnel).

| Column header | Field key | Type | Required | Notes |
|---|---|---|---|---|
| `Source ID [source_id]` | `source_id` | Text |  | The contact's id in the system you are leaving. A re-import of the same contact (same workspace, or an import that continues it) is recognized by it instead of adding the contact again. Up to 256 characters. Must be unique in the file. Example: `1042`. Headers recognized: id, source id, external id, record id, key. |
| `Person [person]` | `person` | Reference | Yes | Whose contact this is, by the person's source ID or email. Refers to [People](#sheet-personnel). Example: `alex.rivera@example.org`. Headers recognized: person, member, member email, employee, employee email, staff. |
| `Contact name [name]` | `name` | Text | Yes | The full name of the person to call. Up to 200 characters. Department-only; protected by Advanced Data Protection when your department uses it. Example: `Jordan Rivera`. Headers recognized: contact name, emergency contact, emergency contact name, next of kin, contact. |
| `Relationship [relationship]` | `relationship` | Text |  | How the contact is related to the person, such as spouse or parent. Up to 100 characters. Department-only; protected by Advanced Data Protection when your department uses it. Example: `Spouse`. Headers recognized: relationship, relation, relationship to member. |
| `Phone [phone]` | `phone` | Phone |  | The contact's phone number. Include the country code, for example +1 555 987 6543. Department-only; protected by Advanced Data Protection when your department uses it. Example: `+1 555 987 6543`. Headers recognized: contact phone, emergency phone, phone, telephone. |
| `Alternate phone [alternate_phone]` | `alternate_phone` | Phone |  | A second number to try. Department-only; protected by Advanced Data Protection when your department uses it. Example: `+1 555 222 3333`. Headers recognized: alternate phone, other phone, second phone, phone 2. |
| `Contact email [email]` | `email` | Email |  | The contact's email address. Up to 256 characters. Department-only; protected by Advanced Data Protection when your department uses it. Example: `jordan.rivera@example.org`. Headers recognized: contact email, emergency contact email, emergency email. |
| `Notes [notes]` | `notes` | Text |  | Anything that helps reach the contact, such as when to call. Up to 4000 characters. Department-only; protected by Advanced Data Protection when your department uses it. Example: `Call after 6 pm`. Headers recognized: notes, comments, contact notes. |
| `Primary contact [is_primary]` | `is_primary` | Yes/No |  | Yes for the contact to call first. A person has at most one; the last one marked wins. Example: `yes`. Headers recognized: primary, is primary, first contact, primary contact. |
| `Order [sort]` | `sort` | Whole number |  | The contact's position in the person's list; lower comes first. From 0 to 1000. Example: `1`. Headers recognized: order, sort, sort order, priority. |

*Contract `emergency-contacts` version 2026.11.1, generated from the import catalog.*

<!-- END GENERATED: contract emergency-contacts -->

Emergency contacts are never matched by their values: every value except the order and the primary flag is protected, so a row always **adds** a contact. Give contacts a Source ID if you may upload the file again — a re-upload in the same workspace, or in one that [continues this import](uploading-and-checks#continue), then recognizes them. An import never changes an existing contact. A person has at most one primary contact; when several rows mark one, the last row wins. Rolling the import back removes the contacts it added.

<a id="people-matching"></a>
## How people are matched

A row is matched by its **Source ID** when the same workspace — or the import it [continues](uploading-and-checks#continue) — imported it before, otherwise by its **email address** — never by name or phone number. Emails must be unique within the file.

<a id="people-accounts"></a>

| The row's email is … | What happens |
|---|---|
| **New to Resgrid** | A new account is created with **no password** and an unconfirmed email, a user name made from the email, the profile from the row, and a **dormant** membership in your department. No welcome email is sent. The person chooses a password when they accept their invitation. |
| **A current member of your department** (including dormant members) | Matched — *Update or link* in the preview. With *Add only* nothing changes. With *Review updates* only department data changes: station or group, group administrator, roles, ID number, notes and home address. Name, phone numbers, time zone and language belong to the person's own profile and are never changed by an import. |
| **A member removed from your department earlier** | Brought back, if you agree: the preview counts them under *Update or link*, and Review & import asks you to confirm *N people who were removed from your department will come back*. They return like everyone the import adds — not an administrator, unable to sign in or receive anything until you invite them — with the row's station or group, roles and details added where none are set. Each one takes a seat on your plan. Exclude their rows to leave them out; rolling the import back removes them again. |
| **An account that belongs only to other departments** | Never created, linked or changed, and nothing about the other department is shown — the issue only says *N people already have a Resgrid account*. The row becomes **Invite to join**: at activation the person gets an invitation to join your department with their existing account, and becomes a member only when they accept. See [Existing accounts](verify-and-activate#existing-accounts). |
| **Missing or invalid** | Blocking — every member needs a working email address, and Resgrid never invents one. Add the email or exclude the row. |

More rules:

- **Department administrator** = *yes* does not make anyone an administrator during the import. You [confirm each person](verify-and-activate#administrators) on Verify & activate.
- **Active** = *no* imports the person **disabled and hidden** (and dormant). They are never offered for invitation.
- **Roles** a person cannot hold yet because of your [certification requirements](../business-ops/certifications) are retried at the end of the import, after people's certifications have been written — so approve People and People's certifications in the same import.
- **Phone numbers** are stored in international format; numbers without a country code are read with your department's country.
- **Department-only fields** (ID number, notes, home address) are stored as department member data, protected by [Advanced Data Protection](../data-protection) when your department uses it.
- Extra columns can be [kept as custom fields](matching-columns-and-values#custom-fields) on people.
