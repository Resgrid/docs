---
sidebar_position: 2
title: Install Relay
description: "Download and install Resgrid Relay on Windows (desktop app or console), Linux with systemd, macOS or Docker, and upgrade it."
---

# Install Relay

Relay is published on the [Resgrid Relay GitHub Releases page](https://github.com/Resgrid/Relay/releases) and as a Docker image. Every build is self-contained, so the machine doesn't need .NET installed.

## Download

Each release has these files:

| File | Runs on | Modes |
| --- | --- | --- |
| `ResgridRelay-Desktop-<version>-win-x64.zip`, `ResgridRelay-Desktop-<version>-win-arm64.zip` | Windows 10 and 11: the desktop app | All five |
| `ResgridRelay-Console-<version>-win-x64.zip`, `ResgridRelay-Console-<version>-win-arm64.zip` | Windows, headless | All five |
| `ResgridRelay-Console-<version>-linux-x64.tar.gz`, `ResgridRelay-Console-<version>-linux-arm64.tar.gz` | Linux, headless (systemd unit included) | `smtp`, `record`, `dispatch` |
| `ResgridRelay-Console-<version>-osx-x64.tar.gz`, `ResgridRelay-Console-<version>-osx-arm64.tar.gz` | macOS, headless (Intel and Apple silicon) | `smtp`, `record`, `dispatch` |
| `SHA256SUMS` | Checksums of every archive | |
| `docker-image.txt` | The Docker image tags and platforms built for the release | |

Pick `x64` for ordinary Intel and AMD machines and `arm64` for Arm machines (a Windows on Arm laptop, a Raspberry Pi 4 or 5 running 64-bit Linux, an Apple silicon Mac).

The Docker image is `resgridllc/resgridrelay`, tagged with each version and with `latest` for the newest full release.

### What's in the archives

| Archive | Contents |
| --- | --- |
| Desktop | `ResgridRelay.exe`, the LiveKit voice library `livekit_ffi.dll`, `README.md`, `LICENSE.txt` |
| Windows console | `Resgrid.Audio.Relay.Console.exe`, `appsettings.json`, a sample tone-detect watcher file `settings.json`, `livekit_ffi.dll`, `README.md`, `LICENSE.txt` |
| Linux console | `Resgrid.Audio.Relay.Console`, `appsettings.json`, `settings.json`, `liblivekit_ffi.so`, a `systemd` folder (unit file, environment example and notes), `README.md`, `LICENSE.txt` |
| macOS console | `Resgrid.Audio.Relay.Console`, `appsettings.json`, `settings.json`, `liblivekit_ffi.dylib`, `README.md`, `LICENSE.txt` |

The LiveKit library is what the voice modes (`radio`, `record`, `dispatch`) use to join Resgrid PTT channels. Keep it in the same folder as the executable: without it the voice modes can't start. It isn't part of the LiveKit NuGet package, so the release archives and the Docker image add it; if you build Relay yourself, `build/fetch-livekit-ffi.ps1` in the Relay repository downloads the right one for your platform.

### Verify the download

Check the archive against `SHA256SUMS` from the same release before you run it.

On Windows, in PowerShell:

```powershell
Get-FileHash .\ResgridRelay-Desktop-2.1.50-win-x64.zip -Algorithm SHA256
```

Compare the hash with the line for that file in `SHA256SUMS` (the case doesn't matter).

On Linux or macOS, with `SHA256SUMS` in the same folder:

```bash
sha256sum --check --ignore-missing SHA256SUMS      # Linux
shasum -a 256 --check --ignore-missing SHA256SUMS   # macOS
```

`OK` next to the file name means it matches. Don't run an archive whose hash doesn't match: download it again.

## Windows: desktop app

1. Download `ResgridRelay-Desktop-<version>-win-x64.zip` (or `win-arm64`) and verify it.
2. Unzip it to a folder of its own, for example `C:\ResgridRelay`. Keep `livekit_ffi.dll` next to `ResgridRelay.exe`.
3. Run `ResgridRelay.exe`. The Dashboard opens with a getting-started checklist.
4. [Connect Relay to Resgrid](connect-to-resgrid.md), set up your mode, and turn on **Auto-start** for it on the Operations screen.

Only one copy of the desktop app runs at a time. Starting it again tells you it is already running in the tray.

The desktop app keeps its files outside the program folder, so replacing the program folder never loses your setup:

| What | Where |
| --- | --- |
| Settings (shared with the console host) | `%APPDATA%\Resgrid\Relay\relay.user.json` |
| Desktop preferences (auto-start modes, tray, notifications) | `%APPDATA%\Resgrid\Relay\desktop.json` |
| Rotated Resgrid refresh token | `%LOCALAPPDATA%\Resgrid\Relay\resgrid-token.json` |
| Log files (one per day, kept 14 days) | `%LOCALAPPDATA%\Resgrid\Relay\logs` |

See [Desktop app](desktop-app.md) for the screens and launch options.

## Windows: console host

Use the console host on a Windows machine that runs Relay without anyone signed in to watch it, or when you prefer a configuration file.

1. Download `ResgridRelay-Console-<version>-win-x64.zip` (or `win-arm64`), verify it and unzip it, for example to `C:\ResgridRelay\console`.
2. Open PowerShell in that folder and list the commands and common settings:

   ```powershell
   .\Resgrid.Audio.Relay.Console.exe help
   ```

3. Configure it in one of three ways (see [Where settings come from](settings-reference.md#where-settings-come-from)):
   - edit `appsettings.json` next to the executable;
   - set it up in the desktop app on the same Windows account, which saves `%APPDATA%\Resgrid\Relay\relay.user.json`, a file the console reads too;
   - set `RESGRID__RELAY__` environment variables.
4. Run the configured mode:

   ```powershell
   .\Resgrid.Audio.Relay.Console.exe run
   ```

   `Ctrl+C` stops it cleanly. Running the executable with no command is the same as `run`.

The console host runs **one mode per process**: the one in `Mode`. To run two modes, start two processes, each with its own `RESGRID__RELAY__Mode`, its own refresh token and its own `RESGRID__RELAY__Resgrid__TokenCachePath`. Resgrid retires a refresh token when it is used, so two processes that share one token — or that run from the same folder and so share the default `./data/resgrid-token.json` — knock each other out: the first to sign in invalidates the other's token, and it fails with `invalid_grant` (see [Refresh token rotation](connect-to-resgrid.md#refresh-token-rotation)).

The console writes its log to the terminal only. When you run it unattended, redirect the output to a file.

### Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Stopped cleanly (`Ctrl+C`, `systemctl stop`, `docker stop`). |
| `1` | The mode failed or faulted while running, or a command failed. Restarting may help. |
| `78` | A configuration error: a missing credential, a value that can't be read, or an unknown mode. The message says which setting; restarting won't help until it is fixed. |

A service manager or scheduled task can use these: the shipped systemd unit restarts the relay after `1` but not after `78`. Docker's restart policies restart a container after any non-zero code, so a container with a configuration error keeps restarting: `docker logs` shows the reason.

:::note Running unattended on Windows
Relay doesn't install itself as a Windows service. For an unattended Windows relay, use the desktop app with **Start Relay minimized to the tray when I sign in to Windows** and **Auto-start** (see [Operations](desktop-app.md#operations)), with the PC set to sign in automatically, or start the console host from a scheduled task. A scheduled task that runs as another account doesn't see your `%APPDATA%` settings file: give that account its own settings, or use `appsettings.json` or environment variables.
:::

The console has setup commands for the Windows-only modes (`devices`, `monitor`, `tune`, `test-tx`, `profiles`, `setup`). They are listed on the [radio bridge](radio-bridge.md#console-commands) and [tone detect](tone-detect.md) pages.

## Linux with systemd

The Linux console runs the `smtp`, `record` and `dispatch` modes. The `radio` and `audio` modes need a Windows sound card and PTT interface: on Linux they stop with a "not supported on this platform" message.

The archive includes a hardened systemd unit (`systemd/resgrid-relay.service`), an environment file to copy (`systemd/relay.env.example`) and notes (`systemd/README.md`).

### 1. Prerequisites

The voice library needs `libstdc++6`, which every standard distribution has. On Debian or Ubuntu:

```bash
sudo apt-get install -y libstdc++6
```

### 2. Install the files

```bash
# A service account and folders
sudo useradd --system --no-create-home --shell /usr/sbin/nologin resgrid
sudo mkdir -p /opt/resgrid-relay /etc/resgrid-relay

# The program (use linux-arm64 on Arm)
sudo tar -xzf ResgridRelay-Console-<version>-linux-x64.tar.gz -C /opt/resgrid-relay
sudo chown -R resgrid:resgrid /opt/resgrid-relay

# The settings, which hold secrets: readable by root only
sudo cp /opt/resgrid-relay/systemd/relay.env.example /etc/resgrid-relay/relay.env
sudo chmod 600 /etc/resgrid-relay/relay.env
sudo nano /etc/resgrid-relay/relay.env

# The unit
sudo cp /opt/resgrid-relay/systemd/resgrid-relay.service /etc/systemd/system/
```

In `relay.env`, set `RESGRID__RELAY__Mode` and the [Resgrid credentials](connect-to-resgrid.md), then the settings of your mode ([SMTP](smtp-dispatch.md), [recorder](recorder.md) or [tone-out](dispatch-tone-out.md)). Every setting is a `RESGRID__RELAY__` environment variable; the [settings reference](settings-reference.md) lists them all.

### 3. Point the unit at the release binary

The release build is a single self-contained executable, so edit `/etc/systemd/system/resgrid-relay.service` and change `ExecStart` to run it directly:

```ini
ExecStart=/opt/resgrid-relay/Resgrid.Audio.Relay.Console run
```

The unit's default `ExecStart` (`/usr/bin/dotnet ... Resgrid.Audio.Relay.Console.dll run`) is for a build you publish yourself that relies on an installed .NET runtime.

### 4. Start it

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now resgrid-relay
journalctl -u resgrid-relay -f
```

### What the unit does for you

- Runs as the unprivileged `resgrid` user and restarts the relay if it fails (`Restart=on-failure`), but not after a configuration error: those exit with code 78, which the unit doesn't restart (`RestartPreventExitStatus=78`), because restarting can't fix a missing credential or a bad value. The reason is in `journalctl -u resgrid-relay`; fix `relay.env`, then `sudo systemctl restart resgrid-relay`.
- Stops the relay gracefully: on `systemctl stop` Relay finishes in-flight recordings and leaves the PTT channel before it exits (up to 30 seconds).
- Gives Relay one writable folder, `/var/lib/resgrid-relay`, and points the defaults there: `Smtp__DataDirectory=/var/lib/resgrid-relay/smtp`, `Resgrid__TokenCachePath=/var/lib/resgrid-relay/resgrid-token.json` and `Recorder__LocalPath=/var/lib/resgrid-relay/recordings`. Your `relay.env` can override them.
- Locks the rest of the system down (`ProtectSystem=strict`, `ProtectHome`, `PrivateDevices` and more). If you store recordings or the recorder log somewhere else, add that path to `ReadWritePaths=` in the unit.
- Creates files readable by the `resgrid` user only: the token cache, raw messages and recordings hold credentials and dispatch content.
- Listens on SMTP port 2525 with no extra privileges. To listen on port 25 directly, add `CAP_NET_BIND_SERVICE` to both `CapabilityBoundingSet=` and `AmbientCapabilities=`, or keep 2525 and forward port 25 to it in your firewall.

Under systemd, only the environment and `appsettings.json` normally apply: the service account has no desktop-app settings file.

### Several modes on one Linux host

One service runs one mode. To run, say, the recorder and the tone-out on the same host, make a unit per mode, each with its own environment file:

```bash
sudo cp /etc/systemd/system/resgrid-relay.service /etc/systemd/system/resgrid-relay-record.service
sudo cp /etc/systemd/system/resgrid-relay.service /etc/systemd/system/resgrid-relay-dispatch.service
# In each copy, set EnvironmentFile=/etc/resgrid-relay/record.env (or dispatch.env)
sudo systemctl daemon-reload
sudo systemctl enable --now resgrid-relay-record resgrid-relay-dispatch
```

Give each unit its own `RESGRID__RELAY__Resgrid__TokenCachePath` (for example `/var/lib/resgrid-relay/record-token.json`) and its own refresh token, so the two processes never rotate the same token (see [Refresh token rotation](connect-to-resgrid.md#refresh-token-rotation)).

## macOS

The macOS console runs the `smtp`, `record` and `dispatch` modes.

```bash
mkdir -p ~/resgrid-relay
tar -xzf ResgridRelay-Console-<version>-osx-arm64.tar.gz -C ~/resgrid-relay   # osx-x64 on Intel Macs
cd ~/resgrid-relay
./Resgrid.Audio.Relay.Console help
./Resgrid.Audio.Relay.Console run
```

Configure it with `appsettings.json` in that folder or with `RESGRID__RELAY__` environment variables. If macOS refuses to open the executable because it was downloaded from the internet, remove the download flag with `xattr -dr com.apple.quarantine ~/resgrid-relay` and try again. Relay doesn't ship a macOS service definition: for an always-on Mac, run it from a launchd job of your own, or use Docker.

## Docker

The `resgridllc/resgridrelay` image runs the console host in a hardened, non-root Linux container, with the LiveKit library built in. It runs the `smtp`, `record` and `dispatch` modes, one per container, and is configured entirely with environment variables.

### SMTP dispatch

```bash
docker run -d --name resgrid-relay-smtp --restart unless-stopped \
  -p 25:2525 \
  -e RESGRID__RELAY__Mode=smtp \
  -e RESGRID__RELAY__Resgrid__BaseUrl=https://api.resgrid.com \
  -e RESGRID__RELAY__Resgrid__ClientId=YOUR_CLIENT_ID \
  -e RESGRID__RELAY__Resgrid__ClientSecret=YOUR_CLIENT_SECRET \
  -e RESGRID__RELAY__Resgrid__RefreshToken=YOUR_REFRESH_TOKEN \
  -e RESGRID__RELAY__Smtp__DepartmentAddressDomains__0=dispatch.example.org \
  -e RESGRID__RELAY__Smtp__GroupAddressDomains__0=groups.example.org \
  -v relay-data:/app/data \
  resgridllc/resgridrelay:latest
```

The container listens on 2525; `-p 25:2525` publishes it as the standard mail port on the host. **Always mount `/app/data`**: it holds the rotated refresh token and the list of messages already processed. Without it, a restart starts from a refresh token Resgrid has already retired, and the relay can't sign in.

### Recorder and tone-out

```bash
docker run -d --name resgrid-relay-record --restart unless-stopped \
  -e RESGRID__RELAY__Mode=record \
  -e RESGRID__RELAY__Resgrid__ClientId=YOUR_CLIENT_ID \
  -e RESGRID__RELAY__Resgrid__ClientSecret=YOUR_CLIENT_SECRET \
  -e RESGRID__RELAY__Resgrid__RefreshToken=YOUR_REFRESH_TOKEN \
  -e RESGRID__RELAY__Recorder__Channel=all \
  -v relay-record-data:/app/data \
  -v /srv/relay-recordings:/app/recordings \
  resgridllc/resgridrelay:latest

docker run -d --name resgrid-relay-dispatch --restart unless-stopped \
  -e RESGRID__RELAY__Mode=dispatch \
  -e RESGRID__RELAY__Resgrid__ClientId=YOUR_CLIENT_ID \
  -e RESGRID__RELAY__Resgrid__ClientSecret=YOUR_CLIENT_SECRET \
  -e RESGRID__RELAY__Resgrid__RefreshToken=YOUR_SECOND_REFRESH_TOKEN \
  -e RESGRID__RELAY__Tts__ServiceBaseUrl=https://tts.resgrid.com \
  -e RESGRID__RELAY__DispatchVoice__Channel=default \
  -v relay-dispatch-data:/app/data \
  resgridllc/resgridrelay:latest
```

Give each container its own `/app/data` volume and its own refresh token. Recordings go to `/app/recordings` unless you set `RESGRID__RELAY__Recorder__LocalPath`; mount a host folder there, or use S3 storage (see [Recorder](recorder.md)). The container runs as a non-root user: make sure a mounted host folder is writable by it.

### Docker Compose

```yaml
services:
  relay-smtp:
    image: resgridllc/resgridrelay:latest
    restart: unless-stopped
    ports:
      - "25:2525"
    env_file: relay-smtp.env   # RESGRID__RELAY__... lines, kept out of the compose file
    volumes:
      - relay-smtp-data:/app/data

volumes:
  relay-smtp-data:
```

### Other container settings

| Variable | Purpose |
| --- | --- |
| `TZ` | Time zone of the container (default `Etc/UTC`); used in log timestamps. |
| `WAIT_HOSTS` | Optional. The container starts Relay through `docker-compose-wait`, so `WAIT_HOSTS=redis:6379` waits for Redis (or any `host:port`) to accept connections before starting. |
| `LOCLX_ENABLED`, `LOCLX_TOKEN`, `LOCLX_RESERVED_ENDPOINT` | Optional LocalXpose tunnel for the SMTP port, for a host that can't accept inbound connections. See [SMTP dispatch](smtp-dispatch.md#no-inbound-port-localxpose-tunnel). |

### Self-hosted Resgrid

A self-hosted Resgrid installation already includes this image as the optional `relay` service. See [Self-hosted installation](../../self-hosted/installation.md) (Docker Compose) or [Multi-server](../../self-hosted/multi.md) (Kubernetes) for turning it on, and [SMTP dispatch](smtp-dispatch.md) for the settings.

## Upgrading

Releases are numbered `2.1.<build>`. The [About](desktop-app.md#about) screen and the console's `version` command show what you run.

- **Desktop app**: choose **Quit** from the tray icon menu (closing the window only hides it), replace the program folder's contents with the new zip, and start `ResgridRelay.exe`. Settings, the token cache and logs live in `%APPDATA%` and `%LOCALAPPDATA%`, so they carry over. If you turned on sign-in start, it keeps pointing at the same `ResgridRelay.exe` path, so unzip the new version into the same folder.
- **Windows or macOS console**: stop it, keep a copy of your `appsettings.json`, replace the files, and put your `appsettings.json` back.
- **Linux**: keep your settings in `/etc/resgrid-relay/*.env` rather than in `appsettings.json`; then upgrading is `sudo systemctl stop resgrid-relay`, extract the new archive over `/opt/resgrid-relay`, `sudo chown -R resgrid:resgrid /opt/resgrid-relay`, `sudo systemctl start resgrid-relay`. The token cache and data in `/var/lib/resgrid-relay` are untouched. If the new archive's `systemd/resgrid-relay.service` changed, compare it with yours and keep your `ExecStart` edit.
- **Docker**: pull the new tag and recreate the container with the same volumes (`docker compose pull && docker compose up -d`).

Always replace the LiveKit library together with the executable: the two are built to match.

## Uninstalling

On Windows, turn off **Start Relay minimized to the tray when I sign in to Windows** first (it adds an entry under `HKCU\Software\Microsoft\Windows\CurrentVersion\Run`), quit Relay, and delete the program folder. Delete `%APPDATA%\Resgrid\Relay` and `%LOCALAPPDATA%\Resgrid\Relay` to remove the settings, token and logs too. On Linux, `sudo systemctl disable --now resgrid-relay`, then remove the unit, `/opt/resgrid-relay`, `/etc/resgrid-relay` and `/var/lib/resgrid-relay`.
