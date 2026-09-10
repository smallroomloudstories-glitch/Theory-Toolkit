const page = document.querySelector("main");
const destination = page.dataset.destination;
const countdown = document.querySelector("#countdown");
let seconds = 10;

const timer = window.setInterval(() => {
  seconds -= 1;
  countdown.textContent = String(seconds);
  if (seconds <= 0) {
    window.clearInterval(timer);
    window.location.replace(destination);
  }
}, 1000);
