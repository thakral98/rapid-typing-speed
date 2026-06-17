// --- 3D BACKGROUND ENGINE ---
const canvas = document.querySelector('#antigravity-bg');
const scene3d = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const particlesGeo = new THREE.BufferGeometry();
const pCount = 3000;
const posArray = new Float32Array(pCount * 3);
for(let i=0; i < pCount * 3; i++) posArray[i] = (Math.random() - 0.5) * 15;
particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMat = new THREE.PointsMaterial({ size: 0.005, color: 0x00f2ff });
const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
scene3d.add(particlesMesh);
camera.position.z = 5;

function animate3d() {
    requestAnimationFrame(animate3d);
    particlesMesh.rotation.y += 0.001;
    renderer.render(scene3d, camera);
}
animate3d();

// --- MULTI-PAGE TRANSITION ---
const startBtn = document.getElementById('start-btn');
const landingPage = document.getElementById('landing-page');
const appPage = document.getElementById('app-page');
const backBtn = document.getElementById('backToLanding');

startBtn.addEventListener('click', () => {
    landingPage.classList.remove('active');
    appPage.classList.add('active');
    resetSession();
    focusTypingInput();
});

backBtn.addEventListener('click', () => {
    appPage.classList.remove('active');
    landingPage.classList.add('active');
});

// --- FULL TYPING LOGIC ---
const DEFAULT_PASSAGES = [
  { id: "starter-focus", title: "Focus paragraph", text: "Typing speed grows when your eyes stay calm and your fingers return to the home row." },
  { id: "starter-lines", title: "Short line drill", text: "Keep wrists light\nLook at the next word\nPress each key with purpose" }
];

const STORAGE_KEY = "speedtype.customTexts.v1";
const SETTINGS_KEY = "speedtype.settings.v1";
const INACTIVITY_MS = 5000;

const state = {
  customPassages: [], activeMode: "paragraph", activeId: "starter-focus",
  currentText: "", startedAt: null, finishedAt: null, timerId: null,
  inactivityTimerId: null, paused: false, pauseStartedAt: null, pausedTotalMs: 0
};

const els = {
  passageSelect: document.querySelector("#passageSelect"),
  targetText: document.querySelector("#targetText"),
  typingInput: document.querySelector("#typingInput"),
  wpm: document.querySelector("#wpm"),
  accuracy: document.querySelector("#accuracy"),
  errors: document.querySelector("#errors"),
  time: document.querySelector("#time"),
  progressBar: document.querySelector("#progressBar"),
  progressText: document.querySelector("#progressText"),
  sessionState: document.querySelector("#sessionState"),
  keyCaps: Array.from(document.querySelectorAll("[data-key]")),
  idleModal: document.getElementById('idleModal')
};

function loadCustomPassages() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function resetSession() {
    const all = [...DEFAULT_PASSAGES, ...loadCustomPassages()];
    const source = all.find(p => p.id === state.activeId) || DEFAULT_PASSAGES[0];
    state.currentText = source.text;
    state.startedAt = null;
    state.finishedAt = null;
    state.paused = false;
    state.pausedTotalMs = 0;
    
    els.typingInput.value = "";
    els.typingInput.readOnly = false;
    els.typingInput.disabled = false;
    
    clearInterval(state.timerId);
    renderTarget();
    updateStats();
    updateKeyboard();
    renderSelect();
}

function renderTarget() {
    const typed = els.typingInput.value;
    els.targetText.innerHTML = "";
    [...state.currentText].forEach((char, i) => {
        const span = document.createElement("span");
        span.className = "char";
        if (i < typed.length) span.classList.add(typed[i] === char ? "correct" : "incorrect");
        else if (i === typed.length) span.classList.add("current");
        span.textContent = char;
        els.targetText.appendChild(span);
    });
}

function handleTyping() {
    if (!state.startedAt && els.typingInput.value.length > 0) {
        state.startedAt = performance.now();
        state.timerId = setInterval(updateStats, 250);
        els.sessionState.textContent = "Typing";
    }

    renderTarget();
    updateStats();
    updateKeyboard();
    scheduleInactivityPause();

    if (els.typingInput.value.length >= state.currentText.length) {
        finishSession("Complete");
    }
}

function updateStats() {
    const typed = els.typingInput.value;
    if (!state.startedAt) return;

    const elapsed = (performance.now() - state.startedAt - state.pausedTotalMs) / 1000;
    const correct = [...typed].filter((c, i) => c === state.currentText[i]).length;
    const errors = typed.length - correct;

    els.wpm.textContent = Math.round((correct / 5) / (elapsed / 60)) || 0;
    els.accuracy.textContent = Math.round((correct / typed.length) * 100 || 100) + "%";
    els.errors.textContent = errors;
    
    const progress = Math.round((typed.length / state.currentText.length) * 100);
    els.progressBar.style.width = progress + "%";
    els.progressText.textContent = progress + "%";
}

function finishSession(msg) {
    clearInterval(state.timerId);
    state.finishedAt = performance.now();
    els.typingInput.disabled = true;
    els.sessionState.textContent = msg;
}

function scheduleInactivityPause() {
    clearTimeout(state.inactivityTimerId);
    state.inactivityTimerId = setTimeout(() => {
        if (state.startedAt && !state.finishedAt && !state.paused) {
            pauseSession();
        }
    }, INACTIVITY_MS);
}

function pauseSession() {
    state.paused = true;
    state.pauseStartedAt = performance.now();
    els.idleModal.hidden = false;
    els.typingInput.disabled = true;
}

function resumeSession() {
    state.pausedTotalMs += performance.now() - state.pauseStartedAt;
    state.paused = false;
    els.idleModal.hidden = true;
    els.typingInput.disabled = false;
    focusTypingInput();
}

function updateKeyboard() {
    const nextChar = state.currentText[els.typingInput.value.length]?.toUpperCase() || "";
    const keyName = nextChar === " " ? "SPACE" : nextChar;
    els.keyCaps.forEach(k => k.classList.toggle("is-next", k.dataset.key === keyName));
}

function renderSelect() {
    const all = [...DEFAULT_PASSAGES, ...loadCustomPassages()];
    els.passageSelect.innerHTML = all.map(p => `<option value="${p.id}" ${p.id === state.activeId ? 'selected' : ''}>${p.title}</option>`).join("");
}

function focusTypingInput() { els.typingInput.focus(); }

// INITIALIZE
function init() {
    els.typingInput.addEventListener('input', handleTyping);
    els.passageSelect.addEventListener('change', (e) => { state.activeId = e.target.value; resetSession(); });
    document.getElementById('restartButton').addEventListener('click', resetSession);
    document.getElementById('resumeModalButton').addEventListener('click', resumeSession);
    document.getElementById('saveCustomButton').addEventListener('click', () => {
        const custom = loadCustomPassages();
        custom.push({ id: Date.now().toString(), title: document.getElementById('customTitle').value, text: document.getElementById('customText').value });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
        resetSession();
    });
}

init();
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
