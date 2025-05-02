//src/pages/index.tsx
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { loadProducts } from "@/utils/loadProducts";
import Layout from '@/components/Layout';
import TabPanel from '@/components/TabPanel';
import { Product } from '@/types';
import { useAuth } from '@/context/AuthContext';

const Home = () => {
  const [productsByCategory, setProductsByCategory] = useState<Record<string, Product[]>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('');
  const [filter, setFilter] = useState('All');

  const { isAuthenticated, signOut } = useAuth();

  const handleSignOut = () => {
    if (confirm("Confirm sign out?")) {
      signOut();
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setFilter('All');
  };

  useEffect(() => {
    const fetchData = async () => {
      const products = await loadProducts();

      const grouped: Record<string, Product[]> = {};
      products.forEach((product) => {
        const cat = product.category || "Uncategorized";
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(product);
      });

      setProductsByCategory(grouped);
      setActiveTab(Object.keys(grouped)[0] || "");
    };

    fetchData();
  }, []);

  const categories = Object.keys(productsByCategory).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' })
  );

  return (
    <Layout>
      <Head>
        <title>Smokers Haven Inventory</title>
      </Head>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1rem',
          justifyContent: 'space-between',
        }}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search flavor..."
          style={{
            flex: '1 1 200px',
            minWidth: '0',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            flex: '0 1 150px',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '5px',
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
                flex: '0 1 100px',
                padding: '0.5rem',
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
              }}
            >
              Clear
            </button>
        {isAuthenticated && (
                     <button
              onClick={handleSignOut}
              style={{
                flex: '0 1 120px',
                padding: '0.5rem',
                background: '#4a5568',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Sign Out
            </button>
          
        )}
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
            filterOption={filter}
          />
        )}
      </div>

      <style jsx>{`
        .tabs-container {
          overflow-x: auto;
          margin-bottom: 0.25rem;
        }

        .tabs-scroll {
          display: flex;
          flex-wrap: nowrap;
          gap: 0.5rem;
        }

        .tabs-scroll button {
          white-space: nowrap;
          padding: 0.5rem 1rem;
          background-color: #ccc;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 500;
        }

        .tabs-scroll button:hover {
          background-color: #bbb;
        }

        .tabs-scroll button.active-tab {
          background-color: #3182ce;
          color: white;
        }

        .tab-content {
          margin-top: 0.25rem;
        }
      `}</style>
    </Layout>
  );
};

export default Home;
