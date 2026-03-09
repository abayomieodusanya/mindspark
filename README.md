# MindSpark - Career Discovery Platform

A comprehensive web platform designed to help pre-teens and teenagers discover their ideal career paths through assessments, learning resources, and mentorship.

## 🎯 Project Vision

MindSpark empowers young people to:
- Understand their personality, strengths, and weaknesses
- Explore career options that match their profile
- Learn from curated educational content
- Connect with mentors and peers
- Build confidence in their career decisions

## 🚀 Quick Start

### 1. Clone & Setup
```bash
git clone https://github.com/abayomieodusanya/mindspark.git
cd mindspark
```

### 2. Firebase Setup (IMPORTANT!)
Follow **FIREBASE_SETUP.md** to:
1. Create a Firebase project
2. Get your Firebase credentials
3. Update `js/firebase-config.js` with your config

### 3. Open in Browser
```
index.html          - Homepage
signup.html         - Register (requires Firebase setup)
login.html          - Login
assessment.html     - Career assessment quiz
dashboard.html      - User dashboard
```

## 📂 Project Structure

```
mindspark/
├── index.html               # Landing page
├── signup.html             # User registration
├── login.html              # User login
├── assessment.html         # Career assessment (30 questions)
├── dashboard.html          # User dashboard
├── blog.html               # Blog (coming soon)
├── careers.html            # Career paths (coming soon)
├── videos.html             # Video library (coming soon)
├── mentors.html            # Mentor network (coming soon)
├── community.html          # Community forum (coming soon)
│
├── js/
│   ├── firebase-config.js   # 🔥 Firebase setup (EDIT THIS!)
│   ├── firebase-auth.js     # Authentication functions
│   ├── firebase-db.js       # Database operations
│   ├── constants.js         # Global constants
│   ├── utils.js             # Utility functions
│   ├── app.js               # Main app logic
│   └── bootstrap.js         # Bootstrap scripts
│
├── css/
│   ├── style.css            # Main styles
│   ├── bootstrap.css        # Bootstrap framework
│   ├── bootstrap-grid.css   # Grid system
│   └── responsiveness.css   # Mobile-responsive styles
│
├── Assets/                  # Images & videos
│
├── FIREBASE_SETUP.md        # 📖 Firebase setup guide
├── PROJECT_GUIDE.md         # 📋 Detailed project guide
└── README.md               # This file
```

## ✨ Features

### ✅ Completed (Phase 1)
- **Authentication System**
  - User signup with validation
  - Email/password login
  - Password reset
  - User profiles

- **Career Assessment**
  - Personality Assessment (10 questions)
  - Skills & Interests Inventory (10 questions)
  - Aptitude Test (10 questions)
  - Result analysis & career recommendations
  - Results saved to Firebase

- **Application Framework**
  - Firebase integration
  - Responsive Bootstrap UI
  - Utility functions
  - Database schema

### 🔄 In Development (Phase 2-3)
- Blog with articles
- Career path database
- Video library
- Mentor matching
- Community forum
- User dashboard
- Progress tracking

## 🔐 Authentication

### Sign Up Flow
1. User fills signup form (name, email, age, grade)
2. System validates input (email format, password strength)
3. Firebase creates user account
4. User profile stored in Firestore
5. User redirected to dashboard

### Sign In Flow
1. User enters email & password
2. Firebase authenticates credentials
3. User session created
4. Access to protected pages

## 📊 Assessment System

### Assessment Types
1. **Personality Assessment** - 10 questions about personality traits
2. **Skills & Interests** - 10 questions about capabilities and interests
3. **Aptitude Test** - 10 questions measuring logical/mathematical abilities

### Result Generation
- Calculates scores and personality type
- Identifies strengths and weaknesses
- Recommends matching careers
- Saves to Firebase for tracking

## 🗄️ Database Structure

### Users Collection
```javascript
{
  fullName: "John Doe",
  email: "john@example.com",
  age: 16,
  grade: "Grade 10",
  interests: ["Technology", "Science"],
  assessmentResults: [
    {
      type: "personality",
      score: 85,
      personalityType: "Extrovert",
      strengths: ["Leadership", "Communication"],
      weaknesses: ["Detail-oriented work"],
      recommendedCareers: ["Sales", "Marketing"],
      completedDate: timestamp
    }
  ]
}
```

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Bootstrap 5
- **Backend**: Firebase (BaaS)
  - Authentication
  - Firestore Database
  - Cloud Storage
- **Icons**: Font Awesome 5
- **API**: YouTube (for video integration)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚨 Important Setup Steps

### Step 1: Firebase Configuration ⚠️
Edit `js/firebase-config.js` and add your Firebase credentials:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};
```

### Step 2: Firestore Security Rules
Update security rules in Firebase Console for production:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    match /blog/{document=**} {
      allow read: if true;
    }
  }
}
```

### Step 3: Test Locally
- Open `index.html` in browser
- Check browser console (F12) for Firebase initialization message
- Test authentication flow: signup → login → assessment

## 📈 Development Roadmap

| Phase | Timeline | Features | Status |
|-------|----------|----------|--------|
| 1 | Week 1-2 | Auth, Assessment, DB Schema | ✅ Complete |
| 2 | Week 3-4 | Blog, Videos, Career Paths | ⏳ Pending |
| 3 | Week 5-6 | Dashboard, Mentors, Community | ⏳ Pending |
| 4 | Week 7-8 | Testing, Optimization, Deploy | ⏳ Pending |

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📞 Support

For issues or questions:
1. Check `PROJECT_GUIDE.md` for detailed documentation
2. Review `FIREBASE_SETUP.md` for Firebase-related issues
3. Check browser console (F12) for error messages
4. Verify Firebase configuration is correct

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💼 Author

Created by [Your Name] - March 2026

## 🙏 Acknowledgments

- Bootstrap team for the CSS framework
- Firebase for the backend infrastructure
- Font Awesome for icons
- All contributors and testers

---

**Last Updated**: March 9, 2026  
**Version**: 1.0 - Foundation Complete  
**Next Update**: Phase 2 Development
