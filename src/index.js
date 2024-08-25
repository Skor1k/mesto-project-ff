// Импорт файлов
import './pages/index.css';
import { createCard, deleteCard, likeCard, popupImage } from './scripts/card.js';
import { initialCards } from './scripts/cards.js';
import { openModal, closeModal } from './scripts/modal.js';

const placesList = document.querySelector('.places__list');

// Функция добавления карточки
function appendCard(cardElement) {
  placesList.append(cardElement);
}

// Вывести карточки на страницу
initialCards.forEach(card => {
  appendCard(createCard(card));
});


// DOM попап редактирования профиля
const editPopup = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const closeEditButton = editPopup.querySelector('.popup__close');

const formElement = document.forms['edit-profile'];
const nameInput = formElement.elements['name'];
const jobInput = formElement.elements['description'];

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//Открытие попапа редактированя профиля
profileEditButton.addEventListener('click', () => {
  openModal(editPopup);
});

//Закрытие попапа редактированя профиля
closeEditButton.addEventListener('click', () => {
  closeModal(editPopup);
});

// Попап редактированя профиля
function profileInfoPopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

profileInfoPopup()

// Отправка формы редактированя профиля
function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  formElement.reset();

  profileInfoPopup();

  closeModal(editPopup);
};

formElement.addEventListener('submit', handleFormSubmit);


// DOM попап добавления карточки
// Пока не могу разобраться почему не работает Ж(
const addCardPopup = document.querySelector('.popup_type_new-card');
const openAddButton = document.querySelector('.profile__add-button');
const closeAddButton = addCardPopup.querySelector('.popup__close');

const formCardAdd = document.forms['new-place'];
const cardInput = formElement.elements['place-name'];
const linkInput = formElement.elements['link'];

//Открытие попапа добавления карточки
openAddButton.addEventListener('click', () => {
  openModal(addCardPopup);
});

//Закрытие попапа добавления карточки
closeAddButton.addEventListener('click', () => {
  closeModal(addCardPopup);
});

function addCard(data) {
  const { nameValue, linkValue } = data;
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector(likeButton).addEventListener('click', likeCard);
  cardElement.querySelector(cardDeleteButton).addEventListener('click', deleteCard);
  cardElement.querySelector(cardImage).addEventListener('click', popupImage);

  cardInput.textContent = nameValue;
  linkInput.textContent = linkValue;

  placesList.append(cardElement);
}

function addFormSubmit(evt) {
  evt.preventDefault();

  addCard();

  formCardAdd.reset();

  closeModal(addCardPopup);
};

formCardAdd.addEventListener('submit', addFormSubmit);
