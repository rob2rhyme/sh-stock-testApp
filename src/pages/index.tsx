import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import TabPanel from '../components/TabPanel';
import Footer from '../components/Footer';
import { fetchAllData } from '../utils/dataLoader';
import { ProductCategory, Product } from '../components/types';

export default function Home() {
  const [productData, setProductData] = useState<Record<string, ProductCategory>>({});
  const [activeTab, setActiveTab] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [history, setHistory] = useState<Array<Record<string, ProductCategory>>>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAllData();
        setProductData(data);
        setHistory([data]);
        setHistoryIndex(0);
        
        const categories = Object.keys(data);
        if (categories.length > 0) {
          setActiveTab(categories[0]);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const saveChanges = async () => {
    try {
      const response = await fetch('/api/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (response.ok) {
        addToHistory(productData);
        setSaveStatus('Changes saved!');
        setTimeout(() => setSaveStatus(''), 3000);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      setSaveStatus('Error saving changes');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const addToHistory = useCallback((newData: Record<string, ProductCategory>) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newData)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setProductData(history[historyIndex - 1]);
      setHistoryIndex(historyIndex - 1);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setProductData(history[historyIndex + 1]);
      setHistoryIndex(historyIndex + 1);
    }
  }, [history, historyIndex]);

  // const updateProductData = useCallback((category: string, updatedProducts: Product[]) => {
  //   const newData = {
  //     ...productData,
  //     [category]: {
  //       ...productData[category],
  //       products: updatedProducts
  //     }
  //   };
  //   setProductData(newData);
  //   addToHistory(newData);
  // }, [productData, addToHistory]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <Head>
        <title>Smokers Haven Inventory</title>
        <meta name="description" content="Inventory management for Smokers Haven" />
        <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/mymediastorage-e5bb2.appspot.com/o/sh-logo%20only-cropped.png?alt=media&token=ee5e54a8-e160-4c6e-9d93-591f7d0bc875" />
      </Head>

      <header className="header">
        <div className="logo-container">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/mymediastorage-e5bb2.appspot.com/o/sh-logo%20only-cropped.png?alt=media&token=ee5e54a8-e160-4c6e-9d93-591f7d0bc875" 
            alt="Smokers Haven Logo" 
            className="logo"
          />
          <h1 className="title">Smokers Haven Inventory Manager</h1>
        </div>
        
        {/* <div className="actions">
          <button onClick={undo} disabled={historyIndex <= 0} className="button">
            Undo
          </button>
          <button onClick={redo} disabled={historyIndex >= history.length - 1} className="button">
            Redo
          </button>
          <button onClick={saveChanges} className="button save-button">
            Save
          </button>
          {saveStatus && <span className="save-status">{saveStatus}</span>}
        </div> */}
      </header>

      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search flavors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="button" onClick={clearSearch} className="clear-button">
            Clear
          </button>
        </form>
      </div>

      <div className="tabs">
        {Object.keys(productData).map((category) => (
          <button
            key={category}
            className={`tab ${activeTab === category ? 'active-tab' : ''}`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {activeTab && productData[activeTab] && (
        <TabPanel
          category={productData[activeTab]}
          searchTerm={searchTerm}
          // updateProductData={updateProductData}
        />
      )}

      <Footer />
    </div>
  );
}