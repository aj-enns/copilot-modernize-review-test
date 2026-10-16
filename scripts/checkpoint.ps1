[CmdletBinding()]
param(
    [Parameter(Mandatory)]
    [ValidateSet('starter', 'modernized')]
    [string]$Stage,
    [Parameter(Mandatory)]
    [ValidatePattern('^[A-Za-z0-9][A-Za-z0-9_-]*$')]
    [string]$Name
)
$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$source = if ($Stage -eq 'starter') { Join-Path $root 'starter' } else { Join-Path $root 'reference\modernized' }
$destination = Join-Path $root ".work\$Name"
if (Test-Path $destination) { throw "Destination already exists: $destination. Choose a new Name; nothing was overwritten." }
New-Item -ItemType Directory -Path $destination -Force | Out-Null
Copy-Item (Join-Path $source 'global.json') $destination
New-Item -ItemType Directory -Path (Join-Path $destination 'BookingLab') | Out-Null
Copy-Item (Join-Path $source 'BookingLab\*.cs') (Join-Path $destination 'BookingLab')
Copy-Item (Join-Path $source 'BookingLab\*.csproj') (Join-Path $destination 'BookingLab')
Copy-Item (Join-Path $source 'BookingLab\wwwroot') (Join-Path $destination 'BookingLab') -Recurse
Copy-Item (Join-Path $root '.github') $destination -Recurse
Write-Host "Created $destination; originals were not modified. Open this folder in VS Code."
