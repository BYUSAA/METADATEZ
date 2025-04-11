document.addEventListener('DOMContentLoaded', function() {
    // Login Modal Functionality
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'block';
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            loginModal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });
    
    // Login Form Submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Simple validation
            if (email && password) {
                // In a real app, you would send this to your server
                console.log('Login attempt with:', email, password);
                alert('Login functionality will be implemented in the backend');
                loginModal.style.display = 'none';
            } else {
                alert('Please fill in all fields');
            }
        });
    }
    
    // Check if user is logged in (simulated)
    function checkLogin() {
        // In a real app, this would check cookies/localStorage/tokens
        return false; // Default to not logged in for demo
    }
    
    // Protect category pages - redirect to login if not logged in
    const categoryLinks = document.querySelectorAll('.category-card');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!checkLogin()) {
                e.preventDefault();
                window.location.href = 'login.html';
            }
        });
    });
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.category-card, .feature-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.category-card, .feature-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // Simulate loading user data for profile pages
    if (window.location.pathname.includes('profile.html')) {
        if (!checkLogin()) {
            window.location.href = 'login.html';
        } else {
            // Load profile data
            console.log('Loading profile data...');
        }
    }
    
    // Category page specific functionality
    if (document.querySelector('.category-page')) {
        // Initialize swiper for profile cards
        // This would be more robust with a library like Swiper.js
        console.log('Initializing category page features');
    }
    
    // Subscription check for messaging
    function checkSubscription() {
        // In a real app, this would check the user's subscription level
        return 'free'; // 'free', 'classic', or 'premium'
    }
    
    // Simulate messaging limits
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('message-btn')) {
            const subLevel = checkSubscription();
            
            if (subLevel === 'free') {
                if (confirm('Free accounts can only message 3 people with 10 replies each. Upgrade to unlock unlimited messaging.')) {
                    window.location.href = 'subscription.html';
                }
            } else if (subLevel === 'classic') {
                // Classic tier limits
                console.log('Classic tier messaging');
            } else {
                // Premium - no limits
                console.log('Premium tier messaging');
            }
        }
    });
});

// Generate fake users for demo purposes
function generateFakeUsers(category, count = 100) {
    const firstNames = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Jamie', 'Quinn', 'Dakota', 'Skyler'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
    const interests = {
        dating: ['Romantic dinners', 'Long walks', 'Movie nights', 'Travel', 'Cooking'],
        marriage: ['Settling down', 'Starting a family', 'Building a home', 'Shared finances', 'Long-term commitment'],
        religious: ['Prayer', 'Bible study', 'Church activities', 'Mission work', 'Faith discussions'],
        polygamy: ['Multiple partners', 'Community living', 'Alternative lifestyles', 'Open relationships', 'Group dynamics'],
        friendship: ['Hanging out', 'Shared hobbies', 'Support system', 'Social activities', 'Networking'],
        fantasy: ['Roleplay', 'Cosplay', 'Imaginative scenarios', 'Creative writing', 'Alternative realities'],
        international: ['Cultural exchange', 'Language learning', 'Travel buddies', 'Global perspectives', 'Pen pals'],
        business: ['Networking', 'Mentorship', 'Career growth', 'Professional development', 'Entrepreneurship'],
        specialneeds: ['Accessibility', 'Inclusive activities', 'Support groups', 'Understanding partners', 'Patience'],
        penpal: ['Letter writing', 'Deep conversations', 'Cultural exchange', 'Long-distance friendship', 'Support system']
    };
    
    const users = [];
    
    for (let i = 0; i < count; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const age = Math.floor(Math.random() * 30) + 18;
        const location = locations[Math.floor(Math.random() * locations.length)];
        const userInterests = interests[category].sort(() => 0.5 - Math.random()).slice(0, 3);
        
        users.push({
            id: `user${i+1}`,
            name: `${firstName} ${lastName}`,
            age: age,
            location: location,
            interests: userInterests,
            image: `assets/images/profiles/profile${Math.floor(Math.random() * 10) + 1}.jpg`,
            verified: Math.random() > 0.3 // 70% chance of being verified
        });
    }
    
    return users;
}

// Initialize category pages with fake users
document.addEventListener('DOMContentLoaded', function() {
    const categoryPages = [
        'dating', 'marriage', 'religious', 'polygamy', 'friendship',
        'fantasy', 'international', 'business', 'specialneeds', 'penpal'
    ];
    
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    
    if (categoryPages.includes(currentPage)) {
        // Check login status
        if (!checkLogin()) {
            window.location.href = 'login.html';
            return;
        }
        
        // Add 'category-page' class to body
        document.body.classList.add('category-page');
        
        // Generate and display fake users
        const users = generateFakeUsers(currentPage);
        const usersContainer = document.querySelector('.users-grid');
        
        if (usersContainer) {
            users.forEach(user => {
                const userCard = document.createElement('div');
                userCard.className = 'user-card';
                userCard.innerHTML = `
                    <div class="user-image">
                        <img src="${user.image}" alt="${user.name}">
                        ${user.verified ? '<span class="verified-badge"><i class="fas fa-check-circle"></i></span>' : ''}
                    </div>
                    <div class="user-info">
                        <h3>${user.name}, ${user.age}</h3>
                        <p><i class="fas fa-map-marker-alt"></i> ${user.location}</p>
                        <div class="user-interests">
                            ${user.interests.map(int => `<span>${int}</span>`).join('')}
                        </div>
                    </div>
                    <button class="message-btn">Message</button>
                `;
                usersContainer.appendChild(userCard);
            });
        }
    }
});

// Check login status (simplified for demo)
function checkLogin() {
    // In a real app, this would check cookies/localStorage/tokens
    return localStorage.getItem('metadatezLoggedIn') === 'true';
}

// Login functionality for login.html
if (window.location.pathname.includes('login.html')) {
    document.getElementById('login-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        if (email && password) {
            // Simulate successful login
            localStorage.setItem('metadatezLoggedIn', 'true');
            window.location.href = 'index.html';
        } else {
            alert('Please fill in all fields');
        }
    });
}

// Signup functionality for signup.html
if (window.location.pathname.includes('signup.html')) {
    document.getElementById('signup-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const category = document.getElementById('signup-category').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        if (email && password && category) {
            // Simulate successful signup and login
            localStorage.setItem('metadatezLoggedIn', 'true');
            localStorage.setItem('metadatezUserCategory', category);
            window.location.href = 'index.html';
        } else {
            alert('Please fill in all fields');
        }
    });
}

// Subscription page functionality
if (window.location.pathname.includes('subscription.html')) {
    document.querySelectorAll('.subscription-card').forEach(card => {
        card.addEventListener('click', function() {
            const tier = this.getAttribute('data-tier');
            alert(`You selected the ${tier} subscription. Payment processing would be implemented here.`);
            // In a real app, this would redirect to payment processing
        });
    });
}
// Category Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
    
    // Billing Toggle
    const billingToggle = document.getElementById('billing-toggle');
    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            const prices = document.querySelectorAll('.price');
            const periods = document.querySelectorAll('.period');
            const yearlyPrices = document.querySelectorAll('.yearly-price');
            
            if (this.checked) {
                // Show yearly prices
                prices.forEach(price => {
                    const monthlyPrice = parseFloat(price.textContent.replace('$', ''));
                    const yearlyPrice = monthlyPrice * 0.8; // 20% discount
                    price.textContent = '$' + yearlyPrice.toFixed(2);
                });
                periods.forEach(period => {
                    period.textContent = '/year';
                });
                yearlyPrices.forEach(price => {
                    price.style.display = 'none';
                });
            } else {
                // Show monthly prices
                prices.forEach(price => {
                    const yearlyPrice = parseFloat(price.textContent.replace('$', ''));
                    const monthlyPrice = yearlyPrice / 0.8;
                    price.textContent = '$' + monthlyPrice.toFixed(2);
                });
                periods.forEach(period => {
                    period.textContent = '/month';
                });
                yearlyPrices.forEach(price => {
                    price.style.display = 'block';
                });
            }
        });
    }
    
    // View Options
    const viewOptions = document.querySelectorAll('.view-option');
    const usersGrid = document.querySelector('.users-grid');
    
    viewOptions.forEach(option => {
        option.addEventListener('click', function() {
            viewOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            if (this.dataset.view === 'list') {
                usersGrid.classList.add('list-view');
            } else {
                usersGrid.classList.remove('list-view');
            }
        });
    });
    
    // Load More Button
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more users
            const currentCategory = window.location.pathname.split('/').pop().replace('.html', '');
            const newUsers = generateFakeUsers(currentCategory, 10);
            const usersContainer = document.querySelector('.users-grid');
            
            newUsers.forEach(user => {
                const userCard = document.createElement('div');
                userCard.className = 'user-card';
                userCard.innerHTML = `
                    <div class="user-image">
                        <img src="${user.image}" alt="${user.name}">
                        ${user.verified ? '<span class="verified-badge"><i class="fas fa-check-circle"></i></span>' : ''}
                    </div>
                    <div class="user-info">
                        <h3>${user.name}, ${user.age}</h3>
                        <p><i class="fas fa-map-marker-alt"></i> ${user.location}</p>
                        <div class="user-interests">
                            ${user.interests.map(int => `<span>${int}</span>`).join('')}
                        </div>
                    </div>
                    <button class="message-btn">Message</button>
                `;
                usersContainer.appendChild(userCard);
            });
            
            // Scroll to the newly added users
            const lastUserCard = usersContainer.lastElementChild;
            lastUserCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
    
    // AI Match Button
    const aiMatchBtn = document.getElementById('ai-match-btn');
    if (aiMatchBtn) {
        aiMatchBtn.addEventListener('click', function() {
            alert('Our AI is analyzing your preferences to find your perfect match. This feature will be fully implemented in the final version.');
        });
    }
    
    // Apply Filters Button
    const applyFiltersBtn = document.getElementById('apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            alert('Filters will be applied to your search results. This feature will be fully implemented in the final version.');
        });
    }
    
    // Reset Filters Button
    const resetFiltersBtn = document.getElementById('reset-filters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            const selects = document.querySelectorAll('.filter-options select');
            selects.forEach(select => {
                select.selectedIndex = 0;
            });
        });
    }
    
    // Logout Button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('metadatezLoggedIn');
            window.location.href = 'index.html';
        });
    }
    
    // Profile Button
    const profileBtn = document.getElementById('profile-btn');
    if (profileBtn) {
        profileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'profile.html';
        });
    }
});