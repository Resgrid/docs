---
sidebar_position: 2
---

# Installation

The overall installation of Resgrid is tailored to your specific usage scenarios and will require first procuring the required numbers of servers or VM's and continuing the installation process. If your department will have 50 or less users and units utilizing it at one time, we recommend using the Quick Start.

## Prerequisites

Resgrid's recommended install is on Ubuntu 20.04 with Docker to meet the Small sizing install.

 - Minimum of 4 Ubuntu 20.04 Servers/VMs/VPC's
    - 2 Servers for Resgrid Web and API containers 
    - 1 Server for MS SQL, Mongodb
    - 1 Server for Rabbit, Redis & Resgrid Worker Container
 - Ubuntu VMs sized appropriately for your workload
 - An Ingress Load-Balancer to route traffic to the Rancher Cluster

 :::tip Note
Some services installed as part of this process; MSSQL, RabbitMQ, Redis and MongoDb are configured as single instances. This is not the ideal configuration if you are trying to get a high availability system. All of those services can be setup in HA configurations, but it is outside of the scope of this guide. 
:::

