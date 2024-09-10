// DOM
const cardTemplate = document.getElementById('card-template').content;

// Функция создания карточки
export function createCard(dataCard, likeCardItem, deleteCardItem, openPopupImage) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardItem.querySelector('.card__image');
  const catdTitle = cardItem.querySelector('.card__title');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  const cardLikeButton = cardItem.querySelector('.card__like-button');

  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  catdTitle.textContent = dataCard.name;

  //Обработчики событий
  cardDeleteButton.addEventListener('click', deleteCardItem);
  cardLikeButton.addEventListener('click', likeCardItem);
  cardImage.addEventListener('click', openPopupImage);

  return cardItem;
}

// Удаление карточки
export function deleteCardItem(evt) {
  evt.target.closest('.places__item').remove();
}

// Лайк карточки
export function likeCardItem(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  };
}
