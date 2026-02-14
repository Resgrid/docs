---
sidebar_position: 20
---

# Inventory Types

Inventory Types in Resgrid define the categories of items your department tracks in the inventory system. Each type represents a class of supply or equipment — such as "SCBA Bottles", "Medical Supplies", "Hose Sections", or "Batteries" — and includes configuration for units of measure and expiration tracking.

## Why Inventory Types Matter

Before you can track inventory in Resgrid, you must define what kinds of items you want to track. Inventory Types provide the classification system that organizes your supplies and equipment. They enable consistent tracking across stations, allow for expiration monitoring on perishable items (like medical supplies), and provide the foundation for inventory adjustments and reporting.

## Scope

Inventory Types are department-wide. Once defined, a type can be used to track inventory at any station or assigned to any unit in the department. All personnel with inventory permissions can view and adjust inventory for any type.

## Viewing Inventory Types

Navigate to **Inventory → Manage Types** to see all inventory types defined for your department. The list shows each type's name, description, unit of measure, and expiration settings.

## Creating an Inventory Type

Click **Add Type** to create a new inventory type.

| Field           | Required | Default | Description                                                   |
| --------------- | -------- | ------- | ------------------------------------------------------------- |
| Type (Name)     | Yes      | —       | The name of the inventory type (e.g., "SCBA Bottles")         |
| Description     | No       | —       | A description of what this inventory type represents          |
| Expires Days    | No       | 0       | Number of days until items of this type expire (0 = no expiry) |
| Unit of Measure | No       | —       | The unit used to measure this item (e.g., "Each", "Box", "Gallon") |

:::tip Expiration Tracking
Set **Expires Days** for items that have a shelf life, such as medical supplies, batteries, or food rations. The system will track expiration based on the date of each inventory adjustment. A value of 0 means the item does not expire.
:::

## Editing an Inventory Type

Click on an existing type to edit its name, description, expiration days, or unit of measure. Changes to the type definition affect how new inventory adjustments are categorized but do not retroactively change existing inventory records.

## Deleting an Inventory Type

Inventory types can be deleted from the Manage Types page. Deleting a type does not delete existing inventory records associated with it, but no new adjustments can be made for the deleted type.

## Making Inventory Adjustments

Once inventory types are defined, personnel can create inventory adjustments (transactions) to track additions and subtractions.

Navigate to **Inventory → Adjust** to create a new adjustment.

| Field     | Required | Description                                                       |
| --------- | -------- | ----------------------------------------------------------------- |
| Type      | Yes      | The inventory type being adjusted                                 |
| Group     | Yes      | The station/group where the inventory is located                  |
| Amount    | Yes      | The quantity to add (positive) or subtract (negative); cannot be 0 |
| Batch     | No       | A batch identifier for tracking lots or shipments                 |
| Unit      | No       | Optionally assign the inventory to a specific unit                |

:::warning Non-Zero Amount
The adjustment amount must be a non-zero value. Positive values add inventory, negative values subtract it. An amount of 0 will be rejected.
:::

## Viewing Inventory

The Inventory page provides multiple views:

| View              | Description                                                     |
| ----------------- | --------------------------------------------------------------- |
| Summary           | Consolidated inventory by type, group, and unit                 |
| History           | Full transaction history of all adjustments                     |
| View Entry        | Detailed view of a single inventory transaction                 |

## How Inventory Types Connect to Other Features

| Feature          | Connection                                                        |
| ---------------- | ----------------------------------------------------------------- |
| Groups/Stations  | Inventory is tracked at the station/group level                   |
| Units            | Inventory can be assigned to specific units                       |
| Permissions      | Inventory adjustment access is controlled by the Adjust Inventory permission |
| Notifications    | Unit type availability alerts can monitor equipment levels        |

## Common Errors and Resolutions

| Error                                | Resolution                                                        |
| ------------------------------------ | ----------------------------------------------------------------- |
| "Amount must be non-zero"            | Enter a positive or negative number (not 0) for the adjustment    |
| Type not appearing in adjustment form | Ensure the inventory type has been created and is not deleted     |
| Cannot adjust inventory              | Check that you have the Adjust Inventory permission               |
| Expiration not tracking              | Verify the Expires Days field is set to a value greater than 0    |