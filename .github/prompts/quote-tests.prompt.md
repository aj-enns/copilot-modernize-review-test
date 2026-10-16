---
description: Generate boundary-focused quote tests
agent: agent
---
Locate the attendee app at starter/BookingLab, or BookingLab if a recovered
checkpoint folder is open. Read its QuoteCalculator.cs and the repository
business contract. Do not inspect reference solutions. Create an xUnit test
project at tests/BookingLab.Tests beside the BookingLab directory, reference
that app, and test 1 and 30 nights, 1 and 6 guests, invalid values
on both sides, and 6 versus 7 nights. Use literal expected totals independently
calculated from the contract. Run dotnet test and summarize evidence.
