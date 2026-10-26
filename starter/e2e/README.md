# Booking Lab browser and API tests

Requires Node.js with npm and the .NET SDK targeted by
[BookingLab](../BookingLab/BookingLab.csproj).

From this directory:

```powershell
npm ci
npx playwright install chromium
npm test
```

Playwright starts and stops BookingLab itself at `http://127.0.0.1:5180`,
waiting for `/health`. The port must be free: existing servers are not reused.
Only Chromium runs. No manually started server or external service is needed.

The suite covers the 7-night discount and 6-night recalculation, the
13-to-14-night transition to a non-stacking 15% discount and back, and
30-night totals. It also covers inclusive API bounds and HTTP 400 outside
those bounds, and visible HTTP 500/network
failures that clear a previous total and recover on retry. Failure responses
are intercepted only in the browser tests; production code is unchanged.

Failure screenshots and traces are saved in `test-results`.
