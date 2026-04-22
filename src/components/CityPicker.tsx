import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { CITIES } from '../store/useAppStore';
import { City } from '../types';

interface Props {
  selected: City;
  onSelect: (city: City) => void;
}

export function CityPicker({ selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Stadt</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
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
  label: { fontSize: 12, color: '#888', marginBottom: 8, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  scroll: { flexDirection: 'row' },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  chipActive: {
    backgroundColor: '#E8F5E9',
    borderColor: '#43A047',
  },
  chipText: { fontSize: 14, color: '#555', fontWeight: '500' },
  chipTextActive: { color: '#2E7D32', fontWeight: '700' },
});