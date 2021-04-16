![Picture](/banner.png)

# Schulm\*\*dleJena-Tools ![GitHub manifest version (path)](https://img.shields.io/github/manifest-json/v/Quixelation/SchulmoodleJena-Tools?filename=dist%2Fmanifest.json&style=for-the-badge)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f99d729c78684fa9b13c342dced4a444)](https://app.codacy.com/gh/Quixelation/Schulm-dleJena-Tools?utm_source=github.com&utm_medium=referral&utm_content=Quixelation/Schulm-dleJena-Tools&utm_campaign=Badge_Grade_Settings)
[![DeepScan grade](https://deepscan.io/api/teams/13557/projects/16525/branches/357528/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=13557&pid=16525&bid=357528) [![CodeFactor](https://www.codefactor.io/repository/github/quixelation/schulm-dlejena-tools/badge)](https://www.codefactor.io/repository/github/quixelation/schulm-dlejena-tools)

---

Eine Browser-Erweiterung, welche viele neue und coole Funktionen für das Moodle™ System der Jenaer Schulen bietet.

## Herunterladen

<!-- prettier-ignore -->
 [Chrome<br>(/Chromium Edge)](https://chrome.google.com/webstore/detail/schulmoodlejena-tools/dcpgpghgflflpljbkcjhmidkclbpoiph) | [Mozilla](https://smjt.vercel.app/firefox) | Opera
--- | --- | ---
 ![Chrome Web Store](https://img.shields.io/chrome-web-store/v/dcpgpghgflflpljbkcjhmidkclbpoiph?label=Version&style=flat-square) | ![GitHub release (latest by date)](https://img.shields.io/github/v/release/quixelation/schulmoodlejena-tools?style=flat-square) | ![GitHub milestone](https://img.shields.io/github/milestones/progress-percent/Quixelation/Schulm-dleJena-Tools/2?label=In%20Arbeit%3A&logo=opera&style=flat-square)
 ![Chrome Web Store](https://img.shields.io/chrome-web-store/users/dcpgpghgflflpljbkcjhmidkclbpoiph?label=Nutzer&color=blue&style=flat-square) | ![GitHub release (latest by date)](https://img.shields.io/github/downloads/Quixelation/Schulm-dleJena-Tools/latest/total?color=blue&label=Downloads&style=flat-square)

## Funktionen

- ### Änderungen ansehen

  Anzahl der Änderungen (auf dem Dashboard) auf Knopfdruck sehen

- ### Dashboard-Design

  - **Kürzere Kursnamen**<br>
    Kann Kursnamen wie `Chemie Klasse 7/F Mustermann Angergymnasium` in `Chemie` umwandeln, sodass diese einfacher zu finden sind. Der kürzere Name wird vorher durch den Benutzer bestimmt.

  - **Veränderte Kursbilder**<br>
    Kann das Vorschaubild, welches auf dem Dashboard zu sehen ist, verändern. Der Benutzer kann dies entweder durch ein Emoji oder durch ein Muster mit benutzerdefinierter Farbe ersetzen.

  - **Farbiger Fortschritt**<br>
    Der Kursname auf dem Dashboard verändert auf einer Skala von Rot (0%) bis Grün (100%), je nach Fortschritt in dem Kurs, die Farbe.

- ### Todomanager

  > Der Todomanager bietet eine Todo-Liste, welche immer am linken Bildschirmrand verfügbar ist.

  - **Erstellung neuer Todos**<br>
    Der Benutzer kann Todos erstellen. Diese werden außerhalb von Moodle™, in dem Speicher der Erweiterung gespeichert.

  - **Todo-Kategorien**<br>
    Der Benutzer muss jeder Todo eine der folgenden Kategorien zuordnen:

    - Hausaufgabe

    - Test

    - Videokonferenz

- ### Kursthemen-Manager

  - **Reihenfolge der Themen umkehren**<br>
    Der Benutzer kann die Reihenfolge der Themen in Kursen, welche in dem "Listen-Format" sind, umkehren.

  - **Leere Themen ausblenden**<br>
    Der Benutzer kann leere Themen ausblenden. Hierbei wird darauf geachtet, dass der Titel dem Schema `Thema <ZAHL>` folgt und dass dieses Thema keinen Inhalt hat.

  - **Nicht verfügbare Themen verbergen**<br>
    Moodle™ zeigt Themen, welche "Nicht Verfügbar" sind, trotzdem an. Der Benutzer kann diese nun ausblenden. Diese Funktion blendet alle Themen, welche von Moodle™ die `hidden`-klasse zugeordnet bekommen haben, aus.

- ### Downloads
  **PDF-Dateien** werden nun **automatisch heruntergeladen**, sobald der Benutzer diese auf Moodle™ öffnet.
- ### Go-To-Dashboard

  Es gibt nun mehr Buttons/Links, welche zum Dashboard führen:

  - Ein großer Button/Link in der Navigationsleiste, oben.

  - Ein großer Button/Link im Navigationsbereich, links.

- ### Impressum(-spflicht)
  Die SchulmoodleJena Website erfüllt nun die Impressumspflicht, indem ein Link zum Impressum in dem Footer-Bereich hinzugefügt wird.

## Entwickler

### Getestet mit\:

- **Node** 15.11.0
- **npm** 7.6.1
- **Firefox** 86.0
- **Chrome** 89.0.774.45
- **Windows**

### Erstellen einer exakten Kopie

1.  `npm run install`
2.  `npm run pack`
3.  Datei in `\dist\web-ext-artifacts`

### Testen

1.  `npm run install`
2.  `cd dist`
3.  `web-ext run`

## Versionierung

`<JAHR>.<MONAT>.<TAG>.<Nr?>`
