# HUUSanova

Moderner Web-Nachbau des klassischen CASAnova-Programms (Uni Siegen, Fachgebiet Bauphysik & Solarenergie) zur schnellen Gebaeudeenergiebilanzierung. Entwickelt als Lehrtool, bei dem Studierende ueber Schieberegler die Bauphysik interaktiv anpassen und die Auswirkungen auf Heiz- und Kuehlenergiebedarf sofort sehen koennen.

**HUUSanova** = HUUS (plattdeutsch: Haus) + anova - eine norddeutsche Hommage an den Casanova-Wortwitz.

## Features

### 7-Tab-Navigation

| Tab | Inhalt |
|-----|--------|
| **Klima / Standort** | 21 Datensaetze (15 DWD TRY-Zonen + Wuerzburg, 3x CH, 5 globale Klimazonen), klickbare TRY-Karte + klickbare Weltkarte, Berechnungsmethode, Preset, Klimadatentabelle |
| **Geometrie** | Isometrische 3D-Ansicht mit 4 Dachformen, Kellergeschoss, editierbaren Massen, Nordpfeil, A/V-Thermometer, abgeleitete Werte |
| **Innenraum** | Heiz-/Kuehlsolltemperatur, interne Gewinne, Speichermasse (leicht/mittel/schwer) |
| **Fenster** | Fensteranteile je Fassade (N/E/S/W), g-Wert, Rahmenanteil, Verschattung |
| **Opake Flaechen** | U-Werte (Wand, Dach, Boden), Waermebruecken, Flaechenubersicht, H_T-Koeffizienten |
| **TGA** | Waermeerzeuger nach GEG §71, Warmwasser, Lueftung, Photovoltaik |
| **Ergebnisse** | 6 Kennzahlen, Monatsbilanz, Sankey-Diagramm, Energieausweis, Gebaeudeansicht |

### Berechnungsverfahren (anwaehlbar)
- **EN 832 / ISO 13790** - Monatsbilanzverfahren (Heizen + Kuehlen)
- **SIA 380/1** - Schweizer vereinfachtes Verfahren
- **DIN 18599** - Deutsches vereinfachtes Verfahren

### TGA-Systeme nach GEG §71
- 9 Waermeerzeuger: Gas-/Oel-Brennwert, Luft-/Sole-Waermepumpe, Pellet, Fernwaerme (fossil/erneuerbar), Elektro-Direktheizung, Scheitholz
- GEG-Konformitaets-Anzeige (65% erneuerbare Energien)
- Primaerenergiefaktoren und Nutzungsgrade/Jahresarbeitszahlen
- 3 Warmwassersysteme (gleicher Erzeuger, Elektro-Durchlauferhitzer, Solarthermie-Unterstuetzung)
- Photovoltaik mit kWp, spezifischem Ertrag und Eigenverbrauchsanteil

### Verordnungs-Presets (individuell anpassbar)
| Verordnung | Zeitraum | U-Wand | U-Dach | U-Boden | U-Fenster |
|-----------|----------|--------|--------|---------|-----------|
| WSchV 1977 | ab 1977 | 1.45 | 0.45 | 0.90 | 3.10 |
| WSchV 1984 | ab 1984 | 0.80 | 0.40 | 0.70 | 3.10 |
| WSchV 1995 | ab 1995 | 0.50 | 0.30 | 0.50 | 1.80 |
| EnEV 2002 | ab 2002 | 0.45 | 0.30 | 0.50 | 1.70 |
| EnEV 2007 | ab 2007 | 0.45 | 0.30 | 0.50 | 1.70 |
| EnEV 2009 | ab 2009 | 0.35 | 0.25 | 0.40 | 1.30 |
| EnEV 2014 | ab 2014 | 0.28 | 0.20 | 0.35 | 1.30 |
| EnEV 2016 | ab 2016 | 0.28 | 0.20 | 0.35 | 1.30 |
| GEG 2020 | ab 2020 | 0.28 | 0.20 | 0.35 | 1.30 |
| GEG 2024 | ab 2024 | 0.24 | 0.16 | 0.30 | 1.10 |
| Passivhaus | - | 0.15 | 0.15 | 0.15 | 0.80 |

### Visualisierungen
- **Isometrische 3D-Gebaeudeansicht**: SVG mit editierbaren Massen, 4 Dachformen (Sattel/Walm/Flach/Pult), Kellergeschoss, Nordpfeil auf Grundebene
- **Klickbare TRY-Klimakarte**: Original-Regionenkarte nach DIN V 18599 mit Hotspots auf den 15 Referenzstationen
- **Klickbare Weltkarte der thermischen Klimazonen**: Zonenauswahl per Pixel-Farberkennung (Polar, Subpolar, Gemaessigt, Subtropen, Tropen)
- **A/V-Verhaeltnis-Thermometer**: Farbverlauf gruen-gelb-rot mit Referenzkoerper-Markern (Kugel, Wuerfel)
- **Monatsbilanz-Balkendiagramm**: Gestapelte Verluste vs. Gewinne mit Heiz-/Kuehllinie
- **Sankey-Energieflussdiagramm**: Energiefluesse (Heiz-/Kuehlansicht umschaltbar)
- **Energieausweis-Skala**: Farbige Skala A+ bis H mit Markern fuer Heiz- und Kuehlbedarf
- **2D-Gebaeudevisualisierung**: SVG-Querschnitt mit Waermestrom-Pfeilen und Winter/Sommer-Modus

### Grundlagen-Infosystem
- Integrierte Erklaerungen zu Waermeuebertragung, U-Wert, g-Wert, Waermebruecken, Luftdichtheit, Monatsbilanzverfahren, sommerlichem Waermeschutz, Verordnungshistorie
- LaTeX-Formeln und Markdown-basiert
- Deutsch + Englisch

## Technologie-Stack

| Komponente | Technologie |
|-----------|-------------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| State Management | Zustand |
| UI-Komponenten | shadcn/ui (Radix) + Tailwind CSS v4 |
| Diagramme | Recharts + @nivo/sankey |
| Visualisierung | React-SVG (2D + isometrisch) |
| Internationalisierung | react-i18next (DE + EN) |
| Grundlagen-Rendering | react-markdown + remark-math + rehype-katex |
| Tests | Vitest |

## Schnellstart / Quick Start

```bash
# Abhaengigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Tests ausfuehren
npm test

# Produktions-Build erstellen
npm run build

# Produktions-Build lokal testen
npm run preview
```

Die App laeuft dann unter `http://localhost:5173`.

## Deployment / Verteilung an Studierende

Die App ist rein clientseitig - kein Backend, keine API-Keys, keine Datenbank.
`npm run build` erzeugt in `dist/` eine vollstaendig statische Seite, die auf
jeden Webserver kopiert werden kann (Uni-Webspace, GitHub Pages, Netlify).

Durch `base: './'` in `vite.config.ts` sind alle Pfade relativ, die Seite laeuft
also auch aus einem Unterverzeichnis (`example.de/kurs/huusanova/`). Es gibt
keine Laufzeit-Abhaengigkeit zum Internet - KaTeX ist mitgebundelt.

Wichtig: Ein blosses Oeffnen von `dist/index.html` per Doppelklick funktioniert
**nicht** - ES-Module laufen nicht ueber `file://`. Es braucht immer einen
Webserver (lokal genuegt `npm run preview`).

## Berechnungsgrundlage

### Heizwaermebedarf (EN 832 / ISO 13790)
Monatliches Bilanzverfahren:
```
Qh = max(0, (QT + QV) - eta_H * (Qs + Qi))
```
- QT = Transmissionsverluste (U-Werte x Flaechen x Temperaturdifferenz)
- QV = Lueftungsverluste (Luftwechsel x Volumen x Temperaturdifferenz)
- Qs = Solare Gewinne (Fensterflaechen x g-Wert x Verschattung x Einstrahlung)
- Qi = Interne Gewinne (Personen, Geraete, Beleuchtung)
- eta_H = Gewinn-Ausnutzungsgrad (abhaengig von Speichermasse und Gewinn-Verlust-Verhaeltnis)

### Kuehlenergiebedarf (ISO 13790, Abschnitt 8)
```
Qc = max(0, (Qs + Qi) - eta_ls * (QT + QV))
```
- eta_ls = Verlust-Ausnutzungsgrad
- Beruecksichtigt: Beweglicher Sonnenschutz (Fc), Nachtlueftung, Speichermasse-Klasse

### Primaerenergie
```
Qp = (Qh/eta + Qdhw) * fp - PV_credit
```
- eta = Anlagen-Nutzungsgrad bzw. Jahresarbeitszahl (WP)
- fp = Primaerenergiefaktor nach GEG
- PV_credit = Eigenverbrauch × fp

## Projektstruktur

```
src/
  calculation/          Berechnungs-Engines (EN 832, SIA 380/1, DIN 18599)
    types.ts            TypeScript-Interfaces inkl. TGA + PrimaryEnergy
    en832.ts            Kernberechnung Heizen + Kuehlen + Primaerenergie
    sia380.ts           SIA 380/1 Wrapper
    din18599.ts         DIN 18599 Wrapper
    __tests__/          Unit-Tests (Vitest)
  components/
    tabs/               7 Tab-Komponenten (Climate, Geometry, Indoor, Windows, Opaque, TGA, Results)
    inputs/             Schieberegler, Selektoren, GermanyClimateMap, WorldClimateMap
    charts/             Monatsbilanz, Sankey, Energieausweis-Skala, OutputPanel
    visualization/      IsometricBuilding, 2D-SVG-Gebaeudedarstellung
    grundlagen/         Info-System und Referenzseite
    layout/             Header
    ui/                 shadcn/ui-Basiskomponenten
  data/
    climateData/        Monatliche Klimadaten (DE + CH + 5 globale Klimazonen)
    tgaSystems.ts       9 Heizsysteme + Primaerenergie-Berechnung
    presets.ts          Verordnungs-Voreinstellungen
    energyClasses.ts    Energieausweis-Klassen A+ bis H
    grundlagen/         Inhalte fuer Grundlagen-Infosystem
  store/
    buildingStore.ts    Zustand Store (reaktiv, 50ms Debounce)
  i18n/                 Uebersetzungsdateien (DE + EN, je ~190 Keys)
```

## Ursprung / Origin

CASAnova wurde urspruenglich am Fachgebiet Bauphysik & Solarenergie der Universitaet Siegen als Lernprogramm entwickelt (Dipl.-Phys. Tilo Braeske, Stefan Benkert, Joachim Clemens unter Prof. Dr.-Ing. Frank-Dietrich Heidt). HUUSanova ist ein eigenstaendiger Nachbau als moderne Web-Anwendung.

## Entwicklungsprozess

Dieses Projekt wurde mit KI-Unterstuetzung (Claude Code / Anthropic) entwickelt. Der gesamte Entwicklungsprozess ist in [`DEVELOPMENT_LOG.md`](./DEVELOPMENT_LOG.md) dokumentiert - inklusive aller Prompts, des generierten Code-Umfangs und der Zeitachse. Dies dient als Anschauungsmaterial fuer Studierende.

**Kennzahlen**: ~470 Woerter Benutzereingabe in 12 Prompts ueber 4 Sessions erzeugten 5.419 Zeilen Code in 50 Dateien (Verhaeltnis 1:11).

## Bildquellen

- TRY-Klimaregionenkarte Deutschland: [caala.de - Klimaregion DIN V 18599](https://www.caala.de/lexikon/klimaregion-din-v-18599)
- Thermische Klimazonen der Erde: [jam-school.de - Thermische Klimazonen](https://jam-school.de/thermische-klimazonen-klimazonen-der-erde-%E2%80%A2-definition-und-ubersicht-%C2%B7-mit-video/)

Die Karten werden als Anschauungsmaterial im Lehrkontext verwendet und sind in der App mit Quellenangabe verlinkt.

## Lizenz

Frei fuer Lehre und Forschung.
