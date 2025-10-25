// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initCounterAnimations();
    initFormHandling();
    initParallaxEffects();
    initTypingEffect();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.skill-category, .timeline-item, .project-card, .cert-card, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = width + '%';
                }, 200);
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Counter animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Form handling
function initFormHandling() {
    const form = document.querySelector('.contact-form form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const subject = form.querySelectorAll('input[type="text"]')[1].value;
            const message = form.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Message sent successfully!', 'success');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Parallax effects
function initParallaxEffects() {
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        line.style.opacity = '1';
        
        setTimeout(() => {
            typeText(line, text, 50);
        }, index * 500);
    });
}

function typeText(element, text, speed) {
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.project-card, .cert-card, .skill-category');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add click effects to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 10001;
        transform: translate(-50%, -50%);
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;
document.head.appendChild(loadingStyle);

// Add smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.section-header, .skills-grid, .timeline, .projects-grid, .certifications-grid, .contact-content');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add CSS for reveal animation
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .section-header,
    .skills-grid,
    .timeline,
    .projects-grid,
    .certifications-grid,
    .contact-content {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    .section-header.revealed,
    .skills-grid.revealed,
    .timeline.revealed,
    .projects-grid.revealed,
    .certifications-grid.revealed,
    .contact-content.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealStyle);

// Enhanced Parallax Effects
function initEnhancedParallax() {
    const shapes = document.querySelectorAll('.shape');
    const heroBackground = document.querySelector('.hero-background');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        shapes.forEach((shape, index) => {
            const speed = 0.3 + (index * 0.1);
            const rotation = scrolled * 0.05;
            shape.style.transform = `translateY(${rate * speed}px) rotate(${rotation}deg) scale(${1 + Math.sin(scrolled * 0.01) * 0.1})`;
        });
        
        // Enhanced background movement
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
    
    // Mouse movement parallax
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            shape.style.transform += ` translate(${x}px, ${y}px)`;
        });
    });
}

// Initialize enhanced parallax
document.addEventListener('DOMContentLoaded', function() {
    initEnhancedParallax();
});

// Add dynamic color changes
function initDynamicColors() {
    const hero = document.querySelector('.hero');
    const colors = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    ];
    
    let colorIndex = 0;
    
    setInterval(() => {
        if (hero) {
            hero.style.background = colors[colorIndex];
            colorIndex = (colorIndex + 1) % colors.length;
        }
    }, 10000); // Change every 10 seconds
}

// Initialize dynamic colors
document.addEventListener('DOMContentLoaded', function() {
    initDynamicColors();
});

// Enhanced Dynamic Effects for All Sections
function initAllSectionsDynamic() {
    const sections = document.querySelectorAll('section');
    
    // Add floating elements to each section
    sections.forEach((section, index) => {
        if (section.id !== 'home') { // Skip hero section as it already has effects
            createFloatingElements(section, index);
        }
    });
    
    // Enhanced scroll animations for all sections
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                // Parallax effect for section backgrounds
                const rate = scrolled * -0.1;
                section.style.transform = `translateY(${rate}px)`;
                
                // Dynamic opacity based on scroll position
                const opacity = Math.max(0.3, 1 - Math.abs(rect.top) / window.innerHeight);
                section.style.opacity = opacity;
            }
        });
    });
}

// Create floating elements for each section
function createFloatingElements(section, sectionIndex) {
    const colors = [
        'rgba(102, 126, 234, 0.1)',
        'rgba(118, 75, 162, 0.1)',
        'rgba(75, 192, 192, 0.1)',
        'rgba(255, 107, 107, 0.1)',
        'rgba(255, 193, 7, 0.1)'
    ];
    
    for (let i = 0; i < 3; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.cssText = `
            position: absolute;
            width: ${Math.random() * 80 + 40}px;
            height: ${Math.random() * 80 + 40}px;
            background: ${colors[sectionIndex % colors.length]};
            border-radius: 50%;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            top: ${Math.random() * 80 + 10}%;
            left: ${Math.random() * 80 + 10}%;
            animation: float ${Math.random() * 10 + 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            z-index: 1;
            pointer-events: none;
        `;
        
        section.appendChild(element);
    }
}

// Dynamic color cycling for all sections
function initSectionColorCycling() {
    const sections = document.querySelectorAll('section');
    const colorSchemes = [
        {
            primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            secondary: 'rgba(102, 126, 234, 0.1)'
        },
        {
            primary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            secondary: 'rgba(240, 147, 251, 0.1)'
        },
        {
            primary: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            secondary: 'rgba(79, 172, 254, 0.1)'
        },
        {
            primary: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            secondary: 'rgba(67, 233, 123, 0.1)'
        },
        {
            primary: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            secondary: 'rgba(250, 112, 154, 0.1)'
        }
    ];
    
    let currentScheme = 0;
    
    setInterval(() => {
        sections.forEach((section, index) => {
            if (section.id === 'home') {
                section.style.background = colorSchemes[currentScheme].primary;
            } else {
                // Update section background with subtle color
                section.style.background = `linear-gradient(135deg, ${colorSchemes[currentScheme].secondary} 0%, transparent 100%)`;
            }
        });
        
        currentScheme = (currentScheme + 1) % colorSchemes.length;
    }, 8000); // Change every 8 seconds
}

// Enhanced mouse interaction for all sections
function initSectionMouseInteraction() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.addEventListener('mousemove', function(e) {
            const rect = section.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / centerX;
            const moveY = (y - centerY) / centerY;
            
            // Move floating elements based on mouse position
            const floatingElements = section.querySelectorAll('.floating-element');
            floatingElements.forEach((element, index) => {
                const speed = (index + 1) * 0.5;
                element.style.transform = `translate(${moveX * speed * 20}px, ${moveY * speed * 20}px)`;
            });
        });
        
        section.addEventListener('mouseleave', function() {
            const floatingElements = section.querySelectorAll('.floating-element');
            floatingElements.forEach(element => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    });
}

// Initialize all dynamic effects
document.addEventListener('DOMContentLoaded', function() {
    initAllSectionsDynamic();
    initSectionColorCycling();
    initSectionMouseInteraction();
});

// Add CSS for floating elements animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
`;
document.head.appendChild(style);
