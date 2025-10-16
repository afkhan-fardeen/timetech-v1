// RFID Solutions Page JavaScript

// Product specifications data for RFID solutions
const rfidProductSpecs = {
  'rfid-1': {
    title: 'High-Performance Mobile UHF RFID Reader',
    pdfUrl: '../docs/rfid/rfid-terminal.pdf',
    downloadName: 'Mobile UHF RFID Reader Specifications.pdf',
    features: [
      'Fast and accurate RFID and barcode data collection',
      'Android-based OS for intuitive operation',
      'Rugged design for field operations',
      'High-speed scanning up to 1000 tags/sec',
      'IP54 sealing for dust and water resistance',
      'Long-lasting battery for extended use'
    ],
    specifications: {
      'OS': 'Android 10',
      'Display': '4.3" Touchscreen',
      'Read Rate': 'Up to 1000 tags/sec',
      'Protection': 'IP54',
      'Battery': '8000mAh',
      'Connectivity': 'WiFi, Bluetooth 5.0, 4G',
      'Dimensions': '200 x 80 x 25mm',
      'Weight': '0.6kg'
    }
  },
  'rfid-2': {
    title: 'Fixed Antennas & Reader System',
    pdfUrl: '../docs/rfid/RFID-FIXED-ANTENNAS.pdf',
    downloadName: 'Fixed RFID Antennas Specifications.pdf',
    features: [
      'Continuous scanning for gates and conveyor belts',
      'Real-time location tracking',
      'Industrial-grade reliability for 24/7 operation',
      'Power over Ethernet (PoE) support',
      'Multi-antenna configuration for wide coverage'
    ],
    specifications: {
      'Read Range': 'Up to 15m',
      'Antenna Ports': '4',
      'Power': 'PoE (802.3af)',
      'Connectivity': 'Ethernet, WiFi',
      'Protection': 'IP65',
      'Operating Temp': '-20°C to +60°C',
      'Dimensions': '300 x 200 x 50mm',
      'Weight': '2.5kg'
    }
  },
  'rfid-3': {
    title: 'Industrial RFID Label Printer',
    pdfUrl: '../docs/rfid/rfid-label-printer.pdf',
    downloadName: 'Industrial RFID Label Printer Specifications.pdf',
    features: [
      'High-resolution 600 DPI printing',
      'Durable metal frame construction',
      'Supports multiple connectivity options',
      'Available in 4" and 6" print width models',
      'High-speed RFID encoding'
    ],
    specifications: {
      'Print Resolution': '600 DPI',
      'Print Width': '4" or 6"',
      'Construction': 'Metal Frame',
      'Connectivity': 'USB, Ethernet, WiFi',
      'Print Speed': 'Up to 8 ips',
      'Dimensions': '400 x 250 x 200mm',
      'Weight': '12kg'
    }
  },
  'rfid-4': {
    title: 'Handheld RFID & Barcode Terminal',
    pdfUrl: '../docs/rfid/handheld-terminal.pdf',
    downloadName: 'Handheld RFID Barcode Terminal Specifications.pdf',
    features: [
      'Combines UHF RFID and 1D/2D barcode scanning',
      'Wireless connectivity for real-time data',
      'Ergonomic design for prolonged use',
      'Long battery life for field operations',
      'Rugged construction for durability'
    ],
    specifications: {
      'OS': 'Android 11',
      'Display': '5" Touchscreen',
      'Read Rate': 'Up to 800 tags/sec',
      'Scanner': '1D/2D Barcode',
      'Battery': '6000mAh',
      'Connectivity': 'WiFi, Bluetooth, 4G',
      'Protection': 'IP65',
      'Dimensions': '180 x 75 x 30mm',
      'Weight': '0.5kg'
    }
  },
  'rfid-5': {
    title: 'Fixed Asset Management System',
    pdfUrl: '../docs/rfid/fixed-asset-management.pdf',
    downloadName: 'Fixed Asset Management System Specifications.pdf',
    features: [
      'Web-based platform for asset management',
      'RFID and barcode tracking integration',
      'ERP system compatibility',
      'Comprehensive asset lifecycle tracking',
      'Multi-department support'
    ],
    specifications: {
      'Platform': 'Web-based',
      'Database': 'SQL Server/MySQL',
      'Integration': 'ERP, REST APIs',
      'Users': 'Unlimited',
      'Tracking': 'RFID & Barcode',
      'Security': 'SSL/TLS',
      'Updates': 'Automatic'
    }
  },
  'rfid-6': {
    title: 'Warehouse Asset Management System',
    pdfUrl: '../docs/rfid/warehouse-asset-management.pdf',
    downloadName: 'Warehouse Asset Management System Specifications.pdf',
    features: [
      'Real-time location tracking',
      'Automated alerts for inventory management',
      'WMS/ERP integration',
      'Quick inventory counts with RFID',
      'Scalable for large warehouses'
    ],
    specifications: {
      'Platform': 'Web-based/On-premise',
      'Tracking': 'Real-time RFID',
      'Integration': 'WMS/ERP',
      'Alerts': 'Automated',
      'Database': 'Cloud/On-premise',
      'Security': 'SSL/TLS',
      'Scalability': 'Multi-warehouse'
    }
  },
  'rfid-7': {
    title: 'Warehouse RFID Tagging & Integration',
    pdfUrl: '../docs/rfid/rfid-tags.pdf',
    downloadName: 'Warehouse RFID Tagging Specifications.pdf',
    features: [
      'Complete RFID tagging solution',
      'Web application for management',
      'Mobile terminal integration',
      'Barcode and RFID printer support',
      'REST API for custom integrations'
    ],
    specifications: {
      'Platform': 'Web-based',
      'Components': 'Web App, Mobile Terminal, Printer',
      'Integration': 'REST APIs',
      'Database': 'SQL Server/MySQL',
      'Security': 'SSL/TLS',
      'Tags Supported': 'UHF RFID'
    }
  },
  'rfid-8': {
    title: 'RFID System Architecture',
    pdfUrl: '../docs/rfid/rfid-architecture.pdf',
    downloadName: 'RFID System Architecture Specifications.pdf',
    features: [
      'Comprehensive system architecture',
      'Web application and database server',
      'Mobile terminal integration',
      'Supports barcode and RFID printing',
      'Scalable multi-connectivity solution'
    ],
    specifications: {
      'Platform': 'Web-based',
      'Components': 'Web App, Database, Mobile Terminal',
      'Connectivity': 'WiFi, Ethernet, 4G',
      'Integration': 'REST APIs',
      'Security': 'SSL/TLS',
      'Scalability': 'Enterprise-level'
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
  const product = rfidProductSpecs[productId];
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
      // This would need data attributes on cards for proper filtering
      card.style.display = 'block'; // Placeholder
    }
  });
}

// Export functions for global access
window.openSpecModal = openSpecModal;
window.closeSpecModal = closeSpecModal;
window.downloadPDF = downloadPDF;
window.searchProducts = searchProducts;
window.filterProducts = filterProducts;