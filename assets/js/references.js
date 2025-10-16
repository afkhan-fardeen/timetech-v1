// References Page JavaScript

// Animation setup
document.addEventListener('DOMContentLoaded', function() {
  setupAnimations();
  setupImageErrorHandling();
});

// Setup animations for reference cards and hero stats
function setupAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.animation = 'fadeInUp 0.8s ease';
      }
    });
  }, observerOptions);

  // Observe reference cards
  document.querySelectorAll('.reference-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    observer.observe(card);
  });

  // Observe hero stats
  document.querySelectorAll('.stat-item').forEach(stat => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(30px)';
    observer.observe(stat);
  });
}

// Handle image loading errors to prevent loops
function setupImageErrorHandling() {
  document.querySelectorAll('.reference-logo-img').forEach(img => {
    img.addEventListener('error', function handleError() {
      // Set to placeholder and remove onerror to prevent loops
      this.src = '/assets/images/references/placeholder-logo.webp';
      this.removeEventListener('error', handleError);
      // Add a class to track if placeholder was used
      this.classList.add('placeholder-loaded');
      console.warn(`Image failed to load: ${this.alt}, using placeholder at /assets/images/references/placeholder-logo.webp`);
    });
  });
}