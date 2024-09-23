import { deleteCard, deleteLike, putLike } from './api';
// import { openModal } from './modal';

// DOM
const cardTemplate = document.querySelector('#card-template').content;

// Создание карточки
export function createCard (card, userId, deleteItem, likeItem, openImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeCount = cardElement.querySelector('.card__like-count');

  cardElement.dataset.cardId = card._id;
  cardElement.dataset.ownerId = card.owner._id;
  cardImage.src = card.link;
  cardImage.alt = card.description;
  cardTitle.textContent = card.name;

  // Счетчик лайков
  cardLikeCount.textContent = card.likes.length;
  const isLiked = card.likes.some((like) => like._id === userId);
  if (isLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  // Удаление
  if (card.owner._id === userId) {
    cardDeleteButton.addEventListener('click', (evt) => {
      deleteItem(evt, card._id);
    });
  } else {
    cardDeleteButton.remove();
  }

  // Лайк
  cardLikeButton.addEventListener('click', (evt) => {
    likeItem(evt, card._id);
  });

  // Попап картинки
  cardImage.addEventListener('click', () => {
    openImage(cardImage.src, cardImage.alt, cardTitle.textContent);
  });

  return cardElement;
};

// Лайк
export function likeCard (evt, cardId) {
  const currentLikes = evt.target.parentNode.querySelector('.card__like-count');

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

//Удаление
