---
sidebar_position: 17
title: Trainings
---

# Trainings

The Trainings module enables creation and delivery of training materials with quiz assessment capabilities. It is managed by the `TrainingsController`.

## Training List

Displays all trainings for the department.

## Creating Trainings

### Training Fields

| Field | Required | Description |
|-------|----------|-------------|
| Name | Yes | Training title |
| Description | No | HTML-decoded description |
| Training Text | No | HTML-decoded training content |
| Minimum Score | No | Minimum passing score for quizzes (default: 0) |

### Target Assignment

Trainings can be assigned to:
- **Send to All** — All department members (deduplicated)
- **Specific Roles** — All members with selected roles
- **Specific Groups** — All members of selected groups
- **Individual Users** — Specific personnel

### File Attachments

| Constraint | Value |
|-----------|-------|
| Maximum file size | 30 MB (larger than most modules) |
| Allowed file types | jpg, jpeg, png, gif, pdf, doc, docx, ppt, pptx, pps, ppsx, odt, xls, xlsx, mp3, m4a, ogg, wav, mp4, m4v, mov, wmv, avi, mpg, txt |

### Quiz System

Trainings can include a quiz with:
- Multiple questions (parsed from form keys `question_*`)
- Multiple-choice answers per question (parsed from `answerForQuestion_{q}_{a}`)
- One correct answer per question
- Questions and answers built from dynamic form fields

## Viewing Trainings

When a user views a training:
- The content is displayed (title, description, text, attachments)
- The training is **automatically marked as viewed** for the current user

This enables view tracking for compliance and reporting.

## Taking Quizzes

### Quiz View
Displays all questions with answer options. Marks the training as viewed.

### Quiz Grading

When a quiz is submitted:
1. Iterates through all submitted answers
2. Compares each answer to the correct answer
3. Counts correct responses
4. Records the score via `RecordTrainingQuizResultAsync`
5. Score is available for reporting

## Training Attachments

Attachments can be downloaded individually with validated department ownership.

## Deleting Trainings

Validates department ownership before deletion.

## Resetting User Training

Administrators can reset a specific user's training progress and quiz results:
- Clears all view and score records for that user on that training
- User will need to re-view and re-take the quiz

## Training Reports

The `Report` action generates a training participation report showing:
- All assigned users
- View status (has the user viewed the training?)
- Quiz results
- Group assignments for each user

## Interactions with Other Modules

| Module | Interaction |
|--------|-------------|
| **Personnel** | Training assignment targets |
| **Groups** | Group-based training assignment |
| **Personnel Roles** | Role-based training assignment |
| **Reports** | Training data used in activity and hours reports |
| **Logs** | Training counts in monthly analytics |
| **Department Settings** | Module can be enabled/disabled |
