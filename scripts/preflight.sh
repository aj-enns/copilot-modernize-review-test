#!/usr/bin/env bash
set -euo pipefail
for tool in git dotnet node npm code; do
  command -v "$tool" >/dev/null || { echo "Missing $tool; follow docs/setup.md" >&2; exit 1; }
done
sdks="$(dotnet --list-sdks)"
for major in 8 10; do
  grep -q "^$major\." <<< "$sdks" || { echo "Install .NET $major SDK, not just runtime" >&2; exit 1; }
done
node -e 'if(Number(process.versions.node.split(".")[0])<22)process.exit(1)'
echo "CLI prerequisites found. Also sign in to Copilot and install Chromium; see docs/setup.md."
