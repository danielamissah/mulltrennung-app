import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { Language } from '../i18n/translations';
import { Colors } from '../theme/colors';

export function LanguageToggle() {
  const { language, setLanguage } = useAppStore();

  function toggle() {
    setLanguage(language === 'en' ? 'de' : 'en');
  }

  return (
    <TouchableOpacity style={styles.pill} onPress={toggle} accessibilityLabel="Toggle language">
      <LangOption label="EN" active={language === 'en'} />
      <View style={styles.divider} />
      <LangOption label="DE" active={language === 'de'} />
    </TouchableOpacity>
  );
}

function LangOption({ label, active }: { label: string; active: boolean }) {
  return (
    <View style={[styles.option, active && styles.optionActive]}>
      <Text style={[styles.optionText, active && styles.optionTextActive]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 20,
    overflow: 'hidden',
  },
  option: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'transparent',
  },
  optionActive: { backgroundColor: Colors.primary },
  optionText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  optionTextActive: { color: Colors.white },
  divider: { width: 1, height: 20, backgroundColor: Colors.primary },
});