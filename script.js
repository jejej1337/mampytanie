let tries = 0;
const MAX_TRIES = 10;

function escape() {
  const noBtn = document.querySelector(".no-btn");
  const yesBtn = document.querySelector(".yes-btn");
  if (!noBtn || !yesBtn) return;

  tries++;

  const x = Math.random() * (window.innerWidth - 160);
  const y = Math.random() * (window.innerHeight - 80);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${Math.max(10, x)}px`;
  noBtn.style.top = `${Math.max(10, y)}px`;

  yesBtn.style.transform = `scale(${1 + tries * 0.1})`;

  if (tries === 3) noBtn.innerText = "Czemu chcesz mnie kliknąć????";
  if (tries === 5) noBtn.innerText = "I tak klikniesz Tak";
  if (tries === 7) noBtn.innerText = "Nie ma szans, nie próbuj";
  if (tries === 9) noBtn.innerText = "Mówiłem🤭🤭🤭, teraz nie masz wyjścia❤️";

  if (tries >= MAX_TRIES) {
    noBtn.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    noBtn.style.opacity = "0";
    noBtn.style.transform = "scale(0.5)";
    noBtn.style.pointerEvents = "none";
  }
}

function accept() {
  startConfetti(); 

  const target = document.querySelector(".center") || document.querySelector(".card");
  if (!target) return;

  target.innerHTML = `
    <div class="emoji">💘</div>
    <h1>TAAAAAK!!!🥹<br><span>JESTEM ULTRA HAPI!!!!!</span></h1>
    <p style="margin: 0; color:#444; font-size:14px;">
      Oficjalnie zostałaś<br>
      <b>MOJĄ WALENTYNKĄ💞💞💞</b><br>
      Widzimy się na randeczce, Kocham Cię Kinga!😽😽
    </p>
  `;
}


const canvas = document.getElementById("confetti");
const ctx = canvas ? canvas.getContext("2d") : null;

let confettiPieces = [];
let confettiRunning = false;

function resize() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function createHeartPiece() {
  return {
    x: Math.random() * canvas.width,
    y: -Math.random() * canvas.height, 
    size: Math.random() * 10 + 10,     
    vx: (Math.random() - 0.5) * 1.2,   
    vy: Math.random() * 1.8 + 1.2,     
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.03,  
    hue: Math.random() * 25 + 340      
  };
}

function startConfetti() {
  if (!canvas || !ctx) return;
  if (confettiRunning) return; 

  confettiRunning = true;

  
  confettiPieces = Array.from({ length: 180 }, () => createHeartPiece());

  requestAnimationFrame(drawConfetti);
}

function drawHeart(x, y, size, rotation, hue) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  
  ctx.beginPath();
  const s = size;

  
  ctx.moveTo(0, -s * 0.25);
  ctx.bezierCurveTo(s * 0.5, -s * 0.8, s * 1.1, -s * 0.05, 0, s * 0.9);
  ctx.bezierCurveTo(-s * 1.1, -s * 0.05, -s * 0.5, -s * 0.8, 0, -s * 0.25);

  
  ctx.fillStyle = `hsl(${hue}, 85%, 62%)`;
  ctx.fill();

  
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.ellipse(-s * 0.18, -s * 0.15, s * 0.18, s * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.restore();
}

function drawConfetti() {
  if (!confettiRunning || !canvas || !ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < confettiPieces.length; i++) {
    const p = confettiPieces[i];

    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;

    
    if (p.y > canvas.height + 40) {
      confettiPieces[i] = createHeartPiece();
      confettiPieces[i].y = -20;
    }

    
    if (p.x < -50) p.x = canvas.width + 50;
    if (p.x > canvas.width + 50) p.x = -50;

    drawHeart(p.x, p.y, p.size, p.rot, p.hue);
  }

  requestAnimationFrame(drawConfetti);
}



