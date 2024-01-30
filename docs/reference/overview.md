---
sidebar_position: 1
---

# Overview

The goal of the Resgrid project is to have a complete, all-in-one solution that organizations of any size can utilize to manage the intersection of dispatches, personnel and resources. Being a complete solution does not mean it's 'best of breed' for the individual modules (i.e. shifts), as such we want to target a minimum level of functionality for each module and a level of customization to make Resgrid malleable out of the box.

- Easy to Use
- Support Orgs of any size
- Built-in modules to cover __minimum__ functionality or APIs to allow external interactions
- Configurable without knowing how to code
- Can run in a completely air-gapped/offline environment

## Platform

Resgrid has many components that interact with each other at a high level. 

<img src="/img/reference/ResgridPlatformOverview.png" alt="Resgrid Platform Overview" className="cover-image" />

## System Components

Resgrid is split into many discrete components. These can then be installed on one or many systems depending on your load or uptime requirements. 

- **Web Core**: The primary web application
- **Web Services**: The backend API
- **Web Events**:SignalR web socket application for real-time updating of UI's
- **Worker Console**: CLI application that runs scheduled tasks and processes backend real-time events
- **Tools Console**: CLI application that admins can run to update the database version or run other commands
- **Microsoft SQL Server**: Primary relational database (3rd Party)
- **MongoDB**: Document database for storing real-time GPS events for Units and User and Audit events (3rd Party)
- **Redis**: In Memory Caching Service (3rd Party)
- **RabbitMQ**: Message Queuing and Distribution Service, used to keep the distributed system components in sync (3rd Party)
- **ElasticSearch**: ELK server for system logging output (3rd Party)

Not mentioned here as this is 100% user choice but for any Highly Available (HA) configuration you need to have multiple __Web Core__, __Web Services__ and __Web Events__ servers setup in a load balanced configuration. That allows the system to respond either via the Web App or API to user interactions even if one of the boxes is having issues.

## 3rd Party HA Configurations

Each of the 3rd party products Resgrid relies on, for example Microsoft SQL Server, can be setup on Single Machines in a non Highly Available (HA) configuration or in an HA configuration. For any critical system deployment that needs to try and achieve 100% uptime you will need to set those components up in HA configurations/clusters.

- **Microsoft SQL Server**: https://learn.microsoft.com/en-us/sql/database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server?view=sql-server-ver16
- **MongoDB**: https://www.mongodb.com/basics/clusters
- **Redis**: https://redis.com/redis-enterprise/technology/highly-available-redis/
- **RabbitMQ**: https://www.rabbitmq.com/clustering.html

:::warning Note
Resgrid does not provide support or guidance on configuration, setup, maintenance or hardening of 3rd party products or services. We highly recommend reaching out to certified professional for those products to ensure they are configured correctly to meet your needs.
:::

## Server Diagram

<img src="/img/reference/ResgridServerDiagram.png" alt="Resgrid Server Diagram" className="cover-image" />

Pretty much all Resgrid systems will need to access the SQL Server, Redis Cache and RabbitMQ servers. The Resgrid Events app is a SignalR Web Socket Eventing system that use used to update the UI in real-time when events occur, it only needs to communicate with the SQL Server and Worker Consoles.

Each Resgrid App, for example Dispatch App or BigBoard can be hosted on multiple server fronted by a Load Balancer as well for an HA implementation, but they are mostly Angular Web Apps and don't require a ton of server side resources.