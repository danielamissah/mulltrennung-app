import axios from 'axios';
import { Product } from '../types';

const OFF_BASE = 'https://world.openfoodfacts.org/api/v2/product';

interface OFFProduct {
  product_name?: string;
  brands?: string;
  packaging?: string;
  packaging_materials_tags?: string[];
  packaging_shapes_tags?: string[];
  image_front_url?: string;
  _id?: string;
}

function parseMaterials(product: OFFProduct): string[] {
  const tags = [
    ...(product.packaging_materials_tags ?? []),
    ...(product.packaging_shapes_tags ?? []),
  ];
  return tags
    .map((t) => t.replace(/^en:/, '').replace(/-/g, '_'))
    .filter(Boolean);
}

export async function fetchProductByBarcode(barcode: string): Promise<Product | null> {
  try {
    const { data } = await axios.get(`${OFF_BASE}/${barcode}`, {
      params: { fields: 'product_name,brands,packaging,packaging_materials_tags,packaging_shapes_tags,image_front_url' },
      timeout: 6000,
    });

    if (data.status === 0 || !data.product) return null;

    const p: OFFProduct = data.product;

    return {
      barcode,
      name: p.product_name ?? 'Unbekanntes Produkt',
      brand: p.brands,
      packaging_type: p.packaging,
      materials: parseMaterials(p),
      image_url: p.image_front_url,
    };
  } catch {
    return null;
  }
}