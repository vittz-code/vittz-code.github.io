// Dark mode
const root  = document.documentElement;
const saved = localStorage.getItem('theme');

if (saved) {
    root.setAttribute('data-theme', saved);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.setAttribute('data-theme', 'dark');
}

document.getElementById('themeToggle').addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// Hamburger menu (mobile drawer)
const nav       = document.querySelector('.nav');
const hamburger = document.getElementById('navHamburger');
const navLinks  = document.getElementById('navLinks');
const hamSpans  = hamburger.querySelectorAll('span');

function setMenu(isOpen) {
    navLinks.classList.toggle('hidden', !isOpen);
    navLinks.classList.toggle('flex', isOpen);
    navLinks.classList.toggle('flex-col', isOpen);
    navLinks.classList.toggle('fixed', isOpen);
    navLinks.classList.toggle('top-[66px]', isOpen);
    navLinks.classList.toggle('left-0', isOpen);
    navLinks.classList.toggle('right-0', isOpen);
    navLinks.classList.toggle('bg-paper', isOpen);
    navLinks.classList.toggle('dark:bg-night', isOpen);
    navLinks.classList.toggle('border-b-[3px]', isOpen);
    navLinks.classList.toggle('border-ink', isOpen);
    navLinks.classList.toggle('dark:border-cream', isOpen);
    navLinks.classList.toggle('p-5', isOpen);
    navLinks.classList.toggle('z-[99]', isOpen);

    hamSpans[0].style.transform = isOpen ? 'rotate(45deg) translate(5.5px, 5.5px)' : '';
    hamSpans[1].style.opacity   = isOpen ? '0' : '1';
    hamSpans[1].style.transform = isOpen ? 'scaleX(0)' : '';
    hamSpans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5.5px, -5.5px)' : '';

    hamburger.setAttribute('aria-expanded', String(isOpen));
}

hamburger.addEventListener('click', () => {
    setMenu(navLinks.classList.contains('hidden'));
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
});

// Close menu on outside tap
document.addEventListener('click', (e) => {
    if (!navLinks.classList.contains('hidden') && !nav.contains(e.target)) {
        setMenu(false);
    }
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// Contact form — Formspree via fetch
document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const status = document.getElementById('form-status');
    const submitBtn = this.querySelector('[type="submit"]');

    const name    = this.querySelector('#f-name').value.trim();
    const email   = this.querySelector('#f-email').value.trim();
    const message = this.querySelector('#f-message').value.trim();

    if (!name || !email || !message) {
        status.textContent = 'Preencha todos os campos.';
        status.className = 'form-status err';
        return;
    }

    submitBtn.disabled = true;
    status.textContent = 'Enviando...';
    status.className = 'form-status';

    try {
        const res = await fetch(this.action, {
            method: 'POST',
            body: new FormData(this),
            headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
            status.textContent = 'Mensagem enviada!';
            status.className = 'form-status ok';
            this.reset();
        } else {
            status.textContent = 'Erro ao enviar. Tente novamente.';
            status.className = 'form-status err';
        }
    } catch (_) {
        status.textContent = 'Algo deu errado. Verifique sua conexão.';
        status.className = 'form-status err';
    } finally {
        submitBtn.disabled = false;
        setTimeout(() => { status.textContent = ''; }, 5000);
    }
});
