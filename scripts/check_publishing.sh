#!/usr/bin/env bash
# Fails if any restricted term appears in the built site.
# Usage: scripts/check_publishing.sh [site_dir]   (default: _site)
#
# Matching is case-insensitive. Short acronyms and single words match as whole
# words, so "SIA" does not flag "Asia", "Lion" does not flag "million" and
# "NUS" does not flag "bonus". Phrases and symbols match as substrings.
set -euo pipefail

SITE="${1:-_site}"
if [ ! -d "$SITE" ]; then
  echo "check_publishing: '$SITE' not found. Run 'bundle exec jekyll build' first." >&2
  exit 2
fi

WORDS=(SIA Dyson Samlip SPC GovTech PSD PMO NUS Mindef LionCo Lion EUR whilst)
PHRASES=("Singapore Airlines" "Singapore Power" "deployed to production" "€")

fail=0
scan() {
  # $1: grep flags, $2: term
  local hits rc=0
  hits=$(grep -RIn $1 -e "$2" "$SITE") || rc=$?
  if [ "$rc" -gt 1 ]; then
    echo "check_publishing: grep failed for '$2'." >&2
    exit 2
  fi
  if [ -n "$hits" ]; then
    echo "FAIL: '$2'"
    echo "$hits" | head -20 | sed 's/^/  /'
    fail=1
  fi
}

for w in "${WORDS[@]}"; do scan "-iw" "$w"; done
for p in "${PHRASES[@]}"; do scan "-iF" "$p"; done

if [ "$fail" -ne 0 ]; then
  echo "check_publishing: restricted terms found." >&2
  exit 1
fi
echo "check_publishing: OK, no restricted terms in $SITE."
