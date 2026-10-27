---
sidebar_position: 1
---

# Setup

New departments are set up with **Admin Assist**, which opens on its **Setup Wizard**: a nine-step journey from your goals and department profile through people, dispatch and your other modules to verification and handover. The wizard does not save settings itself. Each step links to the normal screen for each feature (Department Settings, Personnel, Units, Call Settings and so on); you make the change there, return to setup and verify it in the **Setup Report**. You can pause and resume at any time.

**Department menu → Admin Assist.** Only department administrators see it, and only when setup is enabled for your Resgrid installation. An unfinished setup also shows a prompt on the dashboard. The full guide to every tab, step and check is [Help & Setup](../web-app/help-setup).

<AcademyVideo id="01-setup-wizard" />

## Why Setup Matters

Proper initial setup is critical because many other features in Resgrid depend on your department's core settings. For example, your department address is used as the default map center, your time zone affects all scheduling and status timestamps, and your department name appears across all communications and reports. Skipping or misconfiguring setup can lead to incorrect time displays, mapping issues, and confusion for your personnel.

## Running the Setup Wizard

Open **Admin Assist** from the top of the Department menu, or choose **Start or resume setup** on the dashboard prompt. In step 1 choose how you are starting. The choice records your intent; it does not import or overwrite data.

| Setup mode | Use it when |
| --- | --- |
| Fresh setup | The department is new to Resgrid |
| Review existing setup | The department already runs on Resgrid and you want to check or extend its setup |
| Import or migration | You are moving from another system. Import planning does not copy data: use the existing import tools, then verify the result in Setup Report |

The nine steps are **Welcome and goals**, **Department profile**, **Choose your modules**, **People and access**, **Dispatch essentials**, **Your other modules**, **Plan and add-ons**, **Verify and practice** and **Review and hand over**. See [the nine-step journey](../web-app/help-setup#setup-journey) for what each one covers.

### Department information

Step 2 (**Department profile**) asks you to confirm your core department details. They are set on [Department Settings](department-settings.md) (**Department menu → Department Settings**).

| Field              | Required | Description                                                        |
| ------------------ | -------- | ------------------------------------------------------------------ |
| Department Name    | Yes      | The name of your department as it will appear across the system    |
| Time Zone          | Yes      | Your department's operating time zone                              |
| Use 24-Hour Time   | No       | Toggle between 12-hour (AM/PM) and 24-hour time display           |
| Managing User      | Yes      | The account owner: the only person who can change billing, purchase add-ons or delete the department |

:::tip Department Name
Choose your department name carefully as it appears in all notifications, emails, and reports sent from the system. You can change it later in Department Settings if needed.
:::

### Department address

The department address, also on Department Settings, establishes the geographic center for mapping and dispatch operations.

| Field          | Required | Description                                    |
| -------------- | -------- | ---------------------------------------------- |
| Street Address | Yes      | Street address of your department headquarters |
| City           | Yes      | City name                                      |
| State/Province | Yes      | State or province                              |
| Postal Code    | No       | ZIP or postal code                             |
| Country        | Yes      | Country                                        |

:::warning Address Accuracy
Ensure your department address is accurate. Unless you set **Default map centre GPS coordinates** on Department Settings, this address is used as the default center point for maps throughout the system including the Big Board, Dispatch Map, and Mapping modules. An incorrect address will cause maps to center on the wrong location.
:::

### Operating profile and modules

Also in step 2, the **Department operating profile** records your operating packs (fire, EMS, mental health, SAR, emergency response, Hazmat, industrial, security, mutual aid), workforce mix, dispatch model, operating hours, languages and links to your approved local policies. The packs suggest modules to review; they do not change your choices or set staffing, qualification or clinical requirements. In step 3 you mark each module **Use now**, **Learn later** or **Not applicable** (with a reason); security always applies. See [Department operating profile](../web-app/help-setup#operating-profile) and [Choose the modules your department uses](../web-app/help-setup#choose-areas).

## Moving from another system

If your department already has its people, stations and apparatus in spreadsheets or in another product, choose **Import or migration** in the first step of the Setup Wizard (see [Setup Wizard, Setup Report and Admin Assist](../web-app/help-setup#start-setup)). It offers **Open Import & Migration**, where you upload your files or the Resgrid starter workbook, check and fix every row, and approve the import; nothing is saved until you approve it, and imported people receive nothing until you invite them. The button appears for department administrators when Import & Migration is turned on for the department. See [Import & Migration](../web-app/import-and-migration/overview).

## Checking Your Setup

The **Setup Report** tab lists verified checks, checks needing attention and checks with unknown evidence for the modules you use, with a link to the screen that fixes each one. After saving on that screen, use **Return to setup and verify**, then **Verify again**. Missing or unavailable evidence is shown as unknown, never as a pass. Setup Report replaces the old numerical setup score; it is administrative guidance, not a certification of operational readiness. See [Configure and verify](../web-app/help-setup#configure-and-verify).

## After Setup

Steps 4 to 6 of the wizard link to these screens. The configuration guides cover each in detail, in a sensible order:

1. **[Stations and Groups](stations-groups.md)** — Create your organizational structure
2. **[Adding Personnel](adding-personnel.md)** — Invite and add your team members
3. **[Adding Units](adding-units.md)** — Configure your apparatus and teams
4. **[Department Settings](department-settings.md)** — Fine-tune department-wide settings
5. **[Custom Statuses](custom-statuses.md)** — Set up your status and staffing options
6. **[Types](types.md)** — Define call types, unit types, and other categories
7. **[Call Import](call-import.md)** — Have your CAD or dispatch center's emails create calls

When everything is set up, mark the Setup Report reviewed in step 9 and, if you want, choose a date to review it again.

Stations and groups, personnel and their certifications, units, statuses and types (call types, call priorities, unit types, roles, certification types and point of interest types) can also be set up in bulk from a spreadsheet with [Import & Migration](../web-app/import-and-migration/overview). Department settings, module choices and call import are not imported from a file.

## Clearing the Department Cache

If you experience stale data or settings not appearing to take effect after setup, use **Force Department Update** on the Department Settings page. This clears your department's cached data so it is reloaded from the database and can resolve display inconsistencies. The request can take up to 15 minutes to process, and some operations may be slower while the cache rebuilds.

## Common Issues

| Issue                              | Resolution                                                                              |
| ---------------------------------- | --------------------------------------------------------------------------------------- |
| Maps centered on wrong location    | Update your department address, or the default map centre coordinates, in Department Settings |
| Times showing in wrong time zone   | Update Time Zone in Department Settings                                                 |
| Admin Assist not in the Department menu | Only department administrators see it, and only when setup is enabled for your installation. Every setting remains available from its own screen in the Department menu |
| Setup prompt gone from the dashboard | Dismissing it hides it for your account only; open **Department menu → Admin Assist** to resume |
| A check shows as unknown           | The evidence was missing, restricted or unavailable. Fix the source on its own screen, then choose **Verify again** |
| Settings not taking effect         | Use **Force Department Update** on Department Settings and have users log out and back in |
