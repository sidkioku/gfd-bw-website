# GfD BW Website (Astro Migration)

Offizielle moderne Website für die **Gesellschaft für Dialog Baden-Württemberg e.V.** (migriert von WordPress zu Astro).

---

## 🚀 Schnellstart

```bash
# Abhängigkeiten installieren
npm install

# Lokalen Entwicklungsserver starten (http://localhost:4321)
npm run dev

# Produktions-Build erzeugen und prüfen
npm run build

# Vorschau des Produktions-Builds
npm run preview
```

---

## 🎨 Tech-Stack & Design-System

- **Framework:** [Astro 4](https://astro.build) (statische Generierung, extrem schnell, kein JavaScript-Overhead)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) mit dem Corporate-Design der GfD BW
- **Farben:**
  - Primärblau (Buttons & Akzente): `#4685AE`
  - Dunkelblau / Navy (Header & Footer): `#1E3A5F`
  - Stahlblau (Subtitles & Badges): `#4A7C9E`
  - Hintergrund: `#F9F9F9`
  - Text: `#585756`
- **Typografie (100% DSGVO-konform selbst gehostet via Fontsource):**
  - Überschriften: **Montserrat** (Bold)
  - Fließtext: **Roboto** (Regular, Medium)
  - *Keine Anfragen an Google-Fonts-Server (Abmahnsicher nach deutschem Recht).*

---

## 📄 Seitenstruktur

- **Startseite (`/`)** — Hero, Leitmotiv, Themenübersicht, anstehende Termine, aktuelle Beiträge, Projekte
- **Über uns (`/ueber-uns`)**
  - `/ueber-uns/ziele` — Leitbild & Satzungsziele
  - `/ueber-uns/vorstand` — Vorstand & Geschäftsführung
  - `/ueber-uns/hizmet-bewegung` — Hintergründe & Werte
  - `/ueber-uns/satzung` — Vereinssatzung
  - `/ueber-uns/partner` — Partnerorganisationen & Netzwerke
- **Themen (`/themen`)**
  - `/themen/interreligioeser-dialog`
  - `/themen/gesellschaft-und-politik`
  - `/themen/gender-und-geschlechtergerechtigkeit`
  - `/themen/jugend`
  - `/themen/kunst-kultur`
- **Projekte (`/projekte`)**
  - `/projekte` — Aktuelle Projekte (Ramadan im Ländle, Bibel–Koran, etc.)
  - `/projekte/archiv` — Abgeschlossene Projekte
- **Veranstaltungen (`/veranstaltungen`)**
  - `/veranstaltungen` — Anstehende Termine & Kalender
  - `/veranstaltungen/archiv` — Archiv aller 74+ vergangenen Veranstaltungen
  - `/veranstaltungen/[slug]` — Automatisch generierte Einzelseiten je Event
- **Aktuelles (`/aktuelles`)**
  - `/aktuelles` — Beitragsübersicht
  - `/aktuelles/[slug]` — Automatisch generierte Einzelseiten je Beitrag
- **Mitmachen & Service:**
  - `/aktiv-werden` — Ehrenamt, Mitwirken & Online-Spenden
  - `/mitglied-werden` — Digitaler Mitgliedsantrag
  - `/newsletter` — Newsletter-Anmeldung
  - `/mediathek` — YouTube- und Instagram-Anbindung
  - `/kontakt` — Kontaktformular mit Standorten Stuttgart & Mannheim
- **Rechtliches:**
  - `/impressum` — Rechtliche Angaben nach § 5 TMG / VR-720418
  - `/datenschutz` — DSGVO-Erklärung für die statische Website

---

## ✍️ Inhalte bearbeiten & Neue Einträge anlegen

Alle Termine und Berichte werden als einfache **Markdown-Dateien (`.md`)** gepflegt:

### Neue Veranstaltung anlegen:
Erstellen Sie eine Datei in `src/content/events/YYYY-MM-DD-titel.md`:

```markdown
---
title: "Titel der Veranstaltung"
date: 2026-11-20
location: "Hospitalhof Stuttgart"
description: "Kurze Zusammenfassung für die Übersichtskarte."
categories: ["Interreligiöser Dialog"]
past: false
---

Ausführliche Beschreibung, Ablauf, Referenten und Anmeldedetails hier als Text...
```

### Neuen Beitrag anlegen:
Erstellen Sie eine Datei in `src/content/posts/YYYY-MM-DD-titel.md`:

```markdown
---
title: "Titel des Berichts"
date: 2026-10-25
categories: ["Aktuelles", "Projekte"]
description: "Kurzer Teasertext."
---

Vollständiger Artikeltext hier...
```

Beim nächsten Build (`npm run build`) werden automatisch alle Übersichtsseiten, Filter und Einzelseiten fehlerfrei generiert.

---

## 🌐 Bereitstellung (Netlify / Vercel)

Die Website ist für **Netlify** (oder Vercel / GitHub Pages) vorkonfiguriert:
1. Repository auf GitHub pushen.
2. Neues Projekt in Netlify mit dem Repository verknüpfen.
3. Build-Befehl: `npm run build`
4. Publish directory: `dist`
5. Formulare (`name="kontakt"`, `name="mitgliedschaft"`, `name="newsletter"`) werden automatisch und kostenlos von Netlify Forms verarbeitet.
6. Domain `gfd-bw.org` in Netlify als Custom Domain eintragen und DNS auf Netlify verweisen.
