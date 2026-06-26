/* ============================================================
   main.js — CV. Mandira Heritage Group
   ============================================================ */

(function () {
  'use strict';

  /* ---------- SPLASH SCREEN ---------- */
  const splash      = document.getElementById('splash');
  const splashEnter = document.getElementById('splashEnter');
  const splashSkip  = document.getElementById('splashSkip');

  function hideSplash() {
    splash.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (splash) {
    document.body.style.overflow = 'hidden';
    splashEnter && splashEnter.addEventListener('click', hideSplash);
    splashSkip  && splashSkip.addEventListener('click', hideSplash);
    // Auto-hide after 6 seconds
    setTimeout(hideSplash, 6000);
  }

  /* ---------- NAVIGATION ---------- */
  const nav    = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  // Sticky nav style on scroll
  window.addEventListener('scroll', () => {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }
  }, { passive: true });

  // Mobile burger toggle
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active link highlight on scroll
  const sections = document.querySelectorAll('section[id], div[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveNav() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.getAttribute('id');
      }
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ---------- HERO PARALLAX & LOAD ---------- */
  const heroSection = document.querySelector('.hero');
  const heroBg      = document.querySelector('.hbg');

  if (heroSection) {
    // Trigger CSS scale animation
    setTimeout(() => heroSection.classList.add('loaded'), 100);

    // Subtle parallax
    window.addEventListener('scroll', () => {
      if (heroBg) {
        const scrollY = window.scrollY;
        heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.25}px)`;
      }
    }, { passive: true });
  }

  /* ---------- SCROLL REVEAL ---------- */
  const revEls = document.querySelectorAll('.rev');

  if ('IntersectionObserver' in window) {
    const revObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revEls.forEach(el => revObserver.observe(el));
  } else {
    // Fallback: show everything
    revEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------- COUNTER ANIMATION (STATS BAR) ---------- */
  const statNums = document.querySelectorAll('.stat-n[data-target]');

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step     = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target.toLocaleString('id-ID');
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current).toLocaleString('id-ID');
      }
    }, step);
  }

  if ('IntersectionObserver' in window && statNums.length) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNums.forEach(el => statObserver.observe(el));
  }

  /* ---------- SERVICE TABS ---------- */
  const svcTabs  = document.querySelectorAll('.svc-tab');
  const svcPanes = document.querySelectorAll('.svc-pane');

  svcTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      svcTabs.forEach(t => t.classList.remove('on'));
      svcPanes.forEach(p => p.classList.remove('on'));

      tab.classList.add('on');
      const pane = document.getElementById('p-' + target);
      if (pane) {
        pane.classList.add('on');
        // Re-trigger reveal for newly shown cards
        pane.querySelectorAll('.rev').forEach(el => {
          el.classList.remove('visible');
          setTimeout(() => el.classList.add('visible'), 50);
        });
      }
    });
  });

  /* ---------- PORTFOLIO FILTER ---------- */
  const filterBtns = document.querySelectorAll('.pf');
  const portCards  = document.querySelectorAll('.pcard');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('on'));
      btn.classList.add('on');

      portCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });

  /* ---------- SMOOTH SCROLL (fallback for older browsers) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();