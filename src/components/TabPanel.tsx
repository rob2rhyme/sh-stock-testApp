import React from 'react';
import styles from '../styles/TabPanel.module.css';
import { Product } from '@/types';

interface TabPanelProps {
  products: Product[];
  searchTerm: string;
  filter: string;
}

const TabPanel: React.FC<TabPanelProps> = ({ products, searchTerm, filter }) => {
  const calculateDaysLeft = (expiryDate: string): number => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const filteredProducts = products.filter((product) => {
    const flavorMatch = product.flavor.toLowerCase().includes(searchTerm.toLowerCase());

    const total = (Number(product.store) || 0) + (Number(product.home) || 0);
    const hasExpiry = product.expiryDate !== 'n/a';
    const daysLeft = hasExpiry ? calculateDaysLeft(product.expiryDate) : null;

    const isLowStock = total <= 1;
    const isExpiringSoon = hasExpiry && daysLeft! <= 30;

    const status =
      !hasExpiry
        ? 'Expiry n/a'
        : isLowStock
        ? 'Need to Order'
        : isExpiringSoon
        ? 'Expiring Soon'
        : 'Good';

    if (filter === 'Expiry n/a' && hasExpiry) return false;
    if (filter === 'Expiring Soon' && !isExpiringSoon) return false;
    if (filter === 'Need to Order' && !isLowStock) return false;
    if (filter === 'Good' && (isLowStock || !hasExpiry || isExpiringSoon)) return false;

    return flavorMatch;
  });

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
            const hasExpiry = product.expiryDate !== 'n/a';
            const daysLeft = hasExpiry ? calculateDaysLeft(product.expiryDate) : null;
            const isLowStock = total <= 1;
            const isExpiringSoon = hasExpiry && daysLeft! <= 30;

            const status =
  product.expiryDate === 'n/a'
    ? isLowStock
      ? 'Need to Order'
      : 'Good'
    : isLowStock
    ? 'Need to Order'
    : isExpiringSoon
    ? 'Expiring Soon'
    : 'Good';

            return (
              <tr key={`${product.flavor}-${index}`}>
                <td>{product.flavor}</td>
                <td>{product.store}</td>
                <td>{product.home}</td>
                <td>{total}</td>
                <td
                  className={
                    status === 'Need to Order'
                      ? styles.lowStock
                      : status === 'Expiring Soon'
                      ? styles.expiringSoon
                      : status === 'Expiry n/a'
                      ? styles.naExpiry
                      : styles.goodStock
                  }
                >
                  {status}
                </td>
                <td>{product.expiryDate}</td>
                <td
                  className={
                    !hasExpiry
                      ? styles.naExpiry
                      : isExpiringSoon
                      ? styles.expiringSoon
                      : styles.goodExpiry
                  }
                >
                  {!hasExpiry
                    ? 'No Expiry Date'
                    : daysLeft! > 0
                    ? daysLeft
                    : 'Expired'}
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
