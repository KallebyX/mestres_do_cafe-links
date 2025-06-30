// ===== APPLE-STYLE EFFECTS =====

// ===== PARALLAX SCROLL EFFECTS =====
class ParallaxManager {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        // Register parallax elements
        this.registerElement('.hero__background', 0.5);
        this.registerElement('.hero__particles', 0.3);
        this.registerElement('.hero__image-container', 0.2);
        
        this.bindEvents();
    }

    registerElement(selector, speed) {
        const element = document.querySelector(selector);
        if (element) {
            this.elements.push({ element, speed });
        }
    }

    bindEvents() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateParallax() {
        const scrollTop = window.pageYOffset;
        
        this.elements.forEach(({ element, speed }) => {
            const yPos = -(scrollTop * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }
}

// ===== MAGNETIC CURSOR EFFECTS =====
class MagneticCursor {
    constructor() {
        this.cursor = null;
        this.cursorFollower = null;
        this.init();
    }

    init() {
        this.createCursor();
        this.bindEvents();
    }

    createCursor() {
        // Create custom cursor
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: var(--color-accent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;

        this.cursorFollower = document.createElement('div');
        this.cursorFollower.className = 'cursor-follower';
        this.cursorFollower.style.cssText = `
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid var(--color-accent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            opacity: 0.5;
        `;

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorFollower);
    }

    bindEvents() {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            this.cursor.style.left = mouseX - 5 + 'px';
            this.cursor.style.top = mouseY - 5 + 'px';
        });

        // Smooth follower animation
        const animateFollower = () => {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            this.cursorFollower.style.left = followerX - 20 + 'px';
            this.cursorFollower.style.top = followerY - 20 + 'px';
            
            requestAnimationFrame(animateFollower);
        };
        animateFollower();

        // Magnetic effect on interactive elements
        document.querySelectorAll('.btn--apple, .theme-toggle, .stat-item').forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
                this.cursorFollower.style.transform = 'scale(1.2)';
                this.cursorFollower.style.opacity = '0.8';
            });

            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursorFollower.style.transform = 'scale(1)';
                this.cursorFollower.style.opacity = '0.5';
            });
        });
    }
}

// ===== FLUID ANIMATIONS =====
class FluidAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupHoverEffects();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements for animation
        document.querySelectorAll('.stat-item, .hero__description, .btn--apple').forEach(el => {
            observer.observe(el);
        });
    }

    setupScrollAnimations() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const direction = currentScrollY > lastScrollY ? 'down' : 'up';
            
            // Header animation
            const header = document.querySelector('.header');
            if (currentScrollY > 100) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
            
            // Parallax title effect
            const title = document.querySelector('.hero__title');
            if (title) {
                const scrollPercent = currentScrollY / window.innerHeight;
                title.style.transform = `translateY(${scrollPercent * 50}px) scale(${1 - scrollPercent * 0.1})`;
                title.style.opacity = 1 - scrollPercent * 0.5;
            }
            
            lastScrollY = currentScrollY;
        });
    }

    setupHoverEffects() {
        // Enhanced button hover effects
        document.querySelectorAll('.btn--apple').forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createRipple(e, button);
            });
        });

        // Stat items floating effect
        document.querySelectorAll('.stat-item').forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-12px) scale(1.03)';
                item.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.2)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
                item.style.boxShadow = 'var(--shadow-apple-sm)';
            });
        });
    }

    createRipple(event, element) {
        const ripple = element.querySelector('.btn__ripple');
        if (!ripple) return;

        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        ripple.classList.add('ripple-animate');
        
        setTimeout(() => {
            ripple.classList.remove('ripple-animate');
        }, 600);
    }
}

// ===== ENHANCED THEME MANAGER =====
class AppleThemeManager extends ThemeManager {
    constructor() {
        super();
        this.setupAdvancedTransitions();
    }

    setupAdvancedTransitions() {
        // Add transition overlay for smooth theme switching
        this.overlay = document.createElement('div');
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                        var(--color-bg-primary) 0%, 
                        var(--color-bg-primary) 30%, 
                        transparent 100%);
            pointer-events: none;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;
        document.body.appendChild(this.overlay);
    }

    toggleTheme() {
        // Get mouse position for radial transition
        const mouseX = (this.lastMouseX / window.innerWidth) * 100;
        const mouseY = (this.lastMouseY / window.innerHeight) * 100;
        
        this.overlay.style.setProperty('--mouse-x', mouseX + '%');
        this.overlay.style.setProperty('--mouse-y', mouseY + '%');
        
        // Animate transition
        this.overlay.style.opacity = '1';
        
        setTimeout(() => {
            super.toggleTheme();
            
            setTimeout(() => {
                this.overlay.style.opacity = '0';
            }, 100);
        }, 250);
    }

    bindEvents() {
        super.bindEvents();
        
        // Track mouse position for theme transition
        document.addEventListener('mousemove', (e) => {
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
        });
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupReducedMotion();
        this.setupLazyLoading();
        this.optimizeAnimations();
    }

    setupReducedMotion() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition-duration', '0.01ms');
            
            // Disable parallax and complex animations
            document.querySelectorAll('[data-aos]').forEach(el => {
                el.removeAttribute('data-aos');
            });
        }
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
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

    optimizeAnimations() {
        // Use transform and opacity for better performance
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                animation: slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .ripple-animate {
                animation: rippleEffect 0.6s ease-out;
            }
            
            @keyframes rippleEffect {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Apple-style effects
    new ParallaxManager();
    new FluidAnimations();
    new PerformanceManager();
    
    // Initialize enhanced theme manager
    new AppleThemeManager();
    
    // Cursor magnético removido conforme solicitado
    
    console.log('🍎 Apple-style effects loaded successfully!');
});

