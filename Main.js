document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  // Mobile Menu Toggle
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }

  // Persistent Light/Dark Theme Switcher
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.setAttribute("data-theme", savedTheme);
    if (themeToggleBtn) {
      themeToggleBtn.textContent = savedTheme === "light" ? "☀️ Light Mode" : "🌙 Dark Mode";
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isLight = document.body.getAttribute("data-theme") === "light";
      if (isLight) {
        document.body.removeAttribute("data-theme");
        localStorage.setItem("theme", "dark");
        themeToggleBtn.textContent = "🌙 Dark Mode";
      } else {
        document.body.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        themeToggleBtn.textContent = "☀️ Light Mode";
      }
    });
  }
});
// Interactive Canvas Background
const canvas = document.getElementById("bgCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particlesArray = [];

  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  setCanvasSize();
  window.addEventListener("resize", setCanvasSize);

  const mouse = {
    x: null,
    y: null,
    radius: 120
  };

  // Mouse & Touch events
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    addParticles(e.x, e.y);
  });

  window.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      addParticles(mouse.x, mouse.y);
    }
  });

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.color = `rgba(56, 189, 248, ${Math.random() * 0.8 + 0.2})`;
      this.life = 100; // Particle එක නොපෙනී යාමට
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= 2;
      if (this.size > 0.2) this.size -= 0.05;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(0, this.size), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function addParticles(x, y) {
    for (let i = 0; i < 3; i++) {
      particlesArray.push(new Particle(x, y));
    }
  }

  function handleParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();

      if (particlesArray[i].life <= 0 || particlesArray[i].size <= 0.2) {
        particlesArray.splice(i, 1);
        i--;
      }
    }
    requestAnimationFrame(handleParticles);
  }

  handleParticles();
}