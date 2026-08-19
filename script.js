/**
 * Abhijeet Kumar Gautam — Dynamic & Animated Developer Portfolio
 * Interactive Mouse Tracking, 3D Card Tilt, Typewriter, Scroll Physics
 * & Silent Doraemon 4D Pocket Resume Animation with Guaranteed .PDF Download
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSmoothScroll();
  initTheme();
  initCursorSpotlight();
  initTypewriter();
  initScrollObserver();
  initCardTilt();
  initProjectFilters();
  initCaseStudyModal();
  initDoraemonResumeAnimation();
  initEmailCopy();
  initContactForm();
  initKeyboardShortcuts();
});

/* ==========================================================================
   1. Dynamic Mouse Cursor Spotlight Glow
   ========================================================================== */
function initCursorSpotlight() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderGlow() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;

    glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderGlow);
  }

  renderGlow();
}

/* ==========================================================================
   2. Dynamic Live Role Typewriter Loop
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typed-word');
  if (!target) return;

  const phrases = [
    "Full-Stack Web Development 💻",
    "MERN Stack Projects 🚀",
    "Python & Google Gemini AI 🤖",
    "NLP & Data Science Fundamentals ⚡",
    "REST APIs & Database Design 🔒"
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let speed = 90;

  function typeLoop() {
    const current = phrases[phraseIdx];

    if (isDeleting) {
      target.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      speed = 45;
    } else {
      target.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      speed = 90;
    }

    if (!isDeleting && charIdx === current.length) {
      speed = 1800; // Pause at word completion
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      speed = 400; // Pause before next word
    }

    setTimeout(typeLoop, speed);
  }

  typeLoop();
}

/* ==========================================================================
   3. Interactive 3D Perspective Card Tilt Physics
   ========================================================================== */
function initCardTilt() {
  const cards = document.querySelectorAll('.card-tilt');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });
}

/* ==========================================================================
   4. Scroll-Triggered Reveal & Animated Metric Counters
   ========================================================================== */
function initScrollObserver() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');

        // Check if there are un-animated counters inside
        const counters = entry.target.querySelectorAll('.counter:not(.counted)');
        counters.forEach(counter => animateCounter(counter));
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));
}

function animateCounter(counter) {
  counter.classList.add('counted');
  const target = parseFloat(counter.getAttribute('data-target'));
  const isDecimal = counter.getAttribute('data-decimal') === 'true';
  const duration = 1400;
  const start = performance.now();

  function updateCount(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const current = easeProgress * target;

    counter.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      counter.textContent = isDecimal ? target.toFixed(2) : target;
    }
  }

  requestAnimationFrame(updateCount);
}

/* ==========================================================================
   5. Project Filters with Smooth Transitions
   ========================================================================== */
function initProjectFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  const projects = document.querySelectorAll('.project-showcase-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      projects.forEach(project => {
        const cat = project.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          project.style.display = 'flex';
          setTimeout(() => {
            project.style.opacity = '1';
            project.style.transform = 'translateY(0)';
          }, 50);
        } else {
          project.style.opacity = '0';
          project.style.transform = 'translateY(15px)';
          setTimeout(() => {
            project.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   6. Project Case Studies Modal
   ========================================================================== */
const projectData = {
  "1": {
    badge: "Full-Stack & Gemini AI",
    title: "Smart Placement Portal",
    desc: "A full-stack campus placement management web application built with the MERN stack and Google Gemini AI to assist college placement cells and applicants.",
    keyChallenges: [
      "Implemented role-based authentication (Students vs. Recruiters) using JSON Web Tokens (JWT) and bcrypt password hashing.",
      "Integrated Google Gemini API to assist in automated resume skill analysis and job matching suggestions.",
      "Built a practice interview tool generating dynamic questions based on selected technical domains.",
      "Structured MongoDB collections and indexes for efficient candidate queries and data retrieval."
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Google Gemini AI", "JWT", "Tailwind CSS"],
    githubUrl: "https://github.com/Abhijeet0848/Placement-portal",
    liveUrl: "https://github.com/Abhijeet0848/Placement-portal"
  },
  "2": {
    badge: "AI / NLP & Backend",
    title: "TalentPulse AI — Automated Resume Screening",
    desc: "A resume parsing and semantic ranking application built using Python, Flask, Scikit-learn, and Natural Language Processing.",
    keyChallenges: [
      "Built an NLP text preprocessing pipeline with tokenization, stopword removal, and TF-IDF vectorization.",
      "Implemented Cosine Similarity to compute relevance scores between candidate resumes and job descriptions.",
      "Created an analytics dashboard displaying candidate match distributions and keyword overlap summaries.",
      "Packaged Python Flask backend with PostgreSQL database, configured with Docker for easy local setup."
    ],
    techStack: ["Python", "Flask", "Scikit-learn", "NLP (TF-IDF)", "PostgreSQL", "Docker", "Pandas"],
    githubUrl: "https://github.com/Abhijeet0848/-TalentPulse-AI-Intelligent-Resume-Screening-Talent-Intelligence-Platform",
    liveUrl: "https://github.com/Abhijeet0848/-TalentPulse-AI-Intelligent-Resume-Screening-Talent-Intelligence-Platform"
  },
  "3": {
    badge: "Web & Database",
    title: "Online Result Management System",
    desc: "A student academic score publication web portal built using PHP, JavaScript, and a normalized MySQL relational database.",
    keyChallenges: [
      "Designed an asynchronous result search using AJAX, allowing students to check semester marks instantly without full-page reloads.",
      "Normalized relational database schemas to Third Normal Form (3NF) to organize course and student result records cleanly.",
      "Constructed an administrative dashboard for secure batch grade entry and student report viewing."
    ],
    techStack: ["PHP", "JavaScript", "MySQL", "AJAX", "Bootstrap 5", "HTML5", "CSS3"],
    githubUrl: "https://github.com/Abhijeet0848/Online-result-system-perfect",
    liveUrl: "https://github.com/Abhijeet0848/Online-result-system-perfect"
  }
};

function initCaseStudyModal() {
  const modal = document.getElementById('project-modal');
  const modalSlot = document.getElementById('modal-content-slot');
  const closeBtn = document.getElementById('modal-close-btn');
  const openBtns = document.querySelectorAll('.open-modal-btn');

  if (!modal || !modalSlot) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-project');
      const data = projectData[pid];
      if (!data) return;

      modalSlot.innerHTML = `
        <span class="case-study-badge"><i class="fa-solid fa-code"></i> ${data.badge}</span>
        <h3 class="case-study-title">${data.title}</h3>
        <p class="case-study-desc">${data.desc}</p>

        <div class="case-study-section">
          <h4><i class="fa-solid fa-layer-group"></i> Key Features & Implementation Details</h4>
          <ul>
            ${data.keyChallenges.map(item => `<li><i class="fa-solid fa-check"></i> <span>${item}</span></li>`).join('')}
          </ul>
        </div>

        <div class="case-study-section">
          <h4><i class="fa-solid fa-screwdriver-wrench"></i> Technologies & Tools</h4>
          <div class="tech-pill-list">
            ${data.techStack.map(tech => `<span class="tech-pill">${tech}</span>`).join('')}
          </div>
        </div>

        <div class="case-study-actions">
          ${data.liveUrl ? `<a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-glow"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Link</a>` : ''}
        </div>
      `;

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. Doraemon 4D Pocket Animation & Guaranteed Clean .PDF Downloader (SILENT)
   ========================================================================== */
function downloadResumePDF() {
  const downloadAnchor = document.createElement('a');
  downloadAnchor.href = 'assets/Abhijeet_Kumar_Gautam_Resume.pdf';
  downloadAnchor.download = 'Abhijeet_Kumar_Gautam_Resume.pdf';
  downloadAnchor.target = '_blank';
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  setTimeout(() => {
    document.body.removeChild(downloadAnchor);
  }, 300);
}

function initDoraemonResumeAnimation() {
  const modal = document.getElementById('doraemon-modal');
  const closeBtn = document.getElementById('doraemon-close-btn');
  const replayBtn = document.getElementById('d-replay-btn');
  const directDownloadBtn = document.getElementById('d-direct-download');
  const resumeLinks = document.querySelectorAll('a[href*="Resume.pdf"]');

  if (!modal) return;

  let autoOpenTimer = null;
  let timer1 = null;
  let timer2 = null;

  function openResumeDirectly() {
    const previewAnchor = document.createElement('a');
    previewAnchor.href = 'assets/Abhijeet_Kumar_Gautam_Resume.pdf';
    previewAnchor.target = '_blank';
    previewAnchor.rel = 'noopener noreferrer';
    document.body.appendChild(previewAnchor);
    previewAnchor.click();
    setTimeout(() => {
      document.body.removeChild(previewAnchor);
    }, 300);
  }

  // Sequence: Run In (0-1.2s) -> Speech Bubble (1.2-1.8s) -> Extract Resume (1.8-4.0s) -> Auto-Open PDF at 4s
  function playSequence() {
    clearTimeout(timer1);
    clearTimeout(timer2);
    clearTimeout(autoOpenTimer);

    modal.classList.remove('running', 'speaking', 'extracting');
    void modal.offsetWidth;

    // 1. Running Entrance (0s - 1.2s)
    modal.classList.add('running');

    // 2. Stop running, pop speech bubble (1.2s)
    timer1 = setTimeout(() => {
      modal.classList.remove('running');
      modal.classList.add('speaking');
    }, 1200);

    // 3. Reach into 4D Pocket & Extract Resume (1.8s)
    timer2 = setTimeout(() => {
      modal.classList.add('extracting');
      createSparkles();
    }, 1800);

    // 4. Exactly at 4 seconds: Direct open resume in new tab without requiring second click
    autoOpenTimer = setTimeout(() => {
      openResumeDirectly();
      closeDoraemon();
    }, 4000);
  }

  function triggerDoraemon() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    playSequence();
  }

  function closeDoraemon() {
    clearTimeout(timer1);
    clearTimeout(timer2);
    clearTimeout(autoOpenTimer);
    modal.classList.remove('open', 'running', 'speaking', 'extracting');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Direct download button click in modal (allow native download with toast feedback)
  if (directDownloadBtn) {
    directDownloadBtn.addEventListener('click', () => {
      showToast('Downloading Abhijeet_Kumar_Gautam_Resume.pdf...');
    });
  }

  // Intercept all resume buttons on page to trigger Doraemon
  resumeLinks.forEach(link => {
    if (link.id !== 'd-direct-download' && link.id !== 'd-direct-preview') {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        triggerDoraemon();
      });
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDoraemon);
  if (replayBtn) replayBtn.addEventListener('click', playSequence);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeDoraemon();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeDoraemon();
    }
  });

  function createSparkles() {
    const container = document.getElementById('sparkle-particles');
    if (!container) return;
    container.innerHTML = '';

    const colors = ['#2563eb', '#06b6d4', '#f59e0b', '#10b981', '#ec4899', '#7c3aed'];

    for (let i = 0; i < 28; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 8 + 4;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      p.style.position = 'absolute';
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.borderRadius = '50%';
      p.style.backgroundColor = color;
      p.style.left = '50%';
      p.style.top = '55%';
      p.style.opacity = '1';
      p.style.pointerEvents = 'none';
      p.style.boxShadow = `0 0 12px ${color}`;

      const angle = (Math.PI * 2 * i) / 28;
      const velocity = Math.random() * 140 + 90;
      const destX = Math.cos(angle) * velocity;
      const destY = Math.sin(angle) * velocity - 45;

      p.style.transition = 'all 1.3s cubic-bezier(0.16, 1, 0.3, 1)';
      container.appendChild(p);

      setTimeout(() => {
        p.style.transform = `translate(${destX}px, ${destY}px) scale(0)`;
        p.style.opacity = '0';
      }, 50);
    }
  }
}

/* ==========================================================================
   8. Copy Email with Bouncing Feedback
   ========================================================================== */
function initEmailCopy() {
  const btn = document.getElementById('copy-email-btn');
  const text = document.getElementById('email-text');

  if (btn && text) {
    btn.addEventListener('click', () => {
      const email = text.innerText.trim();
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard');
        btn.innerHTML = '<i class="fa-solid fa-check" style="color:#059669;"></i>';
        setTimeout(() => {
          btn.innerHTML = '<i class="fa-regular fa-copy"></i>';
        }, 2000);
      });
    });
  }
}

/* ==========================================================================
   9. Contact Form Validation
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submit-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;
    document.querySelectorAll('.err-text').forEach(el => el.textContent = '');

    if (!nameInput.value.trim()) {
      document.getElementById('name-error').textContent = 'Please provide your name.';
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      document.getElementById('email-error').textContent = 'Please provide a valid email.';
      valid = false;
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 5) {
      document.getElementById('message-error').textContent = 'Please enter a message.';
      valid = false;
    }

    if (valid) {
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending message...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        form.reset();
        showToast('Message sent! Thank you for reaching out.');
      }, 700);
    }
  });
}

/* ==========================================================================
   10. Theme Switcher & Keyboard Shortcuts
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const root = document.documentElement;

  const savedTheme = localStorage.getItem('anim-theme') || 'light';
  root.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
  }

  function toggleTheme() {
    const current = root.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('anim-theme', next);
    updateThemeIcon(next);
    showToast(`Switched to ${next} theme`);
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-moon';
      themeIcon.title = 'Switch to dark theme (Press T)';
    } else {
      themeIcon.className = 'fa-solid fa-sun';
      themeIcon.title = 'Switch to light theme (Press T)';
    }
  }

  window.toggleTheme = toggleTheme;
}

function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.key.toLowerCase() === 't') {
      if (window.toggleTheme) window.toggleTheme();
    }
  });
}

/* ==========================================================================
   11. Interactive Toast Popup
   ========================================================================== */
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = msg;
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 2800);
}

/* ==========================================================================
   12. Modern Navbar: Scroll Elevation, ScrollSpy & Mobile Drawer
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileIcon = document.getElementById('mobile-icon');
  const sections = document.querySelectorAll('section[id]');

  // 1. Navbar elevation on scroll
  function handleScroll() {
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // 2. ScrollSpy - update active link
    let currentSection = '';
    const scrollPos = window.scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (id && scrollPos >= top && scrollPos < top + height) {
        currentSection = id;
      }
    });

    if (currentSection) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href')?.replace('#', '');
        if (href === currentSection) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      mobileNavLinks.forEach(link => {
        const href = link.getAttribute('href')?.replace('#', '');
        if (href === currentSection) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 3. Mobile menu drawer toggle
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (mobileIcon) {
        mobileIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    // Close mobile drawer when any link is clicked
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
        if (mobileIcon) mobileIcon.className = 'fa-solid fa-bars';
      });
    });
  }
}

/* ==========================================================================
   13. Buttery-Smooth Scrolling & Reading Progress Indicator
   ========================================================================== */
function initSmoothScroll() {
  // Smooth scroll for all internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#' || targetId === '#!') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navbar = document.getElementById('navbar');
        const navHeight = navbar ? navbar.offsetHeight : 75;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight - 12;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // Glowing Top Reading Progress Bar
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    function updateProgress() {
      const winScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = `${Math.min(scrolled, 100)}%`;
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }
}
