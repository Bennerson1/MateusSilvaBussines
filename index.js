// script.js (compiled)
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let W = canvas.width = innerWidth;
    let H = canvas.height = innerHeight;
    window.addEventListener('resize', () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; initParticles(); });
    let particles = [];
    function initParticles() {
        particles = [];
        const count = Math.max(40, Math.round((W * H) / 150000));
        for (let i = 0; i < count; i++) {
            particles.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.6 + 0.6, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, a: Math.random() * 0.8 + 0.05, hue: Math.random() * 360 });
        }
    }
    function draw() {
        ctx.clearRect(0, 0, W, H);
        const g = ctx.createLinearGradient(0, 0, W, H);
        g.addColorStop(0, 'rgba(9,217,201,0.02)');
        g.addColorStop(0.6, 'rgba(255,60,166,0.02)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < -20)
                p.x = W + 20;
            if (p.x > W + 20)
                p.x = -20;
            if (p.y < -20)
                p.y = H + 20;
            if (p.y > H + 20)
                p.y = -20;
            ctx.beginPath();
            ctx.globalAlpha = p.a;
            ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${p.a})`;
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(draw);
    }
    initParticles();
    draw();
}
document.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('intro');
    const enter = document.getElementById('enterBtn');
    function closeIntro() {
        intro.style.transition = 'opacity .6s ease, transform .6s ease';
        intro.style.opacity = '0';
        intro.style.transform = 'scale(.98)';
        setTimeout(() => intro.remove(), 700);
    }
    enter.addEventListener('click', closeIntro);
    setTimeout(closeIntro, 2800);
    const photo = document.getElementById('heroPhoto');
    const frame = document.getElementById('photoFrame');
    if (photo && frame) {
        let rect = frame.getBoundingClientRect();
        window.addEventListener('mousemove', (e) => {
            const cx = (e.clientX - rect.left) - rect.width / 2;
            const cy = (e.clientY - rect.top) - rect.height / 2;
            photo.style.transform = `translate3d(${cx * 0.02}px, ${cy * 0.02}px, 0) scale(1.02) rotate(${cx * 0.003}deg)`;
        });
        window.addEventListener('resize', () => rect = frame.getBoundingClientRect());
    }
    const fills = Array.from(document.querySelectorAll('.fill'));
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const val = Number(el.dataset.val || '0');
                el.style.width = val + '%';
                el.classList.add('done');
            }
        });
    }, { threshold: 0.25 });
    fills.forEach(f => io.observe(f));
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (ev) => {
            const href = a.getAttribute('href');
            if (href && href.startsWith('#')) {
                ev.preventDefault();
                const t = document.querySelector(href);
                if (t)
                    t.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            if (!btn)
                return;
            btn.textContent = 'Enviando...';
            setTimeout(() => { btn.textContent = 'Enviado ✓'; setTimeout(() => btn.textContent = 'Enviar mensagem', 1300); }, 900);
        });
    }
});
