# Setup and orientation - 15 minutes

## Install before the event

Use Windows, macOS, or Linux, with VS Code as the IDE throughout.

| Requirement | Preflight |
| --- | --- |
| Git and internet access to GitHub, NuGet, npm, browser downloads | `git --version` |
| .NET **8 and 10 SDKs**, including corresponding ASP.NET Core runtimes | `dotnet --list-sdks` and `dotnet --list-runtimes` |
| Node.js 22 LTS or newer supported LTS, npm | `node --version` and `npm --version` |
| Current stable VS Code; `code` command on PATH | `code --version` |
| GitHub Copilot and C# Dev Kit extensions | Sign in and send a chat message |
| **GitHub Copilot upgrade** extension | Agent picker contains **Upgrade** |
| Playwright Test for VS Code (recommended, CLI also works) | Extensions view |

Download SDKs from https://dotnet.microsoft.com/download, Node from
https://nodejs.org, and VS Code from https://code.visualstudio.com.
On macOS, run **Shell Command: Install 'code' command in PATH** in VS Code.
Use native SDKs matching your CPU architecture. A runtime alone cannot build.
`global.json` selects an installed stable feature band of the named major.
.NET 8 is the intentional legacy exercise target; check its support lifecycle
before reusing this lab after November 2026.

Copilot access and enough chat/agent usage quota are required. Organization
policy can disable extensions, models, agents, code review, or instruction use.
PR review availability/billing differs from chat access; verify it with your
organization before the event. A public repository does not grant Copilot access.
Do not upload private employer code, secrets, or real customer data.
Agents can run terminal commands: inspect permission requests rather than
enabling blanket approval. No MCP server is needed for this workshop.

## Clone and warm dependencies (before the event)

Run from the directory where you keep projects. The public HTTPS clone needs no
SSH setup. The maintainer's custom SSH alias is not an attendee prerequisite.

```text
git clone https://github.com/aj-enns/copilot-modernize-review-test.git
cd copilot-modernize-review-test
```

Windows PowerShell, from repository root:

```powershell
.\scripts\preflight.ps1
dotnet restore .\starter\BookingLab
dotnet restore .\reference\tests\BookingLab.Tests
Set-Location .\reference\e2e
npm ci
npx playwright install chromium
Set-Location ..\..
code .\attendee.code-workspace
```

macOS/Linux bash, from repository root:

```bash
bash scripts/preflight.sh
dotnet restore starter/BookingLab
dotnet restore reference/tests/BookingLab.Tests
cd reference/e2e
npm ci
npx playwright install chromium
cd ../..
code attendee.code-workspace
```

On Linux, Playwright may require OS libraries:
`npx playwright install --with-deps chromium` (administrator approval may be
needed). Do this before class. Use your organization's approved package feeds
and proxies; do not disable TLS verification.

If PowerShell execution policy blocks a script, follow your organization's
approved signed-script/process policy or use the bash equivalent; do not change
machine-wide policy just for the lab.

## During the 15-minute orientation

The workspace opens **starter**, not reference solutions. In Copilot Chat select
the VS Code **Local** harness if your version exposes a harness selector.
Use the built-in **Agent** role for editing. The parent repository discovery
setting loads `.github` customizations without adding `reference` as a workspace
folder. VS Code may ask you to trust the parent repository for this discovery;
only trust the downloaded lab after inspecting its contents.
Confirm **Test coach** appears in the agent picker and `/quote-tests`
in the prompt picker. If unavailable, open **Chat: Open Customizations**, inspect
the selected harness, and use the literal prompts in the labs.

Start a terminal at `starter` (the workspace root):

```text
dotnet --version
dotnet build BookingLab
dotnet run --project BookingLab --no-launch-profile --urls http://127.0.0.1:5180
```

The selected SDK should be 8.0.x. Open http://127.0.0.1:5180. Enter 7 nights and
2 guests: **Total: $756.00**. Enter 6 nights: **$720.00**.
Health at http://127.0.0.1:5180/health reports `{"status":"healthy"}`.
Stop the server with Ctrl+C before browser tests or switching checkpoints.

Copy/paste orientation prompt:

```text
Explain this workspace's request flow from the labeled booking form through
/api/quote to QuoteCalculator. Read the applicable repository instructions.
Do not inspect reference solutions or change files. State the valid input
bounds, the exact discount threshold, and two independent sample totals.
```

**Exit check:** attendee can run the app and explain 6 versus 7 nights.

## Recovery without overwriting work

From repository root, create a fresh sibling checkpoint inside `.work`. No
existing directory, branch, or file is overwritten:

```powershell
.\scripts\checkpoint.ps1 -Stage starter -Name retry-01
code .\.work\retry-01
```

```bash
bash scripts/checkpoint.sh starter retry-01
code .work/retry-01
```

Use `modernized` instead of `starter` to resume at .NET 10. Choose a new name
for each recovery. `.work` is intentionally Git-ignored, so explicitly attach
its application files if Copilot's workspace index omits them. The copy contains
its own `.github` instructions, prompts, and agent. It is for local recovery,
not a branch checkpoint or a source for PR changes.

## Troubleshooting

| Symptom | Action |
| --- | --- |
| SDK not found / NETSDK1045 | Run `dotnet --list-sdks` from the intended checkpoint; install 8 and 10 SDKs, reopen terminal. Check `global.json`. |
| Address already in use | Stop your own previous server with Ctrl+C. Do not kill unrelated processes. Browser tests require 5180 to be free. |
| Browser executable missing | In the e2e directory, run `npx playwright install chromium`. |
| `npm ci` fails | Run it in `reference/e2e`, not repository root; check proxy and lockfile. |
| Copilot option missing | Confirm sign-in, quota, extension, current VS Code, harness, and org policy. Use the manual prompt fallback, not an invented chat handle. |
| Review gives no comments | Compare against the business contract manually; no deterministic finding count is promised. |
| C# extension asks to create assets | Build with the documented CLI first; generated debug assets are optional. |

Official setup: [.NET upgrade](https://learn.microsoft.com/dotnet/core/porting/github-copilot-upgrade/install),
[VS Code customizations](https://code.visualstudio.com/docs/agent-customization/overview),
[Playwright browser installation](https://playwright.dev/docs/browsers).
