---
sidebar_position: 3
---

# Unit

Resgrid Unit is a cross-platform application designed for **vehicle and apparatus-level operations**. Where the Responder app is designed for individual personnel, the Unit app is designed to represent a **shared device mounted in or associated with a unit** (engine, ambulance, patrol car, etc.), providing crews with live dispatch data, voice channels, GPS tracking, and status reporting with minimal interaction required.

## Ideal Use Cases

- **Apparatus-Mounted Tablets** — Mount a tablet in the cab of an engine, ambulance, or command vehicle as a dedicated dispatch terminal with live map, call details, and status controls.
- **Shared Crew Devices** — A single device shared among the crew of a unit, where role assignments track who is filling which position (Driver, Officer, Firefighter, etc.).
- **Vehicle GPS Tracking** — Continuous foreground and background GPS reporting to show unit positions on department maps in real-time.
- **Field Push-to-Talk** — Walkie-talkie-style voice communication from the apparatus, with support for vehicle-mounted Bluetooth PTT buttons.
- **Dispatch Monitoring** — View active calls, set the unit's active call, get turn-by-turn navigation to incident locations, and add call notes from the field.
- **Offline / Low-Connectivity Environments** — Status changes and other actions are queued when offline and automatically retried when connectivity returns.

## Supported Platforms

| Platform | Support Level | Details |
|----------|:------------:|---------|
| **iOS** | ✅ Full | iPhone and iPad, with CallKeep VoIP and critical alerts |
| **Android** | ✅ Full | Phones and tablets, with foreground services for background operations |
| **Web** | ✅ Full | Expo web export served via nginx/Docker |
| **macOS** | ✅ Full | Electron — DMG and ZIP targets for Intel (x64) and Apple Silicon (arm64) |
| **Windows** | ✅ Full | Electron — NSIS installer and portable executable (x64) |
| **Linux** | ✅ Full | Electron — AppImage, DEB, and RPM packages (x64) |

## Operations & Features

### Real-Time Map (Home Tab)
- Full **Mapbox GL** interactive map as the primary home screen
- Renders map pins for personnel, units, stations, and calls with custom icons
- **Dark/light theme** toggle for map style
- **Camera follow modes**: normal tracking vs. locked navigation mode (heading-oriented, tilted perspective for turn-by-turn navigation)
- **Recenter button** snaps camera back to current GPS position
- Tap pins for type-specific detail modals (call, personnel, unit, station)
- Map lock toggle in the sidebar unit card

### Unit Status Management
- Multi-step status flow via bottom sheet:
  1. **Select Status** — Choose from department-configured custom unit statuses with colour-coded buttons (Available, Responding, On Scene, Returning, Out of Service, etc.)
  2. **Select Destination** — Optional step depending on status type: None, select a Call, or select a Station/Group
  3. **Add Note** — Optional free-text note attached to the status change
- Status changes are sent to the API and propagated in real-time via SignalR
- **Offline queue**: status changes made while offline are persisted and retried when connectivity returns
- Colour-coded status card in the sidebar reflects the current state

### Unit Role Assignments
- Role management bottom sheet from the sidebar roles card
- View all roles defined for the active unit with currently assigned personnel
- **Assign/unassign** department personnel to each role (e.g., Driver, Officer, Firefighter)
- Displays fill count (e.g., "2/4 Roles Filled")

### Active Call Management
- **Active Call sidebar card** shows the currently selected call with View, Directions, and Deselect actions
- Tap to open a bottom sheet to switch the active call
- Quick access to turn-by-turn navigation to the call location

### Calls
- **Call list** with search and pull-to-refresh
- **Create new calls** with:
  - Name, nature/description, priority, and type
  - Contact name and information
  - **Five location input methods**: address search (Google Geocoding), GPS coordinate entry, [what3words](https://what3words.com) word search, Plus Code search, and interactive map picker
  - **Dispatch selection**: multi-select users, groups, roles, units, or everyone
- **Call detail view** with tabs: Info, Contact, Protocols, Dispatched resources, and Timeline
- Add **notes**, **images**, and **file attachments** to calls
- **Route to call** in native Maps for turn-by-turn navigation
- Set as active call, edit, and close calls (permission-gated)

### Push-to-Talk (PTT) Voice
- **LiveKit WebRTC** integration for real-time voice channels
- Join and leave department voice rooms
- Microphone toggle (mute/unmute) with "Talking" indicator in the sidebar
- **Audio routing**: Bluetooth, speaker, or earpiece
- **CallKeep integration** for OS-level VoIP call handling (iOS CallKit, Android ConnectionService)

### Bluetooth PTT Devices
- BLE device management for external push-to-talk buttons
- **Scan, discover, and connect** to supported BLE audio devices
- **Supported devices**: AINA PTT, B01 Inrico, HYS headsets
- Per-device protocol parsing for PTT button press/release events
- PTT button press toggles LiveKit microphone (push-to-talk behaviour)
- Volume control and audio routing forwarded to LiveKit
- Preferred device persistence across sessions

### Audio Streams
- Listen to **department audio streams** (scanner feeds, dispatch audio)
- Play/pause streaming audio with sidebar radio icon indicator

### Contacts, Notes & Protocols
- **Contact directory** with search, pull-to-refresh, and detail bottom sheet
- **Department notes** list with detail view
- **Emergency protocols/SOPs** with detail sheets

### Notifications
- **Push notifications** via Firebase Cloud Messaging with Notifee
- **Android notification channels** mapped to call priorities: emergency (P0), high (P1), medium (P2), low (P3), plus 25 custom priority channels
- iOS critical alert support to bypass Do Not Disturb
- Custom notification sounds per channel
- Handles foreground, background, and killed-state notification delivery
- Notification tap navigates to the relevant call
- **In-app notification inbox** powered by Novu with unread badges

### Real-Time Updates (SignalR)
- Two persistent WebSocket connections:
  - **Eventing Hub**: personnel status/staffing updated, unit status updated, calls updated/added/closed
  - **Geolocation Hub**: live personnel and unit location updates
- Auto-reconnect with 5 retries and token refresh
- Events trigger automatic store refreshes

### Background Location Tracking
- Foreground and background GPS tracking via Expo Location and Task Manager
- Sends unit position updates to the Resgrid API at regular intervals
- Configurable on/off in settings; opt-in during onboarding
- Web fallback via browser Geolocation API

### Offline Resilience
- **Offline event queue** persists pending API operations when offline
- Automatically retries queued events when connectivity is restored
- Stored via MMKV for fast, synchronous persistence

## Navigation Structure

The app uses a sidebar/drawer layout that adapts to orientation:

- **Portrait**: Left drawer (swipe or hamburger button)
- **Landscape/Tablet**: Fixed side panel always visible

**Sidebar contains**:
- Unit card (name, type, group, voice/map-lock/audio buttons)
- Status card (colour-coded current status)
- Roles card (role fill count, tap to manage)
- Active Call card (or "select call" prompt)
- Quick-action status change buttons

**Main tabs**: Map (Home), Calls, Contacts, Notes, Protocols, Settings

**Modal screens**: Create New Call, Call Detail, Edit Call

## Settings & Configuration

| Setting | Description |
|---------|-------------|
| **Server URL** | Custom API endpoint for self-hosted deployments |
| **Active Unit** | Select which unit this device represents (dropdown of assigned units) |
| **Login Info** | Update username and password |
| **Theme** | Light, Dark, or System |
| **Language** | English, Spanish, or Arabic |
| **Keep Alive** | Prevent screen from sleeping (useful for apparatus-mounted tablets) |
| **Background Geolocation** | Enable/disable background GPS tracking |
| **Bluetooth Device** | Scan and pair BLE PTT headsets |

### Onboarding
First-time setup includes a 3-page walkthrough:
1. **Location tracking** permission request
2. **Notification** permission request
3. **Call interaction** (CallKeep) setup

## Hardware & Permission Requirements

### Required Hardware
| Hardware | Required | Purpose |
|----------|:--------:|---------|
| GPS | **Yes** | Core unit tracking and map positioning |
| Internet | **Yes** | API, SignalR, LiveKit, push notifications |
| Speaker | Recommended | Audio streams and voice playback |
| Microphone | Recommended | PTT voice communication |
| Camera | Optional | Attaching images to calls |
| Bluetooth LE | Optional | External PTT button devices (AINA, B01 Inrico, HYS) |

### iOS Permissions
| Permission | Reason |
|------------|--------|
| Location When In Use | Map and unit tracking |
| Location Always | Background unit location reporting |
| Microphone | PTT voice communication |
| Camera | Attaching images to calls |
| Bluetooth Always | BLE PTT device connectivity |

**Background Modes**: remote-notification, audio, bluetooth-central, voip

**Entitlements** (production): Critical alerts and time-sensitive notifications

### Android Permissions
| Permission | Reason |
|------------|--------|
| Fine Location | GPS tracking |
| Background Location | Background unit position reporting |
| Record Audio | PTT voice |
| Capture Audio Output | Audio stream capture |
| Camera | Image attachments |
| Post Notifications | Push notifications (Android 13+) |
| Wake Lock | Keep device awake for tracking |
| Read Phone State / Manage Own Calls | CallKeep VoIP integration |
| Foreground Service | Persistent background services |
| Foreground Service (Microphone) | Voice in foreground service |
| Foreground Service (Phone Call) | VoIP in foreground service |
| Foreground Service (Connected Device) | BLE in foreground service |
| Foreground Service (Media Playback) | Audio stream in foreground service |

### Desktop (Electron)
- macOS: hidden title bar with traffic light inset
- Notification IPC bridge for web-to-native notifications
- Deep link handling support
- Custom `app://` protocol for serving the Expo web export
