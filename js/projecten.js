const L = "afbeeldingen/projecten/logos/";

window.PROJECTEN = [
  {
    id: "nxtwave",
    titel: "Logo 'NXTwave'",
    groep: "Persoonlijk",
    vak: "Persoonlijk project voor mijn neef",
    rol: "Designer",
    skills: ["Illustrator", "Logo"],
    kort: "Een logo voor NXTwave, waarmee je DJ's en performers boekt.",
    tekst: [
      "Mijn neef startte NXTwave: een boekingsplatform voor DJ's en performers. Ik ontwierp het logo, met een golf die door de letters N, X en T loopt.",
      "Het logo bestaat in zwart en in wit, zodat het werkt op flyers, sociale media en donkere podiumbeelden."
    ],
    tegel: { type: "logo", bg: "#111418", logo: L + "nxt-wit.png", ondertitel: "DJ & performer booking" },
    links: [{ label: "@nxtwavebe", url: "https://www.instagram.com/nxtwavebe/" }]
  },
  {
    id: "bar-puur",
    titel: "Logo 'Bar Puur' / 'Chalet Puur'",
    groep: "Persoonlijk",
    vak: "Persoonlijk project voor mijn neef",
    rol: "Designer",
    skills: ["Photoshop", "Illustrator", "Precisie"],
    kort: "Eén zaak, twee seizoenen: Bar Puur in de zomer, Chalet Puur in de winter.",
    tekst: [
      "Mijn neef heeft een zomerbar en crèmerie bij het Kasteel van Meerlaer in Laakdal. Voor Bar Puur tekende ik een logo met de toren van het kasteel in de letters. Ik liet me inspireren door andere barlogo's, zoals dat van 'Bar Looi'.",
    ],
    tegel: {
      type: "stapel",
      voor: { bg: "#f6ecd9", logo: L + "barpuur-goud.png" },
      achter: {
        bg: "#eef4f8", logo: L + "chalet-rood.png",
        info: {
          titel: "Chalet Puur",
          seizoen: "winter",
          tekst: [
            "Als de zomer voorbij is, wordt Bar Puur Chalet Puur: de winterbar van dezelfde zaak.",
            "Dezelfde letters kregen sneeuw op hun kop, en de toren van het kasteel werd een chaletje."
          ],
          link: { label: "@chaletpuur", url: "https://www.instagram.com/chaletpuur/" }
        }
      }
    },
    foto: { src: "afbeeldingen/projecten/04-bar-puur.jpg", label: "In gebruik: het spandoek aan de straat" },
    links: [{ label: "@barpuur", url: "https://www.instagram.com/barpuur/" }]
  },
  {
    id: "monolith",
    titel: "Social media post 'Monolith'",
    groep: "School",
    vak: "Graphic Skills 2",
    rol: "Designer",
    skills: ["Illustrator", "Photoshop", "AI"],
    kort: "Een post voor een fictief premium mineraalwater in drie smaken.",
    tekst: [
      "Voor Graphic Skills 2 ontwierp ik een social media post voor Monolith: een fictief premium mineraalwater, gegenereerd met AI, in drie smaken: Granite Lime, Slate Berry en Marble Peach.",
      "Elke smaak kreeg een eigen kleur en kristal. Afgewerkt in Illustrator en Photoshop."
    ],
    tegel: { type: "monolith" },
    foto: { src: "afbeeldingen/projecten/03-monolith.jpg", label: "De volledige post" }
  },
  {
    id: "fuelo",
    titel: "Dashboard 'Fuelo'",
    groep: "School",
    vak: "UI Design 2",
    rol: "UI-designer",
    skills: ["Figma", "UI-design", "UI kit"],
    kort: "Een dashboard voor personal trainers in fitness en wellness.",
    tekst: [
      "Voor UI Design 2 ontwierp ik Fuelo, een dashboard voor fitness en wellness. Een personal trainer ziet er in één oogopslag de afspraken van vandaag, de actieve klanten en de geplande trainingen.",
      "Ik maakte er een UI kit voor in Figma, met kleuren, typografie, knoppen en kaarten die overal terugkomen."
    ],
    tegel: { type: "scherm", src: "afbeeldingen/projecten/fuelo.jpg" },
    foto: { src: "afbeeldingen/projecten/fuelo.jpg", label: "Het dashboard", scherm: true }
  }
];
