---
sidebar_position: 5
---

# Custom Statuses and Staffing

Custom Statuses and Staffing allow you have your own actions for personnel and units to perform when using the apps. For example if you didn't want the Default Resgrid statuses for Personnel (i.e. Responding, Not Responding, On Scene, etc) you could create a custom Personnel Status set with your own options (Yes, No, Coming, Not Coming, etc).

You can have Custom Statuses for Personnel Actions (Statuses), Personal Staffing Levels and for each Unit Type defined in the system.

<AcademyVideo id="03-custom-statuses" />

## Default Statuses and Staffing Levels
Resgrid default custom Statuses and Staffings are as follows

### Default Personnel Statuses

Statuses are actions your personnel are currently or about to take. Or their current status (for example standing by).

| Status Name          | Description                                               |
| -------------------- | --------------------------------------------------------- |
| Responding           | You are responding (going to) a call or station           |
| Not Responding       | You are not responding (not going to) a call              |
| On Scene             | You are at the scene/location of call                     |
| Standing By          | You are standing by (available) or available at a station |


### Default Personnel Staffing Levels

Staffing Levels reflect the readiness of your personnel to respond to calls or other events. These ideally map back to expected response times for your organization. For example if someone has their staffing level as "Available" they should be able to respond to call within 15 minutes, whereas if they are Delayed it's 30 minutes and On Shift is 5 minutes.

| Staffing Name        | Description                                               |
| -------------------- | --------------------------------------------------------- |
| Available            | You are available to respond to calls                     |
| Delayed              | You are available to respond to calls but may be delayed  |
| Unavailable          | You cannot respond to calls                               |
| Committed            | You are committed to an event or call and cannot respond  |
| On Shift             | You are actively on shift and can rapidly respond         |


### Default Unit Statuses

Unit Statuses are actions your Units (Apparatuses or Teams) are currently or about to take. Or their current status (for example Available).

| Status Name          | Description                                               |
| -------------------- | --------------------------------------------------------- |
| Responding           | Unit is Responding to a call                              |
| Available            | Unit is available to take a call                          |
| Committed            | Unit is currently committed and cannot take a call        |
| On Scene             | Unit is on scene (location) of a call                     |
| Staging              | Unit is Staging at a call location or Station             |
| Returning            | Unit is currently returning from a call to station        |
| Out of Service       | Unit is Out of Service and cannot respond to calls        |


### Base Status Types

When you are creating your own Custom Statuses for Personnel, Units and Staffing Levels you can select a 'base' type (its meaning). This allows Resgrid to 'understand' the meaning of what the statuses are in your organization back to ones that Resgrid knows. For example if you have a Unit status that is "Lunch" Resgrid doesn't know what that means and this cannot perform automatic actions against or with that status. But if you assign the base status of "Lunch" to "Unavailable" Resgrid knows that the unit in the custom "Lunch" status is not available to respond to a call.

Here are the current Base Statuses that you can assign to your own Custom Statuses.

| Status Name          | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| None                 | This Custom Status does not equate to a base type            |
| Available            | Status equates to an Available to respond to calls           |
| Not Responding       | Status equates to an Not Responding to a call                |
| Responding           | Status equates to Responding to an active call               |
| On Scene             | Status equates to is at the Scene/Location of a call         |
| Made Contact         | Status equates to making contact with RP or patient          |
| Investigating        | Status equates to investigating in the area of a call        |
| Dispatched           | Status equates to being dispatched to a call                 |
| Cleared              | Status equates to being cleared of a call                    |
| Returning            | Status equates to returning from a call to a station         |
| Staging              | Status equates to being staged at a call location or station |
| Unavailable          | Status equates to being Out of Service; unable to take calls |
| En Route             | Status equates to traveling to an assignment on a routine (non-emergency) basis |
| Transporting         | Status equates to transporting a patient, subject or cargo   |
| Delivering           | Status equates to delivering goods or supplies               |
| At Patient           | Status equates to being with a patient or search subject     |
| At Hospital          | Status equates to being at a hospital or receiving facility  |
| Searching            | Status equates to actively searching an assigned area        |
| Loading              | Status equates to loading or picking up before transport     |
| Standby              | Status equates to being held in reserve or on standby        |
| On Patrol            | Status equates to patrolling while available for calls       |
| Maintenance          | Status equates to being out of service for maintenance       |
| On Break             | Status equates to a rest or meal break (delayed, still dispatchable) |
| Completed            | Status equates to a finished task; becoming available        |
| In Quarters          | Status equates to Available **at the unit's station**: closest-unit dispatch measures the unit from its station instead of its GPS and adds the in-quarters turnout time |

Cleared, On Patrol, Completed and In Quarters count as available like Available does. Returning counts as busy: for a unit that is heading back but can already take a call, use **Available** instead.

<a id="base-types-and-call-automation"></a>

#### Base types and call automation

Resgrid reads a unit status by its base type when it closes calls, releases units and links statuses to calls, so set one on every unit status your crews use. A status left on **None** is ignored by the rules below (for linking it never counts as a clear).

| What happens | Base types that count |
| --- | --- |
| **Release statuses leave the unit alone.** When a call is closed, or a unit is taken off it, the unit call release status is only set on units still working the call. A unit already back in service or taken out of service keeps its status. | Available, Cleared, Completed, On Patrol, In Quarters (back in service); Unavailable, Not Responding, Maintenance (out of service); On Break |
| **The unit has finished with the call.** With [Close call when last unit clears](../web-app/dispatch-calls#closing-a-call-automatically) on, the call closes when its last unit moves into one of these from a status that was working the call. | Available, Cleared, Completed, On Patrol, In Quarters; Unavailable, Not Responding, Maintenance |
| **The unit cleared, for linking statuses to calls.** A status set without choosing a call goes on the call the unit is working (see [Which call a status belongs to](../web-app/dispatch-calls#which-call-a-status-belongs-to)). After one of these the next status is not carried onto that call, and after one that names no call (back in quarters at the station) it is not put on any call the unit was sent to before it. Personnel statuses work the same way. | Available, In Quarters, Completed, On Patrol, Cleared, Returning; Unavailable, Not Responding, Maintenance |
| **Still working the call.** These never close a call and are released when the call closes. | Responding, Dispatched, En Route, On Scene, Made Contact, Investigating, At Patient, Transporting, At Hospital, Staging, Standby, Searching, Loading, Delivering, Returning |

For an ambulance set, for example: *Out of Service* → **Unavailable** or **Maintenance**, *Radio Available* → **Available**, *At Station* → **In Quarters**, *On Scene* → **On Scene** or **At Patient**, *Departing to Hospital* → **Transporting**, *Arrived Hospital* → **At Hospital**.

<a id="status-meanings"></a>

#### Meanings are what Resgrid reads

The base type is the option's **meaning**, and Resgrid goes by the meaning, never by the button text. Availability for dispatch recommendations and closest-unit run cards, the status set on [dispatch and release](../web-app/department-settings#unit-status-on-dispatch-and-release), notification rules, check-in timers, staffing notification muting, reports, SMS replies and the apps all use it. An option left on **None** is unknown to all of them. The built-in statuses already have a meaning.

The Custom Statuses list marks sets with options that have no meaning (**N without a meaning**), and the set's edit page shows a **Meaning** column, suggests meanings from the button names and has a **Use suggested meanings** button. Review the suggestions, then press **Update** to save them. See [Status meanings](../web-app/custom-statuses#status-meanings).

<a id="staffing-meanings"></a>

#### Staffing level meanings

Staffing levels have a meaning too, picked from their own list. The built-in staffing templates come with it filled in.

| Staffing meaning | Description | Counts as |
| ---------------- | ----------- | --------- |
| None             | No system meaning; the level is a label only | Unknown |
| Available        | The person is available to respond | Available |
| Delayed          | The person can respond but will be delayed | Delayed |
| Unavailable      | The person is not available to respond | Unavailable |
| Committed        | The person is committed to another assignment | Committed |
| On Shift         | The person is on shift, at their station or post | Available |
| Off Duty         | The person is off duty and not expected to respond | Unavailable |
| On Call          | The person is off site but available when called | Available |


## Creating and Editing Custom Levels
Under the Department menu you can select the Custom Statuses option to see what custom statuses you have defined and add/edit/remove them.

:::warning Note
When you added, edit or remove Custom Statuses all of your users mobile applications will need to re-sync by logging out of the application and back in. For example the Resgrid Responder and Resgrid Unit app. This is because those custom statuses get stored locally on the device for quick retrieval and for offline operations. It's recommended that you setup your custom statuses for Personnel before onboarding them onto the mobile apps.
:::

![Custom Statuses Page](/img/configuration/custom-statuses/CustomStatusesPage.png)

### For Personnel

On the there are 2 sections for your Personnel and they are the right two boxes on the page; Custom Personnel Statuses (Actions) and Custom Personnel Staffing Levels. You can only have one of each active and by default it uses the above default. If the button in the box say "Set Custom Statuses/Staffing Levels" you are currently using the default Resgrid ones.

![New Custom Statuses Page](/img/configuration/custom-statuses/NewUnitStatusesPage.png)

The Options Table in the page defines the buttons your users will see. You can add as many or as little as you want. Some departments only have 2 buttons, while others have dozens. When you click "Add Option" you will see a dialog like this:

![New Custom Statuses Option](/img/configuration/custom-statuses/NewButtonoption.png)

| Name                 | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| Button Text          | The Text of the Button and the Text shown in Reports         |
| Button Color         | Color of the button also the Color of Text in Report         |
| Text Color           | Color of the Button Text (choose something high contrast)    |
| Meaning              | The option's meaning (base type): a Base Status Type above, or for staffing levels a [staffing meaning](#staffing-meanings) |
| Require GPS          | Does this status require GPS Coordinates (only for mobile)   |
| Detail Type          | Can you select what Call and/or Station for this status      |
| Note Type            | Do you want to allow an optional note or require one         |

Order Defines the order in which the buttons will appear on any page or list. They order for LOWEST to HIGHEST number and default to the order in which they were added originally. 

<a id="next-statuses"></a>

### Next Statuses (status flow)

Each option can name the statuses that logically follow it. Save the set first, then click **Edit** on an option and tick its **Next statuses**. For example, an ambulance set might use:

| Current status | Next statuses                                 |
| -------------- | --------------------------------------------- |
| Departed       | On Scene                                      |
| On Scene       | To Hospital, To Station (In Quarters), Out of Service |
| To Hospital    | At Hospital                                   |

While a status with next statuses is current, the Unit and Responder apps show only those buttons, in your set's order. The current status stays visible with a red outline and a **Current** tag. A **Show all statuses** link under the buttons brings back the rest for anything out of sequence, such as a breakdown on the way to a call. Leave every box unchecked on an option to offer all statuses after it.

Next statuses only change what the apps offer. The server still accepts any status, so dispatchers can set any status from the website or the Dispatch app, and the apps fall back to the full list when the current status is not in the set. The set's edit page lists each option's next statuses in the **Next statuses** column. Staffing levels have no sequence, so they don't have this setting.

To make crews confirm a status with a press and hold instead of a tap, turn on **Hold to Set Status** under [Dispatch Settings](department-settings#dispatch-settings).

:::warning Updating or Removing Statuses and Staffing
When you update or remove a custom status this can impact the Reset To department setting where you can pick a time to reset Statuses and Staffings to a baseline. Also users who have custom Staffing level changes will also need to update theirs to ensure it's still correct. Make sure after you change your Personnel Statuses or Staffing Levels that you also update your Department Settings and let users know to check/update their own personal Staffing Level scheduled changes.
:::


### For Units

You can have as many Custom Statuses for Units as you like. You assign statuses to Units via the Unit Type (Department Menu->Types).

![Unit Types](/img/configuration/custom-statuses/UnitTypesList.png)

The Action Set/Action Field is where you designate what Custom Unit Statuses to use.

![Unit Types Add](/img/configuration/custom-statuses/NewUnitTypeDialog.png)

All other options between Unit Custom Statuses and Personnel as the same.