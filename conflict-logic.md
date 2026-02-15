# Conflict Detection Logic – CampusFlow

## Problem

Clubs may request the same venue for the same date and time.
Manual checking leads to double bookings and confusion.

## Our Solution

We implemented automated conflict detection using Make.com.

The system checks:

- Venue
- Date
- Time Slot

## Decision Logic

IF:

Venue (new request) == Venue (existing booking)
AND
Date (new request) == Date (existing booking)
AND
Time Slot (new request) == Time Slot (existing booking)

→ Booking is REJECTED

ELSE:

→ Booking is APPROVED

## Why We Use Time Slots Instead of Exact Time

To simplify logic during hackathon implementation,
we predefined time slots:

- 9 AM – 11 AM
- 11 AM – 1 PM
- 2 PM – 4 PM
- 4 PM – 6 PM

This avoids complex time overlap calculations
while still preventing scheduling conflicts.

## Automation Flow

1. Form submission triggers Make.com scenario
2. System searches Google Sheet for matching entries
3. Router checks if conflict exists
4. Status updated in sheet
5. Gmail notification sent automatically

This ensures zero manual intervention.
