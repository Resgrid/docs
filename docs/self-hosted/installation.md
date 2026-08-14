---
sidebar_position: 2
---

# Self-hosted installation

Resgrid Core has four maintained deployment layouts in the [resgrid-setup repository](https://github.com/Resgrid/resgrid-setup). Choose the layout that matches the environment; the branches are intentionally different and are not interchangeable.

| Branch | Use case | Orchestrator | Hosts |
|---|---|---|---|
| `master` | General self-hosted evaluation or small single-server install | Docker Compose | One 64-bit Linux server (Windows/macOS through WSL2 is also supported) |
| `laptop` | Local Windows development, training, or single-computer field use | Docker Desktop Compose | One Windows 10/11 computer |
| `rick` | Portable Resgrid Incident Command Kit | Compose split into database, infrastructure, and application roles | Three 64-bit Raspberry Pi-class nodes; current app images use AMD64 emulation on the web Pi |
| `multi` | Kubernetes or k3s | Kustomize (`kubectl apply -k`) | A cluster with persistent storage, ingress, and at least one AMD64 worker |

See [Windows laptop](./laptop), [RICK](./rick), or [Kubernetes/k3s](./multi) for those specialized layouts. The rest of this page covers `master`.

:::danger Warranty and operational responsibility
The self-hosted version is provided without warranty or a guarantee of suitability. The supplied manifests are a starting point, not a substitute for capacity planning, security review, monitoring, tested backups, or a disaster-recovery plan. Do not use template credentials in a real deployment.
:::

## What the single-server stack runs

The current stack includes the web application, API, events hub, background worker and database migrations, text-to-speech service, MCP server, PostgreSQL, Redis, RabbitMQ, RustFS object storage, and Caddy ingress. Hardware GPS tracking and inbound-email dispatch are optional Compose profiles.

MongoDB and Microsoft SQL Server are no longer part of the standard stack. The main, OIDC, worker, and document databases all use PostgreSQL.

## Requirements

- A 64-bit Linux server. Ubuntu Server 24.04 LTS is a practical baseline.
- Docker Engine and Docker Compose v2.
- OpenSSL, Git or curl, and outbound registry access during installation.
- At least 4 CPU cores, 16 GB RAM, and 40 GB storage for evaluation. Size production systems from measured workload and retention needs.
- Three hostnames that resolve to the server: web, API, and events.
- TCP 80/443 to the server or an upstream load balancer/reverse proxy.
- An SMTP or Postmark account if the installation must send email.

The stack uses Docker Hardened Images from `dhi.io`. If a pull reports an authorization error, authenticate with a Docker account entitled to those images before continuing:

```bash
docker login dhi.io
```

## Automated install

With Docker running:

```bash
curl -fsSL https://raw.githubusercontent.com/Resgrid/resgrid-setup/master/setup.sh | bash
```

The installer downloads the `master` branch, asks for the three hostnames and TLS mode, creates unique infrastructure/application secrets, generates new OpenIddict signing and encryption certificates, writes `.env`, and starts the stack.

For a LAN-only evaluation, accept the defaults (`rg.mylocal`, `rgapi.mylocal`, `rgevents.mylocal`, and `internal`). Add all three names to every client's hosts file, pointing at the server address:

```text
192.168.1.50  rg.mylocal rgapi.mylocal rgevents.mylocal
```

For an internet-reachable install, use real DNS records and provide an email address so Caddy can request certificates. Ports 80 and 443 must reach Caddy.

Non-interactive example:

```bash
RESGRID_WEB_URL=dispatch.example.com \
RESGRID_API_URL=dispatchapi.example.com \
RESGRID_EVENTS_URL=dispatchevents.example.com \
RESGRID_LETSENCRYPT_EMAIL=admin@example.com \
bash setup.sh
```

Set `RESGRID_NO_START=1` to generate configuration without pulling or starting containers.

## First-start verification

The worker creates and migrates four databases. First start may take several minutes:

```bash
cd ~/resgrid
docker compose ps
docker compose logs -f worker
```

For an internal certificate, open and accept the certificate for the web, API, and events hostnames. The web client cannot log in if the API/events certificates are still rejected by the browser.

When migrations settle, open the web hostname and use **Sign Up** to create the first account and department. Current releases do not use a shared default administrator login.

Useful endpoints with the template ports:

| Purpose | Endpoint |
|---|---|
| Web through Caddy | `https://rg.mylocal` |
| API health | `https://rgapi.mylocal/api/health/getcurrent` |
| Web direct diagnostic port | `http://SERVER:5151` |
| API direct diagnostic port | `http://SERVER:5152` |
| Events direct diagnostic port | `http://SERVER:5153` |
| RabbitMQ management | `http://SERVER:5160` |

MCP's HTTP transport is unauthenticated and published on port 5155 for LAN use. Do not expose it directly to the internet.

## Optional services

After configuring `RESGRID__UnitTrackingConfig__*` in `.env`:

```bash
docker compose --profile tracking up -d
```

The profile opens the Queclink, GT06, and Teltonika TCP/UDP ports. Restrict them to expected tracker source networks.

After configuring the relay's department and mail-domain settings:

```bash
docker compose --profile relay up -d
```

The relay opens SMTP port 25 and has no SMTP authentication or TLS. Put a filtering MTA or firewall in front of it.

## Operations

```bash
docker compose ps
docker compose logs -f SERVICE
docker compose down
docker compose pull
docker compose up -d
```

An upgrade is `pull` followed by `up -d`; do not delete every Docker image on the host. The worker applies database migrations during startup.

## Backup and rollback

Back up `.env` and keep it encrypted. It contains keys required to decrypt existing data/tokens and to validate OIDC credentials. Take a consistent PostgreSQL dump rather than copying the live database directory:

```bash
docker compose exec -T db pg_dumpall -U resgrid > "resgrid-$(date +%F).sql"
```

Also back up RustFS and Caddy data according to your storage and certificate requirements.

Before upgrading, retain the previous image digests and a pre-upgrade database dump. Rolling application containers back does not reverse schema migrations. If an older release is incompatible with the migrated schema, restore the database backup and matching `.env` before starting the older images.

## Configuration reference

Container settings use double-underscore environment names such as `RESGRID__DataConfig__DatabaseType`. See [Docker configuration](../reference/docker) for the complete reference. Common pitfalls:

- Enum values are numeric.
- `CoreConnectionString` is required and normally matches `ConnectionString`.
- `DocDatabaseType=1` selects PostgreSQL.
- `DODBUPGRADE=true` belongs on the worker.
- Some historical field names intentionally contain spelling errors, including `RabbbitPassword` and `ExternalAudioUrlParamPasshprase`; match them exactly.
