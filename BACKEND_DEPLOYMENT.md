# Backend Deployment Instructions

## Deploy to Render (Recommended - Free)

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub (easiest option)

### Step 2: Create New Web Service
1. Click **New +** → **Web Service**
2. Connect your GitHub repository (`watertracker`)
3. Click **Connect**

### Step 3: Configure Deployment
Fill in the following:
- **Name:** `water-tracker-api`
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Root Directory:** `backend` ← **Important**
- **Region:** Choose closest to you

### Step 4: Add Environment Variables
1. Scroll to **Environment** section
2. Click **Add Environment Variable**
3. Add these:
   - Key: `PORT` → Value: `5000`
   - Key: `NODE_ENV` → Value: `production`
   - Key: `FRONTEND_URL` → Value: `https://your-vercel-url.vercel.app` (replace with your actual Vercel URL)

### Step 5: Deploy
1. Click **Create Web Service**
2. Render will start building automatically
3. Wait for deployment to complete (~3-5 minutes)
4. Copy your API URL (format: `https://water-tracker-api.onrender.com`)

### Step 6: Connect Frontend to Backend
1. Go to Vercel dashboard
2. Select your project → **Settings** → **Environment Variables**
3. Add/Update: `REACT_APP_API_URL` = `https://water-tracker-api.onrender.com`
4. Click **Save** → **Redeploy**

### Step 7: Test Connection
1. Visit your Vercel frontend URL
2. Try logging water usage
3. Check browser console for any CORS or API errors

## Alternative: Railway

1. Go to https://railway.app/new
2. Click **Deploy from GitHub**
3. Select `watertracker` repository
4. Set root directory to `backend`
5. Add environment variables (same as above)
6. Deploy

## Troubleshooting

**"Backend not responding"**
- Check CORS is enabled in server.js (it is by default)
- Verify `FRONTEND_URL` environment variable is set correctly
- Check backend logs in Render/Railway dashboard

**"Database error"**
- SQLite database is created automatically on first run
- Check backend logs for database errors

**"Build failed"**
- Ensure Node.js version is 14+ (set in package.json)
- Check `backend/package.json` has all dependencies
