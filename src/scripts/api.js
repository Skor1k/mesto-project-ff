const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-22',
  headers: {
    authorization: '633358c8-bd5b-4e2a-a46e-dcca440cd67f',
    'Content-Type': 'application/json'
  }
};

// Функции
function getResponseData (res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export function getInitialCards () {
  return fetch(config.baseUrl + '/cards', {
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

export function getUserInfo () {
  return fetch(config.baseUrl + '/users/me', {
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

export function getInitialInfo () {
  return Promise.all([getUserInfo(), getInitialCards()]);
};

export function updateUserProfile (userProfileData) {
  return fetch(config.baseUrl + '/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userProfileData.name,
      about: userProfileData.about,
    }),
  }).then((res) => getResponseData(res));
};

export function postNewCard (cardData) {
  return fetch(config.baseUrl + '/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  }).then((res) => getResponseData(res));
};

export function putLike (cardId) {
  return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

export function deleteLike (cardId) {
  return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

export function deleteCard (cardId) {
  return fetch(config.baseUrl + `/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

export function updateUserAvatar (avatarLink) {
  return fetch(config.baseUrl + '/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then((res) => getResponseData(res));
};
