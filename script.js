const intro = document.getElementById("intro");
const scene = document.getElementById("scene");

const startBtn = document.getElementById("startBtn");
const replayBtn = document.getElementById("replayBtn");

const moneyContainer = document.getElementById("moneyContainer");

let audioContext;


/* =========================
   SIMPLE SOUND ENGINE
========================= */

function initAudio() {
  if (!audioContext) {
    audioContext = new (
      window.AudioContext ||
      window.webkitAudioContext
    )();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
}

function sound(
  frequency = 120,
  duration = 0.15,
  type = "sine",
  volume = 0.04
) {

  if (!audioContext) return;

  const oscillator =
    audioContext.createOscillator();

  const gain =
    audioContext.createGain();

  oscillator.type = type;

  oscillator.frequency.value = frequency;

  gain.gain.setValueAtTime(
    volume,
    audioContext.currentTime
  );

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + duration
  );

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start();

  oscillator.stop(
    audioContext.currentTime + duration
  );
}


/* =========================
   MONEY
========================= */

function createMoney(amount = 35) {

  moneyContainer.innerHTML = "";

  for (let i = 0; i < amount; i++) {

    const bill =
      document.createElement("div");

    bill.className = "money";

    const x =
      Math.random() * 110 - 5;

    const y =
      Math.random() * 95 + 2;

    const rotation =
      Math.random() * 720 - 360;

    const duration =
      1.5 + Math.random() * 1.7;

    bill.style.setProperty(
      "--x",
      `${x}%`
    );

    bill.style.setProperty(
      "--y",
      `${y}%`
    );

    bill.style.setProperty(
      "--rotation",
      `${rotation}deg`
    );

    bill.style.setProperty(
      "--duration",
      `${duration}s`
    );

    bill.innerHTML = "$";

    moneyContainer.appendChild(bill);
  }
}


/* =========================
   MAIN SHOW
========================= */

function startShow() {

  initAudio();

  intro.classList.add("hide");

  setTimeout(() => {

    scene.classList.add("active");

    sound(65, 0.8, "sawtooth", 0.025);

  }, 350);


  /* Car arrives */

  setTimeout(() => {

    sound(90, 0.3, "sawtooth", 0.04);

  }, 1200);


  /* Door opens */

  setTimeout(() => {

    scene.classList.add("door-open");

    sound(160, 0.25, "triangle", 0.05);

  }, 2200);


  /* Rico exits */

  setTimeout(() => {

    scene.classList.add("rico-out");

    sound(220, 0.2, "square", 0.035);

  }, 3000);


  /* Money explosion */

  setTimeout(() => {

    createMoney(45);

    sound(70, 0.5, "sawtooth", 0.06);

    setTimeout(() => {
      sound(180, 0.25, "triangle", 0.04);
    }, 120);

  }, 4300);


  /* Final frame */

  setTimeout(() => {

    scene.classList.add("finished");

  }, 6100);
}


/* =========================
   RESET
========================= */

function resetShow() {

  scene.classList.remove(
    "active",
    "door-open",
    "rico-out",
    "finished"
  );

  moneyContainer.innerHTML = "";

  intro.classList.remove("hide");
}


/* =========================
   EVENTS
========================= */

startBtn.addEventListener(
  "click",
  startShow
);

replayBtn.addEventListener(
  "click",
  resetShow
);