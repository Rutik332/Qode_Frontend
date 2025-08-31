import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, Legend } from 'recharts';
import './App.css';

function parseExcelDate(excelDate) {
  if (typeof excelDate === 'number') {
    const utc_days = Math.floor(excelDate - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    return date_info.toISOString().slice(0, 10);
  }
  if (typeof excelDate === 'string') {
    const parts = excelDate.split(/[\/-]/);
    if (parts.length === 3) {
      if (parts[0].length === 4) return excelDate.replace(/\//g, '-');
      if (parts[2].length === 4) return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    return excelDate;
  }
  return '';
}

function Sidebar() {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/portfolio', label: 'Portfolio', icon: '💼' }
  ];

  return (
    <div style={{
      width: '250px',
      height: '100vh',
      backgroundColor: '#f8f8f8',
      borderRight: '1px solid #e0e0e0',
      position: 'fixed',
      left: 0,
      top: 0,
      padding: '20px 0'
    }}>
      <div style={{ padding: '0 20px', marginBottom: '30px' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>Qode Portfolio</div>
        <div style={{ fontSize: '12px', color: '#1976d2', backgroundColor: '#e3f2fd', padding: '2px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '4px' }}>premium</div>
      </div>
      
      <nav>
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 20px',
              textDecoration: 'none',
              color: location.pathname === item.path ? '#1976d2' : '#333',
              backgroundColor: location.pathname === item.path ? '#e3f2fd' : 'transparent',
              borderRight: location.pathname === item.path ? '3px solid #1976d2' : 'none',
              fontWeight: location.pathname === item.path ? '600' : '400'
            }}
          >
            <span style={{ marginRight: '12px', fontSize: '16px' }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      
      <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', color: '#666' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#4caf50', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '8px', fontSize: '10px' }}>QP</div>
          <span>Valid till Dec 31, 2024</span>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const blogs = [
    {
      id: 1,
      title: 'Understanding Portfolio Diversification',
      date: 'Apr 18, 2024',
      summary: 'Learn why diversification is key to managing risk and maximizing returns in your investment portfolio.',
      link: '#'
    },
    {
      id: 2,
      title: 'Monthly Market Recap: May 2024',
      date: 'Apr 05, 2024',
      summary: 'A quick look at how the markets performed last month and what it means for your investments.',
      link: '#'
    },
    {
      id: 3,
      title: 'What is Drawdown and Why Does it Matter?',
      date: 'Mar 27, 2024',
      summary: 'Explore the concept of drawdown and how it affects your portfolio performance over time.',
      link: '#'
    },
    {
      id: 4,
      title: 'The Focused Way of Investing',
      date: 'Mar 18, 2024',
      summary: 'Our four-quadrant strategy and comprehensive review of investment approaches.',
      link: '#'
    },
    {
      id: 5,
      title: 'Market Analysis: Current Trends',
      date: 'Mar 10, 2024',
      summary: 'Deep dive into current market trends and their implications for portfolio management.',
      link: '#'
    },
    {
      id: 6,
      title: 'Risk Management Strategies',
      date: 'Feb 28, 2024',
      summary: 'Essential risk management techniques for maintaining portfolio stability.',
      link: '#'
    }
  ];

  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '30px' }}>Home</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
        <div style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Get started</h3>
            <span style={{ fontSize: '14px' }}>↗</span>
          </div>
          <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: '1.4' }}>Read our getting started guide to get the most out of your Qode Portfolio subscription.</p>
        </div>
        
        <div style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Community</h3>
            <span style={{ fontSize: '14px' }}>↗</span>
          </div>
          <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: '1.4' }}>Join the conversation on our exclusive community for Qode Portfolio subscribers.</p>
        </div>
        
        <div style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Visit website</h3>
            <span style={{ fontSize: '14px' }}>↗</span>
          </div>
          <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: '1.4' }}>Keep up with our latest content on our website.</p>
        </div>
      </div>
      
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>Latest Posts</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
        {blogs.map(blog => (
          <div key={blog.id} style={{ 
            border: '1px solid #e0e0e0', 
            borderRadius: '8px', 
            padding: '20px',
            backgroundColor: 'white'
          }}>
            <div style={{ color: '#888', fontSize: '14px', marginBottom: '8px' }}>{blog.date}</div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600', color: '#333', lineHeight: '1.3' }}>{blog.title}</h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#666', lineHeight: '1.5' }}>{blog.summary}</p>
            <a href={blog.link} style={{ color: '#1976d2', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Read full post →</a>
          </div>
        ))}
      </div>
    </div>
  );
}

function Portfolio() {
  const [excelData, setExcelData] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [parsedData, setParsedData] = React.useState([]);
  const [monthlyReturns, setMonthlyReturns] = React.useState([]);
  const [drawdownData, setDrawdownData] = React.useState([]);
  const [stats, setStats] = React.useState({});

  React.useEffect(() => {
    if (!excelData.length || !columns.length) return;
    const dateIdx = columns.findIndex(col => col.toLowerCase().includes('date'));
    const navIdx = columns.findIndex(col => col.toLowerCase().includes('nav'));
    if (dateIdx === -1 || navIdx === -1) return;
    
    const data = excelData
      .map(row => ({
        date: parseExcelDate(row[dateIdx]),
        nav: parseFloat(row[navIdx])
      }))
      .filter(row => row.date && !isNaN(row.nav));
    
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
    setParsedData(data);

    const monthly = {};
    data.forEach(d => {
      const [year, month] = d.date.split('-');
      const key = `${year}-${month}`;
      if (!monthly[key]) monthly[key] = { year, month, start: d.nav, end: d.nav };
      monthly[key].end = d.nav;
    });
    
    const monthlyArr = Object.values(monthly).map(m => ({
      year: m.year,
      month: m.month,
      label: `${m.year}-${m.month}`,
      return: ((m.end - m.start) / m.start) * 100
    })).sort((a, b) => a.label.localeCompare(b.label));
    setMonthlyReturns(monthlyArr);

    let peak = -Infinity;
    const ddArr = data.map(d => {
      peak = Math.max(peak, d.nav);
      return {
        date: d.date,
        drawdown: ((d.nav - peak) / peak) * 100
      };
    });
    setDrawdownData(ddArr);

    const first = data[0];
    const last = data[data.length - 1];
    const nYears = (new Date(last.date) - new Date(first.date)) / (365.25 * 24 * 3600 * 1000);
    const cagr = nYears > 0 ? (Math.pow(last.nav / first.nav, 1 / nYears) - 1) * 100 : 0;
    const maxDD = Math.min(...ddArr.map(d => d.drawdown));
    setStats({
      cagr: cagr.toFixed(2),
      maxDrawdown: maxDD.toFixed(2),
      totalReturn: (((last.nav - first.nav) / first.nav) * 100).toFixed(2),
      years: nYears.toFixed(2)
    });
  }, [excelData, columns]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setColumns(data[0] || []);
      setExcelData(data.slice(1));
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '30px' }}>Portfolio</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <input 
          type="file" 
          accept=".xlsx, .xls" 
          onChange={handleFileUpload} 
          style={{ 
            padding: '12px 16px', 
            border: '1px solid #e0e0e0', 
            borderRadius: '6px',
            fontSize: '14px',
            backgroundColor: 'white'
          }} 
        />
      </div>

      {columns.length > 0 && (
        <div style={{ marginBottom: '20px', color: '#666', fontSize: '14px' }}>
          <strong>Detected columns:</strong> {columns.join(', ')}
        </div>
      )}
      
      {parsedData.length > 0 && (
        <div style={{ marginBottom: '20px', color: '#666', fontSize: '14px' }}>
          <strong>First 5 parsed rows:</strong>
          <pre style={{ background: '#f8f8f8', padding: '12px', borderRadius: '6px', overflowX: 'auto', fontSize: '12px' }}>{JSON.stringify(parsedData.slice(0,5), null, 2)}</pre>
        </div>
      )}

      {parsedData.length > 0 && (
        <>
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>Trailing Returns</h2>
            <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f8f8' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e0e0e0', fontSize: '14px', fontWeight: '600', color: '#333' }}>NAME</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #e0e0e0', fontSize: '14px', fontWeight: '600', color: '#333' }}>YTD</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #e0e0e0', fontSize: '14px', fontWeight: '600', color: '#333' }}>1D</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #e0e0e0', fontSize: '14px', fontWeight: '600', color: '#333' }}>1W</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #e0e0e0', fontSize: '14px', fontWeight: '600', color: '#333' }}>1M</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #e0e0e0', fontSize: '14px', fontWeight: '600', color: '#333' }}>3M</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #e0e0e0', fontSize: '14px', fontWeight: '600', color: '#333' }}>6M</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #e0e0e0', fontSize: '14px', fontWeight: '600', color: '#333' }}>1Y</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #e0e0e0', fontSize: '14px', fontWeight: '600', color: '#333' }}>3Y</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #e0e0e0', fontSize: '14px', fontWeight: '600', color: '#333' }}>SI</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #e0e0e0', fontSize: '14px', fontWeight: '600', color: '#333' }}>DD</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #e0e0e0', fontSize: '14px', fontWeight: '600', color: '#333' }}>MAXDD</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', fontSize: '14px', fontWeight: '600', color: '#333' }}>Focused</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#f44336' }}>-1.7%</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#666' }}>0.1%</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#666' }}>2.9%</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#666' }}>7.6%</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#666' }}>2.2%</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#666' }}>10.1%</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#666' }}>43.5%</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#666' }}>23.9%</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#666' }}>22.5%</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#f44336' }}>-2.8%</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#f44336' }}>-40.3%</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', fontSize: '14px', fontWeight: '600', color: '#333' }}>NIFTY50</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#4caf50' }}>3.1%</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#666' }}>0.1%</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#666' }}>1.1%</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#666' }}>1.4%</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#666' }}>4.4%</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#666' }}>16.2%</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#666' }}>26.2%</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#666' }}>16.0%</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#666' }}>14.5%</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#f44336' }}>-1.5%</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#f44336' }}>-38.4%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Note: Returns above 1 year are annualised.</div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', margin: 0 }}>Equity curve</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#666' }}>
                <span>Live since {parsedData[0]?.date || '2019-01-01'} Reset</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <label style={{ fontSize: '12px' }}>From date:</label>
                  <input 
                    type="text" 
                    defaultValue="2019-01-01" 
                    style={{ 
                      padding: '4px 8px', 
                      border: '1px solid #e0e0e0', 
                      borderRadius: '4px',
                      fontSize: '12px',
                      width: '100px'
                    }} 
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <label style={{ fontSize: '12px' }}>To date:</label>
                  <input 
                    type="text" 
                    defaultValue="2024-04-24" 
                    style={{ 
                      padding: '4px 8px', 
                      border: '1px solid #e0e0e0', 
                      borderRadius: '4px',
                      fontSize: '12px',
                      width: '100px'
                    }} 
                  />
                </div>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0', padding: '20px', marginBottom: '20px' }}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={parsedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" fontSize={12} stroke="#666" />
                  <YAxis domain={[50, 350]} tickFormatter={v => v.toFixed(0)} fontSize={12} stroke="#666" />
                  <Tooltip formatter={v => v.toFixed(2)} />
                  <Legend />
                  <Line type="monotone" dataKey="nav" stroke="#4caf50" strokeWidth={2} dot={false} name="Focused" />
                  <Line type="monotone" dataKey="nifty50" stroke="#1976d2" strokeWidth={2} dot={false} name="NIFTY50" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0', padding: '20px' }}>
              <ResponsiveContainer width="100%" height={150}>
                <AreaChart data={drawdownData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorDd" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f44336" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f44336" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" fontSize={12} stroke="#666" />
                  <YAxis domain={[-40, 0]} tickFormatter={v => v.toFixed(0)} fontSize={12} stroke="#666" />
                  <Tooltip formatter={v => v.toFixed(2) + '%'} />
                  <Area type="monotone" dataKey="drawdown" stroke="#f44336" fillOpacity={1} fill="url(#colorDd)" name="Drawdown (%)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f8f8' }}>
        <Sidebar />
        <div style={{ marginLeft: '250px', flex: 1, backgroundColor: 'white' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
