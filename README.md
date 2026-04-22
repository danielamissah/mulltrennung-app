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
