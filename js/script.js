window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar && window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else if (navbar) {
        navbar.classList.remove('scrolled');
    }
});

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

const mobileLinks = document.querySelectorAll('.mobile-link');
mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
        }
    });
});

document.addEventListener('click', function(event) {
    if (!mobileMenu || !mobileMenuToggle) return;

    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnToggle = mobileMenuToggle.contains(event.target);

    if (!isClickInsideMenu && !isClickOnToggle && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#top') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        const target = document.querySelector(targetId);
        if (target) {
            // Close mobile menu if open
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }

            const navbarHeight = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

const projectCards = document.querySelectorAll('.project-card');

const projectFiles = {
    '1': 'claimiq.html',
    '2': 'artisan-bakery-co.html',
    '3': 'arctic-travels.html',
    '4': 'flexable.html'
};

projectCards.forEach(card => {
    card.addEventListener('click', function() {
        const projectNumber = this.getAttribute('data-project');
        const fileName = projectFiles[projectNumber];

        if (fileName) {
            window.open(fileName, '_blank');
        }
    });
});



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

document.addEventListener('DOMContentLoaded', function() {

    const animatedElements = document.querySelectorAll('.project-card, .about-content, .contact-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});


window.addEventListener('scroll', function() {
    const heroDecoration = document.querySelector('.hero-decoration');
    if (heroDecoration && window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const translateAmount = Math.min(scrolled * 0.15, 100);
        heroDecoration.style.transform = `translateY(-50%) translateX(${translateAmount}px)`;
    }
});

window.addEventListener('resize', function() {
    const heroDecoration = document.querySelector('.hero-decoration');
    if (heroDecoration && window.innerWidth <= 768) {
        heroDecoration.style.transform = 'translateY(-50%)';
    }
});

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;

        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                showPopup();
                contactForm.reset();
            } else {
                alert('Oops! Something went wrong. Please try again.');
            }
        } catch (error) {
            alert('Oops! Something went wrong. Please try again.');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

function showPopup() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.classList.add('active');
    }
}


function closePopup() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.classList.remove('active');
    }
}

const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

