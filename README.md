# ♻️ Mülltrennung App

> Scan any product barcode to instantly find out which bin it belongs in — built for expats and residents in Germany.

Germany has one of the most complex waste sorting systems in the world: up to 6 different bins, rules that vary by city, and labels that assume you already know the system. This app removes the guesswork.

![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey)
![Built with Expo](https://img.shields.io/badge/built%20with-Expo-000020?logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Features

- **Barcode scanner** — point at any product and get an instant bin recommendation
- **City-aware rules** — rules differ between Berlin, Hamburg, Munich, Frankfurt, and Cologne (e.g. styrofoam goes in different bins depending on the city)
- **English-first** — designed for expats and newcomers; toggle to German at any time
- **Bin guide** — a plain-English reference explaining every bin type in Germany
- **Scan history** — last 50 scans saved locally on device
- **Product images** — pulled from Open Food Facts when available
- **Offline-capable rules engine** — city rules are bundled with the app, no internet needed for lookups
- **Tip system** — contextual tips per item (e.g. "rinse the can", "flatten the box")

---

## Supported Cities

| City | Bundesland |
|------|-----------|
| Berlin | Berlin |
| Hamburg | Hamburg |
| Munich | Bavaria |
| Frankfurt | Hesse |
| Cologne | NRW |

More cities coming soon. Rules are version-controlled JSON files — contributions welcome.

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | React Native (Expo) | Single codebase for iOS and Android |
| Language | TypeScript (strict) | Type safety across the rules engine and UI |
| State | Zustand | Lightweight global state for city, language, history |
| Product data | Open Food Facts API | Open-source product database, 3M+ items |
| i18n | Custom hook + translations file | No external library needed; English and German |
| Navigation | React Navigation (bottom tabs) | Standard tab-based mobile navigation |
| Rules engine | Typed JSON + TypeScript service | City-specific bin rules, offline, version-controlled |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Installation

```bash
git clone https://github.com/danielamissah/mulltrennung-app.git
cd mulltrennung-app
npm install
npx expo start
```

Scan the QR code with Expo Go. The app runs on your phone immediately.

---

## Project Structure
src/
├── components/
│   ├── BinCard.tsx          # Coloured result card with tip
│   ├── CityPicker.tsx       # Horizontal city selector chips
│   └── LanguageToggle.tsx   # EN / DE toggle pill
├── data/
│   └── rules/
│       ├── berlin.json      # Berlin-specific bin rules
│       ├── hamburg.json     # Hamburg-specfic bin rules
│       ├── munich.json      # Munich-specific bin rules
│       ├── frankfurt.json   # Frankfurt-specific bin rules
│       └── cologne.json     # Cologne-specific bin rules
├── i18n/
│   ├── translations.ts      # All UI strings in EN and DE
│   └── useTranslation.ts    # Hook: returns t (translations) + lang
├── screens/
│   ├── ScannerScreen.tsx    # Main barcode scanner
│   ├── GuideScreen.tsx      # Full bin guide for reference
│   └── HistoryScreen.tsx    # Last 50 scans
├── services/
│   ├── productService.ts    # Open Food Facts API calls
│   └── rulesService.ts      # Material inference + bin lookup
├── store/
│   └── useAppStore.ts       # Zustand store (city, language, history)
└── types/
└── index.ts             # Shared TypeScript types

---

## How the Rules Engine Works

Each city has a JSON file mapping material/packaging types to bin assignments. When a barcode is scanned:

1. The barcode is sent to the **Open Food Facts API**
2. Packaging type and material tags are extracted from the response
3. The **material inference function** maps these to a known material key (e.g. `plastic_bottle`, `cardboard`, `glass_green`)
4. The **rules engine** looks up that key in the active city's JSON file
5. The result — bin type, label, colour, emoji, and tip — is displayed

If a product is not found in the database, the app falls back to `unknown`, which maps to general waste (Restmüll) with a note to check the packaging.

---

## Adding a New City

1. Create `src/data/rules/yourcity.json` following the same structure as `berlin.json`
2. Add the city to `CITIES` in `src/store/useAppStore.ts`
3. Add the `require()` entry in `rulesService.ts`
4. Submit a pull request

---

## Data Source

Product data is fetched from [Open Food Facts](https://world.openfoodfacts.org/) — a free, open, collaborative database of food products from around the world. No API key required.

---

## Roadmap

- [ ] Visual search — photograph an item without a barcode
- [ ] Expand to all 400 German Landkreise
- [ ] Bin collection calendar with reminders
- [ ] Recycling centre locator (map)
- [ ] Offline product cache for top 50K products

---

## Contributing

Pull requests are welcome, especially for:
- New city rule files
- Corrections to existing rules
- Translations (Turkish, Arabic, Ukrainian planned)

Please open an issue first for significant changes.

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

*Built as part of a portfolio of apps designed for people living in Germany.*
