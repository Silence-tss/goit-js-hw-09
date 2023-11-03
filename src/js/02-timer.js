import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const myTimer = document.querySelector(".timer");
const flatpickr = require("flatpickr");


function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }
  
  // Функція для перетворення мілісекунд на дні, години, хвилини і секунди
  function convertMs(ms) {
    // Кількість мілісекунд на одиницю часу
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Розрахунок залишкових днів, годин, хвилин і секунд
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor((ms % hour) / minute);
    const seconds = Math.floor((ms % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  // Створення об'єкта параметрів для flatpickr
  const options = {
    enableTime: true,
    time_24hr: true,
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      const currentDate = new Date();
      const startButton = document.querySelector('[data-start]');
  
      if (selectedDate <= currentDate) {
        window.alert("Please choose a date in the future");
        startButton.disabled = true;
      } else {
        startButton.disabled = false;
        startButton.addEventListener('click', startCountdown);
      }
    },
  };
  
  // Ініціалізація flatpickr на елементі input
  const datetimePicker = document.getElementById("datetime-picker");
  const fp = flatpickr(datetimePicker, options);
  
  // Обробник події натискання на кнопку "Start"
  const startButton = document.querySelector('[data-start]');
  startButton.addEventListener('click', startCountdown);
  
  // Функція для початку відліку часу
  function startCountdown() {
    // Отримати вибрану дату і час
    const selectedDate = fp.selectedDates[0];
    const currentDate = new Date();
  
    // Перевірити, чи вибрана дата валідна
    if (selectedDate <= currentDate) {
      window.alert("Please choose a date in the future");
    } else {
      // Заборонити подальший вибір дати
      fp.close();
  
      // Запустити таймер з оновленням щосекунди
      const timerInterval = setInterval(updateTimer, 1000);
  
      // Функція оновлення таймера
      function updateTimer() {
        const currentDate = new Date();
        const timeDifference = selectedDate - currentDate;
  
        // Перевірити, чи досягнута вибрана дата
        if (timeDifference <= 0) {
          clearInterval(timerInterval);
          startButton.disabled = true;
          updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          return;
        }
  
        // Отримати значення днів, годин, хвилин і секунд
        const { days, hours, minutes, seconds } = convertMs(timeDifference);
  
        // Оновити значення віджета таймера
        updateTimerDisplay({ days, hours, minutes, seconds });
      }
  
      // Функція для оновлення значень віджета таймера
      function updateTimerDisplay({ days, hours, minutes, seconds }) {
        document.querySelector('[data-days]').textContent = addLeadingZero(days);
        document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
        document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
        document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
      }
    }
  }