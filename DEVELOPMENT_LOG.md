# HUUSanova - Entwicklungslog / Development Log

Dieses Log dokumentiert den gesamten Entwicklungsprozess von HUUSanova (vormals CASAnova 2):
Wie viele Prompts (Benutzereingaben) waren noetig, wie viel Code wurde generiert, und wie lange hat es gedauert?

**Ziel**: Studierenden zeigen, mit wie wenig Eingabeaufwand ein funktionsfaehiges Programm entsteht.

---

## Zusammenfassung / Summary

| Kennzahl | Session 1 (Jun 24) | Session 2 (Jul 15) | Session 3 (Aug 3) | Session 4 (Aug 4) | **Gesamt** |
|----------|--------------------|--------------------|-------------------|-------------------|------------|
| Prompts (Benutzereingaben) | 3 (+1 Klick) | 2 | 6 | 1 | **12 (+1 Klick)** |
| Prompt-Woerter (geschaetzt) | ~160 | ~90 | ~180 | ~40 | **~470** |
| Neue Code-Zeilen (src/) | 3.451 | - | +1.645 | +323 | **5.419** |
| Neue Dateien (src/) | 42 | 0 | +6 neue, 8 modifiziert | +2 neue, 6 modifiziert | **50** |
| Unit-Tests | 17 | 0 | 17 (angepasst) | 20 | **20** |
| Build-Groesse (gzipped) | 397 KB | - | ~405 KB | ~405 KB (+316 KB Karten) | **~405 KB** |
| Verhaeltnis Woerter : Zeilen | 1 : 15 | - | 1 : 10 | 1 : 8 | **1 : 11** |

---

## Prompt-Protokoll / Prompt Log

### Session 1: Initiale Implementierung (2026-06-24)

#### Prompt #1 - Projektbeschreibung und Anforderungen
- **Datum**: 2026-06-24
- **Typ**: Initiale Projektbeschreibung
- **Sprache**: Deutsch
- **Woerter**: ~150
- **Inhalt (woertlich)**:
  > im Ordner casanovaalt ist eine .exe fuer ein kleines, sehr altbackenes Programm zur schnellen Gebaeudebi llanzierung. Fuer die Lehre eigenet sich dieses jedoch super, da ueber schieberegler sehr leicht die bauphysik angepasst werden kann und die auswirkungen auf den heizenergiebedarf direkt sichtbar werden. Dieses Programm wuerde ich gerne in modern nachbauen. aehnlich ist das hier umgesetzt: https://drajmarsh.bitbucket.io/thermal-analysis.html, das kann durchaus als vergleich dienen. ggf. bietet sich auch das vereinfachte Verfahren der Schweizer SIA als anwaehlbare grundlage an. Ebenfalls das vereinfachte verfahren welches zwischenzeitlich mal in der deutschen DIN 18599 war bietet sich als anwaehlbares Verfahren an. Fuer die Bauphysik sollen als Vorauswahl verschiedene Anforderungen an die Gebaeudehuelle (von Waermeschutzverordnung ueber EnEV bis GEG / GMG) auswaehlbar, aber individuell anpassbar sein. Die Erforderlichen Grundlagen direkt in einem Grundlagen Ordner ablegen und spaeter auch als "Info" Boxen im Programm integrieren. Stell Rueckfragen, mache Vorschlaege und nutze wenn moeglich mehrere Agenten.
- **Ergebnis**: KI stellte 4 Rueckfragen (Framework, Visualisierung, Sprache, Diagramme), erstellte detaillierten 8-Phasen-Implementierungsplan

#### Prompt #1b - Antworten auf Rueckfragen
- **Datum**: 2026-06-24
- **Typ**: Auswahl aus vorgeschlagenen Optionen (Klick, kein Tippen)
- **Woerter**: 0 (reine Auswahl)
- **Inhalt**:
  - Framework: "React + Vite (Recommended)"
  - Visualisierung: "Beides (spaeter erweiterbar)"
  - Sprache: "Deutsch + Englisch"
  - Diagramme: "Alle drei"

#### Prompt #2 - Ergaenzung Kuehlung
- **Datum**: 2026-06-24
- **Typ**: Feature-Ergaenzung
- **Woerter**: ~5
- **Inhalt (woertlich)**:
  > Kuehllast / Kuehlenergiebedarf auch integrieren.
- **Ergebnis**: Plan um vollstaendige Kuehlberechnung (ISO 13790 Abschnitt 8) ergaenzt, inkl. Sonnenschutz, Nachtlueftung, Speichermasse-Klassen, Sommer/Winter-Umschalter in SVG

#### Prompt #3 - Freigabe und Umsetzung
- **Datum**: 2026-06-24
- **Typ**: Freigabe des Plans
- **Woerter**: ~5
- **Inhalt (woertlich)**:
  > Continue from where you left off.
- **Ergebnis**: Vollstaendige Implementierung aller 8 Phasen. 3.451 Zeilen Code in 42 Dateien generiert.

---

### Session 2: Dokumentation (2026-07-15)

#### Prompt #4 - Statusabfrage + Dieses Log
- **Datum**: 2026-07-15
- **Typ**: Statusabfrage + Feature-Anfrage
- **Woerter**: ~70
- **Inhalt (woertlich)**:
  > wie weit ist das projekt hier? Zusaetzlich zur Dokumentation: Erstellung einer Datei, wo alle meine Prompts geloggt werden und auch der Umfang von neu erstelltem Programmcode. Ziel ist, den Studis zu zeigen, mit wie viel Eingabeaufwand zu welchem Zeitpunkt wie viel neuer code entsteht und wie lange es dann dauert, bis das Programm einsatzbereit ist.
- **Ergebnis**: Diese Log-Datei

#### Prompt #5 - Dokumentation + Review
- **Datum**: 2026-07-15
- **Typ**: Dokumentations-Update + Review-Anfrage
- **Woerter**: ~20
- **Inhalt (woertlich)**:
  > Doku und readme updaten und dann schaue ich mir das aktuelle ergebnis einmal an.
- **Ergebnis**: README.md komplett neu geschrieben (Projektbeschreibung, Features, Schnellstart, Berechnungsgrundlage, Projektstruktur). DEVELOPMENT_LOG.md um Prompt #5 ergaenzt. Dev-Server gestartet fuer Review.

---

### Session 3: Grosse Umstrukturierung - 7-Tab-Layout + TGA + Umbenennung (2026-08-03)

#### Prompt #6 - Weiterarbeit und Dev-Server starten
- **Datum**: 2026-08-03
- **Typ**: Kontextwechsel + Review-Vorbereitung
- **Woerter**: ~20
- **Inhalt (woertlich)**:
  > so. wo waren wir hier stehen geblieben? bitte einma. auch den localhost starten, dass ich mein feedback sammeln kann.
- **Ergebnis**: Projektstand analysiert, Dev-Server gestartet

#### Prompt #7 - Komplette UI-Umstrukturierung + TGA + GEG
- **Datum**: 2026-08-03
- **Typ**: Grosse Feature-Anfrage (Umstrukturierung + neue Features)
- **Woerter**: ~80
- **Inhalt (woertlich)**:
  > also, ich wuerde gerne die Eingaben nicht alle auf einmal haben, sondern einen Reiter fuer 'Klima / Standort', einen fuer Geometrie (gerne auch mit isometrischer Ansicht in der die Werte eingegeben werden koennen), einen fuer Innenraumrandbedingungen, einen fuer Fenster, einen fuer Opake Flaechen, einen fuer TGA und einen 'Ergebnisse' wo dann auch alle Energiefluesse als Sankey-Diagramm dargestellt werden. Auswahl der TGA Systeme gerne nach dem aktuell noch gueltigen GEG.
- **Ergebnis**:
  - Komplette UI-Umstrukturierung von 3-Panel-Sidebar auf 7-Tab-Navigation
  - 7 neue Tab-Komponenten erstellt (ClimateTab, GeometryTab, IndoorConditionsTab, WindowsTab, OpaqueTab, TGATab, ResultsTab)
  - Isometrische 3D-Gebaeudeansicht (SVG) mit editierbaren Massen, Kompassrose, Geschosslinien
  - TGA-System nach GEG §71 (9 Waermeerzeuger mit Primaerenergiefaktoren, GEG-Konformitaets-Badge)
  - Primaerenergie-Berechnung (Endenergie via Nutzungsgrad/COP, dann × f_P, minus PV-Gutschrift)
  - Warmwasserbereitung (3 Systeme inkl. Solarthermie)
  - Photovoltaik (kWp, spezifischer Ertrag, Eigenverbrauch)
  - Ergebnisseite mit 6 Kennzahlen-Karten + 4 Diagrammen
  - 63 neue Uebersetzungs-Keys (tabs.*, tga.*, output.primaryEnergy etc.)
  - App.tsx komplett neu geschrieben

#### Prompt #8 - Umbenennung zu HUUSanova
- **Datum**: 2026-08-03
- **Typ**: Naming / Branding
- **Woerter**: ~10
- **Inhalt (woertlich)**:
  > und als namen fand ich HUUSanova super.
- **Ergebnis**: Name in index.html, de.json und en.json auf "HUUSanova" geaendert (HUUS = plattdeutsch fuer Haus, Anspielung auf den Casanova-Wortwitz plus "Hausfreund"-Doppeldeutigkeit)

#### Prompt #9 - Dokumentation + ToDo-Liste abarbeiten
- **Datum**: 2026-08-03
- **Typ**: Feature-Anfrage + Dokumentation
- **Woerter**: ~40
- **Inhalt (woertlich)**:
  > schon mal doku, readme und promptumfang über Zeit und Codeentwicklung für die retrospektive mit den studis updaten.
- **Ergebnis**: DEVELOPMENT_LOG.md mit Session 3 Prompts #6-#8 aktualisiert, README.md komplett neu geschrieben

#### Prompt #10 - ToDo-Liste: Klima + Geometrie abarbeiten
- **Datum**: 2026-08-03
- **Typ**: Feature-Anfrage (aus ToDo-Liste)
- **Woerter**: ~20
- **Inhalt (woertlich)**:
  > im ordner ist jetzt eine ToDo.txt Den Umfang auch mit in die DEVELOPMENT_LOG.md mit einbeziehen und dann schon mal die Punkte fuer Klima und Geometrie ansehen / abarbeiten und abhaken.
- **Ergebnis**:
  - **15 DWD TRY-Klimazonen** fuer Deutschland (statt vorher 3 Standorte) mit echten Messdaten
  - **Klickbare SVG-Karte** von Deutschland mit 16 Stationen (15 TRY + Wuerzburg)
  - **TRY-Nummern und Regionsnamen** (z.B. "TRY 12: Oberrheingraben") als Hover/Klick-Labels
  - **Isometrische Gebaeude-Ansicht** erweitert: 4 Dachformen (Sattel/Walm/Flach/Pult), Kellergeschoss, Nordpfeil auf Grundebene
  - **A/V-Verhaeltnis-Thermometer** mit Referenz-Koerpermarkern (Kugel, Wuerfel)
  - **Architektonische Kenngroessen** (BGF, A_N, V_e, A_E, Fassadenflaechen)
  - **Gebaeudezonen-Panel** mit Keller/DG beheizt/unbeheizt Checkboxen
  - ToDo.txt: 7 von 13 Geometrie-/Klima-Punkten abgehakt

#### Prompt #11 - Abschluss-Dokumentation
- **Datum**: 2026-08-03
- **Typ**: Dokumentations-Update
- **Woerter**: ~10
- **Inhalt (woertlich)**:
  > update doku, readme, todo und genug fuer heute. morgen gehts weiter.
- **Ergebnis**: README.md aktualisiert (16 Standorte, 4 Dachformen, Klimakarte, A/V-Thermometer). DEVELOPMENT_LOG.md mit Prompt #11 ergaenzt. Klima-Karten-Dots vergroessert fuer bessere Klickbarkeit.

### Session 4: Echte Kartengrafiken statt SVG-Nachbau (2026-08-04)

#### Prompt #12 - Kartengrafiken einbinden
- **Datum**: 2026-08-04
- **Typ**: Feature + Assets
- **Woerter**: ~40
- **Inhalt (woertlich)**:
  > im ordner Bilder hab ich noch 2 Grafiken, die zur Klimaauswahl fuer D und die Welt passen.
  > Die noch statt der aktuellen "Karte" einbauen.
  > Quellen: https://www.caala.de/lexikon/klimaregion-din-v-18599 und
  > https://jam-school.de/thermische-klimazonen-klimazonen-der-erde-...
- **Ergebnis**:
  - Der handgezeichnete SVG-Umriss Deutschlands wurde durch die Original-Regionenkarte
    (DIN V 18599, caala.de) ersetzt. Die 15 Hotspots liegen pixelgenau auf den gruenen
    Referenzstationen der Grafik - die Positionen wurden per Farbanalyse der JPG-Datei
    (Green-Channel-Scan + Clustering) automatisch bestimmt statt geschaetzt.
  - Neue Weltkarte der thermischen Klimazonen (jam-school.de). Die Zonenauswahl laeuft
    ueber einen Pixel-Farbtest: Das Bild wird in ein Offscreen-Canvas gezeichnet, ein Klick
    liest die RGB-Werte an der Klickposition und ordnet sie ueber euklidischen Farbabstand
    einer der 5 Zonen zu. Klicks auf Ozean/weisse Flaechen werden erkannt und gemeldet.
  - 5 neue Klimadatensaetze (Polar, Subpolar, Gemaessigt, Subtropen, Tropen) als
    repraesentative Referenz-Monatsdaten.
  - **Bugfund**: Die Tropen-Daten haben einen latenten Fehler in der Berechnung aufgedeckt.
    Liegt das Monatsmittel in *allen* Monaten ueber der Heiz-Solltemperatur, sind die
    Transmissions-/Lueftungsverluste null, das Gewinn/Verlust-Verhaeltnis wird unendlich
    und der Ausnutzungsgrad `(1-γ^a)/(1-γ^(a+1))` ergibt NaN. Ergebnis: alle Kennzahlen NaN.
    Behoben durch Grenzfall-Behandlung (η_H = 0 bei fehlenden Verlusten) + 3 Regressionstests.
  - Kartenquellen sind in der App verlinkt.
  - **Nebenbefund**: `npm run build` war seit Session 3 kaputt (6 TypeScript-Fehler durch
    ungenutzte Variablen/Importe und eine zu enge Signatur von `setNestedParam`). Aufgefallen
    ist es nur, weil in dieser Session erstmals wieder ein Produktionsbuild lief - `tsc --noEmit`
    prueft ueber die Solution-Datei nicht dieselben Projekte wie `tsc -b`. Behoben.

---

## Code-Entstehung nach Phase / Code Generation by Phase

### Phase 1-8: Initiale Implementierung (Session 1)

*(unveraendert - siehe Einzelaufschluesselung weiter unten)*

| Phase | Dateien | Zeilen | Inhalt |
|-------|---------|--------|--------|
| 1. Projekt-Setup | 10 | 146 | package.json, vite.config, tsconfig, main.tsx |
| 2. Berechnungsmodul | 16 | 1.859 | EN 832, Klimadaten, Presets, Store, i18n |
| 3. Eingabe-UI | 9 | 480 | ParameterSlider, alle Input-Komponenten |
| 4. Ausgabe-Diagramme | 4 | 384 | MonthlyBalance, Sankey, EnergyScale, OutputPanel |
| 5. 2D-Visualisierung | 2 | 305 | BuildingSVG, BuildingVisualization |
| 6. Berechnungsverfahren | (in 2) | (in 2) | SIA 380/1, DIN 18599 Wrapper |
| 7. Grundlagen-Info | (in 2) | (in 2) | Markdown+LaTeX Inhalte, GrundlagenPage |
| 8. UI-Rahmen | 3 | 131 | shadcn Accordion, Slider, Tabs |
| **Summe Session 1** | **42** | **3.451** | |

### Phase 9: Tab-Umstrukturierung + TGA + Isometrie (Session 3)

| Datei | Zeilen | Aenderung | Inhalt |
|-------|--------|-----------|--------|
| components/tabs/ClimateTab.tsx | 90 | **neu** | Klima, Methode, Preset, Klimadaten-Tabelle |
| components/tabs/GeometryTab.tsx | 58 | **neu** | Isometrische Ansicht + abgeleitete Werte |
| components/tabs/IndoorConditionsTab.tsx | 52 | **neu** | Heizung, Kuehlung, Speichermasse |
| components/tabs/WindowsTab.tsx | 86 | **neu** | Fensteranteile + Flaechentabelle |
| components/tabs/OpaqueTab.tsx | 98 | **neu** | U-Werte + HT-Koeffizienten |
| components/tabs/TGATab.tsx | 220 | **neu** | Waermeerzeuger, DHW, Lueftung, PV |
| components/tabs/ResultsTab.tsx | 120 | **neu** | 6 Kennzahlen + 4 Diagramme |
| visualization/IsometricBuilding.tsx | 635 | **neu** | Isometrische SVG mit editierbaren Inputs |
| data/tgaSystems.ts | 156 | **neu** | 9 Heizsysteme + Primaerenergie-Berechnung |
| calculation/types.ts | +49 | modifiziert | TGA-Types, PrimaryEnergyResult |
| calculation/en832.ts | +9 | modifiziert | Primaerenergie-Aufruf integriert |
| store/buildingStore.ts | +10 | modifiziert | TGA-Defaults |
| App.tsx | 92 | **neu geschrieben** | 7-Tab-Navigation statt 3-Panel-Layout |
| layout/Header.tsx | 44 | modifiziert | Vereinfacht (Methode in ClimateTab verschoben) |
| i18n/de.json | +63 | modifiziert | tabs.*, tga.*, output.primary/final/pv* |
| i18n/en.json | +63 | modifiziert | Englische Pendants |
| __tests__/en832.test.ts | +10 | modifiziert | TGA-Defaults in Testdaten ergaenzt |
| inputs/GermanyClimateMap.tsx | 167 | **neu** | Klickbare SVG-Karte mit 16 Stationen |
| data/climateData/germany.ts | +350 | erweitert | 15 TRY-Zonen (vorher 3) mit Regionsnamen |
| visualization/IsometricBuilding.tsx | 220 | **neu geschrieben** | 4 Dachformen, Keller, Grundebenen-Kompass |
| tabs/GeometryTab.tsx | 158 | **neu geschrieben** | A/V-Thermometer, Zonen, abgeleitete Groessen |
| tabs/ClimateTab.tsx | +10 | modifiziert | TRY-Karte + Regionsinfo integriert |
| calculation/types.ts | +3 | modifiziert | tryRegion, regionName in ClimateLocation |
| **Summe Session 3** | | **+1.645** | |

### Phase 10: Kartengrafiken + globale Klimazonen (Session 4)

| Datei | Zeilen | Aenderung | Inhalt |
|-------|--------|-----------|--------|
| data/climateData/world.ts | 140 | **neu** | 5 thermische Klimazonen + Zonenfarben |
| inputs/WorldClimateMap.tsx | 165 | **neu** | Weltkarte, Pixel-Farberkennung, Legende als Auswahl |
| inputs/GermanyClimateMap.tsx | 110 | **neu geschrieben** | Original-Regionenkarte + 15 Hotspots |
| tabs/ClimateTab.tsx | +45 | modifiziert | Kartenbereich mit Umschalter DE / Welt |
| calculation/en832.ts | +6 | modifiziert | Grenzfall Verluste = 0 (NaN-Fix) |
| calculation/types.ts | +1 | modifiziert | climateZone in ClimateLocation |
| data/climateData/index.ts | +4 | modifiziert | Weltzonen registriert |
| inputs/ClimateSelector.tsx | +1 | modifiziert | Optgroup "Klimazonen weltweit" |
| __tests__/en832.test.ts | +33 | modifiziert | 3 Regressionstests fuer Weltzonen |
| store/buildingStore.ts | +0 | modifiziert | setNestedParam akzeptiert boolean (Build-Fix) |
| tabs/GeometryTab.tsx, tabs/IndoorConditionsTab.tsx, visualization/IsometricBuilding.tsx | -5 | bereinigt | ungenutzte Variablen/Importe (Build-Fix) |
| public/maps/ | (Assets) | **neu** | try-klimaregionen-de.jpg (196 KB), klimazonen-welt.png (112 KB) |
| **Summe Session 4** | | **+323** | |

---

## Zeitlicher Verlauf / Timeline

```
2026-06-24  Session 1: Initiale Implementierung
    |       Prompt #1:  Projektbeschreibung (~150 Woerter)
    |       Prompt #1b: Auswahl aus Optionen (0 Woerter, 4 Klicks)
    |       Prompt #2:  "Kuehlung integrieren" (~5 Woerter)
    |       Prompt #3:  "Continue" (~5 Woerter)
    |       --> 3.451 Zeilen in 42 Dateien, 17 Tests
    v
    [21 Tage Pause]

2026-07-15  Session 2: Dokumentation
    |       Prompt #4:  Status + Log-Anfrage (~70 Woerter)
    |       Prompt #5:  "Doku updaten" (~20 Woerter)
    |       --> DEVELOPMENT_LOG.md + README.md
    v
    [19 Tage Pause]

2026-08-03  Session 3: Grosse Umstrukturierung + Klima/Geometrie
    |       Prompt #6:  "wo waren wir?" (~20 Woerter)
    |       Prompt #7:  7-Tab-Layout + TGA + Isometrie (~80 Woerter)
    |       --> +1.296 Zeilen, 9 neue Dateien, 7 modifiziert
    |       --> Isometrische 3D-Ansicht, TGA nach GEG, Primaerenergie
    |       Prompt #8:  "HUUSanova als Name" (~10 Woerter)
    |       --> Umbenennung
    |       Prompt #9:  "Doku updaten" (~40 Woerter)
    |       --> DEVELOPMENT_LOG.md + README.md aktualisiert
    |       Prompt #10: "ToDo Klima+Geometrie abarbeiten" (~20 Woerter)
    |       --> 15 TRY-Klimazonen, SVG-Karte, 4 Dachformen, Keller, A/V
    |       --> +349 Zeilen, 1 neue Datei, 4 modifiziert
    |       Prompt #11: "Doku updaten, genug fuer heute" (~10 Woerter)
    |       --> README.md + DEVELOPMENT_LOG.md + ToDo.txt aktualisiert
    v
    [1 Tag Pause]

2026-08-04  Session 4: Echte Kartengrafiken
    |       Prompt #12: "2 Grafiken statt der aktuellen Karte einbauen" (~40 Woerter)
    |       --> TRY-Regionenkarte (Original) mit 15 pixelgenauen Hotspots
    |       --> Weltkarte der Klimazonen mit Pixel-Farberkennung
    |       --> 5 globale Klimazonen-Datensaetze
    |       --> NaN-Bugfix im Ausnutzungsgrad (Tropen) + 3 Regressionstests
    |       --> +323 Zeilen, 2 neue Dateien, 6 modifiziert, 20 Tests
    v
```

---

## Verhaeltnis Input zu Output / Input-Output Ratio

| Metrik | Session 1 | Session 3 | Session 4 | **Gesamt** |
|--------|-----------|-----------|-----------|------------|
| Benutzereingabe | ~160 Woerter | ~180 Woerter | ~40 Woerter | **~470 Woerter** |
| Generierter Code | 3.451 Zeilen | +1.645 Zeilen | +323 Zeilen | **5.419 Zeilen** |
| **Ratio** | 1 : 22 | 1 : 10 | 1 : 8 | **1 : 11** |
| Quelldateien | 42 | +6 neue | +2 neue | **50** |
| Tests | 17 | 17 (angepasst) | 20 | **20** |

---

## Funktionsumfang im Detail / Feature Scope

### Was mit ~470 Woertern Eingabe entstanden ist:

1. **Berechnungs-Engine** (EN 832 / ISO 13790)
   - Monatliches Heizwaerme-Bilanzverfahren
   - Monatliches Kuehlenergie-Bilanzverfahren
   - Transmissions- und Lueftungsverluste
   - Solare und interne Gewinne
   - Gewinn-/Verlust-Ausnutzungsgrad mit Speichermasse
   - 3 anwaehlbare Berechnungsverfahren (EN 832, SIA 380/1, DIN 18599)
   - **Primaerenergie-Berechnung** (Endenergie via Nutzungsgrad/COP, dann × f_P, minus PV)

2. **TGA-Systeme nach GEG §71** *(neu in Session 3)*
   - 9 Waermeerzeuger (Gas-/Oel-Brennwert, Luft-/Sole-WP, Pellet, Fernwaerme, Elektro, Scheitholz)
   - GEG-Konformitaets-Anzeige (65% erneuerbar)
   - Primaerenergiefaktoren, Nutzungsgrade, Jahresarbeitszahlen
   - 3 Warmwassersysteme (gleicher Erzeuger, Durchlauferhitzer, Solarthermie)
   - Photovoltaik mit Eigenverbrauchsanteil

3. **11 Verordnungs-Presets** (WSchV 1977 bis Passivhaus)
   - Alle mit U-Werten, n50, g-Wert, Waermebruecken-Zuschlag
   - Individuell per Schieberegler ueberschreibbar

4. **21 Klimadatensaetze** (15 DWD TRY-Zonen + Wuerzburg, 3x Schweiz, 5 globale Klimazonen) *(erweitert in Session 3 + 4)*
   - Monatliche Temperatur + Solarstrahlung (5 Orientierungen)
   - **Klickbare TRY-Regionenkarte** (Originalgrafik nach DIN V 18599) mit 15 Hotspots
   - **Klickbare Weltkarte der thermischen Klimazonen** mit Pixel-Farberkennung
   - TRY-Zuordnung nach DIN V 18599

5. **7-Tab-Navigation** *(neu in Session 3, vorher 3-Panel-Sidebar)*
   - Klima / Standort
   - Geometrie (mit isometrischer 3D-Ansicht)
   - Innenraumrandbedingungen
   - Fenster
   - Opake Flaechen
   - TGA (Technische Gebaeudeausruestung)
   - Ergebnisse

6. **Isometrische 3D-Gebaeudeansicht** *(neu in Session 3)*
   - SVG mit editierbaren Masseingaben direkt am Gebaeude
   - **4 Dachformen**: Satteldach, Walmdach, Flachdach, Pultdach (mit Neigungsregler)
   - **Kellergeschoss** mit beheizt/unbeheizt-Schraffur
   - Nordpfeil als isometrische Ellipse auf Grundebene
   - **A/V-Verhaeltnis-Thermometer** mit Referenzkoerper-Markern (Kugel, Wuerfel)
   - Abgeleitete Groessen: BGF, A_N, V_e, A_E, Fassadenflaechen

7. **Ergebnisseite mit 6 Kennzahlen** *(erweitert in Session 3)*
   - Heizwaermebedarf, Kuehlenergiebedarf, Primaerenergie, Endenergie, Energieklasse, HT'-Wert
   - PV-Ertrag und -Gutschrift
   - 4 Diagramme: Monatsbilanz, Sankey, Energieausweis, Gebaeudeansicht

8. **2D-Gebaeudevisualisierung** (SVG)
   - Winter/Sommer-Modus
   - Waermestrom-Pfeile proportional zu Verlusten/Gewinnen

9. **Grundlagen-Infosystem**
   - Markdown + LaTeX-Formeln, Deutsch + Englisch

10. **Zweisprachig** (Deutsch + Englisch)
    - ~190 Uebersetzungs-Keys je Sprache
    - Umschaltbar per Toggle im Header

11. **ToDo-Tracking** *(Session 3)*
    - ToDo.txt mit priorisierter Feature-Liste
    - 8 von 15 Klima-/Geometrie-Punkte abgehakt

12. **Globale Klimazonen** *(neu in Session 4)*
    - 5 thermische Zonen: Polar, Subpolar, Gemaessigt, Subtropen, Tropen
    - Auswahl per Klick auf die Weltkarte (RGB-Abgleich im Offscreen-Canvas) oder Legende
    - Zeigt Studierenden den Umschlag von heizdominiert zu kuehldominiert

---

## Codeentwicklung ueber Zeit / Code Growth Over Time

```
Zeilen (src/*.ts + *.tsx)
  |
5500 ─────────────────────────────────────────────────── 5.419 ●
  |                                                          /
5000 ─────────────────────────────────────────── 5.096 ●────
  |                                                   /
4500 ─                                               /
  |                                                 /
4000 ─                                             /
  |                                               /
3500 ─────────── 3.451 ●───────────●─────────────●
  |                   /             (keine Code-
3000 ─               /              aenderungen)
  |                 /
2500 ─             /
  |               /
2000 ─           /
  |             /
1500 ─         /
  |           /
1000 ─       /
  |         /
 500 ─     /
  |       /
    0 ●──/──────────────────────────────────────────────────
      Jun 24    Jul 15    Aug 03    Aug 04
      S1:160W   S2:90W    S3:180W   S4:40W
      3 Prompts 2 Prompts 6 Prompts 1 Prompt

S = Session, W = Woerter Benutzereingabe
```

---

## Hinweise fuer Studierende / Notes for Students

- Der **Grossteil des Codes** (3.451 Zeilen) wurde in einer einzigen Session mit nur 3 Prompts generiert
- Die **Planungsphase** (Rueckfragen, Architektur, Recherche) war entscheidend fuer die Qualitaet
- **Prompt-Qualitaet > Prompt-Quantitaet**: Ein gut formulierter Prompt mit klaren Anforderungen erzeugt besseren Code als viele kleine Nachfragen
- Die KI nutzte **parallele Agenten** fuer Recherche und Code-Generierung (z.B. IsometricBuilding.tsx parallel zum Hauptfluss)
- **Fachliches Wissen bleibt entscheidend**: Die KI kann Code generieren, aber die bauphysikalischen Anforderungen (GEG-Konformitaet, Primaerenergiefaktoren, Berechnungsverfahren) und die Plausibilitaetspruefung der Ergebnisse erfordern Fachwissen
- **Iteratives Vorgehen**: Session 3 zeigt, wie ein einzelner Prompt (~80 Woerter) eine komplette Umstrukturierung ausloesen kann - von 3-Panel-Sidebar zu 7-Tab-Layout inklusive neuer Features (TGA, Isometrie, Primaerenergie)
- **Prompt #7 war der produktivste**: ~80 Woerter fuehrten zu ~1.300 Zeilen neuem Code in 9 Dateien plus 7 modifizierten Dateien
- **Kontinuitaet ueber Sessions**: Die KI kann nach 19 Tagen Pause nahtlos weiterarbeiten, weil der Code selbstdokumentierend ist
- **ToDo-Listen als Steuerung**: Eine einfache ToDo.txt reicht als Prompt, um mehrere Features gleichzeitig abzuarbeiten (Prompt #10: ~20 Woerter fuehrten zu 7 erledigten Punkten)
- **Vorhandene Grafiken statt Nachbau**: In Session 3 wurde die Deutschlandkarte als SVG nachgezeichnet - ungenau und aufwendig. In Session 4 reichte der Hinweis auf zwei vorhandene Bilddateien, um beide Karten korrekt einzubinden. Die Hotspot-Positionen wurden nicht geschaetzt, sondern per Farbanalyse aus der Grafik ausgelesen.
- **Neue Daten decken alte Fehler auf**: Erst die Tropen-Klimadaten brachten einen seit Session 1 vorhandenen NaN-Fehler im Ausnutzungsgrad ans Licht - mit deutschen Klimadaten konnte der Grenzfall (Monatsmittel dauerhaft ueber Solltemperatur) nie auftreten. Wer den Parameterraum erweitert, sollte die Randbereiche pruefen.
