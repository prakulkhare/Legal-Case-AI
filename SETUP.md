# LawLytics Setup Guide

## Quick Start

### 1. Backend Setup

```bash
cd legal-case-ai-backend
npm install
```

Create `.env` file:
```
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
MONGODB_URI=mongodb://localhost:27017/legal-case-ai
```

**Important:** Make sure MongoDB is running before starting the backend.

Start MongoDB (if local):
- Windows: MongoDB should run as a service
- Mac/Linux: `mongod` or `brew services start mongodb-community`

Start backend:
```bash
npm start
```

### 2. Frontend Setup

```bash
cd legal-case-ai-frontend
npm install
```

Create `.env` file:
```
REACT_APP_GOOGLE_API_KEY=your_firebase_api_key
```

Start frontend:
```bash
npm start
```

### 3. MongoDB Setup

**Option A: Local MongoDB**
- Install MongoDB from https://www.mongodb.com/try/download/community
- Start MongoDB service
- Use connection string: `mongodb://localhost:27017/legal-case-ai`

**Option B: MongoDB Atlas (Cloud)**
- Create account at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string
- Update `.env` with Atlas connection string

### 4. Firebase Setup

1. Go to https://console.firebase.google.com/
2. Create a new project
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
   - Enable Google (optional)
4. Get your Firebase config:
   - Go to Project Settings > General
   - Copy the config values
   - Update `firebaseConfig.js` or use environment variables

### 5. Google Gemini API Setup

1. Go to https://makersuite.google.com/app/apikey
2. Create an API key
3. Add it to backend `.env` as `GEMINI_API_KEY`

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify `.env` file exists and has correct values
- Check if port 5000 is available

### Frontend won't connect to backend
- Verify backend is running on port 5000
- Check CORS settings in `server.js`
- Verify API_URL in frontend files matches backend URL

### MongoDB connection errors
- Verify MongoDB is running
- Check connection string in `.env`
- For Atlas: Check IP whitelist and credentials

### Firebase authentication errors
- Verify Firebase config in `firebaseConfig.js`
- Check if Authentication is enabled in Firebase console
- Verify API key in `.env` matches Firebase project

## Testing the Application

1. Start backend: `cd legal-case-ai-backend && npm start`
2. Start frontend: `cd legal-case-ai-frontend && npm start`
3. Open browser to `http://localhost:3000`
4. Sign up for a new account
5. Try analyzing a case on the Dashboard
6. Save the analyzed case
7. View cases in the Cases page
8. Update your profile
9. Test settings (change password, etc.)

## Production Deployment

### Backend
- Use environment variables for all secrets
- Set up MongoDB Atlas for production database
- Use a process manager like PM2
- Configure CORS for production domain

### Frontend
- Build for production: `npm run build`
- Deploy to hosting service (Vercel, Netlify, etc.)
- Update API_URL to production backend URL
- Configure environment variables in hosting platform
