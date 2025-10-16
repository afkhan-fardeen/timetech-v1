// Support Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ functionality
    initializeFAQ();
    
    // Initialize search modal
    initializeSearchModal();
    
    // Initialize support form
    initializeSupportForm();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize live chat simulation
    initializeLiveChat();
});

function initializeFAQ() {
    const faqCategories = document.querySelectorAll('.faq-category');
    const faqGroups = document.querySelectorAll('.faq-group');
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Category switching
    faqCategories.forEach(category => {
        category.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // Update active category
            faqCategories.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            
            // Show target group
            faqGroups.forEach(group => {
                group.classList.remove('active');
                if (group.id === targetCategory) {
                    group.classList.add('active');
                }
            });
        });
    });
    
    // FAQ item toggling
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

function initializeSearchModal() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Close modal on outside click
    const searchModal = document.getElementById('searchModal');
    if (searchModal) {
        searchModal.addEventListener('click', function(e) {
            if (e.target === searchModal) {
                closeSearchModal();
            }
        });
    }
}

function openSearchModal() {
    const searchModal = document.getElementById('searchModal');
    if (searchModal) {
        searchModal.classList.add('show');
        document.getElementById('searchInput').focus();
    }
}

function closeSearchModal() {
    const searchModal = document.getElementById('searchModal');
    if (searchModal) {
        searchModal.classList.remove('show');
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const query = searchInput.value.trim();
    
    if (query.length < 2) {
        searchResults.innerHTML = '<p style="color: #727376; text-align: center;">Please enter at least 2 characters to search.</p>';
        return;
    }
    
    // Show loading state
    searchResults.innerHTML = '<p style="color: #727376; text-align: center;"><i class="bi bi-hourglass-split"></i> Searching...</p>';
    
    // Simulate search results
    setTimeout(() => {
        const mockResults = generateMockSearchResults(query);
        displaySearchResults(mockResults);
    }, 1000);
}

function generateMockSearchResults(query) {
    const mockData = [
        {
            title: 'How to reset your password',
            category: 'Account Management',
            excerpt: 'Learn how to reset your password if you\'ve forgotten it or need to change it for security reasons.',
            url: '#'
        },
        {
            title: 'Troubleshooting login issues',
            category: 'Technical Support',
            excerpt: 'Common solutions for login problems including browser compatibility and network issues.',
            url: '#'
        },
        {
            title: 'Setting up two-factor authentication',
            category: 'Security',
            excerpt: 'Step-by-step guide to enable two-factor authentication for enhanced account security.',
            url: '#'
        },
        {
            title: 'Understanding billing cycles',
            category: 'Billing',
            excerpt: 'Information about how billing works, payment methods, and invoice generation.',
            url: '#'
        },
        {
            title: 'API integration guide',
            category: 'Technical Documentation',
            excerpt: 'Complete guide to integrating TimeTech APIs into your applications.',
            url: '#'
        }
    ];
    
    // Filter results based on query
    return mockData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(query.toLowerCase())
    );
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <p style="color: #727376; text-align: center;">
                No results found for your search. Try different keywords or contact support for assistance.
            </p>
        `;
        return;
    }
    
    const resultsHTML = results.map(result => `
        <div class="search-result-item" style="
            padding: 15px;
            border-bottom: 1px solid #e9ecef;
            cursor: pointer;
            transition: background-color 0.3s ease;
        " onmouseover="this.style.backgroundColor='#f8f9fa'" onmouseout="this.style.backgroundColor='transparent'">
            <h4 style="
                font-size: 1rem;
                font-weight: 300;
                color: #01898c;
                margin: 0 0 5px 0;
            ">${result.title}</h4>
            <p style="
                font-size: 0.8rem;
                color: #727376;
                margin: 0 0 5px 0;
                font-weight: 300;
            "><strong>${result.category}</strong></p>
            <p style="
                font-size: 0.9rem;
                color: #4f4f51;
                margin: 0;
                font-weight: 300;
            ">${result.excerpt}</p>
        </div>
    `).join('');
    
    searchResults.innerHTML = resultsHTML;
}

function initializeSupportForm() {
    const supportForm = document.getElementById('supportForm');
    
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSupportFormSubmission();
        });
    }
}

function handleSupportFormSubmission() {
    const form = document.getElementById('supportForm');
    const submitBtn = form.querySelector('.btn-submit-support');
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showNotification('Support request submitted successfully! We\'ll get back to you within 2 hours.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show confirmation modal
        showSupportConfirmation();
    }, 2000);
}

function showSupportConfirmation() {
    const modal = document.createElement('div');
    modal.className = 'support-confirmation-modal';
    modal.innerHTML = `
        <div class="support-confirmation-content">
            <div class="confirmation-icon">
                <i class="bi bi-check-circle"></i>
            </div>
            <h3>Support Request Submitted!</h3>
            <p>Thank you for contacting TimeTech support. We've received your request and will respond within 2 hours.</p>
            <p><strong>Reference Number:</strong> #${generateReferenceNumber()}</p>
            <p>You'll receive a confirmation email shortly with tracking details.</p>
            <button class="btn-close-confirmation" onclick="closeSupportConfirmation()">
                Close
            </button>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .support-confirmation-modal {
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
        .support-confirmation-content {
            background: white;
            padding: 40px;
            border-radius: 15px;
            text-align: center;
            max-width: 500px;
            margin: 20px;
            animation: slideIn 0.3s ease;
        }
        .confirmation-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #28a745, #20c997);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
        }
        .confirmation-icon i {
            font-size: 2.5rem;
            color: white;
        }
        .support-confirmation-content h3 {
            font-size: 1.5rem;
            font-weight: 300;
            color: #01898c;
            margin-bottom: 15px;
        }
        .support-confirmation-content p {
            font-size: 0.9rem;
            color: #727376;
            line-height: 1.6;
            margin-bottom: 10px;
        }
        .btn-close-confirmation {
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
        .btn-close-confirmation:hover {
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
    
    document.body.appendChild(modal);
}

function closeSupportConfirmation() {
    const modal = document.querySelector('.support-confirmation-modal');
    if (modal) {
        modal.remove();
    }
}

function generateReferenceNumber() {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
}

function initializeAnimations() {
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

    // Observe help cards
    const helpCards = document.querySelectorAll('.help-card');
    helpCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe resource cards
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

function initializeLiveChat() {
    // Simulate live chat functionality
    window.startLiveChat = function() {
        showNotification('Connecting to live chat...', 'info');
        
        setTimeout(() => {
            showLiveChatModal();
        }, 1500);
    };
}

function showLiveChatModal() {
    const modal = document.createElement('div');
    modal.className = 'live-chat-modal';
    modal.innerHTML = `
        <div class="live-chat-content">
            <div class="chat-header">
                <h3><i class="bi bi-chat-dots"></i> Live Chat</h3>
                <button class="btn-close-chat" onclick="closeLiveChat()">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
            <div class="chat-messages">
                <div class="message agent">
                    <div class="message-content">
                        <p>Hello! Welcome to TimeTech support. My name is Sarah. How can I help you today?</p>
                        <span class="message-time">Just now</span>
                    </div>
                </div>
            </div>
            <div class="chat-input">
                <input type="text" id="chatInput" placeholder="Type your message...">
                <button class="btn-send-chat" onclick="sendChatMessage()">
                    <i class="bi bi-send"></i>
                </button>
            </div>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .live-chat-modal {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideInUp 0.3s ease;
        }
        .chat-header {
            padding: 15px 20px;
            border-bottom: 1px solid #e9ecef;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .chat-header h3 {
            font-size: 1rem;
            font-weight: 300;
            color: #01898c;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .btn-close-chat {
            background: none;
            border: none;
            font-size: 1.2rem;
            color: #727376;
            cursor: pointer;
        }
        .chat-messages {
            height: 350px;
            overflow-y: auto;
            padding: 15px;
        }
        .message {
            margin-bottom: 15px;
        }
        .message.user {
            text-align: right;
        }
        .message-content {
            display: inline-block;
            max-width: 80%;
            padding: 10px 15px;
            border-radius: 15px;
            font-size: 0.9rem;
        }
        .message.agent .message-content {
            background: #f8f9fa;
            color: #4f4f51;
        }
        .message.user .message-content {
            background: linear-gradient(135deg, #01898c, #00b4d8);
            color: white;
        }
        .message-time {
            font-size: 0.7rem;
            color: #727376;
            margin-top: 5px;
            display: block;
        }
        .chat-input {
            padding: 15px;
            border-top: 1px solid #e9ecef;
            display: flex;
            gap: 10px;
        }
        #chatInput {
            flex: 1;
            padding: 10px 15px;
            border: 1px solid #e9ecef;
            border-radius: 20px;
            font-size: 0.9rem;
        }
        .btn-send-chat {
            background: linear-gradient(135deg, #01898c, #00b4d8);
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 50%;
            cursor: pointer;
        }
        @keyframes slideInUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
    
    // Focus on input
    setTimeout(() => {
        document.getElementById('chatInput').focus();
    }, 100);
}

function closeLiveChat() {
    const modal = document.querySelector('.live-chat-modal');
    if (modal) {
        modal.remove();
    }
}

function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    const chatMessages = document.querySelector('.chat-messages');
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
            <span class="message-time">Just now</span>
        </div>
    `;
    chatMessages.appendChild(userMessage);
    
    // Clear input
    chatInput.value = '';
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate agent response
    setTimeout(() => {
        const agentMessage = document.createElement('div');
        agentMessage.className = 'message agent';
        agentMessage.innerHTML = `
            <div class="message-content">
                <p>Thank you for your message. I'm looking into this for you. Please give me a moment...</p>
                <span class="message-time">Just now</span>
            </div>
        `;
        chatMessages.appendChild(agentMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

// Support functions
function openEmailForm() {
    showNotification('Opening email client...', 'info');
    setTimeout(() => {
        window.location.href = 'mailto:support@timetch.com?subject=Support Request';
    }, 1000);
}

function callSupport() {
    showNotification('Initiating call...', 'info');
    setTimeout(() => {
        window.location.href = 'tel:+15551234567';
    }, 1000);
}

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
window.openSearchModal = openSearchModal;
window.closeSearchModal = closeSearchModal;
window.startLiveChat = startLiveChat;
window.closeLiveChat = closeLiveChat;
window.sendChatMessage = sendChatMessage;
window.closeSupportConfirmation = closeSupportConfirmation; 