# 🔐 Firebase Credentials Setup - Visual Guide

## Quick Credential Extraction Steps

### 1. Open Firebase Console
Go to: https://console.firebase.google.com/

### 2. Select Your MindSpark Project
Click on your "mindspark" project

### 3. Go to Project Settings
- Click the **⚙️ gear icon** at the top (next to "Project Overview")
- Click **"Project settings"**

### 4. Navigate to Your Web App
- Click the **"General"** tab
- Scroll down to find your registered web app (should be named something like "MindSpark Web")
- If you don't see one, click **"Add app"** → **"Web"** and follow the setup

### 5. Copy Your Config
Click the **"Copy"** icon next to the Firebase config code block
You'll see something like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDs3xmE1234567890abcdefghijklmnop",
  authDomain: "mindspark-xxxxx.firebaseapp.com",
  projectId: "mindspark-xxxxx",
  storageBucket: "mindspark-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

### 6. Update firebase-config.js
1. Open `js/firebase-config.js` in your editor
2. Replace the placeholder values with your actual credentials
3. Save the file

## 🛡️ Security Best Practices

⚠️ **IMPORTANT**: Your API key is semi-public (it's in your HTML)
- This is NORMAL for Firebase - protection comes from Firestore security rules
- Set up proper security rules in Firebase Console before going to production
- Never commit real credentials to GitHub - use environment variables instead

## ✅ Verify Setup Works

1. Open your website in a browser
2. Press **F12** to open developer console
3. You should see: **"Firebase initialized successfully!"**
4. If you see errors about credentials, double-check your config

## 🚀 Next Steps After Firebase Setup

Once you see "Firebase initialized successfully!":
1. ✅ Test signup.html - create a test account
2. ✅ Test login.html - sign in with your test account
3. ✅ Test assessment.html - take the assessment
4. ✅ Check Firebase Console → Firestore → see your test data

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Firebase is not defined" | Check if SDK script tags loaded in HTML |
| Auth errors in console | Verify Email/Password enabled in Firebase Console |
| Can't save to Firestore | Check security rules allow authenticated writes |
| CORS errors | Happens usually with API key issues - re-verify config |

## Firebase Console Locations

### Enable Authentication
- Firebase Console → Authentication → Sign-in method
- Enable **Email/Password**

### Check Firestore
- Firebase Console → Firestore Database
- See your "users" collection with test data

### View Security Rules
- Firestore Database → Rules tab
- Modify rules for your use case

---

Once you've updated `js/firebase-config.js` with your real credentials and verified it works, reply with "✅ Firebase is running!" and we'll move to the next features.
