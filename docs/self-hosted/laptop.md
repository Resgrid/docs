---
sidebar_position: 3
title: Windows laptop (offline)
---

# Resgrid on a Windows laptop (offline)

The `laptop` branch of [resgrid-setup](https://github.com/Resgrid/resgrid-setup/tree/laptop) runs the complete Resgrid system on **one Windows 10 or 11 computer** with Docker Desktop. After a one-time setup while online it works **with no network connection at all**. One person uses Resgrid in a browser on that computer: an incident commander's laptop at a disconnected incident, a backup dispatch position, a training classroom, or simply to evaluate Resgrid.

How it differs from a server install:

- Every port listens on `127.0.0.1` only: other computers and phones can't connect. For several users or phones on a local network use the [single server](./installation) or the [Incident Command Kit](./rick).
- The hostnames are `rg.localhost`, `rgapi.localhost` and `rgevents.localhost`. Chrome, Edge and Firefox always resolve `*.localhost` to the computer itself, so **no hosts-file edit and no administrator rights** are needed.
- HTTPS comes from a local certificate authority that setup creates and trusts for your Windows account.
- `resgrid.ps1` handles start/stop, backups, restores, upgrades and offline maps.

## Requirements

- Windows 10 22H2 or Windows 11, 64-bit, with hardware virtualization enabled (check *Task Manager > Performance > CPU > Virtualization: Enabled*).
- [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) using the WSL 2 backend and Linux containers (the defaults). Docker Desktop is free for personal use, education and small businesses; larger organizations need a subscription.
- 4 CPU cores, 8 GB RAM (16 GB recommended), 25 GB of free disk plus 5–20 GB for offline maps.
- Internet access during setup (about 6 GB of downloads).

## Step 1: Install Docker Desktop

1. Install Docker Desktop and restart Windows if asked.
2. Start Docker Desktop and wait until the bottom-left corner shows **Engine running**.
3. In **Settings > General** turn on **Start Docker Desktop when you sign in to your computer**. Resgrid then starts automatically with Windows.

## Step 2: Download Resgrid

Open **PowerShell** (Start menu, type *PowerShell*):

```powershell
git clone --branch laptop https://github.com/Resgrid/resgrid-setup.git $HOME\resgrid
cd $HOME\resgrid
```

Without git: download [the laptop branch zip](https://github.com/Resgrid/resgrid-setup/archive/refs/heads/laptop.zip), extract it to `C:\Users\<you>\resgrid`, then in PowerShell:

```powershell
cd $HOME\resgrid
Get-ChildItem -Recurse | Unblock-File
```

## Step 3: Run setup

```powershell
powershell -ExecutionPolicy Bypass -File .\setup.ps1
```

To load an offline map of your area in the same step, add the [Geofabrik](https://download.geofabrik.de) extract that covers it:

```powershell
powershell -ExecutionPolicy Bypass -File .\setup.ps1 -MapRegion https://download.geofabrik.de/north-america/us/nevada-latest.osm.pbf
```

Setup:

1. Checks that Docker Desktop is running Linux containers.
2. Picks the ports: 443 and 80, or 8443/8080 (or the next free ones) when IIS or another program already uses them.
3. Generates every password, encryption key and certificate into `.env`.
4. Creates the Resgrid local certificate authority and asks Windows to trust it for your account. **Windows shows a security warning asking whether to install a certificate from "Resgrid Local CA": choose Yes.**
5. Downloads the images, starts Resgrid and waits until it answers.
6. Walks you through the **optional features** (Records, Unified search, Chat, Run cards, ...): one question per feature, which turns on everything the feature needs ([Optional features and upgrades](./features-and-upgrades)). Then it opens Resgrid in your browser.

```text
==> Checking Docker Desktop
==> Generating passwords, keys and certificates
==> Creating the Resgrid local certificate authority (10 year validity)
==> Configuration written to .env. It holds all your secrets: back it up (.\resgrid.ps1 backup) and keep it private.
==> Trusting the Resgrid local CA for your Windows account (answer Yes in the Windows prompt)
==> Downloading container images (several GB the first time)
==> Starting Resgrid
==> Waiting for Resgrid to answer (the first start creates the database, 5-10 minutes)
.....==> Resgrid is up.

  Resgrid:  https://rg.localhost
  Choose 'Sign Up' to create the first account and department.
```

Options: `-HttpsPort` / `-HttpPort` (choose ports), `-WebHost` / `-ApiHost` / `-EventsHost` (other hostnames; names not ending in `.localhost` need the hosts-file line setup prints), `-NoTrustCa` (don't change the Windows certificate store), `-Features records,search` (optional features without questions; `all` or `none`), `-NonInteractive`, `-NoPull`, `-NoStart`, `-NoBrowser`.

If setup had to use port 8443, the address is `https://rg.localhost:8443`; `.\resgrid.ps1 status` always prints it.

## Step 4: Create your department

In the browser choose **Create an account**, fill in your name, email, department name and type, user name and password, and choose **Register**. You are signed in as the department's administrator.

![Resgrid dashboard running on the laptop](/img/self-hosted/laptop-dashboard.png)

Then set up the department ([setup guide](../configuration/setup)). Because the laptop works offline and sends no email, add people under **Personnel > Add Person** and set their passwords there.

:::tip Firefox
Chrome and Edge trust the local CA right away. If Firefox still shows a certificate warning, open `about:config` and set `security.enterprise_roots.enabled` to `true`.
:::

## Everyday use

Open PowerShell in the install folder (`cd $HOME\resgrid`):

| Command | What it does |
|---|---|
| `.\resgrid.ps1 open` | Open Resgrid in the browser |
| `.\resgrid.ps1 status` | Show every service and the Resgrid address |
| `.\resgrid.ps1 stop` / `start` | Stop / start (data is kept) |
| `.\resgrid.ps1 logs worker` | Follow a service's log (`web`, `api`, `events`, `worker`, `caddy`, …) |
| `.\resgrid.ps1 backup` | Database, `.env` and certificates into `backups\resgrid-<date>.zip` |
| `.\resgrid.ps1 restore <zip>` | Replace the data with a backup (asks you to type `RESTORE`) |
| `.\resgrid.ps1 maps-import <url or file>` | Load an offline map region |
| `.\resgrid.ps1 features` | Turn optional features (Records, Search, Chat, ...) on or off |
| `.\resgrid.ps1 upgrade` | Newest setup files, images and settings; repairs the install (needs internet) |
| `.\resgrid.ps1 trust-ca` | Trust the local CA again (e.g. for a new Windows user) |
| `.\resgrid.ps1 uninstall [-DeleteData]` | Remove the containers (and, with `-DeleteData`, all data) |

If PowerShell refuses to run the script, use `powershell -ExecutionPolicy Bypass -File .\resgrid.ps1 <command>`.

## Offline maps

The web map needs map tiles. Online it can use a tile provider; offline it uses the tile server that runs on the laptop. Import your area while you still have internet:

```powershell
.\resgrid.ps1 maps-import https://download.geofabrik.de/north-america/us/nevada-latest.osm.pbf
```

or a file you downloaded: `.\resgrid.ps1 maps-import C:\Downloads\nevada-latest.osm.pbf`. Choose the smallest extract that covers your area: a US state takes 10–60 minutes to import and 5–20 GB of disk. The command starts the tile server and points the web map at `https://rg.localhost/tiles/...`.

![Resgrid web map with tiles from the offline tile server](/img/self-hosted/offline-map.png)

Tiles are drawn the first time an area is viewed and cached afterwards. Before you go offline, browse your area at the zoom levels you will use so they are ready. The tile server starts with Resgrid from then on (`maps` in `COMPOSE_PROFILES` in `.env`).

## What works offline

Everything Resgrid needs runs on the laptop. Without internet:

- **Works**: calls and dispatches, units, personnel, statuses and staffing, maps (with offline tiles), messages, logs, reports, shifts, calendar, documents, text-to-speech.
- **Doesn't**: email (invitations, password resets, notifications), push notifications, SMS and voice, address search (geocoding) and routing on the map, map tiles outside the imported area. Some pages use Google web fonts and fall back to Windows fonts.

## Backups and moving to another laptop

`.\resgrid.ps1 backup` writes a zip with the database dump, `.env` (as `env.txt`) and the certificates. It contains every secret: keep it on encrypted removable storage, away from the laptop.

To move Resgrid to another laptop: install Docker Desktop and download the laptop branch there, run `setup.ps1 -NoStart`, replace `.env` with `env.txt` from the backup and the `certs` folder with the backup's `certs`, then `.\resgrid.ps1 start` and `.\resgrid.ps1 restore <zip>`.

## Upgrades

With internet, after a backup:

```powershell
.\resgrid.ps1 upgrade
```

`upgrade` gets the newest setup files (`git pull`; without git, extract the newest laptop branch zip over the folder first) and runs `setup.ps1` again. Running `setup.ps1` again is always safe: it saves a copy of `.env`, adds the settings new versions need and repairs broken ones, keeps the data of older versions, downloads the new images, restarts (the database is migrated automatically) and asks only about optional features that are new. It never replaces a value you set or deletes data. Without internet, `.\setup.ps1 -NoPull` repairs and restarts with the images you have. Details: [Upgrade and repair](./features-and-upgrades#upgrade-and-repair).

## Troubleshooting

| Symptom | Fix |
|---|---|
| `Docker Desktop is not running` | Start Docker Desktop, wait for **Engine running**, run the command again. |
| `Docker Desktop is using Windows containers` | Right-click the Docker tray icon, **Switch to Linux containers**. |
| Certificate warning | `.\resgrid.ps1 trust-ca`, then restart the browser. Firefox: see the tip above. |
| Browser can't find `rg.localhost` | Use Chrome, Edge or Firefox. Other browsers may need hosts-file entries. |
| Sign Up returns to the login page | Run `.\resgrid.ps1 upgrade` (adds `RESGRID__SystemBehaviorConfig__AllowSignupWithoutBilling=true`). |
| `429 Too Many Requests` during setup | Docker Hub rate limit: sign in to Docker Desktop and run setup again. |
| `password authentication failed for user "resgrid"` | Data from an earlier install with a different `.env`. Restore that `.env`, or run `.\resgrid.ps1 uninstall -DeleteData` and set up again. |
