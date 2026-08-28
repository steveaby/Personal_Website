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
  initProjectsFilter();
  initSkillsFilter();
  initResumeModal();
  initInteractiveTerminal();
  initScrollSpyAndCounters();
  initImageLightbox();
  initClickToCopy();
});

/* ==========================================================================
   1. PRELOADER BOOT SEQUENCE
   ========================================================================== */
function initPreloader() {
  const bootScreen = document.getElementById('boot-screen');
  const progressFill = document.querySelector('.progress-bar-fill');
  const logContainer = document.querySelector('.boot-logs');

  if (!bootScreen || !progressFill || !logContainer) return;

  // Check if navigating back from a project page
  const navEntry = window.performance && performance.getEntriesByType ? performance.getEntriesByType('navigation')[0] : null;
  const isReload = navEntry && navEntry.type === 'reload';
  const cameFromProjects = document.referrer && document.referrer.includes('/projects/');
  const fromProjectFlag = sessionStorage.getItem('from_project_subpage') === 'true';

  if (!isReload && (cameFromProjects || fromProjectFlag)) {
    sessionStorage.removeItem('from_project_subpage');
    bootScreen.style.display = 'none';
    bootScreen.classList.add('loaded');
    return;
  }

  // Clear any existing flag on fresh load
  sessionStorage.removeItem('from_project_subpage');

  const logs = [
    { text: 'CHECKING MEMORY REGISTERS...', status: 'OK' },
    { text: 'LOADING NEURAL NET MODULES...', status: 'OK' },
    { text: 'FETCHING UIUC CS MS METRICS...', status: 'OK' },
    { text: 'INITIALIZING MORGAN STANLEY & BARCLAYS LOGS...', status: 'OK' },
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
    'Summer Analyst @ Morgan Stanley | Parametric',
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

  const isSubPage = window.location.pathname.includes('/projects/');
  const getProjUrl = (file) => (isSubPage ? file : `projects/${file}`);
  const getRootAnchor = (hash) => (isSubPage ? `../index.html${hash}` : hash);

  const commands = [
    { title: 'View Resume (1-Page Condensed & Full CV)', action: () => openResumeModal() },
    { title: 'Download Resume (1-Page PDF)', action: () => downloadResume('1page') },
    { title: 'Download Resume (Full PDF)', action: () => downloadResume('full') },
    { title: 'Project Deep Dive: SidelineSight', action: () => (window.location.href = getProjUrl('sidelinesight.html')) },
    { title: 'Project Deep Dive: BugCatcher Joey', action: () => (window.location.href = getProjUrl('bugcatcherjoey.html')) },
    { title: 'Project Deep Dive: ReServe', action: () => (window.location.href = getProjUrl('reserve.html')) },
    { title: 'Project Deep Dive: IlliniRide', action: () => (window.location.href = getProjUrl('illiniride.html')) },
    { title: 'Project Deep Dive: HyperSafety', action: () => (window.location.href = getProjUrl('hypersafety.html')) },
    { title: 'Project Deep Dive: VectorQuest', action: () => (window.location.href = getProjUrl('vectorquest.html')) },
    { title: 'View All Certifications & Credentials (Salesforce, Oracle, Python)', action: () => (window.location.href = isSubPage ? '../certifications.html' : 'certifications.html') },
    { title: 'Team Archive: Ace Neutrino (2021 Collective)', action: () => (window.location.href = isSubPage ? '../aceneutrino.html' : 'aceneutrino.html') },
    { title: 'Jump to About Section', action: () => (isSubPage ? (window.location.href = '../index.html#about') : scrollToSection('#about')) },
    { title: 'Jump to Experience Timeline', action: () => (isSubPage ? (window.location.href = '../index.html#experience') : scrollToSection('#experience')) },
    { title: 'Jump to Featured Projects', action: () => (isSubPage ? (window.location.href = '../index.html#projects') : scrollToSection('#projects')) },
    { title: 'Jump to Capabilities & Skills', action: () => (isSubPage ? (window.location.href = '../index.html#skills') : scrollToSection('#skills')) },
    { title: 'Jump to Springer Publication', action: () => (isSubPage ? (window.location.href = '../index.html#research') : scrollToSection('#research')) },
    { title: 'Jump to Terminal & Comms', action: () => (isSubPage ? (window.location.href = '../index.html#contact') : scrollToSection('#contact')) },
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

function showToast(msg, tag = '[OK]') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'cyber-toast';
  toast.innerHTML = `
    <i class="fas fa-terminal cyber-toast-icon"></i>
    <span>${msg}</span>
    <span class="cyber-toast-tag">${tag}</span>
  `;
  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3200);
}

function copyToClipboard(text, msg = 'Copied to clipboard!') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(msg, '[COPIED]');
    }).catch(() => {
      showToast(`Copy manually: ${text}`, '[INFO]');
    });
  } else {
    showToast(`Copy manually: ${text}`, '[INFO]');
  }
}

/* ==========================================================================
   7. PROJECT DEEP DIVE MODALS & IN-DEPTH TECHNICAL CASE STUDIES
   ========================================================================== */
const projectData = {
  sidelinesight: {
    title: 'SidelineSight',
    badge: 'LIVE WEBSOCKETS & COGNITIVE-ADAPTIVE SPORTS ANALYTICS',
    tagline: 'Cognitive-Adaptive Live Sports Analytics & NBA/NHL WebSocket Simulation Platform',
    metrics: [
      { val: '< 15ms', lbl: 'WebSocket Broadcast Latency' },
      { val: '2 Major Leagues', lbl: 'NBA & NHL Real-Time Ingestion' },
      { val: '100% Vector', lbl: 'Dynamic SVG Court Projections' },
      { val: '4 Intent Modes', lbl: 'Cognitive-Adaptive UI Personas' }
    ],
    desc: 'SidelineSight redefines modern sports broadcasting and analytics by moving beyond static, cluttered scoreboards into an intelligent, intent-driven live intelligence platform. It features real-time simulated WebSocket game streams for NBA and NHL games, visual interactive court/rink SVG shot charts, dynamic momentum scorecards, and cognitive-adaptive HUD modes tailored for different viewer personas (Casual Fan, Bettor, Coach/Analyst, Gamer).',
    arch: 'The architecture pairs a high-concurrency Python FastAPI streaming server with Next.js 16 and React 19. The backend streams live play-by-play telemetry frames, shot coordinate vectors, and period momentum shifts over persistent WebSockets. The frontend dynamically renders interactive SVG shot maps on hardwood courts and ice rinks, calculates predictive win probabilities in real-time, and re-orders high-leverage highlight feeds based on game state (Clutch vs Blowout).',
    features: [
      '<strong>High-Frequency WebSocket Engine:</strong> Real-time bidirectional streaming of play-by-play telemetry, player tracking, and leverage index.',
      '<strong>Adaptive Intent Modes:</strong> Dynamically reconfigures the UI layout based on user intent (Study Mode, Player Tracker, Live Betting Insights, Minimal Floating Scoreboard).',
      '<strong>Interactive SVG Shot Maps:</strong> Vector-accurate rendering of shot attempts, goals, saves, and zone heatmaps across NBA courts and NHL rinks.',
      '<strong>Game-State Momentum Tracking:</strong> Computes real-time leverage and momentum swings to dynamically highlight critical game-deciding plays.',
      '<strong>Offline Roster Caching & Resilience:</strong> Cached team rosters and player headshots ensure zero latency spikes during network interruptions.'
    ],
    slides: [
      { src: 'assets/sidelinesight/04_game_dashboard_nba.png', caption: 'NBA Live Match Center: Interactive court shot map, quarter momentum tracker, box score, and active floor timeline.' },
      { src: 'assets/sidelinesight/05_game_dashboard_nhl.png', caption: 'NHL Live Game Engine: Rink coordinate tracking, goalie save metrics, powerplay indicators, and time-on-ice telemetry.' },
      { src: 'assets/sidelinesight/03_live_lobby.png', caption: 'Multi-Sport Live Lobby: Real-time game schedules, active match statuses, live win probability gauges, and score tracking.' },
      { src: 'assets/sidelinesight/01_perspective_config.png', caption: 'Perspective Calibration: Configuring viewer angles and customized camera vantage presets.' },
      { src: 'assets/sidelinesight/08_intent_mode_player_tracker.png', caption: 'Player Tracking Intent Mode: Deep-dive bio-metrics, shot selection breakdown, plus/minus metrics, and usage rate.' },
      { src: 'assets/sidelinesight/09_intent_mode_betting_insights.png', caption: 'Betting Intelligence Hub: Live moneyline swings, spread probabilities, player prop telemetry, and momentum trends.' },
      { src: 'assets/sidelinesight/06_floating_scoreboard.png', caption: 'Compact Floating HUD: Minimalist scoreboard widget designed for multi-screen monitoring and low-latency updates.' }
    ],
    tech: ['Next.js 16 (App Router)', 'React 19', 'FastAPI', 'WebSockets', 'Tailwind CSS v4', 'Framer Motion 12', 'ESPN API', 'Pandas & Coordinate Vector Mapping'],
    team: ['Steve Aby Tonio', 'Pranav Premchand'],
    github: 'https://github.com/steveaby/SidelineSight'
  },
  bugcatcher: {
    title: 'BugCatcher Joey',
    badge: 'AI POKÉMON STRATEGIST & MONTE CARLO META ENGINE',
    tagline: 'Mathematical Optimization & Competitive Team Synergy Engine Powered by Monte Carlo Tree Search',
    metrics: [
      { val: 'MCTS Search', lbl: 'Parallel Battle Tree Simulation' },
      { val: '1000+ Archetypes', lbl: 'Competitive Smogon Meta Coverage' },
      { val: 'Modal Serverless', lbl: 'Cloud Parallel Worker Pool' },
      { val: 'Sub-Second', lbl: 'Turn-To-KO Damage Calculations' }
    ],
    desc: 'BugCatcher Joey is an intelligent AI Pokémon Strategist that mathematically analyzes competitive battle dynamics against the global competitive meta. Rather than relying on static tier lists, Joey performs parallelized Monte Carlo simulations and calculates offensive/defensive type coverage, speed tier benchmarks, and hazard resilience to recommend optimal team builds and battle sequences.',
    arch: 'The system pairs a high-performance Python FastAPI calculation engine with distributed worker nodes running on Modal Cloud. Joey interfaces with Pokémon Showdown battle rulesets and Smogon stat datasets, evaluating thousands of branch states using Monte Carlo Tree Search (MCTS) to optimize team compositions against prevailing meta threats.',
    features: [
      '<strong>Monte Carlo Tree Search (MCTS):</strong> Evaluates high-dimensional branching battle scenarios to recommend statistically dominant move sequences and lead match-ups.',
      '<strong>Distributed Cloud Parallelism:</strong> Offloads heavy multi-threaded simulations to Modal Serverless GPU/CPU workers for sub-second responses.',
      '<strong>Dynamic Meta Countering:</strong> Analyzes user-selected rosters against top-ranking meta threats to identify single-point defensive weaknesses and offensive blindspots.',
      '<strong>Interactive Team Builder:</strong> Fluid UI allowing trainers to inspect EV spreads, move synergy, item choices, and simulated matchup win rates in real time.'
    ],
    slides: [
      { src: 'assets/bugcatcher/Bug_Home.jpg', caption: 'AI Strategist Hub: Meta selection, team archetype analyzer, and instant synergy score calculator.' },
      { src: 'assets/bugcatcher/Bug_Sim.jpg', caption: 'Monte Carlo Battle Simulator: Branching game-state probability tree with predicted win outcomes across turns.' },
      { src: 'assets/bugcatcher/Bug_Opti.jpg', caption: 'Roster Synergy Optimizer: Automated team composition recommendations to patch defensive and speed tier gaps.' },
      { src: 'assets/bugcatcher/Bug_Poke.jpg', caption: 'Pokémon Individual Deep Dive: Detailed stat radars, recommended move pools, ability synergies, and EV spreads.' },
      { src: 'assets/bugcatcher/Bug_Item.jpg', caption: 'Item & Hazard Calculator: Smogon damage calculation matrix and turn-to-KO estimations.' }
    ],
    tech: ['React 19', 'Vite', 'Python FastAPI', 'Node.js (@smogon/calc)', 'Modal Cloud', 'Monte Carlo Search', 'OpenRouter LLM'],
    team: ['Steve Aby Tonio', 'Chinmay Dandekar', 'Pranav Premchand'],
    github: 'https://github.com/ChinDandekar/bugcatcherjoey'
  },
  reserve: {
    title: 'ReServe',
    badge: 'CAMPUS FOOD SUSTAINABILITY & REAL-TIME MARKETPLACE',
    tagline: 'Eliminating Campus Dining Hall Surplus Waste via Real-Time Telemetry and Automated Lifecycle Management',
    metrics: [
      { val: '100% Diverted', lbl: 'Surplus Waste Recovery Goal' },
      { val: 'Auto-Cron TTL', lbl: 'Zero Stale Expired Listings' },
      { val: 'Granular RBAC', lbl: 'Staff Sellers vs Student Buyers' },
      { val: 'OAuth 2.0 & JWT', lbl: 'Encrypted Session Security' }
    ],
    desc: 'ReServe is a full-stack campus surplus food marketplace engineered to bridge the gap between dining halls with surplus prepared food and students seeking affordable, nutritious meals. Built as a unified platform with role-based access control (RBAC), ReServe enables dining hall staff to broadcast available meal batches with strict pickup windows while allowing students to claim reservations in seconds.',
    arch: 'The frontend is built with React 19 and Vite 7 for blazing fast client rendering and responsive filtering. The backend runs on Node.js (ESM) and Express 5, connecting to MongoDB Atlas via Mongoose 8. A background scheduler runs daily cleanup jobs to automatically expire unclaimed listings once their designated pickup window closes.',
    features: [
      '<strong>Automated Lifecycle Expiration:</strong> Scheduled cron background jobs periodically scan and transition active meal listings to expired states post-pickup cutoff.',
      '<strong>Granular RBAC Security:</strong> Strict server and client route safeguards distinguishing Student Buyers (search, reserve, order history) from Dining Hall Sellers (post meals, manage inventory, impact analytics).',
      '<strong>Real-Time Sustainability Dashboard:</strong> Computes aggregate metrics including meals rescued and estimated carbon emissions prevented.',
      '<strong>Instant Dietary Filtering:</strong> Client-side optimized search supporting multi-tag intersections (Vegan, Halal, Gluten-Free, High-Protein) across campus dining halls.'
    ],
    slides: [
      { src: 'assets/reserve/01_home_impact_dashboard.png', caption: 'Campus Sustainability Hub: Live counters for meals saved, carbon averted, and quick marketplace access.' },
      { src: 'assets/reserve/02_food_marketplace.png', caption: 'Live Meal Marketplace: Active surplus postings with countdown timers, available portions, and dining hall tags.' },
      { src: 'assets/reserve/03_reserve_food_modal.png', caption: 'Instant Meal Reservation Modal: Quick portion selection, pickup window summary, and one-tap reservation confirmation.' },
      { src: 'assets/reserve/08_seller_inventory_management.png', caption: 'Dining Hall Manager Dashboard: Inventory stock management, active order fulfillment, and posting controls.' },
      { src: 'assets/reserve/04_post_donation_form.png', caption: 'Surplus Donation Publishing: Input form with dietary allergen tags, pickup window pickers, and quantity tracking.' },
      { src: 'assets/reserve/05_student_order_history.png', caption: 'Student Order History: Chronological receipt log of completed and upcoming meal claims.' },
      { src: 'assets/reserve/10_marketplace_filtered_search.png', caption: 'Smart Multi-Filter Search: Instant sorting by dining hall hall (Ikenberry, ISR, FAR) and dietary preferences.' }
    ],
    tech: ['React 19', 'Vite 7', 'Node.js (ESM)', 'Express 5', 'MongoDB Atlas', 'Mongoose 8', 'JWT & Google OAuth', 'Modular CSS'],
    team: ['Steve Aby Tonio', 'Aditya KP', 'Chirag Chandani'],
    github: 'https://github.com/steveaby/ReServe'
  },
  illiniride: {
    title: 'IlliniRide',
    badge: 'HIGH-PERFORMANCE RELATIONAL DATABASE & CAMPUS CARPOOLING',
    tagline: 'Safe, ACID-Compliant Campus Ridesharing Engine Powered by Raw MySQL Stored Procedures & Triggers',
    metrics: [
      { val: '0ms Overhead', lbl: 'Raw SQL Execution (Zero ORM)' },
      { val: 'Serializable', lbl: 'ACID Transaction Seat Booking' },
      { val: 'Dynamic Geo-Pricing', lbl: 'Stored Procedure Distance Formula' },
      { val: 'Auto-Trigger', lbl: 'Aggregate Driver Star Ratings' }
    ],
    desc: 'IlliniRide is a campus carpooling and long-distance ridesharing platform built specifically for the University of Illinois Urbana-Champaign community. Connecting student drivers traveling to Chicago, O\'Hare (ORD), and surrounding hubs with passengers heading the same way, IlliniRide eliminates expensive solo travel through safe, transparent, and mathematically calculated cost sharing.',
    arch: 'The architecture avoids bulky ORM layers, executing pure raw SQL directly via Node.js against a normalized MySQL 8.0 relational database. All core business logic—including geospatial distance-based pricing formulas, serializable seat booking transactions, and automated user rating recomputations—is encapsulated within compiled database stored procedures and triggers.',
    features: [
      '<strong>Stored Procedure Distance Pricing (sp_post_ride_with_suggested_price):</strong> Computes coordinate distance between origin and destination cities to recommend fair baseline ride pricing.',
      '<strong>Serializable ACID Transaction (sp_book_ride_transaction):</strong> Enforces strict database transaction isolation, verifying vehicle seat capacity and preventing duplicate reservations or race condition overbooking.',
      '<strong>Automated Rating Recomputation Trigger (trg_reviews_after_insert_update_user_rating):</strong> Fires automatically upon new review insertion to recalculate aggregate user ratings in the database.',
      '<strong>Relational Integrity:</strong> 6 normalized tables (Users, Vehicles, Cities, Rides, Bookings, Reviews) with foreign key cascading and consistency constraints.'
    ],
    slides: [
      { src: 'assets/illiniride/search_rides.png', caption: 'Ride Search Hub: Filter by origin, destination city, departure date, and live remaining seat count.' },
      { src: 'assets/illiniride/booking_confirmation.png', caption: 'Transaction Booking Modal: Safe seat selection with vehicle specs, driver reputation, and cost calculation.' },
      { src: 'assets/illiniride/offer_ride.png', caption: 'Publish Ride Interface: Distance-based dynamic suggested pricing powered by MySQL stored procedures.' },
      { src: 'assets/illiniride/published_rides.png', caption: 'Driver Ride Management: View offered routes, departure timetables, seat occupancies, and status.' },
      { src: 'assets/illiniride/my_trips.png', caption: 'Rider Itinerary & Bookings: Complete trip management with transaction safety, seat modifications, and cancellations.' },
      { src: 'assets/illiniride/review_driver.png', caption: 'Driver Review Flow: Star rating and feedback submission with automatic trigger score recalculation.' }
    ],
    tech: ['MySQL 8.0', 'Node.js', 'Raw SQL Engine', 'Stored Procedures & Triggers', 'ACID Transactions', 'Vanilla JS', 'HTML5/CSS3'],
    team: ['Steve Aby Tonio (Captain)', 'Harshita Ketharaman', 'Keshav Rampratap Soni'],
    github: 'https://github.com/steveaby/IlliniRide'
  },
  hypersafety: {
    title: 'HyperSafety',
    badge: 'TRI-SERVICE SAFETY COMPLIANCE & COMPUTER VISION ML',
    tagline: 'Enterprise Workplace Safety Telemetry with Real-Time PyTorch Lightning CNN & Dlib Facial Recognition',
    metrics: [
      { val: '98.95%', lbl: 'PyTorch CNN Mask Accuracy' },
      { val: '128D Vectors', lbl: 'Dlib Facial Recognition Embeddings' },
      { val: '3 Services', lbl: 'Flutter UI + Node.js API + ML Worker' },
      { val: 'Zero Touch', lbl: 'Automated Violation Warning Logs' }
    ],
    desc: 'HyperSafety is an enterprise workplace safety and mask compliance monitoring ecosystem. Surveillance cameras continuously analyze video feeds, isolate human faces using deep learning SSD detectors, evaluate mask compliance via a custom 4-layer PyTorch Lightning CNN (98.95% accuracy), and cross-reference facial landmarks against employee records using 128-dimensional Euclidean embeddings to log violation warnings automatically in MySQL and push live alerts to supervisors via Flutter.',
    arch: 'Decoupled tri-service architecture: 1) Python ML Service (PyTorch Lightning, OpenCV DNN SSD ResNet-10, Dlib 128D embeddings, sk-video), 2) Node.js/Express REST API on port 7090 with MySQL database schemas and automated Imgur token refreshing, 3) Cross-platform Flutter mobile supervision client.',
    features: [
      '<strong>4-Layer PyTorch Lightning CNN:</strong> Custom convolutional architecture trained with Adam optimization and Cross-Entropy loss to achieve 98.95% mask detection accuracy.',
      '<strong>128D Dlib Facial Recognition:</strong> Computes deep metric facial embeddings to match unmasked personnel against employee records in real time.',
      '<strong>Two-Stage Edge Pipeline:</strong> Decouples SSD ResNet-10 face localization from mask classification and identity recognition for maximum video FPS throughput.',
      '<strong>Cloud Image Lifecycle & Auto-Refresh:</strong> Integrates Imgur REST APIs with automated background OAuth token rotation for employee avatar hosting.'
    ],
    slides: [
      { src: 'assets/hypersafety/HyperSafety_Diagram.png', caption: 'System Architecture Diagram: Live video ingestion, OpenCV SSD face localization, PyTorch Lightning CNN mask classification, Dlib employee identification, Node.js REST API, and Flutter admin dashboard.' },
      { src: 'assets/hypersafety/hypersafety.gif', caption: 'Live Video Stream Mask Detection: Real-time bounding box tracking, facial classification, and confidence scoring.' }
    ],
    tech: ['PyTorch Lightning', 'Python 3.9', 'OpenCV (cv2)', 'Dlib', 'Flutter (Dart)', 'Node.js', 'Express', 'MySQL', 'Imgur API', 'sk-video'],
    team: ['Ace Neutrino (Steve Aby Tonio, Ritvik Sharma, Vivek Nichani, Akul Jain, Harsh Ambasta)'],
    github: 'https://github.com/ritviksharma4/HyperSafety_Frontend.git',
    githubBackend: 'https://github.com/ViVek6301/HyperSafety_Backend.git',
    githubML: 'https://github.com/ritviksharma4/HyperSafety_Service.git'
  },
  vectorquest: {
    title: 'VectorQuest',
    badge: 'PUBLISHED RESEARCH - SPRINGER NATURE',
    tagline: 'Accelerating Open-Domain Question Answering with Novel Vector Knowledge Representation',
    metrics: [
      { val: '50x Faster', lbl: 'Answer Prediction Throughput' },
      { val: 'Springer Nature', lbl: 'Peer-Reviewed AI Publication' },
      { val: 'SQuAD Benchmark', lbl: 'Validated on Standard Benchmarks' },
      { val: 'O(1) / O(log N)', lbl: 'Approximate Vector Search' }
    ],
    desc: 'VectorQuest is an open-domain Question Answering (QA) optimization methodology published in Springer Nature. While traditional reading comprehension systems require users to provide lengthy context documents alongside queries, VectorQuest enables unrestricted open-domain question answering by replacing heavy linear dataframe scans with dense vector knowledge storage and high-dimensional semantic search.',
    arch: 'VectorQuest decouples the retrieval and reasoning phases of QA pipelines. Document collections and entity knowledge graphs are converted into dense embeddings stored in high-performance vector databases. When a query is received, approximate nearest neighbor (ANN) vector indexing retrieves the top semantic candidate spans in milliseconds, feeding only the most relevant passages into transformer inference heads.',
    features: [
      '<strong>50x Faster Prediction Throughput:</strong> Dramatically outperforms standard baseline models on SQuAD benchmarks while preserving high answer precision and F1 scores.',
      '<strong>Decoupled Dense Vector Knowledge Store:</strong> Eliminates the bottleneck of passing massive context blocks through deep transformer layers during initial retrieval.',
      '<strong>Open-Domain Generalization:</strong> Handles complex, multi-sentence factual questions across diverse domains without requiring manually specified context windows.',
      '<strong>Springer Nature Publication:</strong> Peer-reviewed and published in the Springer Nature Book Series: Lecture Notes in Networks and Systems.'
    ],
    slides: [
      { src: 'assets/vectorquest/VectorQuest.jpg', caption: 'VectorQuest Architectural Overview: Vector knowledge base construction, semantic query embedding, and sub-millisecond retrieval pipeline.' }
    ],
    tech: ['Python', 'Vector DBs', 'PyTorch', 'Hugging Face Transformers', 'Semantic Search', 'NLP Knowledge Graphs'],
    paperLink: 'https://link.springer.com/chapter/10.1007/978-3-031-88237-1_4'
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

  // Handle URL hash deep-linking (e.g. #project-sidelinesight)
  if (window.location.hash && window.location.hash.startsWith('#project-')) {
    const projKey = window.location.hash.replace('#project-', '');
    if (projectData[projKey]) {
      setTimeout(() => openProjectModal(projectData[projKey]), 400);
    }
  }
}

function openProjectModal(data) {
  const backdrop = document.getElementById('project-modal-backdrop');
  const titleEl = document.getElementById('modal-project-title');
  const badgeEl = document.getElementById('modal-project-badge');
  const taglineEl = document.getElementById('modal-project-tagline');
  const metricsEl = document.getElementById('modal-metrics-strip');
  const descEl = document.getElementById('modal-project-desc');
  const archWrapper = document.getElementById('modal-arch-wrapper');
  const archEl = document.getElementById('modal-project-arch');
  const featuresWrapper = document.getElementById('modal-features-wrapper');
  const featuresEl = document.getElementById('modal-feature-list');
  const trackEl = document.getElementById('modal-carousel-track');
  const dotsEl = document.getElementById('modal-carousel-dots');
  const captionEl = document.getElementById('modal-slide-caption');
  const techEl = document.getElementById('modal-tech-list');
  const teamWrapper = document.getElementById('modal-team-wrapper');
  const teamEl = document.getElementById('modal-team-list');
  const linksEl = document.getElementById('modal-links');

  titleEl.textContent = data.title;
  badgeEl.textContent = data.badge;
  if (taglineEl) taglineEl.textContent = data.tagline || '';
  descEl.textContent = data.desc;

  // Render Metrics Strip
  if (metricsEl) {
    if (data.metrics && data.metrics.length > 0) {
      metricsEl.style.display = 'grid';
      metricsEl.innerHTML = data.metrics.map((m) => `
        <div class="modal-metric-card">
          <div class="modal-metric-val">${m.val}</div>
          <div class="modal-metric-lbl">${m.lbl}</div>
        </div>
      `).join('');
    } else {
      metricsEl.style.display = 'none';
    }
  }

  // Render Architecture Section
  if (archWrapper && archEl) {
    if (data.arch) {
      archWrapper.style.display = 'block';
      archEl.textContent = data.arch;
    } else {
      archWrapper.style.display = 'none';
    }
  }

  // Render Core Engineering Highlights
  if (featuresWrapper && featuresEl) {
    if (data.features && data.features.length > 0) {
      featuresWrapper.style.display = 'block';
      featuresEl.innerHTML = data.features.map((f) => `<li class="modal-feature-item">${f}</li>`).join('');
    } else {
      featuresWrapper.style.display = 'none';
    }
  }

  // Normalize Slides
  const slides = (data.slides || []).map((s) => typeof s === 'string' ? { src: s, caption: '' } : s);

  // Build Carousel
  trackEl.innerHTML = '';
  dotsEl.innerHTML = '';
  slides.forEach((slide, idx) => {
    const img = document.createElement('img');
    img.className = 'modal-carousel-slide';
    img.src = slide.src;
    img.alt = `${data.title} screenshot ${idx + 1}`;
    trackEl.appendChild(img);

    const dot = document.createElement('span');
    dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => setSlide(idx));
    dotsEl.appendChild(dot);
  });

  let currentSlide = 0;
  function updateCaption(idx) {
    if (captionEl) {
      const slide = slides[idx];
      const countStr = `[ ${(idx + 1).toString().padStart(2, '0')} / ${slides.length.toString().padStart(2, '0')} ]`;
      if (slide && slide.caption) {
        captionEl.innerHTML = `<strong>${countStr}</strong> ${slide.caption}`;
        captionEl.style.display = 'block';
      } else {
        captionEl.style.display = 'none';
      }
    }
  }

  function setSlide(idx) {
    currentSlide = idx;
    trackEl.style.transform = `translateX(-${idx * 100}%)`;
    document.querySelectorAll('#modal-carousel-dots .carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
    updateCaption(idx);
  }

  document.getElementById('carousel-prev').onclick = () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    setSlide(currentSlide);
  };
  document.getElementById('carousel-next').onclick = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    setSlide(currentSlide);
  };

  setSlide(0);

  // Build Tech Stack
  techEl.innerHTML = data.tech.map((t) => `<span class="project-tag">${t}</span>`).join('');

  // Build Team
  if (teamWrapper && teamEl) {
    if (data.team && data.team.length > 0) {
      teamWrapper.style.display = 'block';
      teamEl.textContent = data.team.join('  •  ');
    } else {
      teamWrapper.style.display = 'none';
    }
  }

  // Build Links
  linksEl.innerHTML = '';
  if (data.github) {
    linksEl.innerHTML += `<a href="${data.github}" target="_blank" class="cyber-btn" style="padding:10px 20px;"><i class="fab fa-github"></i> ACCESS SOURCE CODE</a>`;
  }
  if (data.paperLink) {
    linksEl.innerHTML += `<a href="${data.paperLink}" target="_blank" class="cyber-btn" style="padding:10px 20px;"><i class="fas fa-external-link-alt"></i> SPRINGER NATURE PUBLICATION</a>`;
  }

  backdrop.classList.add('open');
}

function openProjectById(id) {
  if (projectData[id]) {
    openProjectModal(projectData[id]);
  }
}

function openProjectById(id) {
  if (projectData[id]) {
    openProjectModal(projectData[id]);
  }
}

/* ==========================================================================
   8. PROJECT CATEGORY FILTERING SYSTEM
   ========================================================================== */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-project-filter');
      projectCards.forEach((card) => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   9. SKILLS FILTERING SYSTEM
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skills-filter-group:not(.projects-filter-group) .filter-btn');
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
   9. INTERACTIVE TERMINAL CONSOLE (WITH HISTORY & AUTOCOMPLETE)
   ========================================================================== */
function initInteractiveTerminal() {
  const screen = document.getElementById('terminal-screen');
  const input = document.getElementById('terminal-input-field');

  if (!screen || !input) return;

  const history = [];
  let historyIdx = -1;

  const validCommands = [
    'help',
    'resume',
    'bio',
    'projects',
    'project sidelinesight',
    'project bugcatcherjoey',
    'project reserve',
    'project illiniride',
    'project hypersafety',
    'project vectorquest',
    'certs',
    'certifications',
    'team',
    'aceneutrino',
    'skills',
    'contact',
    'clear'
  ];

  input.addEventListener('keydown', (e) => {
    // 1. Tab Autocompletion
    if (e.key === 'Tab') {
      e.preventDefault();
      const currentVal = input.value.trim().toLowerCase();
      if (!currentVal) return;

      const match = validCommands.find((c) => c.startsWith(currentVal));
      if (match) {
        input.value = match;
      }
      return;
    }

    // 2. Command History (Up / Down Arrows)
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        if (historyIdx === -1) {
          historyIdx = history.length - 1;
        } else if (historyIdx > 0) {
          historyIdx--;
        }
        input.value = history[historyIdx] || '';
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx !== -1) {
        if (historyIdx < history.length - 1) {
          historyIdx++;
          input.value = history[historyIdx];
        } else {
          historyIdx = -1;
          input.value = '';
        }
      }
      return;
    }

    // 3. Execution on Enter
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      input.value = '';

      if (cmd) {
        history.push(cmd);
        historyIdx = -1;
      }

      // Print command line
      const userLine = document.createElement('div');
      userLine.className = 'terminal-line';
      userLine.innerHTML = `<span class="terminal-prompt-symbol">steve@uiuc:~$</span> ${cmd}`;
      screen.appendChild(userLine);

      // Handle Command Output
      let responseText = '';

      if (cmd.startsWith('project ') || cmd.startsWith('open ')) {
        const rawTarget = cmd.replace(/^(project|open)\s+/, '').trim().toLowerCase();
        const aliasMap = {
          sidelinesight: 'sidelinesight',
          sideline: 'sidelinesight',
          bugcatcher: 'bugcatcher',
          bugcatcherjoey: 'bugcatcher',
          joey: 'bugcatcher',
          pokemon: 'bugcatcher',
          reserve: 'reserve',
          illiniride: 'illiniride',
          illini: 'illiniride',
          ride: 'illiniride',
          hypersafety: 'hypersafety',
          safety: 'hypersafety',
          vectorquest: 'vectorquest',
          vector: 'vectorquest',
          paper: 'vectorquest'
        };
        const projKey = aliasMap[rawTarget];
        const pageMap = {
          sidelinesight: 'sidelinesight.html',
          bugcatcher: 'bugcatcherjoey.html',
          reserve: 'reserve.html',
          illiniride: 'illiniride.html',
          hypersafety: 'hypersafety.html',
          vectorquest: 'vectorquest.html'
        };
        if (projKey && pageMap[projKey]) {
          const isSub = window.location.pathname.includes('/projects/');
          const targetUrl = isSub ? pageMap[projKey] : `projects/${pageMap[projKey]}`;
          responseText = `<span style="color:var(--cyan);font-weight:600;">[OK]</span> Navigating to <strong>${projKey.toUpperCase()}</strong> technical case study...`;
          setTimeout(() => {
            window.location.href = targetUrl;
          }, 400);
        } else {
          responseText = `<span style="color:#f87171;">[ERR]</span> Module '${rawTarget}' not found. Available modules: <em>sidelinesight</em>, <em>bugcatcher</em>, <em>reserve</em>, <em>illiniride</em>, <em>hypersafety</em>, <em>vectorquest</em>.`;
        }
      } else {
        switch (cmd) {
          case 'help':
            responseText = `AVAILABLE COMMANDS:<br>
            - <strong>resume</strong>: View & download 1-Page or Full Resume<br>
            - <strong>bio</strong>: Summary of Steve Aby Tonio<br>
            - <strong>projects</strong>: List all flagship projects<br>
            - <strong>project &lt;name&gt;</strong>: Open project deep-dive (e.g. <em>project sidelinesight</em>)<br>
            - <strong>skills</strong>: Technical skills summary<br>
            - <strong>contact</strong>: Email and social links<br>
            - <strong>clear</strong>: Clear terminal screen<br>
            <span style="color:var(--cyan);">[PRO TIP]</span> Press <strong>Tab</strong> to autocomplete and <strong>&uarr;/&darr;</strong> for command history.`;
            break;
          case 'resume':
            openResumeModal();
            responseText = `<span style="color:var(--cyan);font-weight:600;">[OK]</span> Opened Resume Telemetry HUD. Toggle between 1-Page and Full versions.`;
            break;
          case 'bio':
            responseText = `Steve Aby Tonio | MS CS @ UIUC (AI & ML)<br>Summer Analyst @ Morgan Stanley | Parametric (Platform Implementation)<br>Former Graduate Analyst (SDE II) @ Barclays Bank PLC (25+ Awards).`;
            break;
          case 'projects':
            responseText = `1. <strong>SidelineSight</strong> (Live WebSockets & Adaptive Sports Analytics)<br>2. <strong>BugCatcher Joey</strong> (AI Pokémon Team Optimizer)<br>3. <strong>ReServe</strong> (Campus Food Surplus Marketplace)<br>4. <strong>IlliniRide</strong> (ACID Transaction Rideshare System)<br>5. <strong>HyperSafety</strong> (ML Safety & Face Recognition App)<br>6. <strong>VectorQuest</strong> (Springer Research Paper - 50x speedup)<br><br><span style="color:var(--cyan);">TIP:</span> Type <strong>project &lt;name&gt;</strong> (e.g. <em>project sidelinesight</em>) to open deep-dive telemetry.`;
            break;
          case 'certs':
          case 'certifications':
            responseText = `<span style="color:var(--cyan);font-weight:600;">[OK]</span> Navigating to Official Certifications & Credentials Matrix...`;
            setTimeout(() => {
              window.location.href = window.location.pathname.includes('/projects/') ? '../certifications.html' : 'certifications.html';
            }, 400);
            break;
          case 'team':
          case 'aceneutrino':
          case 'ace':
            responseText = `<span style="color:var(--cyan);font-weight:600;">[OK]</span> Navigating to Team Ace Neutrino (2021 Collective Archive)...`;
            setTimeout(() => {
              window.location.href = window.location.pathname.includes('/projects/') ? '../aceneutrino.html' : 'aceneutrino.html';
            }, 400);
            break;
          case 'skills':
            responseText = `Languages: Python, JS/TS, SQL, C++, HTML/CSS<br>AI/ML: PyTorch, NLP, Vector DBs, OpenCV, CNNs<br>Enterprise: Salesforce Marketing Cloud (SFMC), AMPscript, SSJS, JIRA<br><span style="color:var(--cyan);">TIP:</span> Type <strong>certs</strong> to view official Salesforce, Oracle & Python credentials.`;
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

  if (navbar) {
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
  }

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

/* ==========================================================================
   11. RESUME VIEWER & DOWNLOAD MODAL
   ========================================================================== */
function initResumeModal() {
  const backdrop = document.getElementById('resume-modal-backdrop');
  const closeBtn = document.getElementById('resume-modal-close-btn');
  const openBtns = document.querySelectorAll('.btn-open-resume');

  openBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });

  if (closeBtn && backdrop) {
    closeBtn.addEventListener('click', () => {
      backdrop.classList.remove('active');
      backdrop.classList.remove('open');
    });

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('active');
        backdrop.classList.remove('open');
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop && (backdrop.classList.contains('active') || backdrop.classList.contains('open'))) {
      backdrop.classList.remove('active');
      backdrop.classList.remove('open');
    }
  });
}

function openResumeModal() {
  const backdrop = document.getElementById('resume-modal-backdrop');
  if (backdrop) {
    backdrop.classList.add('active');
    backdrop.classList.add('open');
  }
}

function switchResume(type) {
  const iframe = document.getElementById('resume-iframe');
  const btnCondensed = document.getElementById('btn-resume-condensed');
  const btnFull = document.getElementById('btn-resume-full');

  if (type === 'condensed') {
    if (iframe) iframe.src = 'assets/resume/Steve_Resume.pdf';
    if (btnCondensed) btnCondensed.classList.add('active');
    if (btnFull) btnFull.classList.remove('active');
  } else {
    if (iframe) iframe.src = 'assets/resume/Steve_Resume_Full.pdf';
    if (btnFull) btnFull.classList.add('active');
    if (btnCondensed) btnCondensed.classList.remove('active');
  }
}

function downloadResume(type) {
  const link = document.createElement('a');
  if (type === '1page') {
    link.href = 'assets/resume/Steve_Resume.pdf';
    link.download = 'Steve_Aby_Tonio_Resume.pdf';
  } else {
    link.href = 'assets/resume/Steve_Resume_Full.pdf';
    link.download = 'Steve_Aby_Tonio_Resume_Full.pdf';
  }
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ==========================================================================
   12. IMAGE LIGHTBOX / FULLSCREEN VIEWER FOR PROJECT CASE STUDIES
   ========================================================================== */
function initImageLightbox() {
  const galleryCards = document.querySelectorAll('.gallery-card');
  if (!galleryCards.length) return;

  let backdrop = document.getElementById('lightbox-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'lightbox-backdrop';
    backdrop.innerHTML = `
      <button class="lightbox-close-btn" aria-label="Close Lightbox"><i class="fas fa-times"></i></button>
      <button class="lightbox-nav-btn prev" aria-label="Previous Image"><i class="fas fa-chevron-left"></i></button>
      <button class="lightbox-nav-btn next" aria-label="Next Image"><i class="fas fa-chevron-right"></i></button>
      <div class="lightbox-content">
        <img class="lightbox-img" src="" alt="Expanded View">
        <div class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(backdrop);
  }

  const lightboxImg = backdrop.querySelector('.lightbox-img');
  const lightboxCaption = backdrop.querySelector('.lightbox-caption');
  const closeBtn = backdrop.querySelector('.lightbox-close-btn');
  const prevBtn = backdrop.querySelector('.lightbox-nav-btn.prev');
  const nextBtn = backdrop.querySelector('.lightbox-nav-btn.next');

  const galleryItems = Array.from(galleryCards).map((card) => {
    const img = card.querySelector('.gallery-card-img');
    const caption = card.querySelector('.gallery-card-caption');
    return {
      src: img ? img.src : '',
      caption: caption ? caption.innerHTML : ''
    };
  }).filter((item) => Boolean(item.src));

  let currentIndex = 0;

  function showLightbox(index) {
    currentIndex = index;
    const item = galleryItems[currentIndex];
    if (!item) return;

    lightboxImg.src = item.src;
    lightboxCaption.innerHTML = item.caption;
    backdrop.classList.add('open');
  }

  function closeLightbox() {
    backdrop.classList.remove('open');
  }

  galleryCards.forEach((card, idx) => {
    const trigger = card.querySelector('.gallery-card-img-wrap') || card;
    trigger.addEventListener('click', () => {
      showLightbox(idx);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeLightbox();
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      showLightbox(currentIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % galleryItems.length;
      showLightbox(currentIndex);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!backdrop.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
  });
}

/* ==========================================================================
   13. CLICK-TO-COPY TELEMETRY TOASTS
   ========================================================================== */
function initClickToCopy() {
  const emailTargets = document.querySelectorAll('a[href^="mailto:"], .contact-email, .click-to-copy');
  emailTargets.forEach((el) => {
    el.addEventListener('click', (e) => {
      const email = el.textContent.trim().replace(/^mailto:/, '');
      if (email.includes('@')) {
        copyToClipboard(email, `// COPIED: ${email}`);
      }
    });
  });
}

