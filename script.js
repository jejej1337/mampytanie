let tries = 0;
const MAX_TRIES = 10; 

function escape() {
  const noBtn = document.querySelector(".no-btn");
  const yesBtn = document.querySelector(".yes-btn");

  tries++;

  // losowa pozycja
  const x = Math.random() * (window.innerWidth - 140);
  const y = Math.random() * (window.innerHeight - 60);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  // TAK rośnie powoli
  yesBtn.style.transform = `scale(${1 + tries * 0.1})`;

  // zmieniające się teksty
  if (tries === 3) noBtn.innerText = "Czemu chczesz mnie kliknąć????";
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
  startConfetti();

  document.querySelector(".card").innerHTML = `
    <div class="heart">💘</div>
    <h1>TAAAAAK!!!🥹</h1>
    <p class="subtitle">
      Oficjalnie zostałaś<br>
      MOJĄ WALENTYNKĄ!💞
    </p>
  `;
}

/* ---------- CONFETTI ---------- */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let confettiPieces = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

func


