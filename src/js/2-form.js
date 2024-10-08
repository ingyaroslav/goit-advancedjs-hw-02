'use strict';
const inputForm = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

let cachedValue;

try {
  cachedValue = JSON.parse(localStorage.getItem('feedback-form-state'));
} catch (error) {
  console.error('Error parsing cached value:', error);
  cachedValue = null;
}

if (cachedValue) {
  for (const key in cachedValue) {
    inputForm.elements[key].value = cachedValue[key];
    formData[key] = cachedValue[key];
  }
}

const fillLocalStorage = evt => {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(localStorageKey, JSON.stringify(formData).trim());
};

inputForm.addEventListener('input', fillLocalStorage);

inputForm.addEventListener('submit', evt => {
  evt.preventDefault();
  if (!inputForm.elements.email.value || !inputForm.elements.message.value) {
    alert('Fill please all fields');
  } else {
    console.log(formData);
    localStorage.removeItem(localStorageKey);
    formData.email = '';
    formData.message = '';
    inputForm.reset();
  }
});