# Water Tracker - Deployment Guide

## Quick Deployment Options

### Option 1: Deploy to Vercel (Frontend Only - Easiest)

**Requirements:**
- Vercel account (free at vercel.com)
- GitHub repository (already done ✓)

**Steps:**

1. **Connect Vercel to GitHub:**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your `watertracker` repository
   - Select `frontend` as the root directory

2. **Configure Environment:**
   - Set `REACT_APP_API_URL` = `https://your-backend-url.com`
   - (Leave empty initially, update after backend deployment)

3. **Deploy:**
   - Click "Deploy"
   - Your frontend will be live in ~1 minute
   - Get your Vercel URL (e.g., `https://water-tracker-123.vercel.app`)

---

### Option 2: Deploy Backend to Render (Recommended)

**Requirements:**
- Render account (free at render.com)
- GitHub repository (already done ✓)

**Steps:**

1. **Update Backend for Production:**
   - Add `.gitignore` to backend folder (see below)
   - Commit changes to GitHub

2. **Create Web Service on Render:**
   - Go to https://render.com/dashboard
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** `water-tracker-api`
     - **Root Directory:** `backend`
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Environment:** Node

3. **Add Environment Variables:**
   - `PORT` = `5000` (or leave default)
   - `NODE_ENV` = `production`

4. **Deploy:**
   - Click "Create Web Service"
   - Render will automatically deploy
   - Get your API URL (e.g., `https://water-tracker-api.onrender.com`)

5. **Update Frontend:**
   - Update Vercel environment variable:
     - `REACT_APP_API_URL` = `https://water-tracker-api.onrender.com`

---

### Option 3: Deploy to Railway (Quick & Simple)

**Requirements:**
- Railway account (free at railway.app)
- GitHub repository (already done ✓)

**Steps:**

1. **Setup Backend:**
   - Go to https://railway.app/dashboard
   - Click "Create New Project"
   - Select "Deploy from GitHub"
   - Choose your `watertracker` repository
   - Select `backend` directory

2. **Configure:**
   - Set environment variables in Railway dashboard
   - Railway auto-detects Node.js

3. **Deploy Frontend:**
   - Create separate Railway project for frontend
   - Or use Vercel (simpler for React)

---

### Option 4: Deploy to Heroku (Traditional)

**Requirements:**
- Heroku account (free tier being phased out, but still available)
- Heroku CLI

**Steps:**

```bash
# Login to Heroku
heroku login

# Create app
heroku create water-tracker-api

# Set buildpack
heroku buildpacks:set heroku/nodejs

# Deploy
git push heroku main
```

---

## Database Deployment

### Option A: Keep SQLite (Simple for Testing)
- Database automatically stored in backend
- **Pros:** No additional setup
- **Cons:** Data lost on server restart

### Option B: Migrate to PostgreSQL (Production)

**Steps:**

1. **Create PostgreSQL Database:**
   - Free: ElephantSQL (small.elephantsql.com)
   - Or: Railway/Render built-in PostgreSQL

2. **Update Backend Code:**

```bash
npm install pg
```

Update `backend/server.js`:
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Replace sqlite3 calls with pool queries
```

3. **Add Environment Variable:**
   - `DATABASE_URL` = PostgreSQL connection string

---

## Complete Deployment Checklist

```
Frontend (Vercel):
- [ ] Push code to GitHub
- [ ] Create Vercel account
- [ ] Import GitHub repository
- [ ] Set environment variables
- [ ] Deploy

Backend (Render/Railway):
- [ ] Create .gitignore file
- [ ] Push to GitHub
- [ ] Create account on Render/Railway
- [ ] Configure deployment
- [ ] Set environment variables
- [ ] Deploy

Integration:
- [ ] Copy backend URL
- [ ] Update frontend environment variables
- [ ] Test API connectivity
- [ ] Update GitHub with new config
```

---

## Environment Variables Setup

**Frontend (.env or Vercel):**
```
REACT_APP_API_URL=https://your-backend-url.com
```

**Backend (.env or platform):**
```
PORT=5000
NODE_ENV=production
DATABASE_URL=postgresql://... (if using PostgreSQL)
```

---

## Testing After Deployment

1. **Check Backend:**
   ```
   curl https://your-backend-url.com/api/health
   ```

2. **Check Frontend:**
   - Visit your Vercel URL
   - Try logging water usage
   - Verify API calls work

---

## Cost Breakdown (Monthly)

| Service | Free Tier | Notes |
|---------|-----------|-------|
| Vercel (Frontend) | ✓ Free | Unlimited bandwidth |
| Render (Backend) | ✓ Free | May spin down after 15 min inactivity |
| Railway | ✓ $5 credit | Then ~$5/month |
| ElephantSQL DB | ✓ Free tier | 20MB PostgreSQL |
| **Total** | **Free** | Upgrade as needed |

---

## Quick Start Script

Create `deploy.sh` to automate deployment:

```bash
#!/bin/bash

# Push to GitHub
git add .
git commit -m "Deploy: $(date)"
git push origin main

# Vercel auto-deploys from GitHub
echo "✓ Frontend deploying to Vercel..."

# Render auto-deploys from GitHub
echo "✓ Backend deploying to Render..."

echo "Deployment complete!"
```

---

## Troubleshooting

**"Backend not responding"**
- Check CORS settings in `backend/server.js`
- Verify `REACT_APP_API_URL` is correct
- Check backend logs on Render/Railway

**"Database errors"**
- SQLite: Check file permissions
- PostgreSQL: Verify connection string

**"Build failures"**
- Check Node.js version compatibility
- Run `npm install` locally to test
- Review deployment logs

---

## Next Steps

1. **Choose a deployment platform** (recommended: Vercel + Render)
2. **Prepare your code:**
   ```bash
   cd c:\Users\ADMN\Desktop\sdg\water-tracker
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```
3. **Follow the platform-specific steps** above
4. **Test your live app**
5. **Share your app link!**

---

## Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://docs.render.com
- **Railway Docs:** https://docs.railway.app
