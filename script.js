// Multi-page website functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation based on current page
    setActiveNavigation();
    
    // Initialize page-specific functionality
    initializePageFeatures();
    
    // Add scroll animations for cards
    initializeScrollAnimations();
    
    // Mobile navigation toggle
    initializeMobileNav();
});

function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Check if current page matches the link
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function initializePageFeatures() {
    // Publications page filtering
    if (document.querySelector('.publication-filters')) {
        initializePublicationFilters();
    }
    
    // Smooth scrolling for any anchor links on the same page
    initializeSmoothScrolling();
}

function initializePublicationFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publications = document.querySelectorAll('.publication-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            publications.forEach(publication => {
                const shouldShow = filterPublications(publication, filter);
                
                if (shouldShow) {
                    publication.style.display = 'flex';
                    publication.style.opacity = '0';
                    setTimeout(() => {
                        publication.style.opacity = '1';
                    }, 50);
                } else {
                    publication.style.opacity = '0';
                    setTimeout(() => {
                        publication.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function filterPublications(publication, filter) {
    switch (filter) {
        case 'all':
            return true;
        case 'senior':
            return publication.classList.contains('senior');
        case 'first':
            return publication.classList.contains('first');
        case 'review':
            return publication.classList.contains('review');
        case '2024-2025':
            const year = publication.getAttribute('data-year');
            return year === '2024' || year === '2025';
        default:
            return true;
    }
}

function initializeSmoothScrolling() {
    // Only for anchor links on the same page
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe various card elements
    const animatedElements = document.querySelectorAll(`
        .research-card, 
        .member-card, 
        .publication-item, 
        .contact-card, 
        .project-card,
        .alumni-card,
        .culture-item,
        .external-link,
        .link-card,
        .collaboration-item,
        .opportunity-preview
    `);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

function initializeMobileNav() {
    // Add mobile menu functionality for very small screens
    if (window.innerWidth <= 480) {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '<span>☰</span>';
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
        
        // Style the button
        mobileMenuBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #2c5aa0;
            cursor: pointer;
            display: none;
            padding: 5px;
        `;
        
        navContainer.appendChild(mobileMenuBtn);
        
        // Toggle functionality
        let isMenuOpen = false;
        mobileMenuBtn.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.width = '100%';
                mobileMenuBtn.innerHTML = '<span>✕</span>';
            } else {
                navMenu.style.display = 'none';
                mobileMenuBtn.innerHTML = '<span>☰</span>';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.style.display = 'none';
                mobileMenuBtn.innerHTML = '<span>☰</span>';
                isMenuOpen = false;
            });
        });
        
        // Show/hide mobile menu button based on screen size
        function checkScreenSize() {
            if (window.innerWidth <= 480) {
                mobileMenuBtn.style.display = 'block';
                navMenu.style.display = 'none';
                isMenuOpen = false;
            } else {
                mobileMenuBtn.style.display = 'none';
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'row';
                navMenu.style.width = 'auto';
            }
        }
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    }
}

// Publications page specific functionality
function initializePublicationsPage() {
    // Add publication link tracking (optional analytics)
    const publicationLinks = document.querySelectorAll('.publication-links a');
    
    publicationLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track which publications are being accessed
            const publicationTitle = this.closest('.publication-item').querySelector('h3').textContent;
            console.log(`Publication accessed: ${publicationTitle}`);
            
            // Add visual feedback
            this.style.color = '#1e3d70';
            setTimeout(() => {
                this.style.color = '#2c5aa0';
            }, 2000);
        });
    });
}

// Contact page specific functionality
function initializeContactPage() {
    // Add form validation if you add a contact form later
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Optional: Track email clicks or show confirmation
            console.log('Email link clicked');
        });
    });
}

// People page specific functionality
function initializePeoplePage() {
    // Add member card interactions
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('open-position')) {
                this.style.transform = 'translateY(-10px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Research page specific functionality
function initializeResearchPage() {
    // Add research card interactions
    const researchCards = document.querySelectorAll('.research-card');
    
    researchCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 150);
        });
    });
}

// Initialize page-specific features based on current page
function initializePageSpecificFeatures() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'publications.html':
            initializePublicationsPage();
            break;
        case 'contact.html':
            initializeContactPage();
            break;
        case 'people.html':
            initializePeoplePage();
            break;
        case 'research.html':
            initializeResearchPage();
            break;
    }
}

// Call page-specific initialization
document.addEventListener('DOMContentLoaded', function() {
    initializePageSpecificFeatures();
});

// Utility function for lazy loading images (if you add images later)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Add keyboard shortcuts for navigation (optional)
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case '1':
                e.preventDefault();
                window.location.href = 'index.html';
                break;
            case '2':
                e.preventDefault();
                window.location.href = 'research.html';
                break;
            case '3':
                e.preventDefault();
                window.location.href = 'people.html';
                break;
            case '4':
                e.preventDefault();
                window.location.href = 'publications.html';
                break;
            case '5':
                e.preventDefault();
                window.location.href = 'contact.html';
                break;
        }
    }
});

// Add search functionality (basic implementation)
function addSearchFunctionality() {
    // This could be expanded to include site-wide search
    const searchableContent = document.querySelectorAll('p, h1, h2, h3, h4, h5, li');
    
    function searchSite(query) {
        const results = [];
        searchableContent.forEach(element => {
            if (element.textContent.toLowerCase().includes(query.toLowerCase())) {
                results.push({
                    element: element,
                    text: element.textContent,
                    page: window.location.pathname
                });
            }
        });
        return results;
    }
    
    // Expose search function globally if needed
    window.searchSite = searchSite;
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', addSearchFunctionality);

// Add print styles support
function optimizeForPrint() {
    const style = document.createElement('style');
    style.textContent = `
        @media print {
            .navbar, footer, .hero-buttons, .filter-btn, .btn-primary, .btn-secondary, .btn-outline {
                display: none !important;
            }
            
            .page-header, .hero {
                background: white !important;
                color: black !important;
                box-shadow: none !important;
            }
            
            .research-card, .member-card, .publication-item {
                box-shadow: none !important;
                border: 1px solid #ccc !important;
                page-break-inside: avoid;
            }
            
            a {
                color: black !important;
                text-decoration: underline !important;
            }
            
            .container {
                max-width: none !important;
                padding: 0 !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize print optimization
document.addEventListener('DOMContentLoaded', optimizeForPrint);
