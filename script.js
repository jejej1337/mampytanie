let noClicks = 0;

function escape() {
  const noBtn = document.querySelector(".no-btn");
  const yesBtn = document.querySelector(".yes-btn");

  noClicks++;

  const x = Math.random() * (window.innerWidth - 120);
  const y = Math.random() * (window.innerHeight - 50);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  yesBtn.style.transform = `scale(${1 + noClicks * 0.15})`;

  if (noClicks > 4) {
    noBtn.innerText = "This is pointless 😅";
  }
}

function accept() {
  document.body.innerHTML = `
    <div class="card">
      <h1>YAY!!! 💖</h1>
      <p class="text">
        You just made me<br>
        the happiest person today 🥹<br><br>
        Officially:<br>
        💘 My Valentine 💘
      </p>
    </div>
  `;
}
