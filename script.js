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

  yesBtn.style.transform = `scale(${1 + noClicks * 0.12})`;

  if (noClicks > 3) {
    noBtn.innerText = "Nice try 😅";
  }
}

function accept() {
  document.body.innerHTML = `
    <div class="card">
      <div class="top-heart">💘</div>
      <h1>YAY! 🥹</h1>
      <p class="text">
        You just became<br>
        my official Valentine 💖<br><br>
        Thank you for being you.
      </p>
    </div>
  `;
}
