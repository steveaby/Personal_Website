/**
 * STEVE ABY TONIO - AWWWARDS PORTFOLIO ENGINE
 * Cyber-Architect HUD & Interactive Canvas System
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Systems
  initPreloader();
  initBackgroundCanvas();
  initAudioSynthesizer();
  initTypewriter();
  initTiltEffects();
  initCommandPalette();
  initProjectModals();
  initSkillsFilter();
  initInteractiveTerminal();
  initScrollSpyAndCounters();
});

/* ==========================================================================
   1. PRELOADER BOOT SEQUENCE
   ========================================================================== */
function initPreloader() {
  const bootScreen = document.getElementById('boot-screen');
  const progressFill = document.querySelector('.progress-bar-fill');
  const logContainer = document.querySelector('.boot-logs');

  if (!bootScreen || !progressFill || !logContainer) return;

  const logs = [
    { text: 'CHECKING MEMORY REGISTERS...', status: 'OK' },
    { text: 'LOADING NEURAL NET MODULES...', status: 'OK' },
    { text: 'FETCHING UIUC CS MS METRICS...', status: 'OK' },
    { text: 'INITIALIZING BARCLAYS LOGS...', status: 'OK' },
    { text: 'ESTABLISHING HYPER-LINK GRID...', status: 'ONLINE' }
  ];

  let progress = 0;
  let logIndex = 0;

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 18) + 12;
    if (progress > 100) progress = 100;

    progressFill.style.width = `${progress}%`;

    if (logIndex < logs.length && progress >= (logIndex + 1) * 20) {
      const item = document.createElement('div');
      item.className = 'boot-log-item';
      item.innerHTML = `<span>> ${logs[logIndex].text}</span> <span class="ok">[${logs[logIndex].status}]</span>`;
      logContainer.appendChild(item);
      logContainer.scrollTop = logContainer.scrollHeight;
      logIndex++;
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        bootScreen.classList.add('loaded');
      }, 500);
    }
  }, 120);
}

/* ==========================================================================
   2. BACKGROUND PARTICLES & NEURAL MESH CANVAS
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 180 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 1.8 + 1;
      this.baseAlpha = Math.random() * 0.4 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse distance interaction
      if (mouse.x && mouse.y) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2;
          this.y -= (dy / dist) * force * 2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 243, 255, ${this.baseAlpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00f3ff';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 14000), 80);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting mesh lines
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const alpha = (1 - dist / 130) * 0.15;
          ctx.strokeStyle = `rgba(0, 243, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  resize();
  animate();
}

/* ==========================================================================
   3. WEB AUDIO SYNTHESIZER FOR UI SOUND EFFECTS
   ========================================================================== */
let audioCtx = null;
let soundEnabled = false;

function initAudioSynthesizer() {
  const audioBtn = document.getElementById('audio-toggle');
  if (!audioBtn) return;

  audioBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    audioBtn.classList.toggle('active', soundEnabled);
    const icon = audioBtn.querySelector('i');
    if (icon) {
      icon.className = soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
    }

    if (soundEnabled) {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      playSynthBeep(880, 0.08, 'sine');
    }
  });

  // Attach sound triggers to interactive elements
  document.querySelectorAll('button, .cyber-btn, .nav-link, .project-card').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (soundEnabled) playSynthBeep(440, 0.03, 'sine');
    });
    el.addEventListener('click', () => {
      if (soundEnabled) playSynthBeep(660, 0.05, 'triangle');
    });
  });
}

function playSynthBeep(freq = 440, duration = 0.05, type = 'sine') {
  if (!audioCtx || !soundEnabled) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

/* ==========================================================================
   4. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter-target');
  if (!target) return;

  const roles = [
    'MS CS @ UIUC (AI & ML Specialist)',
    'Ex-Barclays Graduate Analyst (SDE II)',
    'Springer Published AI Researcher',
    'Full-Stack & Intelligent Systems Engineer'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIdx];
    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      target.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = isDeleting ? 30 : 60;

    if (!isDeleting && charIdx === currentRole.length) {
      speed = 2200; // Pause at full string
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

/* ==========================================================================
   5. 3D CARD TILT EFFECT
   ========================================================================== */
function initTiltEffects() {
  // Only apply 3D tilt tracking to non-interactive decorative cards
  const cards = document.querySelectorAll('.profile-card, .hero-hud-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (centerY - y) / 18;
      const rotateY = (x - centerX) / 18;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ==========================================================================
   6. COMMAND PALETTE (Cmd + K)
   ========================================================================== */
function initCommandPalette() {
  const backdrop = document.getElementById('cmd-palette-backdrop');
  const triggerBtns = document.querySelectorAll('.cmd-k-trigger');
  const input = document.getElementById('cmd-palette-input');
  const list = document.getElementById('cmd-palette-list');

  if (!backdrop || !input || !list) return;

  const commands = [
    { title: 'Jump to About Section', action: () => scrollToSection('#about') },
    { title: 'Jump to Experience Timeline', action: () => scrollToSection('#experience') },
    { title: 'Jump to Featured Projects', action: () => scrollToSection('#projects') },
    { title: 'Jump to Capabilities & Skills', action: () => scrollToSection('#skills') },
    { title: 'Jump to Springer Publication', action: () => scrollToSection('#research') },
    { title: 'Jump to Terminal & Comms', action: () => scrollToSection('#contact') },
    { title: 'Copy Email (stonio2@illinois.edu)', action: () => copyToClipboard('stonio2@illinois.edu', 'Email copied!') },
    { title: 'Open LinkedIn Profile', action: () => window.open('https://linkedin.com/in/steveaby', '_blank') },
    { title: 'Open GitHub Profile', action: () => window.open('https://github.com/steveaby', '_blank') }
  ];

  function openPalette() {
    backdrop.classList.add('open');
    input.value = '';
    renderCommands(commands);
    setTimeout(() => input.focus(), 100);
  }

  function closePalette() {
    backdrop.classList.remove('open');
  }

  triggerBtns.forEach((btn) => btn.addEventListener('click', openPalette));

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closePalette();
  });

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      backdrop.classList.contains('open') ? closePalette() : openPalette();
    } else if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closePalette();
    }
  });

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    const filtered = commands.filter((c) => c.title.toLowerCase().includes(q));
    renderCommands(filtered);
  });

  function renderCommands(items) {
    list.innerHTML = '';
    if (items.length === 0) {
      list.innerHTML = '<li class="cmd-item" style="justify-content:center;">No matching commands found</li>';
      return;
    }

    items.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'cmd-item';
      li.innerHTML = `<span>${item.title}</span> <i class="fas fa-level-down-alt fa-rotate-90"></i>`;
      li.addEventListener('click', () => {
        item.action();
        closePalette();
      });
      list.appendChild(li);
    });
  }
}

function scrollToSection(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function copyToClipboard(text, msg) {
  navigator.clipboard.writeText(text);
  alert(msg);
}

/* ==========================================================================
   7. PROJECT DEEP DIVE MODALS
   ========================================================================== */
const projectData = {
  bugcatcher: {
    title: 'BugCatcher Joey',
    badge: 'AI POKÉMON STRATEGIST & OPTIMIZER',
    desc: 'An intelligent AI Pokémon Strategist that mathematically optimizes competitive teams against the global meta using real-time Monte Carlo simulations, Smogon calc engines, and FastAPI streaming.',
    slides: [
      'assets/Bug_Home.jpg',
      'assets/Bug_Sim.jpg',
      'assets/Bug_Opti.jpg',
      'assets/Bug_Poke.jpg',
      'assets/Bug_Item.jpg'
    ],
    tech: ['React', 'Vite', 'Python FastAPI', 'Node.js (@smogon/calc)', 'Modal Cloud', 'OpenRouter LLM'],
    team: ['Steve Aby Tonio', 'Chinmay Dandekar', 'Pranav Premchand'],
    github: 'https://github.com/ChinDandekar/bugcatcherjoey'
  },
  vectorquest: {
    title: 'VectorQuest',
    badge: 'PUBLISHED RESEARCH - SPRINGER NATURE',
    desc: 'Open-Domain Question Answering (QA) optimization methodology allowing 50x faster answer prediction compared to existing SQuAD baseline systems.',
    slides: ['assets/VectorQuest.jpg'],
    tech: ['Python', 'Vector DB', 'NLP', 'Knowledge Graphs', 'PyTorch'],
    paperLink: 'https://link.springer.com/chapter/10.1007/978-3-031-88237-1_4'
  },
  hypersafety: {
    title: 'HyperSafety',
    badge: 'SAFETY COMPLIANCE & FACE RECOGNITION ML',
    desc: 'Enterprise employee compliance management system combining Flutter frontend with CNN mask detection (98.95% accuracy) and facial recognition automatic warning logs.',
    slides: ['assets/hypersafety.gif'],
    tech: ['Flutter', 'Node.js REST API', 'Python ML (OpenCV, CNN)', 'MySQL'],
    team: ['Steve Aby Tonio', 'Ritvik Sharma', 'Vivek Nichani', 'Akul Jain', 'Harsh Ambasta'],
    github: 'https://github.com/ritviksharma4/HyperSafety_Frontend'
  }
};

function initProjectModals() {
  const backdrop = document.getElementById('project-modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!backdrop) return;

  document.querySelectorAll('.project-card').forEach((card) => {
    const btn = card.querySelector('[data-project-id]');
    if (!btn) return;
    const id = btn.getAttribute('data-project-id');
    const data = projectData[id];

    // Allow clicking modal button or thumbnail wrapper
    const clickables = card.querySelectorAll('[data-project-id], .project-thumbnail-wrapper');
    clickables.forEach((el) => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        if (data) openProjectModal(data);
      });
    });
  });

  closeBtn.addEventListener('click', () => backdrop.classList.remove('open'));
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) backdrop.classList.remove('open');
  });
}

function openProjectModal(data) {
  const backdrop = document.getElementById('project-modal-backdrop');
  const titleEl = document.getElementById('modal-project-title');
  const badgeEl = document.getElementById('modal-project-badge');
  const descEl = document.getElementById('modal-project-desc');
  const trackEl = document.getElementById('modal-carousel-track');
  const dotsEl = document.getElementById('modal-carousel-dots');
  const techEl = document.getElementById('modal-tech-list');
  const linksEl = document.getElementById('modal-links');

  titleEl.textContent = data.title;
  badgeEl.textContent = data.badge;
  descEl.textContent = data.desc;

  // Build Slides
  trackEl.innerHTML = '';
  dotsEl.innerHTML = '';
  data.slides.forEach((src, idx) => {
    const img = document.createElement('img');
    img.className = 'modal-carousel-slide';
    img.src = src;
    trackEl.appendChild(img);

    const dot = document.createElement('span');
    dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => setSlide(idx));
    dotsEl.appendChild(dot);
  });

  let currentSlide = 0;
  function setSlide(idx) {
    currentSlide = idx;
    trackEl.style.transform = `translateX(-${idx * 100}%)`;
    document.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  }

  document.getElementById('carousel-prev').onclick = () => {
    currentSlide = (currentSlide - 1 + data.slides.length) % data.slides.length;
    setSlide(currentSlide);
  };
  document.getElementById('carousel-next').onclick = () => {
    currentSlide = (currentSlide + 1) % data.slides.length;
    setSlide(currentSlide);
  };

  // Build Tech
  techEl.innerHTML = data.tech.map((t) => `<span class="project-tag">${t}</span>`).join('');

  // Build Links
  linksEl.innerHTML = '';
  if (data.github) {
    linksEl.innerHTML += `<a href="${data.github}" target="_blank" class="cyber-btn" style="padding:10px 20px;"><i class="fab fa-github"></i> ACCESS SOURCE CODE</a>`;
  }
  if (data.paperLink) {
    linksEl.innerHTML += `<a href="${data.paperLink}" target="_blank" class="cyber-btn" style="padding:10px 20px;"><i class="fas fa-external-link-alt"></i> SPRINGER PUBLICATION</a>`;
  }

  backdrop.classList.add('open');
}

/* ==========================================================================
   8. SKILLS FILTERING SYSTEM
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-filter');
      skillCards.forEach((card) => {
        if (cat === 'all' || card.getAttribute('data-category') === cat) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   9. INTERACTIVE TERMINAL CONSOLE
   ========================================================================== */
function initInteractiveTerminal() {
  const screen = document.getElementById('terminal-screen');
  const input = document.getElementById('terminal-input-field');

  if (!screen || !input) return;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      input.value = '';

      // Print command line
      const userLine = document.createElement('div');
      userLine.className = 'terminal-line';
      userLine.innerHTML = `<span class="terminal-prompt-symbol">steve@uiuc:~$</span> ${cmd}`;
      screen.appendChild(userLine);

      // Handle Command Output
      let responseText = '';
      switch (cmd) {
        case 'help':
          responseText = `AVAILABLE COMMANDS:<br>
          - <strong>bio</strong>: Summary of Steve Aby Tonio<br>
          - <strong>projects</strong>: List flagship projects<br>
          - <strong>skills</strong>: Technical skills summary<br>
          - <strong>contact</strong>: Email and social links<br>
          - <strong>clear</strong>: Clear terminal screen`;
          break;
        case 'bio':
          responseText = `Steve Aby Tonio | MS CS @ UIUC (AI & ML)<br>Former Graduate Analyst (SDE II) @ Barclays Bank PLC (25+ Awards).`;
          break;
        case 'projects':
          responseText = `1. <strong>BugCatcher Joey</strong> (AI Pokémon Team Optimizer)<br>2. <strong>VectorQuest</strong> (Springer Research Paper - 50x speedup)<br>3. <strong>HyperSafety</strong> (ML Safety & Face Recognition App)`;
          break;
        case 'skills':
          responseText = `Languages: Python, JS/TS, SQL, C++, HTML/CSS<br>AI/ML: PyTorch, NLP, Vector DBs, OpenCV, CNNs<br>Enterprise: Salesforce Marketing Cloud (SFMC), AMPscript, SSJS, JIRA`;
          break;
        case 'contact':
          responseText = `Email: stonio2@illinois.edu | LinkedIn: linkedin.com/in/steveaby | Phone: +1 331-271-6861`;
          break;
        case 'clear':
          screen.innerHTML = '';
          return;
        case '':
          return;
        default:
          responseText = `Command not recognized: '${cmd}'. Type <strong>help</strong> for list of commands.`;
          break;
      }

      const resLine = document.createElement('div');
      resLine.className = 'terminal-line';
      resLine.style.color = '#94a3b8';
      resLine.innerHTML = responseText;
      screen.appendChild(resLine);

      screen.scrollTop = screen.scrollHeight;
    }
  });
}

/* ==========================================================================
   10. SCROLL SPY & METRIC COUNTERS
   ========================================================================== */
function initScrollSpyAndCounters() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 100;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });

  // Mobile drawer toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('.nav-link').forEach((l) => {
      l.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }
}
