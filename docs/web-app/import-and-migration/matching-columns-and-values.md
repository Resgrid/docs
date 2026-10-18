---
sidebar_position: 5
title: Matching Columns & Values
---

# Matching Columns and Values

**Department menu → Import & Migration → (workspace) → Files & data sets → Open**

Every file other than the Resgrid starter workbook needs two kinds of matching before it can be imported. **Columns**: which column of your file fills which Resgrid field — *Cell* in your file is *Mobile phone* in Resgrid. **Values**: how the codes and names in your file map to Resgrid options and records — *ENG* is the unit type *Engine*, *Stn 1* is *Station 1*. Resgrid proposes both; you confirm or change them. Every change re-checks the file in the background.

:::note Preview feature
Import & Migration is a **Preview** feature: it is off by default and Resgrid turns it on per department while it is being rolled out.
:::

<a id="where"></a>
## Where to find it

Open a data set from the **Files & data sets** tab, from its card on the **Overview** tab (*Match columns*), or from the **Next step** card. The data set page has:

| Panel | Contents |
|---|---|
| **Match columns** | One row per column of your file — see [below](#match-columns). |
| **Match values** | A link per field whose values must match a Resgrid option or record — see [Matching values](#match-values). |
| **Destination** | The data set's status and counts (*rows · ready · warnings · blocked*), **What does this file contain?** with a description of the chosen kind of data, and **Confirm** / **Change**. |
| **Saved matches** | **Use saved matches** and **Save these matches as** — see [Saved matches](#saved-maps). |
| **Issues** | The data set's top issues and **Fix issues**. |

Once a data set is being imported (or has been), its matches are locked.

<a id="enable"></a>
## Turning it on

Part of Import & Migration: the `Onboarding.MigrationWizard` flag on for your department and a department administrator signed in. See [Overview → Turning it on](overview#enable).

<a id="destination"></a>
## Confirm what the file contains

Resgrid proposes a destination from the column headers (see [From files to data sets](uploading-and-checks#data-sets)). While it is not confirmed, the Data sets table shows an *N% sure* chip and, below 85%, a blocking issue *We're not sure what this file contains*. Pick the right kind of data under **What does this file contain?** and select **Confirm** (or **Change** after it has been confirmed). Changing the destination proposes a fresh set of column matches for it.

<a id="glossary"></a>
## Glossary

When you have told Resgrid which products you are moving from ([Where your data comes from](uploading-and-checks#products)), a **Glossary** panel on the data set page (and, closed, on the Files and Configure tabs) lists each product's words next to what Resgrid calls that kind of record — for example, from Aladtec:

| In Aladtec | In Resgrid |
|---|---|
| Members | People *(Suggested name)* |
| Work groups | Stations and groups |
| Positions | Roles |
| Qualifications | Certification types |
| Schedules | Shifts (not imported) |
| Payroll | Not imported |

A word that lands in a data set names it as **What does this file contain?** does, so you can pick the right destination. *(not imported)* means Resgrid has that feature but an import doesn't fill it; **Not imported** means Resgrid keeps no such record. Features are named as your department names them. **Suggested name** marks a word that the [Configure tab](configure#suggestions) offers as your name for the feature. Words are shown in your language when the product has them (DIVERA 24/7 in German, for example), otherwise as the product shows them.

<a id="match-columns"></a>
## Matching columns

| Column | What it shows |
|---|---|
| **Column in your file** | The header, with a confidence chip for the proposed match; matches below 80% are highlighted as uncertain. |
| **What we found** | The value type Resgrid sees (Text, Whole number, Date, Email, Phone …), how full the column is (*N% filled*) and up to three example values. Columns with emails, phone numbers or many different names show **Values hidden** instead of examples; columns that look like passwords, ID numbers, card numbers or other [never-imported data](before-you-start#not-imported) show **Never imported (sensitive data)** and are dropped whatever you choose. |
| **Resgrid field** | **Don't import**, any field of the destination (required fields end in `*`), or **Keep as a custom field** for people and units. |
| **Clean-up** | Optional transforms applied to every value of the column before it is checked — see [Clean-up transforms](#transforms). |
| **How dates are written** | Shown when the column goes to a date field — see [Dates](#dates). |

Under each column, **Also use for another field** adds a second row for the same column, so one column can fill two fields — see [One column, two fields](#split). **Remove** takes such a row away again.

Select **Save matches** when you are done: *Saved. We're checking the file again.* The matches, the date answers and the [same value for every row](#same-value) are saved together.

How the proposal works: each header is compared with the field names and the other names each field is known by (*e-mail*, *mail* and *email address* all mean the person's email; the known names are listed on each [field reference](people) page). An exact match is 100%; a header that contains a known name scores between 60% and 90%; anything weaker is left as *Don't import*. Each field is proposed for one column only.

Rules the checks enforce:

- Every **required** field (marked `*`) needs a column or a [same value for every row](#same-value) — otherwise *A required field has no column*.
- A field can be filled by **one column** only — otherwise *Two columns are matched to the same field*. One column can fill several fields, though ([below](#split)).
- Match the column holding the old system's record ID to **Source ID**. Other files can then refer to these rows by it, and re-uploading a corrected file in the same workspace — or in a workspace that [continues this import](uploading-and-checks#continue) — recognizes the rows already imported.
- Columns left as **Don't import** are not imported.

<a id="transforms"></a>
## Clean-up transforms

Choose up to five per column; they run in the order listed.

| Transform | Turns | Into |
|---|---|---|
| **Trim spaces** | `  Engine 1 ` | `Engine 1` |
| **Collapse spaces** | `Engine   1` | `Engine 1` |
| **UPPER CASE** | `e1` | `E1` |
| **lower case** | `ALEX@EXAMPLE.ORG` | `alex@example.org` |
| **Title Case** | `STATION ONE` | `Station One` |
| **Digits only** | `(555) 123-4567` | `5551234567` |
| **First name from full name** | `Rivera, Alex` or `Alex Rivera` | `Alex` |
| **Last name from full name** | `Rivera, Alex` or `Alex Rivera` | `Rivera` |
| **First word** | `Engine 1 Reserve` | `Engine` |
| **Last word** | `Engine 1 Reserve` | `Reserve` |

<a id="split"></a>
## One column, two fields

To split a single *Name* column into first and last names, match the column to **First name** with *First name from full name*, select **Also use for another field** under it, and match the new row (*Same column, another field*) to **Last name** with *Last name from full name*. Each use has its own clean-ups. The same works for any column that holds two things, for example the first word of *Engine 1 Reserve* as one field and the last word as another.

<a id="dates"></a>
## Dates

A date such as `03/04/2026` can be read two ways. For a column that goes to a date field, **How dates are written** answers it once for the whole column, showing one of the column's own values both ways:

| Choice | Reads `03/04/2026` as |
|---|---|
| **Work it out from the values** (default) | Only dates that settle it themselves (`13/04/2026`, `2026-04-03`); the rest raise *N dates could be read two ways*. |
| **Day first** | 3 April 2026 |
| **Month first** | 4 March 2026 |
| **Year first** | Dates written `2026-04-03` |

The answer is about order, not punctuation: `03.04.2026` and `03-04-2026` are read the same way as `03/04/2026`. Dates written `2026-04-03`, and date cells in Excel, are always read correctly. You can also answer from the issue itself on the [Issues tab](fixing-issues#imp-type-date-ambiguous).

<a id="same-value"></a>
## Same value for every row

**Same value for every row** lists the fields no column fills, with any value you already set. A value there fills that field in every row — for example the same **Station or group** for everyone in a roster that has no station column — and also fills rows whose column for that field is empty. Choice fields offer their options; other fields show an example of what they accept, and a value the field cannot hold is refused when you save (*That value doesn't fit this field*). **Source ID** and fields that must be unique, such as a person's email, cannot share one value. A required field with no column can also be given its value from the issue on the Issues tab.

<a id="custom-fields"></a>
## Keep as a custom field

For **people** and **units**, a column with no matching Resgrid field — badge colour, locker number, radio ID — can be kept as a [custom field](../user-defined-fields). Its values go into the custom field whose label matches the column header (ignoring case, spaces and punctuation).

- **If your department has no custom fields yet** for that kind of record, the import creates them: one text field per kept column, labelled with the column header and **visible to department administrators only**. You can change the fields afterwards on the User Defined Fields screen.
- **If your department already has custom fields** for that kind of record, the import does **not** change them — publishing a new set would hide every value saved against the current one. Instead the data set shows *Add these custom fields first: …* with the missing labels. Add fields with exactly those labels on **Department menu → User Defined Fields**, then select **Save matches** again so the file is checked again.

<a id="saved-maps"></a>
## Saved matches

Column matches can be saved for the next file with the same layout — next month's export, or a sister station's roster.

- **Save these matches as** stores the current matches under a name for this kind of data. Saving again with the same name keeps the old version and adds a new one.
- **Use saved matches** lists the saved matches for this kind of data; **Apply** fills in the matches by column header and checks the file again.

Saved matches belong to your department, not to a workspace, and are kept while your department exists. They hold column names and choices only — never values from your files.

<a id="match-values"></a>
## Matching values

Fields that must match something in Resgrid are listed under **Match values** on the data set page:

- **Choice fields** must be one of the field's options — a station's *Type* is `station` or `organizational`, a status set's *Set type* is `personnel`, `unit` or `staffing`. Values equal to an option's code or one of its known names (listed on the field reference pages) are matched automatically.
- **Reference fields** point at another record — a person's *Station or group*, a unit's *Type*, a certification's *Person*. A reference is found automatically when it names a row in another file of the same workspace (by its Source ID, or by its name, code or email) or a record already in Resgrid (by name; a person by email), ignoring case, accents, spaces and punctuation.

Open a field to see every distinct value in the file (the 500 most frequent), how many rows use it, Resgrid's **Suggestion** with a confidence chip, and **Your choice**:

| Choice | Effect | Offered for |
|---|---|---|
| *an option* / *an existing record* | Use it for every row with this value. | Choices; references (when Resgrid found a record with the same name) |
| **Create new** | Create a record with this name during the import; every row with the value shares the one new record. | References to stations and groups, roles, certification types, unit types and point of interest types |
| **Keep as text** | Import the rows without linking them to a record. | References |
| **Leave empty** | Import the rows with this field empty. | Choices and references |
| *Not decided* | Leave it to the automatic match — rows that still match nothing get an issue. | Both |

The bar **For all rows:** applies **Accept the suggestions**, **Create new for all** (references) or **Leave empty for all** at once. Select **Save choices**: *Saved. We're checking the file again.* Your choices are saved with this data set and count as part of what you approve.

Choice suggestions are 100% when a value equals an option's code or known name and 60% when it is the start of one (`stat` → `station`). Reference suggestions are existing Resgrid records with the same name; rows in your other files do not need a decision because they are matched automatically.

<a id="value-formats"></a>
## How values are read

| Type | Accepted |
|---|---|
| **Text** | Trimmed. Longer than the field allows: a warning — the text is shortened if you accept it. |
| **Whole number** | Digits with an optional sign; spaces are ignored and `12.0` counts as `12`. Checked against the field's range. |
| **Number** | A point or a single comma as the decimal separator. |
| **Yes/No** | Yes: `yes`, `y`, `true`, `t`, `1`, `x`, `on`, `active`, `enabled` (also `ja`, `oui`, `si`, `sí`, `sì`, `tak`, `так`, `ναι`, `نعم`). No: `no`, `n`, `false`, `f`, `0`, `off`, `inactive`, `disabled`, `-` (also `nein`, `non`, `nie`, `nej`, `ні`, `όχι`, `لا`). Empty means not set. |
| **Date** | `2026-03-04` or `2026/03/04`; Excel date cells; named months (`4 Mar 2026`, `March 4, 2026`, `4-Mar-26`). `04/03/2026`-style dates are accepted only when the value itself shows the order (a part above 12) — otherwise *dates could be read two ways*. |
| **Date and time** | A date as above plus `14:30`; with a `Z` or an offset it is taken as given, otherwise in your department's time zone. |
| **Email** | Lower-cased; `mailto:` and angle brackets are removed. |
| **Phone** | Stored in international format. A number without a country code is read with your department's country. |
| **Choice** | An option's code or a known name, or your value match. |
| **Reference** | See [Matching values](#match-values). |
| **Latitude / Longitude** | Decimal degrees (a comma also works as the decimal point), up to ±90 and ±180. |
| **Colour** | Hex, with or without `#`: `#d32f2f`, `d32f2f`, `#d33`. |
| **Time zone** | A Windows name (`Central Standard Time`) or an IANA name (`America/Chicago`). Empty uses the department's. |
| **Language** | `en`, `es`, `sv`, `de`, `fr`, `it`, `pl`, `uk`, `ar`, `el` — regional forms such as `en-US` are accepted. Empty uses the department's. |
| **List** | Values separated by `;` (or by commas when there are no semicolons); duplicates are dropped. |

A value that cannot be read blocks its row when the field is required; otherwise it is a warning and the value is left empty if you accept it. See [Fixing issues](fixing-issues).
