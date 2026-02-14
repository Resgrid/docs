---
sidebar_position: 26
title: Command Definitions
---

# Command Definitions

Command Definitions structure incident command assignments following ICS (Incident Command System) principles. The module is managed by the `CommandController`.

## Command List

**Authorization:** `Command_View` policy

Displays all command definitions for the department.

## Creating Commands

**Authorization:** `Command_Create` policy

### Command Fields

| Field | Required | Description |
|-------|----------|-------------|
| Command Name | Yes | Definition name |
| Call Type | No | Optional binding to a specific call type ("Any Call Type" if not set) |

### Assignments (Roles)

Each command contains one or more assignments (roles within the command structure):

| Field | Description |
|-------|-------------|
| Assignment Name | Role/position name (e.g., "Operations Chief") |
| Assignment Description | Role description |
| Force Requirements (Lock) | Whether assignment constraints are enforced |

### Assignment Requirements

Each assignment can specify required resources:

| Requirement Type | Description |
|-----------------|-------------|
| **Unit Types** | Required unit types (e.g., 2 Engines, 1 Ladder) |
| **Personnel Roles** | Required personnel roles (e.g., 1 Paramedic, 2 EMTs) |
| **Certifications** | Required certifications (defined but currently disabled in code) |

:::note
The certification requirement feature is defined in the model but the code to add certifications to the collection is currently commented out.
:::

### Force Requirements
When the `ForceRequirements` (lock) flag is set, the system enforces that the assignment's resource requirements must be met.

## Current Limitations

- **No Edit functionality** — Commands can only be created and viewed, not edited
- **No Delete functionality** — Commands cannot be deleted through the UI
- **Synchronous save** — Uses synchronous `Save` method (unlike most other controllers)

## Interactions with Other Modules

| Module | Interaction |
|--------|-------------|
| **Dispatch** | Commands can be associated with specific call types |
| **Units** | Unit type requirements reference department unit types |
| **Personnel Roles** | Personnel role requirements reference department roles |
| **Types** | Call types used for command binding |
