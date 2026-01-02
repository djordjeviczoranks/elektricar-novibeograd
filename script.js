// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const location = document.getElementById('location').value;
            const message = document.getElementById('message').value;

            // Create WhatsApp message
            const whatsappMessage = `Poštovanje,\n\nIme: ${name}\nTelefon: ${phone}\nLokacija: ${location || 'Nije navedeno'}\n\nPoruka:\n${message}`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // WhatsApp URL
            const whatsappURL = `https://wa.me/381658551508?text=${encodedMessage}`;

            // Show success message
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Preusmeravanje na WhatsApp... Možete takođe pozvati direktno: 065 855 1508';
            
            // Open WhatsApp after short delay
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
                contactForm.reset();
                
                // Also show option to call
                formMessage.innerHTML = `
                    <p>✓ WhatsApp otvoren!</p>
                    <p>Možete takođe pozvati direktno: <a href="tel:+381658551508" style="color: #065F46; font-weight: bold;">065 855 1508</a></p>
                `;
            }, 1000);

            // Hide message after 10 seconds
            setTimeout(() => {
                formMessage.className = 'form-message';
                formMessage.textContent = '';
            }, 10000);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                mobileMenu.classList.remove('active');
            }
        }
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards and other elements
    document.querySelectorAll('.service-card, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Track phone clicks for analytics (if needed later)
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone link clicked:', this.href);
            // Here you can add analytics tracking when you set up Google Analytics
        });
    });

    // Add floating button hide on scroll down, show on scroll up
    let lastScrollTop = 0;
    const floatingBtn = document.querySelector('.floating-call-btn');
    
    if (floatingBtn) {
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 300) {
                // Scrolling down
                floatingBtn.style.transform = 'translateY(100px)';
            } else {
                // Scrolling up
                floatingBtn.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
});

// Page Load Performance
window.addEventListener('load', function() {
    console.log('Page loaded successfully');
    
    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');
});