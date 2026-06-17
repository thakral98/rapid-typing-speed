// --- 1. THREE.JS ENGINE (ANTIGRAVITY) ---
const canvas = document.querySelector('#bg-canvas');
const scene3d = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const particlesGeo = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);
for(let i=0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}
particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMat = new THREE.PointsMaterial({ size: 0.005, color: 0x00f2ff });
const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
scene3d.add(particlesMesh);
camera.position.z = 3;

function animate3d() {
    requestAnimationFrame(animate3d);
    particlesMesh.rotation.y += 0.001;
    renderer.render(scene3d, camera);
}
animate3d();

// --- 2. NAVIGATION ---
const enterBtn = document.querySelector('#enter-flow');
enterBtn.addEventListener('click', () => {
    document.querySelector('#hero-scene').classList.remove('active');
    setTimeout(() => {
        document.querySelector('#app-scene').classList.add('active');
        init(); // Start your original logic
    }, 600);
});

// --- 3. ORIGINAL TYPING LOGIC (Simplified for integration) ---
const DEFAULT_PASSAGES = [
    { id: "starter-focus", title: "Focus", text: "Practice slowly first, then let rhythm carry the words forward." },
    { id: "logic", title: "Logic", text: "Code is like gravity, once you set it in motion, it defines the world." }
];

const state = {
    customPassages: [], activeMode: "paragraph", activeId: "starter-focus",
    currentText: "", startedAt: null, finishedAt: null, timerId: null
};

// Selection of core elements
const els = {
    targetText: document.querySelector("#targetText"),
    typingInput: document.querySelector("#typingInput"),
    wpm: document.querySelector("#wpm"),
    accuracy: document.querySelector("#accuracy"),
    time: document.querySelector("#time")
};

function init() {
    state.currentText = DEFAULT_PASSAGES[0].text;
    renderTarget();
    bindEvents();
}

function bindEvents() {
    document.addEventListener('keydown', () => els.typingInput.focus());
    els.typingInput.addEventListener('input', handleTyping);
}

function handleTyping() {
    if (!state.startedAt) state.startedAt = Date.now();
    renderTarget();
    updateStats();
    
    // Add 3D "Ripple" effect by moving camera slightly
    camera.position.z += 0.01;
    setTimeout(() => camera.position.z -= 0.01, 50);
}

function renderTarget() {
    const typed = els.typingInput.value;
    els.targetText.innerHTML = "";
    [...state.currentText].forEach((char, i) => {
        const span = document.createElement("span");
        span.className = "char";
        if (i < typed.length) {
            span.classList.add(typed[i] === char ? "correct" : "incorrect");
        } else if (i === typed.length) {
            span.classList.add("current");
        }
        span.textContent = char;
        els.targetText.appendChild(span);
    });
}

function updateStats() {
    const typed = els.typingInput.value;
    const elapsed = (Date.now() - state.startedAt) / 60000;
    const correct = [...typed].filter((c, i) => c === state.currentText[i]).length;
    
    els.wpm.textContent = Math.round((correct / 5) / elapsed) || 0;
    els.accuracy.textContent = Math.round((correct / typed.length) * 100) + "%";
}

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
