# 💧 Water Tracker - SDG 6: Clean Water and Sanitation

A full-stack web application designed to help households track daily water usage, learn conservation tips, and contribute to Sustainable Development Goal 6: Clean Water and Sanitation.

## 🎯 Project Overview

Water Tracker is an innovative solution that empowers users to:
- **Monitor** daily water consumption in real-time
- **Track** usage patterns over 30 days
- **Learn** practical conservation tips
- **Reduce** household water waste
- **Contribute** to clean water availability for all

## ✨ Features

### Dashboard
- Real-time daily water usage tracking
- Progress visualization (% of daily goal)
- Statistics on usage, goal, and remaining water
- 7-day usage history
- Refresh functionality for live updates

### Water Logger
- Easy-to-use logging interface
- Pre-configured activity types (shower, toilet, laundry, dishes, etc.)
- Typical usage suggestions for each activity
- Custom amount entry in gallons
- Instant logging with confirmation

### Tips & Education
- 5+ conservation tips covering:
  - Bathroom habits (shorter showers, efficient toilets)
  - Maintenance (leak detection)
  - Laundry optimization
  - Outdoor watering
- Tips organized by category
- Actionable recommendations with impact metrics

## 🏗️ Architecture

### Backend (Node.js + Express)
```
backend/
├── server.js          # Express API server
├── package.json       # Dependencies
└── .env              # Environment variables
```

**Database**: SQLite with 3 tables:
- `users` - User profiles with daily goals
- `usage_logs` - Water usage records
- `tips` - Conservation tips library

**API Endpoints**:
- `POST /api/users` - Create/retrieve user
- `GET /api/users/:id` - Get user details
- `POST /api/usage` - Log water usage
- `GET /api/usage/daily/:user_id` - Daily total usage
- `GET /api/usage/history/:user_id` - Historical data
- `GET /api/tips` - All conservation tips
- `GET /api/tips/:category` - Tips by category

### Frontend (React)
```
frontend/
├── src/
│   ├── App.js              # Main app component
│   ├── index.js            # Entry point
│   ├── index.css           # Styling
│   └── components/
│       ├── Dashboard.js    # Daily stats view
│       ├── WaterLogger.js  # Usage logging
│       └── TipsSection.js  # Tips display
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 14+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The API will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React app:
```bash
npm start
```

The app will open at `http://localhost:3000`

## 📊 Usage

1. **Initialize**: The app automatically creates a user on first visit
2. **Log Usage**: Select activity type and enter gallons used
3. **View Stats**: Dashboard shows daily progress vs. goal
4. **Learn Tips**: Read conservation tips to reduce consumption
5. **Track History**: Monitor usage trends over 30 days

## 🔧 Development

### Adding New Tips
Edit `backend/server.js` and add entries to the tips initialization:
```javascript
db.run(`INSERT INTO tips (title, description, category) VALUES (?, ?, ?)`)
```

### Modifying Daily Goal
Update user's daily goal via API or database:
```javascript
UPDATE users SET daily_goal = 120 WHERE id = 1;
```

### Database Schema
All data is stored in `backend/water_tracker.db` (created automatically)

## 📈 Future Enhancements

- [ ] User authentication and profiles
- [ ] Goal setting and customization
- [ ] Monthly/yearly reports with charts
- [ ] AI-powered usage recommendations
- [ ] Integration with smart water meters
- [ ] Gamification (badges, challenges)
- [ ] Community leaderboards
- [ ] Export data to CSV
- [ ] Mobile app version
- [ ] Push notifications for high usage

## 🌍 SDG 6 Impact

This app directly supports:
- **Goal 6.4**: Increase water-use efficiency and reduce scarcity
- **Goal 6.b**: Protect and restore water-related ecosystems
- **Goal 6.5**: Implement integrated water resource management

By helping households understand and reduce their water consumption, we contribute to:
- Reducing strain on freshwater resources
- Promoting sustainable water management
- Raising awareness about water scarcity

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests to improve the app.

## 📧 Support

For questions or issues, please open an issue on the project repository.

---

**Made with 💚 for SDG 6: Clean Water and Sanitation**
