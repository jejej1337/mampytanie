let tries = 0;
const MAX_TRIES = 10; // ile razy ma uciec zanim zniknie

function escape() {
  const noBtn = document.querySelector(".no-btn");
  const yesBtn = document.querySelector(".yes-btn");
  if (!noBtn || !yesBtn) return;

  tries++;

  // losowa pozycja (żeby nie wychodził poza ekran)
  const x = Math.random() * (window.innerWidth - 160);
  const y = Math.random() * (window.innerHeight - 80);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${Math.max(10, x)}px`;
  noBtn.style.top = `${Math.max(10, y)}px`;

  // TAK rośnie powoli
  yesBtn.style.transform = `scale(${1 + tries * 0.1})`;

  // zmieniające się teksty (Twoje)
  if (tries === 3) noBtn.innerText = "Czemu chcesz mnie kliknąć????";
  if (tries === 5) noBtn.innerText = "Serio poddaj się";
  if (tries === 7) noBtn.innerText = "Nie ma szans, nie próbuj";
  if (tries === 9) noBtn.innerText = "Mówiłem🤭🤭🤭, teraz nie masz wyjścia❤️";

  // po długim czasie: znikanie
  if (tries >= MAX_TRIES) {
    noBtn.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    noBtn.style.opacity = "0";
    noBtn.style.transform = "scale(0.5)";
    noBtn.style.pointerEvents = "none";
  }
}

function accept() {
  startConfetti(); // teraz już istnieje

  // działa zarówno gdy masz .center (minimalistyczny układ),
  // jak i gdybyś wrócił do .card
  const target = document.querySelector(".center") || document.querySelector(".card");
  if (!target) return;

  target.innerHTML = `
    <div class="emoji">💘</div>
    <h1>TAAAAAK!!!🥹<br><span>JESTEM NAJSZCZĘŚLIWSZYM CZŁOWIEKIEM NA ZIEMI!!!!</span></h1>
    <p style="margin: 0; color:#444; font-size:14px;">
      Oficjalnie zostałaś<br>
      <b>MOJĄ WALENTYNKĄ💞💞💞</b>
      Widzimy się na randeczce, Kocham Cię!😽😽
    </p>
  `;
}

/* ---------- CONFETTI (działa zawsze) ---------- */
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

function startConfetti() {
  if (!canvas || !ctx) return;

  confettiRunning = true;
  confettiPieces = Array.from({ length: 240 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    w: Math.random() * 7 + 4,
    h: Math.random() * 10 + 6,
    vx: (Math.random() - 0.5) * 2.8,
    vy: Math.random() * 3.2 + 2,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.22
  }));

  requestAnimationFrame(drawConfetti);

  // wyłącz po chwili
  setTimeout(() => {
    confettiRunning = false;
    confettiPieces = [];
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 4200);
}

function drawConfetti() {
  if (!canvas || !ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const p of confettiPieces) {
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;

    // respawn z góry
    if (p.y > canvas.height + 30) {
      p.y = -30;
      p.x = Math.random() * canvas.width;
    }

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);

    // losowy kolor (HSL)
    ctx.fillStyle = `hsl(${Math.random() * 360}, 85%, 60%)`;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);

    ctx.restore();
  }

  if (confettiRunning) requestAnimationFrame(drawConfetti);
}



