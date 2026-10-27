# Setup for the optional Java lab

Complete this guide before starting the [optional Java upgrade lab](../labs/05-java-optional.md).
The exercise upgrades a local Maven console app from **Java 17 to Java 21**.
No Azure account, cloud resources, database, or deployment is needed.
Installation time is separate from the lab's 20-30 minutes.

Use your organization's approved installers and confirm Copilot access, quota,
and extension permissions. You need internet access to download tools and
dependencies from Maven Central. Do not disable TLS checks to bypass a proxy.
If you have not cloned the repository or created your work branch, follow
[setup and preflight](setup.md#clone-and-warm-dependencies-before-the-event).

## 1. Install both JDK 17 and JDK 21

Install **Java Development Kits**, not just Java runtimes (JREs). Keep both
versions installed side by side; the starter needs 17 and the target needs 21.
Use current supported patches of those major versions, not a newer major.

One option is the [Microsoft Build of OpenJDK downloads](https://learn.microsoft.com/java/openjdk/download).
Choose **17** and **21**, each matching your operating system and CPU
(x64 or ARM64). Another approved distribution, such as
[Eclipse Temurin](https://adoptium.net/temurin/releases/), is also suitable.

| Platform | Installation |
| --- | --- |
| Windows | Run each JDK's Windows installer. If installers are unavailable, extract each ZIP into its own user-writable directory. |
| macOS | Run each JDK's macOS installer; choose the correct package for Apple Silicon or Intel. |
| Linux | Follow your distribution's approved package instructions, or extract each JDK's Linux archive into a separate directory. |

Record each JDK's **home directory**: it must contain `bin/java` and `bin/javac`
(`java.exe` and `javac.exe` on Windows). `JAVA_HOME` points to this directory,
not to its `bin` subdirectory. Do not assume the last installer selected the
right default Java version.

See the [OpenJDK installation instructions](https://learn.microsoft.com/java/openjdk/install)
for platform-specific details.

## 2. Install Maven 3.9 or newer

Use a supported stable Maven release, at least **3.9**. A package manager is
fine if its Maven version meets that requirement. For a manual installation:

1. Download a **binary** archive, not a source archive, from the
   [Apache Maven download page](https://maven.apache.org/download.cgi).
2. Extract the ZIP on Windows or the TAR.GZ on macOS/Linux into a tools
   directory outside this repository.
3. Add the extracted Maven directory's `bin` subdirectory to your user's PATH.

On Windows, search Start for **Edit environment variables for your account**.
Edit your user **Path**, choose **New**, and add the actual Maven `bin` path,
for example `C:\tools\apache-maven-<version>\bin`, replacing `<version>` with
the downloaded version. Preserve existing entries.

On macOS/Linux, add the equivalent export to your shell's user startup file,
using your actual extraction path, for example:

```bash
export PATH="$HOME/tools/apache-maven-<version>/bin:$PATH"
```

Fully close and reopen VS Code and your terminal after persistent PATH changes.
The [Maven installation guide](https://maven.apache.org/install.html) also lists
package-manager options. You will verify Maven after selecting a JDK below.

## 3. Install VS Code's Java and Copilot tooling

1. Install or update to [current stable VS Code](https://code.visualstudio.com/).
   Ensure `code --version` works in a new terminal. On macOS, use **Shell
   Command: Install 'code' command in PATH** from VS Code's Command Palette.
2. Open **Extensions** and install the following. Search by `@id:` to avoid
   confusing similarly named extensions:

   | Extension | Search |
   | --- | --- |
   | [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) | `@id:vscjava.vscode-java-pack` |
   | [GitHub Copilot modernization](https://marketplace.visualstudio.com/items?itemName=vscjava.migrate-java-to-azure), by Microsoft | `@id:vscjava.migrate-java-to-azure` |

3. Follow [Set up GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/setup)
   to enable Copilot and sign in to your GitHub account. Confirm that you can
   send a chat message.
4. Restart VS Code after installing the modernization extension.

The Java extension's identifier contains `azure`, but this lab only uses its
Java upgrade workflow. It is **not** the .NET **GitHub Copilot upgrade**
extension (`ms-dotnettools.upgrade-agent`).

## 4. Select and verify the terminal JDK

Select **JDK 17** for the starter. These examples change only the current
terminal session; replace placeholder paths with your actual JDK home.

### Windows PowerShell

```powershell
$env:JAVA_HOME = 'C:\path\to\jdk-17'
$env:Path = "$env:JAVA_HOME\bin;$env:Path"
java -version
javac -version
mvn -version
```

When the lab asks you to activate JDK 21, run:

```powershell
$env:JAVA_HOME = 'C:\path\to\jdk-21'
$env:Path = "$env:JAVA_HOME\bin;$env:Path"
java -version
javac -version
mvn -version
```

### macOS/Linux bash or zsh

```bash
export JAVA_HOME="/path/to/jdk-17"
export PATH="$JAVA_HOME/bin:$PATH"
java -version
javac -version
mvn -version
```

On macOS, `/usr/libexec/java_home -V` lists registered JDKs; you can select 17
with `export JAVA_HOME=$(/usr/libexec/java_home -v 17)` before updating PATH.
For the upgrade, use the JDK 21 home (or `-v 21` on macOS), prepend its `bin`
to PATH again, and rerun all three version checks.

**Check the output, not just command success:**

- `java` and `javac` must both report the selected major version.
- `mvn -version` must report Maven **3.9 or newer**, the selected Java version,
  and that JDK's Java home.
- Repeat the checks in each new terminal before running Maven.

VS Code's Java language server can use a different JDK from your terminal.
Use **Java: Configure Java Runtime** in the Command Palette to inspect detected
JDKs. If necessary, register both installations in your **user** setting
`java.configuration.runtimes` as `JavaSE-17` and `JavaSE-21`; do not commit
machine-specific paths. See [Configure Runtime for Projects](https://code.visualstudio.com/docs/java/java-project#_configure-runtime-for-projects).
Editor settings do not replace `JAVA_HOME` or change the Maven compiler release
in the project's POM.

## 5. Confirm you are ready

1. With **JDK 17** active, follow [Run the starter](../labs/05-java-optional.md#run-the-starter)
   from repository root. The first run downloads Maven plugins and test dependencies.
2. Expect **2 passing test methods** and console output including
   `7 nights, 2 guests: USD 756.00`. Do not change the POM to 21 during setup.
3. Open the starter folder in VS Code as directed by the lab. Confirm the
   **GitHub Copilot modernization** panel offers **Upgrade Java Runtime &
   Frameworks**. Stop here; use the lab's scoped assessment prompt before
   approving any upgrade.

## Troubleshooting

| Symptom | Action |
| --- | --- |
| `java` or `javac` not found | Check that you installed a JDK and that its `bin` is first on PATH in this terminal. |
| `JAVA_HOME` is invalid | Point it to the JDK home containing `bin`, not to `bin` itself or a Java executable. |
| `mvn` not found | Check the extracted Maven `bin` path and reopen VS Code after persistent PATH changes. |
| Maven reports the wrong JDK | Set `JAVA_HOME` and prepend that JDK's `bin` to PATH in the terminal running Maven. Recheck `mvn -version`; changing only the editor runtime is insufficient. |
| `release version 21 not supported` | Maven is not using a JDK capable of compiling release 21. Activate JDK 21 and recheck all three version commands. |
| Dependency downloads fail | Confirm Maven Central access and approved proxy settings. Do not disable TLS verification. |
| Modernization panel or task missing | Check the exact extension ID, enabled state, VS Code version, GitHub sign-in, and organization policy; restart VS Code. Use the lab's Agent chat fallback if available. |
| Tools or Copilot are blocked by policy | Ask the instructor or administrator. Report local verification as blocked, not passed. |

Official workflow: [Java upgrade quickstart](https://learn.microsoft.com/azure/developer/github-copilot-app-modernization/quickstart-upgrade)
(checked October 2026).

---

[Continue to the Java lab](../labs/05-java-optional.md) |
[Back to setup](setup.md)
