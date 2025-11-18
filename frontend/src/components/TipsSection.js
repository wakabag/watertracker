import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TipsSection() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await axios.get('/api/tips');
        setTips(response.data);
      } catch (error) {
        console.error('Error fetching tips:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  if (loading) return <div>Loading tips...</div>;

  return (
    <div>
      <h2>💡 Water Conservation Tips</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Discover actionable tips to reduce your daily water consumption and contribute to SDG 6: Clean Water and Sanitation.
      </p>
      <div className="tips-section">
        {tips.map(tip => (
          <div key={tip.id} className="tip">
            <h4>{tip.title}</h4>
            <p>{tip.description}</p>
            <small style={{ color: '#999' }}>{tip.category}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TipsSection;
