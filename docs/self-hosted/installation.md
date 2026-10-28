---
sidebar_position: 2
title: Installation (single server)
---

# Self-hosted installation

Resgrid Core is open source and can run on your own hardware. The [resgrid-setup repository](https://github.com/Resgrid/resgrid-setup) has four ready-made, tested deployments; pick the one that matches where Resgrid will run:

| Deployment | Branch | Use it for | Runs on | Network |
|---|---|---|---|---|
| **Single server** (this page) | `master` | A department or agency server | One 64-bit Linux server with Docker | LAN or internet |
| [Windows laptop](./laptop) | `laptop` | One person on one computer: a command post laptop, a disconnected incident, training | Windows 10/11 + Docker Desktop | Fully offline after setup; local browser only |
| [Kubernetes / k3s](./multi) | `multi` | Production across several servers, scaling, maintenance without downtime | A Kubernetes or k3s cluster | LAN or internet |
| [Incident Command Kit (RICK)](./rick) | `rick` | A portable, battery-powered kit for a base camp or command vehicle | 4 × Raspberry Pi 5 + WiFi hotspot router | Fully offline; responders' phones join the hotspot |

All four run the same Resgrid services and use the same configuration settings; they differ in how the services are spread out and reached. Whichever you choose, also read [Certificates](./certificates) and [Connecting the mobile apps](./apps).

:::danger Warranty and operational responsibility
The self-hosted version is provided without warranty or a guarantee of suitability. The supplied deployments are a starting point, not a substitute for capacity planning, security review, monitoring, tested backups and a recovery plan. Never run a real system on the template credentials.
:::

<AcademyVideo id="23-self-hosting" />

## What runs

<img src="/img/self-hosted/single-server.svg" alt="Single-server stack: Caddy routes the three Resgrid hostnames to the web app, API and events hub, which use PostgreSQL, Redis, RabbitMQ and RustFS" />

| Service | Purpose | Port on the server |
|---|---|---|
| `caddy` | HTTPS for the three Resgrid hostnames, with automatic certificates | 80, 443 |
| `web` | The Resgrid web application | 5151 |
| `api` | REST API used by the web app and the mobile apps; also the login (OpenID Connect) server | 5152 |
| `events` | Real-time updates (SignalR) | 5153 |
| `worker` | Background jobs, notifications and the **database schema migrations** | — |
| `tts` | Text-to-speech for dispatch audio | 5154 |
| `mcp` | Model Context Protocol server for AI assistants | 5155 (LAN only) |
| `db` | PostgreSQL 18: `resgrid`, `resgridoidc`, `resgridworkers`, `resgriddoc` | 127.0.0.1:5432 |
| `redis` | Cache, real-time backplane, web session keys | — |
| `rabbitmq` | Message bus | 127.0.0.1:5160 (management UI) |
| `rustfs` | S3-compatible object storage (TTS audio, imports) | — |

Optional: offline map tiles (`maps` profile), hardware GPS trackers (`tracking`), inbound email dispatch (`relay`). MongoDB and Microsoft SQL Server are no longer used; every database is PostgreSQL.

## Requirements

- A 64-bit Linux server. Ubuntu Server 24.04 LTS or Debian 12/13 is a good baseline.
- [Docker Engine](https://docs.docker.com/engine/install/) with the Compose v2 plugin, plus `openssl` and `git` (or `curl`).
- At least 4 CPU cores, 8 GB RAM (16 GB recommended) and 40 GB of disk. The stack idles at about 1 GB of RAM; size production systems from measured load and retention.
- Three hostnames that resolve to the server: **web**, **API** and **events**, for example `dispatch.example.com`, `dispatchapi.example.com`, `dispatchevents.example.com`.
- TCP 80 and 443 to the server.
- Internet access during installation (about 6 GB of images).
- An SMTP server or Postmark account if Resgrid must send email.

The infrastructure images are Docker Hardened Images from `dhi.io`. If a pull reports an authorization error run `docker login dhi.io`; if Docker Hub reports `429 Too Many Requests`, run `docker login` (anonymous pulls are rate limited).

## Step 1: Prepare the server

Install Docker and check it works:

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER      # log out and back in
docker info
docker compose version
openssl version
```

Create the DNS records for your three hostnames (A records to the server's address). For a LAN-only server without DNS you can use the defaults `rg.mylocal`, `rgapi.mylocal`, `rgevents.mylocal` and add them to each client's hosts file later.

## Step 2: Run the installer

```bash
curl -fsSL https://raw.githubusercontent.com/Resgrid/resgrid-setup/master/setup.sh | bash
```

The installer downloads the stack to `~/resgrid` and asks four questions:

```text
==> Configuration (press Enter to accept the defaults).
Web app hostname [rg.mylocal]: dispatch.example.com
API hostname [rgapi.mylocal]: dispatchapi.example.com
Events hostname [rgevents.mylocal]: dispatchevents.example.com
Let's Encrypt email ('internal' = local CA, for LAN/offline) [internal]: admin@example.com
```

- Give an **email address** when the server is reachable from the internet with public DNS: Caddy gets and renews Let's Encrypt certificates for all three hostnames.
- Answer **internal** for LAN-only or offline servers: Resgrid's own certificate authority issues the certificates, and you install its certificate on each client once ([Certificates](./certificates)).

It then generates every password, passphrase and encryption key into `.env`, creates the OpenID Connect certificates and the local certificate authority (`certs/`), pulls the images, starts the stack and waits until Resgrid answers:

```text
==> Generating passwords, keys and certificates...
==> Creating the Resgrid local certificate authority (10 year validity)...
==> Configuration written to /home/admin/resgrid/.env (it holds all your secrets: back it up and keep it private).
==> Pulling container images (the first run downloads several GB)...
==> Starting Resgrid...
==> Waiting for Resgrid to answer (the first start creates the database, this can take 5-10 minutes)...
==> Resgrid is up.
==> Waiting for the database migration to finish...
```

Last, it walks you through the **optional features**: modules such as Records, Unified search and Chat that ship switched off. One question per feature turns on every flag, setting and extra service it needs ([Optional features and upgrades](./features-and-upgrades)):

```text
==> Optional features
    Resgrid ships some modules switched off. Answer y to turn a feature on for
    every department on this server, n to turn it off; Enter takes the answer
    in brackets. Run this again any time with: ./setup.sh features

  [1/10] Records (RMS)  (now: off)
        Incident and field records (replaces Logs), records in the Responder, Unit and Dispatch apps,
        prevention (occupancy, inspections, hydrants, permits, community risk reduction),
        investigations, quality review and records analytics.
        After switching it on, a department administrator activates Records in the department settings.
        Turn on Records (RMS)? (y/n) [n]: y
...
==> Records (RMS): on
```

```text
  Open:   https://dispatch.example.com
          then choose "Sign Up" to create the first account and department.
```

Unattended installs can answer every question with a variable:

```bash
RESGRID_WEB_HOST=dispatch.example.com \
RESGRID_API_HOST=dispatchapi.example.com \
RESGRID_EVENTS_HOST=dispatchevents.example.com \
RESGRID_TLS=admin@example.com \
RESGRID_FEATURES=records,search \
bash setup.sh
```

Other variables: `RESGRID_INSTALL_DIR`, `RESGRID_HTTP_PORT` / `RESGRID_HTTPS_PORT` (if 80/443 are taken; Let's Encrypt then can't be used), `RESGRID_TLS_CERT_FILE` + `RESGRID_TLS_KEY_FILE` (your own certificate), `RESGRID_FEATURES` (optional features, comma separated, or `all` / `none`), `RESGRID_NONINTERACTIVE=1` (never ask), `RESGRID_NO_START=1` (configure only).

:::caution
`.env` holds every secret, including the encryption key for stored data and the token signing certificates. Back it up somewhere safe and private. Losing it makes encrypted data and existing logins unrecoverable.
:::

## Step 3: Create your department

1. Open `https://<web hostname>`. The login page has a **Create an account** button.

   ![Resgrid login page with the Create an account button](/img/self-hosted/login.png)

2. Fill in your name, email, the department name and type, a user name and a password, then choose **Register**.

   ![Sign up form filled in for the first department](/img/self-hosted/sign-up.png)

3. You are signed in to your new department as its administrator.

   ![Resgrid dashboard after signing up](/img/self-hosted/dashboard.png)

There is no default administrator account; Sign Up creates the department and its first administrator. Self-hosted sign-up is enabled by `RESGRID__SystemBehaviorConfig__AllowSignupWithoutBilling=true` in `.env`. Once your department exists, set it to `false` and run `docker compose up -d` in `~/resgrid`, so nobody else can create departments on your server. Add people with **Personnel > Add Person** or invitations.

Continue with the [department setup guide](../configuration/setup): stations, units, roles, statuses, and then [connect the mobile apps](./apps).

## Step 4: Check that everything works

Create a test call: **Calls > New Call**, enter a name, nature and location, then **Create Call**. It appears under **Active Calls** and on the map, and every open browser and app updates in real time.

![The Calls page showing a newly created call](/img/self-hosted/calls.png)

From the server:

```bash
cd ~/resgrid
docker compose ps                  # every service "running"; db, redis, rabbitmq "healthy"
docker compose logs -f worker      # migrations and background jobs
curl -k https://<api hostname>/health
```

## Configuration

Everything is in `~/resgrid/.env`. Resgrid settings use the pattern `RESGRID__{ConfigClass}__{FieldName}` and map to the static classes in [Core/Resgrid.Config](https://github.com/Resgrid/Core/tree/master/Core/Resgrid.Config); see the [Docker reference](../reference/docker). After editing, run `docker compose up -d` and Compose recreates the containers whose settings changed.

The settings you are most likely to change:

| Setting | Purpose |
|---|---|
| `RESGRID__OutboundEmailServerConfig__Host`, `Port`, `UserName`, `Password`, `EnableSsl`, `FromMail` | SMTP for invitations, password resets and notifications (no mail server is included) |
| `RESGRID__MappingConfig__LeafletTileUrl` | Map tiles for the web map. The OpenStreetMap default is for testing only; use a tile provider or offline maps |
| `RESGRID__MappingConfig__GoogleMapsApiKey`, `What3WordsApiKey` | Optional geocoding |
| `RESGRID__MappingConfig__ResponderAppMapboxKey`, `UnitAppMapBoxKey` | Map tiles in the mobile apps (Mapbox) |
| `RESGRID__WebConfig__RecaptchaPublicKey`, `RecaptchaPrivateKey` | reCAPTCHA on Sign Up and Forgot Password for internet-facing servers |
| `RESGRID__SystemBehaviorConfig__AllowSignupWithoutBilling` | `false` after your department exists |

## Optional services

**Offline maps** (`maps` profile): import an OpenStreetMap extract for your area once, while online, and the web map no longer needs a tile provider:

```bash
cd ~/resgrid
./maps/import.sh https://download.geofabrik.de/north-america/us/nevada-latest.osm.pbf
```

Pick the smallest [Geofabrik extract](https://download.geofabrik.de) that covers your area (a US state takes 10–60 minutes). The import adds `maps` to `COMPOSE_PROFILES` in `.env`, so the tile server starts with the stack from then on.

Optional services run while their [Compose profile](https://docs.docker.com/compose/how-tos/profiles/) is listed in `COMPOSE_PROFILES` in `.env` (comma separated); `docker compose up -d` reads that setting itself.

**Virus scanning** (`clamav` profile): turned on with the *Attachment virus scanning* [optional feature](./features-and-upgrades).

**GPS trackers** (`tracking` profile): set `RESGRID__UnitTrackingConfig__Enabled`, `NativeGatewayEnabled` and at least one of `EnableQueclink`, `EnableGt06`, `EnableTeltonika` to `true`, add `tracking` to `COMPOSE_PROFILES`, then `docker compose up -d`. Trackers connect to TCP/UDP 5004 (Queclink), 5023 (GT06) and 5027 (Teltonika).

**Inbound email dispatch** (`relay` profile): set `RESGRID__RELAY__Resgrid__DepartmentId` and the dispatch domain, point the domain's MX record at the server, add `relay` to `COMPOSE_PROFILES`, then `docker compose up -d`. The relay accepts any sender (no TLS or SMTP authentication): firewall port 25.

**MCP** for AI assistants listens on port 5155. Users log in inside the protocol, but the HTTP endpoint itself is unauthenticated: keep the port on your LAN or VPN.

## Operations

```bash
cd ~/resgrid
docker compose ps                  # status
docker compose logs -f api         # logs of one service
docker compose restart web         # restart one service
docker compose down                # stop everything; data stays in Docker volumes
docker compose up -d               # start
```

### Optional features

```bash
./setup.sh features
```

turns optional modules such as Records, Unified search, Chat, Run cards and virus scanning on or off for every department on the server. See [Optional features and upgrades](./features-and-upgrades).

### Upgrades

```bash
cd ~/resgrid
./setup.sh upgrade
```

or the install one-liner again. Re-running setup is the upgrade and is always safe: it gets the newest setup files, backs up `.env`, adds the settings introduced since you installed (new secrets get random values) and repairs missing or broken ones, pulls the new images, starts new services and restarts; the worker migrates the database. It never replaces a value you set or deletes data, and asks only about optional features that are new. Details: [Upgrade and repair](./features-and-upgrades#upgrade-and-repair). Back up first: rolling back after a migration needs the matching database backup.

### Backups

Back up the database, `.env` and `certs/`:

```bash
mkdir -p backups
docker compose exec -T db sh -c 'pg_dumpall -U "$POSTGRES_USER" --clean --if-exists' | gzip > backups/resgrid-$(date +%F).sql.gz
cp .env backups/env-$(date +%F)
tar -czf backups/certs-$(date +%F).tar.gz certs
```

Restore onto an install with the same `.env` and `certs/`:

```bash
docker compose stop web api events worker tts mcp
gunzip -c backups/resgrid-2026-10-27.sql.gz | docker compose exec -T db sh -c 'psql -q -U "$POSTGRES_USER" -d postgres'
docker compose up -d
```

Messages that a role or database "already exists" during a restore are expected.

### Upgrading an install created before October 2026

Run the one-liner or `./setup.sh upgrade` as for any upgrade. Setup recognizes the old layout: it keeps the `.env` that older versions tracked in git across the `git pull`, renames the `NGINX_*` settings, switches the services to their new names and ports, and copies the data of installs up to April 2025 (`docker-data/sql`, PostgreSQL 17) into the new PostgreSQL 18 database, once and only while the new database is empty. The old folder isn't changed and a dump is kept in `backups/`. See [Upgrading an install created before October 2026](./features-and-upgrades#upgrading-an-install-created-before-october-2026).

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| Certificate warning in the browser | `internal` certificates: install `certs/ca/resgrid-root-ca.crt` on the device ([Certificates](./certificates)). Accepting the warning for the web hostname alone is not enough, because the web app also calls the API and events hostnames. |
| Login works but chat, maps or live updates don't | The API or events hostname doesn't resolve on that client or isn't trusted. Open `https://<api hostname>/health` and `https://<events hostname>/health/GetCurrent` from the same device. |
| Containers restart during the first minutes | Normal while PostgreSQL, RabbitMQ and the migrations come up; follow `docker compose logs -f worker`. |
| `port is already allocated` for 80 or 443 | Another web server (IIS, Apache, nginx) holds the port. Stop it or set `RESGRID_HTTP_PORT` / `RESGRID_HTTPS_PORT`. |
| `password authentication failed for user "resgrid"` | The Docker volumes are from an earlier install with a different `.env`. Restore that `.env`, or delete the old data with `docker compose down -v` (destroys it). |
| Sign Up sends you back to the login page | `RESGRID__SystemBehaviorConfig__AllowSignupWithoutBilling` isn't `true`, or `RESGRID__ApiConfig__BackendInternalApikey` is empty (run `./setup.sh upgrade`). |
| web, api or events exit mentioning `BypassSslChecks` | It must be `false`; the containers trust the local CA instead. `./setup.sh upgrade` fixes it. |
| Worker logs `transient_nonexcl_queues is deprecated` | RabbitMQ 4 is missing `rabbitmq/rabbitmq.conf`; use the repository's `docker-compose.yml`. |
| Worker logs `ConstraintExists is not supported by the connectionless processor` | `RESGRID__DataConfig__CoreConnectionString` is empty; set it to the same value as `ConnectionString`. |
