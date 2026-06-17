// SpeedType Studio 3D Effects Engine (Three.js & GSAP integrations)

// References to Three.js elements for live theme updates
let keyboardBaseMesh = null;
let keyboardKeyMaterial = null;
let keyboardBaseMaterial = null;

let sphereSprites = [];

let tunnelScene = null;
let tunnelSprites = [];

// Water background globals
let waterScene = null;
let waterMesh = null;
let waterGeometry = null;
let waterMaterialDark = null;
let lightWaterShaderMaterial = null;
let waterAmbientLight = null;
let waterDirLight = null;
let waterRipples = [];
let lastWaterRipplePos = null;
let isDarkMode = false;

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Hero Keyboard Guide (pure CSS 3D + GSAP)
  initHeroKeyboard();

  // Check if Three.js is loaded
  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded. Disabling WebGL effects.');
    setupFallbackEffects();
    return;
  }

  // Initialize WebGL scenes
  initWaterBackground();
  initLetterSphere();
  initWordTunnel();
  setupScrollAnimations();
  
  // Listen for theme change events
  window.addEventListener('themeChanged', (e) => {
    updateThreeTheme(e.detail.theme);
  });

  // Apply initial theme
  const initialTheme = document.documentElement.getAttribute('data-theme') || 'light';
  updateThreeTheme(initialTheme);
});

// --- HELPER: Create Text Texture (White text to support color modulation) ---
function createLetterTexture(char) {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  ctx.fillRect(0, 0, 64, 64);
  
  ctx.font = 'bold 44px "Outfit", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Clean white character so we can modulate colors in Three.js
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(char, 32, 32);
  
  return new THREE.CanvasTexture(canvas);
}

// --- 0. 3D INTERACTIVE WATER BACKGROUND ---
// GLSL Shaders for Light Mode Water Background
const lightWaterVertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const lightWaterFragmentShader = `
  uniform vec3 uRipples[20];
  uniform float uTime;
  
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  
  float caustics(vec2 uv, float time) {
    vec2 p = uv * 3.0;
    for(int i=0; i<4; i++) {
      float t = time * (1.0 + float(i)*0.15);
      p += sin(p.yx * 1.2 + vec2(t, t*0.9)) * 0.35;
    }
    return length(sin(p * 2.2)) * 0.45;
  }
  
  vec2 getRippleGradient(vec2 pos, vec3 ripple) {
    vec2 rPos = ripple.xy;
    float age = ripple.z;
    
    float dist = distance(pos, rPos);
    
    // Wave parameters
    float waveSpeed = 8.0;
    float waveFreq = 5.0;
    float baseAmp = 0.175;
    float duration = 1.8;
    
    if (age <= 0.0 || age > duration || dist > 12.0) {
      return vec2(0.0);
    }
    
    float progress = age / duration;
    float amp = baseAmp * (1.0 - progress) * (1.0 - progress);
    
    // Spatial decay
    float spatialDecay = exp(-dist * 0.35);
    
    // Wave phase
    float phase = dist * waveFreq - age * waveSpeed;
    
    // Displacement derivative with respect to distance
    float cosPhase = cos(phase);
    float sinPhase = sin(phase);
    
    float dH_ddist = amp * (waveFreq * cosPhase * spatialDecay - 0.35 * sinPhase * spatialDecay);
    
    vec2 dir = (pos - rPos) / (dist + 0.0001);
    return dir * dH_ddist;
  }
  
  vec2 ambientGrad(vec2 pos, float time) {
    float amp1 = 0.0075;
    float freq1 = 0.8;
    float speed1 = 0.8;
    
    float amp2 = 0.005;
    float freq2 = 1.4;
    float speed2 = 1.2;
    
    float phase1 = pos.x * freq1 + pos.y * freq1 * 0.5 + time * speed1;
    float phase2 = pos.y * freq2 - pos.x * freq2 * 0.3 - time * speed2;
    
    vec2 grad = vec2(0.0);
    grad.x += cos(phase1) * amp1 * freq1 - sin(phase2) * amp2 * freq2 * 0.3;
    grad.y += cos(phase1) * amp1 * freq1 * 0.5 + cos(phase2) * amp2 * freq2;
    return grad;
  }
  
  void main() {
    // 1. Calculate accumulated gradient from mouse ripples
    vec2 totalGradient = vec2(0.0);
    for (int i = 0; i < 20; i++) {
      totalGradient += getRippleGradient(vWorldPosition.xy, uRipples[i]);
    }
    
    // 2. Add ambient movement
    totalGradient += ambientGrad(vWorldPosition.xy, uTime);
    
    // 3. Compute normal map
    vec3 normal = normalize(vec3(-totalGradient * 0.6, 1.0));
    
    // 4. Distort UV coords for refraction
    vec2 distortedUv = vUv + normal.xy * 0.07;
    
    // 5. Render radial gradient background (recreating light mode theme)
    float distToCenter = distance(distortedUv, vec2(0.5, 0.8));
    
    // Mix background colors: White (#FFFFFF) -> Light Blue (#B3D4EE) -> Dark Blue (#457B9D)
    vec3 bgGrad;
    if (distToCenter < 0.5) {
      bgGrad = mix(vec3(1.0, 1.0, 1.0), vec3(0.701, 0.831, 0.933), distToCenter / 0.5);
    } else {
      bgGrad = mix(vec3(0.701, 0.831, 0.933), vec3(0.271, 0.482, 0.616), clamp((distToCenter - 0.5) / 0.5, 0.0, 1.0));
    }
    
    // 6. Specular reflection
    vec3 lightPos = vec3(5.0, 5.0, 10.0);
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec3 lightDir = normalize(lightPos - vWorldPosition);
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 64.0);
    
    // Glistening white specular highlight
    vec3 specColor = vec3(1.0, 1.0, 1.0) * spec * 1.5;
    
    // 7. Caustics
    float causticVal = caustics(distortedUv * 6.0, uTime * 0.4);
    vec3 causticColor = vec3(1.0, 1.0, 1.0) * pow(causticVal, 2.2) * 0.22;
    
    // 8. Combine final color
    vec3 finalColor = bgGrad + causticColor + specColor;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function initWaterBackground() {
  const container = document.getElementById('water-background-container');
  if (!container) return;

  const width = window.innerWidth;
  const height = window.innerHeight;

  // 1. Scene setup
  waterScene = new THREE.Scene();

  // Perspective camera looking down
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);

  // WebGL Renderer with alpha transparency enabled
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // 2. Geometry: A dense plane grid (64x64) representing the water surface
  const geometry = new THREE.PlaneGeometry(32, 22, 64, 64);
  waterGeometry = geometry;
  
  // 3. Materials
  
  // Dark deep ocean material (original)
  waterMaterialDark = new THREE.MeshPhysicalMaterial({
    color: 0x050816,
    roughness: 0.12,
    metalness: 0.05,
    transmission: 0.0,
    opacity: 0.4,
    transparent: true,
    ior: 1.333,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    side: THREE.DoubleSide
  });

  // Light Mode custom shader material
  const uRipplesArray = [];
  for (let i = 0; i < 20; i++) {
    uRipplesArray.push(new THREE.Vector3(0, 0, -999.0));
  }

  lightWaterShaderMaterial = new THREE.ShaderMaterial({
    vertexShader: lightWaterVertexShader,
    fragmentShader: lightWaterFragmentShader,
    uniforms: {
      uRipples: { value: uRipplesArray },
      uTime: { value: 0.0 }
    },
    transparent: true,
    depthWrite: false,
    depthTest: false
  });

  // Get initial theme to assign correct material
  const initialTheme = document.documentElement.getAttribute('data-theme') || 'light';
  isDarkMode = (initialTheme === 'dark');

  waterMesh = new THREE.Mesh(geometry, isDarkMode ? waterMaterialDark : lightWaterShaderMaterial);
  waterScene.add(waterMesh);

  // 4. Lights: Crucial for rendering specular highlights on the water ripples
  waterAmbientLight = new THREE.AmbientLight(0xffffff, 0.6);
  waterScene.add(waterAmbientLight);

  waterDirLight = new THREE.DirectionalLight(0xffffff, 1.5);
  waterDirLight.position.set(5, 5, 10);
  waterScene.add(waterDirLight);

  // 5. Mouse Interaction & Raycasting
  const mouse = new THREE.Vector2(-9999, -9999);
  const raycaster = new THREE.Raycaster();
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Add click listener for larger ripples
  window.addEventListener('click', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(waterMesh);
    if (intersects.length > 0) {
      const point = intersects[0].point;
      const time = clock.getElapsedTime();
      
      waterRipples.push({
        x: point.x,
        y: point.y,
        startTime: time,
        duration: 2.2,   // longer duration for clicks
        amplitude: 0.325, // higher amplitude
        maxRadius: 15.0  // larger radius
      });
      lastWaterRipplePos.copy(point);
      
      const maxLen = isDarkMode ? 15 : 20;
      if (waterRipples.length > maxLen) {
        waterRipples.shift();
      }
    }
  });

  // Resize Handler
  window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });

  // Track ripples
  waterRipples = [];
  lastWaterRipplePos = new THREE.Vector3();

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    
    const time = clock.getElapsedTime();

    if (isDarkMode) {
      // Raycast mouse position onto water plane to detect ripples
      if (mouse.x > -999) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(waterMesh);
        if (intersects.length > 0) {
          const point = intersects[0].point;
          if (point.distanceTo(lastWaterRipplePos) > 0.6) {
            waterRipples.push({
              x: point.x,
              y: point.y,
              startTime: time,
              duration: 1.8,
              amplitude: 0.14,
              maxRadius: 5.0
            });
            lastWaterRipplePos.copy(point);
            if (waterRipples.length > 15) {
              waterRipples.shift();
            }
          }
        }
      }

      // Filter out expired ripples
      waterRipples = waterRipples.filter(r => (time - r.startTime) < r.duration);

      // Deform geometry vertices in JS
      const posAttr = geometry.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const vx = posAttr.getX(i);
        const vy = posAttr.getY(i);
        
        let vz = Math.sin(vx * 0.4 + time * 1.0) * 0.04 + Math.cos(vy * 0.4 + time * 1.2) * 0.04;
        
        waterRipples.forEach(r => {
          const dx = vx - r.x;
          const dy = vy - r.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          const age = time - r.startTime;
          const progress = age / r.duration;
          
          if (dist < r.maxRadius && progress < 1.0) {
            const amplitude = r.amplitude * (1.0 - progress);
            vz += Math.sin(dist * 5.0 - age * 10.0) * amplitude * Math.exp(-dist * 0.4);
          }
        });
        
        posAttr.setZ(i, vz);
      }
      
      posAttr.needsUpdate = true;
      geometry.computeVertexNormals();
    } else {
      // Light Mode: custom GPU shader
      // Raycast mouse position onto water plane to detect ripples
      if (mouse.x > -999) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(waterMesh);
        if (intersects.length > 0) {
          const point = intersects[0].point;
          if (point.distanceTo(lastWaterRipplePos) > 0.4) {
            waterRipples.push({
              x: point.x,
              y: point.y,
              startTime: time,
              duration: 1.8,
              amplitude: 0.175,
              maxRadius: 12.0
            });
            lastWaterRipplePos.copy(point);
            if (waterRipples.length > 20) {
              waterRipples.shift();
            }
          }
        }
      }

      // Filter out expired ripples
      waterRipples = waterRipples.filter(r => (time - r.startTime) < r.duration);

      // Prepare uniforms array
      const uRipplesArray = lightWaterShaderMaterial.uniforms.uRipples.value;
      for (let i = 0; i < 20; i++) {
        if (i < waterRipples.length) {
          const r = waterRipples[i];
          uRipplesArray[i].set(r.x, r.y, time - r.startTime);
        } else {
          uRipplesArray[i].set(0.0, 0.0, -999.0);
        }
      }
      
      lightWaterShaderMaterial.uniforms.uTime.value = time;
    }

    renderer.render(waterScene, camera);
  }

  animate();
}

// --- 1. HERO FLOATING KEYBOARD / GUIDE ---
function initHeroKeyboard() {
  const container = document.getElementById('hero-canvas-container');
  const card = document.querySelector('.keyboard-guide-card');
  const reflection = document.querySelector('.reflection-overlay');
  if (!container || !card) return;

  // Register GSAP ScrollTrigger if available
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Perpetual Floating Animation using GSAP
  // Float up and down gently with a slight rotation oscillation
  gsap.to(card, {
    y: "-=12",
    rotationZ: "+=0.8",
    duration: 4.5,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });

  // 2. Mouse-based 3D Tilt and Follow Cursor
  let mouse = { x: 0, y: 0 };
  let target = { x: 0, y: 0 };

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (!isTouchDevice && typeof gsap !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      // Normalise mouse position between -1 and 1
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation ticker for smooth interpolation (maintains 60FPS)
    gsap.ticker.add(() => {
      // Lerp (Linear Interpolation) for buttery smooth motion
      target.x += (mouse.x - target.x) * 0.06;
      target.y += (mouse.y - target.y) * 0.06;

      // 3D Tilt calculation (max 8 degrees)
      const tiltX = target.y * 8; // rotate around X axis (up/down tilt)
      const tiltY = target.x * 8; // rotate around Y axis (left/right tilt)
      
      // Translation to follow cursor slightly (creates depth parallax)
      const moveX = target.x * 18; // max 18px translation
      const moveY = -target.y * 12; // max 12px translation

      // Apply transforms
      gsap.set(card, {
        rotateX: tiltX,
        rotateY: tiltY,
        x: moveX,
        y: moveY,
        overwrite: "auto"
      });

      // Shift reflection overlay dynamically to simulate moving light reflection
      if (reflection) {
        const gradientX = 50 + (target.x * 25);
        const gradientY = 50 - (target.y * 25);
        reflection.style.background = `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 75%)`;
      }
    });
  }

  // 3. Scroll-based Effects using GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && window.ScrollTrigger) {
    gsap.to(card, {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1.2
      },
      rotateZ: 3, // Rotate slightly
      scale: 0.94, // Scale down slightly as user scrolls down
      boxShadow: "0 40px 80px rgba(15, 23, 42, 0.16)", // Deepen shadow depth
      overwrite: "auto"
    });
  }
}

// --- 2. 3D LETTER ORBITING SPHERE ---
function initLetterSphere() {
  const container = document.getElementById('universe-canvas-container');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  // Scene Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.z = 8;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Characters Pool
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?@#$*&'.split('');
  const sphereGroup = new THREE.Group();
  scene.add(sphereGroup);

  const count = 120;
  sphereSprites = [];

  // Pre-generate textures for characters
  const textures = chars.map(char => createLetterTexture(char));

  for (let i = 0; i < count; i++) {
    const texture = textures[Math.floor(Math.random() * textures.length)];
    
    // Create unique materials so colors can be changed individually per sprite
    const spriteMaterial = new THREE.SpriteMaterial({ 
      map: texture, 
      transparent: true,
      opacity: 0.85
    });
    
    const sprite = new THREE.Sprite(spriteMaterial);
    
    const phi = Math.acos(-1 + (2 * i) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;
    const radius = 3.5;

    sprite.position.x = radius * Math.cos(theta) * Math.sin(phi);
    sprite.position.y = radius * Math.sin(theta) * Math.sin(phi);
    sprite.position.z = radius * Math.cos(phi);

    sprite.userData = {
      phi: phi,
      theta: theta,
      radius: radius,
      speed: 0.15 + Math.random() * 0.2,
      baseScale: 0.35 + Math.random() * 0.35
    };
    
    sprite.scale.set(sprite.userData.baseScale, sprite.userData.baseScale, 1);
    sphereGroup.add(sprite);
    sphereSprites.push(sprite);
  }

  // Lights
  const light = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(light);

  // Mouse Interaction
  let targetRotX = 0;
  let targetRotY = 0;
  let curRotX = 0;
  let curRotY = 0;

  window.addEventListener('mousemove', (e) => {
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = -(e.clientY / window.innerHeight) * 2 + 1;
    targetRotY = normX * 0.6;
    targetRotX = normY * 0.6;
  });

  // Resize Handler
  window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    sphereGroup.rotation.y += 0.05 * delta;
    sphereGroup.rotation.z += 0.02 * delta;

    curRotX += (targetRotX - curRotX) * 0.05;
    curRotY += (targetRotY - curRotY) * 0.05;
    
    camera.position.x = Math.sin(curRotY) * 8;
    camera.position.z = Math.cos(curRotY) * 8;
    camera.position.y = curRotX * 6;
    camera.lookAt(0, 0, 0);

    // Pulse effects
    sphereSprites.forEach((mesh, index) => {
      const pulse = 1.0 + Math.sin(time * 2 + index) * 0.15;
      const finalScale = mesh.userData.baseScale * pulse;
      mesh.scale.set(finalScale, finalScale, 1);
      mesh.position.y += Math.sin(time + index) * 0.001;
    });

    renderer.render(scene, camera);
  }

  animate();
}

// --- 3. INFINITE TYPING TUNNEL ---
function initWordTunnel() {
  const container = document.getElementById('tunnel-container');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  // Scene
  tunnelScene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
  camera.position.z = 20;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Fog setup (light mode white initially)
  tunnelScene.background = new THREE.Color(0xffffff);
  tunnelScene.fog = new THREE.FogExp2(0xffffff, 0.045);

  const words = [
    'SpeedType', 'FlowState', 'Studio', 'Accuracy', 'Speed', 'Keyboard',
    'Rhythm', 'Focus', 'WPM', 'Keystroke', 'Training', 'SaaS', 'WebGL',
    'Performance', 'Engine', 'AntiCheat', 'Analytics', 'FocusMode', 'Rhythm'
  ];

  const tunnelGroup = new THREE.Group();
  tunnelScene.add(tunnelGroup);

  tunnelSprites = [];
  const count = 70;

  // Pre-generate canvases (White text so we can modulate colors)
  const textures = words.map(w => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, 128, 32);
    
    ctx.font = 'bold 20px "Orbitron", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(w, 64, 16);
    
    return new THREE.CanvasTexture(canvas);
  });

  for (let i = 0; i < count; i++) {
    const texture = textures[Math.floor(Math.random() * textures.length)];
    const mat = new THREE.SpriteMaterial({ 
      map: texture, 
      transparent: true,
      opacity: 0.8
    });
    const sprite = new THREE.Sprite(mat);
    
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 3;
    sprite.position.x = Math.cos(angle) * radius;
    sprite.position.y = Math.sin(angle) * radius;
    sprite.position.z = Math.random() * -60;

    sprite.userData = {
      angle: angle,
      radius: radius,
      speed: 4 + Math.random() * 8,
      w: 2.0,
      h: 0.5
    };
    sprite.scale.set(sprite.userData.w, sprite.userData.h, 1);
    tunnelGroup.add(sprite);
    tunnelSprites.push(sprite);
  }

  // Lights
  const light = new THREE.AmbientLight(0xffffff, 1.2);
  tunnelScene.add(light);

  // Resize Handler
  window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });

  let scrollSpeedFactor = 1.0;
  let lastScrollTime = Date.now();

  window.addEventListener('scroll', () => {
    const now = Date.now();
    const dt = Math.max(1, now - lastScrollTime);
    scrollSpeedFactor = Math.min(5.0, 1.0 + (100 / dt));
    lastScrollTime = now;
  });

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    
    scrollSpeedFactor += (1.0 - scrollSpeedFactor) * 0.05;

    tunnelSprites.forEach((sprite) => {
      sprite.position.z += sprite.userData.speed * scrollSpeedFactor * delta;

      sprite.userData.angle += 0.1 * delta;
      sprite.position.x = Math.cos(sprite.userData.angle) * sprite.userData.radius;
      sprite.position.y = Math.sin(sprite.userData.angle) * sprite.userData.radius;

      if (sprite.position.z > 20) {
        sprite.position.z = -60;
        sprite.userData.speed = 4 + Math.random() * 8;
      }
    });

    tunnelGroup.rotation.z += 0.03 * delta;

    renderer.render(tunnelScene, camera);
  }

  animate();
}

// --- 4. LIVE DYNAMIC THEME ENGINE FOR THREE.JS ---
function updateThreeTheme(theme) {
  isDarkMode = (theme === 'dark');
  const isDark = isDarkMode;

  const container = document.getElementById('water-background-container');
  if (container) {
    container.style.opacity = isDark ? '0.85' : '1.0';
  }

  // 0. Update Water Background Scene
  if (waterMesh && waterMaterialDark && lightWaterShaderMaterial && waterAmbientLight && waterDirLight) {
    if (isDark) {
      // Dark deep ocean mode
      waterMesh.material = waterMaterialDark;
      waterMaterialDark.color.setHex(0x050816);
      waterMaterialDark.roughness = 0.12;
      waterMaterialDark.transmission = 0.0;
      waterMaterialDark.opacity = 0.4;
      
      waterAmbientLight.color.setHex(0x0a122c);
      waterAmbientLight.intensity = 0.3;
      
      waterDirLight.color.setHex(0x00e5ff); // neon cyan reflection highlights
      waterDirLight.intensity = 2.5;        // Boosted for strong neon highlights
    } else {
      // Light fresh water mode
      waterMesh.material = lightWaterShaderMaterial;
      
      waterAmbientLight.color.setHex(0xffffff);
      waterAmbientLight.intensity = 0.8;
      
      waterDirLight.color.setHex(0xffffff); // clean sun highlights
      waterDirLight.intensity = 2.2;        // Boosted for bright glistening sun reflections

      // Reset Z-height of geometry vertices when transitioning to light mode
      if (waterGeometry) {
        const posAttr = waterGeometry.attributes.position;
        for (let i = 0; i < posAttr.count; i++) {
          posAttr.setZ(i, 0.0);
        }
        posAttr.needsUpdate = true;
        waterGeometry.computeVertexNormals();
      }
    }
  }

  // 1. Update Hero Keyboard base
  if (keyboardBaseMaterial) {
    if (isDark) {
      keyboardBaseMaterial.color.setHex(0x1a1c2a);
      keyboardBaseMaterial.metalness = 0.1;
      keyboardBaseMaterial.transmission = 0.6;
    } else {
      keyboardBaseMaterial.color.setHex(0xe2e8f0);
      keyboardBaseMaterial.metalness = 0.8;
      keyboardBaseMaterial.transmission = 0.1;
    }
  }

  // 2. Update Hero Keyboard keys
  if (keyboardKeyMaterial) {
    if (isDark) {
      keyboardKeyMaterial.color.setHex(0x00e5ff);
      keyboardKeyMaterial.emissive.setHex(0x7b61ff);
      keyboardKeyMaterial.emissiveIntensity = 0.15;
    } else {
      keyboardKeyMaterial.color.setHex(0xffffff);
      keyboardKeyMaterial.emissive.setHex(0x008b9b);
      keyboardKeyMaterial.emissiveIntensity = 0.1;
    }
  }

  // 3. Update Orbiting Letter Sphere Particles
  sphereSprites.forEach((sprite, index) => {
    if (sprite.material) {
      if (isDark) {
        // Neon cyan and violet hues
        sprite.material.color.setHex(index % 2 === 0 ? 0x00e5ff : 0x7b61ff);
      } else {
        // Elegant dark-teal and indigo hues
        sprite.material.color.setHex(index % 2 === 0 ? 0x008b9b : 0x6366f1);
      }
    }
  });

  // 4. Update Infinite Word Tunnel
  if (tunnelScene) {
    const tunnelColor = isDark ? 0x050816 : 0xffffff;
    tunnelScene.background.setHex(tunnelColor);
    if (tunnelScene.fog) {
      tunnelScene.fog.color.setHex(tunnelColor);
    }
  }

  tunnelSprites.forEach((sprite) => {
    if (sprite.material) {
      if (isDark) {
        sprite.material.color.setHex(0x00e5ff); // neon cyan words
      } else {
        sprite.material.color.setHex(0x6366f1); // indigo words
      }
    }
  });
}

// --- 5. GSAP SCROLL & TRANSITIONS ---
function setupScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Chart bars height trigger
  gsap.fromTo('.chart-bar', 
    { height: 0 }, 
    { 
      height: (index, target) => target.parentElement.dataset.height || '60%', 
      duration: 1.5, 
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.dashboard-section',
        start: 'top 70%'
      }
    }
  );

  // Feature cards reveal
  gsap.from('.feature-card', {
    y: 50,
    opacity: 0,
    duration: 1.0,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.why-section',
      start: 'top 75%'
    }
  });

  // Feature rows reveals
  gsap.utils.toArray('.feature-row').forEach((row) => {
    const visual = row.querySelector('.feature-visual');
    const desc = row.querySelector('.feature-desc');

    gsap.from(visual, {
      x: -50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: row,
        start: 'top 80%'
      }
    });

    gsap.from(desc, {
      x: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: row,
        start: 'top 80%'
      }
    });
  });

  // Timeline reveals
  gsap.from('.timeline-item', {
    x: -30,
    opacity: 0,
    stagger: 0.2,
    duration: 1.0,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-timeline',
      start: 'top 80%'
    }
  });
}

// --- FALLBACK INTERFACE ---
function setupFallbackEffects() {
  const keyboardContainer = document.getElementById('hero-canvas-container');
  if (keyboardContainer) {
    keyboardContainer.innerHTML = `
      <div style="width: 100%; height: 100%; display: grid; place-items: center; border: 1px dashed var(--glass-border); border-radius: 20px; color: var(--text-secondary);">
        <div style="text-align: center;">
          <p style="font-size: 3rem; margin-bottom: 10px;">⌨️</p>
          <p>SpeedType Floating Space</p>
        </div>
      </div>
    `;
  }
}
