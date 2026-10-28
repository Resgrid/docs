---
sidebar_position: 1
title: Quick start
---

# Quick start

Run your own Resgrid server on one Linux machine in about 15 minutes. For a Windows laptop, a Kubernetes cluster or the Raspberry Pi Incident Command Kit, start from the [deployment comparison](./installation) instead.

:::danger Evaluation is not production readiness
The single-server stack has one instance of its database, cache, message bus and object store. Production use needs a security review, monitoring, capacity planning, tested backups and a recovery plan.
:::

<AcademyVideo id="23-self-hosting" />

## 1. Prepare a server

A 64-bit Linux server (Ubuntu Server 24.04 LTS works well) with 4 CPU cores, 8 GB RAM and 40 GB of disk. Install Docker:

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER      # then log out and back in
```

Decide on three hostnames that point at the server: web (`dispatch.example.com`), API (`dispatchapi.example.com`) and events (`dispatchevents.example.com`). For a LAN-only test you can keep the defaults (`rg.mylocal`, `rgapi.mylocal`, `rgevents.mylocal`).

## 2. Install

```bash
curl -fsSL https://raw.githubusercontent.com/Resgrid/resgrid-setup/master/setup.sh | bash
```

Answer the hostname questions. For the certificate question give an email address (internet-facing server, Let's Encrypt) or press Enter for `internal` (LAN or offline). The installer generates every secret, starts Resgrid and waits until it answers. The first start takes 5–10 minutes while the database is created.

## 3. Trust the certificate (internal only)

With `internal` certificates, install `~/resgrid/certs/ca/resgrid-root-ca.crt` as a trusted root on every computer and phone that uses Resgrid, and add the hostnames to their hosts file if you have no DNS:

```text
192.168.1.50  rg.mylocal rgapi.mylocal rgevents.mylocal
```

Step-by-step per operating system: [Certificates](./certificates).

:::caution Android apps need a public certificate
Installing the local CA on an Android phone only makes its browsers trust the server. The Resgrid **Responder** and **Unit** Android apps ignore user-installed CAs, so they need a publicly trusted certificate: use Let's Encrypt or your own public certificate if Android phones must use the apps. Android browsers and iPhones work with the local CA.
:::

## 4. Sign up

Open `https://<web hostname>`, choose **Create an account**, and fill in the form. This creates your department and makes you its administrator.

![Sign up form](/img/self-hosted/sign-up.png)

Then turn self-service sign-up off (`RESGRID__SystemBehaviorConfig__AllowSignupWithoutBilling=false` in `~/resgrid/.env`, then `docker compose up -d`), set up your department ([setup guide](../configuration/setup)) and [connect the mobile apps](./apps).

## 5. Keep it running

```bash
cd ~/resgrid
docker compose ps                  # status
docker compose logs -f worker      # logs
./setup.sh features                # turn optional features (Records, Search, Chat, ...) on or off
./setup.sh upgrade                 # upgrade and repair (always safe to run)
```

Back up `~/resgrid/.env`, `~/resgrid/certs/` and a database dump regularly; the [installation guide](./installation#backups) has the commands, plus optional offline maps, GPS trackers and email dispatch. [Optional features and upgrades](./features-and-upgrades) explains the feature menu and what an upgrade does.
