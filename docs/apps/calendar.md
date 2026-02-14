---
sidebar_position: 1
---

# Overview

Resgrid provides a suite of purpose-built applications for emergency services and incident management. All applications are built with **React Native** and **Expo**, sharing a common technology foundation while being tailored to specific operational roles.

## Supported Platforms

Every Resgrid application supports the following platforms from a single codebase:

| Platform | Method | Details |
|----------|--------|---------|
| **iOS** | Native via Expo/EAS Build | iPhone and iPad support |
| **Android** | Native via Expo/EAS Build | Phones and tablets |
| **Web** | Expo Web export | Served via nginx/Docker containers |
| **macOS** | Electron | DMG packages for Intel and Apple Silicon |
| **Windows** | Electron | NSIS installer and portable executables |
| **Linux** | Electron | AppImage, DEB, and RPM packages |

## Application Suite

| App | Target User | Primary Purpose |
|-----|-------------|-----------------|
| [Responder](responder) | Individual personnel | Personal status, calls, messaging, shifts, and calendar management |
| [Unit](unit) | Vehicle/apparatus crews | Shared device for unit status, GPS tracking, role assignments, and dispatch |
| [Dispatch](dispatch) | Dispatchers and coordinators | Multi-panel dispatch console with real-time resource management |
| [Big Board](big-board) | Stations and command centers | Customizable dashboard with drag-and-drop widgets for situational awareness |

## Common Technology Stack

All applications share the following core technologies:

- **React Native 0.79** with Expo SDK 53 and New Architecture enabled
- **TypeScript 5.8** for type safety
- **Expo Router** for file-based navigation
- **Zustand** for state management with MMKV persistence
- **TanStack React Query** for server state and data fetching
- **Mapbox GL** for mapping and geolocation
- **SignalR** for real-time WebSocket event updates
- **LiveKit** for WebRTC push-to-talk voice channels
- **Firebase Cloud Messaging** and **Notifee** for push notifications
- **Novu** for in-app notification inbox
- **NativeWind** (Tailwind CSS) with GlueStack UI components
- **Sentry** for error tracking and **Countly** for analytics
- **i18next** for internationalization (English, Spanish, Arabic)

## Self-Hosted Support

All applications support configurable server URLs, allowing organizations running self-hosted Resgrid instances to point each app at their own API infrastructure.
