const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const bodySite = document.querySelector("body");
let timerId = null;


buttonStart.addEventListener("click", onClickButtonStart);

function onClickButtonStart() {
    // buttonStart.classList.toggle("active").disabled = true;
    timerId = setInterval(() => {
    bodySite.style.backgroundColor= getRandomHexColor()}, 1000);
    buttonStart.disabled = true;
    buttonStop.disabled = false;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};

buttonStop.addEventListener("click", onClickButtonStop);

function onClickButtonStop() {
    clearInterval(timerId);
    buttonStart.disabled = false;
    buttonStop.disabled = true;
}

