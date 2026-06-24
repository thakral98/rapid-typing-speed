// --- Navigation Controller ---
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const startBtn = document.getElementById('start-training-btn');
  const drillModal = document.getElementById('drillSelectorModal');
  const closeDrillBtn = document.getElementById('closeDrillSelectorButton');
  const drillCards = document.querySelectorAll('.drill-card-btn');

  function openDrillSelector() {
    if (drillModal) {
      drillModal.classList.add('active');
    }
  }

  function closeDrillSelector() {
    if (drillModal) {
      drillModal.classList.remove('active');
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPageId = link.getAttribute('href').substring(1);
      if (targetPageId === 'practice') {
        openDrillSelector();
      } else {
        switchPage(targetPageId);
      }
    });
  });

  const footerLinks = document.querySelectorAll('.footer-link');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetPageId = href.substring(1);
        if (targetPageId === 'practice') {
          openDrillSelector();
        } else {
          switchPage(targetPageId);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  if (startBtn) {
    startBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openDrillSelector();
    });
  }

  if (closeDrillBtn) {
    closeDrillBtn.addEventListener('click', closeDrillSelector);
  }

  drillCards.forEach(btn => {
    btn.addEventListener('click', () => {
      const drillId = btn.dataset.drillId;
      closeDrillSelector();
      selectPassage(drillId);
      switchPage('practice');
    });
  });

  const exploreBtn = document.getElementById('explore-features-btn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchPage('features');
    });
  }
}

function switchPage(pageId) {
  const navLinks = document.querySelectorAll('.nav-link');
  const pageViews = document.querySelectorAll('.page-view');

  pageViews.forEach(view => {
    view.classList.remove('active');
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${pageId}`) {
      link.classList.add('active');
    }
  });

  const activePage = document.getElementById(pageId);
  if (activePage) {
    activePage.classList.add('active');
    
    if (pageId === 'practice') {
      setTimeout(focusTypingInput, 100);
    } else {
      if (state.startedAt && !state.paused && !state.finishedAt) {
        pauseSession("Auto paused");
      }
    }

    if (pageId === 'home') {
      updateHomeTelemetry();
    } else if (pageId === 'dashboard') {
      updateDashboardTelemetry();
    } else if (pageId === 'leaderboard') {
      updateLeaderboards();
    }
  }
}

function bindEvents() {
  document.addEventListener("keydown", handlePracticeKeydown, false);
  els.targetText.addEventListener("click", focusTypingInput);
  els.typingInput.addEventListener("beforeinput", blockTypingKey);
  els.typingInput.addEventListener("paste", blockTypingKey);
  els.typingInput.addEventListener("drop", blockTypingKey);
  els.typingInput.addEventListener("cut", blockTypingKey);
  els.typingInput.addEventListener("copy", blockTypingKey);
  els.typingInput.addEventListener("input", handleTypingInputFallback);
  els.typingInput.addEventListener("mousedown", (event) => {
    event.preventDefault();
    focusTypingInput();
  });
  els.typingInput.addEventListener("select", () => requestAnimationFrame(lockTypingCaret));
  els.restartButton.addEventListener("click", () => {
    resetSession({ message: "Restarted" });
    focusTypingInput();
  });
  els.pauseButton.addEventListener("click", () => {
    if (state.paused) {
      resumeSession();
    } else {
      pauseSession();
    }
  });
  els.newTestButton.addEventListener("click", () => {
    resetSession({ message: "Ready" });
    focusTypingInput();
  });
  els.resumeModalButton.addEventListener("click", resumeSession);
  els.restartModalButton.addEventListener("click", () => {
    resetSession({ message: "Restarted" });
    focusTypingInput();
  });
  els.randomButton.addEventListener("click", pickRandomPassage);
  els.deleteButton.addEventListener("click", () => {
    if (state.customPassages.some((passage) => passage.id === state.activeId)) {
      deleteCustomPassage(state.activeId);
    }
  });
  els.saveCustomButton.addEventListener("click", saveCustomText);
  els.useDraftButton.addEventListener("click", useDraftNow);
  els.passageSelect.addEventListener("change", (event) => {
    const selected = event.target.value;
    if (selected === "draft") return;
    selectPassage(selected);
  });
  els.modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.activeMode = button.dataset.mode;
      resetSession({ message: "Mode changed" });
      focusTypingInput();
    });
  });

  if (els.googleSignInBtn) {
    els.googleSignInBtn.addEventListener("click", signInWithGoogle);
  }
  if (els.googleSignOutBtn) {
    els.googleSignOutBtn.addEventListener("click", signOut);
  }
  if (els.leaderboardSignInBtn) {
    els.leaderboardSignInBtn.addEventListener("click", signInWithGoogle);
  }
  if (els.clearHistoryBtn) {
    els.clearHistoryBtn.addEventListener("click", clearRunsHistory);
  }

  if (els.userMenuTrigger && els.userDropdownMenu) {
    els.userMenuTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isVisible = els.userDropdownMenu.style.display === "flex";
      els.userDropdownMenu.style.display = isVisible ? "none" : "flex";
      els.userMenuTrigger.setAttribute("aria-expanded", String(!isVisible));
    });

    document.addEventListener("click", (e) => {
      if (els.userDropdownMenu.style.display === "flex" && !els.userProfileWidget.contains(e.target)) {
        els.userDropdownMenu.style.display = "none";
        els.userMenuTrigger.setAttribute("aria-expanded", "false");
      }
    });
  }
}

const THEME_STORAGE_KEY = "speedtype.theme.v1";

function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  let savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (!savedTheme) {
    savedTheme = 'light';
  }

  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  });
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  const event = new CustomEvent('themeChanged', { detail: { theme: theme } });
  window.dispatchEvent(event);
}

// Lazy Loading Intersection Observer for Three.js Scenes
function initIntersectionObserver() {
  if (typeof IntersectionObserver === 'undefined') return;

  const waterContainer = document.getElementById("water-background-container");
  const sphereContainer = document.getElementById("universe-canvas-container");
  const tunnelContainer = document.getElementById("tunnel-container");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.05
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const isVisible = entry.isIntersecting;

      if (window.threeState) {
        if (id === "water-background-container") {
          window.threeState.waterPaused = !isVisible;
        } else if (id === "universe-canvas-container") {
          window.threeState.spherePaused = !isVisible;
        } else if (id === "tunnel-container") {
          window.threeState.tunnelPaused = !isVisible;
        }
      }
    });
  }, observerOptions);

  if (waterContainer) observer.observe(waterContainer);
  if (sphereContainer) observer.observe(sphereContainer);
  if (tunnelContainer) observer.observe(tunnelContainer);

  // Pause scenes when browser tab is out of focus
  document.addEventListener("visibilitychange", () => {
    if (window.threeState) {
      const isHidden = document.hidden;
      window.threeState.waterPaused = isHidden;
      if (isHidden) {
        window.threeState.spherePaused = true;
        window.threeState.tunnelPaused = true;
      }
    }
  });
}

// Global initialization
function init() {
  state.customPassages = loadCustomPassages();
  loadSettings();

  if (!allPassages().some((passage) => passage.id === state.activeId)) {
    state.activeId = DEFAULT_PASSAGES[0].id;
  }

  initTheme();
  initNavigation();
  initSupabase();
  listenToAuthChanges();
  bindEvents();
  renderSavedList();
  resetSession();
  updateHomeTelemetry();
  initIntersectionObserver();
}

// Boot the application
init();

// Bind functions to global scope
window.initNavigation = initNavigation;
window.switchPage = switchPage;
window.bindEvents = bindEvents;
window.initTheme = initTheme;
window.applyTheme = applyTheme;
window.init = init;
