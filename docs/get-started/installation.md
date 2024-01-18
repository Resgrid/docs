---
sidebar_position: 3
---

# Installation

The overall installation of Resgrid is tailored to your specific usage scenarios and will require first procuring the required numbers of servers or VM's and continuing the installation process. If your department will have 50 or less users and units utilizing it at one time, we recommend using the Quick Start.

## Prerequisites

Resgrid's recommended install is on Ubuntu 20.04 with Docker to meet the Small sizing install requirements you will need a minimum of 5 servers:

 - 1 Web Server
 - 1 Api Server
 - 1 Event Hub Server 
 - 1 Server for MS SQL, Mongodb
 - 1 Server for Rabbit, Redis & Resgrid Worker Container

For contrast a mission-critical production environment will require a minimum of 18 servers (or vm's).

- 2 Load Balanced Web servers
- 2 Load Balanced API servers 
- 2 Load Balanced Event Hub servers 
- 1 Microsoft SQL Server (HA Cluster for Mission Critical applications) 
- 1 Worker server 
- 2 Event Worker servers 
- 3 Redis servers in a cluster 
- 3 RabbitMQ servers in a cluster 
- 1 Elasticsearch server (ELK)
- 1 MongoDb server (HA Cluster for Mission Critical applications)
- An Ingress Load-Balancer


 :::tip Note
Some services installed as part of this process; MSSQL, RabbitMQ, Redis and MongoDb are configured as single instances. This is not the ideal configuration if you are trying to get a high availability system. All of those services can be setup in HA configurations, but it is outside of the scope of this guide. 
:::

