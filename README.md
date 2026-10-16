# Copilot: modernize, review, and test

A 150-minute student workshop in VS Code: upgrade a booking app from .NET 8 to
.NET 10, review code, and create unit and browser tests. Runs locally; no cloud
account or database needed. GitHub Copilot access is required.

## Start here

1. Complete [setup and preflight](docs/setup.md) before class, including creating
   your own branch so `main` stays unchanged.
2. In VS Code, choose **File > Open Folder...** and open your cloned repository.
   This is the **repository root**, where `README.md` lives.
3. Finish the [orientation app check](docs/setup.md#during-the-15-minute-orientation),
   then open [Lab 1: Modernization](labs/01-modernize.md).

Edit `starter/BookingLab`, not `reference`. Each lab says where to run commands.

## Run the labs

**Setup complete? Start with [Lab 1: Modernization](labs/01-modernize.md).**
In VS Code Explorer, open `labs` then `01-modernize.md`. Follow its numbered
steps, then continue with Labs 2, 3, and 4 below.

| Lab | Minutes |
| --- | ---: |
| [Setup and orientation](docs/setup.md) | 15 |
| [Lab 1: Modernization](labs/01-modernize.md) | 35 |
| [Lab 2: Instruction-driven review](labs/02-review.md) | 25 |
| [Lab 3: Test generation](labs/03-tests.md) | 45 |
| [Lab 4: Combined challenge](labs/04-challenge.md) | 20 |
| Wrap-up and buffer | 10 |
| **Total** | **150** |

The optional [Java exercise](labs/05-java-optional.md) is outside the 150 minutes.

## Repository map

- `starter/BookingLab`: your .NET 8 starting app.
- `fixtures/review`: review exercise; never part of the running app.
- `reference`: worked examples for help.
- `scripts`: setup checks and recovery tools.
- `.github`: Copilot instructions, prompts, agents, and CI.

## Stuck? Where to get help

Try first. If stuck, save your work and compare with an example:

| Need help with | Reference |
| --- | --- |
| Running the app or missing tools | [Setup troubleshooting](docs/setup.md#troubleshooting) |
| The .NET 10 upgrade | `reference/modernized` |
| Understanding review findings | `reference/review-notes.md` |
| Unit tests | `reference/tests/BookingLab.Tests` |
| Browser tests | `reference/e2e` |
| Starting over without losing your work | [Recovery instructions](docs/setup.md#recovery-without-overwriting-work) |

Copilot avoids references unless you explicitly ask it to read one. Use them to
understand a solution, not overwrite your work.

This workshop uses modern .NET, not Windows-only .NET Framework.
Inspect AI changes and check behavior; a successful prompt is not proof.
