// Queue Management Page JavaScript

// Product specifications data
const productSpecs = {
  'main-q-system-software': {
    title: 'Main Q-System Software',
    pdfUrl: '../docs/queue/Main-Queue-Software.pdf',
    downloadName: 'Main Q-System Software.pdf',
    features: [
      'Complete queue management software suite with centralized control',
      'Based on a reliable MS SQL database platform',
      'Includes 1 admin license for full system management',
      'Supports touch screen-based ticketing for customer self-service',
      'Configurable for up to 15 different service categories',
      'Comes with 4 calling pad licenses (compatible with Windows/Android)',
      'Includes 4 counter display app licenses',
      'Integrated RF module management for smooth hardware connectivity'
    ],
    specifications: {
      'Database': 'MS SQL',
      'Admin License': '1 included',
      'Service Categories': 'Up to 15',
      'Calling Pad Licenses': '4 (Windows/Android)',
      'Counter Display Licenses': '4',
      'RF Module': 'Integrated',
      'Ticketing': 'Touch screen-based, self-service',
      'Centralized Control': 'Yes'
    }
  },
  'kiosk-1': {
    title: 'Full Kiosk (Vertical Screen with Stand)',
    pdfUrl: '../docs/queue/vertical-kiosk-with-stand.pdf',
    downloadName: 'Full Kiosk Specifications.pdf',
    features: [
      'Vertical touch screen display',
      'Built-in ticket dispenser',
      'Wooden stand for stability',
      'High-traffic environment ready',
      'Multi-language support',
      'Wireless connectivity options'
    ],
    specifications: {
      'Display': '15.6" Touch Screen',
      'Resolution': '1920x1080 Full HD',
      'Processor': 'Intel Celeron N3350',
      'Memory': '4GB DDR3',
      'Storage': '32GB eMMC',
      'Connectivity': 'WiFi 802.11ac, Bluetooth 4.0',
      'Power': '12V DC, 2A',
      'Dimensions': '400 x 300 x 1200mm',
      'Weight': '15kg'
    }
  },
  'kiosk-4': {
    title: 'Advance Full White KIOSK',
    pdfUrl: '../docs/queue/advanced-white.pdf',
    downloadName: 'Advance Full White KIOSK.pdf',
    features: [
      'Vertical touch screen display',
      'Built-in ticket dispenser',
      'Wooden stand for stability',
      'High-traffic environment ready',
      'Multi-language support',
      'Wireless connectivity options'
    ],
    specifications: {
      'Display': '15.6" Touch Screen',
      'Resolution': '1920x1080 Full HD',
      'Processor': 'Intel Celeron N3350',
      'Memory': '4GB DDR3',
      'Storage': '32GB eMMC',
      'Connectivity': 'WiFi 802.11ac, Bluetooth 4.0',
      'Power': '12V DC, 2A',
      'Dimensions': '400 x 300 x 1200mm',
      'Weight': '15kg'
    }
  },
  'kiosk-2': {
    title: 'Robust Touch Screen Kiosk',
    pdfUrl: '../docs/queue/Robust_Kiosk_KIOSK_Touch_Screen_Wireless.pdf',
    downloadName: 'Robust Touch Screen Kiosk Specifications.pdf',
    features: [
      'Built-in system server',
      'Stunning graphics capabilities',
      'Multi-lingual ticket printing',
      'High-performance processing',
      'Integrated ticket dispenser',
      'Advanced user interface'
    ],
    specifications: {
      'Display': '17" Touch Screen',
      'Resolution': '1280x1024',
      'Processor': 'Intel Core i3-6100U',
      'Memory': '8GB DDR4',
      'Storage': '128GB SSD',
      'Connectivity': 'Gigabit Ethernet, WiFi',
      'Power': '19V DC, 3.42A',
      'Dimensions': '450 x 350 x 1400mm',
      'Weight': '18kg'
    }
  },
  'kiosk-3': {
    title: 'Table Top Kiosk',
    pdfUrl: '../docs/queue/Table-Top-Kiosk.pdf',
    downloadName: 'Table Top Kiosk Specifications.pdf',
    features: [
      '17-inch touch screen',
      'Multi-language support',
      'Wireless connectivity',
      'Robust all-in-one design',
      'Easy installation',
      'Low maintenance'
    ],
    specifications: {
      'Display': '17" Touch Screen',
      'Resolution': '1280x1024',
      'Processor': 'Intel Atom x5-Z8350',
      'Memory': '2GB DDR3',
      'Storage': '32GB eMMC',
      'Connectivity': 'WiFi 802.11n, Bluetooth',
      'Power': '12V DC, 2A',
      'Dimensions': '380 x 280 x 1100mm',
      'Weight': '12kg'
    }
  },
  'display-1': {
    title: 'Waiting Area Display',
    pdfUrl: '../docs/queue/Media_Player_Box_with_Time_Tech_Q_Software.pdf',
    downloadName: 'Waiting Area Display.pdf',
    features: [
      'Connects to display TVs for real-time queue updates',
      'Shows current and previous ticket numbers on screen',
      'Plays promotional videos and scrolling ticker messages',
      'Delivers audio announcements via TV or external speakers',
      'Enhances the customer experience in the waiting area',
      'Supports both visual and audio content for better engagement',
      'Ideal for displaying service information and branding content',
      'Operates seamlessly in real-time for accurate queue communication'
    ],
    specifications: {
      'Output': 'HDMI 1.4',
      'Resolution': 'Up to 4K',
      'OS': 'Android 9.0',
      'Processor': 'ARM Cortex-A55',
      'Memory': '2GB DDR4',
      'Storage': '16GB eMMC',
      'Connectivity': 'WiFi 802.11ac',
      'Power': '5V DC, 2A',
      'Dimensions': '100 x 60 x 15mm',
      'Weight': '0.1kg'
    }
  },
  'display-2': {
    title: 'LCD Counter Display',
    pdfUrl: '../docs/queue/Queue_Analytics_Software.pdf',
    downloadName: 'LCD Counter Display.pdf',
    features: [
      'Bright and clear LED display for visibility',
      'Uses F3.75 LED technology for sharp, high-contrast output',
      'Available in both wireless and wired communication options',
      'Compact size ideal for mounting in service areas (35.4×12.6×5 cm)',
      'Enhances queue communication at individual counters'
    ],
    specifications: {
      'Display': '7" LCD Screen',
      'Resolution': '1024x600',
      'OS': 'Android 9.0',
      'Processor': 'ARM Cortex-A53',
      'Memory': '1GB DDR3',
      'Storage': '8GB eMMC',
      'Connectivity': 'WiFi 802.11n',
      'Power': '5V DC, 1A',
      'Dimensions': '180 x 120 x 25mm',
      'Weight': '0.5kg'
    }
  },
  'display-3': {
    title: 'LED Counter Display',
    pdfUrl: '../docs/queue/Queue_Analytics_Software.pdf',
    downloadName: 'LED Counter Display.pdf',
    features: [
      'Bright and clear 8-digit LED display for visibility',
      '4-digit Counter No. and 4-digit Ticket No. shown simultaneously',
      'Uses F3.75 LED technology for sharp, high-contrast output',
      'Available in both wireless and wired communication options',
      'Compact size ideal for mounting in service areas (35.4×12.6×5 cm)',
      'Enhances queue communication at individual counters'
    ],
    specifications: {
      'Display': 'LED Matrix',
      'Resolution': '32x16 pixels',
      'Brightness': '5000 nits',
      'Viewing Distance': 'Up to 50m',
      'Connectivity': 'WiFi/RJ45',
      'Power': '12V DC, 1A',
      'Dimensions': '400 x 200 x 50mm',
      'Weight': '2kg',
      'Operating Temp': '-20°C to +60°C'
    }
  },
  'accessory-1': {
    title: 'Android Calling Pad',
    pdfUrl: '../docs/queue/windows-calling-pad.pdf',
    downloadName: 'Android Calling Pad.pdf',
    features: [
      'Enables staff to manage customer flow directly from their desk',
      'Supports calling, recalling, transferring, and optional calls',
      'Provides real-time view of total waiting customers',
      'Offers both random and direct call modes',
      'Designed with a user-friendly, interactive interface',
      'Supports multiple languages for wider accessibility',
      'Operates seamlessly over both wireless and LAN networks',
      'Compatible with both PCs and tablets for flexible usage'
    ],
    specifications: {
      'Buttons': '8 programmable',
      'Connectivity': 'WiFi/RJ45',
      'Battery Life': 'Up to 6 months',
      'Range': 'Up to 100m',
      'Power': '3V (2x AA batteries)',
      'Dimensions': '150 x 100 x 30mm',
      'Weight': '0.3kg',
      'Operating Temp': '-10°C to +50°C'
    }
  },
  'accessory-2': {
    title: 'Media Player Box with TimeTech-Q Software',
    pdfUrl: '../docs/queue/Media_Player_Box_with_Time_Tech_Q_Software.pdf',
    downloadName: 'Media Player Box Specifications.pdf',
    features: [
      'Embedded software',
      'Content management',
      'TimeTech-Q integration',
      'Multiple output formats',
      'Remote management',
      'Scalable solution'
    ],
    specifications: {
      'OS': 'Linux-based',
      'Processor': 'ARM Cortex-A72',
      'Memory': '4GB DDR4',
      'Storage': '32GB eMMC',
      'Output': 'HDMI, VGA, Composite',
      'Connectivity': 'WiFi 802.11ac, Ethernet',
      'Power': '12V DC, 2A',
      'Dimensions': '120 x 80 x 25mm',
      'Weight': '0.2kg'
    }
  },
  'accessory-3': {
    title: 'Queue Management Remote Control',
    pdfUrl: '../docs/queue/Queue_Analytics_Software.pdf',
    downloadName: 'Queue Management Remote Control Specifications.pdf',
    features: [
      'Wireless remote control',
      'Long-range operation',
      'Multiple function buttons',
      'Battery powered',
      'Compact design',
      'Easy to use'
    ],
    specifications: {
      'Range': 'Up to 50m',
      'Battery': '2x AAA (6 months)',
      'Buttons': '12 programmable',
      'Frequency': '2.4GHz',
      'Power': '3V DC',
      'Dimensions': '120 x 60 x 20mm',
      'Weight': '0.1kg',
      'Operating Temp': '-10°C to +50°C'
    }
  },
  'software-1': {
    title: 'Main Q-System (Software Licenses)',
    pdfUrl: '../docs/queue/Main_Q_System_Software_Licenses.pdf',
    downloadName: 'Main Q-System Specifications.pdf',
    features: [
      'Enterprise-level solution',
      'Multi-location support',
      'Scalable architecture',
      'Advanced reporting',
      'User management',
      'API integration'
    ],
    specifications: {
      'Platform': 'Windows/Linux',
      'Database': 'SQL Server/MySQL',
      'Users': 'Unlimited',
      'Locations': 'Unlimited',
      'Languages': 'Multi-language',
      'Updates': 'Automatic',
      'Support': '24/7',
      'License': 'Perpetual'
    }
  },
  'software-2': {
    title: 'Queue Analytics Software',
    pdfUrl: '../docs/queue/Queue_Analytics_Software.pdf',
    downloadName: 'Queue Analytics Software Specifications.pdf',
    features: [
      'Real-time analytics',
      'Performance insights',
      'Optimization recommendations',
      'Custom dashboards',
      'Data export',
      'Predictive analysis'
    ],
    specifications: {
      'Platform': 'Web-based',
      'Database': 'Cloud/On-premise',
      'Real-time': 'Yes',
      'Reports': 'Customizable',
      'Export': 'PDF, Excel, CSV',
      'API': 'RESTful',
      'Security': 'SSL/TLS',
      'Updates': 'Monthly'
    }
  },
  'software-3': {
    title: 'Queue Management Mobile App',
    pdfUrl: '../docs/queue/Main_Q_System_Software_Licenses.pdf',
    downloadName: 'Queue Management Mobile App Specifications.pdf',
    features: [
      'Mobile queue management',
      'Real-time notifications',
      'Staff management',
      'Customer engagement',
      'Offline functionality',
      'Cross-platform support'
    ],
    specifications: {
      'Platform': 'iOS & Android',
      'Version': '2.1.0',
      'Size': '25MB',
      'Languages': 'Multi-language',
      'Connectivity': 'WiFi, 4G/5G',
      'Updates': 'Auto-update',
      'Security': 'Biometric login',
      'Compatibility': 'iOS 12+, Android 8+'
    }
  },
  'reporting-application': {
    title: 'Reporting Application',
    pdfUrl: '../docs/queue/reporting-application.pdf',
    downloadName: 'Reporting Application.pdf',
    features: [
      'Displays live queue performance statistics',
      'Tracks customer feedback and overtime activity',
      'Analyzes queue traffic and customer satisfaction',
      'Calculates average processing and waiting times',
      'Generates timeout and traffic-based reports',
      'Accessible both locally (via kiosk) and remotely by supervisors/admin'
    ],
    specifications: {
      'Live Statistics': 'Queue performance in real time',
      'Feedback': 'Customer feedback and overtime activity',
      'Analysis': 'Queue traffic and satisfaction',
      'Averages': 'Processing and waiting times',
      'Reports': 'Timeout and traffic-based',
      'Access': 'Local (kiosk) & remote (supervisors/admin)'
    }
  },
  'ticket-dispenser-software': {
    title: 'Ticket Dispenser Software',
    pdfUrl: '',
    downloadName: 'Ticket Dispenser Software.pdf',
    features: [
      'Kiosk Integration',
      'Easy Ticket Printing',
      'User-Friendly',
      'Queue Management',
      'More Info Soon'
    ],
    specifications: {
      'Purpose': 'Software for kiosk-based ticket dispensing',
      'Status': 'Details coming soon',
      'Integration': 'Designed for self-service kiosks',
      'Features': 'Streamlines customer check-in and queue management'
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
  const product = productSpecs[productId];
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

// Product search functionality (for future enhancement)
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

// Filter products by category (for future enhancement)
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