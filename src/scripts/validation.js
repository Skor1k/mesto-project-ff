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


// export function enableValidation (validationConfig) {
//   const formList = Array.from(
//     document.querySelectorAll(validationConfig.formSelector),
//   );
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(
//       formElement,
//       validationConfig.inputSelector,
//       validationConfig.inputErrorClass,
//       validationConfig.errorClass,
//       validationConfig.submitButtonSelector,
//       validationConfig.inactiveButtonClass,
//     );
//   });
// };

// export function clearValidation (formElement, validationConfig) {
//   const inputList = Array.from(
//     formElement.querySelectorAll(validationConfig.inputSelector),
//   );
//   const buttonElement = formElement.querySelector(
//     validationConfig.submitButtonSelector,
//   );
//   buttonElement.classList.add(validationConfig.inactiveButtonClass);
//   inputList.forEach((inputElement) => {
//     hideInputError(
//       formElement,
//       inputElement,
//       validationConfig.inputErrorClass,
//       validationConfig.errorClass,
//     );
//     inputElement.setCustomValidity('');
//   });
// };

// function setEventListeners (
//   formElement,
//   inputSelector,
//   inputErrorClass,
//   errorClass,
//   submitButtonSelector,
//   inactiveButtonClass,
// ) {
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   const buttonElement = formElement.querySelector(submitButtonSelector);
//   toggleButtonState(inputList, buttonElement, inactiveButtonClass);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(
//         formElement,
//         inputElement,
//         inputErrorClass,
//         errorClass,
//       );
//       toggleButtonState(inputList, buttonElement, inactiveButtonClass);
//     });
//   });
// };

// function checkInputValidity (
//   formElement,
//   inputElement,
//   inputErrorClass,
//   errorClass,
// ) {
//   if (inputElement.validity.patternMismatch) {
//     inputElement.setCustomValidity(inputElement.dataset.errorMessage);
//   } else {
//     inputElement.setCustomValidity('');
//   }

//   if (!inputElement.validity.valid) {
//     showInputError(
//       formElement,
//       inputElement,
//       inputElement.validationMessage,
//       inputErrorClass,
//       errorClass,
//     );
//   } else {
//     hideInputError(formElement, inputElement, inputErrorClass, errorClass);
//   }
// };

// function showInputError (
//   formElement,
//   inputElement,
//   errorMessage,
//   inputErrorClass,
//   errorClass,
// ) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(inputErrorClass);
//   inputElement.setCustomValidity('');
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(errorClass);
// };

// function hideInputError (
//   formElement,
//   inputElement,
//   inputErrorClass,
//   errorClass,
// ) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.classList.remove(errorClass);
//   errorElement.textContent = '';
// };

// function toggleButtonState (inputList, buttonElement, inactiveButtonClass) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(inactiveButtonClass);
//     buttonElement.disabled = true;
//   } else {
//     buttonElement.classList.remove(inactiveButtonClass);
//     buttonElement.disabled = false;
//   }
// };

// function hasInvalidInput (inputList) {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };





