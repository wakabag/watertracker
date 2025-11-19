import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard({ user, onMessage }) {
  const [dailyUsage, setDailyUsage] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!user) return;

    // define and call fetch functions inside useEffect to satisfy eslint
    const fetchDailyUsage = async () => {
      try {
        const response = await axios.get(`/api/usage/daily/${user.id}`);
        setDailyUsage(response.data.total || 0);
      } catch (error) {
        console.error('Error fetching daily usage:', error);
      }
    };

    const fetchHistory = async () => {
      try {
        const response = await axios.get(`/api/usage/history/${user.id}?days=30`);
        setHistory(response.data || []);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchDailyUsage();
    fetchHistory();
  }, [user]);

  const handleRefresh = async () => {
    if (!user) return;
    try {
      const resp = await axios.get(`/api/usage/daily/${user.id}`);
      setDailyUsage(resp.data.total || 0);
      const hist = await axios.get(`/api/usage/history/${user.id}?days=30`);
      setHistory(hist.data || []);
      onMessage('Data refreshed successfully!');
    } catch (err) {
      console.error('Error refreshing data:', err);
      onMessage('Error refreshing data', 'error');
    }
  };

  const remainingWater = user ? Math.max(0, user.daily_goal - dailyUsage) : 0;
  const percentUsed = user && user.daily_goal ? Math.min(100, (dailyUsage / user.daily_goal) * 100) : 0;

  return (
    <div className="card">
      <h2>📊 Daily Dashboard</h2>
      
      <div className="stats">
        <div className="stat">
          <div className="stat-value">{dailyUsage.toFixed(1)}</div>
          <div className="stat-label">Gallons Used</div>
        </div>
        <div className="stat">
          <div className="stat-value">{user.daily_goal}</div>
          <div className="stat-label">Daily Goal</div>
        </div>
        <div className="stat">
          <div className="stat-value">{remainingWater.toFixed(1)}</div>
          <div className="stat-label">Remaining</div>
        </div>
        <div className="stat">
          <div className="stat-value">{percentUsed.toFixed(0)}%</div>
          <div className="stat-label">Progress</div>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <div style={{ fontSize: '0.9em', color: '#666', marginBottom: '8px' }}>Progress Bar</div>
        <div style={{
          width: '100%',
          height: '30px',
          backgroundColor: '#e0e0e0',
          borderRadius: '15px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${percentUsed}%`,
            height: '100%',
            backgroundColor: percentUsed > 100 ? '#dc3545' : '#667eea',
            transition: 'width 0.3s'
          }}></div>
        </div>
      </div>

      <button style={{ marginTop: '15px', width: '100%' }} onClick={handleRefresh}>
        🔄 Refresh Data
      </button>

      <h3>📈 Last 7 Days</h3>
      <div className="history-list">
        {history.slice(0, 7).map((item, index) => (
          <div key={index} className="history-item">
            <span className="history-date">{item.date}</span>
            <span className="history-amount">{item.total.toFixed(1)} gal</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
