/* ============================================================
   UAB Subdoma — Animations Engine
   GSAP 3.12 + ScrollTrigger
   ============================================================ */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function init() {
    if (typeof gsap === 'undefined') {
      console.warn('GSAP not loaded — skipping animations');
      return;
    }
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
      return;
    }

    loaderCurtain();
    splitHeroTitle();
    revealOnScroll();
    statsCounter();
    parallaxHero();
    serviceCardsStagger();
    scrollProgressBar();
    if (isDesktop) customCursor();
    magneticButtons();
    navScrollState();
  }

  /* ---------- Loader curtain ---------- */
  function loaderCurtain() {
    const loader = document.querySelector('.loader');
    if (!loader) return;

    const tl = gsap.timeline({
      onComplete: () => {
        loader.style.display = 'none';
        ScrollTrigger.refresh();
      }
    });

    tl.to('.loader__mark', {
      scale: 1.2,
      duration: 0.6,
      ease: 'power2.out'
    })
    .to('.loader', {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut'
    }, '-=0.1')
    .from('.nav', {
      yPercent: -100,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.4');
  }

  /* ---------- Hero title split & reveal ---------- */
  function splitHeroTitle() {
    const title = document.querySelector('.hero__title');
    if (!title) return;

    const words = title.textContent.trim().split(/\s+/);
    title.innerHTML = words.map(w => {
      if (w.startsWith('§')) {
        return `<span class="split-word"><span class="accent">${w.slice(1)}</span></span>`;
      }
      return `<span class="split-word"><span>${w}</span></span>`;
    }).join(' ');

    gsap.set('.hero__title .split-word > span', { yPercent: 110 });

    const tl = gsap.timeline({ delay: 1.2 });

    tl.to('.hero__title .split-word > span', {
      yPercent: 0,
      duration: 1.1,
      ease: 'power4.out',
      stagger: 0.04
    })
    .from('.hero__eyebrow', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out'
    }, '<-0.6')
    .from('.hero__copy', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    }, '<+0.3')
    .from('.hero__ctas > *', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.08
    }, '<+0.2')
    .from('.hero__trust-item', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.1
    }, '<+0.2')
    .from('.hero__visual', {
      opacity: 0,
      scale: 0.92,
      duration: 1.2,
      ease: 'power3.out'
    }, '<-0.8');
  }

  /* ---------- Reveal on scroll ---------- */
  function revealOnScroll() {
    if (typeof ScrollTrigger === 'undefined') return;

    gsap.utils.toArray('[data-reveal]').forEach((el, i) => {
      const direction = el.dataset.reveal || 'up';
      const delay = parseFloat(el.dataset.revealDelay || 0);

      const fromVars = { opacity: 0, duration: 1, ease: 'power3.out', delay };
      if (direction === 'up') fromVars.y = 50;
      if (direction === 'down') fromVars.y = -50;
      if (direction === 'left') fromVars.x = -50;
      if (direction === 'right') fromVars.x = 50;
      if (direction === 'scale') fromVars.scale = 0.9;

      gsap.from(el, {
        ...fromVars,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    /* Stagger groups */
    gsap.utils.toArray('[data-stagger]').forEach(group => {
      const children = group.children;
      gsap.from(children, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: group,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  /* ---------- Stats counter ---------- */
  function statsCounter() {
    if (typeof ScrollTrigger === 'undefined') return;

    document.querySelectorAll('[data-counter]').forEach(el => {
      const raw = el.dataset.counter;
      const target = parseFloat(raw);
      const suffix = el.dataset.counterSuffix || '';
      const prefix = el.dataset.counterPrefix || '';
      const isFloat = raw.includes('.');

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              const v = isFloat ? obj.val.toFixed(1) : Math.floor(obj.val);
              el.textContent = prefix + v.toLocaleString('lt-LT') + suffix;
            }
          });
        }
      });
    });
  }

  /* ---------- Hero parallax ---------- */
  function parallaxHero() {
    if (typeof ScrollTrigger === 'undefined') return;
    if (window.innerWidth < 900) return;

    gsap.to('.hero__visual', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    gsap.to('.hero::before', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });
  }

  /* ---------- Service cards 3D tilt + stagger ---------- */
  function serviceCardsStagger() {
    if (typeof ScrollTrigger === 'undefined') return;

    const cards = document.querySelectorAll('.service-card');
    if (!cards.length) return;

    gsap.from(cards, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    if (!isDesktop) return;

    cards.forEach(card => {
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateY: x * 6,
          rotateX: -y * 6,
          transformPerspective: 1000,
          duration: 0.4,
          ease: 'power2.out'
        });
      };
      const onLeave = () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.6,
          ease: 'power3.out'
        });
      };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });
  }

  /* ---------- Scroll progress bar ---------- */
  function scrollProgressBar() {
    if (typeof ScrollTrigger === 'undefined') return;
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;

    gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    });
  }

  /* ---------- Custom cursor ---------- */
  function customCursor() {
    const dot = document.querySelector('.cursor');
    const ring = document.querySelector('.cursor--ring');
    if (!dot || !ring) return;

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3.out' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3.out' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' });

    window.addEventListener('mousemove', (e) => {
      xDot(e.clientX); yDot(e.clientY);
      xRing(e.clientX); yRing(e.clientY);
    });

    document.querySelectorAll('a, button, [role="button"], .service-card, .step, .feature-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('is-hover');
        ring.classList.add('is-hover');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('is-hover');
        ring.classList.remove('is-hover');
      });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  function magneticButtons() {
    if (!isDesktop) return;

    document.querySelectorAll('[data-magnetic]').forEach(btn => {
      const onMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.25,
          y: y * 0.35,
          duration: 0.5,
          ease: 'power3.out'
        });
      };
      const onLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
      };
      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);
    });
  }

  /* ---------- Nav scroll state ---------- */
  function navScrollState() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle('nav--scrolled', y > 40);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Boot */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
