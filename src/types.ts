//src/types.ts
export interface Product {
  id: string; // ✅ required for updates
  flavor: string;
  store: number;
  home: number;
  expiryDate: string;
  category: string;
}

export interface ProductCategory {
  name: string;
  products: Product[];
}
