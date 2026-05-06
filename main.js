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

// Hamburger menu
const nav       = document.querySelector('.nav');
const hamburger = document.getElementById('navHamburger');

hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close menu when a nav link is clicked
document.querySelectorAll('#navLinks a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav--open');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Close menu on outside tap
document.addEventListener('click', (e) => {
    if (nav.classList.contains('nav--open') && !nav.contains(e.target)) {
        nav.classList.remove('nav--open');
        hamburger.setAttribute('aria-expanded', 'false');
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
