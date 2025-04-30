import { useEffect, useState } from 'react';
import Head from 'next/head';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import Layout from '@/components/Layout';
import TabPanel from '@/components/TabPanel';
import { Product } from '@/types';

const Home = () => {
  const [productsByCategory, setProductsByCategory] = useState<Record<string, Product[]>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'products'));
      const products = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          category: data.category || 'Uncategorized',
          flavor: data.flavor || '',
          store: data.store || '',
          home: data.home || '',
          expiryDate: data.expiryDate || null,
        } as Product;
      });

      const grouped: Record<string, Product[]> = {};
      products.forEach(product => {
        const cat = product.category || 'Uncategorized';
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(product);
      });

      setProductsByCategory(grouped);
      setActiveTab(Object.keys(grouped)[0] || '');
    };

    fetchData();
  }, []);

  const handleClear = () => {
    setSearchTerm('');
    setFilter('All');
  };

  // const categories = Object.keys(productsByCategory);
  const categories = Object.keys(productsByCategory).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' })
  );
  

  return (
    <Layout>
      <Head>
        <title>Smokers Haven Inventory</title>
      </Head>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'nowrap', overflowX: 'auto', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search flavor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flexGrow: 1,
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '5px',
            minWidth: '180px',
          }}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
            cursor: 'pointer',
            minWidth: '140px',
            flexShrink: 0,
          }}
        >
          <option>All</option>
          <option>Need to Order</option>
          <option>Good</option>
          <option>Expiry n/a</option>
          <option>Expiring Soon</option>
        </select>
        <button
          onClick={handleClear}
          style={{
            padding: '0.5rem 1rem',
            background: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          Clear
        </button>
      </div>

      <div className="tabs-container">
        <div className="tabs-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={activeTab === cat ? 'active-tab' : ''}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="tab-content">
        {activeTab && productsByCategory[activeTab] && (
          <TabPanel
            products={productsByCategory[activeTab]}
            searchTerm={searchTerm}
            filter={filter}
          />
        )}
      </div>

      <style jsx>{`
        .tabs-container {
          overflow-x: auto;
          margin-bottom: 1rem;
        }

        .tabs-scroll {
          display: flex;
          flex-wrap: nowrap;
          gap: 0.5rem;
        }

        .tabs-scroll button {
          white-space: nowrap;
          padding: 0.5rem 1rem;
          background-color: #eee;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 500;
        }

        .tabs-scroll button.active-tab {
  background-color: #3182ce;
  color: white;
}


        .tab-content {
          margin-top: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Home;
