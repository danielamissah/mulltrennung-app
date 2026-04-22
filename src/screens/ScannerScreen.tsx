import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ActivityIndicator, Alert, ScrollView, Image,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { BinCard } from '../components/BinCard';
import { CityPicker } from '../components/CityPicker';
import { LanguageToggle } from '../components/LanguageToggle';
import { fetchProductByBarcode } from '../services/productService';
import { getBinForMaterial, inferMaterialFromProduct } from '../services/rulesService';
import { useAppStore } from '../store/useAppStore';
import { useTranslation } from '../i18n/useTranslation';
import { ScanResult } from '../types';
import { Colors } from '../theme/colors';

export function ScannerScreen() {
  const { selectedCity, setCity, addScan } = useAppStore();
  const { t } = useTranslation();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const lastBarcode = useRef<string>('');

  async function handleBarcode({ data }: { data: string }) {
    if (!scanning || loading || data === lastBarcode.current) return;
    lastBarcode.current = data;
    setScanning(false);
    setLoading(true);

    try {
      const product = await fetchProductByBarcode(data);
      const material = inferMaterialFromProduct(product?.packaging_type, product?.materials);
      const binResult = getBinForMaterial(material, selectedCity.id, t);

      const scanResult: ScanResult = {
        product,
        binResult,
        city: selectedCity.name,
        scannedAt: new Date(),
      };

      addScan(scanResult);
      setResult(scanResult);
    } catch {
      Alert.alert('Error', t.scanError);
      setScanning(true);
      lastBarcode.current = '';
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setResult(null);
    lastBarcode.current = '';
    setScanning(true);
  }

  if (!permission) return <View style={styles.centered}><ActivityIndicator /></View>;

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.permText}>{t.cameraPermTitle}</Text>
        <TouchableOpacity style={styles.btn} onPress={requestPermission}>
          <Text style={styles.btnText}>{t.cameraPermBtn}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <View style={styles.titleRow}>
        <View>
          <Text style={styles.title}>{t.appTitle}</Text>
          <Text style={styles.subtitle}>{t.appSubtitle}</Text>
        </View>
        <LanguageToggle />
      </View>

      <CityPicker selected={selectedCity} onSelect={setCity} />

      {!result ? (
        <View style={styles.cameraWrapper}>
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={scanning ? handleBarcode : undefined}
            barcodeScannerSettings={{
              barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e', 'code128', 'code39', 'qr'],
            }}
          />
          <View style={styles.scanOverlay}>
            <View style={styles.scanFrame} />
          </View>
          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>{t.scanLoading}</Text>
            </View>
          )}
          <Text style={styles.hint}>{t.scanHint}</Text>
        </View>
      ) : (
        <View style={styles.resultContainer}>
          {result.product?.image_url ? (
            <Image source={{ uri: result.product.image_url }} style={styles.productImage} resizeMode="contain" />
          ) : null}
          <Text style={styles.productName}>
            {result.product?.name ?? t.unknownProduct}
          </Text>
          {result.product?.brand ? (
            <Text style={styles.productBrand}>{result.product.brand}</Text>
          ) : null}

          <BinCard result={result.binResult} />

          <Text style={styles.cityNote}>{t.ruleNote}: {result.city}</Text>

          <TouchableOpacity style={styles.btn} onPress={reset}>
            <Text style={styles.btnText}>{t.nextScan}</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },
  content: { padding: 20, paddingTop: 60 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: { fontSize: 26, fontWeight: '800', color: Colors.text },
  subtitle: { fontSize: 13, color: Colors.textMuted, marginTop: 4, maxWidth: 220 },
  cameraWrapper: { borderRadius: 20, overflow: 'hidden', position: 'relative', marginBottom: 12 },
  camera: { width: '100%', height: 320 },
  scanOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' },
  scanFrame: {
    width: 220, height: 140,
    borderWidth: 3, borderColor: Colors.accent,
    borderRadius: 12, backgroundColor: 'transparent',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center', alignItems: 'center', gap: 12,
  },
  loadingText: { color: Colors.white, fontSize: 15 },
  hint: { textAlign: 'center', color: Colors.textMuted, fontSize: 13, marginTop: 10 },
  resultContainer: { alignItems: 'center' },
  productImage: { width: 140, height: 140, marginBottom: 12, borderRadius: 12 },
  productName: { fontSize: 20, fontWeight: '700', textAlign: 'center', color: Colors.text },
  productBrand: { fontSize: 14, color: Colors.textMuted, marginTop: 4 },
  cityNote: { fontSize: 12, color: Colors.textLight, marginTop: 12 },
  btn: {
    marginTop: 20, backgroundColor: Colors.primary,
    paddingHorizontal: 28, paddingVertical: 14, borderRadius: 30,
  },
  btnText: { color: Colors.white, fontWeight: '700', fontSize: 15 },
  permText: { fontSize: 16, textAlign: 'center', marginBottom: 16, color: '#444' },
});

// const styles = StyleSheet.create({
//   root: { flex: 1, backgroundColor: '#fff' },
//   content: { padding: 20, paddingTop: 60 },
//   centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
//   titleRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 20,
//   },
//   title: { fontSize: 26, fontWeight: '800', color: '#1a1a1a' },
//   subtitle: { fontSize: 13, color: '#888', marginTop: 4, maxWidth: 220 },
//   cameraWrapper: { borderRadius: 20, overflow: 'hidden', position: 'relative', marginBottom: 12 },
//   camera: { width: '100%', height: 320 },
//   scanOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' },
//   scanFrame: {
//     width: 220, height: 140,
//     borderWidth: 3, borderColor: '#43A047',
//     borderRadius: 12, backgroundColor: 'transparent',
//   },
//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.55)',
//     justifyContent: 'center', alignItems: 'center', gap: 12,
//   },
//   loadingText: { color: '#fff', fontSize: 15 },
//   hint: { textAlign: 'center', color: '#777', fontSize: 13, marginTop: 10 },
//   resultContainer: { alignItems: 'center' },
//   productImage: { width: 140, height: 140, marginBottom: 12, borderRadius: 12 },
//   productName: { fontSize: 20, fontWeight: '700', textAlign: 'center', color: '#1a1a1a' },
//   productBrand: { fontSize: 14, color: '#888', marginTop: 4 },
//   cityNote: { fontSize: 12, color: '#aaa', marginTop: 12 },
//   btn: { marginTop: 20, backgroundColor: '#43A047', paddingHorizontal: 28, paddingVertical: 14, borderRadius: 30 },
//   btnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
//   permText: { fontSize: 16, textAlign: 'center', marginBottom: 16, color: '#444' },
// });