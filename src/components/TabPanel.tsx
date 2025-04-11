import React from 'react';
import styles from '../styles/TabPanel.module.css';
import { ProductCategory, Product } from './types';

interface TabPanelProps {
  category: ProductCategory;
  searchTerm: string;
  // updateProductData: (category: string, updatedProducts: Product[]) => void;
}

const TabPanel: React.FC<TabPanelProps> = ({ category, searchTerm, }) => {
  const calculateDaysLeft = (expiryDate: string): number => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const filteredProducts = category.products.filter(product =>
    product.flavor.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          {filteredProducts.map((product, index) => {
            const total = (Number(product.store) || 0) + (Number(product.home) || 0);
            const daysLeft = calculateDaysLeft(product.expiryDate);
            const isLowStock = total <= 1;
            const isExpiringSoon = daysLeft < 30;

            return (
              <tr key={`${product.flavor}-${index}`}>
                <td>{product.flavor}</td>
                <td>{product.store}</td>
                <td>{product.home}</td>
                <td>{total}</td>
                <td className={isLowStock ? styles.lowStock : styles.goodStock}>
                  {isLowStock ? 'Need to Order' : 'GOOD'}
                </td>
                <td>{product.expiryDate}</td>
                <td className={isExpiringSoon ? styles.expiringSoon : styles.goodExpiry}>
                  {daysLeft > 0 ? daysLeft : 'Expired'}
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