'use strict';

import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import svgUrlX from '../img/x.svg';

const dateTime = document.querySelector('input#datetime-picker');
const startButton = document.querySelector('button[data-start]');

startButton.disabled = true;

let userSelectedDate;

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

const timer = {
  activeTimerID: null,

  timerElements: {
    days: document.querySelector('.value[data-days]'),
    hours: document.querySelector('.value[data-hours]'),
    minutes: document.querySelector('.value[data-minutes]'),
    seconds: document.querySelector('.value[data-seconds]'),
  },

  start() {
    startButton.disabled = true;
    dateTime.disabled = true;
    this.activeTimerID = setInterval(() => {
      const rawDiff = userSelectedDate.getTime() - Date.now();
      if (rawDiff <= 0) {
        this.stop();
        dateTime.disabled = false;
      } else {
        const finishDiff = convertMs(rawDiff);
        for (const key in this.timerElements) {
          this.timerElements[key].textContent = String(
            finishDiff[key]
          ).padStart(2, '0');
        }
      }
    }, 1000);
  },

  stop() {
    clearInterval(this.activeTimerID);
  },
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      startButton.disabled = true;
      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#ffffff',
        color: '#EF4040',
        position: 'topRight',
        displayMode: 1,
        iconUrl: `${svgUrlX}`,
      });
    } else {
      startButton.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr(dateTime, options);

startButton.addEventListener('click', evt => {
  timer.start();
});