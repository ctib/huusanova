# HUUSanova in Moodle bereitstellen

Kurzanleitung fuer die Verteilung an Studierende. Zwei Wege, der erste ist der
empfohlene.

---

## Vorbereitung (beide Wege)

```bash
npm install
npm run build
```

Ergebnis: der Ordner `dist/`. Das ist die komplette App - statisches HTML, JS,
CSS, Bilder und Schriften. Kein Server, keine Datenbank, keine Zugangsdaten.
Der Inhalt von `dist/` ist alles, was verteilt wird.

> `dist/index.html` per Doppelklick zu oeffnen funktioniert **nicht**. Die App
> braucht einen Webserver (`file://` blockiert das Nachladen der Module).

---

## Weg 1: Moodle-Link auf GitHub Pages (eingerichtet, empfohlen)

Die App ist bereits veroeffentlicht:

**https://ctib.github.io/huusanova/**

Das Deployment laeuft automatisch: bei jedem Push auf `main` baut GitHub
Actions die App, laesst die Tests laufen und aktualisiert die Seite
(`.github/workflows/deploy.yml`). Es ist kein manueller Upload noetig.

### In Moodle verlinken

Kurs -> *Material anlegen* -> **Link/URL**

- **Name**: HUUSanova - Gebaeudeenergiebilanz
- **Externe URL**: `https://ctib.github.io/huusanova/`
- **Darstellung**: *Neues Fenster* (die App braucht Platz, in einem
  eingebetteten Frame wird es eng)

### Alternative Hoster

Falls die Seite spaeter auf den Hochschul-Webspace umziehen soll: `dist/`
per SFTP hochladen, ein Unterverzeichnis ist ausdruecklich in Ordnung. Die
App verwendet relative Pfade und laeuft auch unter
`hs-beispiel.de/kurs/huusanova/`.

### Was die Studierenden tun

Auf den Link klicken. Fertig - keine Installation, kein Login, laeuft im
Browser auf Laptop und Tablet.

### Warum dieser Weg

Nur so funktioniert das Teilen von Konfigurationen sinnvoll: Studierende
koennen ueber den **Link-Button** oben rechts eine URL zu ihrer aktuellen
Einstellung kopieren und in ein Forum oder eine Mail packen. Wer die oeffnet,
sieht exakt dasselbe Gebaeude. Das geht nur bei einer stabilen, oeffentlich
erreichbaren Adresse.

Vorbereitete Aufgaben lassen sich damit direkt als Link in Moodle stellen:
Konfiguration einstellen, Link kopieren, als Aufgabenstellung einfuegen.

---

## Weg 2: Alles in Moodle, ohne externen Server

Falls kein Webspace zur Verfuegung steht, kann Moodle die App selbst
ausliefern - als **IMS-Content-Package**. Moodle entpackt das ZIP und behaelt
dabei die relativen Pfade bei, was eine normale Datei- oder Verzeichnis-
Ressource nicht zuverlaessig tut.

### 1. Manifest anlegen

Eine Datei `imsmanifest.xml` **in** den `dist/`-Ordner legen, neben
`index.html`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="huusanova"
          xmlns="http://www.imsglobal.org/xsd/imscp_v1p1"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.imsglobal.org/xsd/imscp_v1p1 imscp_v1p1.xsd">
  <organizations default="huusanova-org">
    <organization identifier="huusanova-org">
      <title>HUUSanova</title>
      <item identifier="item-1" identifierref="res-1">
        <title>HUUSanova - Gebaeudeenergiebilanz</title>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="res-1" type="webcontent" href="index.html">
      <file href="index.html"/>
    </resource>
  </resources>
</manifest>
```

### 2. ZIP packen

Den **Inhalt** von `dist/` zippen, nicht den Ordner selbst -
`imsmanifest.xml` und `index.html` muessen auf der obersten Ebene des ZIP
liegen.

### 3. In Moodle einbinden

Kurs -> *Material anlegen* -> **IMS-Content-Package** -> ZIP hochladen.

### Einschraenkungen

- **Vorher testen.** Ob das durchgeht, haengt von der Moodle-Version und den
  Servereinstellungen ab (manche Installationen filtern JavaScript aus
  hochgeladenen Paketen oder erlauben den Ressourcentyp gar nicht erst).
  Einmal in einem Testkurs hochladen und oeffnen, bevor es in den echten Kurs
  geht.
- **Der Link-Button hilft hier wenig.** Moodle liefert die Dateien ueber
  interne, teils sitzungsgebundene Adressen aus. Eine kopierte URL laesst
  sich dann nicht zuverlaessig weitergeben. Wer das Teilen von
  Konfigurationen im Kurs nutzen moechte, sollte Weg 1 nehmen.
- **Bei jeder Aktualisierung** muss das ZIP neu gebaut und ersetzt werden,
  waehrend bei Weg 1 ein Upload genuegt und der Link gleich bleibt.

---

## Aktualisieren

Weg 1: `git push` auf `main` - GitHub Actions baut und veroeffentlicht
automatisch, der Moodle-Link bleibt unveraendert. Der Fortschritt steht
unter https://github.com/ctib/huusanova/actions. Schlagen die Tests fehl,
wird **nicht** deployt und die alte Version bleibt online.

Weg 2: `npm run build`, neues ZIP schnueren und das IMS-Paket in Moodle
ersetzen.

Studierende sollten nach einer Aktualisierung einmal hart neu laden
(Strg+F5), falls der Browser noch die alte Version im Cache hat.

---

## Konfigurationen teilen

Der **Link-Button** oben rechts kopiert eine URL, die den kompletten
Gebaeudezustand enthaelt - Geometrie, U-Werte, Fenster, TGA, Standort und
Rechenverfahren. Beispiel:

```
https://ctib.github.io/huusanova/#geometry.length=12&envelope.wall=0.2&m=SIA380
```

Nur die vom Standard abweichenden Werte stehen drin, deshalb bleiben die
Links kurz und lesbar. Ein Reload geht damit auch nicht mehr verloren.

Praktisch fuer die Lehre:

- Aufgabenstellungen als fertig eingestellten Link ausgeben
  ("vergleicht dieses Gebaeude mit WSchV 1977")
- Studierende schicken bei Rueckfragen ihren Link mit, statt zu beschreiben,
  was sie eingestellt haben
- Varianten nebeneinander in zwei Browser-Tabs vergleichen

Der Kopier-Button braucht HTTPS oder localhost (Browser-Vorgabe). Auf einer
reinen HTTP-Seite greift ein Fallback; zur Not tut es immer die Adresszeile.
