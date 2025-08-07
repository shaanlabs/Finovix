// Hero Section Animations
const heroAnimations = {
    init() {
        // Hero title animation
        anime({
            targets: '.hero-title-animation',
            opacity: [0, 1],
            translateY: [-50, 0],
            duration: 1500,
            easing: 'easeOutExpo'
        });

        // Hero text animation
        anime({
            targets: '.hero-text-animation',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1500,
            delay: 200,
            easing: 'easeOutExpo'
        });

        // Hero buttons animation
        anime({
            targets: '.hero-buttons-animation > *',
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(100, {start: 500}),
            duration: 800,
            easing: 'easeOutQuad'
        });
    }
};

// Services Section Animations
const servicesAnimations = {
    init() {
        anime({
            targets: '.service-card',
            opacity: [0, 1],
            translateY: [100, 0],
            delay: anime.stagger(200),
            duration: 800,
            easing: 'easeOutQuad',
            autoplay: false
        });

        // Intersection Observer for triggering animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 800,
                        easing: 'easeOutQuad'
                    });
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.animation-container > *').forEach(el => {
            observer.observe(el);
        });
    }
};

// Navbar Scroll Animation
const navbarAnimation = {
    init() {
        const navbar = document.querySelector('.nav-animation');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > lastScroll) {
                anime({
                    targets: navbar,
                    translateY: [0, -100],
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            } else {
                anime({
                    targets: navbar,
                    translateY: [-100, 0],
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
            lastScroll = currentScroll;
        });
    }
};

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    heroAnimations.init();
    servicesAnimations.init();
    navbarAnimation.init();

    // Page transition animations
    window.addEventListener('beforeunload', () => {
        anime({
            targets: '#app',
            opacity: 0,
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
});
