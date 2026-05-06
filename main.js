// Dark mode
const root = document.documentElement;
const btn  = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');

if (saved) {
    root.setAttribute('data-theme', saved);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.setAttribute('data-theme', 'dark');
}

btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// Contact form
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name    = this.querySelector('#f-name').value.trim();
    const email   = this.querySelector('#f-email').value.trim();
    const message = this.querySelector('#f-message').value.trim();
    const status  = document.getElementById('form-status');

    if (!name || !email || !message) {
        status.textContent = 'Preencha todos os campos.';
        status.className = 'form-status err';
        return;
    }

    const subject = encodeURIComponent(`Mensagem de ${name} via portfólio`);
    const body    = encodeURIComponent(`De: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:victor.olv00@gmail.com?subject=${subject}&body=${body}`;

    status.textContent = 'Abrindo seu cliente de e-mail...';
    status.className = 'form-status ok';
    setTimeout(() => { status.textContent = ''; }, 4000);
});
