// Partners Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Animate partner cards on scroll
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

    // Observe partner cards for animation
    const partnerCards = document.querySelectorAll('.partner-card, .benefit-card');
    partnerCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Contact functionality for partner contacts
    const partnerEmails = document.querySelectorAll('.partner-email');
    const partnerPhones = document.querySelectorAll('.partner-phone');
    const partnerWebsites = document.querySelectorAll('.partner-website');
    
    partnerEmails.forEach(emailLink => {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = this.textContent.trim();
            
            // Copy email to clipboard
            navigator.clipboard.writeText(email).then(() => {
                showNotification(`${email} copied to clipboard!`, 'success');
            }).catch(() => {
                // Fallback: open email client
                window.location.href = `mailto:${email}`;
            });
        });
    });

    partnerPhones.forEach(phoneLink => {
        phoneLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const phone = this.textContent.trim();
            
            // Copy phone to clipboard
            navigator.clipboard.writeText(phone).then(() => {
                showNotification(`${phone} copied to clipboard!`, 'success');
            }).catch(() => {
                // Fallback: open phone app
                window.location.href = `tel:${phone.replace(/\s/g, '')}`;
            });
        });
    });

    partnerWebsites.forEach(websiteLink => {
        websiteLink.addEventListener('click', function(e) {
            // Let the default behavior happen (open in new tab)
            // but also copy to clipboard
            const website = this.textContent.trim();
            
            navigator.clipboard.writeText(website).then(() => {
                showNotification(`${website} copied to clipboard!`, 'success');
            }).catch(() => {
                // Silent fail, just open the website
            });
        });
    });

    // Partner card hover effects
    const partnerCardsInteractive = document.querySelectorAll('.partner-card');
    
    partnerCardsInteractive.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add click-to-copy functionality for partner information
    const partnerCardsCopy = document.querySelectorAll('.partner-card');
    
    partnerCardsCopy.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on any contact link
            if (e.target.closest('.partner-email, .partner-phone, .partner-website')) {
                return;
            }
            
            const partnerName = this.querySelector('h3').textContent;
            const contactDiv = this.querySelector('.partner-contact');
            
            if (!contactDiv) return;
            
            let contactInfo = `${partnerName}\n\n`;
            
            // Collect all contact information
            const emails = contactDiv.querySelectorAll('.partner-email');
            const phones = contactDiv.querySelectorAll('.partner-phone');
            const websites = contactDiv.querySelectorAll('.partner-website');
            const locations = contactDiv.querySelectorAll('.partner-location');
            
            emails.forEach(email => {
                contactInfo += `📧 ${email.textContent.trim()}\n`;
            });
            
            phones.forEach(phone => {
                contactInfo += `📞 ${phone.textContent.trim()}\n`;
            });
            
            websites.forEach(website => {
                contactInfo += `🌐 ${website.textContent.trim()}\n`;
            });
            
            locations.forEach(location => {
                contactInfo += `📍 ${location.textContent.trim()}\n`;
            });
            
            navigator.clipboard.writeText(contactInfo.trim()).then(() => {
                showNotification('Partner contact info copied!', 'success');
            }).catch(() => {
                showNotification('Failed to copy contact info', 'error');
            });
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

// Add some interactive effects to benefit cards
document.addEventListener('DOMContentLoaded', function() {
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    benefitCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}); 