/* ===========================
   CUSTOM CURSOR
=========================== */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  cursor.style.left = curX + 'px';
  cursor.style.top  = curY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .project-card, .stat-card, .skill-tags span').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

/* ===========================
   SCROLL REVEAL
=========================== */
const revealEls = document.querySelectorAll(
  '.section-label, .section-title, .about-text, .about-stats, ' +
  '.skill-group, .project-card, .contact-block, .stat-card'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

/* ===========================
   STAGGERED GRID REVEALS
=========================== */
function staggerReveal(containerSelector, childSelector, delayStep = 80) {
  document.querySelectorAll(containerSelector).forEach(container => {
    const children = container.querySelectorAll(childSelector);
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        children.forEach((child, i) => {
          child.style.transitionDelay = (i * delayStep) + 'ms';
        });
        obs.unobserve(container);
      }
    }, { threshold: 0.1 });
    obs.observe(container);
  });
}

staggerReveal('.projects-list', '.project-card', 70);
staggerReveal('.skills-grid', '.skill-group', 100);
staggerReveal('.about-stats', '.stat-card', 80);

/* ===========================
   ACTIVE NAV LINK
=========================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + id
          ? 'var(--accent)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

/* ===========================
   NAV HIDE ON SCROLL DOWN
=========================== */
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  nav.style.transition = 'transform 0.3s ease';
  nav.style.transform = (scrollY > lastScroll && scrollY > 100)
    ? 'translateY(-100%)' : 'translateY(0)';
  lastScroll = scrollY;
});
