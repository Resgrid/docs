---
sidebar_position: 12
---

# Audio and Push To Talk

Audio and Push To Talk (PTT) in Resgrid provides voice communication capabilities for your department. The feature includes **Voice Channels** for real-time push-to-talk communication between personnel and **Audio Streams** for broadcasting live audio feeds (such as scanner feeds or dispatch radio) within the Resgrid interface.

## Why Audio and PTT Matter

During emergency operations, voice communication is often faster and more effective than text-based messaging. Push To Talk channels give your department a built-in voice communication system that works alongside your dispatch, mapping, and status features. Audio streams allow personnel to listen to relevant radio feeds directly from the Resgrid web application without needing separate equipment or apps.

## Scope

Voice channels and audio streams are department-wide. All personnel in the department can access the configured channels and streams (subject to permissions). Voice channels are managed through an integrated VoIP provider.

:::warning Subscription Required
Push To Talk and Voice Channels require an appropriate subscription plan that includes the PTT add-on. If the Voice section is not accessible or the New Channel option is not available, check your department's subscription level.
:::

## Voice Channels

Voice channels provide real-time push-to-talk communication between department personnel. Channels are created in Resgrid and provisioned through the integrated VoIP provider.

### Viewing Channels

Navigate to **Voice** from the main menu to see all configured voice channels.

### Creating a Voice Channel

Click **New Channel** to create a new voice channel.

| Field       | Required | Description                                                   |
| ----------- | -------- | ------------------------------------------------------------- |
| Name        | Yes      | The name of the voice channel (e.g., "Dispatch", "Command")  |
| Is Default  | No       | Marks this as the default channel for the department          |

When a channel is created, it is automatically provisioned with the VoIP provider. This means the channel is immediately available for use across all Resgrid applications.

### Editing a Voice Channel

You can edit a channel's name and default status. Changes are saved and synced with the VoIP provider.

### Deleting a Voice Channel

Deleting a channel removes it from both Resgrid and the VoIP provider. Personnel will no longer be able to connect to the deleted channel.

### Re-syncing Users

If personnel are not appearing in voice channels or are experiencing connection issues, you can use the **Resync** option to re-synchronize all department users with the VoIP provider. This re-initializes all user accounts with the voice system and can resolve connectivity issues.

## Audio Streams

Audio streams allow you to embed live audio feeds in the Resgrid web interface. These are typically used for scanner feeds, dispatch radio streams, or other live audio sources.

### Creating an Audio Stream

Click **New Audio** to add a new audio stream.

| Field | Required | Description                                                   |
| ----- | -------- | ------------------------------------------------------------- |
| Name  | Yes      | A descriptive name for the stream (e.g., "County Dispatch")   |
| URL   | Yes      | The URL of the audio stream (must be a valid streaming URL)   |

### Editing and Deleting Audio Streams

From the Voice page, you can edit a stream's name or URL, or delete streams that are no longer needed.

## Permissions

Audio and voice features are controlled by the following permissions:

| Permission    | Description                                  |
| ------------- | -------------------------------------------- |
| Voice View    | View voice channels and audio streams        |
| Voice Create  | Create and edit channels and audio streams   |
| Voice Delete  | Delete channels and audio streams            |

## How Audio Connects to Other Features

| Feature        | Connection                                                         |
| -------------- | ------------------------------------------------------------------ |
| Subscription   | PTT requires an appropriate subscription plan                      |
| Personnel      | All department personnel are synced to the VoIP provider           |
| Web App        | Audio streams are accessible from the Voice section                |
| Mobile Apps    | Voice channels are available in Resgrid mobile applications        |

## Common Errors and Resolutions

| Error                                   | Resolution                                                               |
| --------------------------------------- | ------------------------------------------------------------------------ |
| Voice section not available             | Verify your subscription includes PTT/Voice capabilities                 |
| Cannot create new channel               | Check subscription limits and ensure you have Voice Create permission    |
| Personnel not appearing in channels     | Use the Resync option to re-initialize users with the VoIP provider      |
| Audio stream not playing                | Verify the stream URL is valid and accessible; check for HTTPS/HTTP mixed content issues |
| Connection issues with voice            | Try Resync; ensure personnel have stable internet connections            |
