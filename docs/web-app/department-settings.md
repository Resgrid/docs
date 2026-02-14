---
sidebar_position: 3
title: Department Settings
---

# Department Settings

The Department Settings area is the central configuration hub for a Resgrid department. It is managed by the `DepartmentController` and requires `Department_Update` authorization for most operations.

## General Settings

### Basic Configuration

| Setting | Description | Validation |
|---------|-------------|------------|
| Department Name | Display name for the department | Required |
| Timezone | Department's timezone for time display | Selected from system timezones |
| Managing User | Primary department administrator | Must be a department member |
| 24-Hour Time | Use 24h vs 12h time format | Toggle |
| Department Address | Physical address of the department | Full address form |

### Map Settings

| Setting | Description | Range |
|---------|-------------|-------|
| Map Center GPS | Default map center coordinates | Valid latitude/longitude |
| Map Zoom Level | Default zoom level | 0–15 |
| Map Refresh Timer | Auto-refresh interval in seconds | 5–120 seconds |

### Personnel Display Settings

| Setting | Description |
|---------|-------------|
| Personnel Sort Order | How personnel are sorted (Default, First Name, Last Name) |
| Auto Available | Automatically set members as available |
| Hide Unavailable | Hide unavailable personnel from status views |
| Suppressed Staffing Levels | Hide specific staffing levels from UI |

### Scheduled Status/Staffing Resets

The system supports automated reset schedules for personnel:

- **Status Reset** — Automatically reset all personnel to a default status at a scheduled time
- **Staffing Reset** — Automatically reset all staffing levels at a scheduled time

These are configured as `ScheduledTask` objects with day-of-week and time selections.

## API & Integration

### API Key Management

- **View API Key** — Displays the current department API key
- **Provision API Key** — Generates a new API key (GUID format)
- **RSS Feed Key** — Generates a key for the active calls RSS feed

### Call Email Import

Configure email-based call import for automatically creating dispatch calls from incoming emails:

| Setting | Description |
|---------|-------------|
| Hostname | Mail server hostname |
| Port | Mail server port (default: 110) |
| Use SSL | Enable SSL for mail connection |
| Username/Password | Mail server credentials |
| Email Format Type | Parser format for incoming emails |
| Call Pruning | Automatically close old calls |

**Supported Email Format Types (~20 types):**
- CalFire
- Generic
- Active911
- Brann Norge
- Caliber
- Carl EMS
- Coast Guard
- County Fire
- Dispatch Pro
- Facility
- Four Rivers
- Frontier Page
- Hilton Head
- IaFCDS
- IAmResponding
- Oshkosh
- Parkland County
- Ranch Kiowa
- SpottedDog
- Yellowhead County
- And others...

### Text Messaging Settings

| Setting | Description |
|---------|-------------|
| Text-to-Call Number | Incoming SMS number for creating calls |
| Text Command Enable | Enable SMS-based commands |
| Source Numbers | Phone numbers for outgoing SMS |
| Import Format | Text-to-call format parser |

**Number Provisioning:**
- Search available phone numbers by country and area code
- Provision a specific number
- Auto-provision the first available number

Number provisioning is limited by the department's subscription plan.

## Dispatch Settings

| Setting | Description |
|---------|-------------|
| Dispatch Shift Instead of Group | When dispatching a group, dispatch personnel signed up for the current shift instead |
| Auto-Set Status for Shift Dispatch | Automatically change dispatched shift personnel to a configurable status |
| Unit Dispatch Behaviors | Configure how units respond to dispatch |

## Shift Settings

| Setting | Description |
|---------|-------------|
| Allow Multi-Group Signup | Allow personnel to sign up for shifts in groups other than their own |

## Mapping Settings

| Setting | Description |
|---------|-------------|
| Mapping TTL | Time-to-live for location data on maps |
| Location Overwrite | Whether new locations overwrite existing ones |

## Module Settings

Enable or disable individual modules for the department:

| Module | Description |
|--------|-------------|
| Messaging | Internal messaging system |
| Mapping | Interactive maps and location tracking |
| Shifts | Shift scheduling and management |
| Logs | Run logs and work logs |
| Reports | Reporting suite |
| Documents | Document management |
| Calendar | Event calendar |
| Notes | Department notes |
| Training | Training modules |
| Inventory | Equipment tracking |
| Maintenance | Maintenance scheduling |

## Invites

Manage email invitations for new department members:

- **Send Invites** — Send email invitations to join the department (validates email format and uniqueness)
- **Resend Invite** — Re-send a pending invitation
- **Delete Invite** — Remove a pending invitation

## Department Deletion

:::danger
Department deletion is a destructive operation that:
1. Cancels any active Stripe subscriptions
2. Marks the department for deletion
3. Cannot be easily undone
:::

- Requires `Department_Update` authorization
- Confirmation step required
- A pending deletion can be cancelled before processing
- Fires an `AuditEvent` for both deletion and cancellation

## Setup Wizard

A guided setup wizard is available for new departments that walks through:

1. **Timezone selection** — Set the department's timezone
2. **Address configuration** — Set the department's physical address
3. **Station setup** — Create initial station groups
4. **Unit creation** — Create initial units
5. **Email import** — Configure call email import
6. **Text messaging** — Configure SMS settings

The wizard submits all data as a single JSON payload for atomic processing.

## Cache Management

- **Clear Department Cache** — Enqueues a CQRS event to clear all cached data for the department

## Printer Integration

Station groups can be configured with PrinterNet printers for automatic dispatch printing:

- **GetPrinterNetPrinters** — Retrieves available printers using a PrinterNet API key

## Data Endpoints

The controller provides several JSON API endpoints used by the UI:

| Endpoint | Purpose |
|----------|---------|
| `GetStationsForGrid` | Station groups data for grid display |
| `GetRecipientsForGrid` | Filtered recipient list (groups, roles, persons) |
| `GetDepartmentTypes` | Department type dropdown data |
| `GetCallEmailTypes` | Available email format types |
| `GetCallTextTypes` | Available text format types |
| `GetAvailableNumbers` | Phone numbers available for provisioning |
| `GetSubscriptionLimitWarning` | Plan limit warnings |

## Interactions with Other Modules

| Module | Interaction |
|--------|-------------|
| **Subscription** | Plan limits affect features like phone number provisioning and department links |
| **Custom Statuses** | Staffing reset uses custom staffing levels |
| **Shifts** | Dispatch settings control shift-based dispatch behavior |
| **Groups** | Station groups are managed here and used throughout the system |
| **Calls** | Email import and text-to-call create calls automatically |
| **Mapping** | Map center and zoom settings affect all map views |
