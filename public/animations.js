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
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
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
        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
      }
    });

    tl.to('.loader__mark', {
      scale: 1.15,
      duration: 0.35,
      ease: 'power2.out'
    })
    .to('.loader', {
      yPercent: -100,
      duration: 0.55,
      ease: 'power3.inOut'
    }, '-=0.1');
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

    const tl = gsap.timeline({
      delay: 0.4,
      onComplete: () => {
        gsap.set('.hero__title .split-word', { overflow: 'visible' });
        gsap.set('.hero__title .split-word > span', { clearProps: 'transform,willChange' });
      }
    });

    tl.to('.hero__title .split-word > span', {
      yPercent: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.04
    })
    .from('.hero__eyebrow', {
      opacity: 0,
      y: 16,
      duration: 0.5,
      ease: 'power3.out'
    }, '<-0.4')
    .from('.hero__copy', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power3.out'
    }, '<+0.2')
    .from('.hero__ctas > *', {
      opacity: 0,
      y: 16,
      duration: 0.45,
      ease: 'power3.out',
      stagger: 0.06
    }, '<+0.15')
    .from('.hero__trust-item', {
      opacity: 0,
      y: 16,
      duration: 0.45,
      ease: 'power3.out',
      stagger: 0.07
    }, '<+0.15')
    .from('.hero__visual', {
      opacity: 0,
      scale: 0.95,
      duration: 0.7,
      ease: 'power3.out'
    }, '<-0.5');
  }

  /* ---------- Reveal on scroll ---------- */
  function revealOnScroll() {
    if (typeof ScrollTrigger === 'undefined') return;

    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      const direction = el.dataset.reveal || 'up';
      const delay = parseFloat(el.dataset.revealDelay || 0);

      const fromVars = { opacity: 0, duration: 0.55, ease: 'power3.out', delay };
      if (direction === 'up') fromVars.y = 40;
      if (direction === 'down') fromVars.y = -40;
      if (direction === 'left') fromVars.x = -40;
      if (direction === 'right') fromVars.x = 40;
      if (direction === 'scale') fromVars.scale = 0.94;

      gsap.from(el, {
        ...fromVars,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });

    /* Stagger groups */
    gsap.utils.toArray('[data-stagger]').forEach(group => {
      const children = group.children;
      gsap.from(children, {
        opacity: 0,
        y: 28,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: group,
          start: 'top 88%',
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
            duration: 1.2,
            ease: 'power3.out',
            snap: isFloat ? { val: 0.1 } : { val: 1 },
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
      yPercent: 8,
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
      y: 40,
      duration: 0.5,
      ease: 'power3.out',
      stagger: 0.06,
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 85%',
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
          rotateY: x * 3,
          rotateX: -y * 3,
          transformPerspective: 1200,
          duration: 0.4,
          ease: 'power2.out'
        });
      };
      const onLeave = () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.45,
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

  /* ---------- Magnetic buttons ---------- */
  function magneticButtons() {
    if (!isDesktop) return;

    document.querySelectorAll('[data-magnetic]').forEach(btn => {
      const onMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.12,
          y: y * 0.15,
          duration: 0.35,
          ease: 'power3.out'
        });
      };
      const onLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.45, ease: 'power3.out' });
      };
      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);
    });
  }

  /* ---------- Nav scroll state ---------- */
  function navScrollState() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const onScroll = () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 40);
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
