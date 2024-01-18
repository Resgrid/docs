---
sidebar_position: 3
---

# Geolocation and AVL

Resgrid uses our 2 applications installed on cell phones or tablets to send back geolocation data to the system to show real-time location updates.

## Personnel

The Resgrid Responder application which is tailored for people in your organization.

:::tip Device Geolocation Permissions
The Resgrid Responder app needs appropriate permissions on the device to be able to send gps information in app and out of app (background). If you want to ensure
gps information is sent, all devices at the Responder app is installed in you need to check the setting for the app in the Device's setting area and enable geolocation.
:::

![Resgrid Responder App](/img/how-tos/geolocation/Responder.png)

### Responder Realtime Location Updates

If this setting is enabled, while the app is open, location updates will be automatically sent every minute. This setting requires the Precise Geolocation setting to be enabled for the app on the device. Also, if this setting is disabled, and geolocation is enabled on the device for the app when the user submits a status (i.e. Responding) geolocation will be sent with that status update.

### Responder Background Geolocation

Background enabled location updates when the app is not in the foreground of the device, i.e. is in the background, and will send those updates to the system. This is useful when you need to send real-time location updates while also using other applications on your device.

:::danger Battery
Background Geolocation can cause battery drain. It's not recommended to enable Background Geolocation if you are running only on battery for a long period of time.
:::

## Unit, Apparatus or Team

The Department menu will be named after your department and is a drop down. If you are a department admin or managing member (the overall owner of the department) you will see the admin options, normal users will just see the options under that.

![Department Menu](/img/how-tos/nav/Website_Menu_Nav.png)
