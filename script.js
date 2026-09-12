const startBtn = document.getElementById("startBtn");
const replayBtn = document.getElementById("replay");

const intro = document.getElementById("intro");
const scene = document.getElementById("scene");
const camera = document.getElementById("camera");
const money = document.getElementById("money");

let timers = [];
let audioContext;


/* =========================
   TIMER
========================= */

function wait(fn, ms){

  const timer = setTimeout(fn, ms);

  timers.push(timer);
}

function clearTimers(){

  timers.forEach(clearTimeout);

  timers = [];
}


/* =========================
   AUDIO
========================= */

function startAudio(){

  try{

    audioContext = new (
      window.AudioContext ||
      window.webkitAudioContext
    )();

    const oscillator =
      audioContext.createOscillator();

    const gain =
      audioContext.createGain();

    oscillator.type = "sawtooth";

    oscillator.frequency.setValueAtTime(
      48,
      audioContext.currentTime
    );

    gain.gain.setValueAtTime(
      .0001,
      audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      .055,
      audioContext.currentTime + .12
    );

    gain.gain.exponentialRampToValueAtTime(
      .0001,
      audioContext.currentTime + 1.5
    );

    oscillator.connect(gain);

    gain.connect(
      audioContext.destination
    );

    oscillator.start();

    oscillator.stop(
      audioContext.currentTime + 1.55
    );

  }catch(error){

    console.log(
      "Audio unavailable"
    );

  }
}


/* =========================
   MONEY
========================= */

function createMoney(){

  money.innerHTML = "";

  for(let i = 0; i < 48; i++){

    const bill =
      document.createElement("div");

    bill.className = "bill";

    const x =
      Math.random() * 120 - 10;

    const y =
      10 + Math.random() * 70;

    const rotation =
      Math.floor(
        Math.random() * 1100
      ) - 550;

    const time =
      1.1 + Math.random() * 1.5;

    bill.style.setProperty(
      "--x",
      `${x}%`
    );

    bill.style.setProperty(
      "--y",
      `${y}%`
    );

    bill.style.setProperty(
      "--r",
      `${rotation}deg`
    );

    bill.style.setProperty(
      "--time",
      `${time}s`
    );

    money.appendChild(bill);
  }
}


/* =========================
   MAIN SEQUENCE
========================= */

function startScene(){

  clearTimers();

  scene.className = "";
  camera.className = "";
  money.className = "";

  money.innerHTML = "";

  intro.classList.add("hide");


  /* SCENE */

  wait(() => {

    scene.classList.add("active");

    startAudio();

  }, 500);


  /* HEADLIGHTS */

  wait(() => {

    scene.classList.add("lights");

  }, 950);


  /* DOOR */

  wait(() => {

    scene.classList.add("door-open");

  }, 1450);


  /* RICO ENTERS */

  wait(() => {

    scene.classList.add("rico-enter");

  }, 1950);


  /* RICO WALKS */

  wait(() => {

    scene.classList.add("rico-walk");

  }, 2850);


  /* SMOKE */

  wait(() => {

    scene.classList.add("smoke");

  }, 3150);


  /* BONNET */

  wait(() => {

    scene.classList.add("rico-sit");

  }, 4050);


  /* IMPACT */

  wait(() => {

    camera.classList.add("shake");

  }, 4650);


  /* CASH */

  wait(() => {

    createMoney();

    money.classList.add("burst");

  }, 4750);


  /* CAMERA PUSH */

  wait(() => {

    camera.classList.add("zoom");

  }, 5050);


  /* FINAL FRAME */

  wait(() => {

    scene.classList.add("final");

  }, 6250);

}


/* =========================
   REPLAY
========================= */

function replay(){

  clearTimers();

  scene.className = "";

  camera.className = "";

  money.className = "";

  money.innerHTML = "";

  intro.classList.remove("hide");

  setTimeout(() => {

    scene.classList.remove(
      "active"
    );

  }, 500);
}


/* =========================
   EVENTS
========================= */

startBtn.addEventListener(
  "click",
  startScene
);

replayBtn.addEventListener(
  "click",
  replay
);


/* =========================
   PREVENT DOUBLE TAP ZOOM
========================= */

document.addEventListener(
  "dblclick",
  e => e.preventDefault()
);