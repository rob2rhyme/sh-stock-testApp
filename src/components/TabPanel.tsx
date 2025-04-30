import React from 'react';
import styles from '../styles/TabPanel.module.css';
import { Product } from '@/types';

type Status = 'Good' | 'Expiring Soon' | 'Need to Order';

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

  const getStatus = (product: Product): Status => {
    const total = (Number(product.store) || 0) + (Number(product.home) || 0);
    const isLowStock = total <= 1;
    const hasExpiry = product.expiryDate !== 'n/a';
    const isExpiringSoon = hasExpiry && calculateDaysLeft(product.expiryDate) <= 30;

    if (isLowStock) return 'Need to Order';
    if (isExpiringSoon) return 'Expiring Soon';
    return 'Good';
  };

  const filteredProducts = products.filter((product) => {
    const flavorMatch = product.flavor.toLowerCase().includes(searchTerm.toLowerCase());
    const status = getStatus(product);
    return flavorMatch && (filter === 'All' || filter === status);
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
            const status = getStatus(product);

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
                      : daysLeft! <= 30
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
