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
- **City-aware rules** — rules differ between Berlin, Hamburg, Munich, Frankfurt, and Cologne
- **English-first** — designed for expats and newcomers; toggle to German at any time
- **Bin guide** — plain-English reference explaining every bin type in Germany
- **Scan history** — last 50 scans saved locally on device
- **Product images** — pulled from Open Food Facts when available
- **Offline-capable** — city rules bundled with app, no internet needed for lookups
- **Tip system** — contextual tips per item (e.g. "rinse the can", "flatten the box")

---

## Supported Cities

| City | Bundesland |
|------|------------|
| Berlin | Berlin |
| Hamburg | Hamburg |
| Munich | Bavaria |
| Frankfurt | Hesse |
| Cologne | NRW |

*More cities coming soon. Rules are version-controlled JSON files — contributions welcome.*

---

## Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| Framework | React Native (Expo) | Single codebase for iOS/Android |
| Language | TypeScript (strict) | Type safety across rules/UI |
| State | Zustand | Lightweight global state |
| Product data | Open Food Facts API | 3M+ item open database |
| i18n | Custom hook | English + German, no deps |
| Navigation | React Navigation | Standard mobile tabs |
| Rules | Typed JSON + TS service | Offline, version-controlled |

---

## Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g @expo/cli`
- Expo Go app: [iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Installation
```bash
git clone https://github.com/danielamissah/mulltrennung-app.git
cd mulltrennung-app
npm install
npx expo start
```

---

## Project Structure

**src/**
- **components/**
  - `BinCard.tsx` — Coloured result card with tip
  - `CityPicker.tsx` — Horizontal city selector chips
  - `LanguageToggle.tsx` — EN/DE toggle pill
- **data/rules/**
  - `berlin.json` — Berlin-specific bin rules
  - `hamburg.json` — Hamburg-specific bin rules
  - `munich.json` — Munich-specific bin rules
  - `frankfurt.json` — Frankfurt-specific bin rules
  - `cologne.json` — Cologne-specific bin rules
- **i18n/**
  - `translations.ts` — All UI strings in EN/DE
  - `useTranslation.ts` — Hook: returns t() + lang
- **screens/**
  - `ScannerScreen.tsx` — Main barcode scanner
  - `GuideScreen.tsx` — Full bin guide reference
  - `HistoryScreen.tsx` — Last 50 scans
- **services/**
  - `productService.ts` — Open Food Facts API calls
  - `rulesService.ts` — Material inference + bin lookup
- **store/**
  - `useAppStore.ts` — Zustand store (city, lang, history)
- **types/**
  - `index.ts` — Shared TypeScript types

---

## Rules Engine

**Flow**: Barcode → Open Food Facts API → Material inference → City rules → Bin result

1. Send barcode to Open Food Facts API
2. Extract packaging/material tags
3. Map to material key (`plastic_bottle`, `cardboard`, etc.)
4. Lookup in active city's JSON file
5. Display bin type, color, emoji, tip

**Fallback**: `unknown` → Restmüll + "check packaging" note

---

## Add New City

1. Create `src/data/rules/yourcity.json` (copy `berlin.json`)
2. Add city to `CITIES` array in `useAppStore.ts`
3. Add `require()` in `rulesService.ts`
4. Submit PR

---

## Data Source

[Open Food Facts](https://world.openfoodfacts.org/) — free, open product database. No API key needed.

---

## Roadmap

- [ ] Visual search (photo → bin)
- [ ] All 400 German Landkreise
- [ ] Bin collection calendar
- [ ] Recycling centre map
- [ ] Offline product cache

---

## Contributing

PRs welcome for:
- New city rules
- Rule corrections
- Translations (Turkish, Arabic, Ukrainian)

Open issue first for big changes.

---

## License

MIT — see [LICENSE](LICENSE).

---
