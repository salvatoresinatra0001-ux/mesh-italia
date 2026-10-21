# MESH Italia — Build 2.1
## Piano tecnico incrementale (21 ottobre 2026)

Stato: branch di lavoro separato da `main`; documento di pianificazione e collaudo. Nessuna modifica al sito di produzione in questa fase.

## Obiettivo
Evolvere l'archivio editoriale italiano indipendente prendendo come riferimento funzionale il sito ufficiale https://www.mesh.co.uk/ e il catalogo ufficiale https://mesh-uk.bandcamp.com/, senza copiarne codice, layout distintivo, testi o asset non autorizzati.

## Principi invarianti
- MESH Italia resta un progetto editoriale indipendente e non ufficiale, curato da Salvatore Sinatra.
- Non modificare `main` fino a collaudo e approvazione della preview.
- Conservare gli URL esistenti e le versioni storiche; non sovrascrivere V1.1 / V2.0.
- Copertine, logo e fotografie di terzi possono essere distribuiti solo se il titolo d'uso è documentato. Il credito non è un'autorizzazione.
- Le informazioni discografiche, date e annunci devono rinviare a una fonte primaria e indicare data di verifica.
- Nessun audio deve partire automaticamente. Per i player Bandcamp preferire embed ufficiali caricati su richiesta o un link esterno accessibile.
- Netlify preview deve essere non indicizzabile; il sito pubblico finale deve avere robots, sitemap e canonical coerenti con il dominio effettivamente scelto.

## Piano di implementazione
1. **Inventario URL e routing**
   - Verificare su ogni pagina link interni, asset, menu e breadcrumb.
   - La home usa percorsi assoluti con prefisso `/mesh-italia/`, corretti per GitHub Pages ma non automaticamente compatibili con Netlify al dominio root. Testare la versione Netlify con URL di produzione e preview.
   - Aggiungere redirect Netlify soltanto dopo aver confrontato le rotte esistenti e senza creare redirect chain.
2. **SEO tecnico**
   - Correggere `site/robots.txt` (attualmente `Disallow: /`) per la release pubblica solo quando la sitemap/canonical sono allineati al dominio pubblico.
   - Non riutilizzare per il deploy pubblico la sitemap attuale senza adeguarla: contiene URL GitHub Pages.
   - Aggiungere e validare title e description unici, canonical assoluti, Open Graph/Twitter coerenti e JSON-LD veritiero per le tipologie appropriate.
   - Preservare pagine di compatibilità noindex dove necessario; evitare contenuti duplicati indicizzabili fra le versioni.
3. **Home / esperienza editoriale**
   - Gerarchia chiara: nuova uscita, catalogo, video ufficiali, notizie verificate, prossime date, archivio biografico, fonti e crediti.
   - Estetica editoriale originale, dark/alto contrasto, tipografia e spaziatura coerenti; layout desktop, tablet e mobile.
   - Non inserire date o comunicazioni non confermate dalla fonte ufficiale.
4. **Catalogo e Bandcamp**
   - Usare la pagina Bandcamp ufficiale come fonte per release, formati, tracklist e disponibilità.
   - Embed ufficiali lazy/on-demand con titolo accessibile; fallback link esterno quando l'embed non carica o JavaScript è disabilitato.
   - Separare album, singoli, remix, live, edizioni e prossime uscite; segnalare chiaramente le date future.
5. **Accessibilità, performance e sicurezza**
   - Test navigazione tastiera, focus, contrasto, alt text, landmark, menu mobile, immagini responsive e lazy loading.
   - Verificare 404, link rotti, console, peso asset, header di sicurezza e assenza di segreti.
6. **Deploy e governance**
   - Netlify production risulta attualmente pubblicato tramite deploy manuale, non tramite commit Git.
   - Prima di configurare continuous deployment, verificare dalla dashboard che la build production usi il branch `main` e publish directory `site/`; non applicare la configurazione del branch `preview/staging` alla produzione.
   - Preview dedicata e non indicizzabile; produzione soltanto dopo checklist finale e conferma.
   - Ignorare la cartella locale `.netlify/` se viene usata la CLI; non committare `.netlify/state.json`.

## Checklist di accettazione
- [ ] Branch principale immutato durante lo sviluppo.
- [ ] Ogni pagina del catalogo apre correttamente sul dominio preview.
- [ ] Zero asset mancanti e zero link interni critici non funzionanti.
- [ ] URL canonical, robots e sitemap riferiti allo stesso dominio di pubblicazione.
- [ ] Preview con `noindex`; produzione indicizzabile solo al momento opportuno.
- [ ] Bandcamp link e iframe ufficiali funzionanti con fallback.
- [ ] Stato release, date e tracklist confrontati con fonti primarie.
- [ ] Crediti e licenze degli asset verificati.
- [ ] Test responsive desktop/tablet/mobile e tastiera.
- [ ] Verifica post-deploy del commit e URL effettivamente pubblicati.

## Riferimenti primari
- Sito ufficiale: https://www.mesh.co.uk/
- Discografia: https://www.mesh.co.uk/discography
- Live: https://www.mesh.co.uk/live
- Shop ufficiale / Bandcamp: https://www.mesh.co.uk/shop
- Bandcamp: https://mesh-uk.bandcamp.com/
- Repository: https://github.com/salvatoresinatra0001-ux/mesh-italia
- Netlify: https://app.netlify.com/projects/mesh-italia

## Rischi attualmente rilevati
1. `site/robots.txt` sul branch `main` contiene `Disallow: /`: blocco indicizzazione.
2. `site/sitemap.xml` usa URL GitHub Pages; non è una sitemap corretta per Netlify se Netlify è il dominio canonico.
3. Percorsi assoluti `/mesh-italia/...` compatibili con GitHub Pages, da verificare/normalizzare per Netlify root-domain.
4. Deploy Netlify in produzione segnato come manuale e senza commit di origine; la sincronizzazione Git non è dimostrata.
5. Repository contiene file di immagini e copertine; documentare licenza/diritto d'uso prima di nuovi riutilizzi.
