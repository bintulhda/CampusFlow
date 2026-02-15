// ==================== CONFIGURATION ====================
const API_BASE_URL = 'http://localhost:3000/api/bookings';

// ==================== TOAST NOTIFICATIONS ====================
class Toast {
  static show(title, message, type = 'info', duration = 3000) {
    // Get or create toast container
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    // Icon mapping
    const icons = {
      success: '✓',
      error: '✕',
      info: 'ℹ'
    };

    toast.innerHTML = `
      <div class="toast-icon">${icons[type]}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
    `;

    container.appendChild(toast);

    // Auto remove after duration
    setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  static success(title, message) {
    this.show(title, message, 'success', 3000);
  }

  static error(title, message) {
    this.show(title, message, 'error', 4000);
  }

  static info(title, message) {
    this.show(title, message, 'info', 3000);
  }
}

// ==================== LOADER ====================
class Loader {
  static show(targetId, message = 'Loading...') {
    const target = document.getElementById(targetId);
    if (!target) return;

    target.innerHTML = `
      <div class="empty-state">
        <div class="spinner show"></div>
        <p class="loading-text">${message}</p>
      </div>
    `;
  }

  static hide(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
      const spinner = target.querySelector('.spinner');
      if (spinner) {
        spinner.classList.remove('show');
      }
    }
  }
}

// ==================== API FUNCTIONS ====================

/**
 * Create a new booking
 */
async function createBooking(bookingData) {
  try {
    console.log('[API] Creating booking:', bookingData);

    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to create booking');
    }

    console.log('[API] Booking created successfully:', result.data);
    return {
      success: true,
      data: result.data,
      message: result.message
    };
  } catch (error) {
    console.error('[API] Error creating booking:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Fetch all bookings
 */
async function getAllBookings() {
  try {
    console.log('[API] Fetching all bookings');

    const response = await fetch(`${API_BASE_URL}/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch bookings');
    }

    console.log('[API] Bookings fetched successfully. Count:', result.count);
    return {
      success: true,
      data: result.data || [],
      count: result.count || 0,
      message: result.message
    };
  } catch (error) {
    console.error('[API] Error fetching bookings:', error.message);
    return {
      success: false,
      error: error.message,
      data: []
    };
  }
}

// ==================== FORM VALIDATION ====================

/**
 * Validate booking form
 */
function validateBookingForm(name, date, timeSlot) {
  const errors = [];

  if (!name || name.trim() === '') {
    errors.push('Name is required');
  }

  if (!date || date.trim() === '') {
    errors.push('Date is required');
  }

  if (!timeSlot || timeSlot.trim() === '') {
    errors.push('Time Slot is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Show form message
 */
function showFormMessage(type, title, message) {
  const messageDiv = document.getElementById('formMessage');
  if (!messageDiv) return;

  messageDiv.className = `message ${type}-message show`;
  messageDiv.innerHTML = `
    <div class="message-title">${title}</div>
    <div>${message}</div>
  `;

  // Auto hide after 5 seconds
  setTimeout(() => {
    messageDiv.classList.remove('show');
  }, 5000);
}

/**
 * Clear form message
 */
function clearFormMessage() {
  const messageDiv = document.getElementById('formMessage');
  if (messageDiv) {
    messageDiv.classList.remove('show');
  }
}

// ==================== DATE FORMATTING ====================

/**
 * Format date to readable format
 */
function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
}

/**
 * Format datetime to readable format
 */
function formatDateTime(dateTimeString) {
  try {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return dateTimeString;
  }
}

// ==================== PAGE NAVIGATION ====================

/**
 * Update active nav link
 */
function updateActiveNavLink(pageName) {
  // Remove active class from all links
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('active');
  });

  // Add active class to current page link
  const currentLink = document.querySelector(`nav a[data-page="${pageName}"]`);
  if (currentLink) {
    currentLink.classList.add('active');
  }
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Debounce function for search/filter
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Trim whitespace from input
 */
function trimInput(value) {
  return value.trim();
}

/**
 * Check if API is accessible
 */
async function checkAPIHealth() {
  try {
    console.log('[Health] Checking API health...');
    const response = await fetch('http://localhost:3000/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      console.log('[Health] API is healthy');
      return true;
    }
  } catch (error) {
    console.error('[Health] API health check failed:', error.message);
  }
  return false;
}

// ==================== LOG UTILITIES ====================

/**
 * Log style utilities
 */
const logger = {
  info: (message) => console.log(`[INFO] ${message}`),
  error: (message) => console.error(`[ERROR] ${message}`),
  success: (message) => console.log(`[SUCCESS] ${message}`),
  debug: (message) => console.debug(`[DEBUG] ${message}`)
};

console.log('✓ Script loaded successfully - CampusFlow Frontend');
