import { deleteLike, putLike } from './api';
import { openModal } from './modal';

// DOM
const cardTemplate = document.querySelector('#card-template').content;
const popupConfirm = document.querySelector('.popup_type_confirm');

// Функции
export function likeCard (evt, cardId) {
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

export function deleteCard (evt, cardId) {
  openModal(popupConfirm);
  popupConfirm.dataset.cardId = cardId;
};

function createCard (
  card,
  userId,
  deleteCardFn,
  likeCardFn,
  openFullImageFn,
) {
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

  // Лайки
  cardLikeCount.textContent = card.likes.length;
  const isLiked = card.likes.some((like) => like._id === userId);
  if (isLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  // Удаление
  if (card.owner._id === userId) {
    cardDeleteButton.addEventListener('click', (evt) => {
      deleteCardFn(evt, card._id);
    });
  } else {
    cardDeleteButton.remove();
  }

  // Слушатель лайка
  cardLikeButton.addEventListener('click', (evt) => {
    likeCardFn(evt, card._id);
  });

  // Попап
  cardImage.addEventListener('click', () => {
    openFullImageFn(cardImage.src, cardImage.alt, cardTitle.textContent);
  });

  return cardElement;
};

export function renderCard (
  item,
  userId,
  container,
  likeCard,
  deleteCard,
  openFullImageFn,
  place = 'end',
) {
  const cardElement = createCard(
    item,
    userId,
    deleteCard,
    likeCard,
    openFullImageFn,
  );
  if (place === 'end') {
    container.append(cardElement);
  } else {
    container.prepend(cardElement);
  }
};
