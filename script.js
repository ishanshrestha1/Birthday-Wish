// ========== TYPING EFFECT ==========
const mainMessage = "Happy Birthday My Friend 🎂✨";
const textElement = document.getElementById("dynamic-text");
let charIndex = 0;

function typeMainMessage() {
  if (charIndex < mainMessage.length) {
    textElement.innerHTML += mainMessage.charAt(charIndex);
    charIndex++;
    setTimeout(typeMainMessage, 70);
  } else {
    showWishes();
  }
}

// ========== WISHES WITH STAGGER ==========
const wishes = [
  "🎈 Wishing you endless happiness ✨",
  "🌟 May all your dreams come true 🌠",
  "😊 Stay blessed, strong & smiling always 💪",
  "🎉 Enjoy your special day to the fullest 🎂"
];

const wishElements = [
  document.getElementById("wish1"),
  document.getElementById("wish2"),
  document.getElementById("wish3"),
  document.getElementById("wish4")
];

function showWishes() {
  for (let i = 0; i < wishElements.length; i++) {
    wishElements[i].innerText = wishes[i];
  }
  
  const delays = [300, 900, 1500, 2100];
  for (let i = 0; i < wishElements.length; i++) {
    setTimeout((idx) => {
      wishElements[idx].style.opacity = "1";
      wishElements[idx].style.transform = "translateY(0)";
    }, delays[i], i);
  }
  
  setTimeout(addWishInteractions, 2500);
}

// ========== IMPROVED WISH INTERACTIONS (SHOWS FULL TEXT) ==========
function addWishInteractions() {
  wishElements.forEach(wish => {
    // Hover effect - show full text in tooltip style
    wish.addEventListener('mouseenter', (e) => {
      const fullText = wish.innerText;
      showFloatingTooltip(fullText, e.target);
      
      // Add subtle scale effect
      wish.style.transform = 'scale(1.02) translateY(-2px)';
    });
    
    wish.addEventListener('mouseleave', () => {
      hideFloatingTooltip();
      wish.style.transform = 'translateY(0)';
    });
    
    // Click effect
    wish.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = wish.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      createMiniBurst(x, y);
      
      // Bounce effect
      wish.style.transform = 'scale(0.98)';
      setTimeout(() => {
        wish.style.transform = 'translateY(0)';
      }, 100);
      
      // Show full wish in toast
      showFullToast(wish.innerText);
      
      // Also trigger a small firework
      createSmallFirework(x, y);
    });
  });
}

// Floating tooltip that shows full text on hover
let activeTooltip = null;

function showFloatingTooltip(text, element) {
  // Remove existing tooltip
  if (activeTooltip) {
    activeTooltip.remove();
  }
  
  const tooltip = document.createElement('div');
  tooltip.textContent = text;
  tooltip.style.position = 'fixed';
  tooltip.style.bottom = 'auto';
  tooltip.style.top = 'auto';
  tooltip.style.left = 'auto';
  tooltip.style.background = 'linear-gradient(135deg, rgba(0,0,0,0.95), rgba(30,0,30,0.95))';
  tooltip.style.color = '#ffccff';
  tooltip.style.padding = '12px 24px';
  tooltip.style.borderRadius = '50px';
  tooltip.style.fontSize = '1rem';
  tooltip.style.fontWeight = 'bold';
  tooltip.style.backdropFilter = 'blur(10px)';
  tooltip.style.border = '2px solid #ff66ff';
  tooltip.style.boxShadow = '0 0 30px rgba(255,68,255,0.6)';
  tooltip.style.zIndex = '3000';
  tooltip.style.whiteSpace = 'nowrap';
  tooltip.style.fontFamily = 'inherit';
  tooltip.style.letterSpacing = '1px';
  tooltip.style.animation = 'tooltipFadeIn 0.2s ease-out';
  tooltip.style.pointerEvents = 'none';
  
  // Position above the hovered element
  const rect = element.getBoundingClientRect();
  tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
  tooltip.style.bottom = window.innerHeight - rect.top + 15 + 'px';
  
  // Adjust if offscreen
  document.body.appendChild(tooltip);
  
  // Fix position after append (to get proper width)
  setTimeout(() => {
    let leftPos = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2);
    leftPos = Math.max(10, Math.min(leftPos, window.innerWidth - tooltip.offsetWidth - 10));
    tooltip.style.left = leftPos + 'px';
    
    let bottomPos = window.innerHeight - rect.top + 15;
    if (bottomPos + tooltip.offsetHeight > window.innerHeight - 10) {
      // Show above if too low
      tooltip.style.bottom = 'auto';
      tooltip.style.top = rect.bottom + 10 + 'px';
    }
  }, 10);
  
  activeTooltip = tooltip;
}

function hideFloatingTooltip() {
  if (activeTooltip) {
    activeTooltip.style.animation = 'tooltipFadeOut 0.2s ease-out';
    setTimeout(() => {
      if (activeTooltip) activeTooltip.remove();
      activeTooltip = null;
    }, 150);
  }
}

function showFullToast(message) {
  // Remove any existing toasts
  const existingToasts = document.querySelectorAll('.birthday-toast');
  existingToasts.forEach(toast => toast.remove());
  
  const toast = document.createElement('div');
  toast.className = 'birthday-toast';
  toast.textContent = message + ' 🎊';
  toast.style.position = 'fixed';
  toast.style.bottom = '100px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.background = 'linear-gradient(135deg, rgba(0,0,0,0.95), rgba(50,0,50,0.95))';
  toast.style.color = '#ffccff';
  toast.style.padding = '14px 28px';
  toast.style.borderRadius = '60px';
  toast.style.fontSize = '1.1rem';
  toast.style.fontWeight = 'bold';
  toast.style.backdropFilter = 'blur(12px)';
  toast.style.border = '2px solid #ff88ff';
  toast.style.boxShadow = '0 0 40px rgba(255,68,255,0.7)';
  toast.style.zIndex = '2000';
  toast.style.whiteSpace = 'nowrap';
  toast.style.fontFamily = 'inherit';
  toast.style.letterSpacing = '1px';
  toast.style.animation = 'toastSlideUp 0.3s ease-out';
  toast.style.pointerEvents = 'none';
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'toastSlideDown 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

function createSmallFirework(x, y) {
  const particleCount = 15;
  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 3;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    
    particles.push({
      x: x,
      y: y,
      vx: vx,
      vy: vy,
      color: randomColor(),
      size: 2 + Math.random() * 2,
      alpha: 0.8,
      decay: 0.025
    });
  }
}

function createMiniBurst(x, y) {
  const emojis = ['✨', '⭐', '💖', '🎈', '🎉', '💫'];
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement('div');
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.fontSize = '16px';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';
    particle.style.filter = 'drop-shadow(0 0 3px #ff66ff)';
    document.body.appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 2.5;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    
    let posX = x, posY = y, opacity = 1, rotation = 0;
    function animate() {
      posX += vx;
      posY += vy;
      opacity -= 0.04;
      rotation += 10;
      particle.style.left = posX + 'px';
      particle.style.top = posY + 'px';
      particle.style.opacity = opacity;
      particle.style.transform = `rotate(${rotation}deg)`;
      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        particle.remove();
      }
    }
    requestAnimationFrame(animate);
  }
}

// ========== OPTIMIZED FIREWORKS ==========
const canvas = document.getElementById("fireworks-canvas");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];
let lastFireworkTime = 0;
let animationId = null;
const MAX_PARTICLES = 180;

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

window.addEventListener('resize', () => {
  resizeCanvas();
  // Reinitialize stars on resize
  initStars();
});
resizeCanvas();

const colors = ['#ff66cc', '#ff44aa', '#ff88ff', '#ffaa66', '#66ffcc', '#ff6666', '#ff99ff'];

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function createFirework(x, y) {
  if (particles.length > MAX_PARTICLES) return;
  
  const particleCount = Math.min(28, MAX_PARTICLES - particles.length);
  const mainColor = randomColor();
  
  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 3.5;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    
    particles.push({
      x: x,
      y: y,
      vx: vx,
      vy: vy,
      color: Math.random() > 0.5 ? mainColor : randomColor(),
      size: 2 + Math.random() * 2,
      alpha: 0.9,
      decay: 0.018 + Math.random() * 0.012
    });
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.08;
    p.alpha -= p.decay;
    p.size *= 0.99;
    
    if (p.alpha <= 0.02 || p.y > height + 50 || p.x < -50 || p.x > width + 50) {
      particles.splice(i, 1);
    }
  }
}

function drawParticles() {
  for (const p of particles) {
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 3;
    ctx.shadowColor = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
}

let stars = [];
function initStars() {
  const starCount = 100;
  stars = [];
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 1 + Math.random() * 1.5,
      alpha: 0.3 + Math.random() * 0.5
    });
  }
}

function drawStars() {
  for (const s of stars) {
    ctx.globalAlpha = s.alpha;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
  ctx.fillRect(0, 0, width, height);
  
  drawStars();
  updateParticles();
  drawParticles();
  
  const now = Date.now();
  if (now - lastFireworkTime > 950 && particles.length < MAX_PARTICLES) {
    lastFireworkTime = now;
    const randX = 100 + Math.random() * (width - 200);
    const randY = 80 + Math.random() * (height * 0.55);
    createFirework(randX, randY);
    
    if (Math.random() > 0.75 && particles.length < MAX_PARTICLES - 20) {
      setTimeout(() => {
        createFirework(randX + (Math.random() - 0.5) * 60, randY + (Math.random() - 0.5) * 40);
      }, 80);
    }
  }
  
  animationId = requestAnimationFrame(animate);
}

function startFireworks() {
  initStars();
  setTimeout(() => {
    if (width && height) {
      createFirework(width / 2, height / 3);
      setTimeout(() => createFirework(width / 3, height / 2.5), 300);
      setTimeout(() => createFirework(width * 0.7, height * 0.4), 600);
    }
  }, 100);
  animate();
}

// Add CSS animations to document
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes tooltipFadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes tooltipFadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
  
  @keyframes toastSlideUp {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  
  @keyframes toastSlideDown {
    from {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    to {
      opacity: 0;
      transform: translateX(-50%) translateY(30px);
    }
  }
`;
document.head.appendChild(styleSheet);

// ========== START EVERYTHING ==========
window.onload = () => {
  textElement.innerHTML = "";
  charIndex = 0;
  typeMainMessage();
  startFireworks();
};

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  if (activeTooltip) {
    activeTooltip.remove();
  }
});