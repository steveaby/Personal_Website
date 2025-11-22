document.addEventListener('DOMContentLoaded', () => {
    // Boot Sequence
    const bootScreen = document.getElementById('boot-screen');
    setTimeout(() => {
        bootScreen.style.opacity = '0';
        setTimeout(() => {
            bootScreen.style.display = 'none';
        }, 500);
    }, 2500); // 2.5s boot time

    // Typing Effect
    const textToType = "Building the future by tinkering with tech.";
    const typingElement = document.getElementById('typing-text');
    let i = 0;

    function typeWriter() {
        if (i < textToType.length) {
            typingElement.innerHTML += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typing after boot
    setTimeout(typeWriter, 2600);

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for HUD elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hud-card, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Glitch Effect Randomizer
    const glitch = document.querySelector('.glitch');
    setInterval(() => {
        const r = Math.random();
        if (r < 0.3) {
            glitch.style.textShadow = '2px 2px 0px #45a29e';
        } else if (r < 0.6) {
            glitch.style.textShadow = '-2px -2px 0px #bd00ff';
        } else {
            glitch.style.textShadow = 'none';
        }
    }, 200);
});
