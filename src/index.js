// Импорт файлов
import './pages/index.css';
import { createCard } from './scripts/card.js';
import { initialCards } from './scripts/cards.js';
import { openModal, closeModal } from './scripts/modal.js';

// DOM
const placesCardItem = document.querySelector('.places__list');
//Попап редактирования профиля
const editPopup = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const closeEditButton = editPopup.querySelector('.popup__close');
const formElement = document.forms['edit-profile'];
const nameInput = formElement.elements['name'];
const jobInput = formElement.elements['description'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
// DOM попап добавления карточки
const addCardPopup = document.querySelector('.popup_type_new-card');
const openAddButton = document.querySelector('.profile__add-button');
const closeAddButton = addCardPopup.querySelector('.popup__close');
const formCardAdd = document.forms['new-place'];
const cardInput = formCardAdd.elements['place-name'];
const linkInput = formCardAdd.elements['link'];


// Увеличение картинок карточки
const imageTypePopup = document.querySelector('.popup_type_image');
const closeImagePopup = imageTypePopup.querySelector('.popup__close');
const overlayImagePopup = imageTypePopup.querySelector('.popup__image');
const captionImagePopup = imageTypePopup.querySelector('.popup__caption');

// Функция добавления карточки
function appendCard(cardElement) {
  placesCardItem.append(cardElement);
}

// Вывести карточки на страницу
initialCards.forEach(card => {
  appendCard(createCard(card), clickImageCard());
});

// Попап редактированя профиля
function openProfileInfoPopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

openProfileInfoPopup();

//Открытие попапа редактированя профиля
profileEditButton.addEventListener('click', () => {
  openModal(editPopup);
});

//Закрытие попапа редактированя профиля
closeEditButton.addEventListener('click', () => {
  closeModal(editPopup);
});

// Отправка формы редактированя профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  formElement.reset();

  openProfileInfoPopup();

  closeModal(editPopup);
};

formElement.addEventListener('submit', handleProfileFormSubmit);

// Увеличение картинок карточки
function openPopupImage(evt) {
  overlayImagePopup.setAttribute('src', evt.target.src);
  overlayImagePopup.setAttribute('alt', evt.target.alt);
  captionImagePopup.textContent = evt.target.alt;
  openModal(imageTypePopup);
}

function clickImageCard() {
  placesCardItem.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('card__image')) {
      openPopupImage(evt);
    }
  });
}

//Закрытие попапа увеличение картинок карточки
closeImagePopup.addEventListener('click', () => {
  closeModal(imageTypePopup);
});

// Открытие попапа добавления новой карточки
openAddButton.addEventListener('click', () => {
  openModal(addCardPopup);
});

// Закрытие попапа добавления новой карточки
closeAddButton.addEventListener('click', () => {
  closeModal(addCardPopup);
});

// Обработчик формы добавления новой карточки
formCardAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const newCardData = {
    name: cardInput.value,
    link: linkInput.value
  };

  const newCard = createCard(newCardData);
  placesCardItem.prepend(newCard);

  formCardAdd.reset();
  closeModal(addCardPopup);
});
