import { storage } from "wxt/storage";
import { Product, ProductDetails, ProductWithNum, Selected } from "./types";

const PRODUCT_DATA_RECORD_NAME = "local:ProductDataRecord";
const SELECTED_RECORD_NAME = "local:SelectedRecord";

type ProductDataRecord = Record<string, ProductDetails>;
type SelectedRecord = Record<string, Selected>;

/**
 * Retrieves the product data record from storage.
 * @returns {Promise<ProductDataRecord>} The product data record.
 */
async function getProductDataRecord(): Promise<ProductDataRecord> {
  try {
    const item = (await storage.getItem(PRODUCT_DATA_RECORD_NAME)) as string;
    return JSON.parse(item || "{}") as ProductDataRecord;
  } catch (error) {
    console.error("Failed to get product data record:", error);
    throw error;
  }
}

/**
 * Retrieves a product by its key.
 * @param {string} key - The key of the product.
 * @returns {Promise<Product | null>} The product or null if not found.
 */
export async function getProduct(key: string): Promise<Product | null> {
  try {
    const products = await getProductDataRecord();
    return products[key] ? { ...products[key], url: key } : null;
  } catch (error) {
    console.error("Failed to get product:", error);
    return null;
  }
}

/**
 * Adds a product to the storage.
 * @param {Product} product - The product to add.
 * @returns {Promise<void>}
 */
export async function addProduct(product: Product): Promise<void> {
  try {
    const products = await getProductDataRecord();
    const { url, ...rest } = product;
    products[product.url] = rest;
    await storage.setItem(PRODUCT_DATA_RECORD_NAME, JSON.stringify(products));
  } catch (error) {
    console.error("Failed to add product:", error);
    throw error;
  }
}

/**
 * Removes a product from the storage by its key.
 * @param {string} key - The key of the product to remove.
 * @returns {Promise<void>}
 */
export async function removeProduct(key: string): Promise<void> {
  try {
    const products = await getProductDataRecord();
    delete products[key];
    await storage.setItem(PRODUCT_DATA_RECORD_NAME, JSON.stringify(products));
  } catch (error) {
    console.error("Failed to remove product:", error);
    throw error;
  }
}

/**
 * Retrieves all products from the storage.
 * @returns {Promise<Product[]>} An array of all products.
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await getProductDataRecord();
    return Object.entries(products).map(([url, data]) => ({ url, ...data }));
  } catch (error) {
    console.error("Failed to get all products:", error);
    throw error;
  }
}

export async function getSelectedRecord(): Promise<SelectedRecord> {
  try {
    const item = (await storage.getItem(SELECTED_RECORD_NAME)) as string;
    return JSON.parse(item || "{}") as SelectedRecord;
  } catch (error) {
    console.error("Failed to get selected record:", error);
    throw error;
  }
}

export async function getSelected(key?: string): Promise<Selected | null> {
  if (!key) return null;
  try {
    const configs = await getSelectedRecord();
    return configs[key] || null;
  } catch (error) {
    console.error("Failed to get selected:", error);
    return null;
  }
}

export async function addSelected(key: string, selected: Selected): Promise<void> {
  try {
    const configs = await getSelectedRecord();
    configs[key] = selected;
    await storage.setItem(SELECTED_RECORD_NAME, JSON.stringify(configs));
  } catch (error) {
    console.error("Failed to add selected:", error);
    throw error;
  }
}

export async function getSelectedUnselected(
  key?: string
): Promise<{ selected: ProductWithNum[]; unselected: ProductWithNum[] } | null> {
  try {
    const selected = (await getSelected(key)) || [];
    const selectedUrls = selected.map((item) => item.url);
    const products = await getAllProducts();
    const selectConfig: { selected: ProductWithNum[]; unselected: ProductWithNum[] } = { selected: [], unselected: [] };
    for (const product of products) {
      if (selectedUrls.includes(product.url)) {
        selectConfig.selected.push({ ...product, num: selected.find((item) => item.url === product.url)?.num || 0 });
      } else {
        selectConfig.unselected.push({ ...product, num: 0 });
      }
    }
    return selectConfig;
  } catch (error) {
    console.error("Failed to get config:", error);
    return null;
  }
}
