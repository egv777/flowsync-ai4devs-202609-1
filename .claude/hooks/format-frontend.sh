#!/usr/bin/env bash
# PostToolUse hook: formats with Prettier any file under frontend/src/ that the agent edits or writes.
set -euo pipefail

file=$(jq -r '.tool_input.file_path // empty')
root="${CLAUDE_PROJECT_DIR:-$(pwd)}"

case "$file" in
  "$root"/frontend/src/*) ;;
  *) exit 0 ;;
esac
[ -f "$file" ] || exit 0

cd "$root/frontend"
./node_modules/.bin/prettier --write --ignore-unknown --log-level warn "$file" >&2 || {
  echo "Prettier could not format $file" >&2
  exit 2
}
