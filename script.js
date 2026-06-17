// --- 1. 3D ANTIGRAVITY ENGINE ---
const canvas = document.querySelector('#antigravity-bg');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Create Floating Particle Field
const particlesGeo = new THREE.BufferGeometry();
const particlesCount = 4000;
const posArray = new Float32Array(particlesCount * 3);

for(let i=0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
}
particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMat = new THREE.PointsMaterial({ size: 0.005, color: 0x00f2ff, transparent: true });
const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
scene.add(particlesMesh);

function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.0005;
    renderer.render(scene, camera);
}
animate();

// --- 2. MULTI-PAGE NAVIGATION ---
const startBtn = document.querySelector('#start-btn');
const landingPage = document.querySelector('#landing-page');
const appPage = document.querySelector('#app-page');

startBtn.addEventListener('click', () => {
    landingPage.classList.remove('active');
    setTimeout(() => {
        appPage.classList.add('active');
        init(); // Start original logic
        focusTypingInput();
    }, 600);
});

// --- 3. YOUR ORIGINAL LOGIC (INTEGRATED) ---
// (Keeping your constants and state as they were)
const DEFAULT_PASSAGES = [
  { id: "starter-focus", title: "Focus paragraph", text: "Typing speed grows when your eyes stay calm and your fingers return to the home row." },
  // ... (Include other passages here)
];

const state = {
  customPassages: [], activeMode: "paragraph", activeId: "starter-focus",
  currentText: "", startedAt: null, finishedAt: null, paused: false
};

// ... (Merge all your original functions here: loadCustomPassages, renderTargetText, etc.)
// Just update the handleTyping function slightly for 3D feedback:

function handleTyping(effectKey = null) {
  if (!state.startedAt && els.typingInput.value.length) {
    state.startedAt = performance.now();
    startCountdown();
  }

  // 3D Feedback: Particles speed up when typing
  particlesMesh.rotation.y += 0.01;

  renderTargetText();
  updateStats();
  updateKeyboard();
  
  if (effectKey) showKeystrokeEffect(effectKey);
}

// ... (Rest of your existing functions: saveCustomText, deleteCustomPassage, etc.)

function init() {
  state.customPassages = loadCustomPassages();
  // ... (Original init logic)
  bindEvents();
  resetSession();
}

// Update resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
