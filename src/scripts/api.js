const apiConfig = {
  url: 'https://nomoreparties.co/v1/wff-cohort-22',
  headers: {
    authorization: '633358c8-bd5b-4e2a-a46e-dcca440cd67f',
    'Content-Type': 'application/json'
  }
};

// Ошибки
function getResponseData (res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

// Обновление аватара
export function updateUserAvatar (avatarLink) {
  return fetch(apiConfig.url + '/users/me/avatar', {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then((res) => getResponseData(res));
};

// Пользователь
export function getUserInfo () {
  return fetch(apiConfig.url + '/users/me', {
    headers: apiConfig.headers,
  }).then((res) => getResponseData(res));
};

// Профиль
export function updateUserProfile (userProfileName, userProfileDescription) {
  return fetch(apiConfig.url + '/users/me', {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: userProfileName.value,
      about: userProfileDescription.value,
    }),
  }).then((res) => getResponseData(res));
};

export function getInitialInfo () {
  return Promise.all([getUserInfo(), getInitialCards()]);
};

// Карточки
export function getInitialCards () {
  return fetch(apiConfig.url + '/cards', {
    headers: apiConfig.headers,
  }).then((res) => getResponseData(res));
};

export function postNewCard (cardData) {
  return fetch(apiConfig.url + '/cards', {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  }).then((res) => getResponseData(res));
};

// Упраление карточками
export function deleteCard (cardId) {
  return fetch(apiConfig.url + `/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  }).then((res) => getResponseData(res));
};

export function putLike (cardId) {
  return fetch(apiConfig.url + `/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: apiConfig.headers,
  }).then((res) => getResponseData(res));
};

export function deleteLike (cardId) {
  return fetch(apiConfig.url + `/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  }).then((res) => getResponseData(res));
};
