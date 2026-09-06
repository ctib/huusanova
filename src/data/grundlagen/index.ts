export interface GrundlagenTopic {
  id: string
  titleDe: string
  titleEn: string
  contentDe: string
  contentEn: string
}

export const grundlagenTopics: GrundlagenTopic[] = [
  {
    id: 'waermeuebertragung',
    titleDe: 'Wärmeübertragung',
    titleEn: 'Heat Transfer',
    contentDe: `## Wärmeübertragung

Wärme wird auf drei Arten übertragen:

### Wärmeleitung (Konduktion)
Wärmeübertragung durch direkten Kontakt zwischen Molekülen. Der Wärmestrom ist proportional zum Temperaturgradienten und der Wärmeleitfähigkeit $\\lambda$ des Materials:

$$\\dot{Q} = \\lambda \\cdot A \\cdot \\frac{\\Delta T}{d}$$

- $\\lambda$: Wärmeleitfähigkeit in W/(m·K)
- $A$: Fläche in m²
- $\\Delta T$: Temperaturdifferenz in K
- $d$: Schichtdicke in m

### Konvektion
Wärmeübertragung durch Strömung eines Fluids (Luft, Wasser). An Bauteiloberflächen bestimmt der Wärmeübergangskoeffizient $h$ den Wärmestrom:

$$\\dot{Q} = h \\cdot A \\cdot \\Delta T$$

Typische Werte: innen $h_i = 7{,}7$ W/(m²K), außen $h_e = 25$ W/(m²K).

### Wärmestrahlung
Jeder Körper mit Temperatur > 0 K strahlt elektromagnetische Wellen ab. Gebäuderelevant:
- **Kurzwellige Solarstrahlung**: durch Fenster in das Gebäude
- **Langwellige Wärmestrahlung**: Abstrahlung von Oberflächen`,
    contentEn: `## Heat Transfer

Heat is transferred in three ways:

### Conduction
Heat transfer through direct molecular contact. The heat flow is proportional to the temperature gradient and the thermal conductivity $\\lambda$:

$$\\dot{Q} = \\lambda \\cdot A \\cdot \\frac{\\Delta T}{d}$$

- $\\lambda$: Thermal conductivity in W/(m·K)
- $A$: Area in m²
- $\\Delta T$: Temperature difference in K
- $d$: Layer thickness in m

### Convection
Heat transfer through fluid movement (air, water). At building surfaces, the heat transfer coefficient $h$ determines the heat flow:

$$\\dot{Q} = h \\cdot A \\cdot \\Delta T$$

Typical values: interior $h_i = 7.7$ W/(m²K), exterior $h_e = 25$ W/(m²K).

### Radiation
Every body with temperature > 0 K emits electromagnetic waves. Building-relevant:
- **Shortwave solar radiation**: through windows into the building
- **Longwave thermal radiation**: emission from surfaces`,
  },
  {
    id: 'u-wert',
    titleDe: 'U-Wert',
    titleEn: 'U-Value',
    contentDe: `## U-Wert (Wärmedurchgangskoeffizient)

Der U-Wert beschreibt, wie viel Wärme pro Zeiteinheit durch 1 m² eines Bauteils fließt, wenn die Temperaturdifferenz 1 K beträgt. Einheit: **W/(m²K)**.

$$U = \\frac{1}{R_{si} + \\sum \\frac{d_i}{\\lambda_i} + R_{se}}$$

- $R_{si}$: Innerer Wärmeübergangswiderstand (0,13 m²K/W für Wände)
- $R_{se}$: Äußerer Wärmeübergangswiderstand (0,04 m²K/W)
- $d_i$: Schichtdicke der i-ten Schicht
- $\\lambda_i$: Wärmeleitfähigkeit der i-ten Schicht

### Typische U-Werte

| Bauteil | Altbau | EnEV 2014 | Passivhaus |
|---------|--------|-----------|------------|
| Außenwand | 1,5 | 0,28 | 0,15 |
| Dach | 0,8 | 0,20 | 0,15 |
| Boden | 1,0 | 0,35 | 0,15 |
| Fenster | 3,0 | 1,30 | 0,80 |

**Je niedriger der U-Wert, desto besser die Wärmedämmung.**`,
    contentEn: `## U-Value (Thermal Transmittance)

The U-value describes how much heat flows through 1 m² of a building component per unit time when the temperature difference is 1 K. Unit: **W/(m²K)**.

$$U = \\frac{1}{R_{si} + \\sum \\frac{d_i}{\\lambda_i} + R_{se}}$$

- $R_{si}$: Interior surface resistance (0.13 m²K/W for walls)
- $R_{se}$: Exterior surface resistance (0.04 m²K/W)
- $d_i$: Thickness of the i-th layer
- $\\lambda_i$: Thermal conductivity of the i-th layer

### Typical U-Values

| Component | Old building | EnEV 2014 | Passive House |
|-----------|-------------|-----------|---------------|
| External wall | 1.5 | 0.28 | 0.15 |
| Roof | 0.8 | 0.20 | 0.15 |
| Floor | 1.0 | 0.35 | 0.15 |
| Window | 3.0 | 1.30 | 0.80 |

**The lower the U-value, the better the thermal insulation.**`,
  },
  {
    id: 'g-wert',
    titleDe: 'g-Wert',
    titleEn: 'g-Value',
    contentDe: `## g-Wert (Gesamtenergiedurchlassgrad)

Der g-Wert gibt an, welcher Anteil der auf die Verglasung treffenden Solarstrahlung als Wärme in den Raum gelangt. Er setzt sich zusammen aus:

1. **Direkte Transmission** ($\\tau$): Strahlung, die direkt durch das Glas geht
2. **Sekundäre Wärmeabgabe** ($q_i$): Vom Glas absorbierte und nach innen abgegebene Wärme

$$g = \\tau + q_i$$

### Typische g-Werte

| Verglasungstyp | g-Wert |
|---------------|--------|
| Einfachglas | 0,85 |
| Zweifach-Wärmeschutzglas | 0,60 |
| Dreifach-Wärmeschutzglas | 0,50 |
| Sonnenschutzglas | 0,25-0,40 |

**Hoher g-Wert** → mehr solare Gewinne (gut im Winter, schlecht im Sommer)
**Niedriger g-Wert** → weniger solare Gewinne (weniger Überhitzung im Sommer)`,
    contentEn: `## g-Value (Total Solar Energy Transmittance)

The g-value indicates what fraction of the solar radiation hitting the glazing enters the room as heat. It consists of:

1. **Direct transmission** ($\\tau$): Radiation passing directly through the glass
2. **Secondary heat emission** ($q_i$): Heat absorbed by the glass and emitted inward

$$g = \\tau + q_i$$

### Typical g-Values

| Glazing type | g-Value |
|-------------|---------|
| Single glass | 0.85 |
| Double low-e glass | 0.60 |
| Triple low-e glass | 0.50 |
| Solar control glass | 0.25-0.40 |

**High g-value** → more solar gains (good in winter, bad in summer)
**Low g-value** → fewer solar gains (less overheating in summer)`,
  },
  {
    id: 'waermebruecken',
    titleDe: 'Wärmebrücken',
    titleEn: 'Thermal Bridges',
    contentDe: `## Wärmebrücken

Wärmebrücken sind Bereiche in der Gebäudehülle, durch die mehr Wärme fließt als durch die angrenzenden Bauteile. Sie entstehen durch:

- **Geometrische Wärmebrücken**: Ecken, Kanten (Außenoberfläche > Innenoberfläche)
- **Konstruktive Wärmebrücken**: Durchdringungen der Dämmebene (Balkonplatten, Ringanker)
- **Materialbedingte Wärmebrücken**: Materialwechsel im Bauteil

### Wärmebrückenzuschlag $\\Delta U_{WB}$

Der pauschale Zuschlag wird auf den U-Wert aller Hüllflächen addiert:

| Ausführung | $\\Delta U_{WB}$ |
|------------|-----------------|
| Ohne Nachweis | 0,10 W/(m²K) |
| Pauschal nach EnEV | 0,05 W/(m²K) |
| Detailnachweis | ≈ 0,01-0,03 W/(m²K) |
| Passivhaus-Niveau | ≤ 0,01 W/(m²K) |`,
    contentEn: `## Thermal Bridges

Thermal bridges are areas in the building envelope where more heat flows than through adjacent components. They occur due to:

- **Geometric thermal bridges**: Corners, edges (exterior surface > interior surface)
- **Structural thermal bridges**: Penetrations of the insulation layer (balcony slabs, ring beams)
- **Material thermal bridges**: Material changes within a component

### Thermal Bridge Supplement $\\Delta U_{WB}$

The simplified supplement is added to the U-value of all envelope surfaces:

| Execution | $\\Delta U_{WB}$ |
|-----------|-----------------|
| Without verification | 0.10 W/(m²K) |
| Simplified per EnEV | 0.05 W/(m²K) |
| Detailed calculation | ≈ 0.01-0.03 W/(m²K) |
| Passive House level | ≤ 0.01 W/(m²K) |`,
  },
  {
    id: 'luftdichtheit',
    titleDe: 'Luftdichtheit',
    titleEn: 'Air Tightness',
    contentDe: `## Luftdichtheit

Die Luftdichtheit eines Gebäudes wird durch den **n₅₀-Wert** beschrieben: der Luftwechsel pro Stunde bei einer Druckdifferenz von 50 Pa (gemessen mit Blower-Door-Test).

$$n_{50} = \\frac{\\dot{V}_{50}}{V}$$

- $\\dot{V}_{50}$: Volumenstrom bei 50 Pa in m³/h
- $V$: Gebäudevolumen in m³

### Typische n₅₀-Werte

| Gebäudetyp | n₅₀ |
|-----------|------|
| Unsanierter Altbau | 5-10 1/h |
| Neubau nach EnEV | 1,5-3,0 1/h |
| Passivhaus | ≤ 0,6 1/h |

### Einfluss auf Lüftungsverluste

Die natürliche Infiltration durch Undichtheiten verursacht unkontrollierten Luftwechsel und damit Wärmeverluste. Der Infiltrations-Luftwechsel beträgt ca.:

$$n_{inf} \\approx \\frac{n_{50}}{20}$$`,
    contentEn: `## Air Tightness

Building air tightness is described by the **n₅₀ value**: the air change rate per hour at a pressure difference of 50 Pa (measured with a blower door test).

$$n_{50} = \\frac{\\dot{V}_{50}}{V}$$

- $\\dot{V}_{50}$: Volume flow at 50 Pa in m³/h
- $V$: Building volume in m³

### Typical n₅₀ Values

| Building type | n₅₀ |
|-------------|------|
| Unrefurbished old building | 5-10 1/h |
| New building per EnEV | 1.5-3.0 1/h |
| Passive House | ≤ 0.6 1/h |

### Influence on Ventilation Losses

Natural infiltration through leaks causes uncontrolled air exchange and thus heat losses. The infiltration air change rate is approximately:

$$n_{inf} \\approx \\frac{n_{50}}{20}$$`,
  },
  {
    id: 'monatsbilanz',
    titleDe: 'Monatsbilanzverfahren',
    titleEn: 'Monthly Balance Method',
    contentDe: `## Monatsbilanzverfahren (EN 832 / ISO 13790)

Das Monatsbilanzverfahren berechnet den Heizwärmebedarf und Kühlenergiebedarf für jeden Monat separat.

### Heizwärmebedarf

$$Q_h = Q_{Verluste} - \\eta_H \\cdot Q_{Gewinne}$$

Wobei:
- $Q_{Verluste} = Q_T + Q_V$ (Transmissions- + Lüftungsverluste)
- $Q_{Gewinne} = Q_s + Q_i$ (Solare + Interne Gewinne)
- $\\eta_H$: Ausnutzungsgrad der Gewinne

### Ausnutzungsgrad

$$\\eta_H = \\frac{1 - \\gamma^a}{1 - \\gamma^{a+1}}$$

mit $\\gamma = Q_{Gewinne}/Q_{Verluste}$ und $a = 1 + \\tau/15$

$\\tau$ ist die Zeitkonstante des Gebäudes, abhängig von der thermischen Speichermasse.

### Kühlenergiebedarf

$$Q_c = Q_{Gewinne,C} - \\eta_{ls} \\cdot Q_{Verluste,C}$$

Der Verlust-Ausnutzungsgrad $\\eta_{ls}$ gibt an, wie gut die Wärmeverluste zur Kühlung genutzt werden können.`,
    contentEn: `## Monthly Balance Method (EN 832 / ISO 13790)

The monthly balance method calculates heating demand and cooling demand for each month separately.

### Heating Demand

$$Q_h = Q_{losses} - \\eta_H \\cdot Q_{gains}$$

Where:
- $Q_{losses} = Q_T + Q_V$ (Transmission + Ventilation losses)
- $Q_{gains} = Q_s + Q_i$ (Solar + Internal gains)
- $\\eta_H$: Utilization factor for gains

### Utilization Factor

$$\\eta_H = \\frac{1 - \\gamma^a}{1 - \\gamma^{a+1}}$$

with $\\gamma = Q_{gains}/Q_{losses}$ and $a = 1 + \\tau/15$

$\\tau$ is the building time constant, dependent on thermal mass.

### Cooling Demand

$$Q_c = Q_{gains,C} - \\eta_{ls} \\cdot Q_{losses,C}$$

The loss utilization factor $\\eta_{ls}$ indicates how well heat losses can be used for cooling.`,
  },
  {
    id: 'sommerlicher-waermeschutz',
    titleDe: 'Sommerlicher Wärmeschutz',
    titleEn: 'Summer Heat Protection',
    contentDe: `## Sommerlicher Wärmeschutz

Der sommerliche Wärmeschutz verhindert übermäßige Aufheizung im Sommer. Maßnahmen:

### Sonnenschutz (Fc-Faktor)
Der Abminderungsfaktor $F_c$ reduziert die solaren Gewinne:

| Sonnenschutztyp | Fc |
|----------------|-----|
| Ohne Sonnenschutz | 1,00 |
| Innenliegende Jalousie | 0,50-0,75 |
| Außenliegende Jalousie | 0,20-0,30 |
| Außenliegende Markise | 0,15-0,25 |

**Außenliegender Sonnenschutz ist deutlich wirksamer als innenliegender!**

### Nachtlüftung
Erhöhte Lüftung in kühlen Nachtstunden kühlt die Speichermasse ab:

$$\\dot{V}_{Nacht} = n_{Nacht} \\cdot V$$

Typisch: $n_{Nacht} = 2{-}4$ 1/h (durch Fensteröffnung)

### Thermische Speichermasse
Schwere Bauweise (Beton, Mauerwerk) speichert Wärme und dämpft Temperaturspitzen.`,
    contentEn: `## Summer Heat Protection

Summer heat protection prevents excessive heating in summer. Measures:

### Solar Shading (Fc Factor)
The reduction factor $F_c$ reduces solar gains:

| Shading type | Fc |
|-------------|-----|
| No shading | 1.00 |
| Interior blinds | 0.50-0.75 |
| Exterior blinds | 0.20-0.30 |
| Exterior awning | 0.15-0.25 |

**Exterior shading is significantly more effective than interior shading!**

### Night Ventilation
Increased ventilation during cool night hours cools the thermal mass:

$$\\dot{V}_{night} = n_{night} \\cdot V$$

Typical: $n_{night} = 2{-}4$ 1/h (through window opening)

### Thermal Mass
Heavy construction (concrete, masonry) stores heat and dampens temperature peaks.`,
  },
  {
    id: 'speichermasse',
    titleDe: 'Thermische Speichermasse',
    titleEn: 'Thermal Mass',
    contentDe: `## Thermische Speichermasse

Die thermische Speichermasse bestimmt, wie viel Wärmeenergie ein Gebäude aufnehmen kann, bevor sich die Temperatur ändert.

### Zeitkonstante τ

$$\\tau = \\frac{C_m}{H_T + H_V}$$

- $C_m$: Wirksame Wärmekapazität in Wh/K
- $H_T$: Transmissions-Wärmetransferkoeffizient in W/K
- $H_V$: Lüftungs-Wärmetransferkoeffizient in W/K

### Speichermasse-Klassen

| Klasse | $c_m$ spezifisch | Typische Bauweise |
|--------|-----------------|-------------------|
| Leicht | 25 Wh/(m²K) | Holzbau, Trockenbau |
| Mittel | 50 Wh/(m²K) | Mischbauweise |
| Schwer | 80 Wh/(m²K) | Massivbau, Beton |

### Auswirkung
- **Hohe Speichermasse**: Besserer Ausnutzungsgrad, weniger Überhitzung
- **Niedrige Speichermasse**: Schnellere Aufheizung, schnelleres Auskühlen`,
    contentEn: `## Thermal Mass

Thermal mass determines how much heat energy a building can absorb before the temperature changes.

### Time Constant τ

$$\\tau = \\frac{C_m}{H_T + H_V}$$

- $C_m$: Effective heat capacity in Wh/K
- $H_T$: Transmission heat transfer coefficient in W/K
- $H_V$: Ventilation heat transfer coefficient in W/K

### Thermal Mass Classes

| Class | $c_m$ specific | Typical construction |
|-------|---------------|---------------------|
| Light | 25 Wh/(m²K) | Timber frame, drywall |
| Medium | 50 Wh/(m²K) | Mixed construction |
| Heavy | 80 Wh/(m²K) | Solid, concrete |

### Effect
- **High thermal mass**: Better utilization factor, less overheating
- **Low thermal mass**: Faster heating up, faster cooling down`,
  },
  {
    id: 'verordnungen',
    titleDe: 'Verordnungen',
    titleEn: 'Regulations',
    contentDe: `## Regulatorische Entwicklung in Deutschland

### Zeitachse

| Jahr | Verordnung | Wesentliche Anforderung |
|------|-----------|------------------------|
| 1977 | WSchV | Erste Wärmeschutzverordnung |
| 1984 | WSchV | Verschärfung der U-Werte |
| 1995 | WSchV | Einführung des Energiebilanzverfahrens |
| 2002 | EnEV | Integration Heizung + Warmwasser |
| 2007 | EnEV | Energieausweis-Pflicht |
| 2009 | EnEV | Verschärfung um ~30% |
| 2014 | EnEV | Weitere Verschärfung |
| 2016 | EnEV | Verschärfung Primärenergie |
| 2020 | GEG | Zusammenführung EnEG + EnEV + EEWärmeG |
| 2024 | GEG | Verschärfung, 65% EE-Pflicht |

### Trend
Die U-Wert-Anforderungen haben sich seit 1977 um den Faktor 3-5 verschärft. Der Heizwärmebedarf heutiger Neubauten beträgt weniger als ein Drittel des Bestands der 1970er Jahre.`,
    contentEn: `## Regulatory Development in Germany

### Timeline

| Year | Regulation | Key requirement |
|------|-----------|----------------|
| 1977 | WSchV | First thermal protection regulation |
| 1984 | WSchV | Tightened U-values |
| 1995 | WSchV | Introduction of energy balance method |
| 2002 | EnEV | Integration heating + hot water |
| 2007 | EnEV | Energy certificate mandatory |
| 2009 | EnEV | Tightening by ~30% |
| 2014 | EnEV | Further tightening |
| 2016 | EnEV | Primary energy tightening |
| 2020 | GEG | Merger of EnEG + EnEV + EEWärmeG |
| 2024 | GEG | Tightening, 65% RE requirement |

### Trend
U-value requirements have been tightened by a factor of 3-5 since 1977. Heating demand of today's new buildings is less than one-third of 1970s building stock.`,
  },
]
