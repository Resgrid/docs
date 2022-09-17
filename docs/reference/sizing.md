---
sidebar_position: 2
---

# Sizing Guidelines

Usage is dynamic, so we cannot make hard recommendations on hardware or hardware configuration (i.e. CPU count, RAM, etc) but below are just some general guidelines on how we approach the systems design of the system based on how many active elements there are in the system.

:::tip Active Elements
An Active Element can be a user, unit, or system that is actively calling/utilizing the Resgrid API. Anything that is actively interacting with the system we would consider an active element. For example; if you have a department with 60 users, 25 vehicles and a RMS system pulling data from Resgrid you would have 86 active elements.
:::

## Micro and Test

For 50 Active Elements or less. This is our Quick Start scenario, one single server sized large enough to handle the concurrent load. 

## Small 

Up to 1,000 Active Elements

## Medium

Up to 5,000 Active Elements

## Large

Up to 10,000 Active Elements