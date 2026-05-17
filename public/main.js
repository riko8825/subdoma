/* ============================================================
   UAB Subdoma — Main interactions
   Nav, mobile menu, smooth scroll, year, Calendly
   Cookies handled by Silktide Consent Manager (consent-init.js)
   ============================================================ */

(function () {
  'use strict';

  function init() {
    setYear();
    smoothScroll();
    mobileMenu();
    actionBar();
    faqAccordion();
    serviceFilter();
    initCalendly();
    consentReopen();
  }

  /* Open Silktide preferences modal from [data-open-consent] buttons (e.g. privacy page).
     Silktide v2 doesn't expose a public showPreferences(); we trigger the cookie icon click. */
  function consentReopen() {
    const buttons = document.querySelectorAll('[data-open-consent]');
    if (!buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = document.querySelector('.silktide-cookie-icon, #silktide-cookie-icon-button, [class*="cookie-icon"]');
        if (icon) {
          icon.click();
        } else if (window.silktideConsentManager && typeof window.silktideConsentManager.getInstance === 'function') {
          const inst = window.silktideConsentManager.getInstance();
          if (inst && typeof inst.toggleModal === 'function') {
            if (!inst.preferences) inst.createModal();
            inst.toggleModal(true);
          }
        }
      });
    });
  }

  /* Sticky action bar — show after scrolling past hero.
     Also lifts WhatsApp FAB so it doesn't overlap the bar. */
  function actionBar() {
    const bar = document.getElementById('action-bar');
    if (!bar) return;

    const fab = document.querySelector('.wa-fab');
    const hero = document.querySelector('.hero');
    const threshold = hero ? hero.offsetHeight * 0.6 : 400;

    let visible = false;
    const onScroll = () => {
      const shouldShow = window.scrollY > threshold;
      if (shouldShow !== visible) {
        visible = shouldShow;
        bar.classList.toggle('is-visible', shouldShow);
        if (fab) fab.classList.toggle('is-lifted', shouldShow);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* FAQ accordion */
  function faqAccordion() {
    document.querySelectorAll('.faq__item').forEach((item, idx) => {
      const trigger = item.querySelector('.faq__trigger');
      const answer = item.querySelector('.faq__answer');
      if (!trigger || !answer) return;
      const answerId = answer.id || `faq-answer-${idx + 1}`;
      answer.id = answerId;
      answer.setAttribute('role', 'region');
      trigger.setAttribute('aria-controls', answerId);
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded', String(isOpen));
      });
    });
  }

  /* Service grid filter tabs */
  function serviceFilter() {
    const tabs = document.querySelectorAll('[data-filter]');
    if (!tabs.length) return;
    const cards = document.querySelectorAll('.service-card[data-group]');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.dataset.filter;
        tabs.forEach(t => {
          const isActive = t === tab;
          t.classList.toggle('is-active', isActive);
          if (t.getAttribute('role') === 'tab') {
            t.setAttribute('aria-selected', String(isActive));
          }
        });
        cards.forEach(card => {
          const groups = (card.dataset.group || '').split(' ');
          const show = filter === 'all' || groups.includes(filter);
          card.classList.toggle('is-hidden', !show);
        });
      });
    });
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

  /* MailerLite — consent-gated loader.
     Called from consent-init.js on "advertising" accept.
     Idempotent: safe to call multiple times. */
  window.loadMailerLite = function () {
    if (window.__mlLoaded) return;
    window.__mlLoaded = true;

    window.ml = window.ml || function () {
      (window.ml.q = window.ml.q || []).push(arguments);
    };

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://assets.mailerlite.com/js/universal.js';
    var first = document.getElementsByTagName('script')[0];
    first.parentNode.insertBefore(s, first);

    window.ml('account', '1993875');

    document.querySelectorAll('.newsletter__fallback').forEach(function (el) {
      el.style.display = 'none';
    });
  };

})();
