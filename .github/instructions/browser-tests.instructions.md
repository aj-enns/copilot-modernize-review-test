---
applyTo: "**/*.spec.ts"
---
Use Playwright webServer lifecycle management and Chromium. Prefer getByRole
and getByLabel. Assert visible outcomes, use no arbitrary sleeps, and test an
error path. Tests must be independent and must not depend on an existing server.
