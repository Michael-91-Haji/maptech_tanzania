document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(
        ".fade-up, .fade-left, .fade-right, .scale-up"
    );

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.05,
            rootMargin: "0px 0px -10% 0px"
        }
    );

    animatedElements.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const selectors = ".fade-in, .fade-up, .fade-left, .fade-right, .scale-up";
  const elems = Array.from(document.querySelectorAll(selectors));
  if (!elems.length) return;

  const groups = new Map();

  elems.forEach(el => {
    const groupKey = el.closest('.values-grid') ? el.closest('.values-grid') : el.parentElement || document.body;
    if (!groups.has(groupKey)) groups.set(groupKey, []);
    groups.get(groupKey).push(el);
  });

  groups.forEach((groupElems) => {
    groupElems.forEach((el, idx) => {

      if (!el.hasAttribute('data-delay')) {
        const ms = 80 * idx;
        el.setAttribute('data-delay', ms);
        el.style.transitionDelay = `${ms}ms`;
      } else {

        el.style.transitionDelay = el.getAttribute('data-delay').endsWith('ms')
          ? el.getAttribute('data-delay')
          : `${el.getAttribute('data-delay')}ms`;
      }
    });
  });


  if (!('IntersectionObserver' in window)) {

    elems.forEach(e => e.classList.add('animate'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('animate');
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -10% 0px' });

  elems.forEach(el => observer.observe(el));
});
