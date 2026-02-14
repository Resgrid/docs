---
sidebar_position: 15
title: Documents
---

# Documents

The Documents module provides file management and sharing capabilities for the department. It is managed by the `DocumentsController`.

## Document List

**Authorization:** `Documents_View` policy

Displays all department documents with:
- Category-based filtering
- Type-based filtering
- Document metadata

## Creating Documents

**Authorization:** `Documents_Create` policy + `CanCreateDocument()` runtime check

### Document Fields

| Field | Required | Description |
|-------|----------|-------------|
| Name | Yes | Document display name |
| Description | No | Document description |
| Category | No | Classification category |
| Admin Only | No | Restrict to admins (admin-only setting) |
| File | Yes | File upload |

### File Upload Constraints

| Constraint | Value |
|-----------|-------|
| Maximum file size | 10 MB |
| Allowed file types | jpg, jpeg, png, gif, pdf, doc, docx, ppt, pptx, pps, ppsx, odt, xls, xlsx, mp3, m4a, ogg, wav, mp4, m4v, mov, wmv, avi, mpg, txt |

### Audit Trail
Creates `AuditEvent` (DocumentAdded) and fires `DocumentAddedEvent`.

## Editing Documents

**Authorization:** `Documents_Update` policy

Modify document metadata and optionally replace the file. Same file validation constraints apply.

Creates `AuditEvent` (DocumentEdited).

## Downloading Documents

**Authorization:** `Documents_View` policy

Downloads the file with the original filename and content type. Validates:
- Document belongs to the department
- Admin-only access check

## Deleting Documents

**Authorization:** `Documents_Delete` policy

Validates that the user is either:
- A department administrator, OR
- The document's original creator

Creates `AuditEvent` (DocumentRemoved).

## Document Categories

Categories are managed through the [Types & Configuration](types-configuration) module:
- The `GetDepartmentDocumentCategories` endpoint returns distinct categories for filtering

## Interactions with Other Modules

| Module | Interaction |
|--------|-------------|
| **Types** | Document categories managed in Types controller |
| **Security** | Admin-only flag restricts access |
| **Department Settings** | Module can be enabled/disabled |
