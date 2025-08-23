import React, { useState, useEffect } from "react";
import axios from "axios";
import CompanyList from "./components/CompanyList";
import StockChart from "./components/StockChart";

function App() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [stockData, setStockData] = useState([]);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/companies`)
      .then((res) => {
        console.log("Companies from backend:", res.data);
        setCompanies(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch companies");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      setLoading(true);
      axios.get(`${process.env.REACT_APP_API_URL}/stocks/company/${selectedCompany}?days=${days}`)

        .then((res) => {
          setStockData(res.data);
          setError(null);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to fetch stock data");
        })
        .finally(() => setLoading(false));
    }
  }, [selectedCompany, days]);

  const dayOptions = [
    { value: 7, label: "7 Days" },
    { value: 30, label: "30 Days" },
    { value: 90, label: "90 Days" },
    { value: 180, label: "180 Days" },
    { value: 365, label: "1 Year" }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e8eaf6 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      background: '#ffffff',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid #e5e7eb',
      padding: '0 20px'
    },
    headerInner: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    logoIcon: {
      width: '40px',
      height: '40px',
      background: 'linear-gradient(135deg, #3b82f6, #4f46e5)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '18px',
      fontWeight: 'bold'
    },
    logoText: {
      fontSize: '24px',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    logoSubtext: {
      fontSize: '14px',
      color: '#6b7280',
      marginTop: '2px'
    },
    liveData: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#6b7280',
      fontSize: '14px'
    },
    mainContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '32px 20px',
      display: 'grid',
      gridTemplateColumns: '300px 1fr',
      gap: '32px'
    },
    sidebar: {
      background: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f3f4f6',
      overflow: 'hidden'
    },
    sidebarHeader: {
      background: 'linear-gradient(135deg, #3b82f6, #4f46e5)',
      padding: '24px',
      color: 'white'
    },
    sidebarTitle: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '4px'
    },
    sidebarSubtitle: {
      fontSize: '14px',
      opacity: 0.9
    },
    chartArea: {
      background: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f3f4f6',
      overflow: 'hidden'
    },
    chartHeader: {
      borderBottom: '1px solid #f3f4f6',
      padding: '24px'
    },
    chartTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '8px'
    },
    chartSubtitle: {
      color: '#6b7280',
      fontSize: '14px'
    },
    dayButtons: {
      display: 'flex',
      gap: '8px',
      marginTop: '16px',
      flexWrap: 'wrap'
    },
    dayButton: {
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    dayButtonActive: {
      background: '#3b82f6',
      color: 'white',
      boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.5)'
    },
    dayButtonInactive: {
      background: '#f3f4f6',
      color: '#6b7280'
    },
    chartContent: {
      padding: '24px'
    },
    errorAlert: {
      background: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '24px'
    },
    errorTitle: {
      color: '#dc2626',
      fontWeight: '600',
      marginBottom: '4px'
    },
    errorMessage: {
      color: '#ef4444',
      fontSize: '14px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '64px 20px'
    },
    emptyStateIcon: {
      width: '96px',
      height: '96px',
      background: 'linear-gradient(135deg, #dbeafe, #e0e7ff)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 24px',
      fontSize: '48px',
      color: '#3b82f6'
    },
    emptyStateTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '8px'
    },
    emptyStateText: {
      color: '#6b7280',
      maxWidth: '400px',
      margin: '0 auto'
    },
    loading: {
      textAlign: 'center',
      padding: '64px 20px'
    },
    spinner: {
      width: '48px',
      height: '48px',
      border: '4px solid #f3f4f6',
      borderTop: '4px solid #3b82f6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 16px'
    },
    loadingText: {
      color: '#6b7280'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    },
    statCard: {
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    statCardGreen: {
      background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)',
      borderColor: '#bbf7d0'
    },
    statCardBlue: {
      background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
      borderColor: '#93c5fd'
    },
    statCardPurple: {
      background: 'linear-gradient(135deg, #faf5ff, #f3e8ff)',
      borderColor: '#c4b5fd'
    },
    statLabel: {
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '4px'
    },
    statValue: {
      fontSize: '24px',
      fontWeight: 'bold'
    },
    statIcon: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px'
    },
    chartContainer: {
      background: '#f9fafb',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid #f3f4f6'
    }
  };

  // Add CSS animation for spinner
  const spinnerStyle = document.createElement('style');
  spinnerStyle.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  if (!document.head.querySelector('style[data-spinner]')) {
    spinnerStyle.setAttribute('data-spinner', '');
    document.head.appendChild(spinnerStyle);
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>📈</div>
            <div>
              <div style={styles.logoText}>StockVision</div>
              <div style={styles.logoSubtext}>Real-time Stock Analytics</div>
            </div>
          </div>
          <div style={styles.liveData}>
            <span>📊</span>
            <span>Live Market Data</span>
          </div>
        </div>
      </header>

      <div style={styles.mainContent}>
        {/* Sidebar - Company List */}
        <div style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            <div style={styles.sidebarTitle}>🏢 Companies</div>
            <div style={styles.sidebarSubtitle}>
              {companies.length} available
            </div>
          </div>
          <div style={{padding: '8px'}}>
            {loading && companies.length === 0 ? (
              <div style={{...styles.loading, padding: '32px'}}>
                <div style={styles.spinner}></div>
              </div>
            ) : (
              <CompanyList 
                companies={companies} 
                onSelect={setSelectedCompany}
                selectedCompany={selectedCompany}
              />
            )}
          </div>
        </div>

        {/* Main Content - Chart Area */}
        <div style={styles.chartArea}>
          {/* Chart Header */}
          <div style={styles.chartHeader}>
            <div style={styles.chartTitle}>
              📈 {selectedCompany ? `${selectedCompany} Stock Analysis` : "Select a Company"}
            </div>
            {selectedCompany && (
              <div style={styles.chartSubtitle}>
                Historical price data for the last {days} days
              </div>
            )}
            
            {selectedCompany && (
              <div style={styles.dayButtons}>
                {dayOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setDays(option.value)}
                    style={{
                      ...styles.dayButton,
                      ...(days === option.value ? styles.dayButtonActive : styles.dayButtonInactive)
                    }}
                    onMouseOver={(e) => {
                      if (days !== option.value) {
                        e.target.style.background = '#e5e7eb';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (days !== option.value) {
                        e.target.style.background = '#f3f4f6';
                      }
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Chart Content */}
          <div style={styles.chartContent}>
            {error && (
              <div style={styles.errorAlert}>
                <div style={styles.errorTitle}>❌ Error</div>
                <div style={styles.errorMessage}>{error}</div>
              </div>
            )}

            {!selectedCompany ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyStateIcon}>📊</div>
                <div style={styles.emptyStateTitle}>
                  Welcome to StockVision
                </div>
                <div style={styles.emptyStateText}>
                  Select a company from the sidebar to view detailed stock charts and analytics. 
                  Explore historical data and track performance trends.
                </div>
              </div>
            ) : loading ? (
              <div style={styles.loading}>
                <div style={styles.spinner}></div>
                <div style={styles.loadingText}>Loading stock data...</div>
              </div>
            ) : (
              <div>
                {/* Stock Stats */}
                {stockData.length > 0 && (
                  <div style={styles.statsGrid}>
                    <div style={{...styles.statCard, ...styles.statCardGreen}}>
                      <div>
                        <div style={{...styles.statLabel, color: '#16a34a'}}>Latest Price</div>
                        <div style={{...styles.statValue, color: '#15803d'}}>
                          ${stockData[stockData.length - 1]?.close?.toFixed(2) || 'N/A'}
                        </div>
                      </div>
                      <div style={{...styles.statIcon, background: '#dcfce7', color: '#16a34a'}}>
                        📈
                      </div>
                    </div>
                    
                    <div style={{...styles.statCard, ...styles.statCardBlue}}>
                      <div>
                        <div style={{...styles.statLabel, color: '#2563eb'}}>Highest</div>
                        <div style={{...styles.statValue, color: '#1d4ed8'}}>
                          ${Math.max(...stockData.map(d => d.high)).toFixed(2)}
                        </div>
                      </div>
                      <div style={{...styles.statIcon, background: '#dbeafe', color: '#2563eb'}}>
                        📊
                      </div>
                    </div>
                    
                    <div style={{...styles.statCard, ...styles.statCardPurple}}>
                      <div>
                        <div style={{...styles.statLabel, color: '#7c3aed'}}>Data Points</div>
                        <div style={{...styles.statValue, color: '#6d28d9'}}>
                          {stockData.length}
                        </div>
                      </div>
                      <div style={{...styles.statIcon, background: '#e9d5ff', color: '#7c3aed'}}>
                        📅
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Stock Chart */}
                <div style={styles.chartContainer}>
                  <StockChart stockData={stockData} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;