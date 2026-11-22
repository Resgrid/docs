---
sidebar_position: 10
title: Tone Detect (Audio)
description: "Listen to a scanner or radio on a Windows sound card for two-tone and single-tone pages and create Resgrid calls with the dispatch audio attached."
---

# Tone Detect (Audio)

In `audio` mode Relay listens to a scanner or radio on a Windows sound card for **paging tones**: the two-tone sequential (or single-tone) pages your dispatch center sends to set off station pagers. When it hears a station's tones, it records the dispatch that follows and creates a Resgrid call with the recording attached, so your members get the page in the Resgrid apps and can listen to the dispatch.

<AcademyVideo id="22-relay" />

Tone detect runs on Windows only, in the desktop app or the Windows console host.

## What you need

- A **Windows PC** with an audio input: a line-in jack, or a USB sound card.
- A **scanner or receiver** on your dispatch channel, with a line or speaker output cabled to the PC's input.
- The **tone frequencies** (in Hz) and lengths for each station or group you want to watch. Your dispatch center, or whoever programs your pagers, has them.
- A **group** in Resgrid for each station you watch, with a dispatch email code (see [Groups & Stations](../../web-app/groups-stations.md)), unless you only page the whole department.
- The [Resgrid credentials](connect-to-resgrid.md). Any grant type works; `RefreshToken` is recommended.

## How it works

1. Relay listens to the input continuously and picks out tones.
2. Each **watcher** (a station, a group or the whole department) has one or more **triggers**: one or two tone frequencies and the minimum time each must last. When a trigger's tones are heard, the watcher fires.
3. Relay records the audio that follows for **AudioLength** seconds: the voice dispatch.
4. It creates a call and attaches the recording.

| Call field | Value |
| --- | --- |
| **Name** | *Audio Import* and the date and time, or *ALLCALL Audio Import* for a department watcher. |
| **Nature** | *Relay import, listen to audio for call info. Toned:* and the watchers that fired. |
| **Priority** | 1. |
| **Type** | *Relay Audio*, if your department has a call type with exactly that name. |
| **Dispatched to** | A department watcher: everyone (saved as a pending call with the system API key, see [Connect to Resgrid](connect-to-resgrid.md#system-api-key-and-hosted-relays)). A group watcher: its group, plus any additional groups. |
| **Files** | The recorded dispatch audio. |

If more stations are toned while a recording is running, they ride along on the same call (with `Multiple` set to `false`, the default), so a multi-station page is one call dispatched to every station. With `Multiple` set to `true`, each watcher gets its own call.

Creating the call and uploading the audio are retried on network errors, and a retry never creates a second call.

## Create the watcher file

Watchers, triggers and the input device are kept in a **watcher file** (`settings.json`), separate from Relay's other settings. Create it with the Windows console host's `setup` command:

```powershell
.\Resgrid.Audio.Relay.Console.exe setup
```

`setup` asks for:

1. The Resgrid API URL, client id, client secret and refresh token. These are a fallback: the Resgrid settings in the desktop app, `appsettings.json` or environment variables take precedence when they are set.
2. The audio device number, from the list it prints.
3. The recording length in seconds.
4. Whether to create separate calls per watcher (`Multiple`).
5. How many watchers, then for each watcher: its name, its group's dispatch code (or the department's), whether it is a department watcher, any additional group codes (comma-separated), the number of tones (1 or 2) and each tone's frequency in Hz and length in milliseconds.

It writes the file Relay will read (`AudioConfigPath`, `settings.json` next to the program by default). Run `setup` again to change it; it starts from the values already in the file. The console archive ships an example `settings.json` with sample stations: replace them with yours.

Then set the mode to `audio`: in the desktop app (start **Audio Tone-Detect** on Operations), in `appsettings.json` (`"Mode": "audio"`), or with `RESGRID__RELAY__Mode=audio`.

### In the desktop app

The desktop app has no watcher editor. **Configuration › Audio tone-detect (Windows)** has the **Watcher file (settings.json)** path and **Open watcher file**, which opens it in your text editor. Point the path at the file you created with `setup` (the full path, if it isn't in the desktop app's folder). The pre-flight check on Operations won't start tone detect until the file exists.

## The watcher file

```json
{
  "InputDevice": 0,
  "AudioLength": 120,
  "Multiple": false,
  "Tolerance": 100,
  "Threshold": -50,
  "EnableSilenceDetection": false,
  "Watchers": [
    {
      "Name": "All call",
      "Active": true,
      "Code": "",
      "Type": 1,
      "Triggers": [ { "Frequency1": 1084.0, "Time1": 2000, "Count": 1 } ]
    },
    {
      "Name": "Station 1",
      "Active": true,
      "Code": "station1",
      "AdditionalCodes": "rescue1",
      "Type": 2,
      "Triggers": [ { "Frequency1": 524.0, "Frequency2": 794.0, "Time1": 500, "Time2": 500, "Count": 2 } ]
    }
  ]
}
```

| Setting | Meaning |
| --- | --- |
| `InputDevice` | The audio input number (see `devices`, or **Devices** in the desktop app). |
| `AudioLength` | Seconds of dispatch audio to record after the tones. |
| `Multiple` | `false`: stations toned during a recording join the same call. `true`: a call per watcher. |
| `Tolerance` | The tone detector's power threshold (100 by default). Change it only if tones are missed or false triggers happen, and test after each change. |
| `EnableSilenceDetection`, `Threshold` | With silence detection on, audio quieter than `Threshold` (dB) is left out of the recording. Off by default. |
| `Resgrid` | Fallback credentials written by `setup` (see above). The grant type, system API key and department id always come from Relay's own Resgrid settings. |
| `Watchers` | The stations, groups or department to watch. |

Each watcher:

| Setting | Meaning |
| --- | --- |
| `Name` | Shown in the logs and in the call's nature. |
| `Active` | `false` ignores the watcher without deleting it. |
| `Type` | `1`: a department (ALLCALL) watcher that pages everyone. `2`: a group watcher. |
| `Code` | For a group watcher, the group's dispatch email code (or its id or name). |
| `AdditionalCodes` | More group codes to dispatch with it, comma-separated. |
| `Triggers` | One or more tone patterns that fire the watcher. |
| `Id` | A unique id; `setup` creates it. |

Each trigger:

| Setting | Meaning |
| --- | --- |
| `Count` | `1` for a single tone, `2` for a two-tone sequence. |
| `Frequency1`, `Frequency2` | The tones in Hz. Fractional frequencies (Quick Call II tones such as 368.5 Hz) are matched to the nearest hertz. |
| `Time1`, `Time2` | The **minimum** length of each tone, in milliseconds. The second tone has to follow the first promptly. |

Set each `Time` a little shorter than the real tone (for example 800 for a one-second tone), so a slightly short tone still matches, but long enough that a voice or a different page doesn't.

Every watcher needs a `Type` of 1 or 2, and a group watcher a `Code` that matches a group: a watcher Relay can't dispatch logs *No valid Resgrid dispatch targets*.

## Check the audio

1. Run `.\Resgrid.Audio.Relay.Console.exe devices` and note the input number of your sound card.
2. Run `.\Resgrid.Audio.Relay.Console.exe monitor 1` (your number) and listen to the scanner: the levels it prints should rise with traffic and not sit at the maximum. Adjust the scanner's volume, then `Ctrl+C`.
3. While tone detect runs, the Dashboard tile's **Receive level** meter shows the same input.

## Test it

Make a watcher for a test group with tones your dispatch center doesn't use, start tone detect, and play those tones into the input from a tone generator. The Logs screen shows *WATCHER TRIGGERED* with the watcher's name, then *CALL CREATED*, and the call appears in Resgrid with the recording attached after **AudioLength** seconds.

## Running it

- In the desktop app, start **Audio Tone-Detect** on the Operations screen and turn on **Auto-start**.
- On a headless Windows PC, run `.\Resgrid.Audio.Relay.Console.exe run` with `Mode` `audio`.

If the input device stops (a USB sound card unplugged), tone detect faults instead of carrying on deaf: the tile and a tray notification say so. Plug it back in and restart the mode.

For a radio you also want to talk on, rather than only listen to, use the [radio bridge](radio-bridge.md) instead: it can join the radio to a Resgrid PTT channel, and raise emergency tones as calls.
