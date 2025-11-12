document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.fade-up, .scale-in');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach(el => observer.observe(el));
});

const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const toast = document.getElementById('toast');

    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';

    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.classList.add('show');

    this.reset();

    submitBtn.disabled = false;
    btnText.textContent = 'Send Message';

    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
});

document.getElementById('toast').addEventListener('click', function() {
    this.classList.remove('show');
});
