
  (function() {
    // --------------------------------------------------------------
    // 1. Typing Effect for main birthday message
    // --------------------------------------------------------------
    const mainMessage = "Happy Birthday My Friend 🎂✨";
    const textElement = document.getElementById("dynamic-text");
    let charIndex = 0;
    let typingTimer = null;

    function typeMainMessage() {
      if (charIndex < mainMessage.length) {
        textElement.innerHTML += mainMessage.charAt(charIndex);
        charIndex++;
        typingTimer = setTimeout(typeMainMessage, 90);
      } else {
        // after typing completes, show wishes lines one by one
        showWishesWithStagger();
      }
    }

    // --------------------------------------------------------------
    // 2. Birthday Wishes Lines (will appear gracefully)
    // --------------------------------------------------------------
    const wishes = [
      "🎈 Wishing you endless happiness ✨",
      "🌟 May all your dreams come true 🌠",
      "😊 Stay blessed, strong & smiling always 💪",
      "🎉 Enjoy your special day to the fullest 🎂"
    ];

    // Get wish line elements
    const wishLine1 = document.getElementById("wish1");
    const wishLine2 = document.getElementById("wish2");
    const wishLine3 = document.getElementById("wish3");
    const wishLine4 = document.getElementById("wish4");
    const wishElements = [wishLine1, wishLine2, wishLine3, wishLine4];

    // Initially clear any placeholder content and set opacity to 0, reset animation
    function resetWishes() {
      for (let i = 0; i < wishElements.length; i++) {
        if (wishElements[i]) {
          wishElements[i].style.opacity = "0";
          wishElements[i].style.animation = "none";
          wishElements[i].innerText = "";
          // force reflow to reset animation
          void wishElements[i].offsetWidth;
        }
      }
    }

    function showWishesWithStagger() {
      // reset all to empty first, but ensure proper display
      for (let i = 0; i < wishElements.length; i++) {
        if (wishElements[i]) {
          wishElements[i].innerText = wishes[i];
          wishElements[i].style.opacity = "0";
          wishElements[i].style.transform = "translateY(15px)";
          wishElements[i].style.animation = "none";
        }
      }

      // Stagger appearing with timeout (cinematic timing)
      // first wish appears after 0.4s, second after 1.1s, third 1.9s, fourth 2.7s
      const delays = [400, 1100, 1900, 2700];
      for (let idx = 0; idx < wishElements.length; idx++) {
        if (wishElements[idx]) {
          setTimeout((index) => {
            const el = wishElements[index];
            if (el) {
              el.style.animation = "slideFadeIn 0.5s forwards";
              el.style.opacity = "1";
            }
          }, delays[idx], idx);
        }
      }
    }

    // --------------------------------------------------------------
    // 3. ENHANCED FIREWORKS + PARTICLE SYSTEM (Beautiful & smooth)
    //    (Fixed: removed unused code, optimized)
    // --------------------------------------------------------------
    const canvas = document.getElementById("fireworks-canvas");
    const ctx = canvas.getContext("2d");
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener("resize", () => {
      resizeCanvas();
    });
    resizeCanvas();
    
    // Particle array for fireworks bursts
    let fireParticles = [];
    
    // Colorful palette for fireworks (anime pastel + vibrant)
    const colors = [
      "#ff66cc", "#ff44aa", "#ff88ff", "#ff44ff", "#ff66ff",
      "#ffaa66", "#ffcc44", "#66ffcc", "#66ccff", "#ff6666",
      "#ffb3ff", "#c86eff"
    ];
    
    function randomColor() {
      return colors[Math.floor(Math.random() * colors.length)];
    }
    
    class FireParticle {
      constructor(x, y, vx, vy, color, size = 2.5, life = 1.0) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.size = size;
        this.alpha = 1.0;
        this.life = life;
        this.decay = 0.018 + Math.random() * 0.012;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.08;   // slight gravity effect
        this.alpha -= this.decay;
        this.size *= 0.99;
        return this.alpha > 0.02;
      }
      
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.min(this.alpha, 0.9);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.9, 0, Math.PI * 2);
        ctx.fill();
        // add tiny spark effect
        if (this.size > 1.2) {
          ctx.beginPath();
          ctx.arc(this.x - this.vx * 0.5, this.y - this.vy * 0.5, this.size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = "#fff9c4";
          ctx.fill();
        }
        ctx.restore();
      }
    }
    
    // create firework burst at given (x, y)
    function createFireworkBurst(x, y) {
      const particleCount = 42 + Math.floor(Math.random() * 30);
      const mainColor = randomColor();
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 5;
        const vx = Math.cos(angle) * speed * (Math.random() * 0.8 + 0.6);
        const vy = Math.sin(angle) * speed * (Math.random() * 0.8 + 0.4);
        const colorVariation = Math.random() > 0.6 ? randomColor() : mainColor;
        const size = 2 + Math.random() * 3;
        fireParticles.push(new FireParticle(x, y, vx, vy, colorVariation, size));
      }
      // add few extra trailing sparks
      for (let s = 0; s < 6; s++) {
        fireParticles.push(new FireParticle(x, y, (Math.random() - 0.5) * 3.5, (Math.random() - 0.8) * 4, "#ffdd88", 1.8));
      }
    }
    
    // randomly launch fireworks from different positions (cinematic)
    let lastFireworkTime = 0;
    let fireworkInterval = 650; // ms
    
    function scheduleFireworks(now) {
      if (!lastFireworkTime || now - lastFireworkTime >= fireworkInterval) {
        lastFireworkTime = now;
        // random x position (avoid edges sometimes)
        let randX = 80 + Math.random() * (width - 160);
        let randY = 80 + Math.random() * (height * 0.55); // upper half mostly
        // but also some lower fireworks for variety
        if (Math.random() > 0.7) {
          randY = 100 + Math.random() * (height * 0.7);
        }
        createFireworkBurst(randX, randY);
        
        // double burst sometimes (extra bang)
        if (Math.random() > 0.65) {
          setTimeout(() => {
            createFireworkBurst(randX + (Math.random() - 0.5) * 70, randY + (Math.random() - 0.5) * 50);
          }, 80);
        }
      }
    }
    
    // also continuous background twinkling stars (tiny dots, anime aesthetic)
    let stars = [];
    function initStars() {
      const starCount = 150;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1 + Math.random() * 2.2,
          alpha: 0.3 + Math.random() * 0.6,
          twinkleSpeed: 0.5 + Math.random() * 2,
          phase: Math.random() * Math.PI * 2
        });
      }
    }
    
    function drawStars(timestamp) {
      for (let s of stars) {
        // twinkling effect
        const brightness = 0.4 + 0.5 * (Math.sin(timestamp * 0.002 * s.twinkleSpeed + s.phase) * 0.5 + 0.5);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 240, 200, ${s.alpha * brightness})`;
        ctx.fill();
        // occasional colored star
        if (Math.random() < 0.003) {
          ctx.fillStyle = `rgba(255, 200, 100, 0.7)`;
          ctx.arc(s.x, s.y, s.radius + 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    
    // floating sakura / heart petals occasional (extra anime vibe, but lightweight)
    let floatingDecor = [];
    function addFloatingPetals() {
      if (floatingDecor.length < 25 && Math.random() < 0.2) {
        floatingDecor.push({
          x: Math.random() * width,
          y: height + 5,
          size: 6 + Math.random() * 10,
          speedX: (Math.random() - 0.5) * 0.7,
          speedY: -1.5 - Math.random() * 2,
          opacity: 0.5 + Math.random() * 0.4,
          type: Math.random() > 0.6 ? '🌸' : '✨'
        });
      }
    }
    
    function updateFloatingDecor() {
      for (let i = 0; i < floatingDecor.length; i++) {
        const d = floatingDecor[i];
        d.x += d.speedX;
        d.y += d.speedY;
        d.speedY -= 0.02;
        if (d.y < -50 || d.x > width + 100 || d.x < -100) {
          floatingDecor.splice(i,1);
          i--;
        }
      }
    }
    
    function drawFloatingDecor() {
      for (let d of floatingDecor) {
        ctx.font = `${d.size}px "Segoe UI Emoji"`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = "#ff99ff";
        ctx.globalAlpha = d.opacity * 0.8;
        ctx.fillStyle = d.type === '🌸' ? '#ffaadc' : '#ffdd99';
        ctx.fillText(d.type, d.x, d.y);
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }
    }
    
    // Animation loop
    let lastTimestamp = 0;
    function animateFireworks(timestamp) {
      if (!ctx) return;
      // semi-transparent black trail for fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
      ctx.fillRect(0, 0, width, height);
      
      // draw stars background
      drawStars(timestamp);
      
      // update and draw fireworks particles
      for (let i = 0; i < fireParticles.length; i++) {
        const p = fireParticles[i];
        const alive = p.update();
        if (!alive) {
          fireParticles.splice(i,1);
          i--;
        } else {
          p.draw(ctx);
        }
      }
      
      // draw floating decor (petals/emoji)
      drawFloatingDecor();
      
      // schedule new fireworks based on timestamp
      scheduleFireworks(timestamp);
      
      // random small trailing glow occasionally (extra spark)
      if (Math.random() < 0.08 && fireParticles.length < 300) {
        // micro spark near random region
        let randX = Math.random() * width;
        let randY = Math.random() * height * 0.6;
        createFireworkBurst(randX, randY);
      }
      
      requestAnimationFrame(animateFireworks);
    }
    
    // manage floating particles and add dynamic petals
    function startBackgroundEffects() {
      initStars();
      setInterval(() => {
        addFloatingPetals();
        updateFloatingDecor();
      }, 1500);
      // additional manual update loop
      setInterval(() => {
        if (floatingDecor.length < 35) addFloatingPetals();
        updateFloatingDecor();
      }, 1200);
    }
    
    // start everything after loading
    window.onload = () => {
      // reset text field and type fresh
      textElement.innerHTML = "";
      charIndex = 0;
      if (typingTimer) clearTimeout(typingTimer);
      resetWishes();
      // start typing animation
      typeMainMessage();
      
      // initialize canvas fireworks background
      resizeCanvas();
      startBackgroundEffects();
      // start firework animation loop (first frame)
      requestAnimationFrame((t) => {
        lastFireworkTime = t;
        animateFireworks(t);
      });
      
      // manual interval to add occasional random bursts (more lively)
      setInterval(() => {
        if (fireParticles.length < 400) {
          const randX = 50 + Math.random() * (width - 100);
          const randY = 60 + Math.random() * (height * 0.6);
          createFireworkBurst(randX, randY);
        }
      }, 1400);
    };
    
    // resize canvas on orientation change
    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // reinit stars positions to new dimensions (keep aesthetics)
      stars = [];
      initStars();
    });
    
    // add a few initial fireworks for immediate joy
    setTimeout(() => {
      if (width && height) {
        createFireworkBurst(width/2, height/3);
        setTimeout(() => createFireworkBurst(width/3, height/2.5), 200);
        setTimeout(() => createFireworkBurst(width*0.7, height*0.4), 450);
      }
    }, 100);
  })();
  // Dynamic wish interactions - add after showWishesWithStagger function

// Add click-to-celebrate effect on wishes
function addWishInteractions() {
    const wishElements = document.querySelectorAll('.wish-line');
    
    wishElements.forEach((wish, index) => {
      // Hover sound effect simulation (visual feedback)
      wish.addEventListener('mouseenter', () => {
        // Create micro sparkle effect on hover
        createMicroSparkles(wish);
      });
      
      // Click effect - burst of mini fireworks
      wish.addEventListener('click', (e) => {
        const rect = wish.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Create mini celebration effect
        createMiniCelebration(x, y, index);
        
        // Add bounce effect
        wish.style.animation = 'none';
        setTimeout(() => {
          wish.style.animation = 'slideFadeIn 0.3s forwards';
        }, 10);
        
        // Show toast message
        showFloatingMessage(wish.innerText);
      });
    });
  }
  
  // Create micro sparkles on hover
  function createMicroSparkles(element) {
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
      const sparkle = document.createElement('div');
      sparkle.innerHTML = ['✨', '⭐', '💖', '🎈', '🎉'][Math.floor(Math.random() * 5)];
      sparkle.style.position = 'fixed';
      sparkle.style.left = rect.left + Math.random() * rect.width + 'px';
      sparkle.style.top = rect.top + Math.random() * rect.height + 'px';
      sparkle.style.fontSize = '16px';
      sparkle.style.pointerEvents = 'none';
      sparkle.style.zIndex = '1000';
      sparkle.style.animation = 'floatUp 0.8s ease-out forwards';
      document.body.appendChild(sparkle);
      
      setTimeout(() => sparkle.remove(), 800);
    }
  }
  
  // Mini celebration on click
  function createMiniCelebration(x, y, wishIndex) {
    const colors = ['#ff66cc', '#ffaa44', '#66ffcc', '#ff66ff', '#ff8888'];
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.width = '6px';
      particle.style.height = '6px';
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '1000';
      
      const angle = (Math.PI * 2 * i) / 12;
      const velocity = 3 + Math.random() * 4;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      document.body.appendChild(particle);
      
      let posX = x;
      let posY = y;
      let opacity = 1;
      
      function animateParticle() {
        posX += vx;
        posY += vy;
        opacity -= 0.02;
        particle.style.left = posX + 'px';
        particle.style.top = posY + 'px';
        particle.style.opacity = opacity;
        particle.style.transform = `scale(${opacity})`;
        
        if (opacity > 0) {
          requestAnimationFrame(animateParticle);
        } else {
          particle.remove();
        }
      }
      
      requestAnimationFrame(animateParticle);
    }
  }
  
  // Show floating message when clicked
  function showFloatingMessage(message) {
    const toast = document.createElement('div');
    toast.innerHTML = `🎊 ${message} 🎊`;
    toast.style.position = 'fixed';
    toast.style.bottom = '100px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'rgba(0,0,0,0.8)';
    toast.style.color = '#ffccff';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '50px';
    toast.style.fontSize = '0.9rem';
    toast.style.fontWeight = 'bold';
    toast.style.backdropFilter = 'blur(10px)';
    toast.style.border = '1px solid #ff66ff';
    toast.style.boxShadow = '0 0 20px rgba(255,68,255,0.5)';
    toast.style.zIndex = '2000';
    toast.style.animation = 'fadeInUp 0.3s ease-out';
    toast.style.pointerEvents = 'none';
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'fadeOutDown 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 1500);
  }
  
  // Add CSS animations for toast
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
    
    @keyframes fadeOutDown {
      from {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      to {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
      }
    }
    
    @keyframes floatUp {
      0% {
        opacity: 1;
        transform: translateY(0) rotate(0deg);
      }
      100% {
        opacity: 0;
        transform: translateY(-50px) rotate(20deg);
      }
    }
  `;
  document.head.appendChild(styleSheet);
  
  // Initialize wish interactions after wishes appear
  // Call this after showWishesWithStagger
  setTimeout(() => {
    addWishInteractions();
  }, 3000);