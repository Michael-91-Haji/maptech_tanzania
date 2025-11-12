document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();

    initImageSlider();
    initSmoothScroll();
    initFeatureAnimations();
    initCookieBanner?.();
});

function initImageSlider() {
    const slider = document.getElementById('imageSlider');
    if (!slider) return;

    const images = slider.querySelectorAll('.slider-image');
    if (images.length <= 1) return;

    let currentIndex = 0;
    let intervalId;

    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('slider-dots');

    images.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'slider-dot';
        if (i === 0) dot.classList.add('active');

        dot.addEventListener('click', () => {
            showImage(i);
            resetAutoplay();
        });

        dotsContainer.appendChild(dot);
    });

    slider.appendChild(dotsContainer);
    const dots = dotsContainer.querySelectorAll('.slider-dot');

    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        images[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    function nextImage() {
        showImage((currentIndex + 1) % images.length);
    }

    function startAutoplay() {
        intervalId = setInterval(nextImage, 4000);
    }

    function stopAutoplay() {
        clearInterval(intervalId);
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);

    showImage(0);
    startAutoplay();
}

function initSmoothScroll() {
    const header = document.querySelector('header');
    const headerHeight = header?.offsetHeight || 80;

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;

            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - headerHeight, behavior: 'smooth' });
        });
    });
}

function initFeatureAnimations() {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    document.querySelectorAll('.feature-card, .cta-content').forEach(el => {
        if (!el.classList.contains('animate-fade-in-left') &&
            !el.classList.contains('animate-fade-in-right') &&
            !el.classList.contains('animate-scale-in')) {
            el.classList.add('animate-fade-in'); 
        }
        el.classList.add('animate-hidden');
        observer.observe(el);
    });
}

const BANNER_DELAY = 3000;

let preferences = {
  essential: true,
  analytics: false,
  marketing: false
};

const banner = document.getElementById("cookieBanner");
const overlay = document.getElementById("cookieOverlay");
const settings = document.getElementById("cookieSettings");
const actionsDefault = document.getElementById("cookieActions");
const actionsSettings = document.getElementById("cookieActionsSettings");

const analyticsToggle = document.getElementById("analyticsToggle");
const marketingToggle = document.getElementById("marketingToggle");

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("cookieConsent");
  if (!saved) {
    setTimeout(showBanner, BANNER_DELAY);
  } else {
    hideBannerImmediately();
  }
});

function showBanner() {
  banner.classList.add("visible");
  overlay.classList.add("visible");
}

function hideBannerCompletely() {
  banner.classList.remove("visible");
  overlay.classList.remove("visible");
}

function hideBannerImmediately() {
  banner.style.transform = "translateY(15rem)";
  overlay.style.opacity = 0;
  overlay.style.pointerEvents = "none";
}

function acceptAll() {
  preferences.analytics = true;
  preferences.marketing = true;
  savePreferences();
}

function rejectAll() {
  preferences.analytics = false;
  preferences.marketing = false;
  savePreferences();
}

function savePreferences() {
  localStorage.setItem("cookieConsent", JSON.stringify(preferences));
  hideBannerCompletely();
}

function showSettings() {
  settings.style.display = "block";
  actionsDefault.style.display = "none";
  actionsSettings.style.display = "flex";
}

function hideSettings() {
  settings.style.display = "none";
  actionsDefault.style.display = "flex";
  actionsSettings.style.display = "none";
  updateToggles();
}

function togglePreference(type) {
  preferences[type] = !preferences[type];
  updateToggles();
}

function updateToggles() {
  analyticsToggle.classList.toggle("checked", preferences.analytics);
  marketingToggle.classList.toggle("checked", preferences.marketing);
}

function clearConsent() {
  localStorage.removeItem("cookieConsent");
  preferences = { essential: true, analytics: false, marketing: false };
  updateToggles();
  showBanner();
}
