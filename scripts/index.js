// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const cardImage = '.card__image';
const catdTitle = '.card__title';
const cardDeleteButton = '.card__delete-button';
const placeItem = '.places__item';

// @todo: Функция создания карточки
function createCard(data) {
  const { link, name } = data;
  const cardElement = cardTemplate.querySelector(placeItem).cloneNode(true);

  cardElement.querySelector(cardDeleteButton).addEventListener('click', deleteCard);
  cardElement.querySelector(cardImage).src = link;
  cardElement.querySelector(cardImage).alt = name;
  cardElement.querySelector(catdTitle).textContent = name;

  return cardElement;
}

// @todo: Функция добавления карточки
function appendCard(cardElement) {
  placesList.append(cardElement);
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest(placeItem).remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
  appendCard(createCard(card));
});
