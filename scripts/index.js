// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function addCard(imageValue, titleValue) {
    // @todo: Темплейт карточки
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  
    cardElement.querySelector('.card__image').src = imageValue;
    cardElement.querySelector('.card__title').textContent = titleValue;
    // @todo: Функция лакйа карточки
    cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
      evt.target.classList.toggle('card__like-button_is-active');
    });
    // @todo: Функция удаления карточки
    cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {
        evt.target.parentNode.remove();
    });
  
  placesList.append(cardElement)
}

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
    addCard(card.link, card.name);
});