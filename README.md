# LawLytics – AI-Powered Legal Case Analysis

A full-stack AI-driven platform for legal case analysis.  
Built with React, Tailwind CSS, Firebase Authentication, Node.js/Express, MongoDB, and Google Gemini AI.

---

## Features
- **Authentication** – Login, Signup, Forgot Password (Firebase Auth)  
- **User Dashboard** – Sidebar navigation, Dark Mode support  
- **Profile Management** – View & update user details with MongoDB persistence
- **Case Analysis** – AI-powered case analysis using Google Gemini
- **Case Management** – Create, edit, delete, and search cases with full CRUD operations
- **Settings Page** – Change password, delete account, notification preferences
- **Landing Page** – Responsive homepage with project branding

---

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Tailwind CSS
- Firebase Authentication
- React Toastify

### Backend
- Node.js / Express
- MongoDB with Mongoose
- Google Gemini AI (for case analysis)
- CORS enabled

---

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Firebase project with Authentication enabled
- Google Gemini API key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd legal-case-ai-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
MONGODB_URI=mongodb://localhost:27017/legal-case-ai
```

4. Start MongoDB (if running locally):
```bash
# On Windows (if MongoDB is installed as a service, it should start automatically)
# On Mac/Linux:
mongod
```

5. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd legal-case-ai-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
REACT_APP_GOOGLE_API_KEY=your_firebase_api_key_here
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

---

## API Endpoints

### Case Analysis
- `POST /api/analyze` - Analyze a legal case using AI

### Cases
- `GET /api/cases?userId=xxx` - Get all cases for a user
- `GET /api/cases/:id` - Get a single case
- `POST /api/cases` - Create a new case
- `PUT /api/cases/:id` - Update a case
- `DELETE /api/cases/:id` - Delete a case

### Profile
- `GET /api/profile?userId=xxx&email=xxx` - Get user profile
- `PUT /api/profile` - Create or update user profile

---

## Project Structure

```
.
├── legal-case-ai-backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── analyzeController.js # AI case analysis
│   │   ├── caseController.js    # Case CRUD operations
│   │   └── profileController.js  # Profile management
│   ├── models/
│   │   ├── Case.js              # Case schema
│   │   └── UserProfile.js       # User profile schema
│   ├── routes/
│   │   ├── analyze.js           # Analysis routes
│   │   ├── cases.js             # Case routes
│   │   └── profile.js          # Profile routes
│   └── server.js                # Express server
│
└── legal-case-ai-frontend/
    ├── src/
    │   ├── components/
    │   │   └── PrivateRoute.js  # Protected route component
    │   ├── pages/
    │   │   ├── Cases.js          # Case management page
    │   │   ├── Dashboard.js      # Main dashboard
    │   │   ├── Home.js           # Landing page
    │   │   ├── Layout.js         # App layout with sidebar
    │   │   ├── Login.js          # Authentication page
    │   │   ├── Profile.js        # User profile page
    │   │   └── Settings.js       # Settings page
    │   └── firebaseConfig.js     # Firebase configuration
    └── package.json
```

---

## Features Completed

✅ MongoDB integration for data persistence  
✅ Full CRUD operations for cases  
✅ User profile management with backend storage  
✅ AI-powered case analysis with Google Gemini  
✅ Save analyzed cases from dashboard  
✅ Change password functionality  
✅ Delete account functionality  
✅ Case search and filtering  
✅ Responsive design with dark mode support  

---

## Notes

- Make sure MongoDB is running before starting the backend
- Ensure Firebase Authentication is properly configured
- The app uses Firebase Auth for authentication and MongoDB for data storage
- All user data is stored securely in MongoDB
