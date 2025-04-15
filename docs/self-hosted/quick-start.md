---
sidebar_position: 1
---

# Quick Start

In this quick start we will get Resgrid up in running via Docker Compose for testing and evaluation. This quick start is valuable for getting the system up and running quickly for evaluation or testing purposed, but is not the recommended setup for production use.

:::danger Warranty
Resgrid's self hosted version is provided with no warranty, no guarantee of suitability and limited free support (Github Issues and Discussions only).
Updates for our self hosted version are infrequent compared to our hosted version due to the additional cost in time to create those releases. We try 
our best to ensure an easy and working system that doesn't require a lot of tweaking, but due to it's complexity that is difficult.
:::

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

- Linux Server (Ubuntu)
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

The quick-start installation is suitable for a department of around 50 personnel on a machine with 32GB of RAM, 500GB of storage and a 8 logical processors. But depending on call volume or user interaction patterns may require more. You can run Resgrid on a lower-spec machine but it's not recommended.

We do not recommend that mission critical systems be installed on a single machine. Resgrid is split into multiple containers to allow for multiple machines to be used to ensure the system is resilient to failure of one of it's components. Each dependency also needs to be resilient in that case, for example Clustered SQL Servers, RabbitMQ, Redis, etc.

## Prerequisites & Dependencies

To run the Resgrid containers you will Docker, install Docker <https://docker.com/>. You will also need Docker Compose, Install Docker Compose <https://docs.docker.com/compose/install/>, the guide below will assume the docker-compose executable is installed.

:::tip Note
The guide below assumes a Linux server. We test our containers on Ubuntu 24.04 as part of our normal releases. But other Linux distros that support docker should work just fine. You may have to translate some commands, or some options may not apply. We do not provide assistance for any OS that isn't the one above. 
:::

- Open Ports 80 and 443 and pass to the server (if you want it to be externally accessible)
- SMTP Server for sending email
- 3 Publicly Available URLs (if you want valid, non self-signed certs)
   - Main Web App (i.e. rg.mycompany.com)
   - API (i.e. rgapi.mycompany.com)
   - Events (i.e. rgevents.mycompany.com)

:::tip Note
Any correctly configured SMTP server will work if it’s local or not. If you have an SMTP server provided by your ISP or provider that will also work.
:::

Install Docker-CE on Ubuntu 24.04
https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository

Allow running of docker for non-root users
https://docs.docker.com/engine/install/linux-postinstall/

Install Docker Compose on Ubuntu 24.04
https://docs.docker.com/compose/install/linux/

:::tip Note
We recommend using Docker (or Docker-CE) as the container system as it's what we use in production. Other container engines should work, but we are unable to verify if there are any issues with them. If you run into issues please try using Docker (or Docker-CE) and ensure your using the correct version of Ubuntu before submitting a support request.
:::

## Docker Compose Setup

Download and Extract Package

Clone the setup scripts for the all-in-one QuickStart:

```bash
git clone https://github.com/Resgrid/resgrid-setup.git resgrid
```

You should now have a folder called resgrid in your current directory.

Open the resgrid directory:

```bash
cd resgrid
```

## Setting Environment Variables

Edit the environment file:

```bash
nano .env
```

You will need to set at a minimum the following top 7 variables in the resgrid.env file. 

| Variable                      | Description                                               |
| ----------------------------- | --------------------------------------------------------- |
| NGINX_RESGRID_WEB_URL         | The FQDN of the server for the main Resgrid web app       |
| NGINX_RESGRID_API_URL         | The FQDN of the server for Resgrid api                    |
| NGINX_RESGRID_EVENTS_URL      | The FQDN of the server for Resgrid Event hub              |
| NGINX_LETSENCRYPT_EMAIL       | Your email address used for LetsEncrypt                   |
| NGINX_RESGRID_WEB_IP          | This can be an internal (LAN) IP or a public one, but needs to be the IP that the proxy is serving SSL     |
| NGINX_RESGRID_API_IP          | This can be an internal (LAN) IP or a public one, but needs to be the IP that the proxy is serving SSL                    |
| NGINX_RESGRID_EVENTS_IP       | This can be an internal (LAN) IP or a public one, but needs to be the IP that the proxy is serving SSL              |


Once those are set to real and correct values you can continue on for initial testing and validation. But to use the system for anything other then quick testing you should review and change any environment variables in the .env file that has **(REQUIRED)** text in the comment. 

If you set the **NGINX_LETSENCRYPT_EMAIL** variable value to **internal** that will have Caddy Proxy generate a self-signed certificate. This allows you to test out Resgrid in an internal or air-gapped environment. But depending on your browser's security settings this may make the system not work correctly. We recommend using a publicly accessible URLs or use your own proxy server.

:::danger Note
Failure to review and change the values inside the .env file for a development, production, testing or staging system could lead to issues, service disruption and potential security issues (i.e. utilizing the default encryption keys in the file).
:::

## External Networking

This setup script assumes you are forwarding TCP port 80 and TCP port 443 from the Internet to the server you are running the script on. This docker setup comes with a Caddy reverse proxy for the web components (Web, Api and Events). If you are using a firewall or another proxy; i.e. HAProxy, NGINX, etc. You can forward directly to the ports for each component.

| Port                          | Description                                               |
| ----------------------------- | --------------------------------------------------------- |
| 5151                          | Main Resgrid web app                                      |
| 5152                          | Resgrid api                                               |
| 5153                          | Resgrid Event hub                                         |

Setting **NGINX_RESGRID_WEB_IP**, **NGINX_RESGRID_API_IP** and **NGINX_RESGRID_EVENTS_IP** in the .env file will then point to your firewall/load balancer or proxy. 

:::tip Note
The Resgrid Event Hub (5153) is a SignalR hub that utilized Web Sockets for realtime updates of UI components. Your proxy will need to upgrade/handle and pass those socket calls.
:::

## Run the Docker Compose

Once you have setup the environment variables you can now run the docker compose file:

```bash
./run.sh
```

:::tip Note
The run script will require sudo. If you want to run without sudo just create a sql directory under the docker-data directory and you can use "docker compose up -d" command instead.
:::

The Resgrid system will take about 5 minutes to start up fully, this is due to the startup order of the containers. The last container to startup will be the web container, once that one is ready, you can now access the system.

To get log output you can run:

```bash
docker compose logs
```

Or if you need to get output from a specific container just supply the name of the container from the docker-compose.yml file, for example:

```bash
docker compose logs worker
```

## Important Note About Support

Resgrid is a complex system that can scale from a single instance to dozens of systems to service thousands of users. These installation setups get your system into a state where you can test and validate locally on the install system. To get Resgrid up and running to service non-local users you will need to reconfigure and harden the system. To complete those steps and configuration the system to your organizational needs you will require an IT professional. We do not provide installation support outside this guide via our Github page.


## Initial Web Login

Visit all of the URLs you specified above in a web browser **NGINX_RESGRID_WEB_URL**, **NGINX_RESGRID_API_URL** and **NGINX_RESGRID_EVENTS_URL** over https:// and ensure they load correctly. If you are using an internal/air-gapped install with self-signed certificates you will need to accept the self-signed cert for each url and add exceptions in the browsers.

:::tip Note
If you are using an internal/air-gapped install we recommend adding **NGINX_RESGRID_WEB_URL**, **NGINX_RESGRID_API_URL** and **NGINX_RESGRID_EVENTS_URL** to the hosts file or your internal network DNS server as you should access all of those URLs via their name and not your machines IP address. View instructions on setting up hosts files here https://linuxize.com/post/how-to-edit-your-hosts-file/.

You will also need a valid certificate for running fully air-gapped. We recommend Step-CA server https://smallstep.com/docs/step-ca/ for running your own Certificate Authority and syncing the certificates from that with all your workstations so you don't get certificate errors. You will configure the Caddy proxy to get ACME certificates from Step-CA https://smallstep.com/docs/tutorials/acme-protocol-acme-clients/#caddy-v2
:::

Once you have completed the steps above you will be able to log into the web applications user interface. Open up a web browser and navigate to the URL you specified in **NGINX_RESGRID_WEB_URL**, you will then be prompted by the login screen. Your default administrator credentials are **admin/changeme1234**. Once you log into the system it’s recommended that you change your admin password from the Edit Profile page by clicking on the Administrator name in the upper left hand corner.

## Updating

To update Resgrid you'll need to stop the system, clear the current containers and restart.

Stop all running containers.

```bash
docker compose down
```

Remove all cached images (to ensure we get new ones).

```bash
docker rmi -f $(docker images -aq)
```

Restart the containers and they will pull new containers.

```bash
docker compose up -d
```

## What's Next?

This Quick Start gets the system running via local host, but not externally or within your network. You will need to create DNS entries in your internal or external DNS server to point to the server that is running the containers. It's also recommend you change some default values in the resgrid.env file to ensure proper security.