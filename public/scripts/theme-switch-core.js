// theme-switch-core.js (🔥 Oracle Clean Final v10 - Explicit Audio Sync)
let matrixRainFrameId = null;

// Ensure the syncAudioUI function is defined on the global window object
window.syncAudioUI = window.syncAudioUI || (() => {});

function stopMatrixRain(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (matrixRainFrameId !== null) {
    cancelAnimationFrame(matrixRainFrameId);
    matrixRainFrameId = null;
    console.log("🛑 Matrix rain cancelled.");
  }

  window.matrixActive = false;
  canvas.style.display = "none";
}

function startMatrixRain(canvas) {
  if (!canvas || window.matrixActive) return;

  console.log("🌧️ Starting matrix rain...");
  window.matrixActive = true;
  const ctx = canvas.getContext("2d");
  const chars = "アァイィウエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const fontSize = 16;
  let drops = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops = new Array(Math.floor(canvas.width / fontSize)).fill(1);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function drawRain() {
    if (!window.matrixActive) {
      console.log("⛔ Draw loop exiting...");
      cancelAnimationFrame(matrixRainFrameId);
      matrixRainFrameId = null;
      return;
    }

    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff00";
    ctx.font = fontSize + "px 'Share Tech Mono'";

    for (let i = 0; i < drops.length; i++) {
      const char = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }

    matrixRainFrameId = requestAnimationFrame(drawRain);
  }

  drawRain();
}

function refreshAudioUI(theme) {
  const audio = document.getElementById("theme-audio");
  let source = audio?.querySelector("source");
  const trackTitle = document.getElementById("track-title");
  const cassetteImg = document.getElementById("cassette-img");
  const trackLink = document.getElementById("track-link");
  const nowPlaying = document.getElementById("now-playing");

  let src = "/audio/pixelate-pixelated-dreams-313358.mp3";
  let label = "Pixelated Dreams";
  let artist = "Pixel Dreams";
  let img = "/images/cassette-nes.png";
  let trackLinkUrl = "https://pixabay.com/music/video-games-pixelated-dreams-313358/";

  if (theme === "matrix") {
    src = "/audio/stomping-rock-four-shots-111444.mp3";
    label = "Stomping Rock";
    artist = "Pixabay Rock";
    img = "/images/matrixCD.png";
    trackLinkUrl = "https://pixabay.com/music/id-111444/";
  } else if (theme === "cyberpunk") {
    src = "/audio/pixel-escape-pixel-dreams-313353.mp3";
    label = "Pixel Escape";
    artist = "Pixel Dreams";
    img = "/images/cassette-cyberpunk.png";
    trackLinkUrl = "https://pixabay.com/music/id-313353/";
  }

  if (audio) {
    if (!source) {
      source = document.createElement("source");
      source.type = "audio/mpeg";
      audio.appendChild(source);
    }
    source.src = src;
    audio.load();
    if (!audio.muted) {
      audio.play().then(() => {
        nowPlaying?.classList.remove("hidden");
        cassetteImg?.classList.add("animate-bounce");
      }).catch(err => console.warn("🎧 Audio play blocked:", err));
    }
  }

  if (trackTitle) trackTitle.textContent = label;
  if (trackLink) trackLink.href = trackLinkUrl;
  if (cassetteImg) {
    cassetteImg.src = img;
    cassetteImg.alt = `Play ${label}`;
    cassetteImg.className = theme === "matrix" ? "w-40 h-auto cursor-pointer" : (theme === "cyberpunk" ? "cassette-img-cyber" : "cassette-img");
  }
  if (nowPlaying) {
    nowPlaying.className = `bg-black bg-opacity-80 text-xs p-2 rounded shadow w-56 font-mono border ${
      theme === "matrix"
        ? "text-green-400 border-green-500"
        : "text-white border-pink-500"
    }`;
  }
}

function switchTheme(newTheme) {
  console.log("💡 Switching theme to:", newTheme);

  document.documentElement.setAttribute("data-theme", newTheme);

  ["nes", "matrix", "cyberpunk"].forEach(theme => {
    document.documentElement.classList.remove(`theme-${theme}`);
    document.body.classList.remove(`theme-${theme}`);
  });

  document.documentElement.classList.add(`theme-${newTheme}`);
  document.body.classList.add(`theme-${newTheme}`);

  localStorage.setItem("theme", newTheme);
  localStorage.setItem("themeManuallySet", "true");
  document.cookie = `theme=${newTheme}; path=/`;

  document.querySelectorAll('link[data-theme-style]').forEach(link => link.remove());

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `/themes/${newTheme}.css?ts=${Date.now()}`;
  link.setAttribute("data-theme-style", newTheme);
  
  // ✅ New: Bulletproof restart of NES animations like "DIFFERENT"
  link.onload = () => {
    console.log(`🎨 ${newTheme}.css loaded.`);
  
    document.querySelectorAll(".nes-different-animate").forEach((el) => {
      el.classList.remove("nes-different-animate");
      void el.offsetWidth;
      el.classList.add("nes-different-animate");
    });
  };
  
  document.head.appendChild(link);
  
  const canvas = document.getElementById("matrix-canvas");
  if (canvas) {
    stopMatrixRain(canvas);
    if (newTheme === "matrix") {
      canvas.style.display = "block";
      startMatrixRain(canvas);
    }
  }

  refreshAudioUI(newTheme);

  const debug = document.querySelector(".theme-debug");
  if (debug) {
    debug.textContent = `🎯 Theme Loaded: ${newTheme}`;
    debug.classList.remove("hidden");
  }
}

window.switchTheme = switchTheme;

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || getCookie("theme") || "nes";
  switchTheme(savedTheme);

  const audio = document.getElementById("theme-audio");
  const cassetteImg = document.getElementById("cassette-img");
  const muteBtn = document.getElementById("mute-toggle");
  const nowPlaying = document.getElementById("now-playing");

  let isPlaying = false;
  let isMuted = localStorage.getItem("avotech-muted") === "true";

  if (audio) audio.muted = isMuted;

  function updateMuteUI() {
    if (muteBtn) {
      muteBtn.textContent = isMuted ? "🔇 Muted" : "🔊 Sound On";
    }
    localStorage.setItem("avotech-muted", String(isMuted));
  }

  function togglePlay() {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      nowPlaying?.classList.add("hidden");
      cassetteImg?.classList.remove("animate-bounce");
    } else {
      audio.play().then(() => {
        nowPlaying?.classList.remove("hidden");
        cassetteImg?.classList.add("animate-bounce");
      }).catch(err => console.warn("Autoplay failed:", err));
    }

    isPlaying = !isPlaying;
  }

  function toggleMute() {
    isMuted = !isMuted;
    if (audio) audio.muted = isMuted;
    updateMuteUI();
  }

  cassetteImg?.addEventListener("click", togglePlay);
  muteBtn?.addEventListener("click", toggleMute);

  updateMuteUI();

  setTimeout(() => {
    if (typeof window.syncAudioUI === "function") {
      console.log("🔄 Syncing Audio UI post-layout render...");
      window.syncAudioUI();
    }
  }, 500);
});
