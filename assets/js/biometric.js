// Biometric Attendance System Page JavaScript

// Product specifications data for biometric solutions
const biometricProductSpecs = {
  'bio-800': {
    title: 'TimeTech 800',
    pdfUrl: '/docs/biometric/800.pdf',
    downloadName: 'TimeTech 800 Specifications.pdf',
    features: [
      'High-precision fingerprint recognition',
      'Large user capacity up to 50,000 users',
      'Network connectivity with WiFi and Ethernet',
      'Multi-language support',
      'Anti-spoofing technology',
      'Comprehensive attendance management'
    ],
    specifications: {
      'Display': '3.5" Color Touchscreen',
      'User Capacity': '50,000 users',
      'Fingerprint Sensor': 'Optical sensor with anti-spoofing',
      'Connectivity': 'WiFi, Ethernet, USB',
      'Memory': '8GB internal storage',
      'Power': 'DC 12V adapter',
      'Dimensions': '180 x 120 x 40 mm',
      'Operating System': 'Linux-based',
      'Languages': 'Multi-language support',
      'Certifications': 'CE, FCC, RoHS'
    }
  },
  'bio-eris': {
    title: 'TimeTech Eris',
    pdfUrl: '/docs/biometric/eris.pdf',
    downloadName: 'TimeTech Eris Specifications.pdf',
    features: [
      'Compact and space-saving design',
      'Easy setup and installation',
      'Cost-effective solution for small businesses',
      'Reliable fingerprint technology',
      'USB connectivity for simple integration',
      'Multi-language support'
    ],
    specifications: {
      'Display': '2.8" Color Display',
      'User Capacity': '10,000 users',
      'Fingerprint Sensor': 'Optical sensor',
      'Connectivity': 'USB 2.0',
      'Memory': '2GB internal storage',
      'Power': 'USB powered',
      'Dimensions': '120 x 80 x 30 mm',
      'Operating System': 'Embedded Linux',
      'Languages': 'Multi-language support',
      'Certifications': 'CE, FCC'
    }
  },
  'bio-jupiter': {
    title: 'TimeTech Jupiter',
    pdfUrl: '/docs/biometric/jupiter.pdf',
    downloadName: 'TimeTech Jupiter Specifications.pdf',
    features: [
      'Enterprise-grade biometric system',
      'Large user capacity up to 100,000 users',
      'Advanced reporting and analytics',
      'Cloud synchronization capabilities',
      'Scalable architecture',
      'High-resolution fingerprint sensor'
    ],
    specifications: {
      'Display': '4.3" Color Touchscreen',
      'User Capacity': '100,000 users',
      'Fingerprint Sensor': 'High-resolution optical',
      'Connectivity': 'WiFi, Ethernet, 4G',
      'Memory': '32GB internal storage',
      'Power': 'DC 12V adapter',
      'Dimensions': '200 x 150 x 50 mm',
      'Features': 'Advanced reporting, cloud sync',
      'Operating System': 'Android 9.0',
      'Certifications': 'CE, FCC, RoHS'
    }
  },
  'bio-k30': {
    title: 'TimeTech K30',
    pdfUrl: '/docs/biometric/k30.pdf',
    downloadName: 'TimeTech K30 Specifications.pdf',
    features: [
      'Dual authentication support',
      'High security for sensitive environments',
      'Professional-grade construction',
      'Robust and reliable operation',
      'Fingerprint and card authentication',
      'Network connectivity options'
    ],
    specifications: {
      'Display': '3.5" Color Touchscreen',
      'User Capacity': '30,000 users',
      'Authentication': 'Fingerprint + Card',
      'Fingerprint Sensor': 'Optical sensor',
      'Card Reader': '125kHz proximity',
      'Connectivity': 'WiFi, Ethernet, USB',
      'Memory': '16GB internal storage',
      'Power': 'DC 12V adapter',
      'Dimensions': '160 x 100 x 45 mm',
      'Operating System': 'Linux-based',
      'Certifications': 'CE, FCC, RoHS'
    }
  },
  'bio-magnum': {
    title: 'TimeTech Magnum',
    pdfUrl: '/docs/biometric/magnum.pdf',
    downloadName: 'TimeTech Magnum Specifications.pdf',
    features: [
      'Premium biometric attendance system',
      'Maximum user capacity up to 200,000 users',
      'Cutting-edge technology',
      'Advanced reporting capabilities',
      'AI-powered analytics',
      'Cloud integration support'
    ],
    specifications: {
      'Display': '7" Color Touchscreen',
      'User Capacity': '200,000 users',
      'Fingerprint Sensor': 'High-precision optical',
      'Connectivity': 'WiFi, Ethernet, 4G',
      'Memory': '64GB internal storage',
      'Power': 'DC 12V adapter',
      'Dimensions': '250 x 180 x 60 mm',
      'Features': 'AI-powered analytics, cloud integration',
      'Operating System': 'Android 11',
      'Certifications': 'CE, FCC, RoHS, ISO 27001'
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
  const product = biometricProductSpecs[productId];
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
  .spec-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
  
  .spec-modal.show {
    opacity: 1;
    visibility: visible;
  }
  
  .modal-content {
    background: white;
    border-radius: 12px;
    width: 90%;
    max-width: 1000px;
    max-height: 90vh;
    overflow: hidden;
    transform: scale(0.9);
    transition: transform 0.3s ease;
  }
  
  .spec-modal.show .modal-content {
    transform: scale(1);
  }
  
  .modal-header {
    padding: 20px 30px;
    border-bottom: 1px solid #e9ecef;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8f9fa;
  }
  
  .modal-header h3 {
    margin: 0;
    color: #333;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  .modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #666;
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
    transition: all 0.2s ease;
  }
  
  .modal-close:hover {
    background: #e9ecef;
    color: #333;
  }
  
  .modal-body {
    padding: 0;
  }
  
  .pdf-container {
    position: relative;
    width: 100%;
    height: 600px;
  }
  
  .pdf-container iframe {
    width: 100%;
    height: 100%;
    border: none;
    transition: opacity 0.3s ease;
    opacity: 0;
  }
  
  .pdf-container iframe[src] {
    opacity: 1;
  }
  
  .modal-footer {
    padding: 20px 30px;
    border-top: 1px solid #e9ecef;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    background: #f8f9fa;
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
  
  @media (max-width: 768px) {
    .modal-content {
      width: 95%;
      margin: 20px;
    }
    
    .modal-header,
    .modal-footer {
      padding: 15px 20px;
    }
    
    .pdf-container {
      height: 400px;
    }
    
    .modal-footer {
      flex-direction: column;
    }
    
    .modal-footer .btn {
      width: 100%;
    }
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