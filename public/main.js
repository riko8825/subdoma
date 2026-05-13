/* ============================================================
   UAB Subdoma — Main interactions
   Nav, mobile menu, cookies, smooth scroll, year, Calendly
   ============================================================ */

(function () {
  'use strict';

  function init() {
    setYear();
    smoothScroll();
    mobileMenu();
    cookieBar();
    initCalendly();
  }

  /* Copyright year */
  function setYear() {
    document.querySelectorAll('[data-year]').forEach(el => {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* Smooth scroll for hash links (offset for fixed nav) */
  function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      a.addEventListener('click', (e) => {
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const navH = document.querySelector('.nav')?.offsetHeight || 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
        closeMobileMenu();
      });
    });
  }

  /* Mobile menu */
  function mobileMenu() {
    const burger = document.querySelector('.nav__burger');
    const menu = document.querySelector('.nav__menu');
    if (!burger || !menu) return;

    burger.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      burger.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  function closeMobileMenu() {
    const burger = document.querySelector('.nav__burger');
    const menu = document.querySelector('.nav__menu');
    if (menu?.classList.contains('is-open')) {
      menu.classList.remove('is-open');
      burger?.classList.remove('is-open');
      burger?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  /* Cookie bar */
  function cookieBar() {
    const bar = document.querySelector('.cookie-bar');
    if (!bar) return;

    const KEY = 'subdoma-cookie-consent';
    const consent = localStorage.getItem(KEY);

    if (!consent) {
      setTimeout(() => bar.classList.add('is-visible'), 1800);
    }

    bar.querySelector('[data-cookie="accept"]')?.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.setItem(KEY, 'accepted');
      bar.classList.remove('is-visible');
    });

    bar.querySelector('[data-cookie="reject"]')?.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.setItem(KEY, 'rejected');
      bar.classList.remove('is-visible');
    });
  }

  /* Calendly inline embed — lazy load on first scroll near contacts */
  function initCalendly() {
    const target = document.querySelector('.contacts__calendly');
    if (!target) return;
    const url = target.dataset.calendlyUrl;
    if (!url) return;

    let loaded = false;

    const load = () => {
      if (loaded) return;
      loaded = true;

      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => {
        if (window.Calendly) {
          window.Calendly.initInlineWidget({
            url: url,
            parentElement: target,
            prefill: {},
            utm: {}
          });
        }
      };
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);
      document.head.appendChild(script);
    };

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            load();
            io.disconnect();
          }
        });
      }, { rootMargin: '200px' });
      io.observe(target);
    } else {
      load();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
