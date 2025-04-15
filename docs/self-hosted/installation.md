---
sidebar_position: 2
---

# Installation

The overall installation of Resgrid is tailored to your specific usage scenarios and will require first procuring the required numbers of servers or VM's and continuing the installation process. If your department will have 50 or less users and units utilizing it at one time, we recommend using the Quick Start.

:::danger Warranty
Resgrid's self hosted version is provided with no warranty, no guarantee of suitability and limited free support (Github Issues and Discussions only).
Updates for our self hosted version are infrequent compared to our hosted version due to the additional cost in time to create those releases. We try 
our best to ensure an easy and working system that doesn't require a lot of tweaking, but due to it's complexity that is difficult.
:::

## Prerequisites

Resgrid's recommended install is on Ubuntu 24.04 with Docker to meet the Small sizing install requirements you will need a minimum of 5 servers:

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

- Open Ports 80 and 443 and pass to the server (or utilize your firewall/load balancer or proxy server)
- SMTP Server for sending email
- 3 Urls provisioned (externally available, internal DNS, etc)
   - Main Web App (i.e. rg.mycompany.com)
   - API (i.e. rgapi.mycompany.com)
   - Events (i.e. rgevents.mycompany.com)

## Dependency Setup

You will need to get the required dependencies servers setup and online. You can utilize Docker versions, bare metal installs or even cloud hosted versions of these services for your installation. 

### Microsoft SQL Server

Install and configure Microsoft SQL Server 2022 on the server of your choice or if you are on a Cloud provider use their MS-SQL implementation. You will need to create 3 databases and 3 accounts. Use server defaults for collation.

 - **Resgrid** database and user with DB Owner for that database
 - **ResgridWorkers** database and user with DB Owner for that database
 - **ResgridOIDC** database and user with DB Owner for that database

### MongoDb

Install and configure MongoDb on the server of your choice or if you are on a Cloud provider use their Mongo implementation. You will need to create 1 databases and 1 login.

 - **resgrid** database and user credentials for that db

### Redis

Install and configure Redis on the server of your choice or if you are on a Cloud provider use their Redis implementation.


### RabbitMQ

Install and configure RabbitMQ on the server of your choice or if you are on a Cloud provider use their RabbitMQ implementation. You will need to create a login for rabbit that allows the creation of exchanges, topics and queues.


### Proxy

Resgrid requires SSL and our containers are built with SSL Termination/Offloading in mind. You will need to setup a Proxy server that supports SSL Termination/Offloading to forward traffic to the 3 web accessible Resgrid containers. We use Caddy v2 in our system but you can use any proxy that supports the features (NGINX, HAProxy, Trafik, etc).

### Mail Server

Resgrid sends out emails to users to inform them of events and correspondence. Have a dedicated (DO-NOT-RESPOND) style email and login to allow Resgrid to send emails.

### Sentry

This step is optional but we recommending using the https://sentry.io cloud service or their open-source on-prem version https://develop.sentry.dev/self-hosted/. This would replace Elk for all logging, error and session tracking. 

You should now have your Proxy setup for handling SSL traffic, a Microsoft SQL Server setup with 3 databases and 3 db owner logins, MongoDb setup with 1 database and 1 login, Redis and RabbitMQ with a login that can create exchanges, topics and queues. Now you can work on setting up the Resgrid containers.

## Resgrid Container Setup

You will need a good text editor, Notepad++ on Windows or Nano if your doing this from the Linux CLI.

1. Clone the setup scripts for the multi install:

```bash
git clone --branch multi https://github.com/Resgrid/resgrid-setup.git resgrid
```

You should now have a folder called resgrid in your current directory.

2. Open the resgrid directory:

```bash
cd resgrid
```
You will need to clone this repo into all the servers running the Resgrid containers. But we are going to edit the .env file here and it'll need to be copied to every server running the Resgrid containers, this keeps the Resgrid settings consistent for every server.


Edit the environment file with Nano (or if you cloned in a Desktop environment with your text editor of choice):

```bash
nano .env
```

