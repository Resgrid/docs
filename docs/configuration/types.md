---
sidebar_position: 21
---

# Department Wide Types

Under the Department Menu in the Types menu option allows you set a number a department wide and module specific types or selection options. 

## Call Types

By default there are no Call Types defined. A call type allows you organize calls into a category for example, "Structure Fire" or "Motor Vehicle Accident".

![Call Types List](/img/configuration/types/CallTypes.png)

Call Types are assignable on Call Creation and are also used in other systems to interact with calls. For example a Protocol or Call Template may utilize the Call Type to set data or perform an operation. 

![Call Types List](/img/configuration/types/NewCallType.png)

You cannot delete a Call Type once it's been used. If you wish to delete the Call Type you need to delete or update any systems where you used it, for example Protocols, Call Templates, Command Definitions, etc. Once those have been deleted or updated to another type you can then delete the Call Type. 

:::tip Call Types in Calls
Call Type names are used in the Call when stored in the Database, thus changes or deletion of the call type won't impact previously entered calls.
:::

## Call Priorities

By default there are 4 Call Priorities defined in Resgrid; Low, Medium, High and Emergency all with default sounds and options.

![Call Priorities List](/img/configuration/types/CallPriorities.png)

Once you create one new Call Priority the default ones will be deactivated and you will only have the option to select the Call Priorities you define. To return to the system defaults you will need to delete all your custom call Priorities. 

![New Call Priority](/img/configuration/types/NewCallPriority.png)

| Name                 | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| Priority Name        | Name of the Call Priority that is selectable/shown           |
| Priority Color       | Color of the Priority also the Color of Text in Report       |
| Sort Order           | Lower means first on the lists, default (0) is order created |
| Is Default           | Can only be ONE, is the default Priority for automation      |
| Dispatch Personnel   | Automation, does this priority dispatch Personnel directly   |
| Dispatch Units       | Automation, does this priority dispatch Units directly       |
| Alert Sound          | For Push Notifications and the UI, the sound for new calls   |

:::tip Dispatch Personnel and Units
The Dispatch Personnel and Dispatch Units check boxes mean that Calls with this Priority can dispatch those entities (Persons or Units) when used in an automation. For example say you have a "Low" Call Priority and you don't want to wake up Personnel expect those currently staffing a Unit, you would only check the "Dispatch Units" checkbox and when any automation runs to automatically determine who to dispatch it won't automatically select personnel (that meet the automation criteria). For
manually entered in calls the "Dispatch Personnel" and "Dispatch Units" options don't come into play as the person entering the call can select whomever to dispatch.
:::

## Unit Types

There are no default Unit Types in the Resgrid system. Unit Types allow you to assign some common aspect between your Units in Resgrid, for example their Map Icon and what Custom Statuses buttons they should be using.

![Unit Types List](/img/configuration/types/UnitTypes.png)

When you create Custom Statuses (Actions) for Units, you need to assign that status to a Unit Type and then that Unit Type to a Unit (when you add or update a Unit in the Units Module) for the actions to be visible for a particular unit in the Resgrid Unit or Web Application.

![Add Unit Type](/img/configuration/types/NewUnitType.png)

## Certification Types

Certifications allow you're users to add in Certifications and their information in their own profile. With the Certification Types you can add the certifications you want users to add and maintain in your Resgrid Department.

![Certifications Types List](/img/configuration/types/CertificationTypes.png)

Adding a new Certification Type requires you just specific the name of the Certification.

![Add Certification Type](/img/configuration/types/NewCertificationType.png)

## Document Categories

Document Categories (Types) allow you to organize documents together. For example all of your Standard Operating Procedures and all of your Pre-Plan documents could be in different categories to make it easier to find the one your are looking for.

![Document Types List](/img/configuration/types/DocumentCategories.png)

Adding a new Document Category is as easy as adding the name of the Category you want to assign Documents to.

![Add Document Type](/img/configuration/types/NewDocumentCategory.png)

The Category text name is saved with the Document, changes to these Document Categories will only impact newly created documents.