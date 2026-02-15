# CampusFlow
# Smart Venue Booking System

## Problem
Manual venue booking leads to double bookings, conflicts, and lack of visibility.

## Solution
An automated system that:
- Accepts booking requests via Google Form
- Checks for conflicts (Venue + Date + Time Slot)
- Auto-approves or rejects
- Logs approved bookings
- Sends confirmation email

## Tech Stack
- Google Forms (Input)
- Google Sheets (Database)
- Make.com (Automation + Logic)
- Gmail (Notifications)

## Workflow
Input → Conflict Check → Decision → Database Update → Email Notification

## How to Test
1. Submit a booking form.
2. Submit same booking again.
3. First = Approved
4. Second = Rejected (Conflict detected)

## Authors
Team Name – BugBusters
Team ID - F1-003
