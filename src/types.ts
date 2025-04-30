export interface Product {
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
