import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { CITIES } from '../store/useAppStore';
import { City } from '../types';
import { Colors } from '../theme/colors';

interface Props {
  selected: City;
  onSelect: (city: City) => void;
}

export function CityPicker({ selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CITIES.map((city) => {
          const active = city.id === selected.id;
          return (
            <TouchableOpacity
              key={city.id}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => onSelect(city)}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {city.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  chipActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  chipText: { fontSize: 14, color: Colors.textMuted, fontWeight: '500' },
  chipTextActive: { color: Colors.primary, fontWeight: '700' },
});