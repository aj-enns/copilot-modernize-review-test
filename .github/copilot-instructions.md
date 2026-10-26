# Booking Lab contributor guidance

This is a teaching repository. Do not read reference solutions during attendee
exercises unless explicitly asked. Never integrate fixtures/review into the app.
Preserve the .NET 8 starter and the .NET 10 reference as separate checkpoints.

Business contract: nights 1..30 inclusive; guests 1..6 inclusive; USD 100 per
night plus USD 10 per guest per night. Stays of 1..6 nights receive no discount;
7..13 nights receive 10% off the whole subtotal; 14..30 nights receive 15% off
the whole subtotal, replacing rather than stacking with the weekly discount.
Use decimal for money, round to 2 places away from zero.
Invalid inputs must fail explicitly; API validation returns HTTP 400.
The UI must show failures and must not display a stale successful quote.

Keep dependencies small. No external services, secrets, cloud infrastructure,
or production deployment. Use accessible labels and role-based browser locators.
Never disable validation or weaken assertions to make a test pass.
Report actual commands and results, not assumed test success.
