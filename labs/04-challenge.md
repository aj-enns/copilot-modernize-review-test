# Lab 4 - Combined challenge (20 minutes)

**Start:** your upgraded app and tests. **Finish:** one small requirement change
with a reviewed diff and test evidence. Keep reference checkpoints unchanged.

New requirement: stays of **14 or more nights receive 15% off**, replacing,
not stacking with, the 10% weekly discount. Stays of 7..13 nights still receive
10%. All input bounds, pricing and error behavior remain unchanged.

## Plan (3 minutes)

```text
Plan a minimal change for a 15% long-stay discount beginning at exactly
14 nights, replacing rather than stacking with the weekly discount.
Do not inspect reference solutions. Give independent totals for 13, 14,
and 30 nights with 2 guests. Identify code, UI wording, instruction contract,
unit tests and browser tests that need to change. Wait before editing.
```

## Implement and test (9 minutes)

```text
Apply the approved change only in my attendee workspace. Add boundary tests
for 13 and 14 nights and update any affected maximum-boundary expectations.
Update the visible pricing explanation and this workspace's business
instructions so they agree. Preserve existing API validation and error tests.
Run unit and managed-server browser tests; report actual results.
Do not edit the original starter/reference checkpoints, commit, or push.
```

If working in `starter`, repository-wide instructions are shared with the
training repo: put the challenge-specific contract in a new instruction file
under `starter/.github` rather than rewriting the root contract used by the
unchanged reference. Explicitly attach it to Chat. A recovered checkpoint
already has its own `.github` copy.

## Review and demonstrate (8 minutes)

Select the changed calculator and use VS Code's review action or attach the diff
to Chat. Supply the **new** contract so the reviewer does not apply the original
10% rule to all long stays. Decide which suggestions to accept and why.

Expected totals for 2 guests: 13 nights = **1404.00**, 14 nights = **1428.00**,
30 nights = **3060.00**. For 30 nights / 6 guests the new result is **4080.00**.
Do not change expected values without independently checking the requirement.
Demonstrate the 14-night UI total and existing invalid-input behavior.

**Exit check:** explain how the plan, review criteria and tests changed together.
For recovery, keep your edits and create a fresh `modernized` checkpoint using
the script in setup; no completed challenge solution is shipped intentionally.

## Wrap-up and buffer (10 additional agenda minutes)

Compare outcomes, not prompt wording. Record one accepted suggestion, one
rejected or modified suggestion, and the command that verifies your change.
Discuss when human review, broader integration tests and dependency migration
research would be necessary in a real application.
