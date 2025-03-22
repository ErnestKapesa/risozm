// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle with Animation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Image configuration
const IMAGE_CONFIG = {
    baseUrl: './images/',
    fallbackUrl: './images/placeholder.jpg',
    images: {
        logo: 'logofooter.png',
        hero: 'Riso-GL9730.jpg',
        ft5430: '3.-FT-Series-brochure-P6_FT5430-ScannerASFMFF.jpg',
        ftSeries: 'ft-series-boxed.jpg',
        glSeries: 'gl-series-boxed.png',
        valezus: 'valezus-boxed.jpg',
        gl9730: 'Riso-GL9730.jpg',
        other: 'Untitled-5-1.png'
    }
};

// Product data with more details
const products = {
    variablePrinters: [
        {
            name: 'ComColor FT5430',
            imageKey: 'ft5430',
            description: 'High-speed inkjet printer delivering exceptional reliability and performance for your business needs.',
            specs: {
                speed: 'Up to 140 ppm',
                resolution: '600 x 600 dpi',
                paperSize: 'A3/Ledger'
            }
        },
        {
            name: 'ComColor GL7430',
            imageKey: 'glSeries',
            description: 'Advanced inkjet system with superior color quality and professional-grade output capabilities.',
            specs: {
                speed: 'Up to 160 ppm',
                resolution: '600 x 600 dpi',
                paperSize: 'A3/Ledger'
            }
        }
    ],
    duplicators: [
        {
            name: 'VALEZUS T2100',
            imageKey: 'valezus',
            description: 'High-volume production printer designed for professional print shops and large organizations.',
            specs: {
                speed: 'Up to 200 ppm',
                resolution: '600 x 600 dpi',
                paperSize: 'A3/Ledger'
            }
        },
        {
            name: 'Digital Duplicator SF9450',
            imageKey: 'other',
            description: 'Efficient digital duplicator perfect for high-volume printing with exceptional cost performance.',
            specs: {
                speed: 'Up to 150 ppm',
                resolution: '600 x 600 dpi',
                paperSize: 'A3/Ledger'
            }
        }
    ]
};

// Helper function to get image URL with error handling
function getImageUrl(imageKey) {
    try {
        const imagePath = IMAGE_CONFIG.images[imageKey];
        if (!imagePath) {
            console.warn(`Image key "${imageKey}" not found in configuration`);
            return IMAGE_CONFIG.fallbackUrl;
        }
        return IMAGE_CONFIG.baseUrl + imagePath;
    } catch (error) {
        console.error('Error getting image URL:', error);
        return IMAGE_CONFIG.fallbackUrl;
    }
}

// Initialize animations
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Create product card with enhanced styling and error handling
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card animate-on-scroll';
    
    const imageUrl = getImageUrl(product.imageKey);
    
    card.innerHTML = `
        <div class="product-image-container">
            <img src="${imageUrl}" 
                 alt="${product.name}" 
                 class="product-image"
                 loading="lazy"
                 onerror="this.src='${IMAGE_CONFIG.fallbackUrl}'; this.classList.add('error');">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-specs">
                <div><i class="fas fa-tachometer-alt"></i> ${product.specs.speed}</div>
                <div><i class="fas fa-expand"></i> ${product.specs.resolution}</div>
                <div><i class="fas fa-file"></i> ${product.specs.paperSize}</div>
            </div>
            <button class="cta-button">Learn More</button>
        </div>
    `;
    
    // Add click event to the Learn More button
    const button = card.querySelector('.cta-button');
    button.addEventListener('click', () => {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    });

    // Add image load error handling
    const img = card.querySelector('.product-image');
    img.addEventListener('error', function() {
        this.classList.add('error');
        console.warn(`Failed to load image for ${product.name}`);
    });
    
    return card;
}

// Load products with animation delay
function loadProducts() {
    const variablePrintersGrid = document.querySelector('#variable-printers');
    const duplicatorsGrid = document.querySelector('#duplicators');

    if (variablePrintersGrid && duplicatorsGrid) {
        products.variablePrinters.forEach((product, index) => {
            const card = createProductCard(product);
            card.style.animationDelay = `${index * 0.2}s`;
            variablePrintersGrid.appendChild(card);
        });

        products.duplicators.forEach((product, index) => {
            const card = createProductCard(product);
            card.style.animationDelay = `${index * 0.2}s`;
            duplicatorsGrid.appendChild(card);
        });

        // Initialize animations for product cards
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
}

// Ensure content is loaded before animations
document.addEventListener('DOMContentLoaded', () => {
    // Immediately show the page content
    document.body.style.visibility = 'visible';
    
    // Set logo with error handling
    const logo = document.querySelector('.navbar-logo img');
    if (logo) {
        logo.src = getImageUrl('logo');
        logo.onerror = function() {
            console.warn('Failed to load logo image');
            this.classList.add('error');
        };
    }
    
    // Load products immediately
    loadProducts();
    
    // Initialize animations with a slight delay
    setTimeout(() => {
        initAnimations();
    }, 100);
    
    // Mobile menu functionality
    initializeMobileMenu();
    
    // Initialize smooth scroll
    initializeSmoothScroll();
    
    // Initialize contact form
    initializeContactForm();
});

// Animation observers
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            scrollObserver.unobserve(entry.target);
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
});

// Content observer for lazy loading
const contentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
            contentObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

// Initialize mobile menu
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }
}

// Initialize smooth scroll
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                const hamburger = document.querySelector('.hamburger');
                const navLinks = document.querySelector('.nav-links');
                if (hamburger && navLinks) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
}

// Initialize contact form
function initializeContactForm() {
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                contactForm.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            } catch (error) {
                console.error('Error submitting form:', error);
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        });
    }
}

// Create product card with simplified animation
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const imageUrl = getImageUrl(product.imageKey);
    
    card.innerHTML = `
        <div class="product-image-container">
            <img src="${imageUrl}" 
                 alt="${product.name}" 
                 class="product-image"
                 loading="lazy"
                 onerror="this.src='${IMAGE_CONFIG.fallbackUrl}'; this.classList.add('error');">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-specs">
                <div><i class="fas fa-tachometer-alt"></i> ${product.specs.speed}</div>
                <div><i class="fas fa-expand"></i> ${product.specs.resolution}</div>
                <div><i class="fas fa-file"></i> ${product.specs.paperSize}</div>
            </div>
            <button class="cta-button">Learn More</button>
        </div>
    `;
    
    // Add click event to the Learn More button
    const button = card.querySelector('.cta-button');
    button.addEventListener('click', () => {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    });
    
    return card;
}

// Load products without animation delay
function loadProducts() {
    const variablePrintersGrid = document.querySelector('#variable-printers');
    const duplicatorsGrid = document.querySelector('#duplicators');

    if (variablePrintersGrid && duplicatorsGrid) {
        products.variablePrinters.forEach(product => {
            const card = createProductCard(product);
            variablePrintersGrid.appendChild(card);
        });

        products.duplicators.forEach(product => {
            const card = createProductCard(product);
            duplicatorsGrid.appendChild(card);
        });
    }
} 