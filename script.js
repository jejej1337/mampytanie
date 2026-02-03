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
    noBtn.innerText = "Not an option 😌";
  }
}

function accept() {
  document.body.innerHTML = `
    <div class="container">
      <div class="card">
        <div class="heart">💘</div>
        <h1>Yay!</h1>
        <p class="subtitle">
          You are officially<br>
          my Valentine ❤️<br><br>
          See you for hugs soon.
        </p>
      </div>
    </div>
  `;
}
