// DOM
const cardTemplate = document.querySelector('#card-template').content;
const cardImage = '.card__image';
const catdTitle = '.card__title';
const cardDeleteButton = '.card__delete-button';
const cardLikeButton = '.card__like-button';
const placesCardItem = '.places__item';

// Функция создания карточки
export function createCard(dataCard) {
  const { link, name } = dataCard;
  const card = cardTemplate.querySelector(placesCardItem).cloneNode(true);

  const image = card.querySelector(cardImage);
  image.src = link;
  image.alt = name;

  card.querySelector(catdTitle).textContent = name;

  const likeButton = card.querySelector(cardLikeButton);
  // Обработчик события для лайка
  likeButton.addEventListener('click', (evt) => {
    likeCard(evt);
  });

  // Обработчик события удаления
  const deleteButton = card.querySelector(cardDeleteButton);
  deleteButton.addEventListener('click', () => {
    card.remove();
  });

  return card;
}

// Лайк карточки
function likeCard(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  };
}
