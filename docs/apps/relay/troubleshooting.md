---
sidebar_position: 13
title: Troubleshooting
description: "Fix common Resgrid Relay problems by symptom, and find Relay's logs."
---

# Troubleshooting Relay

Start with the logs: almost every problem is explained there in plain words. See [Where the logs are](#where-the-logs-are).

## Relay won't start

| Symptom | Cause and fix |
| --- | --- |
| *Resgrid Relay is already running. Open it from the tray icon.* | Only one copy of the desktop app runs at a time. Open it from the tray (it may be hidden under the **^** arrow). |
| *Resgrid Relay could not start* with a reason | The desktop app couldn't start at all. The reason says why; the log file has the detail. |
| Configuration shows **Settings could not be read** | A settings file has a mistake, often a hand edit that broke the JSON. The banner names the file and the problem: fix or delete `%APPDATA%\Resgrid\Relay\relay.user.json`, then press **Reload**. |
| A mode's **Start** button is greyed out | Its pre-flight check found something missing. The card lists what. |
| The console stops with *Configuration error: …* | A required setting is missing or a value can't be read (an empty port, a misspelled grant type). The message names the setting and the environment variable, and the console exits with code 78. Under systemd the unit stops instead of restarting (`RestartPreventExitStatus=78`): read the reason with `journalctl -u resgrid-relay`, fix `relay.env`, then `sudo systemctl restart resgrid-relay`. |
| A voice mode faults with a grant type error | The radio bridge, recorder and tone-out need the `RefreshToken` grant. See [Which grant each mode needs](connect-to-resgrid.md#which-grant-each-mode-needs). |
| A voice mode fails as it connects, on a fresh install | The LiveKit library (`livekit_ffi.dll`, `liblivekit_ffi.so` or `liblivekit_ffi.dylib`) isn't next to the executable. Unzip the whole release archive into one folder. On Linux, install `libstdc++6`. |
| *Voice seat limit reached for this department; not connecting.* | All your department's PTT voice seats are in use (apps, other relays). Free one, add seats, or turn off **Respect the department's concurrent voice-seat limit** if you know the limit allows it. |
| SMTP Dispatch faults right after starting | Another program is using the SMTP port (another mail server, another Relay). Stop it or change `Smtp:Port`. On Linux, ports below 1024 need extra permission: see the [systemd notes](install.md#what-the-unit-does-for-you). |
| The radio bridge restarts with *Transmit output stalled* | The output audio device stopped playing (a USB interface hanging without disconnecting). The bridge unkeys the radio and reopens the device by itself; if it keeps happening, try another USB port or a powered hub, or replace the interface. |
| `radio` or `audio` says it isn't supported on this platform | Those modes run on Windows only. Use the Windows desktop app or console. |
| Tone detect: *The audio watcher file … does not exist* | Create it with `setup`, or set the **Watcher file** path. See [Tone detect](tone-detect.md#create-the-watcher-file). |

## Test connection fails

| Message | Fix |
| --- | --- |
| *A Resgrid API base URL is required.*, *…client id is required.*, *…client secret is required.* | Fill in the field. Remember to tick **Reveal secrets** to type a secret. |
| *A refresh token or token cache path is required…* | Paste the Relay member's refresh token ([Get a refresh token](connect-to-resgrid.md#get-a-refresh-token)). |
| *A system API key is required…* | With the `SystemApiKey` grant, enter the key. |
| *Connection test timed out after 30 seconds.* | Relay can't reach the base URL. Check the address (`https://api.resgrid.com` for the hosted service), the PC's internet connection, a proxy, or a firewall blocking outbound HTTPS. |
| *Connection failed:* and an `invalid_grant` error | Resgrid no longer accepts the refresh token: it expired (unused for longer than its lifetime), was already used by another Relay process, or was issued for another client id. Issue a new one and paste it in; Relay notices the new token and starts from it. Then make sure no other process uses the same token ([Refresh token rotation](connect-to-resgrid.md#refresh-token-rotation)). |
| *Connection failed:* and an `invalid_client` or unauthorized error | The client id or secret is wrong, or the refresh token was issued for a different client. |
| *Connection failed:* with a 404 | The base URL or API version is wrong: the requests don't reach the API. Use the API address, not the web address, and `ApiVersion` `4`. |
| *Signed in, but the Resgrid API health check did not succeed.* | The credentials work but the API reported a problem. Try again shortly; on a self-hosted installation, check the API service. |

## No calls from email

Work along the path the email takes:

1. **Did the email reach Relay?** The Logs screen (or `journalctl -u resgrid-relay`) logs every message with its sender, recipients and subject. If there's nothing, the email never arrived:
   - Check the MX record: `nslookup -type=mx dispatch.your-county.org` should name the Relay host.
   - Check that port 25 reaches Relay from outside (a firewall rule, a port forward to 2525, or your ISP blocking inbound port 25).
   - If the CAD sends directly, check its SMTP server and port settings.
2. **Did the sender get a bounce?** The bounce's reply code says why (see [What senders see](smtp-dispatch.md#what-senders-see)):
   - `550` to a recipient: the address isn't on one of your configured domains, or it's a distribution-list address, or a group-message address while Relay uses the system API key. Check the domains in the SMTP settings: they must match the address exactly.
   - `550 5.1.1` *No Resgrid department or group has this dispatch address*: the code before the `@` is wrong. Department addresses must use the department's dispatch email code; group addresses a group's dispatch email code. See [Find your dispatch codes](smtp-dispatch.md#find-your-dispatch-codes-in-resgrid).
3. **Is the sender retrying?** A `451 4.3.0` reply means Relay couldn't finish (Resgrid unreachable, or Relay can't sign in) and the sender will retry. Fix the sign-in ([Test connection](#test-connection-fails)); the retries then come through.
4. **Was the call created where you didn't look?**
   - With the system API key or a service account, a department-address call is a **pending** call: look in the dispatchers' pending calls.
   - A group address pages only that group.
5. **Was it a duplicate?** Relay ignores a message whose Message-Id it has seen in the last 72 hours. Resending the same message from your mail client's *Sent* folder may count as a duplicate: send a new email to test.

If the call is created but its type is missing, `Smtp:DefaultCallType` doesn't exactly match one of your call types (it is case-sensitive). If an attachment is missing, the call's notes say it was too large (`Smtp:MaxAttachmentBytes`).

## The radio doesn't key

- **Test transmit** first (Configuration › Radio bridge). Stop the Radio Bridge before you test: it owns the radio.
- Check **PTT keying**: `Cm108` for a DMK URI, AIOC, RA-40 or RIM-Lite; `SerialRts` or `SerialDtr` for a serial keying circuit; `Vox` only for an interface that keys itself.
- `Cm108`: the right interface is picked under **CM108 interface**, and **CM108 GPIO pin for PTT** is right for it (3 for most). Check the interface shows under **Devices › CM108-class HID**.
- Serial: the right COM port is set and no other program (a radio programming tool, another Relay) has it open.
- LTE radios must be keyed with `Cm108` or a serial line, never `Vox`.
- Check the cable's PTT wire, and that the radio isn't in a menu or locked.

## First words are clipped

On the **radio** side (radio users miss the start of what app users say):

- Raise **Key-up lead**. About 150 ms suits analog radios with CTCSS; LTE radios need 500–800 ms. Use **Test transmit** with a listener; for LTE radios follow [Tune the key-up lead](lte-donor-radios.md#tune-the-key-up-lead).
- The lead is ignored with `Vox` keying: a `Vox` interface keys on the audio itself, so the start is always at risk. Use a hard PTT line if you can.

On the **app** side (app users miss the start of radio traffic):

- Lower the squelch **Open** level a little, and re-[tune](radio-bridge.md#tune-the-squelch) so static still stays closed.
- With an LTE radio, the radio's own delay is normal; keep the squelch hang at about 900 ms.

## Static is relayed to the channel

- **Open** is too close to the static floor: use **Start tuning** and set Open a few dB above the highest level you see with nobody transmitting.
- `Carrier` squelch needs a COR line on a serial port's CTS or DSR; with **Carrier detect** `None` (or a CM108 input), Relay uses the audio squelch instead and logs a warning.
- `Ctcss` squelch needs the **CTCSS tone (Hz)**; without it Relay uses the audio squelch.
- `Off` is for a radio with its own hardware squelch, whose audio is silent while it is closed: Relay passes any audio at or above **Open** (held through pauses for **Hang**). If the radio's squelch is open, its hiss reaches Open and is passed: close the radio's squelch, or use `Vox`.
- Turn the radio's own squelch up if it is open (an open receiver feeds constant noise).

## Feedback, echo or the radio stays keyed

- Keep **Half-duplex anti-loop** on.
- In Windows Sound settings, make sure **Listen to this device** is off for the interface's input: otherwise Windows plays the radio's audio straight back out to the radio.
- With a `Vox` interface, the interface may be keying on audio that isn't Relay's (Windows sounds, another app). Make the interface's output Relay's alone: not the Windows default device.
- Turn off the radio's own VOX.
- A dispatch tone-out on the same channel as a radio bridge is expected to be transmitted on the radio: that's the bridge doing its job, not a loop.
- A talker held the radio keyed too long? **Transmit time-out** (180 s by default, counted from when that talker took the floor) cuts them off.

## The recorder isn't saving recordings

| Symptom | Fix |
| --- | --- |
| Nothing is recorded | The recorder is connected (**LiveKit** pill) and on the right **Channel**; the voice-seat limit isn't reached (the log names channels it couldn't join). |
| Errors writing files under systemd | The unit only lets Relay write to `/var/lib/resgrid-relay`. Record there, or add your path to `ReadWritePaths=` in the unit. |
| Errors writing files in Docker | Mount a volume on `/app/recordings` (or your `LocalPath`) that the container's non-root user can write. |
| S3 uploads fail | Check the bucket, region, endpoint, keys, **Path-style addressing** (on for MinIO) and **Use HTTPS**. Until it's fixed, recordings are kept in `failed-uploads` in the recordings folder. |
| The disk is filling up | Relay never deletes recordings: set up a clean-up or an S3 lifecycle rule. |
| Can't find a recording | Folders are by **UTC** date: a late-evening transmission may be in the next day's folder. Search the metadata log by `startUtc` or `participantName`. |

## Tone-out is silent

- **Service URL** is set and reachable from the Relay host; the tile's **TTS** pill and the Logs screen show whether the text-to-speech service answers.
- The tile's **LiveKit** pill shows *Connected*, and **Channel** names the channel your members are on.
- Members only hear the tone-out while they are joined to that channel in the app.
- Calls that were already open when Relay started aren't announced, and scheduled or pending calls are announced only when they are dispatched.
- A failing tone-out is retried for **Give up after** minutes (10), then given up: the log says *Giving up on toning out call …*.

## Tone detect doesn't create calls

- `monitor <device>` shows levels that rise when the scanner plays; the scanner's volume isn't too low or clipping.
- The watcher's frequencies are right, and each `Time` is a little shorter than the real tone.
- The watcher is `Active`, has `Type` 1 or 2, and a group watcher's `Code` matches a group (*No valid Resgrid dispatch targets* means it doesn't).
- The log shows *WATCHER TRIGGERED* when tones are heard, and *CALL CREATED* after the recording length.

## Where the logs are

| Host | Logs |
| --- | --- |
| Desktop app | The **Logs** screen (live), and `%LOCALAPPDATA%\Resgrid\Relay\logs\relay-YYYYMMDD.log`, one file per day, kept 14 days. **Open log folder** on the Logs screen opens it. |
| Windows or macOS console | The terminal. Redirect it to a file when running unattended. |
| Linux systemd | `journalctl -u resgrid-relay -f` (or the name of your unit). |
| Docker | `docker logs -f resgrid-relay-smtp` (your container's name). |

Other useful files:

- SMTP: the raw copy of each message in the `messages` folder of the data directory (when **Save raw messages** is on), and `processed-messages.json`.
- Recorder: the metadata log (`transmissions.jsonl` or `transmissions.db`).

## Getting help

Include the Relay version (About screen, or the console's `version` command), the mode, and the relevant log lines (**Copy** on the Logs screen). Remove secrets first. Relay's source and issue tracker are at [github.com/Resgrid/Relay](https://github.com/Resgrid/Relay).
