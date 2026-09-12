---
sidebar_position: 3
---

# Windows laptop or desktop

The `laptop` branch runs the current Resgrid Core stack on one Windows computer with Docker Desktop. Use it for local development, evaluation, training, or a single-computer field deployment. It is not a redundant or multi-user production architecture.

Default published ports bind to `127.0.0.1`, so other computers cannot connect unless you intentionally change the Compose bindings and Windows firewall rules.

## Requirements

- 64-bit Windows 10 or Windows 11 with virtualization enabled.
- Docker Desktop using Linux containers and the WSL2 backend.
- PowerShell 7 or Windows PowerShell 5.1.
- Git for Windows.
- At least 4 CPU cores, 16 GB RAM, and 20 GB free storage.
- Administrator access once to edit the Windows hosts file.

For a field computer, use encrypted storage and keep backups on separate encrypted removable media. There is no automatic failover if the computer or its storage is damaged.

## Install from PowerShell

Start Docker Desktop, then open PowerShell:

```powershell
git clone --branch laptop https://github.com/Resgrid/resgrid-setup.git resgrid
Set-Location .\resgrid
Set-ExecutionPolicy -Scope Process Bypass
.\setup.ps1
```

`setup.ps1` checks Docker Desktop, generates unique infrastructure passwords and Resgrid encryption keys, creates new OpenIddict certificates with .NET, writes `.env`, creates data directories, and starts Compose.

To configure without pulling or starting images:

```powershell
.\setup.ps1 -NoStart
```

Custom local hostnames:

```powershell
.\setup.ps1 `
  -WebHost dispatch.mylocal `
  -ApiHost dispatchapi.mylocal `
  -EventsHost dispatchevents.mylocal
```

If you prefer WSL2, run `bash setup.sh` from the checkout; the script defaults to downloading the `laptop` branch.

## Configure local name resolution

Open Notepad as Administrator and edit:

```text
C:\Windows\System32\drivers\etc\hosts
```

Add the line printed by setup. With default names:

```text
127.0.0.1  rg.mylocal rgapi.mylocal rgevents.mylocal
```

Open these URLs and accept Caddy's internal certificate for each hostname:

- `https://rg.mylocal`
- `https://rgapi.mylocal/api/health/getcurrent`
- `https://rgevents.mylocal`

The web client cannot use the API until the API certificate is accepted or Caddy's local root certificate is installed in Windows Trusted Root Certification Authorities.

## Verify first start

The worker creates and migrates the main, OIDC, worker, and document PostgreSQL databases:

```powershell
docker compose ps
docker compose logs -f worker
```

When migrations settle, open `https://rg.mylocal` and use **Sign Up**. There is no shared default administrator login.

Local diagnostic ports are:

| Service | Address |
|---|---|
| Web | `http://127.0.0.1:5151` |
| API | `http://127.0.0.1:5152` |
| Events | `http://127.0.0.1:5153` |
| TTS | `http://127.0.0.1:5154` |
| MCP | `http://127.0.0.1:5155/mcp` |
| RabbitMQ management | `http://127.0.0.1:5160` |

MCP's transport endpoint is unauthenticated; the loopback binding is intentional.

## Optional services

Tracker gateway:

```powershell
docker compose --profile tracking up -d
```

Configure `RESGRID__UnitTrackingConfig__*` first. Tracker ports listen on network interfaces so physical devices can connect; review Windows firewall rules.

Inbound-email relay:

```powershell
docker compose --profile relay up -d
```

Configure the relay department and mail domains first. The SMTP listener has no authentication or TLS and opens port 25.

## Update

```powershell
docker compose pull
docker compose up -d
docker compose logs -f worker
```

Do not remove every Docker image; that affects unrelated local projects and is unnecessary.

## Backup and rollback

Back up `.env` and the `docker-data` directory to separate encrypted storage. `.env` contains encryption and OIDC material required by existing data. Create a consistent database dump:

```powershell
docker compose exec -T db pg_dumpall -U resgrid | Out-File -Encoding utf8 .\resgrid-backup.sql
```

Before upgrading, record the current image digests and keep the pre-upgrade dump. Rolling back containers alone may be unsafe after worker schema migrations; restore the compatible database dump and matching `.env` before starting older images.

## Mapping and offline use

The default Leaflet setting uses the public OpenStreetMap tile service for initial testing only. It is not an offline map and is not intended for bulk or operational use. Configure an approved map provider or a separately prepared local tile service before deploying the laptop without internet access.
