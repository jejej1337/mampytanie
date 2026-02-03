let tries = 0;

function escape() {
  const noBtn = document.querySelector(".no-btn");
  const yesBtn = document.querySelector(".yes-btn");
  tries++;

  const x = Math.random() * (window.innerWidth - 140);
  const y = Math.random() * (window.innerHeight - 60);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  yesBtn.style.transform = `scale(${1 + tries * 0.12})`;

  if (tries > 3) {
    noBtn.innerText = "Not happening 😄";
  }
}

function accept() {
  startConfetti();

  document.querySelector(".card").innerHTML = `
    <div class="heart">💘</div>
    <h1>YES! 🥹❤️</h1>
    <p class="subtitle">You're officially my Valentine 💖</p>
  `;
}

/* ------------------ CONFETTI ------------------ */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let confettiPieces = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function startConfetti() {
  confettiPieces = Array.from({ length: 200 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    r: Math.random() * 6 + 4,
    vx: (Math.random() - 0.5) * 2.5,
    vy: Math.random() * 3 + 2,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.2
  }));
  runConfetti();
  setTimeout(() => confettiPieces = [], 4000);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const p of confettiPieces) {
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;

    if (p.y > canvas.height + 20) {
      p.y = -20;
      p.x = Math.random() * canvas.width;
    }

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = `hsl(${Math.random()*360}, 80%, 55%)`;
    ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r*1.4);
    ctx.restore();
  }

  if (confettiPieces.length) requestAnimationFrame(draw);
}

function runConfetti() {
  requestAnimationFrame(draw);
}
