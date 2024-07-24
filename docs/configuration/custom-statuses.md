---
sidebar_position: 5
---

# Custom Statuses and Staffing

Custom Statuses and Staffing allow you have your own actions for personnel and units to perform when using the apps. For example if you didn't want the Default Resgrid statuses for Personnel (i.e. Responding, Not Responding, On Scene, etc) you could create a custom Personnel Status set with your own options (Yes, No, Coming, Not Coming, etc).

You can have Custom Statuses for Personnel Actions (Statuses), Personal Staffing Levels and for each Unit Type defined in the system.

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

When you are creating your own Custom Statuses for Both Personnel and Units you can select a 'base' type. This allows Resgrid to 'understand' the meaning of what the statuses are in your organization back to ones that Resgrid knows. For example if you have a Unit status that is "Lunch" Resgrid doesn't know what that means and this cannot perform automatic actions against or with that status. But if you assign the base status of "Lunch" to "Unavailable" Resgrid knows that the unit in the custom "Lunch" status is not available to respond to a call.

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


## Creating and Editing Custom Levels
Under the Department menu you can select the Custom Statuses option to see what custom statuses you have defined and add/edit/remove them.

:::warning Note
When you added, edit or remove Custom Statuses all of your users mobile applications will need to re-sync by logging out of the application and back in. For example the Resgrid Responder and Resgrid Unit app. This is because those custom statuses get stored locally on the device for quick retrieval and for offline operations. It's recommended that you setup your custom statuses for Personnel before onboarding them onto the mobile apps.
:::

![Custom Statuses Page](/img/apps/configuration/custom-statuses/CustomStatusesPage.png)

### For Personnel

On the there are 2 sections for your Personnel and they are the right two boxes on the page; Custom Personnel Statuses (Actions) and Custom Personnel Staffing Levels. You can only have one of each active and by default it uses the above default. If the button in the box say "Set Custom Statuses/Staffing Levels" you are currently using the default Resgrid ones.

![New Custom Statuses Page](/img/apps/configuration/custom-statuses/NewUnitStatusesPage.png)

The Options Table in the page defines the buttons your users will see. You can add as many or as little as you want. Some departments only have 2 buttons, while others have dozens. When you click "Add Option" you will see a dialog like this:

![New Custom Statuses Option](/img/apps/configuration/custom-statuses/NewButtonoption.png)

| Name                 | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| Button Text          | The Text of the Button and the Text shown in Reports         |
| Button Color         | Color of the button also the Color of Text in Report         |
| Text Color           | Color of the Button Text (choose something high contrast)    |
| Base Type            | Does this Custom Status equate to a Base Status Type above   |
| Require GPS          | Does this status require GPS Coordinates (only for mobile)   |
| Detail Type          | Can you select what Call and/or Station for this status      |
| Note Type            | Do you want to allow an optional note or require one         |

Order Defines the order in which the buttons will appear on any page or list. They order for LOWEST to HIGHEST number and default to the order in which they were added originally. 

:::warning Updating or Removing Statuses and Staffing
When you update or remove a custom status this can impact the Reset To department setting where you can pick a time to reset Statuses and Staffings to a baseline. Also users who have custom Staffing level changes will also need to update theirs to ensure it's still correct. Make sure after you change your Personnel Statuses or Staffing Levels that you also update your Department Settings and let users know to check/update their own personal Staffing Level scheduled changes.
:::


### For Units

You can have as many Custom Statuses for Units as you like. You assign statuses to Units via the Unit Type (Department Menu->Types).

![Unit Types](/img/apps/configuration/custom-statuses/UnitTypesList.png)

The Action Set/Action Field is where you designate what Custom Unit Statuses to use.

![Unit Types Add](/img/apps/configuration/custom-statuses/NewUnitTypeDialog.png)

All other options between Unit Custom Statuses and Personnel as the same.