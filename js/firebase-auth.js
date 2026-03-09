// Firebase Authentication Module
// ====================================
// Handle user registration, login, logout, and profile management

class AuthManager {
  // Register a new user
  static registerUser(email, password, userData = {}) {
    return window.auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        
        // Create user profile in Firestore
        return window.db.collection('users').doc(user.uid).set({
          uid: user.uid,
          email: email,
          fullName: userData.fullName || '',
          age: userData.age || null,
          grade: userData.grade || '',
          interests: userData.interests || [],
          assessmentResults: [],
          createdAt: new Date(),
          ...userData
        }).then(() => {
          console.log('User registered successfully:', user.email);
          return user;
        });
      })
      .catch(error => {
        console.error('Registration error:', error.message);
        throw error;
      });
  }

  // Login user
  static loginUser(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log('User logged in:', userCredential.user.email);
        return userCredential.user;
      })
      .catch(error => {
        console.error('Login error:', error.message);
        throw error;
      });
  }

  // Logout user
  static logoutUser() {
    return window.auth.signOut()
      .then(() => {
        console.log('User logged out');
      })
      .catch(error => {
        console.error('Logout error:', error.message);
        throw error;
      });
  }

  // Get current user
  static getCurrentUser() {
    return new Promise((resolve, reject) => {
      window.auth.onAuthStateChanged(user => {
        resolve(user);
      }, error => {
        reject(error);
      });
    });
  }

  // Update user profile
  static updateUserProfile(userId, updates) {
    return window.db.collection('users').doc(userId).update(updates)
      .then(() => {
        console.log('User profile updated');
      })
      .catch(error => {
        console.error('Update error:', error.message);
        throw error;
      });
  }

  // Get user profile data
  static getUserProfile(userId) {
    return window.db.collection('users').doc(userId).get()
      .then(doc => {
        if (doc.exists) {
          return doc.data();
        } else {
          console.log('No user profile found');
          return null;
        }
      })
      .catch(error => {
        console.error('Error getting profile:', error.message);
        throw error;
      });
  }

  // Send password reset email
  static sendPasswordResetEmail(email) {
    return window.auth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('Password reset email sent');
      })
      .catch(error => {
        console.error('Reset email error:', error.message);
        throw error;
      });
  }
}
