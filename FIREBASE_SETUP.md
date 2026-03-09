# MindSpark Firebase Setup Guide

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter project name: `mindspark` (or your preferred name)
4. Follow the setup wizard:
   - Enable Google Analytics (optional but recommended)
   - Select or create a Google Cloud project
   - Click **"Create project"**

## Step 2: Register Your Web App

1. Once project is created, click the **"</>‎"** (Web) icon to register a web app
2. Enter app name: `MindSpark Web`
3. Check **"Also set up Firebase Hosting"** (optional, for deployment)
4. Click **"Register app"**
5. Copy the Firebase configuration (it will look like this):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDs3xmE...",
  authDomain: "mindspark-xxxxx.firebaseapp.com",
  projectId: "mindspark-xxxxx",
  storageBucket: "mindspark-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxxxxxxxxxx"
};
```

## Step 3: Update firebase-config.js

1. Open `js/firebase-config.js`
2. Replace the placeholder values with your actual Firebase config from Step 2
3. Save the file

## Step 4: Enable Authentication Methods

In Firebase Console:

1. Go to **Authentication** → **Sign-in method**
2. Enable:
   - **Email/Password**
   - **Google** (optional for social login)
3. Click **Save**

## Step 5: Set Up Firestore Database

1. Go to **Firestore Database**
2. Click **"Create database"**
3. Choose: **Start in production mode**
4. Select region (closest to your users)
5. Click **"Create"**

### Update Firestore Security Rules (for testing):

Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write for authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Allow public read for blog and videos
    match /blog/{document=**} {
      allow read: if true;
    }
    
    match /videos/{document=**} {
      allow read: if true;
    }
    
    match /careerPaths/{document=**} {
      allow read: if true;
    }
    
    match /mentors/{document=**} {
      allow read: if true;
    }
  }
}
```

## Step 6: Set Up Storage (for file uploads)

1. Go to **Storage**
2. Click **"Get started"**
3. Choose: **Start in production mode**
4. Select same region as Firestore
5. Click **"Done"**

## Step 7: Test the Setup

1. Open your `index.html` in the browser
2. Open Browser Console (F12 → Console)
3. You should see: **"Firebase initialized successfully!"**

If you see errors, verify:
- Firebase SDK is loaded (check Network tab)
- Configuration values are correct
- Internet connection is active

## Step 8: (Optional) Enable Hosting

For Free hosting with Firebase:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Firebase is not defined" | Check if SDK script tags loaded correctly |
| Auth errors | Enable Email/Password in Authentication settings |
| Firestore errors | Check security rules and user authentication |
| CORS errors | Ensure you're using Firebase SDK, not direct API calls |

---

## Next Steps

Once Firebase is set up:
1. Create authentication pages (signup, login)
2. Build the assessment quiz module
3. Set up results storage and retrieval
4. Create blog content management
5. Build community features

Good luck! 🚀
