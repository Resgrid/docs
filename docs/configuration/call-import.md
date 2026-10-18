---
sidebar_position: 4
---

# Call Import

Call Import creates calls in Resgrid from dispatch emails. Your county or regional dispatch center, CAD system, paging service or alerting platform sends its dispatch email to your department's **dispatch import email** address. Resgrid reads each email with the format you choose, creates a call and dispatches it, the same as a call entered by hand. Calls can also come in by text message, set up separately under [Text messaging](text-messaging).

## Why Call Import Matters

Many departments receive dispatch alerts from a county or regional dispatch center via email or pager. Without Call Import, someone would need to enter each call into Resgrid by hand. With it, dispatches flow into Resgrid on their own and trigger notifications, mapping and every other call feature with no manual step.

## Scope

Call Import settings are department-wide. Every email sent to the department's dispatch import email becomes a call for the whole department. Groups and stations can also have their own dispatch addresses; see [Group dispatch addresses](#group-dispatch-addresses).

## How It Works

1. Your department has a **dispatch import email** address, shown at the top of **Call Settings**.
2. Your CAD, paging system or a mail rule sends or forwards dispatch emails to that address. Resgrid does not sign in to or check any other mailbox, so the email has to be sent to this address.
3. Resgrid reads the email with the **Email Type** selected on Call Settings (**Generic** until you choose one).
4. A new call is created from the parsed details (name, nature, address and so on). An address without coordinates is looked up on the map. An `.mp3` or `.amr` attachment is kept as the call's dispatch audio.
5. The call is dispatched to everyone in the department, and members with call notifications on are alerted.
6. A few email types recognise a follow-up email about a call that is still open and update that call instead of creating another. See [Email types](#email-types).

An email the selected type cannot read is ignored: no call is created and the sender is not told. If a call has no nature or name after parsing, Resgrid uses the email's subject or body so the dispatch is not lost.

## Configuring Call Import

Navigate to **Department → Call Settings** (`/User/Department/CallSettings`). Only department administrators can open it.

![Call import settings](/img/web-app/department/call-settings.png)

| Setting | What it does |
|---|---|
| **Dispatch Import Email** | Your department's all-call address. Give it to your dispatch center or set your CAD or mail server to send dispatch emails to it. It cannot be changed on this page. |
| **Prune (Auto Close) Calls** | Closes imported calls automatically after the time below. See [Auto-close imported calls](#auto-close-imported-calls). |
| **Minutes to keep call open** | How long an imported call stays open before it is closed, 0 to 10080 minutes (7 days). Only used when **Prune** is ticked. |
| **Email Type** | The format of the emails you receive. Pick the one matching your dispatch center's email. See [Email types](#email-types). |
| **Call Numbering** | How every new call is numbered, imported or not. See [Call numbering](../web-app/department-settings#call-numbering). |

Press **Update** to save. Saving keeps any other call settings you are not changing.

### Email types

Each type reads a specific email layout. Choose the one that matches what your dispatch center sends; if none does, try **Generic** first.

| Email type | What it expects | Fills in | Updates an open call |
|---|---|---|---|
| **Generic** | Any email. | Name from the subject, nature from the body, both in the notes. Attached dispatch audio. | No |
| **Generic with AI enrichment** | Any email (only offered when your department has Enhanced AI). | The same call as Generic, then queued for AI enrichment. See [below](#generic-with-ai-enrichment). | No |
| **Resgrid** | A body of seven fields separated by `\|`. See [Resgrid format](#resgrid-format). | Incident number, type, priority, address, map page, nature, notes. | No |
| **Generic Page** | A subject containing `page`. | Name from the subject, nature from the subject and body. | No |
| **Connect** | The body's first two lines. | Name from the subject, nature from the first lines. | No |
| **Four Part Pipe** | A body of `\|`-separated parts, with `[LONGLAT:..]` coordinates in the third. | Name, coordinates, nature. | No |
| **Active911** | A subject containing `active` and a plain-text body of `KEY: value` lines (`CALL`, `ADDR1`, `ID`, `MAP`, `NARR` …; any case). | Name, address, incident number, coordinates, nature. | Yes, by incident number (`ID`); an email without an `ID` line always creates a new call |
| **R&R** | A plain-text body with `Address:`, `Call Type:` and `Incident Numbers:` lines. | Name, address, type, priority (matched by name), incident number. | Yes, by incident number |
| **OttawaCounty** | A subject containing `active` and a plain-text body with `CFS#`, `Address`, `CallType` and `Details` lines. | CFS number, address, type (when it matches one of your call types), nature. | No |
| **OttawaKingstonToronto** | A plain-text, one-line-space-separated page with an `ALPHA 512` marker. | Incident number, name, nature. | Yes, by incident number |
| **Parkland Cty** | A subject containing `Parkland County Incident` or `Incident Message`, with `Type:` and `Location:` lines. | Name, address, coordinates. | No |
| **Parkland Cty2** | As Parkland Cty, plus a `Date:` line and a priority letter (E, D, C, B, O or A). | Name, address, coordinates, logged time, priority. Also dispatches every unit. | Yes, a call with the same name and time; raises the priority and dispatches again on a second page |
| **CAL FIRE ECC** | A `;`-separated body starting with `Inc#`. | Incident number, type, address, coordinates, name, nature. | No |
| **CAL FIRE SCU** | A `;`-separated body with `Inc#`, `?q=` coordinates and `Map:` lines. Close notices are ignored. | Type, address, incident number, coordinates, map page, nature. | No |
| **Brockport** | `B:`, `L:`, `T:` and `X:` sections. | Incident number, address, type, name, nature. | No |
| **Hancock Cty** | A `,`-separated body: `(code), type, address or coordinates, // nature`. | Incident number, type, address, coordinates, nature. | No |
| **Carencro** | A subject containing `300` and `ALERT`. | Name from the subject, nature from the subject and body. | No |
| **Grand Blanc** | A subject containing `Page Received`. | Name from the subject, nature from the subject and body. | No |
| **Union Fire** | A subject containing `Perform Page`, with the address on the body's second and third lines. | Name, address, nature. | No |
| **Lowestoft** | A `,`-separated body: priority, nature, place, then any instructions, such as `3, Persons in water, Southwold, Muster at CRE`. | Priority (one of your priorities by name or number, else your default), nature, address (`, United Kingdom` is added when missing). | No |
| **Spotted Dog** | Any email with a subject. | Address from the subject, nature from the body. | No |
| **PortJervis** | Any email. A `La = … Lo = …` line becomes the call's coordinates. | Nature, coordinates. | No |
| **Yellowhead** | A `/`-separated body: name in the third part, address in the fourth. | Name, address. | No |

"Updates an open call" means a later email about the same incident changes the call that is already open (among the department's ten most recent open calls) instead of creating another. Every other type creates a new call for each email.

**Priority when the email names none.** A call gets your department's default call priority. With custom call priorities and none marked as the default, it gets your priority whose **Meaning** is *High* (see [Types](../web-app/types-configuration#classes-and-meanings)); with neither, it gets the built-in High priority. Text message and voice imports use the same rule.

:::tip Choosing a Format
If your dispatch provider is not listed, try **Generic** first: it accepts any email. If you control the email your system sends, use the **Resgrid** format for the most complete calls. If neither produces usable calls, contact Resgrid support to request a format for your dispatch system.
:::

### Resgrid format

Use this format when you can control the email your CAD or alerting system sends. The body is seven values separated by the pipe (`|`) character:

```
ID | TYPE | PRIORITY | ADDRESS | MAPPAGE | NATURE | NOTES
```

| Value | Meaning |
|---|---|
| **ID** | The incident number from your CAD. Can be empty or `0000`. |
| **TYPE** | The incident type, such as `MEDICAL` or `FIRE`. When it matches one of your [call types](types), case aside, the call is tagged with that type; other text is kept as sent. Can be empty. |
| **PRIORITY** | With custom call priorities, the priority's name, such as `Structure Fire` (case does not matter). With the built-in priorities, the name or number: Low = 0, Medium = 1, High = 2, Emergency = 3. Anything else uses your department's default priority. Can be empty. |
| **ADDRESS** | The full address (street, city, state, zip). Required. |
| **MAPPAGE** | Your map book page. Can be empty. |
| **NATURE** | Why the call exists, such as `Fully involved 2 story residential structure`. Required. |
| **NOTES** | Anything else. Can be empty. |

Leave a value empty with a space between the pipes:

```
| MEDICAL | 3 | 155 Main St. Carson City, NV 89701 |  | 55 Y/O Male, Chest Pain, Diaphoretic, Conscious and abnormal breathing |
```

If fewer than six values arrive, the call is still created from the whole body, with a warning in its notes. Every Resgrid-format email creates a new call.

### Generic with AI enrichment

Departments with the Enhanced AI add-on see this extra type and an **AI Dispatch settings** link under the list. The call is created exactly as with **Generic**, so dispatch is never delayed. The new call is then queued for AI enrichment, which can fill in details from the email according to your AI Dispatch settings. Follow-up emails are not enriched. A department that loses Enhanced AI keeps importing, because the call is built the same way as Generic.

### Auto-close imported calls

With **Prune (Auto Close) Calls** ticked, an open call that came in by email, text message or audio import is closed once it has been open longer than **Minutes to keep call open**. Calls entered by hand are never closed this way.

- The check runs every hour, so a call can stay open up to an hour past its time.
- The closed call gets the note *Call automatically closed by the system.* and is recorded as closed by the department's managing user.
- Leave **Prune** unticked if your members close imported calls themselves.

## Group dispatch addresses

Each group or station can have its own **dispatch email** and **message email**, set on the group (see [Groups & stations](../web-app/groups-stations)):

- Email to a group's **dispatch email** creates a call dispatched only to that group and its sub-groups. It is read with the department's **Email Type**, the same way as the department address, and a follow-up email updates an open call for the types that do so.
- Email to a group's **message email** sends a message, not a call, to that group and its sub-groups.

## Mailbox (POP3) monitoring

Resgrid does not sign in to an outside mailbox to collect dispatch emails. If your dispatch emails arrive in a mailbox you own, set a forwarding rule in that mailbox to send them to your dispatch import email. A mailbox your department configured with Resgrid in the past is kept on record but is not checked.

## How Imported Calls Are Used

Once a call is imported, it behaves like a call entered by hand:

- It appears on the dispatch dashboard and maps.
- Notifications are sent to dispatched personnel.
- It gets the next call number from your department's [call numbering](../web-app/department-settings#call-numbering).
- It can be updated, closed or deleted like any other call, and closes on its own if auto-close is on.
- It shows up in reports and logs.

## Common Errors and Resolutions

| Problem | Resolution |
|---|---|
| No calls are created | Check that the email is sent (or forwarded) to the exact dispatch import email shown on Call Settings, not to another mailbox. Then check the **Email Type**: an email the selected type cannot read is ignored. Switch to **Generic** to confirm emails are arriving. |
| Calls are created with missing or wrong details | Select the email type that matches your dispatch emails. For an address without coordinates, check that the address is complete enough to find on the map. |
| Every page creates a new call (duplicates) | Most email types create a call for each email. If your CAD sends updates, use a type that updates an open call (Active911, R&R, OttawaKingstonToronto, Parkland Cty2), or have your CAD send only the first page. **Prune (Auto Close) Calls** closes the extra calls after the set time. |
| Imported calls stay open | Tick **Prune (Auto Close) Calls** and set **Minutes to keep call open**. Calls close within an hour after that time. |
| The priority or type is not set | For the Resgrid format, send the name of one of your call priorities and call types. A priority number (0 to 3) only works with the built-in priorities. |
