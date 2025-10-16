// Netlify Forms Handler
// This file provides Netlify Forms integration for your forms

// Netlify Forms Configuration
const NETLIFY_CONFIG = {
    siteUrl: 'https://your-site.netlify.app', // Replace with your Netlify site URL
    contactEndpoint: '/.netlify/functions/contact',
    partnerEndpoint: '/.netlify/functions/partner'
};

// Contact Form Handler for Netlify
function setupNetlifyContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    // Add Netlify attributes
    contactForm.setAttribute('netlify', 'true');
    contactForm.setAttribute('name', 'contact');
    contactForm.setAttribute('method', 'POST');
    contactForm.setAttribute('action', '/');

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
            const data = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                company: formData.get('company'),
                country: formData.get('country'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                newsletter: formData.get('newsletter') ? 'Yes' : 'No',
                timestamp: new Date().toISOString()
            };
            
            // Submit to Netlify
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    'form-name': 'contact',
                    ...data
                })
            });
            
            if (response.ok) {
                showNotification('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
                this.reset();
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            console.error('Netlify Form Error:', error);
            showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Partner Application Form Handler for Netlify
function setupNetlifyPartnerForm() {
    const partnerForm = document.getElementById('partnerApplicationForm');
    if (!partnerForm) return;

    // Add Netlify attributes
    partnerForm.setAttribute('netlify', 'true');
    partnerForm.setAttribute('name', 'partner-application');
    partnerForm.setAttribute('method', 'POST');
    partnerForm.setAttribute('action', '/');

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
            const data = {
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
                timestamp: new Date().toISOString()
            };
            
            // Submit to Netlify
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    'form-name': 'partner-application',
                    ...data
                })
            });
            
            if (response.ok) {
                showNotification('Application submitted successfully! We\'ll contact you within 5-7 business days.', 'success');
                this.reset();
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            console.error('Netlify Form Error:', error);
            showNotification('Sorry, there was an error submitting your application. Please try again.', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Initialize Netlify forms
document.addEventListener('DOMContentLoaded', function() {
    setupNetlifyContactForm();
    setupNetlifyPartnerForm();
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
