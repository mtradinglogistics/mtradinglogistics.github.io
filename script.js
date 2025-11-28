// Mobile Menu Toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
});

// Form Validation and Character Counter
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const messageTextarea = document.getElementById('message');
    const charCount = document.querySelector('.char-count');
    const cardNumberInput = document.getElementById('card-number');
    const expiryDateInput = document.getElementById('expiry-date');
    const cvcInput = document.getElementById('cvc');
    
    // Character counter for message textarea
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = `${length}/500 characters`;
            
            if (length > 500) {
                charCount.style.color = '#e74c3c';
            } else if (length > 400) {
                charCount.style.color = '#f39c12';
            } else {
                charCount.style.color = '#7f8c8d';
            }
        });
    }
    
    // Card number formatting
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
            let formattedValue = '';
            
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            e.target.value = formattedValue;
        });
    }
    
    // Expiry date formatting
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            
            e.target.value = value;
        });
    }
    
    // CVC input restriction
    if (cvcInput) {
        cvcInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
        });
    }
    
    // Form submission handler
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                } else {
                    field.style.borderColor = '#e1e8ed';
                }
            });
            
            // Card number validation
            if (cardNumberInput && cardNumberInput.value) {
                const cardNumber = cardNumberInput.value.replace(/\s/g, '');
                if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
                    isValid = false;
                    cardNumberInput.style.borderColor = '#e74c3c';
                    alert('Please enter a valid 16-digit card number');
                }
            }
            
            // Expiry date validation
            if (expiryDateInput && expiryDateInput.value) {
                const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
                if (!expiryRegex.test(expiryDateInput.value)) {
                    isValid = false;
                    expiryDateInput.style.borderColor = '#e74c3c';
                    alert('Please enter a valid expiry date in MM/YY format');
                }
            }
            
            // CVC validation
            if (cvcInput && cvcInput.value) {
                if (cvcInput.value.length !== 3 || !/^\d+$/.test(cvcInput.value)) {
                    isValid = false;
                    cvcInput.style.borderColor = '#e74c3c';
                    alert('Please enter a valid 3-digit CVC');
                }
            }
            
            if (isValid) {
                // Show success message (in a real application, you would send the form data to a server)
                alert('Thank you for your request! We will contact you within 24 hours.');
                contactForm.reset();
                if (charCount) {
                    charCount.textContent = '0/500 characters';
                    charCount.style.color = '#7f8c8d';
                }
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
                const navLinks = document.querySelector('.nav-links');
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (window.innerWidth <= 768 && 
            navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !mobileMenu.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
});

// Add input validation styling
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#e1e8ed';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#27ae60';
            }
        });
    });
});
