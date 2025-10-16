// Global state for filtering
let currentFilter = 'all';
let allProjects = [];
let filteredProjects = [];

// Initialize the page when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeProjects();
  setupEventListeners();
  setupAnimations();
});

// Initialize project cards
function initializeProjects() {
  const projectCards = document.querySelectorAll('.project-card');
  if (!projectCards.length) {
    console.warn('No project cards found on the page.');
    return;
  }
  allProjects = Array.from(projectCards);
  filteredProjects = [...allProjects];
  applyFilter();
}

// Set up event listeners
function setupEventListeners() {
  const categoryButtons = document.querySelectorAll('.filter-btn[data-category]');
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.getAttribute('data-category');
      document.querySelectorAll('.filter-btn[data-category]').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      currentFilter = filterValue;
      applyFilter();
    });
  });

  // Set up image click listeners for modal
  setupImageModalListeners();
}

// Set up image modal functionality
function setupImageModalListeners() {
  const projectImages = document.querySelectorAll('.project-image img');
  const modalElement = document.getElementById('imageModal');
  const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('imageModalLabel');

  projectImages.forEach(img => {
    // Remove existing event listeners to prevent duplicates
    img.removeEventListener('click', handleImageClick);
    img.addEventListener('click', handleImageClick);
  });

  function handleImageClick(event) {
    const projectCard = event.target.closest('.project-card');
    const projectTitle = projectCard.querySelector('h3').textContent;
    
    modalImage.src = event.target.src;
    modalImage.alt = event.target.alt;
    modalTitle.textContent = projectTitle;
    modal.show();
  }

  // Ensure modal closes properly
  modalElement.addEventListener('hidden.bs.modal', function () {
    modalImage.src = '';
    modalImage.alt = '';
    modalTitle.textContent = 'Project Image';
  });
}

// Apply category filter
function applyFilter() {
  filteredProjects = allProjects.filter(project => {
    const category = project.getAttribute('data-category');
    return currentFilter === 'all' || category === currentFilter;
  });
  updateProjectDisplay();
}

// Update the display of project cards with animations
function updateProjectDisplay() {
  const projectsGrid = document.getElementById('projectsGrid');
  if (!projectsGrid) {
    console.warn('Projects grid element not found.');
    return;
  }

  allProjects.forEach(project => {
    project.style.display = 'none';
    project.style.opacity = '0';
    project.style.transform = 'translateY(20px)';
  });

  filteredProjects.forEach((project, index) => {
    setTimeout(() => {
      project.style.display = 'block';
      project.style.opacity = '1';
      project.style.transform = 'translateY(0)';
    }, index * 100);
  });

  // Re-attach event listeners to newly displayed images
  setTimeout(() => {
    setupImageModalListeners();
  }, filteredProjects.length * 100);
}

// Set up intersection observer for animations
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
      }
    });
  }, observerOptions);

  document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}