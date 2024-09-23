// Функции
export function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig)
  })
};

export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, submitButton, validationConfig);

  inputList.forEach((inputElement) => {
      inputElement.classList.remove(validationConfig.inputErrorClass);
      const inputError = formElement.querySelector(`.${inputElement.id}-error`);

      inputError.classList.remove(validationConfig.errorClass);
      inputError.textContent = '';
  })
};

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, submitButton, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, validationConfig);
        toggleButtonState(inputList, submitButton, validationConfig);
      })
  })
};

function checkInputValidity(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  }
  else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

function showInputError(formElement, inputElement, errorMessage, validationConfig) {
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  inputError.textContent = errorMessage;
  inputError.classList.add(validationConfig.errorClass);
};

function hideInputError(formElement, inputElement, validationConfig) {
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  inputElement.setCustomValidity("");
  inputError.classList.remove(validationConfig.errorClass);
  inputError.textContent = '';
};

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  })
};
