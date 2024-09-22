// Импорт файлов
import './pages/index.css';
import { likeCard, deleteCard } from './scripts/card.js';
import { renderLoading } from './scripts/utils.js';
import { openModal, closeModal, closeOverlayModal } from './scripts/modal.js';
import { clearValidation, enableValidation } from './scripts/validation.js';
import { getInitialInfo, postNewCard, updateUserAvatar, updateUserProfile, deleteCard as deleteCardFromServer } from './scripts/api.js';

// Контейнер для карточек
const placesList = document.querySelector('.places__list');
// Карточки
const newCardButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardForm = document.forms['new-place'];
const popupImageElement = document.querySelector('.popup_type_image');
const popupImage = popupImageElement.querySelector('.popup__image');
const popupCaption = popupImageElement.querySelector('.popup__caption');
// Аватар
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupAvatarForm = document.forms['edit-avatar'];
const avatarEditButton = document.querySelector('.profile__image-container');
const popupConfirm = document.querySelector('.popup_type_confirm');
const popupConfirmButton = popupConfirm.querySelector('.popup__button');
// Профиль
const popupProfile = document.querySelector('.popup_type_edit');
const popupEditProfile = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const profileEditButton = document.querySelector('.profile__edit-button');

// Валидация
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

let userId;

// Инициализация
getInitialInfo()
  .then((result) => {
    const userInfo = result[0];
    userId = userInfo._id;
    const initialCards = result[1];
    fillProfileInfo(userInfo);
    renderInitialCards(initialCards, userId);
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(validationConfig);

// Расположение карточки
function renderCard (
  item,
  userId,
  container,
  likeCard,
  deleteCard,
  openImage,
  place = 'end',
) {
  const cardElement = createCard(
    item,
    userId,
    deleteCard,
    likeCard,
    openImage,
  );
  if (place === 'end') {
    container.append(cardElement);
  } else {
    container.prepend(cardElement);
  }
};

// Аватар
function fillProfileInfo (userInfo) {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileAvatar.setAttribute('style', `background-image: url(${userInfo.avatar})`);
};

// Карточки на странице
function renderInitialCards (initialCards, userId) {
  initialCards.forEach((card) => {
    renderCard(card, userId, placesList, likeCard, openConfirmationForm, openImagePopup);
  });
};

// Попап для картинки карточки
function openImagePopup (imageURL, imageAlt, title) {
  popupImage.src = imageURL;
  popupImage.alt = imageAlt;
  popupCaption.textContent = title;
  openModal(popupImageElement);
};

// Удаление карточки
function handleConfirmDelete (evt) {
  deleteCardFromServer(popupConfirm.dataset.cardId)
    .then((result) => {
      const card = document.querySelector(
        `[data-card-id='${popupConfirm.dataset.cardId}']`,
      );
      card.remove();
      closeModal(popupConfirm);
    })
    .catch((err) => {
      console.log(err);
    });
};

function openConfirmationForm (evt, cardId) {
  openModal(popupConfirm);
  popupConfirm.dataset.cardId = cardId;
};

// Редактирование профиля
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  renderLoading(popupEditProfile, 'Сохранение...');
  updateUserProfile({
    name: popupEditProfile.name.value,
    about: popupEditProfile.description.value,
  })
    .then((updatedProfile) => {
      fillProfileInfo(updatedProfile);
      closeModal(popupProfile);
      clearValidation(popupEditProfile, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(popupEditProfile, 'Сохранить');
    });
};

// Редактирование аватара
function handleAvatarFormSubmit (evt) {
  evt.preventDefault();
  renderLoading(popupAvatarForm, 'Сохранение...');
  updateUserAvatar(popupAvatarForm.link.value)
    .then((updatedProfile) => {
      fillProfileInfo(updatedProfile);
      closeModal(popupAvatar);
      clearValidation(popupAvatarForm, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(popupAvatarForm, 'Сохранить');
    });
};

// Добавление новой карточки
function handleNewCardFormSubmit (evt) {
  evt.preventDefault();
  renderLoading(popupNewCardForm, 'Сохранение...');
  const name = popupNewCardForm.elements['place-name'].value;
  const link = popupNewCardForm.elements.link.value;
  postNewCard({ name, link })
    .then((newCard) => {
      renderCard(
        newCard,
        userId,
        placesList,
        likeCard,
        openConfirmationForm,
        openImagePopup,
        'start',
      );
      closeModal(popupNewCard);
      popupNewCardForm.reset();
      clearValidation(popupNewCardForm, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(popupNewCardForm, 'Сохранить');
    });
};

// Попап профиля
function fillProfilePopup (form, name, description) {
  form.elements.name.value = name;
  form.elements.description.value = description;
};

// Слушатели
// Попап картинки
popupImageElement.addEventListener('click', (evt) => {
  closeOverlayModal(evt);
});

// Профиль
profileEditButton.addEventListener('click', () => {
  clearValidation(popupEditProfile, validationConfig);
  fillProfilePopup(
    popupEditProfile,
    profileTitle.textContent,
    profileDescription.textContent,
  );
  openModal(popupProfile);
});

popupProfile.addEventListener('click', (evt) => {
  closeOverlayModal(evt);
});

popupEditProfile.addEventListener('submit', handleProfileFormSubmit);

// Аватар
avatarEditButton.addEventListener('click', (evt) => {
  clearValidation(popupAvatarForm, validationConfig);
  popupAvatarForm.reset();
  openModal(popupAvatar);
});

popupAvatar.addEventListener('click', (evt) => {
  closeOverlayModal(evt);
});

popupAvatarForm.addEventListener('submit', handleAvatarFormSubmit);

// Добавление карточки
newCardButton.addEventListener('click', () => {
  popupNewCardForm.reset();
  openModal(popupNewCard);
});

popupNewCard.addEventListener('click', (evt) => {
  closeOverlayModal(evt);
});

popupNewCardForm.addEventListener('submit', handleNewCardFormSubmit);

// Удаление
popupConfirm.addEventListener('click', (evt) => {
  closeOverlayModal(evt);
});

popupConfirmButton.addEventListener('click', handleConfirmDelete);

// Закрыть попап
document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__close')) {
    closeModal(evt.target.parentNode.parentNode);
  }
});


