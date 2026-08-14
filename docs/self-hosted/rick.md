---
sidebar_position: 4
---

# Resgrid Incident Command Kit (RICK)

The `rick` branch divides Resgrid across three portable Linux nodes on a private wired LAN:

| Role | Services |
|---|---|
| Web/API | Caddy, web, API, events, worker/migrations, TTS, MCP; optional tracker gateway and relay |
| Infrastructure | Redis, RabbitMQ, RustFS; optional offline OSM tile service |
| Database | PostgreSQL and all four Resgrid databases |

This separation reduces resource contention and makes role recovery clearer, but it is not high availability. Every node is a single point of failure.

## Important architecture notice

The current published Resgrid application images are `linux/amd64` only. Infrastructure images publish native ARM64 variants, but the web-role Resgrid images do not.

On a Raspberry Pi web node, RICK therefore runs the application images using the kernel's x86_64 binfmt/QEMU handler. This has a performance cost. Test the full kit under realistic call, unit, event, mapping, TTS, and tracker load before field use. Native multi-architecture Resgrid images are the preferred long-term solution.

Install persistent emulation support on the web Pi:

```bash
sudo apt update
sudo apt install -y qemu-user-static binfmt-support
cat /proc/sys/fs/binfmt_misc/qemu-x86_64
```

The handler must report `enabled`. `rick.sh web start` stops with an actionable error if an ARM64 node lacks the handler.

## Hardware and LAN

- Three Raspberry Pi 5 systems with 8 GB RAM recommended, or equivalent 64-bit Linux nodes.
- 64-bit Raspberry Pi OS/Ubuntu Server; 32-bit operating systems are unsupported.
- SSD storage for PostgreSQL; high-endurance storage for every node.
- Wired Ethernet switch and fixed DHCP reservations/static addresses.
- Docker Engine and Compose v2 on each node.
- Separate encrypted backup media.

Example plan:

| Role | Address |
|---|---|
| Web/API | `192.168.50.11` |
| Infrastructure | `192.168.50.12` |
| Database | `192.168.50.13` |

All three client hostnames (`rg.rick.local`, `rgapi.rick.local`, and `rgevents.rick.local`) resolve to the web node.

## Configure once

Clone on an administration computer or one node:

```bash
git clone --branch rick https://github.com/Resgrid/resgrid-setup.git resgrid-rick
cd resgrid-rick
chmod +x setup.sh rick.sh database/db/*.sh
./setup.sh
```

The configurator asks for the three hostnames and three node addresses, then generates shared credentials, application keys, and OpenIddict certificates. Run it once only. Independently generated `.env` files will not interoperate.

Securely copy the complete configured checkout to the same path on each node:

```bash
rsync -a --delete ./ pi@192.168.50.11:/opt/resgrid-rick/
rsync -a --delete ./ pi@192.168.50.12:/opt/resgrid-rick/
rsync -a --delete ./ pi@192.168.50.13:/opt/resgrid-rick/
```

Protect and back up `.env`; it contains database credentials, encryption keys, and OIDC private keys.

## Validate and start

Database node:

```bash
cd /opt/resgrid-rick
./rick.sh database config
./rick.sh database start
./rick.sh database status
```

Infrastructure node:

```bash
cd /opt/resgrid-rick
./rick.sh infra config
./rick.sh infra start
./rick.sh infra status
```

Web node, after database and infrastructure are healthy:

```bash
cd /opt/resgrid-rick
./rick.sh web config
./rick.sh web start
./rick.sh web logs worker
```

The worker migrates `resgrid`, `resgridoidc`, `resgridworkers`, and `resgriddoc`. Accept Caddy's internal certificate for all three client hostnames, then open the web hostname and use **Sign Up**.

## Network policy

Permit only:

| Source | Destination | Ports |
|---|---|---|
| Clients | Web node | TCP 80/443 |
| Web node | Database node | TCP 5432 |
| Web node | Infrastructure node | TCP 5672, 6379, 9000 |
| Administrators | Infrastructure node | TCP 15672 if the RabbitMQ UI is needed |

Do not expose PostgreSQL, Redis, RabbitMQ, or RustFS outside the kit LAN. MCP is loopback-only on the web node.

## Prepare offline images

While internet is available, run `./rick.sh ROLE pull` on the corresponding node. For air-gapped recovery, export the images reported by `docker compose config --images`, copy the archive to protected media, and test a restore with `docker load` before deployment.

The web-node archive contains AMD64 images even though the host is ARM64. Preserve the binfmt packages and test after operating-system upgrades.

## Optional offline maps

Import a small regional `.osm.pbf` on the infrastructure node before the incident. Large imports can take many hours or days:

```bash
mkdir -p docker-data/osm
docker run --rm \
  -v /path/to/region.osm.pbf:/data/region.osm.pbf:ro \
  -v "$PWD/docker-data/osm:/data/database/" \
  overv/openstreetmap-tile-server:latest import
./rick.sh infra start --profile maps
```

Set `RESGRID__MappingConfig__LeafletTileUrl` in the shared `.env` to `http://INFRA_NODE:5156/tile/{z}/{x}/{y}.png`, redistribute `.env`, and recreate the web role.

## Optional tracker and email services

After configuring tracking settings:

```bash
./rick.sh web start --profile tracking
```

After configuring relay department/domain settings:

```bash
./rick.sh web start --profile relay
```

Tracker ports and SMTP port 25 require deliberate firewall rules. The relay has no SMTP authentication or TLS.

## Backup, update, and rollback

Database dump from the database node:

```bash
docker compose --env-file .env -p resgrid-rick-database -f database/docker-compose.yml \
  exec -T db pg_dumpall -U resgrid | gzip > "resgrid-$(date +%F).sql.gz"
```

Back up the dump, `.env`, RustFS data, and Caddy state off-kit. Validate recovery on spare media/nodes.

Update in database/infrastructure → web order, following worker migration logs. Retain previous image digests and a pre-upgrade dump. If migrations are incompatible with the previous release, restore PostgreSQL and `.env` before restarting the older web-role images.

## Troubleshooting

- `exec format error`: x86_64 binfmt is missing/disabled on the ARM64 web node.
- `WAIT_HOSTS` timeout: verify node addresses in `.env`, routing, and firewall rules.
- Browser login failure: accept/trust the API and events certificates, not only the web certificate.
- Nodes disagree about credentials: restore the same backed-up `.env` to all three; do not rerun setup separately.
