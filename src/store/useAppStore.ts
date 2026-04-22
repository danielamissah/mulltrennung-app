import { create } from 'zustand';
import { City, ScanResult } from '../types';
import { Language } from '../i18n/translations';

export const CITIES: City[] = [
  { id: 'berlin', name: 'Berlin', bundesland: 'Berlin' },
  { id: 'hamburg', name: 'Hamburg', bundesland: 'Hamburg' },
  { id: 'munich', name: 'München', bundesland: 'Bayern' },
  { id: 'frankfurt', name: 'Frankfurt', bundesland: 'Hessen' },
  { id: 'cologne', name: 'Köln', bundesland: 'NRW' },
  { id: 'stuttgart', name: 'Stuttgart', bundesland: 'Baden-Württemberg' },
  { id: 'dusseldorf', name: 'Düsseldorf', bundesland: 'NRW' },
  { id: 'dortmund', name: 'Dortmund', bundesland: 'NRW' },
  { id: 'leipzig', name: 'Leipzig', bundesland: 'Sachsen' },
  { id: 'bremen', name: 'Bremen', bundesland: 'Bremen' },
  { id: 'dresden', name: 'Dresden', bundesland: 'Sachsen' },
  { id: 'nuremberg', name: 'Nürnberg', bundesland: 'Bayern' },
  { id: 'hanover', name: 'Hannover', bundesland: 'Niedersachsen' },
  { id: 'duisburg', name: 'Duisburg', bundesland: 'NRW' },
  { id: 'bochum', name: 'Bochum', bundesland: 'NRW' },
];

interface AppState {
  selectedCity: City;
  scanHistory: ScanResult[];
  language: Language;
  setCity: (city: City) => void;
  addScan: (result: ScanResult) => void;
  clearHistory: () => void;
  setLanguage: (lang: Language) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedCity: CITIES[0],
  scanHistory: [],
  language: 'en',
  setCity: (city) => set({ selectedCity: city }),
  addScan: (result) =>
    set((state) => ({
      scanHistory: [result, ...state.scanHistory].slice(0, 50),
    })),
  clearHistory: () => set({ scanHistory: [] }),
  setLanguage: (language) => set({ language }),
}));