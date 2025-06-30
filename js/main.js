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
                
                // Record in real analytics
                this.recordRealAnalytic('whatsapp_clicks', `Clique no WhatsApp ${contact}`);
            });
        });

        // Google Reviews button
        document.querySelectorAll('a[href*="g.co/kgs"]').forEach(button => {
            button.addEventListener('click', () => {
                this.trackEvent('click', 'Google', 'Avaliacao');
                
                // Record in real analytics
                this.recordRealAnalytic('google_clicks', 'Clique nas avaliações Google');
            });
        });

        // Links page button
        document.querySelectorAll('a[href*="/links"]').forEach(button => {
            button.addEventListener('click', () => {
                this.trackEvent('click', 'Navigation', 'Links_Page');
                
                // Record activity
                this.recordRealActivity('Página Links acessada', 'Usuário navegou para página Linktree', 'fas fa-link', '#6c5ce7');
            });
        });
    }

    recordRealAnalytic(type, description) {
        try {
            // Increment counter in localStorage
            const currentCount = localStorage.getItem(`mestres_analytics_${type}`) || '0';
            const newCount = parseInt(currentCount) + 1;
            localStorage.setItem(`mestres_analytics_${type}`, newCount.toString());
            
            // Record activity
            let icon = 'fas fa-mouse-pointer';
            let color = '#b58150';
            
            if (type.includes('whatsapp')) {
                icon = 'fab fa-whatsapp';
                color = '#25D366';
            } else if (type.includes('google')) {
                icon = 'fab fa-google';
                color = '#4285F4';
            }
            
            this.recordRealActivity('Novo clique registrado', description, icon, color);
        } catch (error) {
            console.warn('Could not record analytic:', error);
        }
    }

    recordRealActivity(title, description, icon = 'fas fa-circle', color = '#b58150') {
        try {
            const activities = JSON.parse(localStorage.getItem('mestres_activity_history') || '[]');
            const now = new Date();
            
            const newActivity = {
                icon: icon,
                color: color,
                title: title,
                description: description,
                time: this.getTimeAgo(now),
                timestamp: now.toISOString()
            };
            
            activities.unshift(newActivity);
            
            // Keep only last 50 activities
            if (activities.length > 50) {
                activities.splice(50);
            }
            
            localStorage.setItem('mestres_activity_history', JSON.stringify(activities));
        } catch (error) {
            console.warn('Could not record activity:', error);
        }
    }

    getTimeAgo(date) {
        const now = new Date();
        const diffMs = now - new Date(date);
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 1) return 'Agora';
        if (diffMins < 60) return `${diffMins} min atrás`;
        const diffHours = Math.floor(diffMs / 3600000);
        if (diffHours < 24) return `${diffHours}h atrás`;
        const diffDays = Math.floor(diffMs / 86400000);
        return `${diffDays}d atrás`;
    }

    trackPageViews() {
        // Track time on page and record real analytics
        const startTime = Date.now();
        
        // Record page view
        const currentVisitors = localStorage.getItem('mestres_analytics_unique_visitors') || '0';
        const sessionVisitor = sessionStorage.getItem('counted_visitor');
        
        if (!sessionVisitor) {
            const newCount = parseInt(currentVisitors) + 1;
            localStorage.setItem('mestres_analytics_unique_visitors', newCount.toString());
            sessionStorage.setItem('counted_visitor', 'true');
            sessionStorage.setItem('session_start', startTime.toString());
            
            // Record activity
            this.recordRealActivity(
                'Novo visitante',
                `Acesso via ${window.location.pathname}`,
                'fas fa-users',
                '#b58150'
            );
            
            // Record daily visit
            this.recordDailyVisit();
            
            // Record device visit
            this.recordDeviceVisit();
        }
        
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            this.trackEvent('timing_complete', 'Page', 'Time_Spent', timeSpent);
            
            // Update average time if this session was longer
            const currentAvg = localStorage.getItem('mestres_analytics_average_time') || '0';
            if (timeSpent > parseInt(currentAvg)) {
                localStorage.setItem('mestres_analytics_average_time', timeSpent.toString());
            }
        });
    }

    recordDailyVisit() {
        try {
            const today = new Date().toISOString().split('T')[0];
            const trafficHistory = JSON.parse(localStorage.getItem('mestres_traffic_history') || '{}');
            
            // Increment today's count
            trafficHistory[today] = (trafficHistory[today] || 0) + 1;
            
            localStorage.setItem('mestres_traffic_history', JSON.stringify(trafficHistory));
        } catch (error) {
            console.warn('Could not record daily visit:', error);
        }
    }

    recordDeviceVisit() {
        try {
            const device = this.detectDevice();
            const deviceStats = JSON.parse(localStorage.getItem('mestres_device_stats') || '{"mobile":0,"desktop":0,"tablet":0}');
            
            // Only record once per session
            if (!sessionStorage.getItem('device_recorded')) {
                deviceStats[device] = (deviceStats[device] || 0) + 1;
                localStorage.setItem('mestres_device_stats', JSON.stringify(deviceStats));
                sessionStorage.setItem('device_recorded', 'true');
                
                // Record activity
                this.recordRealActivity(
                    `Acesso via ${device}`,
                    `Usuário acessou usando dispositivo ${device}`,
                    device === 'mobile' ? 'fas fa-mobile-alt' : device === 'tablet' ? 'fas fa-tablet-alt' : 'fas fa-desktop',
                    device === 'mobile' ? '#fd79a8' : device === 'tablet' ? '#74b9ff' : '#636e72'
                );
            }
        } catch (error) {
            console.warn('Could not record device visit:', error);
        }
    }

    detectDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
        const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent);
        
        if (isTablet) return 'tablet';
        if (isMobile) return 'mobile';
        return 'desktop';
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

