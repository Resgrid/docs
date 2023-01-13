---
sidebar_position: 2
---

# Quick Start

In this quick start we will get Resgrid up in running via Docker Compose for testing and evaluation. This quick start is valuable for getting the system up and running quickly for evaluation or testing purposed, but is not the recommended setup for production use.

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

The all-in-one docker installation is suitable for a department of around 50 personnel on a machine with 32GB of RAM, 500GB of storage and a 8 logical processors. But depending on call volume or user interaction patterns may require more.

We do not recommend that mission critical systems be installed on a single machine. Resgrid is split into multiple containers to allow for multiple machines to be used.

A mission-critical production environment will require a minimum of 10 servers: * 2 Load Balanced Web servers * 2 Load Balanced API servers * 1 Microsoft SQL Server * 1 Worker server * 1 Events server * 1 Redis server * 1 RabbitMQ server * 1 Elasticsearch server (ELK)

Sizing of these servers will depend on your departments amount of users and call volume.
Prerequisites & Dependencies

To run the Resgrid containers you will Docker, install Docker <https://docker.com/>, either using a native package or Docker Desktop. You will also need Docker Compose, Install Docker Compose <https://docs.docker.com/compose/install/>.

:::tip Note
All Resgrid container images are based on Linux, users of Docker for Windows will need to ensure that Docker is using Linux containers <https://docs.docker.com/docker-for-windows/#switch-between-windows-and-linux-containers>.
:::

- A minimum of 24GB RAM assigned to Docker

    With Docker for Mac, the amount of RAM dedicated to Docker can be set using the UI: see How to increase docker-machine memory Mac <http://stackoverflow.com/questions/32834082/how-to-increase-docker-machine-memory-mac/39720010#39720010>.

    In Docker Desktop for Windows, use the *Advanced* tab to adjust limits on resources available to Docker <https://docs.docker.com/docker-for-windows/#:~:text=Memory%3A%20By%20default%2C%20Docker%20Desktop,swap%20file%20size%20as%20needed>.

- A limit on mmap counts equal to 262,144 or more

    On Linux, use sysctl vm.max_map_count on the host to view the current value, and see Elasticsearch’s documentation on virtual memory <https://www.elastic.co/guide/en/elasticsearch/reference/5.0/vm-max-map-count.html#vm-max-map-count> for guidance on how to change this value. Note that the limits must be changed on the host; they cannot be changed from within a container.

    If using Docker for Mac, then you will need to start the container with the MAX_MAP_COUNT environment variable (set to at least 262144 (using e.g. docker’s -e option) to make it sets the limits on mmap counts at start-up time.


- Open Ports 5151 through 5165
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

1. Download the resgrid.tgz Asset file from the latest Resgrid GitHub Release <https://github.com/Resgrid/Core/releases>:

```bash
wget https://github.com/Resgrid/Core/releases/download/v0.5.30/resgrid.tgz
```

:::tip Note
You can replace the v##.##.## number in between download/ and /resgrid.tgz with any Github release number to download that specific Docker Compose file.
:::


2. Extract the tgz package file:

```bash
tar -xvzf resgrid.tgz
```

You should now have a folder called resgrid in your current directory.

## Setting Environment Variables

Resgrid’s docker containers are configured using environment variables defined in the resgrid.env file within the resgrid folder. Edit this file and configure the variables as needed for your environment. Please pay special attention to the the (required) variables.

You don't need to configure the resgrid.env right now if you just want to start the system and play around, it's configured out of the box with defaults to get the system running for testing.

## Run the Docker Compose

Once you have setup the environment variables you can now run the docker compose file.:

```bash
docker-compose up
```

That will run the interactive version of the containers, Crtl+C will stop the containers.

If you want to run the containers in the background, use the -d option:

```bash
docker-compose up -d
```

The Resgrid system will take about 5 minutes to start up fully, this is due to the startup order of the containers. The last container to startup will be the web container, once that one is ready, you can now access the system.
Important Note About Support

Resgrid is a complex system that can scale from a single instance to dozens of systems to service thousands of users. These installation setups get your system into a state where you can test and validate locally on the install system. To get Resgrid up and running to service non-local users you will need to reconfigure and harden the system. To complete those steps and configuration the system to your organizational needs you will require an IT professional. We do not provide installation support outside this guide via our Github page.
Initial Web Login

Once you have completed the steps above you will be able to log into the web applications user interface. Open up a web browser and navigate to http://localhost:5151, you will then be prompted by the login screen. Your default administrator credentials are admin/changeme1234. Once you log into the system it’s recommended that you change your admin password from the Edit Profile page by clicking on the Administrator name in the upper left hand corner.

## What's Next?

This Quick Start gets the system running via local host, but not externally or within your network. You will need to create DNS entries in your internal or external DNS server to point to the server that is running the containers. It's also recommend you change some default values in the resgrid.env file to ensure proper security.