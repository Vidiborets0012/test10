import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";  // імпорт стилів для flatpickr

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";  // імпорт стилів для iziToast

// Отримуємо елементи з DOM
const startButton = document.querySelector('button[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

// Змінні для обраної дати і таймера
let userSelectedDate = null;
let timerId = null;

// Налаштування для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
};

// Ініціалізація flatpickr
flatpickr("#datetime-picker", options);

// Додаємо слухач подій на кнопку старту таймера
startButton.addEventListener('click', () => {
  if (!userSelectedDate) return;

  startButton.disabled = true;
  document.querySelector('#datetime-picker').disabled = true;
  timerId = setInterval(updateCountdown, 1000);
});

// Функція для оновлення таймера
function updateCountdown() {
  const now = new Date().getTime(); // Отримуємо поточний час у мілісекундах
  const timeLeft = userSelectedDate.getTime() - now; // Обчислюємо різницю

  // Перевірка на завершення таймера
  if (timeLeft <= 0) {
    clearInterval(timerId);
    document.querySelector('#datetime-picker').disabled = false;
    startButton.disabled = true;
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }

  // Конвертуємо мілісекунди в дні, години, хвилини і секунди
  const { days, hours, minutes, seconds } = convertMs(timeLeft);

  // Оновлюємо інтерфейс
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

// Функція для конвертації мілісекунд
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функція для додавання нуля перед числом, якщо воно менше двох символів
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// *************************************************************

// const startButton = document.querySelector('button[data-start]');
// const daysEl = document.querySelector('[data-days]');
// const hoursEl = document.querySelector('[data-hours]');
// const minutesEl = document.querySelector('[data-minutes]');
// const secondsEl = document.querySelector('[data-seconds]');
// let userSelectedDate = null;
// let timerId = null;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     const selectedDate = selectedDates[0];
//     if (selectedDate <= new Date()) {
//       iziToast.error({
//         title: 'Error',
//         message: 'Please choose a date in the future',
//       });
//       startButton.disabled = true;
//     } else {
//       userSelectedDate = selectedDate;
//       startButton.disabled = false;
//     }
//   },
// };

// flatpickr("#datetime-picker", options);

// startButton.addEventListener('click', () => {
//   if (!userSelectedDate) return;

//   startButton.disabled = true;
//   document.querySelector('#datetime-picker').disabled = true;
//   timerId = setInterval(updateCountdown, 1000);
// });

// function updateCountdown() {
//   const now = new Date();
//   const timeLeft = userSelectedDate - now;

//   if (timeLeft <= 0) {
//     clearInterval(timerId);
//     document.querySelector('#datetime-picker').disabled = false;
//     startButton.disabled = true;
//     return;
//   }

//   const { days, hours, minutes, seconds } = convertMs(timeLeft);

//   daysEl.textContent = addLeadingZero(days);
//   hoursEl.textContent = addLeadingZero(hours);
//   minutesEl.textContent = addLeadingZero(minutes);
//   secondsEl.textContent = addLeadingZero(seconds);
// }

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = Math.floor(ms / day);
//   const hours = Math.floor((ms % day) / hour);
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }