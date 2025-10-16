// HRMS Solutions Page JavaScript

// Product specifications data for HRMS solutions
const hrmsProductSpecs = {
  'hrms-1': {
    title: 'Personnel Management',
    pdfUrl: '../docs/hrms/personnel.pdf',
    downloadName: 'Personnel Management Specifications.pdf',
    features: [
      'Complete employee profile management',
      'Document storage and management system',
      'Automated expiry reminders for certificates',
      'Job details and organizational structure'
    ],
    specifications: {
      'Platform': 'Web-based',
      'Features': 'Employee Profiles, Document Management, Expiry Reminders',
      'Integration': 'HRIS, Document Management',
      'Database': 'SQL Server/MySQL',
      'Security': 'SSL/TLS, Role-based Access',
      'Scalability': 'Multi-location Support',
      'Storage': 'Cloud/On-premise'
    }
  },
  'hrms-2': {
    title: 'Attendance & Leave Tracking',
    pdfUrl: '../docs/hrms/attendance.pdf',
    downloadName: 'Attendance & Leave Tracking Specifications.pdf',
    features: [
      'GPS-based mobile check-in system',
      'Geo-fencing for location verification',
      'Automated shift scheduling',
      'Real-time attendance updates'
    ],
    specifications: {
      'Platform': 'Web-based/Mobile',
      'Integration': 'GPS, Biometric Devices, ERP',
      'Database': 'SQL Server/MySQL',
      'Alerts': 'Real-time Notifications',
      'Access': 'Mobile & Desktop',
      'Security': 'SSL/TLS',
      'Scalability': 'Multi-location Support'
    }
  },
  'hrms-3': {
    title: 'Payroll Management',
    pdfUrl: '../docs/hrms/payroll.pdf',
    downloadName: 'Payroll Management Specifications.pdf',
    features: [
      'Multi-currency payroll processing',
      'Direct bank transfer formats',
      'Automated deductions and benefits',
      'Approval workflows and compliance'
    ],
    specifications: {
      'Platform': 'Web-based',
      'Integration': 'ERP, Banking Systems',
      'Database': 'SQL Server/MySQL',
      'Compliance': 'Tax Regulations',
      'Currencies': 'Multi-currency Support',
      'Security': 'SSL/TLS',
      'Reports': 'Payroll Summaries'
    }
  },
  'hrms-4': {
    title: 'Employee Self-Service & Email Notifications',
    pdfUrl: '../docs/hrms/ess.pdf',
    downloadName: 'Employee Self-Service Specifications.pdf',
    features: [
      '24/7 access to payslips and documents',
      'Leave request submission and tracking',
      'Personal information management',
      'Email notifications and alerts'
    ],
    specifications: {
      'Platform': 'Web-based/Mobile',
      'Access': 'Role-based',
      'Features': 'Payslips, Leave Requests, Profile Updates',
      'Security': 'SSL/TLS, Two-factor Authentication',
      'Compatibility': 'iOS, Android, Desktop',
      'Database': 'Cloud/On-premise'
    }
  },
  'hrms-5': {
    title: 'Performance & Recruitment',
    pdfUrl: '../docs/hrms/performance.pdf',
    downloadName: 'Performance & Recruitment Specifications.pdf',
    features: [
      'Performance appraisal tools',
      'Training management system',
      'Budgeting and planning tools',
      'Recruitment planning and tracking'
    ],
    specifications: {
      'Platform': 'Web-based',
      'Features': 'Performance Reviews, Training, Budgeting, Recruitment',
      'Integration': 'HRIS, ATS',
      'Analytics': 'Performance Metrics',
      'Security': 'SSL/TLS',
      'Database': 'Cloud/On-premise'
    }
  },
  'hrms-6': {
    title: 'Reporting & Analytics',
    pdfUrl: '../docs/hrms/reports-analytics.pdf',
    downloadName: 'Reporting & Analytics Specifications.pdf',
    features: [
      'Detailed attendance reports',
      'Payroll analytics and insights',
      'Workforce reports and trends',
      'Graphical dashboards and visualizations'
    ],
    specifications: {
      'Platform': 'Web-based',
      'Reports': 'Customizable, Exportable',
      'Analytics': 'Real-time Dashboards',
      'Integration': 'ERP, HRIS',
      'Security': 'SSL/TLS',
      'Formats': 'PDF, Excel, CSV',
      'Database': 'Cloud/On-premise'
    }
  },
  'hrms-7': {
    title: 'Mobile App iOS/Android',
    pdfUrl: '../docs/hrms/mobileapps.pdf',
    downloadName: 'Mobile App iOS/Android Specifications.pdf',
    features: [
      'Native iOS and Android applications',
      'Full HRMS functionality on mobile',
      'Offline capability and sync',
      'Push notifications and alerts'
    ],
    specifications: {
      'Platform': 'iOS, Android',
      'Features': 'Full HRMS Functionality',
      'Integration': 'Cloud Sync, Push Notifications',
      'Security': 'SSL/TLS, Biometric Login',
      'Compatibility': 'iOS 12+, Android 8+',
      'Database': 'Cloud Sync'
    }
  },
  'hrms-8': {
    title: 'Appraisal Module',
    pdfUrl: '../docs/hrms/appraisal.pdf',
    downloadName: 'Appraisal Module Specifications.pdf',
    features: [
      'Comprehensive performance reviews',
      'Goal setting and tracking',
      'Feedback management system',
      '360-degree review capabilities'
    ],
    specifications: {
      'Platform': 'Web-based',
      'Features': 'Performance Reviews, Goal Setting, 360 Reviews',
      'Integration': 'HRIS, Performance Management',
      'Analytics': 'Performance Metrics',
      'Security': 'SSL/TLS',
      'Database': 'Cloud/On-premise'
    }
  }
};

// Current modal state
let currentModal = null;
let currentPdfUrl = '';
let currentDownloadName = '';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  setupEventListeners();
  setupAnimations();
});

// Setup event listeners
function setupEventListeners() {
  // Modal close on outside click
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('spec-modal')) {
      closeSpecModal();
    }
  });
  
  // Close modal with escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeSpecModal();
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Open specifications modal
function openSpecModal(productId) {
  const product = hrmsProductSpecs[productId];
  if (!product) {
    showNotification('Product specifications not available', 'error');
    return;
  }
  
  currentModal = productId;
  currentPdfUrl = product.pdfUrl;
  currentDownloadName = product.downloadName;
  
  const modal = document.getElementById('specModal');
  const modalTitle = document.getElementById('modalTitle');
  const pdfViewer = document.getElementById('pdfViewer');
  
  // Set modal title
  modalTitle.textContent = product.title;
  
  // Set PDF source
  pdfViewer.src = product.pdfUrl;
  
  // Show modal
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  
  // Add loading state
  pdfViewer.onload = function() {
    pdfViewer.style.opacity = '1';
  };
  
  pdfViewer.onerror = function() {
    showNotification('PDF could not be loaded. Please try downloading instead.', 'error');
  };
}

// Close specifications modal
function closeSpecModal() {
  const modal = document.getElementById('specModal');
  const pdfViewer = document.getElementById('pdfViewer');
  
  modal.classList.remove('show');
  document.body.style.overflow = '';
  
  // Clear PDF source
  pdfViewer.src = '';
  
  // Reset state
  currentModal = null;
  currentPdfUrl = '';
  currentDownloadName = '';
}

// Download PDF
function downloadPDF() {
  if (!currentPdfUrl) {
    showNotification('No PDF available for download', 'error');
    return;
  }
  
  // Create a temporary link element
  const link = document.createElement('a');
  link.href = currentPdfUrl;
  link.download = currentDownloadName;
  link.target = '_blank';
  
  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  showNotification('Download started', 'success');
}

// Setup animations
function setupAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe product cards
  document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
  
  // Observe category headers
  document.querySelectorAll('.category-header').forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(30px)';
    header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(header);
  });
}

// Show notification
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="bi bi-${type === 'error' ? 'exclamation-circle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close" onclick="this.parentElement.remove()">
      <i class="bi bi-x"></i>
    </button>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#01898c'};
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 400px;
    animation: slideInRight 0.3s ease;
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Add CSS for notifications
const notificationStyles = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0;
    font-size: 1.1rem;
  }
  
  .notification-close:hover {
    opacity: 0.8;
  }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Add modal enhancement styles
const modalStyles = `
  .pdf-container iframe {
    transition: opacity 0.3s ease;
    opacity: 0;
  }
  
  .pdf-container iframe[src] {
    opacity: 1;
  }
  
  .modal-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    color: #727376;
  }
  
  .modal-loading i {
    font-size: 2rem;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

// Inject modal styles
const modalStyleSheet = document.createElement('style');
modalStyleSheet.textContent = modalStyles;
document.head.appendChild(modalStyleSheet);

// Product search functionality
function searchProducts(query) {
  const productCards = document.querySelectorAll('.product-card');
  const searchTerm = query.toLowerCase();
  
  productCards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const description = card.querySelector('p').textContent.toLowerCase();
    const features = Array.from(card.querySelectorAll('.feature-tag'))
      .map(tag => tag.textContent.toLowerCase());
    
    const matches = title.includes(searchTerm) || 
                   description.includes(searchTerm) ||
                   features.some(feature => feature.includes(searchTerm));
    
    card.style.display = matches ? 'block' : 'none';
  });
}

// Filter products by category
function filterProducts(category) {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    if (category === 'all') {
      card.style.display = 'block';
    } else {
      // Filter by category based on data attributes
      const cardCategory = card.getAttribute('data-category');
      card.style.display = cardCategory === category ? 'block' : 'none';
    }
  });
}

// Export functions for global access
window.openSpecModal = openSpecModal;
window.closeSpecModal = closeSpecModal;
window.downloadPDF = downloadPDF;
window.searchProducts = searchProducts;
window.filterProducts = filterProducts;