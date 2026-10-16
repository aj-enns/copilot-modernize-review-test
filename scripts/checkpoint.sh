#!/usr/bin/env bash
set -euo pipefail
stage="${1:?Usage: bash scripts/checkpoint.sh starter|modernized unique-name}"
name="${2:?Supply a new checkpoint name}"
[[ "$name" =~ ^[A-Za-z0-9][A-Za-z0-9_-]*$ ]] || { echo "Invalid checkpoint name" >&2; exit 1; }
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
case "$stage" in
  starter) source="$root/starter" ;;
  modernized) source="$root/reference/modernized" ;;
  *) echo "Stage must be starter or modernized" >&2; exit 1 ;;
esac
destination="$root/.work/$name"
mkdir -p "$root/.work"
mkdir "$destination" || { echo "Choose a new name; destination must not exist" >&2; exit 1; }
mkdir "$destination/BookingLab"
cp "$source/global.json" "$destination/"
cp "$source/BookingLab/"*.cs "$source/BookingLab/"*.csproj "$destination/BookingLab/"
cp -R "$source/BookingLab/wwwroot" "$destination/BookingLab/"
cp -R "$root/.github" "$destination/"
echo "Created $destination; originals were not modified. Open this folder in VS Code."
