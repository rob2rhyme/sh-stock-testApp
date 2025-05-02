//src/utils/loadProducts.ts
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { Product } from "../types";

export const loadProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, "products"));

  const products: Product[] = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id, // ✅ crucial for update/delete ops
      flavor: data.flavor || "",
      store: Number(data.store || 0),
      home: Number(data.home || 0),
      expiryDate: data.expiryDate || "n/a",
      category: data.category || "Uncategorized",
    };
  });

  return products;
};
