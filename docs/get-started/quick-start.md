---
sidebar_position: 2
---

# Quick Start

In this quick start we will get Resgrid up in running via Docker Compose for testing and evaluation. This quick start is valuable for getting the system up and running quickly for evaluation or testing purposed, but is not the recommended setup for production use.

## Prerequisites

1.) Server or VM that meets the System Requirements below
2.) Internet Access (to and from the Server or VM)
3.) 3 Sub-Domains for the system:
     a.) Sub-Domain for Main Web App (Resgrid)
     b.) Sub-Domain for API (Resgrid API)
     c.) Sub-Domain for Event Hub (Resgrid Events)
4.) Valid Email Address for LetsEncrypt

## Requirements Notice

It is highly recommended that Resgrid is installed and setup by an IT Professional. There is a large amount of system configuration, tweaking and setup that is required to be done before and after you install Resgrid. Below is a list of technologies that you should have skilled professionals available to you or requisite knowledge before installing. Resgrid does not provide support or configuration guidance for those systems outside of the minimum needed to get the system functional.

- Windows or Linux
- Docker, Kubernetes
- MS SQL Server
- DNS, hostname mapping, proxy configuration
- RabbitMQ
- Redis
- Elastic
- MongoDb
- Mail Server SMTP, POP3
- Firewall and system hardening

## System Requirements

The quick-start installation is suitable for a department of around 50 personnel on a machine with 32GB of RAM, 500GB of storage and a 8 logical processors. But depending on call volume or user interaction patterns may require more.

We do not recommend that mission critical systems be installed on a single machine. Resgrid is split into multiple containers to allow for multiple machines to be used to ensure the system is resilient to failure of one of it's components. Each dependency also needs to be resilient in that case, for example Clustered SQL Servers, RabbitMQ, Redis, etc.

## Prerequisites & Dependencies

To run the Resgrid containers you will Docker, install Docker <https://docker.com/>. You will also need Docker Compose, Install Docker Compose <https://docs.docker.com/compose/install/>, the guide below will assume the docker-compose executable is installed.

:::tip Note
The guide below assumes a Linux server. We test our containers on Ubuntu 20.04 as part of our normal releases. But other Linux distros that support docker should work just fine. You may have to translate some commands, or come options may not apply. 
:::

- Open Ports 5151 through 5165, 80 and 443
- SMTP Server for sending email
- 3 Publicly Available URLs
   - Main Web App (i.e. rg.mycompany.com)
   - API (i.e. rgapi.mycompany.com)
   - Events (i.e. rgevents.mycompany.com)

:::tip Note
Any correctly configured SMTP server will work if it’s local or not. If you have an SMTP server provided by your ISP or provider that will also work.
:::

## Docker Compose Setup

Download and Extract Package

1. Clone the setup scripts for the all-in-one QuickStart:

```bash
git clone https://github.com/Resgrid/resgrid-setup.git resgrid
```

You should now have a folder called resgrid in your current directory.

2. Open the resgrid directory:

```bash
cd resgrid
```

3. Verify and Set mmap counts

First run the command below to get your current mmap counts

```bash
sysctl vm.max_map_count
```

If the value returned is less then 262144 run the following commands

```bash
sudo sysctl -w vm.max_map_count=262144
sudo nano /etc/sysctl.conf
```

Find the vm.max_map_count value and set to 262144 and save the file. If you can't find the value add it to the bottom of the file.

```
vm.max_map_count=262144
```

## Setting Environment Variables

Edit the environment file:

```bash
nano resgrid.env
```

You will need to set at a minimum the following top 7 variables in the resgrid.env file. 

| Variable                      | Description                                               |
| ----------------------------- | --------------------------------------------------------- |
| NGINX_RESGRID_WEB_URL         | The FQDN of the server for the main Resgrid web app       |
| NGINX_RESGRID_API_URL         | The FQDN of the server for Resgrid api                    |
| NGINX_RESGRID_EVENTS_URL      | The FQDN of the server for Resgrid Event hub              |
| NGINX_LETSENCRYPT_EMAIL       | Your email address used for LetsEncrypt                   |
| RESGRID__SystemBehaviorConfig__ResgridApiBaseUrl          | Same FQDN as NGINX_RESGRID_API_URL prefixed with https://     |
| RESGRID__SystemBehaviorConfig__ResgridBaseUrl             | Same FQDN as NGINX_RESGRID_WEB_URL prefixed with https://     |
| RESGRID__SystemBehaviorConfig__ResgridEventingBaseUrl     | Same FQDN as NGINX_RESGRID_EVENTS_URL prefixed with https://  |

Once those are set to real and correct values you can continue on for initial testing and validation. But to use the system for anything other then quick testing you should review and change any environment variables in the resgrid.env file that has **(REQUIRED)** text in the comment.

:::danger Note
Failure to review and change the values inside the resgrid.env file for a development, production, testing or staging system could lead to issues, service disruption and protentional security issues (i.e. utilizing the default encryption keys in the file).
:::

## Run LetsEncrypt Initialization Script

1. Execute the LetsEncrypt initialization script:

```bash
./init-letsencrypt.sh
```

This script will create the initial certificates to request the SSL certificates from LetsEncrypt. Ensure it completes successfully before continuing on. Common failures here are not properly mapping the FQDN (Fully Qualified Domain Names) defined above to the server you are trying to run the script on (i.e. firewall blocking port 80 and 443, DNS record not pointing to the correct server)

## Run the Docker Compose

Once you have setup the environment variables you can now run the docker compose file.:

```bash
docker-compose up
```

That will run the interactive version of the containers, Ctrl+C will stop the containers.

If you want to run the containers in the background, use the -d option:

```bash
docker-compose up -d
```

The Resgrid system will take about 5 minutes to start up fully, this is due to the startup order of the containers. The last container to startup will be the web container, once that one is ready, you can now access the system.
Important Note About Support

Resgrid is a complex system that can scale from a single instance to dozens of systems to service thousands of users. These installation setups get your system into a state where you can test and validate locally on the install system. To get Resgrid up and running to service non-local users you will need to reconfigure and harden the system. To complete those steps and configuration the system to your organizational needs you will require an IT professional. We do not provide installation support outside this guide via our Github page.
Initial Web Login

Once you have completed the steps above you will be able to log into the web applications user interface. Open up a web browser and navigate to the URL you specified in **RESGRID__SystemBehaviorConfig__ResgridBaseUrl**, you will then be prompted by the login screen. Your default administrator credentials are **admin/changeme1234**. Once you log into the system it’s recommended that you change your admin password from the Edit Profile page by clicking on the Administrator name in the upper left hand corner.

## What's Next?

This Quick Start gets the system running via local host, but not externally or within your network. You will need to create DNS entries in your internal or external DNS server to point to the server that is running the containers. It's also recommend you change some default values in the resgrid.env file to ensure proper security.