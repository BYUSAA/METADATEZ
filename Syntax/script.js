document.addEventListener('DOMContentLoaded', function() {
    // Loader
    setTimeout(function() {
        document.querySelector('.loader').style.opacity = '0';
        document.querySelector('.loader').style.visibility = 'hidden';
    }, 1000);

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.createElement('div');
    mobileMenuOverlay.className = 'mobile-menu-overlay';
    document.body.appendChild(mobileMenuOverlay);

    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    mobileMenuOverlay.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    // Header Scroll Effect
    const header = document.querySelector('.futuristic-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });

    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                mobileMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.category-card, .feature-card, .step');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Modal functionality
    const modal = document.querySelector('.modal');
    const modalClose = document.querySelector('.modal-close');
    
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Form validation for login/signup
    const authForms = document.querySelectorAll('.auth-form form');
    
    authForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const inputs = this.querySelectorAll('.form-control');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--danger-color)';
                } else {
                    input.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                // Form is valid, proceed with submission
                alert('Form submitted successfully!');
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    });

    // Category page profile interactions
    const profileCards = document.querySelectorAll('.profile-card');
    
    profileCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't redirect if clicking on a button inside the card
            if (e.target.closest('.profile-btn')) {
                return;
            }
            
            // Check if user is logged in (simplified for demo)
            const isLoggedIn = localStorage.getItem('metadatez_logged_in');
            
            if (!isLoggedIn) {
                window.location.href = 'login.html';
            } else {
                window.location.href = 'profile.html';
            }
        });
    });

    // Check subscription status before allowing messaging
    const messageButtons = document.querySelectorAll('.message-btn');
    
    messageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Check subscription (simplified for demo)
            const subscriptionLevel = localStorage.getItem('metadatez_subscription') || 'free';
            const messagesSent = parseInt(localStorage.getItem('metadatez_messages_sent') || '0');
            
            if (subscriptionLevel === 'free' && messagesSent >= 3) {
                // Show upgrade modal
                document.querySelector('.modal').classList.add('active');
            } else {
                // Allow message
                localStorage.setItem('metadatez_messages_sent', (messagesSent + 1).toString());
                alert('Message sent!');
            }
        });
    });

    // Subscription selection
    const subscriptionButtons = document.querySelectorAll('.plan-btn');
    
    subscriptionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.closest('.plan-card').getAttribute('data-plan');
            localStorage.setItem('metadatez_subscription', plan);
            localStorage.setItem('metadatez_messages_sent', '0');
            
            alert(`You've successfully subscribed to the ${plan.toUpperCase()} plan!`);
            window.location.href = 'profile.html';
        });
    });

    // Login/logout functionality (simplified for demo)
    const loginForm = document.querySelector('.auth-form form');
    const logoutButtons = document.querySelectorAll('.logout-btn');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate login
            localStorage.setItem('metadatez_logged_in', 'true');
            localStorage.setItem('metadatez_user_email', this.querySelector('input[type="email"]').value);
            
            alert('Login successful!');
            window.location.href = 'index.html';
        });
    }
    
    if (logoutButtons.length) {
        logoutButtons.forEach(button => {
            button.addEventListener('click', function() {
                localStorage.removeItem('metadatez_logged_in');
                localStorage.removeItem('metadatez_user_email');
                localStorage.removeItem('metadatez_subscription');
                localStorage.removeItem('metadatez_messages_sent');
                
                alert('Logged out successfully!');
                window.location.href = 'index.html';
            });
        });
    }
});