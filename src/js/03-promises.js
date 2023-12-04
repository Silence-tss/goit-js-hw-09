// import Notiflix from 'notiflix';

const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const { delay, step, amount} = event.currentTarget.elements;

  setTimeout (() => {
    for (let i = 1; i <= +amount.value; i++) {
      createPromise(i, (step.value * i))
      .then(data => console.log(data))
      .catch(error => console.log(error))
    }
  }, +delay.value)
}

function createPromise(position, delay) {
return new Promise ((resolve, reject) => {
setTimeout(() => {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    reject(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}, delay)
})

}

