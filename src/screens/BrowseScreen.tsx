import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, FlatList,
} from 'react-native';
import { MANUAL_CATEGORIES, ManualCategory, ManualItem } from '../data/manualCategories';
import { getBinForMaterial } from '../services/rulesService';
import { useAppStore } from '../store/useAppStore';
import { useTranslation } from '../i18n/useTranslation';
import { BinCard } from '../components/BinCard';
import { LanguageToggle } from '../components/LanguageToggle';
import { BinResult } from '../types';
import { Translations } from '../i18n/translations';

type View = 'categories' | 'items' | 'result';

export function BrowseScreen() {
  const { selectedCity } = useAppStore();
  const { t } = useTranslation();
  const [view, setView] = useState<View>('categories');
  const [activeCategory, setActiveCategory] = useState<ManualCategory | null>(null);
  const [activeItem, setActiveItem] = useState<ManualItem | null>(null);
  const [binResult, setBinResult] = useState<BinResult | null>(null);

  function selectCategory(cat: ManualCategory) {
    setActiveCategory(cat);
    setView('items');
  }

  function selectItem(item: ManualItem) {
    setActiveItem(item);
    const result = getBinForMaterial(item.material, selectedCity.id, t);
    setBinResult(result);
    setView('result');
  }

  function goBack() {
    if (view === 'result') { setView('items'); setBinResult(null); setActiveItem(null); }
    else if (view === 'items') { setView('categories'); setActiveCategory(null); }
  }

  function reset() {
    setView('categories');
    setActiveCategory(null);
    setActiveItem(null);
    setBinResult(null);
  }

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {view !== 'categories' && (
            <TouchableOpacity onPress={goBack} style={styles.backBtn}>
              <Text style={styles.backArrow}>←</Text>
              <Text style={styles.backText}>{t.manualBack}</Text>
            </TouchableOpacity>
          )}
          {view === 'categories' && (
            <View>
              <Text style={styles.title}>{t.manualTitle}</Text>
              <Text style={styles.subtitle}>{t.manualSubtitle}</Text>
            </View>
          )}
          {view === 'items' && activeCategory && (
            <Text style={styles.title}>
              {activeCategory.icon} {t[activeCategory.labelKey as keyof Translations] as string}
            </Text>
          )}
          {view === 'result' && activeItem && (
            <Text style={styles.title}>
              {activeItem.icon} {t[activeItem.labelKey as keyof Translations] as string}
            </Text>
          )}
        </View>
        <LanguageToggle />
      </View>

      {/* Categories grid */}
      {view === 'categories' && (
        <ScrollView contentContainerStyle={styles.grid}>
          {MANUAL_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.catCard}
              onPress={() => selectCategory(cat)}
              activeOpacity={0.7}
            >
              <Text style={styles.catIcon}>{cat.icon}</Text>
              <Text style={styles.catLabel} numberOfLines={2}>
                {t[cat.labelKey as keyof Translations] as string}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Items list */}
      {view === 'items' && activeCategory && (
        <FlatList
          data={activeCategory.items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.itemsList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemRow}
              onPress={() => selectItem(item)}
              activeOpacity={0.7}
            >
              <Text style={styles.itemIcon}>{item.icon}</Text>
              <Text style={styles.itemLabel}>
                {t[item.labelKey as keyof Translations] as string}
              </Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}

      {/* Result */}
      {view === 'result' && binResult && (
        <ScrollView contentContainerStyle={styles.resultContainer}>
          <BinCard result={binResult} />
          <Text style={styles.cityNote}>{t.ruleNote}: {selectedCity.name}</Text>
          <TouchableOpacity style={styles.btn} onPress={reset}>
            <Text style={styles.btnText}>{t.manualBack} →</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  headerLeft: { flex: 1, marginRight: 12 },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  backArrow: { fontSize: 20, color: '#43A047', lineHeight: 24 },
  backText: { fontSize: 15, color: '#43A047', fontWeight: '600' },
  title: { fontSize: 22, fontWeight: '800', color: '#1a1a1a' },
  subtitle: { fontSize: 13, color: '#888', marginTop: 3 },

  // Categories grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  catCard: {
    width: '47%',
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 10,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  catIcon: { fontSize: 36 },
  catLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    lineHeight: 20,
  },

  // Items list
  itemsList: { paddingVertical: 8 },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 14,
  },
  itemIcon: { fontSize: 28, width: 40, textAlign: 'center' },
  itemLabel: { flex: 1, fontSize: 16, color: '#1a1a1a', fontWeight: '500' },
  chevron: { fontSize: 22, color: '#ccc', fontWeight: '300' },
  separator: { height: StyleSheet.hairlineWidth, backgroundColor: '#eee', marginLeft: 74 },

  // Result
  resultContainer: { padding: 24, alignItems: 'center' },
  cityNote: { fontSize: 12, color: '#aaa', marginTop: 14 },
  btn: {
    marginTop: 28,
    borderWidth: 1.5,
    borderColor: '#43A047',
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 30,
  },
  btnText: { color: '#43A047', fontWeight: '700', fontSize: 15 },
});