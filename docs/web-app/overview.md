---
sidebar_position: 1
title: Web Application Overview
---

# Resgrid Web Application — User Area Overview

The Resgrid web application User Area is the primary interface for managing all aspects of a department's operations. It is built on ASP.NET Core with Razor views and follows an MVC (Model-View-Controller) architecture organized under the `User` area.

## Architecture

All controllers in the User Area inherit from `SecureBaseController`, which provides:

- **`DepartmentId`** — the current user's active department
- **`UserId`** — the current authenticated user ID
- **`UserName`** — the current authenticated user's name
- **Claims-based authorization** helpers for fine-grained permission checks

### Authorization Model

The system uses a **two-layer authorization model**:

1. **Policy-based authorization** — ASP.NET `[Authorize(Policy = "...")]` attributes on controller actions (e.g., `Call_View`, `Personnel_Create`, `Department_Update`)
2. **Imperative authorization** — Runtime checks via Resgrid's `IAuthorizationService` for granular permissions (e.g., `CanUserEditCall`, `CanUserViewUnit`, `CanUserRemoveUser`)

Permission levels can be configured per department:
| Level | Description |
|-------|-------------|
| **Everyone** | All department members |
| **Department Admins** | Only department administrators |
| **Department + Group Admins** | Department admins and station/group administrators |
| **Admins + Select Roles** | Admins plus users in specific personnel roles |

### Audit Trail

Most mutating operations fire an `AuditEvent` through the `IEventAggregator` system, capturing:
- Before and after JSON snapshots
- IP address and User-Agent
- Server/machine name
- Timestamp and acting user

### Department Scoping

Every data query is scoped to the current user's `DepartmentId`, ensuring complete data isolation between departments.

## Feature Areas

The User Area is organized into the following major feature areas:

| Feature | Description | Controller |
|---------|-------------|------------|
| [Dashboard](dashboard) | Main operations dashboard with personnel status | `HomeController` |
| [Department Settings](department-settings) | Department configuration and administration | `DepartmentController` |
| [Dispatch & Calls](dispatch-calls) | Call creation, management, and dispatch operations | `DispatchController` |
| [Personnel](personnel) | Personnel management, roles, and roster | `PersonnelController` |
| [Units](units) | Unit management, staffing, and state tracking | `UnitsController` |
| [Groups & Stations](groups-stations) | Station groups, membership, and geofencing | `GroupsController` |
| [Shifts](shifts) | Shift scheduling, signups, and trades | `ShiftsController` |
| [Workshifts](workshifts) | Static workshift scheduling | `WorkshiftsController` |
| [Mapping](mapping) | Interactive maps, layers, POIs, and routing | `MappingController` |
| [Messages](messages) | Internal messaging system | `MessagesController` |
| [Calendar](calendar) | Event scheduling and RSVP | `CalendarController` |
| [Logs](logs) | Run logs, work logs, and activity tracking | `LogsController` |
| [Reports](reports) | Comprehensive reporting suite | `ReportsController` |
| [Documents](documents) | Document management and sharing | `DocumentsController` |
| [Notes](notes) | Department notes and knowledge base | `NotesController` |
| [Trainings](trainings) | Training creation, delivery, and quizzes | `TrainingsController` |
| [Inventory](inventory) | Equipment and supply tracking | `InventoryController` |
| [Contacts](contacts) | External contact management | `ContactsController` |
| [Notifications](notifications) | Notification rules and alerts | `NotificationsController` |
| [Custom Statuses](custom-statuses) | Custom personnel and unit status definitions | `CustomStatusesController` |
| [Types & Configuration](types-configuration) | Call types, unit types, priorities, and categories | `TypesController` |
| [Protocols](protocols) | Dispatch protocols with triggers and scoring | `ProtocolsController` |
| [Forms](forms) | Custom form builder with automations | `FormsController` |
| [Templates](templates) | Call quick templates and autofills | `TemplatesController` |
| [Command Definitions](command-definitions) | Incident command structure definitions | `CommandController` |
| [Department Links](department-links) | Inter-department data sharing | `LinksController` |
| [Distribution Lists](distribution-lists) | Email distribution list management | `DistributionListsController` |
| [Resource Orders](resource-orders) | Cross-department resource ordering | `OrdersController` |
| [Subscription & Billing](subscription-billing) | Plan management and Stripe billing | `SubscriptionController` |
| [Security & Permissions](security-permissions) | Permission configuration and audit logs | `SecurityController` |
| [Profile & Account](profile-account) | User profile, schedules, and certifications | `ProfileController` |
| [Voice & Audio](voice-audio) | Voice channels and audio streams | `VoiceController` |
| [Connect](connect) | Public department profile and posts | `ConnectController` |
| [Search](search) | Quick navigation search | `SearchController` |
| [Workflows](workflows) | Event-driven automation engine with templates and external actions | `WorkflowsController` |
| [Contact Verification](../configuration/contact-verification) | Contact method verification for anti-spam protection | `ContactVerificationController` (API) |

## Event System

The application uses an event aggregation system (`IEventAggregator`) to decouple operations. Key events include:

| Event | Triggered By | Purpose |
|-------|-------------|---------|
| `CallAddedEvent` | Creating a new call | Broadcasts notifications to dispatched personnel |
| `CallUpdatedEvent` | Updating or re-opening a call | Notifies personnel of changes |
| `CallClosedEvent` | Closing a call | Records close state and notifies |
| `CalendarEventAddedEvent` | Creating a calendar item | Notification delivery |
| `CalendarEventUpdatedEvent` | Updating a calendar item | Notification delivery |
| `ShiftCreatedEvent` | Creating a shift | Notification to personnel |
| `ShiftTradeRequestedEvent` | Requesting a shift trade | Notifies potential traders |
| `ShiftTradeFilledEvent` | Completing a shift trade | Confirms trade |
| `AuditEvent` | Most write operations | Audit trail recording |
| `SecurityRefreshEvent` | Permission changes | Cache invalidation |
| `UnitAddedEvent` | Creating a unit | System integration, workflow triggers |
| `DocumentAddedEvent` | Uploading a document | Notification delivery, workflow triggers |
| `LogAddedEvent` | Creating a work log | Notification delivery, workflow triggers |
| `NoteAddedEvent` | Creating a note | Workflow triggers |
| `UserCreatedEvent` | Adding a user to department | Workflow triggers |
| `UserAssignedToGroupEvent` | Assigning user to a group | Workflow triggers |
| `UserStaffingEvent` | Personnel staffing change | Workflow triggers |
| `UserStatusEvent` | Personnel status change | Workflow triggers |
| `UnitStatusEvent` | Unit status change | Workflow triggers |
| `ResourceOrderAddedEvent` | Creating a resource order | Workflow triggers |
| `MessageSentEvent` | Sending a message | Workflow triggers |
| `TrainingAddedEvent` | Creating a training | Workflow triggers |
| `TrainingUpdatedEvent` | Updating a training | Workflow triggers |
| `InventoryAdjustedEvent` | Adjusting inventory | Workflow triggers |
| `CertificationExpiringEvent` | Certification nearing expiry | Workflow triggers (daily scheduled check) |
| `FormSubmittedEvent` | Submitting a form | Workflow triggers |
| `PersonnelRoleChangedEvent` | Changing user role assignment | Workflow triggers |
| `GroupAddedEvent` | Creating a department group | Workflow triggers |
| `GroupUpdatedEvent` | Updating a department group | Workflow triggers |

## Queue System

Time-sensitive operations like call dispatch use the `IQueueService` to enqueue asynchronous processing:

- **Call Broadcast Queue** — Sends push notifications, SMS, and email to dispatched personnel
- **CQRS Event Queue** — Handles cache clearing and other eventual-consistency operations
- **Workflow Queue** — Processes workflow executions asynchronously (event → template rendering → action execution)
