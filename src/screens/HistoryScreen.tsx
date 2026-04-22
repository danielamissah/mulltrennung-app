import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { useTranslation } from '../i18n/useTranslation';
import { ScanResult } from '../types';

function HistoryItem({ item }: { item: ScanResult }) {
  return (
    <View style={styles.item}>
      <View style={[styles.dot, { backgroundColor: item.binResult.color }]} />
      <View style={styles.itemText}>
        <Text style={styles.itemName} numberOfLines={1}>
          {item.product?.name ?? 'Unknown Product'}
        </Text>
        <Text style={styles.itemBin}>{item.binResult.emoji} {item.binResult.label}</Text>
        <Text style={styles.itemMeta}>
          {item.city} · {item.scannedAt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );
}

export function HistoryScreen() {
  const { scanHistory, clearHistory } = useAppStore();
  const { t } = useTranslation();

  if (scanHistory.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>📭</Text>
        <Text style={styles.emptyText}>{t.historyEmpty}</Text>
        <Text style={styles.emptyHint}>{t.historyEmptyHint}</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <FlatList
        data={scanHistory}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => <HistoryItem item={item} />}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{t.historyTitle}</Text>
            <TouchableOpacity onPress={clearHistory}>
              <Text style={styles.clearBtn}>{t.historyClear}</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  list: { padding: 20, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#1a1a1a' },
  clearBtn: { fontSize: 14, color: '#E53935', fontWeight: '600' },
  item: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#eee',
    gap: 14,
  },
  dot: { width: 14, height: 14, borderRadius: 7 },
  itemText: { flex: 1 },
  itemName: { fontSize: 15, fontWeight: '600', color: '#1a1a1a' },
  itemBin: { fontSize: 13, color: '#555', marginTop: 2 },
  itemMeta: { fontSize: 11, color: '#aaa', marginTop: 2 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 18, fontWeight: '700', color: '#333' },
  emptyHint: { fontSize: 14, color: '#aaa', marginTop: 6, textAlign: 'center' },
});