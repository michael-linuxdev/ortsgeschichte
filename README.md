# Ortsgeschichte

Die Geschichte deines Ortes – aus alten Zeitungen, Fotos und Karten.
Statische Web-App, fragt live die APIs der [Deutschen Digitalen Bibliothek](https://api.deutsche-digitale-bibliothek.de/2/q/openapi) und von [Europeana](https://pro.europeana.eu/page/apis) ab.

Live: https://ortsgeschichte.micana.de (GitHub Pages, Branch `main`, Root)

## Struktur
- `index.html` – komplette App (HTML/CSS/JS, kein Build)
- `assets/fonts/` – selbst gehostete Schriften (keine Google-Fonts-Anfragen, DSGVO-freundlich)
  - Fraunces 600 (Überschriften, OFL), Inter 400/600 (UI, OFL), TeX Gyre Pagella (Zeitungstexte, GUST Font License)
- `CNAME` – Custom Domain für GitHub Pages

## Funktionen
- **Heute vor 100 Jahren**, **Zeitungen** (Volltextsuche mit Treffer-Ausschnitt), **Bilder** (DDB + Europeana, Dubletten-Filter, Lizenzfilter), **Merkliste** (nur lokal im Browser)
- Bild-/Seitenansicht mit Zoom (IIIF der DDB in hoher Auflösung, Fallback auf Vorschaubilder)
- Hinweis zur Einordnung bei Zeitungen aus 1933–1945
- Installierbar als App (PWA, `manifest.webmanifest`, `sw.js` – cacht nur die App-Hülle, keine API-Daten)
- Debug-Ansicht: `?debug` an die URL hängen

## Konfiguration
Oben im Script von `index.html`: `CONFIG.europeanaKey` – eigenen Europeana-Key eintragen (ein Key pro Anwendung, laut Europeana-Nutzungsbedingungen).

## APIs
- DDB v2 Solr: `/2/search/index/search/select` (Objekte), `/2/search/index/newspaper-issues/select` (Zeitungsportal, Volltext in `plainpagefulltext`) – kein API-Key nötig
- Europeana Search API: `record/v2/search.json`
- Zeitungs-Ausschnitte kommen per Solr-Highlighting (`hl=true`); falls die API das nicht liefert, fällt die App automatisch auf den Volltext zurück
