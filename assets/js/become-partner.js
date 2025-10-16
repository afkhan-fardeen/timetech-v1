// Become Partner Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('partnerApplicationForm');
    const submitBtn = form.querySelector('.btn-submit');
    
    // Form validation rules
    const validationRules = {
        companyName: {
            required: true,
            minLength: 2,
            maxLength: 100
        },
        contactName: {
            required: true,
            minLength: 2,
            maxLength: 100
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        phone: {
            required: true,
            pattern: /^[\+]?[1-9][\d]{0,15}$/
        },
        jobTitle: {
            required: true,
            minLength: 2,
            maxLength: 100
        },
        industry: {
            required: true
        },
        companySize: {
            required: true
        },
        companyDescription: {
            required: true,
            minLength: 20,
            maxLength: 1000
        },
        partnershipType: {
            required: true
        },
        targetMarket: {
            required: true
        },
        geographicCoverage: {
            required: true
        },
        partnershipGoals: {
            required: true,
            minLength: 20,
            maxLength: 1000
        },
        whyTimeTech: {
            required: true,
            minLength: 20,
            maxLength: 1000
        },
        agreeTerms: {
            required: true
        }
    };

    // Initialize form validation
    initializeFormValidation();

    // Form submission
    form.addEventListener('submit', handleFormSubmission);

    // Real-time validation
    form.addEventListener('input', handleRealTimeValidation);
    form.addEventListener('blur', handleRealTimeValidation, true);

    // Character counters for textareas
    initializeCharacterCounters();

    // Form section animations
    initializeFormAnimations();

    function initializeFormValidation() {
        // Add error message containers to required fields
        Object.keys(validationRules).forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field && validationRules[fieldName].required) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.style.display = 'none';
                field.parentNode.appendChild(errorDiv);
            }
        });
    }

    function handleRealTimeValidation(e) {
        const field = e.target;
        const fieldName = field.name;
        
        if (validationRules[fieldName]) {
            validateField(field, fieldName);
        }
    }

    function validateField(field, fieldName) {
        const rules = validationRules[fieldName];
        const formGroup = field.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message');
        
        // Remove existing error states
        formGroup.classList.remove('error', 'success');
        if (errorDiv) errorDiv.style.display = 'none';

        let isValid = true;
        let errorMessage = '';

        // Required validation
        if (rules.required && !field.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required.';
        }
        // Min length validation
        else if (rules.minLength && field.value.trim().length < rules.minLength) {
            isValid = false;
            errorMessage = `Minimum ${rules.minLength} characters required.`;
        }
        // Max length validation
        else if (rules.maxLength && field.value.trim().length > rules.maxLength) {
            isValid = false;
            errorMessage = `Maximum ${rules.maxLength} characters allowed.`;
        }
        // Pattern validation
        else if (rules.pattern && !rules.pattern.test(field.value.trim())) {
            isValid = false;
            if (fieldName === 'email') {
                errorMessage = 'Please enter a valid email address.';
            } else if (fieldName === 'phone') {
                errorMessage = 'Please enter a valid phone number.';
            } else {
                errorMessage = 'Please enter a valid value.';
            }
        }

        // Update field state
        if (!isValid) {
            formGroup.classList.add('error');
            if (errorDiv) {
                errorDiv.textContent = errorMessage;
                errorDiv.style.display = 'block';
            }
        } else if (field.value.trim()) {
            formGroup.classList.add('success');
        }

        return isValid;
    }

    function validateForm() {
        let isValid = true;
        
        Object.keys(validationRules).forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                if (!validateField(field, fieldName)) {
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    function handleFormSubmission(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            showNotification('Please fix the errors in the form.', 'error');
            // Scroll to first error
            const firstError = form.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Show loading state
        setFormLoading(true);

        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Add technical expertise as array
        const technicalExpertise = formData.getAll('technicalExpertise');
        data.technicalExpertise = technicalExpertise;

        // Submit form using EmailJS
        try {
            await submitPartnerForm();
            
            async function submitPartnerForm() {
                // Initialize EmailJS if not already done
                if (!window.emailjs) {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
                    await new Promise((resolve, reject) => {
                        script.onload = resolve;
                        script.onerror = reject;
                        document.head.appendChild(script);
                    });
                    emailjs.init('-nixGH1kMFWOQHZPd');
                }
                
                const formData = new FormData(form);
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
                
                console.log('Sending partner form with params:', templateParams);
                
                const result = await emailjs.send(
                    'service_y68c34x',
                    'template_w89nrs8', // Using same template - you can create a separate partner template
                    templateParams
                );
                
                console.log('EmailJS result:', result);
                setFormLoading(false);
                showSuccessMessage();
                form.reset();
                resetFormValidation();
            }
            
        } catch (error) {
            console.error('EmailJS Error:', error);
            setFormLoading(false);
            showNotification(error.message || 'Sorry, there was an error submitting your application. Please try again.', 'error');
        }
    }

    function setFormLoading(loading) {
        if (loading) {
            form.classList.add('loading');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Submitting...';
        } else {
            form.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bi bi-send"></i> Submit Application';
        }
    }

    function showSuccessMessage() {
        showNotification('Application submitted successfully! We\'ll contact you within 5-7 business days.', 'success');
        
        // Create success modal
        const modal = document.createElement('div');
        modal.className = 'success-modal';
        modal.innerHTML = `
            <div class="success-content">
                <div class="success-icon">
                    <i class="bi bi-check-circle"></i>
                </div>
                <h3>Application Submitted!</h3>
                <p>Thank you for your interest in becoming a TimeTech partner. We've received your application and will review it within 5-7 business days.</p>
                <p>You'll receive a confirmation email shortly with next steps.</p>
                <button class="btn-close-modal">Close</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .success-modal {
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
            .success-content {
                background: white;
                padding: 40px;
                border-radius: 15px;
                text-align: center;
                max-width: 500px;
                margin: 20px;
                animation: slideIn 0.3s ease;
            }
            .success-icon {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #28a745, #20c997);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
            }
            .success-icon i {
                font-size: 2.5rem;
                color: white;
            }
            .success-content h3 {
                font-size: 1.5rem;
                font-weight: 300;
                color: #01898c;
                margin-bottom: 15px;
            }
            .success-content p {
                font-size: 0.9rem;
                color: #727376;
                line-height: 1.6;
                margin-bottom: 10px;
            }
            .btn-close-modal {
                background: linear-gradient(135deg, #01898c, #00b4d8);
                color: white;
                border: none;
                padding: 12px 25px;
                border-radius: 25px;
                font-size: 0.9rem;
                font-weight: 300;
                cursor: pointer;
                transition: all 0.3s ease;
                margin-top: 20px;
            }
            .btn-close-modal:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 25px rgba(1, 137, 140, 0.3);
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Close modal functionality
        modal.querySelector('.btn-close-modal').addEventListener('click', () => {
            modal.remove();
            style.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                style.remove();
            }
        });
    }

    function resetFormValidation() {
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error', 'success');
        });
        
        form.querySelectorAll('.error-message').forEach(error => {
            error.style.display = 'none';
        });
    }

    function initializeCharacterCounters() {
        const textareas = form.querySelectorAll('textarea[maxlength]');
        
        textareas.forEach(textarea => {
            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.style.cssText = `
                font-size: 0.8rem;
                color: #727376;
                text-align: right;
                margin-top: 5px;
                font-weight: 300;
            `;
            
            textarea.parentNode.appendChild(counter);
            
            const updateCounter = () => {
                const current = textarea.value.length;
                const max = textarea.maxLength;
                counter.textContent = `${current}/${max}`;
                
                if (current > max * 0.9) {
                    counter.style.color = '#dc3545';
                } else {
                    counter.style.color = '#727376';
                }
            };
            
            textarea.addEventListener('input', updateCounter);
            updateCounter();
        });
    }

    function initializeFormAnimations() {
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

        // Observe form sections
        const formSections = form.querySelectorAll('.form-section');
        formSections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(section);
        });

        // Observe sidebar cards
        const sidebarCards = document.querySelectorAll('.sidebar-card');
        sidebarCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    }

    // Auto-save form data to localStorage
    function autoSaveForm() {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }
        
        localStorage.setItem('partnerApplicationDraft', JSON.stringify(data));
    }

    // Load saved form data
    function loadSavedForm() {
        const saved = localStorage.getItem('partnerApplicationDraft');
        if (saved) {
            const data = JSON.parse(saved);
            
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) {
                    if (field.type === 'checkbox' && Array.isArray(data[key])) {
                        field.checked = data[key].includes(field.value);
                    } else {
                        field.value = Array.isArray(data[key]) ? data[key][0] : data[key];
                    }
                }
            });
        }
    }

    // Auto-save on input
    form.addEventListener('input', autoSaveForm);
    
    // Load saved data on page load
    loadSavedForm();
    
    // Clear saved data on successful submission
    form.addEventListener('submit', () => {
        localStorage.removeItem('partnerApplicationDraft');
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
                notification.remove();
            }
        }, 300);
    }, 5000);
} 