const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

let messageIndex = 0;
const messages = [
  "NIE 😶",
  "Ej nooo 🥺",
  "Dobra, a jak dam buzi? 😘",
  "To ja zrobię kolację 😇",
  "Nie uciekaj ode mnie jak moje obowiązki 😭",
  "Ostatnia szansa (serio) 😳",
  "Ja: romantyk. Ty: proszę kliknij TAK 💘",
  "No weź, ja się starałem 😤❤️"
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function moveNoButton() {
  // losuj pozycję w obrębie okna, ale żeby przycisk nie wychodził poza ekran
  const padding = 16;
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = window.innerWidth - btnRect.width - padding;
  const maxY = window.innerHeight - btnRect.height - padding;

  const x = randomInt(padding, Math.max(padding, maxX));
  const y = randomInt(padding, Math.max(padding, maxY));

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function handleNo() {
  noBtn.textContent = messages[messageIndex];
  messageIndex = (messageIndex + 1) % messages.length;

  // rośnie TAK (delikatnie, ale skutecznie 😈)
  const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
  yesBtn.style.fontSize = `${Math.min(currentSize * 1.18, 56)}px`;

  moveNoButton();
}

noBtn.addEventListener("mouseenter", handleNo);
noBtn.addEventListener("click", handleNo);

yesBtn.addEventListener("click", () => {
  showSuccess();
  startConfetti();
});

function showSuccess() {
  document.querySelector(".card").innerHTML = `
    <div class="heart">💘</div>
    <h1>YESSS! 🥹❤️</h1>
    <p class="sub">
      Dziękuję, że jesteś. <br/>
      Oficjalnie: jesteś moją Walentynką 😌✨
    </p>
    <p class="sub" style="margin-top:10px;">
      Teraz proszę tylko o jedno: <b>przytul</b> przy najbliższej okazji 🤝❤️
    </p>
  `;
}

/* --- konfetti (proste i lekkie) --- */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let confettiPieces = [];
let confettiRunning = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function startConfetti() {
  confettiRunning = true;
  confettiPieces = Array.from({ length: 180 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    r: Math.random() * 6 + 3,
    vx: (Math.random() - 0.5) * 2.2,
    vy: Math.random() * 3 + 2,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.2
  }));
  requestAnimationFrame(drawConfetti);

  // po chwili wyłącz, żeby nie mielić bez końca
  setTimeout(() => (confettiRunning = false), 4200);
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // nie ustawiamy kolorów "na sztywno" w stylu brandu — ale konfetti musi mieć kolory,
  // więc wykorzystujemy HSL losowo.
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
    ctx.fillStyle = `hsl(${Math.floor(Math.random() * 360)}, 90%, 60%)`;
    ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.4);
    ctx.restore();
  }

  if (confettiRunning) requestAnimationFrame(drawConfetti);
}
