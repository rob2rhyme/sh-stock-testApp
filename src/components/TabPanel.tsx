import React, { useState } from "react";
import styles from "../styles/TabPanel.module.css";
import { Product } from "../types";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

interface TabPanelProps {
  products: Product[];
  searchTerm: string;
  filterOption: string;
}

const TabPanel: React.FC<TabPanelProps> = ({ products, searchTerm, filterOption }) => {
  const [editingCell, setEditingCell] = useState<{
    row: number;
    field: "store" | "home";
  } | null>(null);
  const [tempValue, setTempValue] = useState("");
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const calculateDaysLeft = (expiryDate: string): number => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const filteredProducts = products.filter((product) => {
    const flavorMatch = product.flavor?.toLowerCase().includes(searchTerm.toLowerCase());
    const total = Number(product.store || 0) + Number(product.home || 0);
    const daysLeft = calculateDaysLeft(product.expiryDate || "");

    switch (filterOption) {
      case "Need to Order":
        return flavorMatch && total <= 1;
      case "Good":
        return flavorMatch && total > 1;
      case "Expiry n/a":
        return flavorMatch && product.expiryDate === "n/a";
      case "Expiring Soon":
        return (
          flavorMatch &&
          product.expiryDate !== "n/a" &&
          daysLeft > 0 &&
          daysLeft < 30
        );
      default:
        return flavorMatch;
    }
  });

  const handleCellClick = (
    row: number,
    field: "store" | "home",
    value: string
  ) => {
    if (!isAuthenticated) {
      router.push(`/login?next=${router.pathname}`);
      return;
    }
    setEditingCell({ row, field });
    setTempValue(value);
  };

  const handleBlur = async (
    index: number,
    field: "store" | "home",
    product: Product
  ) => {
    if (confirm("Are you sure you want to update this quantity?")) {
      try {
        const ref = doc(db, "products", product.id);
        await toast.promise(updateDoc(ref, { [field]: Number(tempValue) }), {
          loading: "Updating quantity...",
          success: "Quantity updated successfully!",
          error: "Failed to update quantity.",
        });
  
        // ✅ Update local product value so UI reflects it immediately
        product[field] = Number(tempValue);
      } catch (error) {
        console.error("Failed to update quantity:", error);
      }
    }
    setEditingCell(null);
  };
  

  return (
    <div className={styles.tabPanel}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Flavor</th>
            <th>ST</th>
            <th>HM</th>
            <th>Total</th>
            <th>Status</th>
            <th>Expiry Date</th>
            <th>Days Left</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, rowIdx) => {
            const total =
              (Number(product.store) || 0) + (Number(product.home) || 0);
            const daysLeft = calculateDaysLeft(product.expiryDate);
            const isLowStock = total <= 1;
            const isExpiringSoon = daysLeft < 30;

            return (
              <tr key={`${product.flavor}-${rowIdx}`}>
                <td>{product.flavor}</td>

                {["store", "home"].map((field) => {
                  const value = product[field as keyof Product] ?? "0";

                  return (
                    <td
                      key={field}
                      onClick={() =>
                        handleCellClick(
                          rowIdx,
                          field as "store" | "home",
                          String(value)
                        )
                      }
                    >
                      {editingCell?.row === rowIdx &&
                      editingCell.field === field ? (
                        <input
                          autoFocus
                          type="number"
                          value={tempValue}
                          onChange={(e) => setTempValue(e.target.value)}
                          onBlur={() =>
                            handleBlur(
                              rowIdx,
                              field as "store" | "home",
                              product
                            )
                          }
                        />
                      ) : (
                        String(value)
                      )}
                    </td>
                  );
                })}

                <td>{total}</td>
                <td className={isLowStock ? styles.lowStock : styles.goodStock}>
                  {isLowStock ? "Need to Order" : "GOOD"}
                </td>
                <td>{product.expiryDate}</td>
                <td
                  className={
                    product.expiryDate === "n/a"
                      ? styles.naExpiry
                      : isExpiringSoon
                      ? styles.expiringSoon
                      : styles.goodExpiry
                  }
                >
                  {product.expiryDate === "n/a"
                    ? "No Expiry Date"
                    : daysLeft > 0
                    ? daysLeft
                    : "Expired"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TabPanel;
