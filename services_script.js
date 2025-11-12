const tag = document.querySelector('.service-tag');

function animateTag() {
    tag.classList.add('animate');

    setTimeout(() => {
        tag.classList.remove('animate');

        setTimeout(animateTag, 4000);
    }, 5000);
}

animateTag();
