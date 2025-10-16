// Privacy Policy Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize smooth scrolling for anchor links
    initializeSmoothScrolling();
    
    // Initialize table of contents highlighting
    initializeTOCHighlighting();
    
    // Initialize data rights functionality
    initializeDataRights();
    
    // Initialize cookie policy modal
    initializeCookieModal();
    
    // Initialize sidebar animations
    initializeSidebarAnimations();
    
    // Initialize section animations
    initializeSectionAnimations();
    
    // Initialize GDPR compliance features
    initializeGDPRFeatures();
});

function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
}

function initializeTOCHighlighting() {
    const sections = document.querySelectorAll('.privacy-section');
    const tocLinks = document.querySelectorAll('.toc-list a, .quick-nav a');
    
    // Remove active class from all TOC links
    function clearActiveLinks() {
        tocLinks.forEach(link => {
            link.classList.remove('active');
        });
    }
    
    // Add active class to current section link
    function setActiveLink(sectionId) {
        clearActiveLinks();
        const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    // Intersection Observer for section highlighting
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                setActiveLink(sectionId);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add active link styles
    const style = document.createElement('style');
    style.textContent = `
        .toc-list a.active,
        .quick-nav a.active {
            background: rgba(1, 137, 140, 0.15) !important;
            color: #01898c !important;
            font-weight: 400 !important;
        }
    `;
    document.head.appendChild(style);
}

function initializeDataRights() {
    const requestBtn = document.querySelector('.btn-data-request');
    const deleteBtn = document.querySelector('.btn-data-delete');
    
    if (requestBtn) {
        requestBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleDataRequest();
        });
    }
    
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleDataDeletion();
        });
    }
}

function handleDataRequest() {
    // Show loading state
    const btn = document.querySelector('.btn-data-request');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Processing...';
    btn.disabled = true;
    
    // Simulate data request process
    setTimeout(() => {
        // Create data request form
        showDataRequestModal();
        
        // Reset button
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 1500);
}

function handleDataDeletion() {
    // Show confirmation dialog
    if (confirm('Are you sure you want to request deletion of your data? This action cannot be undone.')) {
        // Show loading state
        const btn = document.querySelector('.btn-data-delete');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Processing...';
        btn.disabled = true;
        
        // Simulate deletion request
        setTimeout(() => {
            showNotification('Data deletion request submitted successfully. We will process your request within 30 days.', 'success');
            
            // Reset button
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 2000);
    }
}

function showDataRequestModal() {
    const modal = document.createElement('div');
    modal.className = 'data-request-modal';
    modal.innerHTML = `
        <div class="data-request-content">
            <h3><i class="bi bi-download"></i> Data Access Request</h3>
            <p>Please provide your information to request a copy of your data:</p>
            
            <form id="dataRequestForm">
                <div class="form-group">
                    <label for="requestEmail">Email Address *</label>
                    <input type="email" id="requestEmail" name="email" required>
                </div>
                
                <div class="form-group">
                    <label for="requestName">Full Name *</label>
                    <input type="text" id="requestName" name="name" required>
                </div>
                
                <div class="form-group">
                    <label for="requestReason">Reason for Request</label>
                    <select id="requestReason" name="reason">
                        <option value="">Select Reason</option>
                        <option value="personal">Personal Use</option>
                        <option value="legal">Legal Requirements</option>
                        <option value="portability">Data Portability</option>
                        <option value="verification">Data Verification</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="requestDetails">Additional Details</label>
                    <textarea id="requestDetails" name="details" rows="3" placeholder="Please provide any additional details about your request..."></textarea>
                </div>
                
                <div class="form-group">
                    <div class="checkbox-item">
                        <input type="checkbox" id="requestVerification" name="verification" required>
                        <label for="requestVerification">I confirm that I am the data subject or have legal authority to make this request *</label>
                    </div>
                </div>
                
                <div class="modal-buttons">
                    <button type="submit" class="btn-submit-request">
                        <i class="bi bi-send"></i> Submit Request
                    </button>
                    <button type="button" class="btn-cancel-request" onclick="closeDataRequestModal()">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .data-request-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        }
        .data-request-content {
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 500px;
            margin: 20px;
            max-height: 80vh;
            overflow-y: auto;
        }
        .data-request-content h3 {
            color: #01898c;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .data-request-content p {
            font-size: 0.9rem;
            color: #727376;
            margin-bottom: 1.5rem;
        }
        .form-group {
            margin-bottom: 1rem;
        }
        .form-group label {
            display: block;
            font-size: 0.9rem;
            font-weight: 300;
            color: #4f4f51;
            margin-bottom: 0.5rem;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 300;
        }
        .checkbox-item {
            display: flex;
            align-items: flex-start;
            gap: 10px;
        }
        .checkbox-item input[type="checkbox"] {
            width: auto;
            margin-top: 2px;
        }
        .checkbox-item label {
            margin: 0;
            font-size: 0.85rem;
        }
        .modal-buttons {
            display: flex;
            gap: 10px;
            margin-top: 1.5rem;
        }
        .btn-submit-request {
            background: linear-gradient(135deg, #01898c, #00b4d8);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 300;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .btn-submit-request:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(1, 137, 140, 0.3);
        }
        .btn-cancel-request {
            background: transparent;
            color: #727376;
            border: 1px solid #e9ecef;
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 300;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .btn-cancel-request:hover {
            background: #f8f9fa;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
    
    // Handle form submission
    const form = modal.querySelector('#dataRequestForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        showNotification('Data access request submitted successfully. We will process your request within 30 days.', 'success');
        
        // Close modal
        closeDataRequestModal();
    });
}

function closeDataRequestModal() {
    const modal = document.querySelector('.data-request-modal');
    if (modal) {
        modal.remove();
    }
}

function initializeCookieModal() {
    // Create cookie policy modal
    const modal = document.createElement('div');
    modal.className = 'cookie-modal';
    modal.innerHTML = `
        <div class="cookie-content">
            <h3><i class="bi bi-cookie"></i> Cookie Policy</h3>
            <p>This Cookie Policy explains how TimeTech uses cookies and similar technologies on our website.</p>
            
            <h4>What are Cookies?</h4>
            <p>Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience and understand how you use our site.</p>
            
            <h4>Types of Cookies We Use</h4>
            <ul>
                <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Used for advertising and marketing purposes</li>
            </ul>
            
            <h4>Managing Cookies</h4>
            <p>You can control cookies through your browser settings. However, disabling certain cookies may affect website functionality.</p>
            
            <button class="btn-close-cookie" onclick="closeCookieModal()">
                <i class="bi bi-x"></i> Close
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function showCookiePolicy() {
    const modal = document.querySelector('.cookie-modal');
    if (modal) {
        modal.classList.add('show');
    }
}

function closeCookieModal() {
    const modal = document.querySelector('.cookie-modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function initializeSidebarAnimations() {
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

    // Observe sidebar cards
    const sidebarCards = document.querySelectorAll('.sidebar-card');
    sidebarCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

function initializeSectionAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe privacy sections
    const privacySections = document.querySelectorAll('.privacy-section');
    privacySections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(section);
    });
}

function initializeGDPRFeatures() {
    // Add GDPR compliance highlights
    const gdprSections = document.querySelectorAll('.privacy-section');
    
    gdprSections.forEach(section => {
        const title = section.querySelector('h2').textContent;
        
        // Add GDPR highlight for specific sections
        if (title.includes('Your Rights') || title.includes('Data Retention') || title.includes('International')) {
            const highlight = document.createElement('div');
            highlight.className = 'gdpr-highlight';
            highlight.innerHTML = `
                <strong>GDPR Compliant:</strong> This section outlines your rights under the General Data Protection Regulation (GDPR).
            `;
            
            section.insertBefore(highlight, section.firstChild);
        }
    });
}

// Copy to clipboard functionality for contact information
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Contact information copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy to clipboard', 'error');
    });
}

// Add click-to-copy functionality to contact items
document.addEventListener('DOMContentLoaded', function() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const text = this.textContent.trim();
            copyToClipboard(text);
        });
        
        // Add hover effect
        item.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(1, 137, 140, 0.1)';
            this.style.borderRadius = '8px';
            this.style.padding = '8px';
            this.style.margin = '4px -8px';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
            this.style.borderRadius = '0';
            this.style.padding = '0';
            this.style.margin = '0 0 12px 0';
        });
    });
});

// Notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-family: 'Poppins', sans-serif;
        font-weight: 300;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #dc3545, #fd7e14)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #01898c, #00b4d8)';
    }
    
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Export functions for global access
window.showCookiePolicy = showCookiePolicy;
window.closeCookieModal = closeCookieModal;
window.closeDataRequestModal = closeDataRequestModal; 