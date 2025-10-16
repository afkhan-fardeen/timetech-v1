// Terms and Conditions Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize smooth scrolling for anchor links
    initializeSmoothScrolling();
    
    // Initialize table of contents highlighting
    initializeTOCHighlighting();
    
    // Initialize download functionality
    initializeDownload();
    
    // Initialize sidebar animations
    initializeSidebarAnimations();
    
    // Initialize section animations
    initializeSectionAnimations();
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
    const sections = document.querySelectorAll('.terms-section');
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

function initializeDownload() {
    const downloadBtn = document.querySelector('.btn-download');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="bi bi-hourglass-split"></i> Preparing...';
            this.disabled = true;
            
            // Simulate download process
            setTimeout(() => {
                // Create and download the terms as a text file
                downloadTermsAsFile();
                
                // Reset button
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Show success notification
                showNotification('Terms and Conditions downloaded successfully!', 'success');
            }, 1500);
        });
    }
}

function downloadTermsAsFile() {
    // Get all terms content
    const termsSections = document.querySelectorAll('.terms-section');
    let content = 'TimeTech - Terms and Conditions\n';
    content += 'Last updated: December 2024\n\n';
    
    termsSections.forEach(section => {
        const title = section.querySelector('h2').textContent;
        const sectionContent = section.textContent.trim();
        
        content += `${title}\n`;
        content += `${'='.repeat(title.length)}\n\n`;
        content += `${sectionContent}\n\n`;
    });
    
    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'TimeTech_Terms_and_Conditions.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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

    // Observe terms sections
    const termsSections = document.querySelectorAll('.terms-section');
    termsSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(section);
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

// Search functionality for terms
function searchTerms(query) {
    const sections = document.querySelectorAll('.terms-section');
    const results = [];
    
    sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        const title = section.querySelector('h2').textContent;
        
        if (text.includes(query.toLowerCase())) {
            results.push({
                section: section,
                title: title,
                id: section.id
            });
        }
    });
    
    return results;
}

// Add search functionality (if needed)
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search terms...';
    searchInput.className = 'terms-search';
    searchInput.style.cssText = `
        width: 100%;
        padding: 10px 15px;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 300;
        margin-bottom: 20px;
    `;
    
    const tocSection = document.querySelector('.toc-section');
    tocSection.insertBefore(searchInput, tocSection.firstChild);
    
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        
        if (query.length > 2) {
            const results = searchTerms(query);
            highlightSearchResults(results);
        } else {
            clearSearchHighlights();
        }
    });
}

function highlightSearchResults(results) {
    // Clear previous highlights
    clearSearchHighlights();
    
    // Highlight matching sections
    results.forEach(result => {
        result.section.style.background = 'rgba(1, 137, 140, 0.05)';
        result.section.style.border = '1px solid rgba(1, 137, 140, 0.2)';
        result.section.style.borderRadius = '8px';
        result.section.style.padding = '20px';
        result.section.style.margin = '10px -20px';
    });
}

function clearSearchHighlights() {
    const sections = document.querySelectorAll('.terms-section');
    sections.forEach(section => {
        section.style.background = 'transparent';
        section.style.border = 'none';
        section.style.borderRadius = '0';
        section.style.padding = '0';
        section.style.margin = '0 0 3rem 0';
    });
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

// Print functionality
function printTerms() {
    window.print();
}

// Add print button functionality (if needed)
function addPrintButton() {
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '<i class="bi bi-printer"></i> Print Terms';
    printBtn.className = 'btn-print';
    printBtn.style.cssText = `
        background: linear-gradient(135deg, #01898c, #00b4d8);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 300;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 20px;
    `;
    
    printBtn.addEventListener('click', printTerms);
    
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.appendChild(printBtn);
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    // Uncomment to add search functionality
    // addSearchFunctionality();
    
    // Uncomment to add print button
    // addPrintButton();
}); 