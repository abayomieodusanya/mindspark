// GitHub Authentication Module
// ====================================
// Handle user registration, login, logout, and profile management via GitHub OAuth

class GitHubAuthManager {
  static backendUrl = window.BACKEND_URL || 'http://localhost:5000';

  // Initiate GitHub OAuth login
  static initiateGitHubLogin() {
    return fetch(`${this.backendUrl}/api/auth/github`)
      .then(response => response.json())
      .then(data => {
        window.location.href = data.url;
      })
      .catch(error => {
        console.error('Login initiation error:', error);
        throw error;
      });
  }

  // Handle OAuth callback (called from redirect)
  static handleOAuthCallback() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const username = params.get('user');

    if (token && username) {
      // Store credentials
      localStorage.setItem('github_token', token);
      localStorage.setItem('github_username', username);
      
      // Load user profile
      return this.getUserProfile(username).then(profile => {
        localStorage.setItem('user_profile', JSON.stringify(profile));
        console.log('User logged in successfully:', username);
        return profile;
      });
    }
    return Promise.reject(new Error('No OAuth code provided'));
  }

  // Get current user from localStorage
  static getCurrentUser() {
    const username = localStorage.getItem('github_username');
    const profile = localStorage.getItem('user_profile');

    if (username && profile) {
      return Promise.resolve(JSON.parse(profile));
    }

    return Promise.resolve(null);
  }

  // Check if user is authenticated
  static isAuthenticated() {
    return !!localStorage.getItem('github_token');
  }

  // Logout user
  static logoutUser() {
    const username = localStorage.getItem('github_username');
    
    // Clear local storage
    localStorage.removeItem('github_token');
    localStorage.removeItem('github_username');
    localStorage.removeItem('user_profile');

    // Notify backend
    if (username) {
      return fetch(`${this.backendUrl}/api/auth/logout`, {
        method: 'POST'
      })
        .then(() => {
          console.log('User logged out');
          window.location.href = '/';
        })
        .catch(error => {
          console.error('Logout error:', error);
          window.location.href = '/';
        });
    }

    return Promise.resolve();
  }

  // Get user profile
  static getUserProfile(username) {
    return fetch(`${this.backendUrl}/api/user/profile?username=${username}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('github_token')}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error getting profile:', error);
        throw error;
      });
  }

  // Update user profile
  static updateUserProfile(updates) {
    const username = localStorage.getItem('github_username');
    
    if (!username) {
      return Promise.reject(new Error('User not authenticated'));
    }

    return fetch(`${this.backendUrl}/api/user/profile?username=${username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('github_token')}`
      },
      body: JSON.stringify(updates)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to update profile: ${response.status}`);
        }
        return response.json();
      })
      .then(profile => {
        // Update local storage
        localStorage.setItem('user_profile', JSON.stringify(profile));
        console.log('User profile updated');
        return profile;
      })
      .catch(error => {
        console.error('Update error:', error);
        throw error;
      });
  }

  // Send password reset email (Not applicable with GitHub OAuth)
  static sendPasswordResetEmail(email) {
    return Promise.reject(new Error('Password reset not available with GitHub OAuth. Please reset through GitHub account settings.'));
  }

  // Update password (Not applicable with GitHub OAuth)
  static updatePassword(newPassword) {
    return Promise.reject(new Error('Password management is handled by GitHub. Please update through GitHub account settings.'));
  }

  // Save assessment results
  static saveAssessmentResults(results) {
    const username = localStorage.getItem('github_username');
    
    if (!username) {
      return Promise.reject(new Error('User not authenticated'));
    }

    return fetch(`${this.backendUrl}/api/assessments/results?username=${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('github_token')}`
      },
      body: JSON.stringify(results)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to save results: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error saving results:', error);
        throw error;
      });
  }

  // Get assessment results
  static getAssessmentResults() {
    const username = localStorage.getItem('github_username');
    
    if (!username) {
      return Promise.reject(new Error('User not authenticated'));
    }

    return fetch(`${this.backendUrl}/api/assessments/results?username=${username}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('github_token')}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch results: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error getting results:', error);
        throw error;
      });
  }
}

// Auto-handle OAuth callback on page load
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  if (params.has('token') && params.has('user')) {
    GitHubAuthManager.handleOAuthCallback()
      .then(() => {
        // Clean up URL
        window.history.replaceState({}, document.title, '/');
      })
      .catch(error => console.error('OAuth callback error:', error));
  }
});
