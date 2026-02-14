---
sidebar_position: 18
title: Inventory
---

# Inventory

The Inventory module tracks equipment, supplies, and other assets across department locations. It is managed by the `InventoryController`.

## Inventory Overview

**Authorization:** `Inventory_View` policy

The main view displays consolidated inventory data loaded via AJAX.

### Consolidated View

The `GetCombinedInventoryList` endpoint returns aggregated inventory grouped by:
- **Inventory Type** — What the item is
- **Group/Station** — Where the item is located
- **Unit** — Which unit it's assigned to

## Inventory Types

### Managing Types
**Authorization:** `Inventory_Update` policy

| Field | Required | Description |
|-------|----------|-------------|
| Type Name | Yes | Name of the inventory type |
| Description | No | Type description |
| Expires Days | No | Number of days until items expire |
| Unit of Measure | No | Measurement unit (each, box, etc.) |

### Operations
- **Create Type** — Add a new inventory type
- **Edit Type** — Modify type details
- **Delete Type** — Remove a type (validates department ownership)

## Inventory Adjustments

**Authorization:** `Inventory_Create` policy

Record inventory changes (additions or removals):

| Field | Required | Description |
|-------|----------|-------------|
| Inventory Type | Yes | What item is being adjusted |
| Amount | Yes | Quantity (must not be 0) |
| Station/Group | No | Location of adjustment |
| Unit | No | Unit assignment |
| Batch | No | Batch identifier |
| Note | No | Adjustment notes |

Each adjustment records:
- Department ID
- Timestamp
- Acting user
- Location (group/unit)

## Inventory History

**Authorization:** `Inventory_View` policy

View all inventory transactions with:
- Type name
- Amount and batch
- Timestamp
- Station/unit assignment
- User who made the adjustment

## Viewing Individual Entries

**Authorization:** `Inventory_View` policy

View a single inventory entry with full details, including the adding user's name.

## Data Endpoints

| Endpoint | Purpose |
|----------|---------|
| `GetTypesList` | All inventory types with expiry info |
| `GetCombinedInventoryList` | Consolidated inventory by type/group/unit |
| `GetInventoryList` | All individual transactions |

## Interactions with Other Modules

| Module | Interaction |
|--------|-------------|
| **Groups** | Inventory tracked at station/group level |
| **Units** | Inventory can be assigned to specific units |
| **Department Settings** | Module can be enabled/disabled |
| **Security** | Inventory adjustment permission configurable |
