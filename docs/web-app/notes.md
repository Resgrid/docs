---
sidebar_position: 16
title: Notes
---

# Notes

The Notes module provides a department knowledge base for storing and sharing information. It is managed by the `NotesController`.

## Note List

Displays all notes for the department.

## Creating Notes

**Authorization:** `CanUserAddNoteAsync` runtime check

### Note Fields

| Field | Required | Description |
|-------|----------|-------------|
| Title | Yes | Note title |
| Body | Yes | Note content (HTML-decoded before storage) |
| Category | No | Classification category |
| Admin Only | No | Restrict to admin view (admin-only setting) |

Non-admin users cannot set the admin-only flag (forced to `false`).

Creates `AuditEvent` (NoteAdded).

## Viewing Notes

Validates department ownership. Displays full note content with department context.

## Editing Notes

**Authorization:** `CanUserEditNoteAsync` runtime check

Modify note title, body, category, and admin-only flag. Body is HTML-decoded before storage.

Creates `AuditEvent` (NoteEdited).

## Deleting Notes

**Authorization:** `CanUserEditNoteAsync` runtime check

Creates `AuditEvent` (NoteRemoved).

## Note Categories

Categories are managed through the [Types & Configuration](types-configuration) module:
- `GetDepartmentNotesCategories` returns distinct categories for filtering

## Interactions with Other Modules

| Module | Interaction |
|--------|-------------|
| **Types** | Note categories managed in Types controller |
| **Security** | Admin-only flag restricts access; imperative auth checks |
| **Department Settings** | Module can be enabled/disabled |
