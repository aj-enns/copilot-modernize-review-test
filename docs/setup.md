# Setup and orientation - 15 minutes

Run these steps on your own machine, in order. Install tools and download
dependencies before class; orientation takes 15 minutes.

## Install before the event

Use Windows, macOS, or Linux with VS Code.

| Requirement | Preflight |
| --- | --- |
| Git and internet access to GitHub, NuGet, npm, browser downloads | `git --version` |
| .NET **8 and 10 SDKs**, including corresponding ASP.NET Core runtimes | `dotnet --list-sdks` and `dotnet --list-runtimes` |
| Node.js 22 LTS or newer supported LTS, npm | `node --version` and `npm --version` |
| Current stable VS Code; `code` command on PATH | `code --version` |
| GitHub Copilot and C# Dev Kit extensions | Sign in and send a chat message |
| [GitHub Copilot upgrade](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.upgrade-agent) extension; search `@id:ms-dotnettools.upgrade-agent` | Agent picker contains **Upgrade** |
| Playwright Test for VS Code (recommended, CLI also works) | Extensions view |

Download SDKs from https://dotnet.microsoft.com/download, Node from
https://nodejs.org, and VS Code from https://code.visualstudio.com.
On macOS, run **Shell Command: Install 'code' command in PATH** in VS Code.
Install SDKs matching your CPU, not just runtimes. The app's `global.json` selects
the SDK. This lab starts on .NET 8; check its support lifecycle after November 2026.

Confirm Copilot access, quota, and organization permissions before class.
PR review access and billing can differ from chat. Review agent permission
requests; do not enable blanket approval or upload secrets or private data.
No MCP server is needed.

## Clone and warm dependencies (before the event)

In a terminal, go to the folder where you keep projects, then run:

```text
git clone https://github.com/aj-enns/copilot-modernize-review-test.git
cd copilot-modernize-review-test
git switch -c workshop/my-attempt
```

The last command creates your work branch, leaving `main` unchanged. Choose a
new name if it already exists. No push is needed.

Save progress in VS Code's **Source Control**: review changes, stage intended
files, then commit with a short message. Never stage secrets or generated files.

Windows PowerShell, from repository root:

```powershell
.\scripts\preflight.ps1
dotnet restore .\starter\BookingLab
dotnet restore .\reference\tests\BookingLab.Tests
Set-Location .\reference\e2e
npm ci
npx playwright install chromium
Set-Location ..\..
code .
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
code .
```

Run npm commands inside `reference/e2e`, not `reference`. If already in
`reference`, run `cd e2e` first.

`code .` opens the repository folder in VS Code. Alternatively, use **File >
Open Folder...**. You should see `README.md`, `starter`, and `.github`.

On Linux, missing browser libraries may require
`npx playwright install --with-deps chromium` with administrator approval.
Use approved feeds and proxies; never disable TLS verification.
If PowerShell blocks a script, use your organization's approved policy or bash;
do not change machine-wide execution policy.

## During the 15-minute orientation

In Copilot Chat, choose either:

- **Copilot:** use the labs' copy/paste prompts.
- **Local:** use optional prompt-file shortcuts such as `/quote-tests`, or paste.

To switch, click **New Chat (+)** at the top of Chat, then choose
**Session Target > Copilot** or **Local** before your first message.
Existing chats cannot switch. If **Local** is unavailable, use **Copilot**.
Select **Agent** unless the lab asks for **Test coach** in the agent picker.
Inspect the lab before accepting any folder-trust request.

Choose **Terminal > New Terminal** at repository root (the folder containing
`README.md`). Run these commands in PowerShell or bash:

```text
cd starter
dotnet --version
dotnet build BookingLab
dotnet run --project BookingLab --no-launch-profile --urls http://127.0.0.1:5180
```

Expect SDK **8.0.x** and a successful build. Open http://127.0.0.1:5180:

| Nights | Guests | Expected total |
| --- | --- | --- |
| 7 | 2 | $756.00 |
| 6 | 2 | $720.00 |

Open http://127.0.0.1:5180/health; expect `{"status":"healthy"}`.
Stop the server with **Ctrl+C** before browser tests or switching checkpoints.

Copy/paste orientation prompt:

```text
Explain starter/BookingLab's request flow from the labeled booking form through
/api/quote to QuoteCalculator. Read the applicable repository instructions.
Do not inspect reference solutions or change files. State the valid input
bounds, the exact discount threshold, and two independent sample totals.
```

**Exit check:** attendee can run the app and explain 6 versus 7 nights.

**Next: [Lab 1 - Modernization](../labs/01-modernize.md).**
In VS Code Explorer, open `labs/01-modernize.md` and start at **1. Assess and plan**.
Keep the repository folder open and your terminal in `starter`.

## Recovery without overwriting work

### Start over from main

1. Stop the server and save all files.
2. In **Source Control**, review, stage, and commit your work, including new files.
   Complete Git's name/email setup if prompted.
3. At repository root, run `git status --short`. Continue only if it prints nothing.
4. Return to `main` and create a fresh branch:

```text
git switch main
git switch -c workshop/retry-01
```

Use a new retry name each time. Your commits remain on `workshop/my-attempt`.
**Switching branches does not clear uncommitted or ignored files.** Do not force
a switch or discard work.

### Use a copied checkpoint instead

From repository root, copy a checkpoint into a new folder without overwriting work:

```powershell
.\scripts\checkpoint.ps1 -Stage starter -Name retry-01
code .\.work\retry-01
```

```bash
bash scripts/checkpoint.sh starter retry-01
code .work/retry-01
```

Use `modernized` instead of `starter` for .NET 10. Choose a new name each time.
The copy includes Copilot customizations. `.work` is Git-ignored: attach app files
to Chat if needed, and do not use this recovery copy for PR changes.

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
