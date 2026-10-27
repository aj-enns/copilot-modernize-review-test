# Lab 2 - Instruction-driven review (25 minutes)

**Start:** runnable upgraded app. **Finish:** a review decision backed by
concrete failing examples. The deliberately flawed fixture is never compiled
or served. Do not replace the working calculator with it.

## 1. Read the review contract (5 minutes)

Keep the repository root open in VS Code. Read
`.github/copilot-instructions.md` and
`.github/instructions/csharp.instructions.md` (`applyTo: "**/*.cs"`).
The contract intentionally calls attention to inclusive bounds and the exact
weekly threshold. Instructions steer review; they do not guarantee findings.

Open `fixtures/review/WeeklyQuote.proposed.cs`. Compare it with the production
calculator; treat it as a proposed replacement, not an approved implementation.

## 2. Local review (8 minutes)

1. In `fixtures/review/WeeklyQuote.proposed.cs`, press **Ctrl+A** to select
   the code.
2. Press **Ctrl+Shift+P** to open the Command Palette.
3. Search for **Chat: Review** and run it.

Depending on your VS Code/Copilot version, the same action may also be available
by right-clicking **Generate Code > Review**. You do not need that menu to use
the Command Palette. This local selection review does not create a PR or commit
changes.

If **Chat: Review** is also unavailable, or for a reproducible prompt-based
comparison, attach the fixture and both instruction files to Chat and use this
read-only review prompt:

```text
Review this proposed calculator against the attached business contract and
C# review instructions. This is an inert training fixture: do not integrate
it into the running app. Report only concrete correctness issues, each with
a failing input, actual and expected result, and a minimal suggested fix.
Do not edit files and do not inspect reference solutions.
```

This chat-based review is a fallback/comparison, not the dedicated review UI.
If you want to practice **Copilot Code Review - Uncommitted Changes**, make a
small local edit in the fixture (for example rename `ProposedQuoteCalculator`
to `CandidateQuoteCalculator`), then click the review button above **CHANGES**
in Source Control. Review may focus only on the changed lines and miss the
existing defects; selection review is more suitable for this prepared fixture.

## 3. Inspect / accept / modify / reject (7 minutes)

For each suggestion, write one decision in your own notes:

| Decision | Evidence needed |
| --- | --- |
| Accept | Concrete contract violation; minimal fix; regression test |
| Modify | Real issue but suggested patch changes more than necessary |
| Reject | False positive, intentional behavior, or unsupported style claim |
| Investigate | Reproduce the example before deciding |

Apply fixes only to the **fixture**, inspect the resulting diff, and ask for a
regression test for each accepted issue. Applying a local suggestion does not
commit it. Do not blindly accept arithmetic rewrites or weakened validation.
If no comments appear, manually evaluate 0 nights and exactly 7 nights and
explain whether the contract is met. Do not inspect worked answers in `reference`
during the exercise.

## 4. GitHub PR review demonstration (5 minutes)

This is distinct from local review. Use an attendee-owned fork and a new branch
if demonstrating it; do not request write access to this public training repo.
If you are attending a class, follow along with the instructor's existing PR
instead of configuring a fork when directed. Do not publish generated answers
or secrets.

In a fork, make a harmless fixture-only change on a new branch, commit and
push it, then open a PR. On GitHub's PR sidebar, request **Copilot** as reviewer.
Availability depends on plan, repository/org settings and quotas; chat access
alone does not ensure PR review access. Agentic review can use GitHub Actions
and incur usage; inspect current billing/policy before enabling it.

Repository-wide and path-specific instruction support is documented for review.
Verify instructions are enabled and present on the branch used by your current
review implementation; current docs say PR review reads instructions from the
**head** branch. Do not assume that changing a custom-agent file selects that
agent for the GitHub PR reviewer: these are different surfaces.

Read suggestions as proposals. Accept, adapt or reject with evidence; resolve
threads after fixing and verifying; request re-review when necessary. Copilot
does not necessarily reply to thread discussion, and resolving a thread does
not fix code. AI review is not a substitute for required human approval or CI.

**Exit check:** explain one finding with an exact input and why another proposed
suggestion could reasonably be rejected. Leave the production app unchanged.
For recovery, simply retain your edited fixture and reopen the original
calculator; no app checkpoint was modified by this exercise.

Sources: [local and PR review workflows](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-code-review),
[repository and path instructions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions),
[review concepts and availability](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/code-review).

---

Next: [Exercise 03: Tests](03-tests.md)
