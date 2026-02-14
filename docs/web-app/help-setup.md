---
sidebar_position: 36
title: Help & Setup
---

# Help & Setup

The Help module provides onboarding assistance and department configuration evaluation. It is managed by the `HelpController`.

## Dashboard Tutorial

The `DashboardTutorial` action returns a partial view overlay that guides new users through the dashboard interface.

## Setup Report

The `SetupReport` action generates a department configuration completeness evaluation:

1. Calls `GetDepartmentSetupReportAsync` to analyze the department's configuration
2. Generates a numerical score via `GenerateSetupScore`
3. Displays the report with recommendations

The setup report evaluates:
- Whether core settings are configured
- Whether groups/stations are created
- Whether units are defined
- Whether call types and priorities are set
- Whether notification rules are configured
- Other configuration completeness metrics

This helps new departments ensure they've properly configured all necessary system components before going operational.
