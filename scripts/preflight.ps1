$ErrorActionPreference = 'Stop'
foreach ($tool in @('git', 'dotnet', 'node', 'npm', 'code')) {
    if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) { throw "Missing $tool; follow docs/setup.md." }
}
$sdks = dotnet --list-sdks
if ($LASTEXITCODE -ne 0) { throw 'Unable to list .NET SDKs.' }
foreach ($major in @(8, 10)) {
    if (-not ($sdks -match "^$major\.")) { throw "Install the .NET $major SDK (not just the runtime)." }
}
if ([int]((& node --version) -replace '^v(\d+).*$', '$1') -lt 22) { throw 'Install Node.js 22 or later.' }
Write-Host 'CLI prerequisites found. Also sign in to Copilot and install Chromium as described in docs/setup.md.'
