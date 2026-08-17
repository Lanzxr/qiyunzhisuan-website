// Qiyun Zhisuang - Modern Tech Animation System

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ========================================
  // Loading Screen Animation
  // ========================================
  function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = loadingScreen?.querySelector('.loading-text');
    const loadingProgress = loadingScreen?.querySelector('.loading-progress');

    if (!loadingScreen) return;

    let progress = 0;
    const loadingInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);

        setTimeout(() => {
          loadingScreen.style.opacity = '0';
          setTimeout(() => {
            loadingScreen.style.display = 'none';
            initPageAnimations();
          }, 500);
        }, 300);
      }

      if (loadingProgress) {
        loadingProgress.style.width = progress + '%';
      }

      if (loadingText && progress < 100) {
        const texts = ['INITIALIZING', 'LOADING', 'PROCESSING', 'READY'];
        loadingText.textContent = texts[Math.floor(Math.random() * texts.length)];
      } else if (loadingText) {
        loadingText.textContent = 'COMPLETE';
      }
    }, 200);
  }

  // ========================================
  // Particle System - Canvas Background
  // ========================================
  function initParticleSystem() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(102, 126, 234, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create particles (less on mobile)
    const particleCount = window.innerWidth < 768 ? 50 : 150;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(102, 126, 234, ${0.2 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    }

    if (!prefersReducedMotion) {
      animate();
    }
  }

  // ========================================
  // Hero Particles - Separate canvas for hero section
  // ========================================
  function initHeroParticles() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const hero = document.querySelector('.hero');
    if (!hero) return;

    function resize() {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.3
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      });

      if (!prefersReducedMotion) {
        requestAnimationFrame(animate);
      }
    }

    animate();
  }

  // ========================================
  // Code Rain Effect (Matrix style)
  // ========================================
  function initCodeRain() {
    const canvas = document.getElementById('code-rain');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resize() {
      const container = canvas.parentElement;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';

      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = `rgba(82, 104, 214, ${Math.random() * 0.28 + 0.16})`;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    if (!prefersReducedMotion) {
      setInterval(draw, 50);
    }
  }

  // ========================================
  // Cursor Glow Effect
  // ========================================
  function initCursorGlow() {
    const glow = document.querySelector('.cursor-glow');
    if (!glow || window.innerWidth < 768) return;

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  // ========================================
  // 3D Card Tilt Effect
  // ========================================
  function init3DCards() {
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        if (prefersReducedMotion) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }

  // ========================================
  // GSAP ScrollTrigger Animations
  // ========================================
  function initPageAnimations() {
    if (typeof gsap === 'undefined') {
      console.warn('GSAP not loaded, skipping animations');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Hero title - just show it, no typewriter effect
    const heroTitle = document.querySelector('.hero-title-animated');
    if (heroTitle) {
      heroTitle.style.opacity = '1';
    }

    // Restrained reveal motion for the monochrome redesign.
    gsap.utils.toArray('.reveal').forEach((element, index) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 24,
        opacity: 0,
        duration: 0.55,
        ease: 'power2.out',
        delay: Math.min(index * 0.04, 0.16)
      });
    });

    // Parallax effect for hero background
    if (!prefersReducedMotion) {
      gsap.to('.hero-background', {
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: 200,
        ease: 'none'
      });
    }

    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) gsap.to(scrollArrow, { y: 10, duration: 1, repeat: -1, yoyo: true, ease: 'power1.inOut' });
  }

  // ========================================
  // Initialize everything when DOM is ready
  // ========================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initLoadingScreen();
    initParticleSystem();
    initHeroParticles();
    initCodeRain();
    initCursorGlow();
    init3DCards();

    // Page animations will be called after loading screen
    if (!document.getElementById('loading-screen')) {
      initPageAnimations();
    }
  }

})();
