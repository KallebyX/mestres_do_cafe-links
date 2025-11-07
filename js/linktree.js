// ===== LINKTREE SPECIFIC JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    // ===== ENHANCED ANIMATIONS =====
    
    // Staggered entrance animation for links
    const links = document.querySelectorAll('.linktree-link');
    links.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            link.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, (index + 1) * 150);
    });

    // ===== INTERACTIVE EFFECTS =====
    
    // Enhanced hover effects for links
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px) scale(1.02)';
            
            // Add glow effect
            this.style.boxShadow = '0 20px 40px rgba(181, 129, 80, 0.2), 0 0 20px rgba(181, 129, 80, 0.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        });
        
        // Click animation
        link.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-2px) scale(0.98)';
        });
        
        link.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-6px) scale(1.02)';
        });
    });

    // ===== CLUBE DOS MESTRES ANIMATIONS =====
    
    const clubeCard = document.querySelector('.clube-card');
    if (clubeCard) {
        // Floating animation
        let floatDirection = 1;
        setInterval(() => {
            const currentTransform = clubeCard.style.transform || 'translateY(0px)';
            const currentY = parseFloat(currentTransform.match(/translateY\(([^)]+)\)/)?.[1] || 0);
            const newY = currentY + (floatDirection * 2);
            
            if (Math.abs(newY) > 8) {
                floatDirection *= -1;
            }
            
            clubeCard.style.transform = `translateY(${newY}px)`;
        }, 100);
        
        // Pulse effect on hover
        clubeCard.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1s ease-in-out';
        });
        
        clubeCard.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    }

    // ===== BACKGROUND INTERACTIONS =====
    
    // Mouse parallax effect for coffee beans
    document.addEventListener('mousemove', function(e) {
        const beans = document.querySelectorAll('.coffee-bean');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        beans.forEach((bean, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            
            bean.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // ===== TOUCH INTERACTIONS FOR MOBILE =====
    
    // Enhanced touch feedback
    links.forEach(link => {
        link.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        link.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
            this.style.transition = 'transform 0.3s ease';
        });
    });

    // ===== ANALYTICS TRACKING =====
    
    // Track link clicks with more detail
    links.forEach(link => {
        link.addEventListener('click', function() {
            const title = this.querySelector('.linktree-link-title').textContent;
            const href = this.getAttribute('href');
            
            // Track in Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'linktree_click', {
                    'event_category': 'Linktree',
                    'event_label': title,
                    'value': 1
                });
            }
            
            // Track time spent on page
            const timeSpent = Date.now() - pageLoadTime;
            if (typeof gtag !== 'undefined') {
                gtag('event', 'time_on_linktree', {
                    'event_category': 'Engagement',
                    'event_label': 'Time Spent',
                    'value': Math.round(timeSpent / 1000) // in seconds
                });
            }
        });
    });

    // ===== PERFORMANCE OPTIMIZATIONS =====
    
    // Preload important images
    const importantImages = [
        'assets/images/logo-mestres-cafe.png',
        'assets/images/coffee-bg-2.jpg'
    ];
    
    importantImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // ===== ACCESSIBILITY ENHANCEMENTS =====
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // ===== LOADING STATES =====
    
    // Add loading animation for external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const icon = this.querySelector('.linktree-link-arrow i');
            if (icon) {
                icon.className = 'fas fa-spinner fa-spin';
                
                setTimeout(() => {
                    icon.className = 'fas fa-external-link-alt';
                }, 2000);
            }
        });
    });

    // ===== DYNAMIC CONTENT =====
    
    // Add dynamic timestamp to footer
    const footer = document.querySelector('.linktree-footer-text');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.textContent = footer.textContent.replace('2024', currentYear);
    }

    // ===== ERROR HANDLING =====
    
    // Handle failed image loads
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            console.warn('Failed to load image:', this.src);
        });
    });
});

// ===== GLOBAL VARIABLES =====
const pageLoadTime = Date.now();

// ===== UTILITY FUNCTIONS =====

// Smooth color transition
function smoothColorTransition(element, fromColor, toColor, duration = 300) {
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Simple linear interpolation for demonstration
        // In production, you might want to use a proper color interpolation library
        element.style.backgroundColor = progress < 1 ? fromColor : toColor;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// Add ripple effect to buttons
function addRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid #b58150 !important;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

// ===== ADMIN MENU CONTROL =====
function toggleAdminMenu() {
    const adminMenu = document.getElementById('adminMenu');
    adminMenu.classList.toggle('show');
}

// Close admin menu when clicking outside
document.addEventListener('click', function(event) {
    const adminAccess = document.querySelector('.admin-access');
    const adminMenu = document.getElementById('adminMenu');
    
    if (adminAccess && !adminAccess.contains(event.target)) {
        adminMenu.classList.remove('show');
    }
});

// ===== CONSOLE BRANDING =====
console.log('%c🔗 Linktree Mestres do Café', 'color: #b58150; font-size: 16px; font-weight: bold;');
console.log('%cTodos os links em um só lugar!', 'color: #101820; font-size: 12px;');

