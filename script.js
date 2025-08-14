// RecruitPro Frontend Development Plan - Interactive JavaScript

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const elementPosition = element.offsetTop - navHeight - 20;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        navbar.style.boxShadow = 'none';
    }
}

// Intersection Observer for fade-in animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    const elementsToAnimate = [
        '.section-header',
        '.tech-item',
        '.metric-card',
        '.challenge-card',
        '.timeline-phase',
        '.arch-layer',
        '.risk-card'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    });
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .metric-value');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = counter.textContent.replace(/[\d]+/, target);
                clearInterval(timer);
            } else {
                counter.textContent = counter.textContent.replace(/[\d]+/, Math.ceil(current));
            }
        }, 20);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Timeline progress animation
function initTimelineProgress() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    const timelineLine = timeline.querySelector('::before');
    const phases = document.querySelectorAll('.timeline-phase');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInLeft 0.8s ease forwards';
            }
        });
    }, { threshold: 0.3 });

    phases.forEach(phase => observer.observe(phase));
}

// Technology stack hover effects
function initTechStackEffects() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Challenge cards interactive effects
function initChallengeEffects() {
    const challengeCards = document.querySelectorAll('.challenge-card');
    
    challengeCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
            card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
}

// Risk assessment interactive features
function initRiskAssessment() {
    const riskItems = document.querySelectorAll('.risk-item');
    
    riskItems.forEach(item => {
        item.addEventListener('click', () => {
            const mitigation = item.querySelector('.risk-mitigation');
            if (mitigation) {
                mitigation.style.backgroundColor = 'rgba(0, 204, 102, 0.1)';
                mitigation.style.padding = '12px';
                mitigation.style.borderRadius = '8px';
                mitigation.style.border = '1px solid rgba(0, 204, 102, 0.3)';
                
                setTimeout(() => {
                    mitigation.style.backgroundColor = '';
                    mitigation.style.padding = '';
                    mitigation.style.borderRadius = '';
                    mitigation.style.border = '';
                }, 2000);
            }
        });
    });
}

// Architecture diagram interactive features
function initArchitectureDiagram() {
    const archComponents = document.querySelectorAll('.arch-component');
    
    archComponents.forEach(component => {
        component.addEventListener('mouseenter', () => {
            component.style.backgroundColor = 'rgba(236, 19, 19, 0.1)';
            component.style.borderColor = 'rgba(236, 19, 19, 0.5)';
            component.style.transform = 'scale(1.05)';
        });
        
        component.addEventListener('mouseleave', () => {
            component.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            component.style.borderColor = 'var(--border-light)';
            component.style.transform = 'scale(1)';
        });
    });
}

// Progress tracking for development phases
function initProgressTracking() {
    const phases = document.querySelectorAll('.timeline-phase');
    let completedPhases = 0;
    
    phases.forEach((phase, index) => {
        const phaseNumber = phase.querySelector('.phase-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    phaseNumber.style.animation = 'scaleIn 0.6s ease forwards';
                    phaseNumber.style.backgroundColor = '#00cc66';
                    
                    // Update progress
                    completedPhases = Math.max(completedPhases, index + 1);
                    updateProgressIndicator(completedPhases, phases.length);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(phase);
    });
}

function updateProgressIndicator(completed, total) {
    // Create or update progress indicator
    let progressBar = document.querySelector('.progress-indicator');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'progress-indicator';
        progressBar.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            width: 200px;
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
            z-index: 1000;
            transition: opacity 0.3s ease;
        `;
        
        const progressFill = document.createElement('div');
        progressFill.className = 'progress-fill';
        progressFill.style.cssText = `
            height: 100%;
            background: linear-gradient(90deg, #ec1313, #ff4444);
            border-radius: 4px;
            transition: width 0.8s ease;
            width: 0%;
        `;
        
        progressBar.appendChild(progressFill);
        document.body.appendChild(progressBar);
    }
    
    const progressFill = progressBar.querySelector('.progress-fill');
    const percentage = (completed / total) * 100;
    progressFill.style.width = `${percentage}%`;
}

// Print functionality
function initPrintFeature() {
    const printButton = document.querySelector('.btn-secondary.large');
    if (printButton && printButton.textContent.includes('Download')) {
        printButton.addEventListener('click', () => {
            // Add print-specific styles
            const printStyles = document.createElement('style');
            printStyles.innerHTML = `
                @media print {
                    .navbar, .hero, .cta-section { display: none !important; }
                    .section { page-break-inside: avoid; padding: 20px 0; }
                    body { background: white !important; color: black !important; }
                    .bg-card, .bg-tertiary { background: #f9f9f9 !important; }
                    .text-primary { color: black !important; }
                    .text-secondary { color: #666 !important; }
                }
            `;
            document.head.appendChild(printStyles);
            
            // Trigger print
            setTimeout(() => {
                window.print();
                document.head.removeChild(printStyles);
            }, 100);
        });
    }
}

// Theme toggle (optional feature)
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    `;
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        icon.className = document.body.classList.contains('light-theme') 
            ? 'fas fa-sun' 
            : 'fas fa-moon';
    });
    
    document.body.appendChild(themeToggle);
}

// Keyboard navigation
function initKeyboardNavigation() {
    const sections = ['overview', 'challenges', 'timeline', 'architecture', 'risks'];
    let currentSection = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    currentSection = Math.min(currentSection + 1, sections.length - 1);
                    scrollToSection(sections[currentSection]);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    currentSection = Math.max(currentSection - 1, 0);
                    scrollToSection(sections[currentSection]);
                    break;
            }
        }
    });
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
        
        // Show performance indicator if load time is good
        if (loadTime < 3000) {
            showPerformanceIndicator('✓ Fast Load Time', 'success');
        } else {
            showPerformanceIndicator('⚠ Slow Load Time', 'warning');
        }
    });
}

function showPerformanceIndicator(message, type) {
    const indicator = document.createElement('div');
    indicator.textContent = message;
    indicator.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        transition: all 0.3s ease;
        ${type === 'success' 
            ? 'background: rgba(0, 204, 102, 0.2); color: #00cc66; border: 1px solid rgba(0, 204, 102, 0.5);'
            : 'background: rgba(255, 102, 0, 0.2); color: #ff6600; border: 1px solid rgba(255, 102, 0, 0.5);'
        }
    `;
    
    document.body.appendChild(indicator);
    
    setTimeout(() => {
        indicator.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(indicator);
        }, 300);
    }, 3000);
}

// Mobile menu functionality
function initMobileMenu() {
    const navbar = document.querySelector('.navbar .container');
    const menuToggle = document.createElement('button');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: var(--text-primary);
        font-size: 1.5rem;
        cursor: pointer;
    `;
    
    const navMenu = document.querySelector('.nav-menu');
    
    // Add mobile styles
    const mobileStyles = document.createElement('style');
    mobileStyles.innerHTML = `
        @media (max-width: 768px) {
            .mobile-menu-toggle { display: block !important; }
            .nav-menu {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: var(--bg-secondary);
                flex-direction: column;
                padding: 20px;
                transform: translateY(-100%);
                opacity: 0;
                pointer-events: none;
                transition: all 0.3s ease;
            }
            .nav-menu.active {
                transform: translateY(0);
                opacity: 1;
                pointer-events: all;
            }
        }
    `;
    document.head.appendChild(mobileStyles);
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.className = navMenu.classList.contains('active') 
            ? 'fas fa-times' 
            : 'fas fa-bars';
    });
    
    navbar.appendChild(menuToggle);
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    initScrollAnimations();
    animateCounters();
    initTimelineProgress();
    
    // Interactive features
    initTechStackEffects();
    initChallengeEffects();
    initRiskAssessment();
    initArchitectureDiagram();
    initProgressTracking();
    
    // Utility features
    initPrintFeature();
    initKeyboardNavigation();
    initPerformanceMonitoring();
    initMobileMenu();
    
    // Optional features
    // initThemeToggle(); // Uncomment if theme toggle is desired
});

// Event listeners
window.addEventListener('scroll', handleNavbarScroll);

// Smooth scrolling for all anchor links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        scrollToSection(targetId);
    }
});

// Handle resize events
window.addEventListener('resize', () => {
    // Recalculate layouts if needed
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
    }
});

// Export functions for external use
window.RecruitProPresentation = {
    scrollToSection,
    showPerformanceIndicator,
    initScrollAnimations,
    animateCounters
};
