document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggleBtns = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    const htmlElement = document.documentElement;

    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        htmlElement.classList.remove('dark');
    } else {
        htmlElement.classList.add('dark');
    }

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            const theme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        });
    });

    // GSAP Scroll Reveal
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const sectionFades = document.querySelectorAll('.section-fade');
        sectionFades.forEach((section) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
                opacity: 0,
                y: 30,
                duration: 1,
                ease: 'power3.out'
            });
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});
