#!/usr/bin/env bash
# Build isolato delle anteprime Netlify — non modifica la branch main.
set -Eeuo pipefail
OUT="_preview"
rm -rf "$OUT"
mkdir -p "$OUT"

# Preserva tutte le pagine e gli asset esistenti.
if [ -s "site/index.html" ]; then
  cp -R site/. "$OUT/"
fi

# Assemblage 23 v21 è presente anche come index.html alla radice
# nella branch preview/staging. In anteprima prevale su site/index.html.
if [ -s "index.html" ]; then
  cp index.html "$OUT/index.html"
fi

if [ ! -s "$OUT/index.html" ]; then
  echo "ERRORE: impossibile trovare un index.html valido" >&2
  exit 1
fi

cat > "$OUT/robots.txt" <<'EOF'
User-agent: *
Disallow: /
EOF

cat > "$OUT/_headers" <<'EOF'
/*
  X-Robots-Tag: noindex, nofollow, noarchive
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: camera=(), microphone=(), geolocation=()
EOF

echo "Preview pronta: $OUT"
find "$OUT" -type f | wc -l | tr -d ' '
