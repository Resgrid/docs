---
sidebar_position: 1
---

# Introduction

**Resgrid: the complete open-source computer-aided dispatch, records and readiness platform**

Resgrid is computer-aided dispatch, personnel and unit management, records management and logistics for first responders, disaster response, emergency management — and for the businesses and industrial teams that dispatch people and vehicles to jobs.

Started as a hosted service in 2014, Resgrid has processed millions of calls, messages, statuses and staffing updates for thousands of departments. It is the only open-source CAD able to run at that scale, and the same code runs the hosted service and self-hosted installations.

Resgrid is written in C# on .NET with SQL Server or PostgreSQL as the primary store, Redis for caching, RabbitMQ (or Azure Service Bus) for messaging, and React Native / Expo mobile apps.

:::tip Where to start
- **Using the web app?** Start with the [Web application overview](web-app/overview) and [Navigation](web-app/navigation).
- **Setting up a department?** Pick the recipe for your organisation under [Setup guides](setup-guides/overview).
- **Hosting it yourself?** See [Self-hosted](self-hosted/quick-start).
- **Integrating?** See the [API](api/authentication) and [Workflows](web-app/workflows).
:::

:::info Screenshots
Screenshots in this documentation were taken from the current web application with sample data. The interface is updated over time; functionality stays the same even when a screen looks a little different.
:::

## What is in the box

### Operations

- **Computer-aided dispatch** — create calls by hand, from email/SMS pages, from the API or the Assistant; dispatch personnel, groups, roles and units; push, SMS, email and voice alerting; check-in timers; scheduled calls. [Dispatch & Calls](web-app/dispatch-calls)
- **Run cards and automatic dispatch** — pre-planned assignments by priority and type, station-based or closest-unit selection, alarm levels, move-ups. [Run Cards](web-app/run-cards)
- **Personnel, units, groups and statuses** — the roster, apparatus, stations with geofences, and fully customisable status and staffing vocabularies. [Personnel](web-app/personnel) · [Units](web-app/units) · [Groups & Stations](web-app/groups-stations) · [Custom Statuses](web-app/custom-statuses)
- **Mapping** — live map with layers, points of interest, custom raster/region maps, indoor floor plans, routing, hardware GPS trackers. [Mapping](web-app/mapping) · [Custom Maps](web-app/custom-maps) · [Indoor Maps](web-app/indoor-maps) · [Hardware GPS Tracking](web-app/unit-tracking)
- **Routes** — planned multi-stop routes for hydrant checks, patrols, deliveries and transit. [Routes](web-app/routes)
- **Shifts and workshifts** — assigned and signup shifts, trades, staffing views. [Shifts](web-app/shifts)
- **Chat and Assistant** — realtime channels, DMs, incident channels, moderation, and a conversational assistant that takes commands. [Chat](web-app/chat)
- **Voice** — push-to-talk channels and audio streams. [Voice & Audio](web-app/voice-audio)

### Records and reporting

- **Records (RMS)** — typed operational records, NERIS incident reporting, department-designed forms from template packs (SAR, CERT, EOC, HAZMAT, industrial, security, delivery, transit, ICS forms), prevention (occupancies, inspections, hydrants, permits, CRR), investigations, analytics, quality review, legal holds and public-records disclosure. [Records](web-app/records/overview)
- **Reports** — printable and scheduled reports across every module. [Reports](web-app/reports)
- **Documents, notes, calendar, trainings** — the department's shared knowledge and learning. [Documents](web-app/documents) · [Notes](web-app/notes) · [Calendar](web-app/calendar) · [Trainings](web-app/trainings)

### Readiness and logistics

- **Checklists** — apparatus, equipment, facility and personal checks with schedules, reminders, witnesses, evidence and compliance reporting. [Checklists](web-app/checklists)
- **Work orders and preventive maintenance** — repairs, safety holds, meter- and calendar-based schedules, costs and service levels (Readiness Pro). [Work Orders](web-app/work-orders)
- **Inventory** — bulk and serialized stock, lots and expiry, issuance, kits, counts, alerts, purchasing and controlled-substance witnessing. [Inventory](web-app/inventory)
- **Resource orders and department links** — mutual aid between departments. [Resource Orders](web-app/resource-orders) · [Department Links](web-app/department-links)

### Automation, security and integration

- **Workflows** — event-driven automation with email, SMS, chat, webhook, API and file actions. [Workflows](web-app/workflows)
- **Notifications** — readiness alerts on availability, status and inventory. [Notifications](web-app/notifications)
- **Security** — granular permissions, audit log, 2FA, security policy, SSO/SCIM, and Advanced Data Protection with department-owned encryption keys. [Security & Permissions](web-app/security-permissions) · [Advanced Data Protection](web-app/data-protection) · [Enterprise SSO](enterprise/sso-overview)
- **API and apps** — a documented REST API and the Responder, Unit, Dispatch, Incident Command, Big Board and Relay apps. [API](api/authentication) · [Apps](apps/responder)

## Who uses it

Fire departments (volunteer, combination, career), EMS agencies, search and rescue teams, emergency management agencies and EOCs, incident management teams, CERT and community response programs, private security and campus security, industrial fire brigades and plant ERTs, delivery, transit and field-service operators, and the dispatch centres that serve several of them. Each has a [setup guide](setup-guides/overview).

## Contributing to the documentation

This documentation is open source at [github.com/Resgrid/docs](https://github.com/Resgrid/docs). If something is missing or wrong, open an issue or a pull request.
