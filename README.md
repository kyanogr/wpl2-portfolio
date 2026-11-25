# Kyano Grieten Portfolio

## Projectomschrijving

Mijn portfolio toont mijn werk als creatieve vormgever, student Digitale Vormgeving aan PXL.
De site is opgebouwd als een map vol papier en stickers: een cover die openklapt, en daarna vier mappen
(over mij, projecten, wat ik doe en contact) die je doorbladert door te scrollen of op een tabje te klikken.
Er staan persoonlijke projecten (NXTwave, Bar Puur / Chalet Puur) en schoolprojecten (Monolith, Fuelo) in.
Op een aparte pagina staan WPL1 en WPL2.

## Gebruikte technologieën

- HTML
- CSS
- JavaScript
- Adobe Photoshop en Illustrator (voor mijn projecten)
- Figma (voor Fuelo)
- Claude (AI) voor het helpen ontwerpen en programmeren van de site en voor tekstuele inhoud
- Formspree voor het contactformulier

## Externe bronnen / referenties

Ik heb gezocht naar andere portfolios en design-inspiratie, onder andere collage- en stickerportfolio's,
en heb die als moodboard gebruikt voor de stijl, kleuren en animaties.

### Lettertypes

Alle lettertypes komen van Google Fonts en zijn gratis te gebruiken (SIL Open Font License):
Bagel Fat One, Caveat, Courier Prime, DM Sans, Fredoka en Gochi Hand.

### Afbeeldingen & Media

- Profielfoto: eigen foto
- Achtergrond achter mijn foto (zonsondergang met zonnebloemen): zelf gemaakt voor deze site (SVG)
- Projectbeelden: eigen ontwerpen, logo's en schermafbeeldingen
- Stickers, punaises, paperclip, vogeltjes, cassette, vliegtuig en andere decoratie:
  zelf gemaakt voor deze site als SVG-bestanden (ook de favicon, een wereldbol), geen afbeeldingen van een betaalde of andere website
- Logo's van Photoshop, Illustrator, InDesign en Figma: officiële merklogo's van Adobe en Figma,
  alleen gebruikt om te tonen met welke programma's ik werk

### Tools

- WebStorm voor code-editing
- Adobe Photoshop en Illustrator voor beeldbewerking en logo's
- Figma voor ontwerp
- Claude (AI) als hulp bij ontwerp, code en tekst
- Netlify om de site online te zetten

## Structuur

```
portfolio/
├── index.html              ← homepage: cover + vier mappen
├── wpl1-en-wpl2.html       ← WPL1 (leerdoelen, downloads) en WPL2 (case Pokr)
├── projecten/project.html  ← één sjabloon voor elke projectpagina
├── css/                    ← 01-variabelen (kleuren) t.e.m. 06-animaties
├── js/
│   ├── projecten.js        ← alle projecten (tekst, logo's, links)
│   ├── animaties.js        ← cover die openklapt, de mappenkast
│   └── main.js             ← projectkaarten, projectpagina, formulier
├── afbeeldingen/           ← profiel, projecten (logos), stickers, decoratie, tools, favicon
├── documenten/             ← eindreflectie WPL1 (pdf)
└── privacy.txt
```

- Een project toevoegen of aanpassen: `js/projecten.js`
- Kleuren aanpassen: `css/01-variabelen.css`
- Berichten van het contactformulier komen binnen via Formspree (`https://formspree.io/f/xdegyqde`).

## Licentie

Alle rechten voorbehouden. © Kyano Grieten
