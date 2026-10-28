---
sidebar_position: 4
title: Incident Command Kit (RICK)
---

# Resgrid Incident Command Kit (RICK)

RICK is a portable Resgrid server you take to an incident: four Raspberry Pi 5 computers in a 1U rack, a network switch and a WiFi hotspot router, running on battery or vehicle power **without any internet connection**.

- **Responders** join the kit's WiFi and use the Resgrid **Responder** and **Unit** apps on their phones and tablets, connected to the kit instead of resgrid.com.
- The **incident commander or dispatcher** uses the Resgrid web app in a browser on a laptop connected to the kit.
- Everything — database, messaging, real-time updates, maps, text-to-speech — runs on the four Pis. Power the kit on and it starts by itself.

The kit lives in the `rick` branch of [resgrid-setup](https://github.com/Resgrid/resgrid-setup/tree/rick).

## How it works

<img src="/img/self-hosted/rick-kit.svg" alt="RICK network: phones and a laptop on the hotspot WiFi connect to rick1; rick1 forwards to rick2, rick3 and rick4 over the kit switch" />

| Node | Address | Role | Runs |
|---|---|---|---|
| rick1 | 192.168.50.11 | **edge** | Caddy (HTTPS for every client), web app, events hub, optional kit DNS, time source |
| rick2 | 192.168.50.12 | **app** | API, worker (database migrations and background jobs), text-to-speech, MCP |
| rick3 | 192.168.50.13 | **data** | PostgreSQL |
| rick4 | 192.168.50.14 | **infra** | Redis, RabbitMQ, RustFS object storage, offline map tiles |

Phones and laptops only ever talk to **rick1** on port 443, using three hostnames (`rg.rick.internal`, `rgapi.rick.internal`, `rgevents.rick.internal`) that the hotspot router resolves to rick1. Caddy on rick1 forwards API and audio requests to rick2 and map tiles to rick4. Splitting the roles spreads memory, CPU and disk I/O across four boards and keeps the database alone on its SSD.

Every container restarts by itself and waits for the services on the other nodes, so after a power cut the kit comes back on its own, whatever order the Pis boot in.

## Shopping list

| Item | Notes |
|---|---|
| 4 × Raspberry Pi 5, **8 GB** | 16 GB gives more headroom on rick2 |
| UCTRONICS Pi 5 Rack Pro (1U, 4 slots) | An M.2 NVMe base, safe-shutdown button and status display per Pi |
| 4 × M.2 NVMe SSD, 128 GB or larger | Boot each Pi from its SSD; far more reliable than microSD cards |
| 4 × Raspberry Pi RTC battery | Keeps each Pi's clock when unpowered (rick1 at minimum) |
| Gigabit switch, 5+ ports | A PoE+ (802.3at) switch with ~120 W budget plus a PoE+ HAT per Pi replaces four power supplies; otherwise 4 × official 27 W USB-C supplies |
| WiFi travel router (e.g. GL.iNet Beryl AX / Slate AX) | DHCP, custom DNS records, WPA2/WPA3; no internet uplink needed in the field |
| Power | A power station (≥500 Wh) or vehicle power. The kit uses about 25–45 W: roughly 10–15 hours per 500 Wh. Add a small UPS on vehicle power. |
| Short Ethernet cables, an Ethernet cable for the laptop | |

## Before you deploy: Raspberry Pi images

RICK needs `linux/arm64` images. The infrastructure images (PostgreSQL, Redis, RabbitMQ, Caddy, RustFS, tile server) are multi-architecture. The Resgrid application images (`resgridllc/*`) are published for `linux/amd64` only today; Resgrid Core contains the Dockerfiles to build them for `linux/arm64` too.

Until multi-architecture images are on Docker Hub, build them once from a [Resgrid Core](https://github.com/Resgrid/Core) checkout on any computer with Docker, push them to a registry you can reach while preparing the kit, and set `RESGRID_IMAGE_REPO` (and `RESGRID_IMAGE_TAG`) in the kit's `.env`. The [rick README](https://github.com/Resgrid/resgrid-setup/tree/rick#images-for-raspberry-pi) has the build commands. Once `resgridllc` publishes multi-architecture images, keep the default `RESGRID_IMAGE_REPO=resgridllc`.

## Step 1: Set up the router

1. Set the router's LAN to `192.168.50.1/24` with a DHCP range such as `192.168.50.100–200`, and reserve `.11`–`.14` for the Pis.
2. Set the WiFi name and a strong WPA2/WPA3 password. This is the network responders join.
3. Add three DNS records pointing at rick1. On GL.iNet routers: **Network > DNS > Edit Hosts**; on OpenWrt: **Network > DHCP and DNS > Hostnames**.

   ```text
   192.168.50.11  rg.rick.internal
   192.168.50.11  rgapi.rick.internal
   192.168.50.11  rgevents.rick.internal
   ```

   If your router can't do this, run the kit's DNS server on rick1 instead (Step 6) and set the router's DHCP **DNS server** option to `192.168.50.11`.

4. Connect the router's LAN port and the four Pis to the switch. Plug the router's WAN port into internet only while preparing or updating the kit.

:::caution Don't use .local names
iPhones and Macs look up `.local` names only with multicast DNS and ignore router records for them. Use `rick.internal` (reserved for private networks) or a subdomain you own.
:::

## Step 2: Prepare each Raspberry Pi (with internet)

1. With Raspberry Pi Imager, write **Raspberry Pi OS Lite (64-bit)** to each SSD. In the imager's settings set the hostname (`rick1` … `rick4`), a user and password, and enable SSH.
2. Fit the SSDs and RTC batteries, slide the Pis into the rack, connect them to the switch and power them up.
3. SSH to each Pi (`ssh <user>@rick1.lan` or its DHCP address) and run, with that node's name and address:

   ```bash
   sudo git clone --branch rick https://github.com/Resgrid/resgrid-setup.git /opt/resgrid-rick
   sudo chown -R $USER /opt/resgrid-rick
   cd /opt/resgrid-rick
   sudo ./os/prepare-node.sh rick1 192.168.50.11 192.168.50.1
   sudo reboot
   ```

   `prepare-node.sh` sets the hostname and fixed address, installs Docker, configures time keeping (rick1 serves time to the others) and a Redis setting. Add `RICK_PCIE_GEN3=1` before `sudo` to enable faster PCIe Gen 3 for the SSD.

4. On rick1, create an SSH key and copy it to the other Pis so rick1 can manage the kit:

   ```bash
   ssh-keygen -t ed25519
   ssh-copy-id <user>@192.168.50.12
   ssh-copy-id <user>@192.168.50.13
   ssh-copy-id <user>@192.168.50.14
   ```

## Step 3: Configure the kit (once, on rick1)

```bash
cd /opt/resgrid-rick
./setup.sh
```

```text
rick1 (edge) address [192.168.50.11]:
rick2 (app) address [192.168.50.12]:
rick3 (data) address [192.168.50.13]:
rick4 (infra) address [192.168.50.14]:
Hotspot router address [192.168.50.1]:
Kit domain [rick.internal]:

==> Kit LAN 192.168.50.0/24, router 192.168.50.1
==> Web https://rg.rick.internal  API https://rgapi.rick.internal  Events https://rgevents.rick.internal  (all on 192.168.50.11)
==> Generating passwords, keys and certificates
==> Creating the Resgrid local certificate authority (10 year validity)
```

Setup writes `.env` (every password and key for the whole kit), the local certificate authority in `certs/` and the kit DNS configuration. Copy the configured checkout to the other nodes:

```bash
./rick.sh sync
```

All four nodes must have the same `.env` and `certs/`. Run `setup.sh` on rick1 only; `./rick.sh sync` copies the result to the others and never touches their `docker-data/`, `backups/` or `bundle/` folders. At the end of the first run setup offers to start the kit straight away; answer `n` until the images and maps are ready (steps 4 and 5).

## Step 4: Download the images (with internet)

```bash
./rick.sh cluster pull
```

To be able to rebuild a node in the field without internet, also save all images to a file and keep it with the kit: `./rick.sh bundle` (on any computer with Docker and the configured checkout), then `./rick.sh load <file>` on a node.

## Step 5: Load the offline map (with internet)

On rick4, import the smallest [Geofabrik extract](https://download.geofabrik.de) that covers your response area:

```bash
./rick.sh maps-import https://download.geofabrik.de/north-america/us/nevada-latest.osm.pbf
```

A US state takes 1–3 hours on a Pi 5 (faster on a PC: import with the single-server stack and copy the volume). Tiles render the first time they are viewed and are cached; browse your area at the zoom levels you use once before deploying.

## Step 6: Start the kit

From rick1:

```bash
./rick.sh rollout
```

`rollout` copies the checkout to every node, pulls the images on each (skipped when offline, or with `RESGRID_NO_PULL=1`), starts the nodes in order (data, infra, app, edge) over SSH, waits until the database is ready, walks you through the **optional features** and ends with a health check. The first start takes 10–20 minutes while rick2 creates the database.

```text
==> Optional features
    Resgrid ships some modules switched off. Answer y to turn a feature on for
    every department on this server, n to turn it off; Enter takes the answer
    in brackets. Run this again any time with: ./rick.sh features

  [1/10] Records (RMS)  (now: off)
        Incident and field records (replaces Logs), records in the Responder, Unit and Dispatch apps,
        prevention (occupancy, inspections, hydrants, permits, community risk reduction),
        investigations, quality review and records analytics.
        After switching it on, a department administrator activates Records in the department settings.
        Turn on Records (RMS)? (y/n) [n]: y
...
==> Records (RMS): on
```

The features (Records, Unified search, Chat, Run cards, virus scanning on rick4, ...) are explained in [Optional features and upgrades](./features-and-upgrades); change them later with `./rick.sh features` on rick1.

To start the kit again later: `./rick.sh cluster start`. On a single node, `./rick.sh start` starts that node's role (it recognises the role from the node's IP address; `./rick.sh role` shows it). Optional services listed in `COMPOSE_PROFILES` in `.env`, such as `maps` on rick4 (added by the map import) and `dns` on rick1, start with it.

```bash
./rick.sh health
```

```text
Kit health (from rick1):
  rick3 data   PostgreSQL 192.168.50.13:5432 ok
  rick4 infra  Redis 192.168.50.14:6379 ok
  rick4 infra  RabbitMQ 192.168.50.14:5672 ok
  rick4 infra  RustFS 192.168.50.14:9000 ok
  rick2 app    API 192.168.50.12:5152 ok
  rick2 app    TTS 192.168.50.12:5154 ok
  rick1 edge   web https://rg.rick.internal ok
  rick1 edge   API https://rgapi.rick.internal ok
  rick1 edge   events https://rgevents.rick.internal ok
  rick4 infra  map tiles 192.168.50.14:5156 ok
```

## Step 7: Set up the command laptop

1. Join the kit WiFi or plug into the switch.
2. Copy the kit's CA certificate to the laptop, for example `scp <user>@192.168.50.11:/opt/resgrid-rick/certs/ca/resgrid-root-ca.crt .`, and install it as a trusted root ([Certificates](./certificates#installing-the-ca-certificate)).
3. Open `https://rg.rick.internal`. The login page works without internet:

   ![Resgrid login page served by the kit with no internet](/img/self-hosted/rick-login-offline.png)

4. Choose **Create an account** to create your department, then add personnel, units, stations and roles ([department setup](../configuration/setup)). The kit sends no email, so set each person's password under **Personnel > Add Person**.
5. Turn sign-up off: set `RESGRID__SystemBehaviorConfig__AllowSignupWithoutBilling=false` in `.env`, then `./rick.sh sync` and `./rick.sh cluster start`.

Dispatching works exactly as online; calls, statuses and locations update live on every connected screen:

![Calls page on the kit, with no internet](/img/self-hosted/rick-calls-offline.png)

## Step 8: Connect responders' phones

Install the **Resgrid Responder** and **Resgrid Unit** apps **before** the phones go offline. Then on each phone:

1. Join the kit WiFi. On Android choose **Stay connected** when it reports no internet, and turn off mobile data. On iPhone allow **Local Network** access when the app asks.
2. On the login screen tap **Change Server URL** (Responder) or **Server URL** (Unit), choose **Custom** and enter `https://rgapi.rick.internal`. The app can take up to 30 seconds to give up on resgrid.com first.
3. Log in with the user name and password from the web app.

Details and troubleshooting: [Connecting the mobile apps](./apps).

| Phone | Kit with the local CA (default) | Kit with a public certificate |
|---|---|---|
| iPhone / iPad | Install `resgrid-root-ca.crt` as a profile and enable it in **Settings > General > About > Certificate Trust Settings** | Works as is |
| Android | Browsers work after installing the CA; the **Responder and Unit apps don't trust user-installed CAs** | Works as is |

What works on phones without internet: dispatches, calls, statuses, staffing, locations, messages and chat **while the app is open**. Not available: push notifications when the app is closed, maps in the apps (Mapbox), address search, voice. Ask responders to keep the app open with **Keep Alive** turned on in the app settings.

## Publicly trusted certificate (Android apps)

Android's Resgrid apps only accept certificates from public certificate authorities. Give the kit a domain you own (e.g. `rick.yourdept.org` as the kit domain in `setup.sh`) and get a Let's Encrypt certificate with a DNS challenge. This works even though the kit is never reachable from the internet: only a temporary DNS record is created at your DNS provider. On rick1, with internet:

```bash
mkdir -p certs/acme
echo 'CF_DNS_API_TOKEN=your-token' > certs/acme/dns.env
RICK_DNS_PROVIDER=cloudflare RICK_ACME_EMAIL=you@yourdept.org ./rick.sh cert
./rick.sh sync && ./rick.sh start && ./rick.sh restart caddy
```

Provider codes and credential names for Cloudflare, Route 53, Azure DNS, Google Cloud DNS and 100+ others: [lego DNS providers](https://go-acme.github.io/lego/dns/). The kit router keeps resolving the three hostnames to rick1.

:::warning Renew every 60 days
Let's Encrypt certificates expire after 90 days. Run `./rick.sh cert` again while the kit is online at least every 60 days (it renews), or phones and browsers will refuse to connect.
:::

## Time

Certificates and logins depend on correct clocks. rick1 serves time to the other nodes; with its RTC battery it keeps time while powered off. Check with `chronyc tracking` on any node, and make sure phones and laptops show the right time.

## Running an incident

```bash
./rick.sh health                 # whole kit, from any node
./rick.sh status                 # this node's services
./rick.sh logs api               # a service's log, on the node that runs it
./rick.sh cluster stop           # before powering off (edge, app, infra, data)
```

Shut down cleanly when you can: `./rick.sh cluster stop`, then `sudo poweroff` on each Pi or the rack's safe-shutdown buttons.

After each deployment, back up on rick3 and copy the file off the kit to an encrypted USB drive:

```bash
./rick.sh backup        # backups/resgrid-<date>.tar.gz: database, .env, certificates
```

## Upgrades (with internet)

Back up first, then on rick1:

```bash
./rick.sh upgrade
```

`upgrade` gets the newest setup files (`git pull`) and runs `./setup.sh` again, which then runs `./rick.sh rollout`. Re-running setup is always safe: it backs up `.env`, adds the settings new versions need (with your node addresses), repairs missing or broken values and files, and `rollout` copies everything to the nodes, pulls the new images, restarts the kit (the worker migrates the database), asks only about new optional features and re-applies yours. It never replaces a value you set or deletes data. Offline, `RESGRID_NO_PULL=1 ./setup.sh` repairs the configuration and restarts with the images on the nodes.

Kits configured before October 2026 (three nodes: web, infra, database) upgrade the same way. Setup maps the old settings onto the four roles (the old web node runs edge and app), and `rollout` copies the old database into the data node once, while the new database is empty, then stops the old containers without removing them. If the old checkout has no `rick.sh upgrade` yet: `cp .env ~/rick-env && git checkout -- .env && git pull && cp ~/rick-env .env && ./setup.sh`. Details: [Upgrade and repair](./features-and-upgrades#upgrade-and-repair).

## Security

- Use WPA2/WPA3 with a strong passphrase and change it for each deployment. The kit LAN is the security boundary.
- The database, Redis, RabbitMQ and RustFS require passwords but listen on the kit LAN so rick1 and rick2 can reach them. For stricter isolation, put responders on a separate guest WiFi network that may reach only rick1 port 443 and the DNS server.
- Store `.env`, `certs/private/` and backups encrypted when the kit is packed away.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `./rick.sh` says no role matches | The Pi's address isn't one of the `RICK_*_HOST` values in `.env`. Check `ip -4 addr` or set `RICK_ROLE`. |
| A health check fails | `./rick.sh status` and `./rick.sh logs <service>` on that node. Containers wait for the other nodes and restart until they are up. |
| Phones can't resolve `rgapi.rick.internal` | Router DNS records are missing, or the phone uses Private DNS, iCloud Private Relay, a VPN or mobile data. |
| Certificate error in a browser | Install the kit CA on that device; check the device's and the kit's clocks. |
| Android app shows a network error at login | Android apps don't trust the local CA. Use a public certificate (above). |
| App logs in but nothing updates | `rgevents.rick.internal` must resolve and be trusted too. |
| Web map is blank | Maps not imported, or rick4 not started with `--profile maps`. |
| `exec format error` | The Resgrid images aren't arm64; see [Raspberry Pi images](#before-you-deploy-raspberry-pi-images). |
