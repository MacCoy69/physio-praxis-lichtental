/* ============================================================
   Physiotherapie Praxis Lichtental – Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Header Scroll Effect --- */
  const header = document.querySelector('.header');
  const scrollThreshold = 80;

  function handleHeaderScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* --- Mobile Navigation --- */
  const navToggle = document.querySelector('.nav__toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__link, .nav__cta');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav--open');
      navToggle.classList.toggle('nav__toggle--active');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav--open');
        navToggle.classList.remove('nav__toggle--active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Active Navigation Link on Scroll --- */
  const sections = document.querySelectorAll('main section[id]');
  const allNavLinks = document.querySelectorAll('.nav__link[href^="#"]');

  function highlightActiveSection() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        allNavLinks.forEach(link => {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveSection, { passive: true });

  /* --- Scroll Reveal Animation --- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* --- Counter Animation --- */
  const counters = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const duration = 2000;
        const startTime = performance.now();

        function animateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);
          el.textContent = prefix + current + suffix;

          if (progress < 1) {
            requestAnimationFrame(animateCount);
          }
        }

        requestAnimationFrame(animateCount);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  /* --- Google Maps 2-Click Solution (DSGVO) --- */
  const mapBtn = document.querySelector('.contact__map-btn');
  const mapContainer = document.querySelector('.contact__map');

  if (mapBtn && mapContainer) {
    mapBtn.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2627.8!2d8.2401!3d48.7550!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSteinbruchweg+2%2C+76534+Baden-Baden!5e0!3m2!1sde!2sde!4v1';
      iframe.title = 'Standort Physiotherapie Praxis Lichtental auf Google Maps';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.setAttribute('allowfullscreen', '');

      mapContainer.innerHTML = '';
      mapContainer.appendChild(iframe);
    });
  }

  /* --- Smooth Scroll for Anchor Links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* --- Current Year in Footer --- */
  const yearEl = document.querySelector('.footer__year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
