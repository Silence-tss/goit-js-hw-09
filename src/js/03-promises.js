import Notiflix from 'notiflix';

const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const { delay, step, amount} = event.currentTarget.elements;

  setTimeout (() => {
    for (let i = 1; i <= +amount.value; i++) {
      createPromise(i, (step.value * i))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    }
  }, +delay.value)
}

function createPromise(position, delay) {
return new Promise ((resolve, reject) => {
setTimeout(() => {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    resolve({ position, delay });
  } else {
    reject({ position, delay });;
  }
}, delay)
})

}

