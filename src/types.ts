export interface Product {
    category: string;
    flavor: string;
    store: number;
    home: number;
    expiryDate: string;
  }
  
  export interface ProductCategory {
    name: string;
    products: Product[];
  }