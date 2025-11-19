import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import Dashboard from './components/Dashboard';
import WaterLogger from './components/WaterLogger';
import TipsSection from './components/TipsSection';

// Set API URL from environment or default to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
axios.defaults.baseURL = API_URL;

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const initializeUser = async () => {
      try {
        // Check if user exists in localStorage
        let userData = localStorage.getItem('waterTrackerUser');
        if (!userData) {
          // Create new user
          const response = await axios.post('/api/users', {
            name: 'Water Saver',
            email: `user_${Date.now()}@watertracker.local`,
            daily_goal: 100
          });
          userData = response.data;
          localStorage.setItem('waterTrackerUser', JSON.stringify(userData));
        } else {
          userData = JSON.parse(userData);
        }
        setUser(userData);
      } catch (error) {
        console.error('Error initializing user:', error);
        setMessage('Error loading user data');
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  const showMessage = (msg, type = 'success') => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading) {
    return <div className="container" style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  return (
    <div className="container">
      <header>
        <h1>💧 Water Tracker</h1>
        <p>Track your daily water usage and learn conservation tips - SDG 6: Clean Water and Sanitation</p>
      </header>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="dashboard">
        <Dashboard user={user} onMessage={showMessage} />
        <WaterLogger user={user} onMessage={showMessage} />
      </div>

      <div className="card">
        <TipsSection />
      </div>
    </div>
  );
}

export default App;
