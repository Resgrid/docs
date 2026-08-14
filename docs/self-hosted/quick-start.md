---
sidebar_position: 1
---

# Quick start

This quick start runs the current Resgrid Core stack on one 64-bit Linux server for evaluation or a small self-hosted environment. For Windows, Raspberry Pi RICK, and Kubernetes/k3s layouts, start with the [deployment comparison](./installation).

:::danger Evaluation is not production readiness
The stack has single instances of its database, cache, message bus, and object store. Production use requires security review, monitoring, capacity planning, tested backups, and a recovery plan. Never deploy the committed template credentials.
:::

## 1. Prepare the host

Install Docker Engine, Docker Compose v2, OpenSSL, and curl on a 64-bit Linux server. Ubuntu Server 24.04 LTS is a practical baseline. Start Docker and verify:

```bash
docker info
docker compose version
openssl version
```

Plan three hostnames that all resolve to the server:

- Web, for example `dispatch.example.com`
- API, for example `dispatchapi.example.com`
- Events, for example `dispatchevents.example.com`

For an internet deployment, forward TCP 80/443 and create real DNS records. For a LAN-only test, the installer defaults to `.mylocal` names and Caddy's internal certificate.

The infrastructure images come from `dhi.io`. If image pulls report an authorization error, authenticate with an entitled Docker account:

```bash
docker login dhi.io
```

## 2. Run the installer

```bash
curl -fsSL https://raw.githubusercontent.com/Resgrid/resgrid-setup/master/setup.sh | bash
```

The installer asks for hostnames/TLS mode, generates unique passwords and Resgrid encryption keys, creates new OpenIddict certificates, writes `.env`, and starts the stack.

Automated example:

```bash
RESGRID_WEB_URL=dispatch.example.com \
RESGRID_API_URL=dispatchapi.example.com \
RESGRID_EVENTS_URL=dispatchevents.example.com \
RESGRID_LETSENCRYPT_EMAIL=admin@example.com \
bash setup.sh
```

Use `RESGRID_NO_START=1` to configure without pulling or starting containers.

## 3. Verify migrations

```bash
cd ~/resgrid
docker compose ps
docker compose logs -f worker
```

The worker creates and migrates four PostgreSQL databases. First start can take several minutes.

With internal TLS, add all three hostnames to every client's hosts file and accept/trust the certificate for the web, API, and events endpoints. Accepting only the web certificate is insufficient.

When migrations settle, open the web hostname and use **Sign Up** to create the first account and department. There is no shared default administrator account.

## 4. Operate and update

```bash
docker compose ps
docker compose logs -f SERVICE
docker compose pull
docker compose up -d
```

Do not delete every Docker image during an update. Pulling and recreating this Compose project is sufficient and does not disturb unrelated containers.

Before an update, securely back up `.env` and create a consistent PostgreSQL dump:

```bash
docker compose exec -T db pg_dumpall -U resgrid > "resgrid-$(date +%F).sql"
```

Keep the previous image digests and pre-update dump. Older application images may not work with a newly migrated schema, so rollback can require restoring PostgreSQL as well as the previous manifests/images.

Continue with the full [self-hosted installation guide](./installation) for optional services, endpoints, configuration, backup scope, and rollback details.
