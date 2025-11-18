const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database setup
const dbPath = path.join(__dirname, 'water_tracker.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error(err.message);
  else console.log('Connected to SQLite database');
});

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      daily_goal REAL DEFAULT 100
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS usage_logs (
      id INTEGER PRIMARY KEY,
      user_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      amount REAL NOT NULL,
      activity TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS tips (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT
    )
  `);

  // Insert sample tips
  db.run(`INSERT OR IGNORE INTO tips (title, description, category) VALUES 
    ('Shorter Showers', 'Reduce shower time by 2 minutes to save 12.5 gallons per shower', 'bathroom'),
    ('Fix Leaks', 'A dripping faucet wastes 3,000 gallons annually', 'maintenance'),
    ('Efficient Toilets', 'Install low-flow toilets to save 13,000 gallons per year per person', 'bathroom'),
    ('Washing Machine', 'Use full loads in washing machines to maximize water efficiency', 'laundry'),
    ('Outdoor Watering', 'Water plants early morning to reduce evaporation loss', 'outdoor')
  `);
});

// Routes

// Get or create user
app.post('/api/users', (req, res) => {
  const { name, email, daily_goal } = req.body;
  db.run(
    `INSERT OR IGNORE INTO users (name, email, daily_goal) VALUES (?, ?, ?)`,
    [name, email, daily_goal || 100],
    function(err) {
      if (err) return res.status(400).json({ error: err.message });
      db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(user);
      });
    }
  );
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  db.get(`SELECT * FROM users WHERE id = ?`, [req.params.id], (err, user) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(user);
  });
});

// Add water usage
app.post('/api/usage', (req, res) => {
  const { user_id, amount, activity } = req.body;
  const date = new Date().toISOString().split('T')[0];
  
  db.run(
    `INSERT INTO usage_logs (user_id, date, amount, activity) VALUES (?, ?, ?, ?)`,
    [user_id, date, amount, activity || 'General'],
    function(err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID, user_id, date, amount, activity });
    }
  );
});

// Get daily usage for user
app.get('/api/usage/daily/:user_id', (req, res) => {
  const date = new Date().toISOString().split('T')[0];
  db.all(
    `SELECT * FROM usage_logs WHERE user_id = ? AND date = ?`,
    [req.params.user_id, date],
    (err, logs) => {
      if (err) return res.status(400).json({ error: err.message });
      const total = logs.reduce((sum, log) => sum + log.amount, 0);
      res.json({ date, logs, total });
    }
  );
});

// Get usage history for user
app.get('/api/usage/history/:user_id', (req, res) => {
  const days = req.query.days || 30;
  db.all(
    `SELECT date, SUM(amount) as total FROM usage_logs WHERE user_id = ? 
     GROUP BY date ORDER BY date DESC LIMIT ?`,
    [req.params.user_id, days],
    (err, data) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json(data);
    }
  );
});

// Get all tips
app.get('/api/tips', (req, res) => {
  db.all(`SELECT * FROM tips`, (err, tips) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(tips);
  });
});

// Get tips by category
app.get('/api/tips/:category', (req, res) => {
  db.all(
    `SELECT * FROM tips WHERE category = ?`,
    [req.params.category],
    (err, tips) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json(tips);
    }
  );
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Water Tracker API is running' });
});

app.listen(PORT, () => {
  console.log(`Water Tracker API running on port ${PORT}`);
});
