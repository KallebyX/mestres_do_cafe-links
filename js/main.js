// ===== MAIN JAVASCRIPT =====

// ===== DARK MODE FUNCTIONALITY =====
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.bindEvents();
    }

    bindEvents() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
        this.updateToggleIcon();
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Analytics event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'theme_toggle', {
                'event_category': 'UI',
                'event_label': newTheme
            });
        }
    }

    updateToggleIcon() {
        if (this.themeToggle) {
            const icon = this.themeToggle.querySelector('i');
            if (icon) {
                icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }
}

// ===== MOBILE NAVIGATION =====
class MobileNav {
    constructor() {
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.querySelector('.nav__menu');
        this.navLinks = document.querySelectorAll('.nav__link');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMenu());
        }

        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }

    toggleMenu() {
        this.navMenu?.classList.toggle('nav__menu--open');
        this.navToggle?.classList.toggle('nav__toggle--open');
    }

    closeMenu() {
        this.navMenu?.classList.remove('nav__menu--open');
        this.navToggle?.classList.remove('nav__toggle--open');
    }
}

// ===== SMOOTH SCROLLING =====
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ===== HEADER SCROLL EFFECT =====
class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        if (window.scrollY > 100) {
            this.header?.classList.add('header--scrolled');
        } else {
            this.header?.classList.remove('header--scrolled');
        }
    }
}

// ===== ANALYTICS TRACKING =====
class AnalyticsTracker {
    constructor() {
        this.init();
    }

    init() {
        this.trackButtonClicks();
        this.trackPageViews();
    }

    trackButtonClicks() {
        // WhatsApp buttons
        document.querySelectorAll('a[href*="wa.me"]').forEach(button => {
            button.addEventListener('click', (e) => {
                const contact = button.href.includes('5555996458600') ? 'Daniel' : 'Fabricio';
                this.trackEvent('click', 'WhatsApp', contact);
            });
        });

        // Google Reviews button
        document.querySelectorAll('a[href*="g.co/kgs"]').forEach(button => {
            button.addEventListener('click', () => {
                this.trackEvent('click', 'Google', 'Avaliacao');
            });
        });

        // Links page button
        document.querySelectorAll('a[href*="/links"]').forEach(button => {
            button.addEventListener('click', () => {
                this.trackEvent('click', 'Navigation', 'Links_Page');
            });
        });
    }

    trackPageViews() {
        // Track time on page
        const startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            this.trackEvent('timing_complete', 'Page', 'Time_Spent', timeSpent);
        });
    }

    trackEvent(action, category, label, value = null) {
        if (typeof gtag !== 'undefined') {
            const eventData = {
                'event_category': category,
                'event_label': label
            };
            
            if (value !== null) {
                eventData.value = value;
            }
            
            gtag('event', action, eventData);
        }
    }
}

// ===== ANIMATIONS =====
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        // Initialize AOS if available
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        }

        // Add loading animations
        this.addLoadingAnimations();
    }

    addLoadingAnimations() {
        // Fade in page content
        document.body.style.opacity = '0';
        window.addEventListener('load', () => {
            document.body.style.transition = 'opacity 0.5s ease-in-out';
            document.body.style.opacity = '1';
        });

        // Animate stats numbers
        this.animateStats();
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateNumber(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    animateNumber(element) {
        const text = element.textContent;
        const number = parseInt(text.replace(/[^\d]/g, ''));
        const suffix = text.replace(/[\d]/g, '');
        
        let current = 0;
        const increment = number / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 30);
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ThemeManager();
    new MobileNav();
    new SmoothScroll();
    new HeaderScroll();
    new AnalyticsTracker();
    new AnimationManager();

    console.log('🔥 Mestres do Café - Site carregado com sucesso!');
});

