# MESH Italia — Preview

Questa branch è una **anteprima** e NON è la versione definitiva.

- Produzione: branch `main`, cartella `site/`, progetto Netlify `mesh-italia`.
- Preview: branch `preview/staging`, build Netlify `bash preview/build.sh`, cartella generata `_preview/`.
- La copia dell'anteprima mantiene le pagine e gli asset di `site/`.
- Se `index.html` è presente nella radice (v21 Assemblage 23), viene usato come home dell'anteprima.
- `robots.txt`, `_headers` e `X-Robots-Tag` ostacolano l'indicizzazione, ma non garantiscono riservatezza.
- Il deploy Netlify è indipendente dalla pubblicazione su GitHub Pages.
- Non effettuare il merge su `main` prima di controllare home, link, immagini, responsive e aspetti legali.

Repository: https://github.com/salvatoresinatra0001-ux/mesh-italia
Preview Netlify: https://app.netlify.com/projects/mesh-italia-preview
