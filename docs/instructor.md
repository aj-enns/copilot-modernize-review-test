# Instructor runbook

## Timing (150 minutes exactly)

| Elapsed | Activity | Stop condition |
| --- | --- | --- |
| 00:00-00:15 | Setup/orientation | Everyone sees USD 756.00 |
| 00:15-00:50 | Modernization | SDK + TFM 10, unchanged quote |
| 00:50-01:15 | Review | Concrete fixture findings + decisions |
| 01:15-02:00 | Test generation | Unit and browser evidence |
| 02:00-02:20 | Combined challenge | 14-night boundary verified |
| 02:20-02:30 | Debrief/buffer | Discuss evidence and limitations |

Java is optional after the session. Do not spend the core lab installing Java.
Ask attendees to do setup and dependency/browser downloads before the event.
Pre-event check Copilot access, extension names, policy, quota, and PR-review
availability with the actual attendee tenant. AI model output and UI labels can
change; never promise a fixed number or text of review comments.

## Facilitation

Use the same BookingLab through all required labs. Explain that an SDK version
upgrade is not a Windows .NET Framework migration. For this small app the
correct upgrade can be just two configuration files. Resist padding the demo
with unnecessary package/API changes.

Keep the attendee workspace on `starter`; open repository root only when
demonstrating instructions and the inert review fixture. Reference solutions
are outside the attendee workspace and should not be attached to prompts.
This is context separation, not a security boundary: an agent with filesystem
tools could still read them, so the prompt explicitly prohibits it.

If the upgrade agent spends more than 10 minutes blocked, use the prompt
fallback or a fresh modernized checkpoint and explain which experience was
demonstrated. If tests are unfinished at 02:00, show reference evidence and
proceed; do not claim attendees generated it themselves.

Test coach demonstrates role selection, not a special runtime or autonomous
cloud agent. Prompt files and custom agents follow the current VS Code Local
harness documentation. Check picker discovery before class.

The review fixture is intentionally outside every build. Do not copy it into
the app or publish a vulnerable deployed service. Refer to
`reference/review-notes.md` for failing examples and a legitimate non-finding.
Use an instructor-owned fork for any live GitHub PR demonstration.

## Checkpoints and recovery

`starter` is a complete runnable .NET 8 start; `reference/modernized` is a
standalone runnable .NET 10 checkpoint. Their Program, calculator and HTML
should be identical; only TFM and SDK differ. `reference/tests` and
`reference/e2e` are completed test frameworks, not attendee starts.

From repo root, run `scripts/checkpoint.ps1 -Stage modernized -Name demo-01`
(PowerShell: prefix `.\`) or
`bash scripts/checkpoint.sh modernized demo-01`. Existing names are rejected.
The copy has no build output, tests, or reference answers; it includes shared
Copilot customizations. Preserve attendee work and open the printed folder.
No branch/tag download or destructive reset is involved.

## Repeatable reference checks

From repository root:

```powershell
Push-Location .\starter
dotnet --version
dotnet build .\BookingLab
Pop-Location
Push-Location .\reference\modernized
dotnet --version
dotnet build .\BookingLab
Pop-Location
dotnet test .\reference\tests\BookingLab.Tests
Push-Location .\reference\e2e
npm ci
npx playwright install chromium
npm test
Pop-Location
```

```bash
(cd starter && dotnet --version && dotnet build BookingLab)
(cd reference/modernized && dotnet --version && dotnet build BookingLab)
dotnet test reference/tests/BookingLab.Tests
(cd reference/e2e && npm ci && npx playwright install chromium && npm test)
```

Starter run check is documented in setup. Java test/run commands are in the
optional lab. CI independently runs core references on Linux plus Java 17 and
21. Browser tests use their own managed server; never leave a manual server on
5180 when invoking them.

## Initial publication validation

Observed on Windows, October 16, 2026:

| Check | Observed result |
| --- | --- |
| Starter selected SDK / build | 8.0.426; build passed, no warnings |
| Starter live HTTP | Health + HTML + four pricing totals + six invalid payloads passed |
| Modernized selected SDK / build | 10.0.300; build passed, no warnings |
| Reference xUnit | 11 passed |
| Reference Playwright / Chromium | 4 passed with managed .NET 10 server |
| PowerShell preflight | Passed |
| PowerShell recovery | Both copied checkpoints built; existing destination rejected |
| Git Bash preflight/recovery on Windows | Passed; both copied checkpoints built; existing destination rejected |
| Checkpoint source parity | Program, calculator and HTML match exactly |
| Java local execution | Not run: JDK and Maven absent on the authoring host |
| Linux core CI | Build, 11 xUnit cases, 4 Chromium tests and bash recovery passed |
| Linux Java 17 starter CI | 2 test methods passed; console printed USD 756.00 |
| Linux Java 21 reference CI | 2 test methods passed; console printed USD 756.00 |

Initial cross-platform evidence:
[successful publication run](https://github.com/aj-enns/copilot-modernize-review-test/actions/runs/38954662063).
CI verifies Java 17/21 and the core reference on Linux. The workflow uses
Ubuntu 24.04 explicitly to avoid an event-time change of the `ubuntu-latest`
image and current supported action majors rather than deprecated Node 20
actions. Inspect the latest run in the repository's Actions tab before class;
a previous passing run is not proof that a subsequent change still works.
Bash scripts were also exercised with Git Bash on Windows; macOS-specific
setup still needs pre-event verification on the actual attendee OS.
Copilot prompts and extension interactions are documented from current official
sources, not a recorded automated Copilot UI run. Rehearse them with the current
extensions and attendee entitlement before presenting.
