import { deleteLike, putLike } from './api.js';
import { openModal } from './modal.js';

// DOM
const cardTemplate = document.getElementById('card-template').content;
const popupConfirm = document.querySelector('.popup_type_confirm');

// Функция создания карточки
function createCard(dataCard, userId, likeCardItem, deleteCardItem, openPopupImage) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardItem.querySelector('.card__image');
  const catdTitle = cardItem.querySelector('.card__title');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  const cardLikeButton = cardItem.querySelector('.card__like-button');
  const cardLikeCount = cardItem.querySelector('.card__like-count');

  cardItem.dataset.cardId = dataCard._id;
  cardItem.dataset.ownerId = dataCard.owner._id;
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.description;
  cardItem.textContent = dataCard.name;

  cardLikeCount.textContent = dataCard.likes.length;
  const isLiked = dataCard.likes.some((like) => like._id === userId);
  if (isLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  // //Обработчики событий
  if (dataCard.owner._id === userId) {
    cardDeleteButton.addEventListener('click', (evt) => {
      deleteCardItem(evt, card._id);
    });
  } else {
    cardDeleteButton.remove();
  }

  cardLikeButton.addEventListener('click', (evt) => {
    likeCardItem(evt, card._id);
  });

  cardImage.addEventListener('click', () => {
    openPopupImage(cardImage.src, cardImage.alt, catdTitle.textContent);
  });

  return cardItem;
}

export function renderCard (item, userId, container, likeCardItem, deleteCardItem, openPopupImage, place = 'end') {
  const cardItem = createCard(item, userId, likeCardItem, deleteCardItem, openPopupImage);
  if (place === 'end') {
    container.append(cardItem);
  } else {
    container.prepend(cardItem);
  }
};

// Удаление карточки
export function deleteCard (evt, cardId) {
  openModal(popupConfirm);
  popupConfirm.dataset.cardId = cardId;
};

// Лайк карточки
export function likeCard(evt, cardId) {
  let currentLikes = evt.target.parentNode.querySelector('.card__like-count');
  if (evt.target.classList.contains('card__like-button_is-active')) {
    deleteLike(cardId)
      .then((updatedCard) => {
        evt.target.classList.remove('card__like-button_is-active');
        currentLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    putLike(cardId)
      .then((updatedCard) => {
        evt.target.classList.add('card__like-button_is-active');
        currentLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
