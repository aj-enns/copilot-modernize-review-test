# Instructor-only review key

Do not attach this file during the attendee review exercise.

The inert proposed replacement has two intentional correctness defects:

| Input | Actual fixture result | Required result | Minimal correction |
| --- | --- | --- | --- |
| 0 nights, 1 guest | 0 | Reject invalid nights | `nights < 1`, not `< 0` |
| 7 nights, 2 guests | 840 | 756 | `nights >= 7`, not `> 7` |

The lack of explicit rounding is worth discussing but is not a demonstrated
rounding defect for the current integer prices and 10% discount: all valid
totals already have exact cents. Reject unsupported claims of financial loss.
Different exception-message wording is not automatically a functional bug.
This is an opportunity to modify/reject suggestions instead of accepting all.

The working starter and modernized checkpoints do not have these defects.
The xUnit reference has 11 cases. Browser reference has 4 tests: success/update,
invalid API bounds, visible validation plus stale-result clearing, and a
network failure. References are examples, not proof of exhaustive coverage.
