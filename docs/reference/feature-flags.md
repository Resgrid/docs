---
sidebar_position: 8
title: Feature Flags & Module Gates
---

# Feature Flags & Module Gates

Some Resgrid modules are behind **feature flags** so they can be rolled out gradually. On the hosted service Resgrid staff switch them on; on a self-hosted installation the operator does it with the tools console. Flags are stored in the database (`FeatureFlags`, `FeatureFlagOverrides`, `FeatureFlagTargetingRules`, `FeatureFlagPrerequisites`), cached, and evaluated per department: a **department override** wins over a **percentage rollout** and **targeting rules**, which win over the **global default**.

## Managing flags (self-hosted)

```bash
# list flags and what a department resolves to
dotnet Resgrid.Console.dll --FeatureFlags --DepartmentId=1

# turn a flag on for one department (department override)
dotnet Resgrid.Console.dll --FeatureFlags --Key=Records.System --DepartmentId=1 --On

# turn a flag on globally (default for every department without an override)
dotnet Resgrid.Console.dll --FeatureFlags --Key=Checklists.System --On

# remove an override, staged rollout, list keys the code gates on
dotnet Resgrid.Console.dll --FeatureFlags --Key=Chat.System --DepartmentId=1 --Clear
dotnet Resgrid.Console.dll --FeatureFlags --Key=Chat.System --Rollout=25
dotnet Resgrid.Console.dll --FeatureFlags --Keys
```

Writes go through the feature-toggle service, so caches are invalidated and an audit event is written; web, API and workers pick up the change on their next read. `FeatureFlagsConfig.FeatureFlagsEnabled=false` turns the whole subsystem off (every flag reads as disabled).

## Flags

| Key | Gates | Depends on | Seeded |
|---|---|---|---|
| `Chat.System` | Realtime chat, incident channels, Assistant conversation, moderation (web + apps). Free for all plans. | — | M0108 |
| `Chatbot.TwilioTextIntegration` | Routes inbound SMS through the Assistant pipeline instead of the legacy text commands. | — | — |
| `Dispatch.RunCards` | Run cards, station-based / closest-unit selection, move-ups, alarm levels. | — | M0116 |
| `Checklists.System` | Checklists module (free). | — | M0189 (off) |
| `Maintenance.WorkOrders` | Work orders and preventive maintenance. Also needs the Readiness Pro add-on and the Maintenance module switch. | — | M0189 (off) |
| `Records.System` | The Records module; replaces Logs in the sidebar. A department must also **activate** Records. | — | M0152 (off) |
| `Records.Field.Responder` / `.Unit` / `.IncidentCommand` / `.Dispatch` | Field Records surfaces in each app. | `Records.System` | M0152 |
| `Records.Prevention.Occupancy` | Occupancies and the pre-plan crosswalk. | `Records.System` | M0186 |
| `Records.Prevention.Inspections` | Inspection programs, code sets, inspections, violations. | `Records.Prevention.Occupancy` | M0186 |
| `Records.Prevention.Hydrants` | Hydrants and water sources. | `Records.System` | M0186 |
| `Records.Prevention.Permits` | Permits and plan review. | `Records.Prevention.Occupancy` | M0186 |
| `Records.Prevention.Crr` | Community risk reduction activities. | `Records.System` | M0186 |
| `Records.Investigations` | Investigation cases. | `Records.System` | M0186 |
| `Records.QualityReview` | Quality review rubrics and sampling. | `Records.System` | M0186 |
| `Records.Analytics` | Records analytics dashboards. | `Records.System` | M0187 |
| `Security.DepartmentProtectedDataEnrollment` | Platform-wide admission gate for **new** Advanced Data Protection enrollments (operator-managed; never affects departments already enrolled). | — | M0126 |

## Other gates

Besides flags, a page can be hidden by:

| Gate | Where |
|---|---|
| **Module switches** (Messaging, Mapping, Shifts, Logs/Records, Reports, Documents, Calendar, Notes, Training, Inventory, Checklists, Maintenance) | Department Settings → Module Settings (`DepartmentModuleSettings`) |
| **Plan and add-ons** (PTT, ADP, Readiness Pro, Enterprise SSO) | Subscription & Billing; entitlement checked against the billing API (`SubscriptionsService`, `ReadinessAccessService`) |
| **Permissions** | Security & Permissions |
| **Records activation** | Records → Activate (`RmsDepartmentCutover`) |
| **Installation config** | e.g. NERIS submission switched off system-wide, external connectors off, tracker gateway disabled |

## Environments

A flag can be restricted to an environment (`SystemBehaviorConfig.Environment`: Dev, QA, Staging, Production); a flag pinned to another environment evaluates as its off value.
