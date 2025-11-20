# StreamLoop Bot Deployment Guide

## 1. Local Setup
1. Install Node.js.
2. Unzip the downloaded folder.
3. Run `npm install`.
4. If using a local video file, place it in this folder and ensure the name matches what you entered in config (default: `video.mp4`).
5. Run `node server.js` to test.

## 2. Deploy to Render (Free/Paid)
1. Push this folder to a GitHub repository.
2. Go to [dashboard.render.com](https://dashboard.render.com).
3. Click **New +** -> **Web Service**.
4. Connect your GitHub repository.
5. **Runtime**: Select **Docker**.
6. **Region**: Choose the one closest to you.
7. **Instance Type**: Free (for testing) or Starter (for 24/7 reliability).
8. Click **Create Web Service**.

## 3. Deploy to Railway
1. Install Railway CLI or go to [railway.app](https://railway.app).
2. Create a new project from GitHub repo.
3. Railway will automatically detect the Dockerfile and deploy.

## 4. Environment Variables
If you didn't hardcode them in the generator, add these in your cloud dashboard:
- `STREAM_KEY`: Your YouTube/Twitch Stream Key
