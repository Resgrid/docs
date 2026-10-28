---
sidebar_position: 3
title: Docker reference
---

# Docker reference

Resgrid Core is published as Docker images and configured entirely with environment variables. The [self-hosted deployments](../self-hosted/installation) set everything up for you; this page is the reference behind them.

## Images

All images are on Docker Hub under `resgridllc`, tagged `latest` and with a build version (`4.<build>.0`). They run as a non-root user, listen on port **8080**, contain no shell, and start through a small `wait` program that waits for the hosts in `WAIT_HOSTS` (for example `db:5432,redis:6379,rabbitmq:5672`) before starting.

| Image | Service | Health endpoint |
|---|---|---|
| `resgridllc/resgridwebcore` | Web application | `/Health/GetCurrent` |
| `resgridllc/resgridwebservices` | REST API and OpenID Connect token server | `/health`, `/api/v4/Health/GetCurrent` |
| `resgridllc/resgridwebevents` | Real-time events (SignalR hubs `/eventingHub`, `/geolocationHub`, `/chatHub`) | `/health/GetCurrent` |
| `resgridllc/resgridworkersconsole` | Background jobs and database migrations | — |
| `resgridllc/resgridwebtts` | Text-to-speech (Piper) | `/health` |
| `resgridllc/resgridwebmcp` | Model Context Protocol server (`POST /mcp`) | `/health/current` |
| `resgridllc/resgridtrackergateway` | GPS tracker ingest (TCP/UDP 5004, 5023, 5027) | `/health/live`, `/health/ready` |
| `resgridllc/resgridrelay` | Inbound email to dispatch (SMTP 2525) | — |
| `resgridllc/resgridwebbroker` | Protected-data broker for the Advanced Data Protection add-on; not used by self-hosted installs | `/health` |

The images are `linux/amd64` today. Supporting services: PostgreSQL 18 (all databases), Redis, RabbitMQ 4 (with `deprecated_features.permit.transient_nonexcl_queues = true`) and any S3-compatible object store (RustFS in the reference deployments). MongoDB and SQL Server are no longer required.

## How settings are read

Every static field of every class in [Core/Resgrid.Config](https://github.com/Resgrid/Core/tree/master/Core/Resgrid.Config) can be set with an environment variable named:

```text
RESGRID__{ClassName}__{FieldName}
```

- `RESGRID` in capitals, then two underscores between the parts: `RESGRID__DataConfig__ConnectionString`.
- Class and field names are **case-sensitive**. A misspelled name is **silently ignored** (the container logs the value it applied at start-up, `Resgrid.Config: Setting Value for ...`).
- Enum values must be **numbers** (`RESGRID__SystemBehaviorConfig__Environment=0`).
- Lists and dictionaries can't be set this way.
- A few field names contain spelling mistakes that must be kept: `ExternalAudioUrlParamPasshprase`, `RabbbitPassword`, `RabbbitExchange`.

Two settings have only two parts and are read by the worker: `RESGRID__DODBUPGRADE=true` (create and migrate the database schema at start-up) and `RESGRID__EVENTSONLY`.

## Required settings

The complete, commented template is [`.env.example`](https://github.com/Resgrid/resgrid-setup/blob/master/.env.example) in resgrid-setup. The settings every install needs:

| Setting | Value |
|---|---|
| `RESGRID__SystemBehaviorConfig__ResgridBaseUrl` / `ResgridApiBaseUrl` / `ResgridEventingBaseUrl` | Public HTTPS URLs of the web app, API and events hub. The apps learn the events URL from the API. |
| `RESGRID__SystemBehaviorConfig__Environment` | `0` Production, `1` Staging, `2` QA, `3` Development |
| `RESGRID__SystemBehaviorConfig__ExternalLinkUrlParamPassphrase`, `ExternalAudioUrlParamPasshprase`, `ApiTokenEncryptionPassphrase` | Random secrets |
| `RESGRID__SecurityConfig__EncryptionKey` | Random, **exactly 32 characters** |
| `RESGRID__SecurityConfig__EncryptionSaltValue` | Random |
| `RESGRID__ApiConfig__BackendInternalApikey` | Random; the web app uses it to get API tokens for chat, messages, maps and the events connection |
| `RESGRID__ApiConfig__BypassSslChecks` | `false`. With `true` the web app, API and events refuse to start in Production; make the containers trust your CA instead (`SSL_CERT_DIR`/`SSL_CERT_FILE`). |
| `RESGRID__DataConfig__DatabaseType` / `DocDatabaseType` | `1` (PostgreSQL) |
| `RESGRID__DataConfig__ConnectionString` and `CoreConnectionString` | Same value: `User ID=…;Password=…;Host=db;Port=5432;Database=resgrid;Pooling=true;` (`CoreConnectionString` is used by the repositories and the migration runner) |
| `RESGRID__DataConfig__DocumentConnectionString` | `…;Database=resgriddoc;` |
| `RESGRID__OidcConfig__DatabaseType` / `ConnectionString` | `1` / `…;Database=resgridoidc;` |
| `RESGRID__OidcConfig__EncryptionCert` / `SigningCert` | Base64 PKCS#12 certificates **with an empty password** (key encipherment / digital signature) |
| `RESGRID__WorkerConfig__DatabaseType` / `WorkerDbConnectionString` / `PayloadKey` | `1` / `…;Database=resgridworkers;` / random |
| `RESGRID__JwtConfig__EventsClientSecret` | Random; same value for the API and events containers |
| `RESGRID__CacheConfig__RedisConnectionString` | `redis:6379,password=…,allowAdmin=True` |
| `RESGRID__ServiceBusConfig__RabbitHostname` / `RabbitUsername` / `RabbbitPassword` | RabbitMQ host and credentials |
| `RESGRID__WebConfig__IngressProxyNetwork` / `IngressProxyNetworkCidr` | Network your reverse proxy connects from; forwarded headers are only trusted from it |
| `RESGRID__TtsConfig__ServiceBaseUrl`, `StaticPromptAdminKey`, `S3Endpoint`, `S3AccessKey`, `S3SecretKey`, `S3Bucket` | Text-to-speech service URL, admin key and its bucket |
| `RESGRID__SystemBehaviorConfig__AllowSignupWithoutBilling` | `true` to allow **Sign Up** on a self-hosted server (no billing service); set to `false` once your department exists |
| `ASPNETCORE_ENVIRONMENT` / `ASPNETCORE_URLS` | `Production` / `http://+:8080` |

Generate the OpenID Connect certificates with OpenSSL:

```bash
openssl req -x509 -newkey rsa:2048 -sha256 -days 3650 -nodes -keyout enc.key -out enc.crt \
  -subj "/CN=Resgrid OIDC Server Encryption Certificate" -addext "keyUsage=keyEncipherment"
openssl pkcs12 -export -out enc.pfx -inkey enc.key -in enc.crt -passout pass:
openssl base64 -A -in enc.pfx        # -> RESGRID__OidcConfig__EncryptionCert
```

Repeat with `keyUsage=digitalSignature` for `RESGRID__OidcConfig__SigningCert`. Replacing either certificate later signs every user out; changing the encryption key or salt makes encrypted data unreadable.

## Common optional settings

| Setting | Purpose |
|---|---|
| `RESGRID__SystemBehaviorConfig__OutboundEmailType` | `1` SMTP, `0` Postmark |
| `RESGRID__OutboundEmailServerConfig__Host`, `Port`, `EnableSsl`, `UserName`, `Password`, `FromMail`, `PostmarkApiKey` | Outbound email |
| `RESGRID__SystemBehaviorConfig__ErrorLoggerType` | `2` console, `1` Sentry (`RESGRID__ExternalErrorConfig__ExternalErrorServiceUrlForApi`, `ForWebsite`, `ForWebjobs`, `ForEventing`) |
| `RESGRID__MappingConfig__LeafletTileUrl`, `LeafletAttribution` | Web map tiles (`{z}/{x}/{y}` URL; `{0}` is replaced by `WebsiteOSMKey` if set) |
| `RESGRID__MappingConfig__NominatimUrl`, `OsrmUrl` | Address search and routing for the web map |
| `RESGRID__MappingConfig__GoogleMapsApiKey`, `GoogleMapsJSKey`, `What3WordsApiKey`, `LocationIQApiKey` | Geocoding providers |
| `RESGRID__MappingConfig__ResponderAppMapboxKey`, `UnitAppMapBoxKey` | Maps in the mobile apps |
| `RESGRID__WebConfig__RecaptchaPublicKey`, `RecaptchaPrivateKey` | reCAPTCHA on Sign Up and Forgot Password; leave empty to disable |
| `RESGRID__ImportConfig__S3Endpoint`, `S3AccessKey`, `S3SecretKey`, `S3Bucket` | Storage for Department Import |
| `RESGRID__SecurityConfig__SystemApiKey` | Server-to-server key (header `X-Resgrid-SystemApiKey`), used by the email relay |
| `RESGRID__SecurityConfig__DepartmentApiKeyPepper` | Pepper for department API keys |
| `RESGRID__TwoFactorConfig__AuthenticatorSeedEncryptionEnabled` | Encrypt authenticator (TOTP) seeds at rest |
| `RESGRID__SystemBehaviorConfig__FullHealthCheckKey` | Key for the detailed `/health/full` endpoints (header `X-Resgrid-Health-Key`) |
| `RESGRID__SearchConfig__Enabled`, `IndexPath`, `S3Endpoint`, `S3AccessKey`, `S3SecretKey`, `S3Bucket`, `S3UseSsl`, `S3ForcePathStyle` | Built-in search index (off by default). `IndexPath` is local scratch space (`/data/search`, a tmpfs or `emptyDir` in resgrid-setup); with the `S3*` settings the index is kept in object storage so every container shares it. resgrid-setup sets these when you turn on the *Unified search* feature. |
| `RESGRID__AttachmentScanningConfig__Enabled`, `Host`, `Port` | Virus scanning of uploaded files through a ClamAV daemon (`clamav:3310`); set by the *Attachment virus scanning* feature |
| `RESGRID__UnitTrackingConfig__Enabled`, `NativeGatewayEnabled`, `EnableQueclink`, `EnableGt06`, `EnableTeltonika`, `CredentialPepper` | GPS tracker gateway |
| `RESGRID__McpConfig__CorsAllowedOrigins` | MCP CORS origins |
| `RESGRID__ChatConfig__Novu*` | Push notifications through a Novu instance |

## Settings used by resgrid-setup

These entries in `.env` are read by the setup scripts and Docker Compose, not by Resgrid:

| Setting | Purpose |
|---|---|
| `RESGRID_WEB_HOST`, `RESGRID_API_HOST`, `RESGRID_EVENTS_HOST`, `RESGRID_TLS`, `RESGRID_HTTP_PORT`, `RESGRID_HTTPS_PORT` | Hostnames, certificate mode and ports for Caddy |
| `RESGRID_FEATURES` | Optional features that are on (section names from `features/catalog.ini`); see [Optional features and upgrades](../self-hosted/features-and-upgrades) |
| `RESGRID_FEATURES_OFFERED` | Optional features setup has asked about; later runs only ask about new ones |
| `COMPOSE_PROFILES` | Optional services to run (`maps`, `clamav`, `tracking`, `relay`); Docker Compose reads it from `.env` itself. `RESGRID_OPTIONAL` plays the same part on Kubernetes. |

Feature flags themselves live in the `featureflags` table of the `resgrid` database (`isenabledglobally` switches a flag for every department) and are cached in Redis under keys containing `FeatureFlag`. After changing them with SQL, delete those keys (`redis-cli --scan --pattern '*FeatureFlag*'`) or wait for the cache to expire; `./setup.sh features` does both for you.

## Trusting a private certificate authority

The containers verify certificates when they call your public URLs (for example the web app's server-side calls to the API). With a private CA, mount its certificate into each container and add the directory to `SSL_CERT_DIR`:

```yaml
environment:
  SSL_CERT_DIR: /etc/ssl/certs:/usr/local/share/resgrid-ca
volumes:
  - ./certs/ca:/usr/local/share/resgrid-ca:ro
```

The containers must also resolve the public hostnames to your reverse proxy (Compose `extra_hosts`, Kubernetes `hostAliases`, or internal DNS).
