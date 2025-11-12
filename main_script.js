console.log('MAPTECH Website Loaded Successfully!');

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        closeMobileMenu();
    }
}

document.addEventListener('DOMContentLoaded', function () {

    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateOnScroll = document.querySelectorAll('.service-card, .reason-card, .contact-info-card, .feature-card');
    animateOnScroll.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', e => e.preventDefault());
    });

    window.scrollTo(0, 0);

    const menuButton = document.getElementById('menuButton');
    const mobileNav = document.getElementById('mobileNav');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');

    if (menuButton && mobileNav && menuIcon && closeIcon) {
        function toggleMobileMenu() {
            mobileNav.classList.toggle('active');
            if (mobileNav.classList.contains('active')) {
                menuIcon.style.display = 'none';
                closeIcon.style.display = 'block';
            } else {
                menuIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            }
        }

        menuButton.addEventListener('click', toggleMobileMenu);

        mobileDropdowns.forEach(dropdown => {
            const btn = dropdown.querySelector('.mobile-dropdown-btn');
            btn.addEventListener('click', e => {
                e.stopPropagation();
                dropdown.classList.toggle('active');
            });
        });

        const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-dropdown-item');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                menuIcon.style.display = 'block';
                closeIcon.style.display = 'none';
                mobileDropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            });
        });

        document.addEventListener('click', (e) => {
            if (!mobileNav.contains(e.target) && !menuButton.contains(e.target)) {
                mobileNav.classList.remove('active');
                menuIcon.style.display = 'block';
                closeIcon.style.display = 'none';
                mobileDropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            }
        });
    }

    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.addEventListener('click', e => e.stopPropagation());
    });

    const footer = document.querySelector('.footer');
    if (footer) {
        const footerObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        footer.classList.add('visible');
                        observer.unobserve(footer);
                    }
                });
            }, { threshold: 0.2 }
        );
        footerObserver.observe(footer);
    }

});