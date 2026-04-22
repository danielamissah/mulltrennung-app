import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from '../i18n/useTranslation';
import { LanguageToggle } from '../components/LanguageToggle';
import { Colors } from '../theme/colors';

export function GuideScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <View style={styles.titleRow}>
        <View>
          <Text style={styles.title}>{t.guideTitle}</Text>
          <Text style={styles.subtitle}>{t.guideSubtitle}</Text>
        </View>
        <LanguageToggle />
      </View>

      {t.guideItems.map((item) => (
        <View key={item.bin} style={[styles.card, { borderLeftColor: item.color }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardEmoji}>{item.emoji}</Text>
            <Text style={styles.cardBin}>{item.bin}</Text>
          </View>
          <Text style={styles.cardExamples}>{item.examples}</Text>
          <View style={styles.ruleRow}>
            <Text style={styles.ruleIcon}>📌</Text>
            <Text style={styles.ruleText}>{item.rule}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },
  content: { padding: 20, paddingTop: 60 },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  title: { fontSize: 26, fontWeight: '800', color: Colors.text },
  subtitle: { fontSize: 14, color: Colors.textMuted, marginTop: 4 },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderLeftWidth: 4,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  cardEmoji: { fontSize: 24 },
  cardBin: { fontSize: 16, fontWeight: '700', color: Colors.text, flexShrink: 1 },
  cardExamples: { fontSize: 13, color: '#555', lineHeight: 20, marginBottom: 8 },
  ruleRow: { flexDirection: 'row', gap: 6, alignItems: 'flex-start' },
  ruleIcon: { fontSize: 12, marginTop: 2 },
  ruleText: { fontSize: 12, color: Colors.textMuted, flexShrink: 1, fontStyle: 'italic' },
});