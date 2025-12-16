// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Intersection Observer for Fade Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Start counter if it's a metric item
            if (entry.target.classList.contains('metric-item')) {
                const numberSpan = entry.target.querySelector('.number');
                if (numberSpan) {
                    animateValue(numberSpan, 0, parseInt(numberSpan.getAttribute('data-target')), 2000);
                }
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .fade-up, .fade-right').forEach(el => {
    observer.observe(el);
});

// Counter Animation Function
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        if (nav.style.display === 'flex') {
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '80px';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.background = '#0a192f';
            nav.style.padding = '20px';
            nav.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        }
    });
}
