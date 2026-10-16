# Copilot: modernize, review, and test

A 150-minute, hands-on GitHub Copilot workshop in Visual Studio Code. Build a
small local booking estimator, upgrade it from .NET 8 to .NET 10, review a
training-only change, and generate unit and browser tests. No cloud account,
database, or paid backend is required. GitHub Copilot access is required.

Start with [setup and preflight](docs/setup.md). Instructors should read the
[runbook and validation record](docs/instructor.md) before running an event.

## Before the event

Follow [setup and preflight](docs/setup.md) before arriving. Installing SDKs
and Playwright browsers is deliberately outside the timed workshop.

| Lab | Minutes |
| --- | ---: |
| [Setup and orientation](docs/setup.md) | 15 |
| [Modernization](labs/01-modernize.md) | 35 |
| [Instruction-driven review](labs/02-review.md) | 25 |
| [Test generation](labs/03-tests.md) | 45 |
| [Combined challenge](labs/04-challenge.md) | 20 |
| Wrap-up and buffer | 10 |
| **Total** | **150** |

The optional [Java exercise](labs/05-java-optional.md) is outside the 150 minutes.

## Repository map

- `starter/BookingLab`: runnable .NET 8 attendee application; no completed tests.
- `fixtures/review`: inert code-review exercise, excluded from the app build.
- `reference`: instructor checkpoints and worked tests. Open `starter` as your
  VS Code workspace via `attendee.code-workspace` during exercises so answers
  are not ordinary chat context.
- `scripts`: non-destructive checkpoint copying and preflight checks.
- `.github`: instructions, reusable prompts, agents, and reference CI.
- `docs/instructor.md`: timing, recovery, and validation status.

This is **modern .NET**, not the Windows-only .NET Framework. The workshop does
not demonstrate an ASP.NET Framework/System.Web migration.

AI output is nondeterministic. Inspect every change and verify behavior; a
successful prompt is not proof of correctness.
