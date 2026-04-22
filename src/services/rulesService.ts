import { BinResult, BinType, GlasColor, RulesMap } from '../types';
import { Translations } from '../i18n/translations';

const rulesCache: Record<string, RulesMap> = {};

function loadRules(cityId: string): RulesMap {
  if (rulesCache[cityId]) return rulesCache[cityId];
  const files: Record<string, RulesMap> = {
    berlin:     require('../data/rules/berlin.json').rules,
    hamburg:    require('../data/rules/hamburg.json').rules,
    munich:     require('../data/rules/munich.json').rules,
    frankfurt:  require('../data/rules/frankfurt.json').rules,
    cologne:    require('../data/rules/cologne.json').rules,
    stuttgart:  require('../data/rules/stuttgart.json').rules,
    dusseldorf: require('../data/rules/dusseldorf.json').rules,
    dortmund:   require('../data/rules/dortmund.json').rules,
    leipzig:    require('../data/rules/leipzig.json').rules,
    bremen:     require('../data/rules/bremen.json').rules,
    dresden:    require('../data/rules/dresden.json').rules,
    nuremberg:  require('../data/rules/nuremberg.json').rules,
    hanover:    require('../data/rules/hanover.json').rules,
    duisburg:   require('../data/rules/duisburg.json').rules,
    bochum:     require('../data/rules/bochum.json').rules,
  };
  const rules = files[cityId] ?? files['berlin'];
  rulesCache[cityId] = rules;
  return rules;
}

const BIN_COLORS: Record<BinType, string> = {
  gelber_sack: '#F5C518',
  blaue_tonne: '#1A73E8',
  braune_tonne: '#795548',
  restmuell: '#757575',
  glas: '#43A047',
  sondermuell: '#E53935',
  wertstoffhof: '#8E24AA',
};

const BIN_EMOJI: Record<BinType, string> = {
  gelber_sack: '🟡',
  blaue_tonne: '🔵',
  braune_tonne: '🟤',
  restmuell: '⚫',
  glas: '🟢',
  sondermuell: '🔴',
  wertstoffhof: '🟣',
};

function getBinLabel(bin: BinType, glasColor: GlasColor | undefined, t: Translations): string {
  if (bin === 'glas' && glasColor) {
    if (glasColor === 'weiss') return t.glasWeiss;
    if (glasColor === 'braun') return t.glasBraun;
    if (glasColor === 'gruen') return t.glasGruen;
  }
  const map: Record<BinType, keyof Translations> = {
    gelber_sack: 'binGelberSack',
    blaue_tonne: 'binBlaueTonne',
    braune_tonne: 'binBrauneTonne',
    restmuell: 'binRestmuell',
    glas: 'binGlas',
    sondermuell: 'binSondermuell',
    wertstoffhof: 'binWertstoffhof',
  };
  return t[map[bin]] as string;
}

function getTip(material: string, cityId: string, t: Translations): string | undefined {
  const tips = t.tips as Record<string, string>;

  // city-specific tip overrides
  if (material === 'styrofoam') {
    if (cityId === 'hamburg') return tips['styrofoam_hamburg'];
    return tips['styrofoam_berlin'];
  }
  if (material === 'organic' && cityId === 'munich') return tips['organic_munich'];

  return tips[material];
}

export function getBinForMaterial(material: string, cityId: string, t: Translations): BinResult {
  const rules = loadRules(cityId);
  const rule = rules[material] ?? rules['unknown'];

  return {
    bin: rule.bin,
    glasColor: rule.glasColor ?? null,
    label: getBinLabel(rule.bin, rule.glasColor, t),
    color: BIN_COLORS[rule.bin],
    emoji: BIN_EMOJI[rule.bin],
    tip: getTip(material, cityId, t),
  };
}

export function inferMaterialFromProduct(
  packagingType?: string,
  materials?: string[]
): string {
  const p = packagingType?.toLowerCase() ?? '';
  const m = (materials ?? []).map((s) => s.toLowerCase());

  if (p.includes('glass') || m.includes('glass') || m.includes('glas')) {
    if (p.includes('white') || p.includes('weiss') || p.includes('clear')) return 'glass_white';
    if (p.includes('brown') || p.includes('braun')) return 'glass_brown';
    return 'glass_green';
  }
  if (p.includes('cardboard') || p.includes('karton') || m.includes('cardboard')) return 'cardboard';
  if (p.includes('paper') || m.includes('paper') || m.includes('papier')) return 'paper';
  if (p.includes('metal') || p.includes('aluminium') || p.includes('steel') || m.includes('metal')) {
    if (p.includes('can') || p.includes('dose')) return 'metal_can';
    if (p.includes('foil') || p.includes('folie')) return 'metal_foil';
    return 'metal_tin';
  }
  if (p.includes('tetra') || p.includes('composite') || m.includes('composite')) return 'composite';
  if (p.includes('styro') || p.includes('polystyrene') || m.includes('polystyrene')) return 'styrofoam';
  if (
    p.includes('plastic') || p.includes('kunststoff') ||
    m.includes('plastic') || m.includes('pet') ||
    m.includes('hdpe') || m.includes('pp') || m.includes('ps')
  ) {
    if (p.includes('bottle') || p.includes('flasche')) return 'plastic_bottle';
    if (p.includes('bag') || p.includes('film') || p.includes('folie')) return 'plastic_film';
    if (p.includes('tray')) return 'plastic_tray';
    if (p.includes('cup') || p.includes('becher')) return 'plastic_cup';
    if (p.includes('tube')) return 'plastic_tube';
    return 'plastic_bottle';
  }
  if (m.includes('organic') || m.includes('bio') || m.includes('food')) return 'food_waste';
  return 'unknown';
}