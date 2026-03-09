// Firebase Configuration
// ====================================
// Initialize Firebase for MindSpark

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get Firebase services and expose globally
window.auth = firebase.auth();
window.db = firebase.firestore();
window.storage = firebase.storage();

console.log("Firebase initialized successfully!");
