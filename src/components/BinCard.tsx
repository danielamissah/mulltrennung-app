import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BinResult } from '../types';

interface Props {
  result: BinResult;
}

export function BinCard({ result }: Props) {
  return (
    <View style={[styles.card, { borderColor: result.color }]}>
      <View style={[styles.header, { backgroundColor: result.color }]}>
        <Text style={styles.emoji}>{result.emoji}</Text>
        <Text style={styles.binLabel}>{result.label}</Text>
      </View>
      {result.tip ? (
        <View style={styles.tipRow}>
          <Text style={styles.tipIcon}>💡</Text>
          <Text style={styles.tipText}>{result.tip}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 2,
    overflow: 'hidden',
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 12,
  },
  emoji: {
    fontSize: 32,
  },
  binLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    flexShrink: 1,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    gap: 8,
    backgroundColor: '#FAFAFA',
  },
  tipIcon: {
    fontSize: 16,
  },
  tipText: {
    fontSize: 14,
    color: '#444',
    flexShrink: 1,
    lineHeight: 20,
  },
});