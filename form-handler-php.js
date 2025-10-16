// PHP Backend Form Handler
// This file provides PHP backend integration for your forms

// PHP Backend Configuration
const PHP_CONFIG = {
    contactEndpoint: 'contact-form-handler.php',
    partnerEndpoint: 'contact-form-handler.php'
};

// Contact Form Handler for PHP Backend
function setupPHPContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.contact-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Collect form data
            const formData = new FormData(this);
            formData.append('form_type', 'contact');
            
            // Submit to PHP backend
            const response = await fetch(PHP_CONFIG.contactEndpoint, {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                showNotification(result.message, 'success');
                this.reset();
            } else {
                throw new Error(result.message);
            }
            
        } catch (error) {
            console.error('PHP Form Error:', error);
            showNotification(error.message || 'Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Partner Application Form Handler for PHP Backend
function setupPHPPartnerForm() {
    const partnerForm = document.getElementById('partnerApplicationForm');
    if (!partnerForm) return;

    partnerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Submitting...';
        submitBtn.disabled = true;
        
        try {
            // Collect form data
            const formData = new FormData(this);
            formData.append('form_type', 'partner');
            
            // Submit to PHP backend
            const response = await fetch(PHP_CONFIG.partnerEndpoint, {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                showNotification(result.message, 'success');
                this.reset();
            } else {
                throw new Error(result.message);
            }
            
        } catch (error) {
            console.error('PHP Form Error:', error);
            showNotification(error.message || 'Sorry, there was an error submitting your application. Please try again.', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Initialize PHP forms
document.addEventListener('DOMContentLoaded', function() {
    setupPHPContactForm();
    setupPHPPartnerForm();
});

// Enhanced notification function
function showNotification(message, type = 'info') {
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
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}
