document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        sidebar.classList.toggle('active');
    });

    // Page Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const footerLinks = document.querySelectorAll('.footer-link');
    const pages = document.querySelectorAll('.page');
    
    function navigateToPage(targetPage) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show the target page
        document.getElementById(`${targetPage}-page`).classList.add('active');
        
        // Update active nav links in both sidebar and footer
        navLinks.forEach(navLink => {
            navLink.classList.remove('active');
        });
        footerLinks.forEach(footerLink => {
            footerLink.classList.remove('active');
        });
        
        // Set active class on clicked link
        const activeLinks = document.querySelectorAll(`[data-page="${targetPage}"]`);
        activeLinks.forEach(link => link.classList.add('active'));
        
        // Close sidebar on mobile after navigation
        if (window.innerWidth < 992) {
            mobileMenuBtn.classList.remove('active');
            sidebar.classList.remove('active');
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
    
    // Handle sidebar navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            navigateToPage(targetPage);
        });
    });
    
    // Handle footer navigation
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            navigateToPage(targetPage);
        });
    });

    // Course Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            
            try {
                // Here you would typically send the data to a server
                // For demo purposes, we'll simulate a successful submission
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Thank you, ${name}!</h3>
                    <p>Your message has been received. We'll contact you soon at ${email}.</p>
                `;
                
                contactForm.reset();
                contactForm.parentNode.insertBefore(successMessage, contactForm);
                contactForm.style.display = 'none';
                
                setTimeout(() => {
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'translateY(0)';
                }, 100);
            } catch (error) {
                alert('There was an error submitting your form. Please try again.');
            }
        });
    }

    // Animate Stats Counting
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    stat.textContent = target;
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats-grid')) {
                    animateStats();
                }
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .course-card, .testimonial-card, .stats-grid').forEach(el => {
        observer.observe(el);
    });

    // Initialize Gallery
    const galleryImages = [
        { url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', alt: 'Classroom' },
        { url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', alt: 'Students learning' },
        { url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', alt: 'Group study' },
        { url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', alt: 'Teacher teaching' },
        { url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', alt: 'Science experiment' },
        { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', alt: 'Award ceremony' }
    ];
    
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        galleryImages.forEach(image => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item animate-fadeIn';
            galleryItem.innerHTML = `
                <img src="${image.url}" alt="${image.alt}" loading="lazy">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            `;
            galleryGrid.appendChild(galleryItem);
        });
    }

    // Initialize Testimonials
    const testimonials = [
        {
            text: "My son has shown remarkable improvement in Mathematics since joining Bright Minds. The teachers are dedicated and the regular tests keep him motivated to perform better.",
            author: "Rajesh Kumar",
            role: "Parent of Class 8 student"
        },
        {
            text: "I was struggling with Science concepts in school, but the way Abhishek sir explains things makes everything so clear. Now I actually enjoy studying Science!",
            author: "Priya Sharma",
            role: "Class 9 Student"
        },
        {
            text: "The personal attention my daughter receives at Bright Minds is unmatched. They identified her weak areas and created a customized study plan that has boosted her confidence tremendously.",
            author: "Sunita Devi",
            role: "Parent of Class 6 student"
        }
    ];
    
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (testimonialsSlider) {
        testimonials.forEach((testimonial, index) => {
            const testimonialCard = document.createElement('div');
            testimonialCard.className = 'testimonial-card animate-fadeIn';
            if (index === 0) testimonialCard.classList.add('active');
            testimonialCard.innerHTML = `
                <p class="testimonial-text">${testimonial.text}</p>
                <div class="testimonial-author">
                    <div class="author-avatar">${testimonial.author.charAt(0)}</div>
                    <div class="author-info">
                        <h4>${testimonial.author}</h4>
                        <p>${testimonial.role}</p>
                    </div>
                </div>
            `;
            testimonialsSlider.appendChild(testimonialCard);
        });
        
        // Simple testimonial slider
        let currentTestimonial = 0;
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        
        function showTestimonial(index) {
            testimonialCards.forEach(card => card.classList.remove('active'));
            testimonialCards[index].classList.add('active');
        }
        
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Responsive Adjustments
    function handleResize() {
        if (window.innerWidth >= 992) {
            mobileMenuBtn.classList.remove('active');
            sidebar.classList.remove('active');
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // Initialize with home page active
    document.getElementById('home-page').classList.add('active');
    
    // Set active footer link on initial load
    const activePage = document.querySelector('.page.active').id.replace('-page', '');
    footerLinks.forEach(link => {
        if (link.getAttribute('data-page') === activePage) {
            link.classList.add('active');
        }
    });
});
