// EmailJS Form Handler - Easy Solution
// This file provides a complete EmailJS integration for your forms

// EmailJS Configuration
const EMAILJS_CONFIG = {
    serviceId: 'service_y68c34x', // Gmail service ID
    templateId: 'template_w89nrs8', // Contact form template ID
    publicKey: '-nixGH1kMFWOQHZPd' // EmailJS public key
};

// Initialize EmailJS
function initializeEmailJS() {
    // Load EmailJS script if not already loaded
    if (!window.emailjs) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.onload = () => {
            emailjs.init(EMAILJS_CONFIG.publicKey);
            console.log('EmailJS initialized successfully');
        };
        document.head.appendChild(script);
    } else {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }
}

// Contact Form Handler
function setupContactForm() {
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
            const templateParams = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                company: formData.get('company'),
                country: formData.get('country'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                newsletter: formData.get('newsletter') ? 'Yes' : 'No',
                timestamp: new Date().toLocaleString()
            };
            
            // Send email
            await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams
            );
            
            // Success
            showNotification('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
            this.reset();
            
        } catch (error) {
            console.error('EmailJS Error:', error);
            showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Partner Application Form Handler
function setupPartnerForm() {
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
            const templateParams = {
                companyName: formData.get('companyName'),
                website: formData.get('website'),
                industry: formData.get('industry'),
                companySize: formData.get('companySize'),
                companyDescription: formData.get('companyDescription'),
                contactName: formData.get('contactName'),
                jobTitle: formData.get('jobTitle'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                partnershipType: formData.get('partnershipType'),
                targetMarket: formData.get('targetMarket'),
                geographicCoverage: formData.get('geographicCoverage'),
                partnershipGoals: formData.get('partnershipGoals'),
                whyTimeTech: formData.get('whyTimeTech'),
                technicalExpertise: formData.getAll('technicalExpertise').join(', '),
                agreeTerms: formData.get('agreeTerms') ? 'Yes' : 'No',
                timestamp: new Date().toLocaleString()
            };
            
            // Send email
            await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                'template_w89nrs8', // Using same template for now - you can create a separate partner template
                templateParams
            );
            
            // Success
            showNotification('Application submitted successfully! We\'ll contact you within 5-7 business days.', 'success');
            this.reset();
            
        } catch (error) {
            console.error('EmailJS Error:', error);
            showNotification('Sorry, there was an error submitting your application. Please try again.', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeEmailJS();
    
    // Wait a bit for EmailJS to load
    setTimeout(() => {
        setupContactForm();
        setupPartnerForm();
    }, 1000);
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
