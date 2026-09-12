const startBtn = document.getElementById("startBtn");
const replayBtn = document.getElementById("replay");

const intro = document.getElementById("intro");
const scene = document.getElementById("scene");
const camera = document.getElementById("camera");
const money = document.getElementById("money");

let timers = [];

function wait(fn, time) {
  const timer = setTimeout(fn, time);
  timers.push(timer);
}

function clearTimers() {
  timers.forEach(clearTimeout);
  timers = [];
}


/* =========================
   SIMPLE AUDIO ENGINE
========================= */

let audioContext;

function startAudio() {
  try {
    audioContext = new (
      window.AudioContext ||
      window.webkitAudioContext
    )();

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = 55;

    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.08,
      audioContext.currentTime + 0.15
    );
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      audioContext.currentTime + 1.4
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1.5);

  } catch (error) {
    console.log("Audio unavailable");
  }
}


/* =========================
   MONEY GENERATOR
========================= */

function createMoney() {

  money.innerHTML = "";

  for (let i = 0; i < 42; i++) {

    const bill = document.createElement("div");

    bill.className = "bill";

    const x = Math.random() * 115 - 7;
    const y = 15 + Math.random() * 65;

    const rotation =
      Math.floor(Math.random() * 1000) - 500;

    const time =
      1.2 + Math.random() * 1.4;

    bill.style.setProperty("--x", `${x}%`);
    bill.style.setProperty("--y", `${y}%`);
    bill.style.setProperty("--r", `${rotation}deg`);
    bill.style.setProperty("--time", `${time}s`);

    money.appendChild(bill);
  }
}


/* =========================
   START SEQUENCE
========================= */

function startScene() {

  clearTimers();

  intro.classList.add("hide");

  wait(() => {
    scene.classList.add("active");
    startAudio();
  }, 500);

  /* HEADLIGHT / ENGINE */
  wait(() => {
    scene.classList.add("door-open");
  }, 1250);

  /* RICO EXITS */
  wait(() => {
    scene.classList.add("rico-enter");
  }, 1900);

  /* RICO WALKS */
  wait(() => {
    scene.classList.add("rico-walk");
  }, 2850);

  /* SMOKE */
  wait(() => {
    scene.classList.add("smoke");
  }, 3100);

  /* RICO SITS */
  wait(() => {
    scene.classList.add("rico-sit");
  }, 4050);

  /* CAMERA HIT */
  wait(() => {
    camera.classList.add("shake");
  }, 4700);

  /* MONEY */
  wait(() => {
    createMoney();
    money.classList.add("burst");
  }, 4750);

  /* CAMERA PUSH */
  wait(() => {
    camera.classList.add("zoom");
  }, 5000);

  /* FINAL */
  wait(() => {
    scene.classList.add("final");
  }, 6150);
}


/* =========================
   REPLAY
========================= */

function replay() {

  clearTimers();

  scene.className = "";
  camera.className = "";
  money.className = "";

  money.innerHTML = "";

  intro.classList.remove("hide");

  setTimeout(() => {
    scene.classList.remove("active");
  }, 500);
}


/* =========================
   EVENTS
========================= */

startBtn.addEventListener("click", startScene);

replayBtn.addEventListener("click", replay);


/* =========================
   PREVENT DOUBLE-TAP ZOOM
========================= */

document.addEventListener(
  "dblclick",
  event => event.preventDefault()
);