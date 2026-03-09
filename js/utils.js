// MindSpark Utility Functions
// ====================================
// Helper functions for common operations

class Utils {
  
  // ============ STORAGE HELPERS ============
  
  // Save to local storage
  static saveToLocalStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  }

  // Get from local storage
  static getFromLocalStorage(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Error getting from localStorage:', e);
      return null;
    }
  }

  // Remove from local storage
  static removeFromLocalStorage(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from localStorage:', e);
    }
  }

  // ============ UI HELPERS ============
  
  // Show loading spinner
  static showLoader(containerId = 'app') {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `
        <div class="d-flex justify-content-center align-items-center" style="min-height: 300px;">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      `;
    }
  }

  // Show alert
  static showAlert(message, type = 'info', duration = 5000) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(alertDiv, container.firstChild);
    
    if (duration > 0) {
      setTimeout(() => {
        alertDiv.remove();
      }, duration);
    }
  }

  // Show success message
  static showSuccess(message, duration = 3000) {
    this.showAlert(message, 'success', duration);
  }

  // Show error message
  static showError(message, duration = 5000) {
    this.showAlert(message, 'danger', duration);
  }

  // Show warning message
  static showWarning(message, duration = 4000) {
    this.showAlert(message, 'warning', duration);
  }

  // ============ FORM HELPERS ============
  
  // Validate email
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate password (min 6 chars, 1 uppercase, 1 number)
  static isValidPassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  }

  // Get form data as object
  static getFormData(formId) {
    const form = document.getElementById(formId);
    if (!form) return null;
    
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    
    return data;
  }

  // Clear form
  static clearForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
      form.reset();
    }
  }

  // ============ DATE HELPERS ============
  
  // Format date to readable string
  static formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  // Format date and time
  static formatDateTime(date) {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  // Calculate age from birthdate
  static calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  // ============ ARRAY HELPERS ============
  
  // Shuffle array
  static shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Get random item from array
  static getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Remove duplicates from array
  static removeDuplicates(array) {
    return [...new Set(array)];
  }

  // ============ STRING HELPERS ============
  
  // Capitalize first letter
  static capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Slugify string (for URLs)
  static slugify(str) {
    return str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
      .replace(/-+/g, '-');
  }

  // Truncate text
  static truncateText(text, maxLength = 100) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  // ============ NAVIGATION HELPERS ============
  
  // Redirect to page
  static redirectTo(page) {
    window.location.href = page;
  }

  // Go back
  static goBack() {
    window.history.back();
  }

  // Smooth scroll to element
  static smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // ============ MISC HELPERS ============
  
  // Check if user is authenticated
  static async isUserAuthenticated() {
    return new Promise((resolve) => {
      window.auth.onAuthStateChanged(user => {
        resolve(user !== null);
      });
    });
  }

  // Get current user ID
  static async getCurrentUserId() {
    return new Promise((resolve) => {
      window.auth.onAuthStateChanged(user => {
        resolve(user ? user.uid : null);
      });
    });
  }

  // Log event (for analytics)
  static logEvent(eventName, eventData = {}) {
    console.log(`Event: ${eventName}`, eventData);
    // Can be extended with analytics service later
  }
}
