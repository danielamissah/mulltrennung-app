export type BinType =
  | 'gelber_sack'
  | 'blaue_tonne'
  | 'braune_tonne'
  | 'restmuell'
  | 'glas'
  | 'sondermuell'
  | 'wertstoffhof';

export type GlasColor = 'weiss' | 'braun' | 'gruen' | null;

export interface BinResult {
  bin: BinType;
  glasColor?: GlasColor;
  label: string;
  color: string;
  emoji: string;
  tip?: string;
}

export interface Product {
  barcode: string;
  name: string;
  brand?: string;
  packaging_type?: string;
  materials: string[];
  image_url?: string;
}

export interface ScanResult {
  product: Product | null;
  binResult: BinResult;
  city: string;
  scannedAt: Date;
}

export interface City {
  id: string;
  name: string;
  bundesland: string;
}

export interface RulesMap {
  [materialOrPackaging: string]: {
    bin: BinType;
    glasColor?: GlasColor;
    tip?: string;
  };
}