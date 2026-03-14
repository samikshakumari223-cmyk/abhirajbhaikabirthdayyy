/* ============================================
   BIRTHDAY WEBSITE - Configuration
   Change these to personalize the site!
   ============================================ */

const BIRTHDAY_NAME = "ABHIRAWJJJ"; // <-- Change this to the birthday person's name

// Video URL for the QR code — paste your video link here
const VIDEO_URL = "https://drive.google.com/file/d/1U4GDVfXEfr5TcjE9uwgGt5APM7TlOlrL/view?usp=sharing";

// Caption shown above the QR code
const FINALE_CAPTION = "Scan this QR to pay me for the party (just kidding 🤪). Here is something special for you — just scan it or tap on it to watch!";

// Photos 1-14 for the background loop
const BG_PHOTOS = [
"1.jpg", "2.jpg", "3.jpg", "4.jpg",
  "5.jpg", "6.jpg", "7.jpg", "8.jpg",
  "9.jpg", "10.jpg", "11.jpg", "12.jpg",
  "13.jpg", "14.jpg",
];

// Photos 15+ for the slideshow
const SLIDESHOW = [
 { src: "15.jpg", caption: "pehla hangout hi kehdeyy 🥰" },
  { src: "16.jpg", caption: "HAWTIEEEEE🫵🏽" },
  { src: "17.jpg", caption: "cutus" },
  { src: "18.jpg", caption: "this i couldnt resist to post🫰🏻" },
  { src: "19.jpg", caption: " love you rhega😘" },
  { src: "20.jpg", caption: "🔥🔥🔥🔥" },
  { src: "21.jpg", caption: "Forever grateful for you" },
  { src: "22.jpg", caption: "Cheers to mac n cheese supremacy😋" },
  { src: "23.jpg", caption: "kitti pyaar photo hai yawr" },
  { src: "24.jpg", caption: "ye toh bas teri jalane k liye daali hai😘" },
  { src: "25.jpg", caption: "Here's to the best chapter yet." },
];

/* ============================================
   CRACKER SOUND (generated via Web Audio API)
   ============================================ */

function playCrackerSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;

    // 1) Big bass THUMP — the "boom" you feel
    const bass = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bass.type = "sine";
    bass.frequency.setValueAtTime(150, now);
    bass.frequency.exponentialRampToValueAtTime(30, now + 0.25);
    bassGain.gain.setValueAtTime(0.9, now);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    bass.connect(bassGain).connect(ctx.destination);
    bass.start(now);
    bass.stop(now + 0.3);

    // 2) White-noise BURST — the crackle/pop explosion
    const bufferSize = ctx.sampleRate * 0.3;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize); // decaying noise
    }
    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = noiseBuffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.7, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    // Bandpass to make it sound like a pop, not static
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(3000, now);
    filter.Q.value = 0.8;
    noiseSrc.connect(filter).connect(noiseGain).connect(ctx.destination);
    noiseSrc.start(now);
    noiseSrc.stop(now + 0.3);

    // 3) Quick high-pitched POP snap
    const snap = ctx.createOscillator();
    const snapGain = ctx.createGain();
    snap.type = "square";
    snap.frequency.setValueAtTime(1800, now);
    snap.frequency.exponentialRampToValueAtTime(200, now + 0.08);
    snapGain.gain.setValueAtTime(0.5, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    snap.connect(snapGain).connect(ctx.destination);
    snap.start(now);
    snap.stop(now + 0.1);

    // 4) Second pop a beat later for that "cracker" feel
    const snap2 = ctx.createOscillator();
    const snap2Gain = ctx.createGain();
    snap2.type = "square";
    snap2.frequency.setValueAtTime(2200, now + 0.15);
    snap2.frequency.exponentialRampToValueAtTime(300, now + 0.22);
    snap2Gain.gain.setValueAtTime(0.4, now + 0.15);
    snap2Gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    snap2.connect(snap2Gain).connect(ctx.destination);
    snap2.start(now + 0.15);
    snap2.stop(now + 0.25);

  } catch (e) {
    // Audio not supported, silently ignore
  }
}

/* ============================================
   CONFETTI ENGINE (Canvas-based, reusable)
   Fills the ENTIRE screen with confetti
   ============================================ */

function createConfetti(canvas, options = {}) {
  const ctx = canvas.getContext("2d");
  const fullDuration = options.fullDuration || 5500;  // stay full for this long (ms)
  const fadeDuration = options.fadeDuration || 4000;   // then fade over this long (ms)
  const totalDuration = fullDuration + fadeDuration;
  const colors = options.colors || [
    "#FFD6E0", "#FF85A1", "#E75480", "#D4A017", "#F5D060", "#FFFFFF",
    "#FF6B8A", "#FFB347", "#FFD700", "#FF69B4",
  ];

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();

  const particles = [];
  const w = canvas.width;
  const h = canvas.height;

  // Create a single confetti particle at a random position
  function spawnParticle() {
    return {
      x: Math.random() * w,
      y: -20 - Math.random() * h * 0.3,
      vx: (Math.random() - 0.5) * 3,
      vy: Math.random() * 2 + 1.5,
      width: Math.random() * 10 + 5,
      height: Math.random() * 7 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      gravity: 0.02 + Math.random() * 0.02,
      opacity: 1,
      shape: Math.random() > 0.4 ? "rect" : "circle",
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.03 + Math.random() * 0.04,
    };
  }

  // Initial burst — fill the screen immediately
  for (let i = 0; i < 600; i++) {
    const p = spawnParticle();
    p.y = Math.random() * h;          // scatter across full height
    p.x = Math.random() * w;
    p.vy = Math.random() * 1.5 + 0.5; // gentle fall
    particles.push(p);
  }

  let startTime = null;
  let animId = null;

  function update(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Keep spawning new particles during the full phase to keep screen packed
    if (elapsed < fullDuration) {
      const spawnRate = 12; // new particles per frame
      for (let i = 0; i < spawnRate; i++) {
        particles.push(spawnParticle());
      }
    }

    // Calculate global fade (0 = fully visible, 1 = gone)
    let globalFade = 0;
    if (elapsed > fullDuration) {
      globalFade = (elapsed - fullDuration) / fadeDuration;
    }

    let alive = false;

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      p.vy += p.gravity;
      p.wobble += p.wobbleSpeed;
      p.x += p.vx + Math.sin(p.wobble) * 0.8;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;

      // Apply slow fade
      if (globalFade > 0) {
        p.opacity = Math.max(0, 1 - globalFade);
      }

      // Remove dead particles
      if (p.y > canvas.height + 60 || p.opacity <= 0) {
        // During full phase, recycle particle back to top
        if (elapsed < fullDuration) {
          p.x = Math.random() * w;
          p.y = -20 - Math.random() * 40;
          p.vy = Math.random() * 1.5 + 0.5;
          p.vx = (Math.random() - 0.5) * 3;
          p.opacity = 1;
        } else {
          particles.splice(i, 1);
          continue;
        }
      }

      alive = true;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      if (p.shape === "rect") {
        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    if (alive && elapsed < totalDuration) {
      animId = requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animId = requestAnimationFrame(update);

  return {
    stop() {
      if (animId) cancelAnimationFrame(animId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
  };
}

/* ============================================
   SIDE CONFETTI — continuous left & right streams
   ============================================ */

function createSideConfetti(canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const w = canvas.width;
  const h = canvas.height;
  const colors = [
    "#FFD6E0", "#FF85A1", "#E75480", "#D4A017", "#F5D060", "#FFFFFF",
    "#FF6B8A", "#FFB347", "#FFD700", "#FF69B4",
  ];
  const particles = [];
  let animId = null;
  let stopped = false;

  function spawnSide() {
    const isLeft = Math.random() > 0.5;
    const edgeX = isLeft ? Math.random() * w * 0.15 : w - Math.random() * w * 0.15;
    return {
      x: edgeX,
      y: -10 - Math.random() * 30,
      vx: isLeft ? Math.random() * 1.5 + 0.3 : -(Math.random() * 1.5 + 0.3),
      vy: Math.random() * 1.5 + 1,
      width: Math.random() * 8 + 4,
      height: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.15,
      gravity: 0.015 + Math.random() * 0.01,
      opacity: 0.8 + Math.random() * 0.2,
      shape: Math.random() > 0.4 ? "rect" : "circle",
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.03,
    };
  }

  function update() {
    if (stopped) return;

    ctx.clearRect(0, 0, w, h);

    // Spawn a few each frame
    for (let i = 0; i < 3; i++) {
      particles.push(spawnSide());
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.vy += p.gravity;
      p.wobble += p.wobbleSpeed;
      p.x += p.vx + Math.sin(p.wobble) * 0.5;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;

      // Remove if off-screen
      if (p.y > h + 30) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      if (p.shape === "rect") {
        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    animId = requestAnimationFrame(update);
  }

  animId = requestAnimationFrame(update);

  return {
    stop() {
      stopped = true;
      if (animId) cancelAnimationFrame(animId);
      ctx.clearRect(0, 0, w, h);
    },
  };
}

/* ============================================
   SPLASH SCREEN
   ============================================ */

function initSplash() {
  const nameEl = document.getElementById("bday-name");
  const splash = document.getElementById("splash");
  const continueBtn = document.getElementById("splash-continue");
  const canvas = document.getElementById("confetti-canvas");

  nameEl.textContent = BIRTHDAY_NAME + "!";

  // Update page title
  document.title = "Happy Birthday " + BIRTHDAY_NAME + "!";

  // Fire confetti + sound — fills screen for 5-6s then slowly fades
  playCrackerSound();
  createConfetti(canvas, { fullDuration: 5500, fadeDuration: 4000 });

  // After main confetti ends, start continuous side confetti
  let sideConfettiRef = null;
  setTimeout(() => {
    sideConfettiRef = createSideConfetti(canvas);
  }, 9500); // 5500 full + 4000 fade = 9500

  // Spawn floating balloons on left & right sides only
  const balloonsContainer = document.getElementById("balloons");
  const balloonColors = ["#FF85A1", "#F5D060", "#E75480", "#FFD6E0", "#FFB347", "#87CEEB", "#DDA0DD"];
  for (let i = 0; i < 15; i++) {
    const b = document.createElement("div");
    b.className = "balloon";
    // Place on left (0-15%) or right (85-100%) side
    const isLeft = i % 2 === 0;
    b.style.left = isLeft
      ? (Math.random() * 12 + 2) + "%"
      : (Math.random() * 12 + 86) + "%";
    b.style.background = balloonColors[i % balloonColors.length];
    b.style.setProperty("--float-time", (6 + Math.random() * 5) + "s");
    b.style.setProperty("--float-delay", (Math.random() * 4) + "s");
    b.style.width = (35 + Math.random() * 20) + "px";
    b.style.height = (45 + Math.random() * 20) + "px";
    balloonsContainer.appendChild(b);
  }

  // Both "Yes" buttons dismiss splash
  const yes2Btn = document.getElementById("splash-yes2");

  function dismissSplash() {
    if (sideConfettiRef) sideConfettiRef.stop();
    splash.classList.add("splash--hidden");
    setTimeout(() => {
      splash.style.display = "none";
      // Reveal the cake section with a slide-in
      const cakeSection = document.getElementById("cake-section");
      cakeSection.classList.add("visible");
      // Now start mic listening for blow detection
      initCandle();
    }, 800);
  }

  continueBtn.addEventListener("click", dismissSplash);
  yes2Btn.addEventListener("click", dismissSplash);
}

/* ============================================
   CANDLE INTERACTION (Microphone blow detection)
   ============================================ */

const BLOW_MESSAGES = [
  "Hmm, I didn't hear anything... Try blowing closer to the mic! 🎤",
  "Was that a whisper? Come on, blow harder! 💨",
  "Oh! I think you didn't blow hard enough! Give it a real whoooosh! 🌬️",
  "Are you shy? Those candles won't blow themselves out! 😄",
  "I'm still waiting... Take a deep breath and BLOW! 💪",
  "Almost felt something... one more big blow! 🌀",
];

function initCandle() {
  const flames = document.querySelectorAll("#candles-row .flame");
  const instruction = document.getElementById("candle-instruction");
  const blowHint = document.getElementById("blow-hint");
  const blowIndicator = document.getElementById("blow-indicator");
  const blowBar = document.getElementById("blow-bar");
  const postBlow = document.getElementById("post-blow");
  const celebrationCanvas = document.getElementById("celebration-canvas");
  const celebrationText = document.getElementById("celebration-text");
  const cakeTitle = document.getElementById("cake-title");

  let blown = false;
  let micStream = null;
  let analyser = null;
  let audioCtx = null;
  let attemptCount = 0;
  let checkTimer = null;
  let listening = false;

  let ambientLevel = 0; // calibrated ambient noise level

  // Start mic listening
  async function startListening() {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audioCtx.createMediaStreamSource(micStream);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      blowIndicator.classList.add("active");
      instruction.textContent = "Get ready... 🎤";

      // Calibrate ambient noise for 2 seconds before listening
      let samples = [];
      let calibrateStart = Date.now();

      function calibrate() {
        if (Date.now() - calibrateStart < 2000) {
          const data = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(data);
          let sum = 0;
          for (let i = 0; i < data.length; i++) sum += data[i];
          samples.push(sum / data.length);
          requestAnimationFrame(calibrate);
        } else {
          // Set ambient level as the average + a small buffer
          const total = samples.reduce((a, b) => a + b, 0);
          ambientLevel = (total / samples.length) + 8;
          listening = true;
          instruction.textContent = "Now blow into your mic to blow out the candles! 🎤";
          detectBlow();
          resetHintTimer();
        }
      }
      requestAnimationFrame(calibrate);

    } catch (err) {
      // Mic not available — fall back to click/tap
      instruction.textContent = "Mic not available — tap the candles to blow them out! 🕯️";
      enableClickFallback();
    }
  }

  function resetHintTimer() {
    if (checkTimer) clearTimeout(checkTimer);
    checkTimer = setTimeout(() => {
      if (!blown && listening) {
        showHint();
        resetHintTimer(); // keep showing hints every 5s
      }
    }, 5000);
  }

  function showHint() {
    const msg = BLOW_MESSAGES[attemptCount % BLOW_MESSAGES.length];
    attemptCount++;
    blowHint.textContent = msg;
    blowHint.style.animation = "none";
    blowHint.offsetHeight; // trigger reflow
    blowHint.style.animation = "fadeInUp 0.4s ease forwards";
  }

  // Continuously analyze mic volume
  function detectBlow() {
    if (blown || !analyser || !listening) return;

    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);

    // Calculate average volume
    let sum = 0;
    for (let i = 0; i < data.length; i++) sum += data[i];
    const avg = sum / data.length;

    // Map to blow bar — shows level above ambient
    const aboveAmbient = Math.max(0, avg - ambientLevel);
    const pct = Math.min(100, (aboveAmbient / 20) * 100);
    blowBar.style.width = pct + "%";

    // Trigger when sound is notably above ambient noise
    if (avg > ambientLevel + 5) {
      blowOut();
      return;
    }

    requestAnimationFrame(detectBlow);
  }

  function blowOut() {
    if (blown) return;
    blown = true;
    listening = false;
    if (checkTimer) clearTimeout(checkTimer);

    // Blow out candles one by one with slight delay
    const shuffled = [...flames].sort(() => Math.random() - 0.5);
    shuffled.forEach((flame, i) => {
      setTimeout(() => {
        flame.classList.add("flame--out");
        flame.classList.remove("lit");
        // Show smoke for this candle
        const smokeEl = flame.closest(".flame-wrap").querySelector(".smoke-wisp");
        setTimeout(() => smokeEl.classList.add("smoke--active"), 300);
      }, i * 200);
    });

    // After all candles are out — instant pop + confetti, no delay
    const totalDelay = shuffled.length * 200 + 300;
    setTimeout(() => {
      // Stop mic
      if (micStream) micStream.getTracks().forEach(t => t.stop());
      if (audioCtx) audioCtx.close();

      blowIndicator.classList.remove("active");
      blowHint.textContent = "";
      instruction.style.animation = "none";
      instruction.textContent = "";

      // Instant celebration — pop + confetti + wishes all at once
      cakeTitle.textContent = "You did it! 🎉";
      postBlow.classList.remove("hidden");
      celebrationText.textContent = "Happy Birthday " + BIRTHDAY_NAME + "! 🥳🎂";
      playCrackerSound();
      createConfetti(celebrationCanvas, { fullDuration: 5500, fadeDuration: 4000 });
    }, totalDelay);
  }

  // Click fallback if mic is unavailable
  function enableClickFallback() {
    flames.forEach(flame => {
      flame.style.cursor = "pointer";
      flame.addEventListener("click", () => {
        if (!blown) blowOut();
      });
    });
  }

  // Post-blow → Slideshow (button click)
  document.getElementById("to-slideshow").addEventListener("click", () => {
    const slideshowSection = document.getElementById("slideshow-section");
    slideshowSection.classList.add("visible");
    setTimeout(() => {
      slideshowSection.scrollIntoView({ behavior: "smooth" });
      initSlideshow();
    }, 100);
  });

  // Start mic when cake section becomes visible
  startListening();
}

/* ============================================
   PHOTO SLIDESHOW — auto-advances with animations
   ============================================ */

function initSlideshow() {
  const img = document.getElementById("slide-img");
  const caption = document.getElementById("slide-caption");
  const counter = document.getElementById("slide-counter");
  const progressBar = document.getElementById("slide-progress-bar");

  const prevBtn = document.getElementById("slide-prev");
  const nextBtn = document.getElementById("slide-next");

  const SLIDE_DURATION = 12000; // 12 seconds per photo
  let current = 0;
  let autoTimer = null;

  function resetAutoTimer() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(goNext, SLIDE_DURATION);
  }

  function showSlide(index) {
    const memory = SLIDESHOW[index];

    // Fade out caption
    caption.classList.remove("caption-visible");

    // Fade out image
    img.classList.remove("slide-visible");

    setTimeout(() => {
      // Swap image
      img.src = memory.src;
      img.alt = memory.caption;

      // Wait for image to load then fade in
      img.onload = function () {
        img.classList.add("slide-visible");
      };
      // If already cached
      if (img.complete) {
        img.classList.add("slide-visible");
      }

      // Fade in caption with delay
      setTimeout(() => {
        caption.textContent = memory.caption;
        caption.classList.add("caption-visible");
      }, 400);

      // Update counter
      counter.textContent = (index + 1) + " / " + SLIDESHOW.length;

      // Reset & animate progress bar
      progressBar.style.transition = "none";
      progressBar.style.width = "0%";
      progressBar.offsetHeight;
      progressBar.style.transition = "width " + SLIDE_DURATION + "ms linear";
      progressBar.style.width = "100%";

    }, 600); // wait for fade-out
  }

  function goNext() {
    current++;
    if (current >= SLIDESHOW.length) {
      // All done — auto-transition to notes after 4 seconds
      clearInterval(autoTimer);
      progressBar.style.width = "100%";
      setTimeout(() => {
        const notesSection = document.getElementById("notes-section");
        notesSection.classList.add("visible");
        setTimeout(() => {
          notesSection.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }, 4000);
      return;
    }
    showSlide(current);
  }

  function goPrev() {
    if (current <= 0) return;
    current--;
    showSlide(current);
    resetAutoTimer(); // restart auto-advance timer
  }

  // Nav buttons
  nextBtn.addEventListener("click", () => {
    goNext();
    if (current < SLIDESHOW.length) resetAutoTimer();
  });

  prevBtn.addEventListener("click", goPrev);

  // Start
  showSlide(0);
  resetAutoTimer();

}

/* ============================================
   BACKGROUND PHOTO LOOP
   Cycles through photos behind the pink overlay
   ============================================ */

function initBgPhotos() {
  const photoA = document.getElementById("bg-photo-a");
  const photoB = document.getElementById("bg-photo-b");
  const photos = BG_PHOTOS;
  if (photos.length === 0) return;

  let index = 0;
  let showing = "a"; // which div is currently visible

  // Preload first image and show it
  photoA.style.backgroundImage = 'url("' + photos[0] + '")';
  photoA.classList.add("active");

  setInterval(() => {
    index = (index + 1) % photos.length;
    const nextSrc = 'url("' + photos[index] + '")';

    if (showing === "a") {
      photoB.style.backgroundImage = nextSrc;
      photoB.classList.add("active");
      photoA.classList.remove("active");
      showing = "b";
    } else {
      photoA.style.backgroundImage = nextSrc;
      photoA.classList.add("active");
      photoB.classList.remove("active");
      showing = "a";
    }
  }, 5000); // switch every 5 seconds
}

/* ============================================
   INITIALIZE
   ============================================ */

/* ============================================
   FINALE — QR Code + Farewell
   ============================================ */

function initFinale() {
  // Set caption text
  document.getElementById("finale-caption").textContent = FINALE_CAPTION;

  // Generate QR code
  const qr = qrcode(0, "M");
  qr.addData(VIDEO_URL);
  qr.make();

  const canvas = document.getElementById("qr-canvas");
  const ctx = canvas.getContext("2d");
  const moduleCount = qr.getModuleCount();
  const size = 200;
  canvas.width = size;
  canvas.height = size;
  const cellSize = size / moduleCount;

  // White background
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, size, size);

  // Draw QR modules in pink
  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (qr.isDark(row, col)) {
        ctx.fillStyle = "#E75480";
        ctx.fillRect(col * cellSize, row * cellSize, cellSize + 0.5, cellSize + 0.5);
      }
    }
  }

  // Tap QR to open video
  const qrContainer = document.querySelector(".qr-container");
  qrContainer.addEventListener("click", () => {
    window.open(VIDEO_URL, "_blank");
  });
}

/* ============================================
   INITIALIZE
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  initBgPhotos();
  initSplash();

  // Notes → Finale
  const toFinaleBtn = document.getElementById("to-finale");
  // Show the finale arrow after a short delay when notes section is visible
  const notesObserver = new MutationObserver(() => {
    const notes = document.getElementById("notes-section");
    if (notes.classList.contains("visible")) {
      setTimeout(() => {
        toFinaleBtn.classList.add("visible");
      }, 2000);
      notesObserver.disconnect();
    }
  });
  notesObserver.observe(document.getElementById("notes-section"), { attributes: true });

  toFinaleBtn.addEventListener("click", () => {
    toFinaleBtn.classList.remove("visible");
    const finaleSection = document.getElementById("finale-section");
    finaleSection.classList.add("visible");
    initFinale();
    setTimeout(() => {
      finaleSection.scrollIntoView({ behavior: "smooth" });
    }, 100);
  });
});
