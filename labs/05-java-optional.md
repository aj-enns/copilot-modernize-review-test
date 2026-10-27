# Optional Java upgrade (outside the 150 minutes)

This is a bounded Java **17 to 21** Maven console exercise, not Spring,
Jakarta, or a cloud migration. It reuses the same pricing contract. Allow
20-30 extra minutes after installing prerequisites.

Install JDK **17 and 21**, Maven 3.9+, VS Code's Java tooling, GitHub Copilot,
and **GitHub Copilot modernization** by Microsoft
(`vscjava.migrate-java-to-azure`). This is the documented Java extension despite
the marketplace identifier containing "azure"; this exercise needs no Azure
account. Use the extension's current supported version and confirm org policy.
Do not confuse it with the .NET **GitHub Copilot upgrade** extension.

Use your JDK installation's environment selector to set `JAVA_HOME` and put its
`bin` on PATH, then verify `java -version` and `mvn -version`. Maven must report
the intended JDK, not just VS Code's language server. Both source and target
JDKs should be installed before using the modernization extension.

## Run the starter

From repository root, with JDK 17 active (commands work in PowerShell/bash):

```text
mvn --batch-mode --file optional/java/starter/pom.xml test
mvn --batch-mode --file optional/java/starter/pom.xml exec:java "-Dexec.mainClass=workshop.Booking"
code optional/java/starter
```

Expected: 2 test methods pass and console output includes
`7 nights, 2 guests: USD 756.00`.

## Assess, upgrade, inspect

In VS Code's **GitHub Copilot modernization** panel select
**Upgrade Java Runtime & Frameworks**. Alternatively use built-in Agent chat
with the documented natural-language request (no invented `@java-upgrade`
handle):

```text
Assess this Maven Java 17 project for upgrade to Java 21 only. Preserve the
booking calculation and its tests; no Spring, cloud services, or deployment.
Inventory the JDK and plugins, show the plan, and wait before edits.
Do not inspect reference solutions, switch branches, commit, or push.
```

Inspect the extension-generated plan and confirm the target is **21**, then:

```text
Execute the approved Java 21 upgrade. Keep the same business behavior and
dependency footprint, verify the compiler release and active JDK, run Maven
tests and the console entry point, and report actual outcomes.
```

Expect `maven.compiler.release` to change from 17 to 21; there is no reason
to change the existing BigDecimal implementation for a basic runtime upgrade.
The compiler, Surefire and exec plugins are pinned already.

Activate JDK 21 in the terminal, verify `mvn -version`, and rerun the two
starter commands. A successful build under JDK 21 with release still set to
17 is not a completed upgrade: inspect the POM too.

## Reference outcome and recovery

The reference POM targets release 21 and intentionally shares the unchanged
Java source and tests from the starter (no duplicate solution source):

```text
mvn --batch-mode --file optional/java/reference/pom.xml test
mvn --batch-mode --file optional/java/reference/pom.xml exec:java "-Dexec.mainClass=workshop.Booking"
```

Preserve an edited starter by copying `optional/java/starter` to a **new**
directory before using it again, or use the unchanged `reference` POM to
demonstrate the target. Neither requires resetting Git. Do not copy a directory
over an existing destination. The reference source paths are relative to its
POM, so keep it in the repository structure.

**Exit check:** show the active JDK, release 21, passing tests, and USD 756.00.
If JDK/Maven installation is unavailable, use CI results and clearly label
local verification as blocked, not passed.

Official source (tool names and launch workflow verified October 2026):
[Java upgrade quickstart](https://learn.microsoft.com/azure/developer/github-copilot-app-modernization/quickstart-upgrade).

---

[Back to the workshop](../README.md)
