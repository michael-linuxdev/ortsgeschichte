# Ortsgeschichte

Die Geschichte deines Ortes – aus alten Zeitungen, Fotos und Karten.
Statische Web-App, fragt live die APIs der [Deutschen Digitalen Bibliothek](https://api.deutsche-digitale-bibliothek.de/2/q/openapi) und von [Europeana](https://pro.europeana.eu/page/apis) ab.

Live: https://ortgeschichte.micana.de (GitHub Pages, Branch `main`, Root)

## Struktur
- `index.html` – komplette App (HTML/CSS/JS, kein Build)
- `assets/fonts/` – selbst gehostete Schriften (keine Google-Fonts-Anfragen, DSGVO-freundlich)
  - Fraunces 600 (Überschriften, OFL), Inter 400/600 (UI, OFL), TeX Gyre Pagella (Zeitungstexte, GUST Font License)
- `CNAME` – Custom Domain für GitHub Pages

## APIs
- DDB v2 Solr: `/2/search/index/search/select` (Objekte), `/2/search/index/newspaper-issues/select` (Zeitungsportal, Volltext in `plainpagefulltext`) – kein API-Key nötig
- Europeana Search API: `record/v2/search.json` – aktuell Demo-Key `api2demo`, eigenen Key beantragen
