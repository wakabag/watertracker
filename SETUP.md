# Water Tracker - Development Setup

## Quick Start Guide

### 1. Backend Setup (Terminal 1)

```bash
cd backend
npm install
npm start
```

Expected output:
```
Connected to SQLite database
Water Tracker API running on port 5000
```

### 2. Frontend Setup (Terminal 2)

```bash
cd frontend
npm install
npm start
```

The app will automatically open at `http://localhost:3000`

## How to Use

1. **Dashboard** (Right side):
   - Shows daily water usage
   - Displays progress toward daily goal
   - View 7-day history

2. **Water Logger** (Left side):
   - Select activity type from dropdown
   - Enter gallons used (or use suggested amount)
   - Click "Log Usage" to save

3. **Tips Section** (Bottom):
   - Browse water conservation tips
   - Learn about everyday water usage
   - Get actionable recommendations

## File Structure

```
water-tracker/
├── backend/
│   ├── server.js           # Express API with SQLite
│   ├── package.json        # Node dependencies
│   └── water_tracker.db    # SQLite database (auto-created)
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js          # Main component
│   │   ├── index.css       # Styling
│   │   ├── index.js        # Entry point
│   │   └── components/
│   │       ├── Dashboard.js
│   │       ├── WaterLogger.js
│   │       └── TipsSection.js
│   └── package.json
│
└── README.md               # Project documentation
```

## API Documentation

### Users
- `POST /api/users` - Create user
- `GET /api/users/:id` - Get user

### Usage Tracking
- `POST /api/usage` - Log water usage
- `GET /api/usage/daily/:user_id` - Get daily total
- `GET /api/usage/history/:user_id` - Get 30-day history

### Tips
- `GET /api/tips` - All tips
- `GET /api/tips/:category` - Tips by category

## Features Implemented

✅ Real-time water usage tracking
✅ Daily progress dashboard
✅ Activity-based logging
✅ 7-day usage history
✅ Water conservation tips
✅ Responsive design
✅ Local storage for user persistence
✅ SQLite database integration

## Troubleshooting

**Port 5000 already in use?**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Database not created?**
Backend automatically creates `water_tracker.db` on first run

**CORS error?**
Frontend is configured with proxy in `package.json` to communicate with backend

## Next Steps

- Add user authentication
- Create monthly reports
- Add water meter integration
- Build mobile app
- Add AI recommendations
- Implement gamification
