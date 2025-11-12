document.addEventListener('DOMContentLoaded', function() {
    initAccordion();
    initCookieBanner();
    initCookieControls();
    initScrollAnimations();
});

function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const trigger = item.querySelector('.accordion-trigger');
        
        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
            });

            if (!isActive) {
                item.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

function initCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('bannerAcceptBtn');
    const manageBtn = document.getElementById('bannerManageBtn');
    
    const cookieConsent = getCookie('maptech_cookie_consent');
    
    if (!cookieConsent) {
        setTimeout(() => {
            banner.classList.add('show');
        }, 1000);
    }
    
    acceptBtn.addEventListener('click', () => {
        acceptAllCookies();
        banner.classList.remove('show');
        showNotification('All cookies accepted', 'success');
    });

    manageBtn.addEventListener('click', () => {
        banner.classList.remove('show');
        scrollToManageSection();
    });
}

function initCookieControls() {
    const manageCookiesBtn = document.getElementById('manageCookiesBtn');
    const acceptAllBtn = document.getElementById('acceptAllBtn');
    
    manageCookiesBtn.addEventListener('click', () => {
        showCookiePreferencesModal();
    });
    
    acceptAllBtn.addEventListener('click', () => {
        acceptAllCookies();
        showNotification('All cookies accepted', 'success');
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

function showCookiePreferencesModal() {
    // In a real implementation, this would show a modal with toggles for each cookie type
    const preferences = {
        essential: true,
        analytics: confirm('Enable Analytics Cookies?\n\nThese help us understand how you use our website.'),
        functionality: confirm('Enable Functionality Cookies?\n\nThese remember your preferences like theme and language.'),
        marketing: confirm('Enable Marketing Cookies?\n\nThese help us show you relevant content and ads.')
    };
    
    saveCookiePreferences(preferences);
    showNotification('Cookie preferences saved', 'success');
}

function acceptAllCookies() {
    const preferences = {
        essential: true,
        analytics: true,
        functionality: true,
        marketing: true
    };
    saveCookiePreferences(preferences);
}

function saveCookiePreferences(preferences) {
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    
    setCookie('maptech_cookie_consent', JSON.stringify(preferences), expiryDate);

    if (preferences.analytics) {
        enableAnalyticsCookies();
    }
    if (preferences.functionality) {
        enableFunctionalityCookies();
    }
    if (preferences.marketing) {
        enableMarketingCookies();
    }
}

function enableAnalyticsCookies() {
    console.log('Analytics cookies enabled');
}

function enableFunctionalityCookies() {
    console.log('Functionality cookies enabled');
}

function enableMarketingCookies() {
    console.log('Marketing cookies enabled');
}

function setCookie(name, value, expires) {
    let cookie = `${name}=${encodeURIComponent(value)}`;
    
    if (expires) {
        cookie += `; expires=${expires.toUTCString()}`;
    }
    
    cookie += '; path=/; SameSite=Lax';
    document.cookie = cookie;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }
    return null;
}

function scrollToManageSection() {
    const manageSection = document.querySelector('.manage-section');
    if (manageSection) {
        manageSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        backgroundColor: type === 'success' ? 'hsl(142 71% 45%)' : 'hsl(210 90% 50%)',
        color: 'white',
        fontWeight: '600',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease-out',
        maxWidth: '300px'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < 500) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 500);
    }
});