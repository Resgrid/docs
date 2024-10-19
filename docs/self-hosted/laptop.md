---
sidebar_position: 3
---

# Offline Laptop

In this guide we will get Resgrid up in running via Docker Compose for local (single user) use on a Windows computer.

## Use Case

This setup is intended to get Resgrid up and running on a single-user environment, like a laptop that will not be connected to or have internet access. No external users (i.e. from another machine or mobile device) will be connecting to this installation. For example you are coordinate rescue and recovery efforts for a hurricane from a location on your laptop, you are communicate with your field teams only via a radio as there is no power or cell phone data/WiFi Internet. 

## System Requirements

1.) Windows 10 or Windows 11 Laptop with WSL2 (Windows Subsystem for Linux)
2.) Docker Desktop with WSL2 Enabled
3.) Enough HDD Space to handle Mapping Data (if you want a large region like North America you'll need 30+ GB)
4.) 4 or more Core Processor
5.) 16GB or more of RAM

## Setup Notice

There is no redundancy, backup or fail-over in this setup. Everything runs on the local computer and is not intended to be accessed by anyone off of the local computer. If the local computer gets damaged this could result in loss of data. It's recommend that you have a USB drive that you can backup the database to (ideally the whole resgrid directory) periodically during the operation.

## Prerequisites & Dependencies

1. Update Windows
2. Install WSL2 and Ubuntu 22.04 <https://documentation.ubuntu.com/wsl/en/latest/guides/install-ubuntu-wsl2/>
3. Open up your Ubuntu 22.04 instance and finalize the setup (set password).
4. Install Docker <https://docs.docker.com/desktop/wsl/> and enable WSL2 backend.

## Docker Compose Setup

1. Open Notepad as Administrator and open C:\Windows\System32\drivers\etc\hosts file.

2. Add the following lines to the hosts file and save.
```
127.0.0.1      rg.mylocal
127.0.0.1      rgapi.mylocal
127.0.0.1      rgevents.mylocal
127.0.0.1      rgtile.mylocal
```

If you get a permissions error you didn't open up Notepad as Administrator, also don't use any RichText editor (Wordpad, Word, etc).

3. Navigate to Geofabrik <https://download.geofabrik.de/> and download the .osm.pbf file the region you will be operating in. 

It is not recommend to try and pull an entire Sub Region (i.e. North America) as that will take quite a long time to import into the database. Instead it's recommended to import and additional Sub (Sub) Region, like a US State (i.e. Florida) or a Special Sub Region if they are available (i.e. US South). 

4. Using the Windows File Explorer move the osm.pbf file into Linux (left side bar) Ubuntu-22.04, home and your username folder. This will put it in your home directory.

5. Start your Ubuntu-22.04 WSL2 Instance so the command prompt is visible.

6. Clone the setup scripts for the Laptop compose:

```bash
git clone https://github.com/Resgrid/resgrid-setup.git -b laptop resgrid
```

You should now have a folder called resgrid in your current directory.

7. Open the resgrid directory:

```bash
cd resgrid
```

8. Import the osm.pbf you downloaded and placed in your home directory into the tile server. Change /home/yourname/yourregion.osm.pbf in the command below to the correct home directory name (yourname) and the name of the region file you downloaded (yourregion).

```bash
docker run \
    -v /home/yourname/yourregion.osm.pbf:/data/region.osm.pbf \
    -v ./docker-data/osm:/data/database/ \
    overv/openstreetmap-tile-server \
    import
```

If the container exits without errors, then your data has been successfully imported and you are now ready to run the tile server. If you selected a very large region, like North America this process can take days.


## Run the Docker Compose

Once you have setup the environment variables you can now run the docker compose file in the resgrid directory:

```bash
docker compose up
```

That will run the interactive version of the containers, Ctrl+C will stop the containers.

If you want to run the containers in the background, use the -d option:

```bash
docker compose up -d
```

The Resgrid system will take about 5 minutes to start up fully, this is due to the startup order of the containers. The last container to startup will be the web container, once that one is ready, you can now access the system.


## Initial Web Login

Open up your web browser and navigate to **https://rg.mylocal**, **https://rgapi.mylocal**, **https://rgevents.mylocal** and **https://rgtile.mylocal**. You will need to accept the self-signed cert for each url and add exceptions in the browsers. You can follow this guide <https://it.nmu.edu/docs/adding-security-exception-your-browser> to add those exceptions.

Once you have completed the steps above you will be able to log into the web applications user interface. Open up a web browser and navigate to **https://rg.mylocal**, you will then be prompted by the login screen. Your default administrator credentials are **admin/changeme1234**. Once you log into the system it’s recommended that you change your admin password from the Edit Profile page by clicking on the Administrator name in the upper left hand corner.

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