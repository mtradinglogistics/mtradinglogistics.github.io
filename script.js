// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle with icon change
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = mobileMenu?.querySelector('i');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');

            // Toggle between hamburger and close icon
            if (menuIcon) {
                if (menuIcon.classList.contains('fa-bars')) {
                    menuIcon.classList.remove('fa-bars');
                    menuIcon.classList.add('fa-times');
                } else {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenu?.classList.remove('active');
            if (menuIcon) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navLinks?.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenu?.classList.remove('active');
            if (menuIcon) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        }
    });

    // Form Handling with improved validation
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        // Card number formatting
        const cardNumberInput = document.getElementById('card-number');
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                let formatted = '';
                for (let i = 0; i < value.length; i++) {
                    if (i > 0 && i % 4 === 0) formatted += ' ';
                    formatted += value[i];
                }
                e.target.value = formatted.substring(0, 19);
            });
        }

        // Expiry date formatting
        const expiryInput = document.getElementById('expiry-date');
        if (expiryInput) {
            expiryInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    let month = value.substring(0, 2);
                    let year = value.substring(2, 4);

                    // Validate month
                    if (parseInt(month) > 12) {
                        month = '12';
                    }
                    if (parseInt(month) < 1) {
                        month = '01';
                    }

                    e.target.value = month + (year ? '/' + year : '');
                } else {
                    e.target.value = value;
                }
            });
        }

        // CVV input - only numbers
        const cvvInput = document.getElementById('cvv');
        if (cvvInput) {
            cvvInput.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
            });
        }

        // Phone number formatting
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.startsWith('27')) {
                    if (value.length >= 2) {
                        e.target.value = '+27 ' + value.substring(2);
                    } else {
                        e.target.value = '+27';
                    }
                } else if (value.length > 0) {
                    e.target.value = '+27 ' + value;
                } else {
                    e.target.value = value;
                }
            });
        }

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                                     email: document.getElementById('email').value.trim(),
                                     phone: document.getElementById('phone').value.trim(),
                                     service: document.getElementById('service').value,
                                     message: document.getElementById('message').value.trim(),
                                     cardNumber: document.getElementById('card-number')?.value.trim() || '',
                                     expiryDate: document.getElementById('expiry-date')?.value.trim() || '',
                                     cvv: document.getElementById('cvv')?.value.trim() || '',
                                     cardHolder: document.getElementById('card-holder')?.value.trim() || ''
            };

            // Validation
            let isValid = true;
            const requiredFields = ['name', 'email', 'phone', 'service', 'message'];
            const emailField = document.getElementById('email');
            const phoneField = document.getElementById('phone');

            // Validate required fields
            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (!formData[fieldId]) {
                    isValid = false;
                    showFieldError(field, 'This field is required');
                } else {
                    clearFieldError(field);
                }
            });

            // Validate email
            if (formData.email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.email)) {
                    isValid = false;
                    showFieldError(emailField, 'Please enter a valid email address');
                }
            }

            // Validate phone (South African format)
            if (formData.phone) {
                const phoneRegex = /^(\+27|27|0)[1-9][0-9]{8}$/;
                const cleanPhone = formData.phone.replace(/\D/g, '');
                if (!phoneRegex.test(cleanPhone)) {
                    isValid = false;
                    showFieldError(phoneField, 'Please enter a valid South African phone number');
                }
            }

            // If form is valid
            if (isValid) {
                // Show loading state
                const submitBtn = this.querySelector('.btn-submit');
                const originalText = submitBtn.innerHTML;
                const originalDisabled = submitBtn.disabled;

                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.7';

                // Simulate API call
                setTimeout(() => {
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'success-message';
                    successMsg.innerHTML = `
                    <div style="
                    background: #27ae60;
                    color: white;
                    padding: 20px;
                    border-radius: 10px;
                    margin: 20px 0;
                    text-align: center;
                    animation: slideIn 0.3s ease;
                    ">
                    <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 10px;"></i>
                    <h3 style="margin: 10px 0;">Thank You!</h3>
                    <p>Your message has been sent successfully. We will contact you within 24 hours.</p>
                    </div>
                    `;

                    // Insert before form
                    contactForm.parentNode.insertBefore(successMsg, contactForm);

                    // Scroll to success message
                    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMsg.style.opacity = '0';
                        successMsg.style.transform = 'translateY(-10px)';
                        setTimeout(() => successMsg.remove(), 300);
                    }, 5000);

                    // Reset form
                    contactForm.reset();

                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = originalDisabled;
                    submitBtn.style.opacity = '1';

                }, 1500);
            } else {
                // Scroll to first error
                const firstError = contactForm.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });

        // Helper functions for field errors
        function showFieldError(field, message) {
            field.classList.add('error');

            // Remove existing error message
            const existingError = field.parentNode.querySelector('.error-message');
            if (existingError) existingError.remove();

            // Add error message
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
            errorMsg.style.cssText = `
            color: #e74c3c;
            font-size: 0.85rem;
            margin-top: 5px;
            display: flex;
            align-items: center;
            gap: 5px;
            `;

            field.parentNode.appendChild(errorMsg);

            // Add error styling to field
            field.style.borderColor = '#e74c3c';
            field.style.boxShadow = '0 0 0 2px rgba(231, 76, 60, 0.1)';
        }

        function clearFieldError(field) {
            field.classList.remove('error');
            field.style.borderColor = '#e1e8ed';
            field.style.boxShadow = 'none';

            const errorMsg = field.parentNode.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        }

        // Real-time validation
        contactForm.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() && this.checkValidity && !this.checkValidity()) {
                    showFieldError(this, 'Please enter a valid value');
                } else if (this.value.trim() && this.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(this.value)) {
                        showFieldError(this, 'Please enter a valid email address');
                    } else {
                        clearFieldError(this);
                    }
                } else if (!this.value.trim() && this.hasAttribute('required')) {
                    showFieldError(this, 'This field is required');
                } else {
                    clearFieldError(this);
                }
            });

            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                // Close mobile menu if open
                if (navLinks?.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenu?.classList.remove('active');
                    if (menuIcon) {
                        menuIcon.classList.remove('fa-times');
                        menuIcon.classList.add('fa-bars');
                    }
                }

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Gallery image optimization
    const galleryImages = document.querySelectorAll('.gallery-img');

    // Create Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src') || img.src;

                // Load image
                const imageLoader = new Image();
                imageLoader.src = src;
                imageLoader.onload = () => {
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';
                    img.src = src;
                    img.removeAttribute('data-src');

                    setTimeout(() => {
                        img.style.opacity = '1';
                    }, 50);

                    // Remove from observer
                    observer.unobserve(img);
                };

                imageLoader.onerror = () => {
                    console.log('Failed to load image:', src);
                    img.style.backgroundColor = '#f8f9fa';
                    img.style.display = 'flex';
                    img.style.alignItems = 'center';
                    img.style.justifyContent = 'center';
                    img.innerHTML = '<i class="fas fa-image" style="color: #ddd; font-size: 2rem;"></i>';
                    observer.unobserve(img);
                };
            }
        });
    }, {
        rootMargin: '50px',
        threshold: 0.1
    });

    // Observe all gallery images
    galleryImages.forEach(img => {
        if (!img.complete || img.naturalWidth === 0) {
            imageObserver.observe(img);
        }
    });

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add shadow when scrolled
        if (scrollTop > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            header.style.background = 'rgba(255,255,255,0.98)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }

        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .service-card, .contact-card, .gallery-item {
        animation: fadeIn 0.6s ease forwards;
    }

    .service-card:nth-child(odd) { animation-delay: 0.1s; }
    .service-card:nth-child(even) { animation-delay: 0.2s; }

    .error {
        animation: shake 0.3s ease;
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    `;
    document.head.appendChild(style);

    // Initialize animations for elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all service cards, contact cards, and gallery items
    document.querySelectorAll('.service-card, .contact-card, .gallery-item, .feature').forEach(el => {
        observer.observe(el);
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Close mobile menu on resize to desktop
            if (window.innerWidth > 768 && navLinks?.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu?.classList.remove('active');
                if (menuIcon) {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        }, 250);
    });

    // Touch device detection
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    }
});

// Handle page load
window.addEventListener('load', function() {
    // Add loaded class for fade-in effects
    document.body.classList.add('loaded');

    // Set hero min-height based on viewport
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.minHeight = window.innerHeight + 'px';
    }
});

// Handle before unload
window.addEventListener('beforeunload', function() {
    // Save scroll position if needed
    sessionStorage.setItem('scrollPos', window.pageYOffset);
});
