const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

// Utils

const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.classList.add('error');
  const small = formControl.querySelector('small');
  small.innerText = message;
};

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.classList.remove('error');
  formControl.classList.add('success');
};

const getSentenceCaseWord = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

// Checks

const checkRequired = (inputs) => {
  inputs.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getSentenceCaseWord(input.id)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getSentenceCaseWord(input.id)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getSentenceCaseWord(input.id)} must be at most ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

const checkEmail = (input) => {
  if (
    !String(input.value.trim())
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    showError(input, `${getSentenceCaseWord(input.id)} is not valid`);
  } else {
    showSuccess(input);
  }
};

const checkPasswordsMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(password2, 'Passwords do not match');
  } else if (input2.value.trim() !== '') {
    showSuccess(input2);
  }
};

// Event listener

form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 8, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
