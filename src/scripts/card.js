import { openModal, closeModal } from './modal.js';

// DOM
const cardTemplate = document.querySelector('#card-template').content;
const cardImage = '.card__image';
const catdTitle = '.card__title';
const cardDeleteButton = '.card__delete-button';
const placeItem = '.places__item';
const likeButton = '.card__like-button';

// Функция создания карточки
export function createCard(data) {
  const { link, name } = data;
  const cardElement = cardTemplate.querySelector(placeItem).cloneNode(true);

  cardElement.querySelector(cardImage).src = link;
  cardElement.querySelector(cardImage).alt = name;
  cardElement.querySelector(catdTitle).textContent = name;

  cardElement.querySelector(likeButton).addEventListener('click', likeCard);
  cardElement.querySelector(cardDeleteButton).addEventListener('click', deleteCard);
  cardElement.querySelector(cardImage).addEventListener('click', popupImage);

  return cardElement;
}

// Удаление карточки
export function deleteCard(evt) {
  evt.target.closest(placeItem).remove();
}

// Лайк карточки
export function likeCard(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  };
}

// Увеличение картинок
const imageTypePopup = document.querySelector('.popup_type_image');
const closeImagePopup = imageTypePopup.querySelector('.popup__close');
const overlayImagePopup = imageTypePopup.querySelector('.popup__image');
const captionImagePopup = imageTypePopup.querySelector('.popup__caption');

export function popupImage(evt) {
  openModal(imageTypePopup);
  overlayImagePopup.setAttribute('src', evt.target.src);
  overlayImagePopup.setAttribute('alt', evt.target.alt);
  captionImagePopup.textContent = evt.target.alt;
}

closeImagePopup.addEventListener('click', () => {
  closeModal(imageTypePopup);
});
