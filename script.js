const intro = document.getElementById("intro");
const scene = document.getElementById("scene");

const startBtn = document.getElementById("startBtn");
const replayBtn = document.getElementById("replayBtn");

const moneyLayer = document.getElementById("moneyLayer");

let audioContext = null;
let running = false;


/* ==================================
   AUDIO
================================== */

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


function tone(
  frequency,
  duration,
  type = "sine",
  volume = 0.035
) {

  if (!audioContext) return;

  const oscillator =
    audioContext.createOscillator();

  const gain =
    audioContext.createGain();

  oscillator.type = type;

  oscillator.frequency.setValueAtTime(
    frequency,
    audioContext.currentTime
  );

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


/* ==================================
   ENGINE SOUND
================================== */

function engine() {

  tone(
    55,
    0.8,
    "sawtooth",
    0.035
  );

  setTimeout(() => {

    tone(
      75,
      0.7,
      "sawtooth",
      0.04
    );

  }, 180);

}


/* ==================================
   DOOR SOUND
================================== */

function doorSound() {

  tone(
    180,
    0.18,
    "triangle",
    0.04
  );

}


/* ==================================
   MONEY SOUND
================================== */

function moneySound() {

  tone(
    80,
    .45,
    "sawtooth",
    .06
  );

  setTimeout(() => {

    tone(
      180,
      .2,
      "triangle",
      .045
    );

  }, 100);

}


/* ==================================
   MONEY SYSTEM
================================== */

function createMoney(amount = 55) {

  moneyLayer.innerHTML = "";

  for (
    let i = 0;
    i < amount;
    i++
  ) {

    const bill =
      document.createElement("div");

    bill.className = "bill";

    const x =
      Math.random() * 115 - 7;

    const y =
      Math.random() * 95 + 1;

    const rotation =
      Math.random() * 1000 - 500;

    const time =
      1.5 + Math.random() * 1.8;

    const scale =
      .7 + Math.random() * .9;

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
      "--time",
      `${time}s`
    );

    bill.style.setProperty(
      "--scale",
      scale
    );

    bill.textContent = "$";

    moneyLayer.appendChild(bill);

  }

}


/* ==================================
   RESET
================================== */

function resetScene() {

  running = false;

  scene.classList.remove(
    "active",
    "door-open",
    "rico-out",
    "impact",
    "zoom",
    "finished"
  );

  moneyLayer.innerHTML = "";

  intro.classList.remove("hide");

}


/* ==================================
   MAIN EXPERIENCE
================================== */

function startExperience() {

  if (running) return;

  running = true;

  initAudio();

  intro.classList.add("hide");


  /*
    0.3s
    Scene appears
  */

  setTimeout(() => {

    scene.classList.add("active");

  }, 300);


  /*
    1.2s
    Lamborghini arrives
  */

  setTimeout(() => {

    engine();

  }, 1200);


  /*
    2.4s
    Door opens
  */

  setTimeout(() => {

    scene.classList.add("door-open");

    doorSound();

  }, 2450);


  /*
    3.25s
    RICO exits
  */

  setTimeout(() => {

    scene.classList.add("rico-out");

    tone(
      220,
      .22,
      "square",
      .035
    );

  }, 3250);


  /*
    4.45s
    RICO hits the bonnet
  */

  setTimeout(() => {

    scene.classList.add("impact");

    tone(
      65,
      .45,
      "sawtooth",
      .06
    );

  }, 4450);


  /*
    4.7s
    Money explosion
  */

  setTimeout(() => {

    createMoney(60);

    moneySound();

  }, 4700);


  /*
    5.15s
    Cinematic camera push
  */

  setTimeout(() => {

    scene.classList.add("zoom");

  }, 5150);


  /*
    6.3s
    Final frame
  */

  setTimeout(() => {

    scene.classList.add("finished");

  }, 6300);

}


/* ==================================
   EVENTS
================================== */

startBtn.addEventListener(
  "click",
  startExperience
);

replayBtn.addEventListener(
  "click",
  resetScene
);
