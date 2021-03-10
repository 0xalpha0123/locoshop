export type ProductType = {
  name: string;
  brand: string;
  colors: Array<string>;
  id: string;
  categories: Array<string>;
  ean?: Array<string>;
  ean13?: string;
  gtins?: Array<string>;
  imageURLs: Array<string>;
  manufacturer: string;
  description?: string;
  price?: number;
  prices: Array<{
    amountMax: number;
    amountMin: number;
    currency: string;
  }>;
  currency?: string;
  upc: Array<string>;
  upca: string;
  primaryCategories: Array<string>;
  sizes: Array<string>;
};

export type ProductBaseType = {
  id: string;
  imgsSrc: Array<string>;
  pos: string;
  storeId: string;
  type: string;
  upc: string;
  variants: any;
  vendor: string;
  datafinitiMatchedProduct?: ProductType;
}
