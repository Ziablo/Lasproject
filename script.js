// ========================================
// Navigation
// ========================================

const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(13px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-13px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ========================================
// Smooth Scroll
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Intersection Observer
// ========================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
const animatedElements = document.querySelectorAll(
    '.menu-item, .vibe-card, .info-block, .section-header, .story-text, .image-card'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// ========================================
// Stagger Animation for Menu Items
// ========================================

const menuItems = document.querySelectorAll('.menu-item');
const menuObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            menuObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

menuItems.forEach(item => {
    menuObserver.observe(item);
});

// ========================================
// Stats Counter Animation
// ========================================

function animateCounter(element, target, suffix = '', duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = (suffix === '+' ? target + suffix : (suffix === '%' ? target + suffix : target));
            clearInterval(timer);
        } else {
            element.textContent = (suffix === '+' ? Math.floor(current) + suffix : (suffix === '%' ? Math.floor(current) + suffix : Math.floor(current)));
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            
            statNumbers.forEach(stat => {
                const text = stat.textContent.trim();
                
                if (text.includes('+')) {
                    const num = parseInt(text);
                    animateCounter(stat, num, '+');
                } else if (text === '100%') {
                    animateCounter(stat, 100, '%');
                } else if (text === '#1') {
                    stat.textContent = '#1';
                }
            });
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ========================================
// Parallax Effect
// ========================================

let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ========================================
// Card Hover 3D Tilt
// ========================================

const cards = document.querySelectorAll('.menu-item, .vibe-card, .info-block');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        this.style.transition = 'transform 0.5s ease';
    });
});

// ========================================
// Image Reveal Animation
// ========================================

const imageCards = document.querySelectorAll('.image-card, .vibe-image, .location-image');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.clipPath = 'inset(0 0 0 0)';
            entry.target.style.transform = 'scale(1)';
            imageObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

imageCards.forEach(card => {
    card.style.clipPath = 'inset(10% 10% 10% 10%)';
    card.style.transform = 'scale(0.9)';
    card.style.transition = 'clip-path 1s ease, transform 1s ease';
    imageObserver.observe(card);
});

// ========================================
// Loading Animation
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// Active Section Highlight
// ========================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

function setActiveLink() {
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ========================================
// Falafel Progress Bar (Visual Delight)
// ========================================

function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'falafel-progress';
    progressBar.innerHTML = '<div class="falafel-fill"><span class="falafel-emoji">🥙</span></div>';
    
    const style = document.createElement('style');
    style.textContent = `
        .falafel-progress {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: rgba(45, 95, 60, 0.2);
            z-index: 9999;
            overflow: hidden;
        }
        .falafel-fill {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, 
                var(--green-primary) 0%, 
                var(--yellow-falafel) 50%, 
                var(--green-primary) 100%);
            transition: width 0.1s ease;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 5px;
        }
        .falafel-emoji {
            font-size: 20px;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        const fill = progressBar.querySelector('.falafel-fill');
        fill.style.width = scrolled + '%';
    });
}

createProgressBar();

// ========================================
// Floating Falafel Animations
// ========================================

function createFloatingFalafel() {
    const falafel = document.createElement('div');
    falafel.className = 'floating-falafel';
    falafel.textContent = ['🥙', '🧆', '🥗', '🫓'][Math.floor(Math.random() * 4)];
    falafel.style.cssText = `
        position: fixed;
        font-size: ${Math.random() * 30 + 20}px;
        opacity: 0.6;
        pointer-events: none;
        z-index: 9998;
        left: ${Math.random() * 100}vw;
        top: -50px;
        animation: fall ${Math.random() * 4 + 5}s linear;
    `;
    
    document.body.appendChild(falafel);
    
    setTimeout(() => {
        falafel.remove();
    }, 9000);
}

const fallAnimation = document.createElement('style');
fallAnimation.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(${Math.random() * 720}deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(fallAnimation);

// Create floating falafels when in menu section
let falafelInterval;
const menuSection = document.querySelector('.menu-section');

const menuSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            falafelInterval = setInterval(() => {
                if (Math.random() > 0.6) {
                    createFloatingFalafel();
                }
            }, 2500);
        } else {
            clearInterval(falafelInterval);
        }
    });
}, { threshold: 0.3 });

if (menuSection) {
    menuSectionObserver.observe(menuSection);
}

// ========================================
// Special Effects on Featured Items
// ========================================

const featuredItems = document.querySelectorAll('.menu-item.featured, .vibe-card.featured-vibe');

featuredItems.forEach(item => {
    setInterval(() => {
        item.style.boxShadow = '0 8px 48px rgba(244, 196, 48, 0.3)';
        setTimeout(() => {
            item.style.boxShadow = '0 4px 24px rgba(45, 95, 60, 0.15)';
        }, 1000);
    }, 3000);
});

// ========================================
// Image Lazy Loading Enhancement
// ========================================

if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                }
                lazyImageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        lazyImageObserver.observe(img);
    });
}

// ========================================
// Keyboard Navigation
// ========================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// ========================================
// Dynamic Queue Counter (Fun Effect)
// ========================================

function createQueueCounter() {
    const counter = document.createElement('div');
    counter.className = 'queue-counter';
    counter.innerHTML = `
        <span class="queue-icon">👥</span>
        <span class="queue-text">File d'attente: <strong id="queueNumber">0</strong> personnes</span>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .queue-counter {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--yellow-falafel);
            color: var(--green-dark);
            padding: 1rem 1.5rem;
            border-radius: 50px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.2);
            display: none;
            align-items: center;
            gap: 0.75rem;
            z-index: 999;
            font-weight: 700;
            animation: slideInRight 0.5s ease-out;
        }
        .queue-counter.show {
            display: flex;
        }
        .queue-icon {
            font-size: 1.5rem;
        }
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
            }
            to {
                transform: translateX(0);
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(counter);
    
    // Show counter in vibes section
    const vibesSection = document.querySelector('.vibes-section');
    const queueObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counter.classList.add('show');
                
                // Animate queue number
                let count = 0;
                const target = Math.floor(Math.random() * 20) + 10;
                const numberEl = document.getElementById('queueNumber');
                
                const queueInterval = setInterval(() => {
                    count++;
                    numberEl.textContent = count;
                    if (count >= target) {
                        clearInterval(queueInterval);
                    }
                }, 100);
            } else {
                counter.classList.remove('show');
            }
        });
    }, { threshold: 0.5 });
    
    if (vibesSection) {
        queueObserver.observe(vibesSection);
    }
}

createQueueCounter();

// ========================================
// Console Easter Egg
// ========================================

console.log(
    '%c🥙 L\'AS DU FALLAFEL 🥙',
    'font-size: 28px; color: #2D5F3C; font-weight: bold; text-shadow: 2px 2px 4px rgba(244,196,48,0.5);'
);
console.log(
    '%cLe Meilleur Falafel de Paris depuis 1979 ! 🇫🇷',
    'font-size: 16px; color: #F4C430; font-weight: bold;'
);
console.log(
    '%cToujours Imité, Jamais Égalé',
    'font-size: 14px; color: #2C2416; font-style: italic;'
);
console.log(
    '%c📍 34 rue des Rosiers, 75004 Paris',
    'font-size: 12px; color: #5A4D3A;'
);
console.log(
    '%c⭐ Recommandé par Lenny Kravitz',
    'font-size: 12px; color: #DC143C; font-weight: bold;'
);
console.log(
    '%c💡 Astuce dev: Regarde la barre de progression en haut (c\'est un falafel qui avance!) 🥙',
    'font-size: 10px; color: #4A8F5E; font-style: italic;'
);

// ========================================
// Performance: Debounce
// ========================================

function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('scroll', debounce(setActiveLink, 50));

// ========================================
// Initialize
// ========================================

console.log('✅ L\'As du Fallafel site initialized');
console.log('🥙 Bon appétit !');
