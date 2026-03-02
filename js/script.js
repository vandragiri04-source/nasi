// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu when hamburger is clicked
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============ Dark Mode Toggle ============
const darkModeBtn = document.getElementById('darkModeBtn');
const htmlElement = document.documentElement;
// Update dark mode icon
function updateDarkModeIcon(isDarkMode) {
    if (darkModeBtn) {
        darkModeBtn.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

// Apply dark mode state (optionally store as user preference)
function applyDarkMode(isDark, userAction = false) {
    if (isDark) {
        document.body.classList.add('dark-mode');
        htmlElement.setAttribute('data-theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        htmlElement.setAttribute('data-theme', 'light');
    }
    updateDarkModeIcon(isDark);
    if (userAction) {
        // store explicit user choice
        localStorage.setItem('darkMode', isDark);
    }
}

// Detect system preference and initialize theme
const prefersDarkMQ = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

function loadDarkModePreference() {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
        applyDarkMode(stored === 'true', false);
    } else if (prefersDarkMQ) {
        applyDarkMode(prefersDarkMQ.matches, false);
    } else {
        applyDarkMode(false, false);
    }
}

// Listen to system preference changes only if user has NOT set a preference
if (prefersDarkMQ && prefersDarkMQ.addEventListener) {
    prefersDarkMQ.addEventListener('change', e => {
        if (localStorage.getItem('darkMode') === null) {
            applyDarkMode(e.matches, false);
        }
    });
}

// Toggle dark mode via button (user action overrides system)
if (darkModeBtn) {
    darkModeBtn.addEventListener('click', () => {
        const isDark = !document.body.classList.contains('dark-mode');
        applyDarkMode(isDark, true);
    });
}

// Load dark mode preference on page load
document.addEventListener('DOMContentLoaded', loadDarkModePreference);

// ============ Carousel Functionality ============
let currentSlideIndex = 0;
let carouselPhotos = [];

// Function to load Instagram photos
async function loadInstagramPhotos() {
    try {
        // Metode 1: Menggunakan Instagram Embedded Posts dengan fetch dari local API
        // atau menggunakan Instagram images dari URL langsung
        
        // Default fallback images (user bisa update dengan real Instagram photos)
        carouselPhotos = [
            { url: 'images/galeri1.jpg', alt: 'Galeri SMAN 33 Jakarta 1' },
            { url: 'images/galeri2.jpg', alt: 'Galeri SMAN 33 Jakarta 2' },
            { url: 'images/galeri3.jpg', alt: 'Galeri SMAN 33 Jakarta 3' },
            { url: 'images/galeri4.jpg', alt: 'Galeri SMAN 33 Jakarta 4' },
            { url: 'images/galeri5.jpg', alt: 'Galeri SMAN 33 Jakarta 5' }
        ];

        // Render carousel dengan photos
        renderCarousel(carouselPhotos);
    } catch (error) {
        console.error('Error loading Instagram photos:', error);
        // Tampilkan fallback message
        document.getElementById('carouselWrapper').innerHTML = `
            <div class=\"carousel-loading\">
                <p>📸 Galeri Instagram sedang dimuat...</p>
                <p style=\"font-size: 0.9rem; margin-top: 10px;\">Pastikan folder 'images/' berisi foto dari Instagram SMAN 33 Jakarta</p>
            </div>
        `;
    }
}

function renderCarousel(photos) {
    const carouselWrapper = document.getElementById('carouselWrapper');
    const carouselDots = document.getElementById('carouselDots');
    
    // Clear existing content
    carouselWrapper.innerHTML = '';
    carouselDots.innerHTML = '';

    // Create slides
    photos.forEach((photo, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide' + (index === 0 ? ' active' : '');
        slide.innerHTML = `<img src="${photo.url}" alt="${photo.alt}" onerror="this.style.display='none'; this.parentElement.style.display='flex'; this.parentElement.innerHTML='<div style=\\'width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg, #F5E6D3 0%, #E8D4B8 100%); color:#1B4D3E; text-align:center; padding:2rem;\\'>📷 Foto tidak tersedia. <br> Silakan tambahkan foto di folder images/<\\/div>';">`;
        carouselWrapper.appendChild(slide);

        // Create dot
        const dot = document.createElement('span');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.onclick = () => currentSlide(index);
        carouselDots.appendChild(dot);
    });

    // Update counter
    updateSlideCounter(photos.length);
}

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    if (totalSlides === 0) return;

    // Wrap around
    if (index >= totalSlides) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = totalSlides - 1;
    } else {
        currentSlideIndex = index;
    }

    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    // Show current slide and activate dot
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');

    // Update counter
    updateSlideCounter(totalSlides);
}

function changeSlide(n) {
    showSlide(currentSlideIndex + n);
}

function currentSlide(n) {
    showSlide(n);
}

function updateSlideCounter(total) {
    const counter = document.getElementById('slide-counter');
    if (counter) {
        counter.textContent = `${currentSlideIndex + 1} / ${total}`;
    }
}

// Load carousel on page ready
document.addEventListener('DOMContentLoaded', () => {
    loadInstagramPhotos();
});

// Auto-rotate slides every 7 seconds
let autoRotateInterval = setInterval(() => {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length > 0) {
        changeSlide(1);
    }
}, 7000);

// Reset auto-rotate on manual navigation
document.addEventListener('click', function(e) {
    if (e.target.closest('.carousel-prev, .carousel-next, .dot')) {
        clearInterval(autoRotateInterval);
        autoRotateInterval = setInterval(() => {
            const slides = document.querySelectorAll('.carousel-slide');
            if (slides.length > 0) {
                changeSlide(1);
            }
        }, 7000);
    }
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    }
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll for feature cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card, .vm-card, .info-card').forEach(card => {
    observer.observe(card);
});

// ============ Google Maps Integration ============
const addressLink = document.querySelector('.address-link');
if (addressLink) {
    addressLink.addEventListener('click', (e) => {
        // Feedback visual saat diklik
        addressLink.style.transform = 'scale(0.98)';
        setTimeout(() => {
            addressLink.style.transform = 'scale(1)';
        }, 100);
    });
}

// Define animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
