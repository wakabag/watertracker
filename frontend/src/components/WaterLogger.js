import React, { useState } from 'react';
import axios from 'axios';

function WaterLogger({ user, onMessage }) {
  const [amount, setAmount] = useState('');
  const [activity, setActivity] = useState('Shower');
  const [isLogging, setIsLogging] = useState(false);

  const activities = [
    { name: 'Shower', typical: 12.5 },
    { name: 'Toilet Flush', typical: 5.0 },
    { name: 'Washing Clothes', typical: 25.0 },
    { name: 'Washing Dishes', typical: 8.0 },
    { name: 'Drinking/Cooking', typical: 3.0 },
    { name: 'Watering Plants', typical: 10.0 },
    { name: 'Outdoor Watering', typical: 50.0 },
    { name: 'Other', typical: 0 }
  ];

  const handleActivityChange = (e) => {
    const selected = activities.find(a => a.name === e.target.value);
    setActivity(selected.name);
    setAmount(selected.typical.toString());
  };

  const handleLogUsage = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      onMessage('Please enter a valid water amount', 'error');
      return;
    }

    setIsLogging(true);
    try {
      await axios.post('/api/usage', {
        user_id: user.id,
        amount: parseFloat(amount),
        activity: activity
      });
      
      onMessage(`✓ Logged ${amount} gallons for ${activity}!`);
      setAmount('');
      window.location.reload(); // Refresh dashboard
    } catch (error) {
      console.error('Error logging usage:', error);
      onMessage('Error logging water usage', 'error');
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <div className="card">
      <h2>💦 Log Water Usage</h2>
      
      <div>
        <h3>Activity Type</h3>
        <select value={activity} onChange={handleActivityChange}>
          {activities.map(act => (
            <option key={act.name} value={act.name}>
              {act.name} (~{act.typical} gal)
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: '15px' }}>
        <h3>Amount (Gallons)</h3>
        <div className="input-group">
          <input
            type="number"
            step="0.1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount in gallons"
          />
        </div>
      </div>

      <button 
        onClick={handleLogUsage}
        disabled={isLogging}
        style={{ width: '100%', marginTop: '15px' }}
      >
        {isLogging ? '⏳ Logging...' : '✓ Log Usage'}
      </button>

      <h3 style={{ marginTop: '25px' }}>💡 Common Water Uses</h3>
      <div style={{ fontSize: '0.9em', color: '#555', lineHeight: '1.8' }}>
        <p>🚿 Short Shower: 12.5 gallons</p>
        <p>🚽 Toilet Flush: 5 gallons</p>
        <p>👔 Washing Clothes: 25 gallons</p>
        <p>🍽️ Washing Dishes: 8 gallons</p>
        <p>💧 Drinking/Cooking: 3 gallons</p>
        <p>🌱 Watering Plants: 10 gallons</p>
      </div>
    </div>
  );
}

export default WaterLogger;
