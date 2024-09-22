const apiConfig = {
  url: 'https://nomoreparties.co/v1/wff-cohort-22',
  headers: {
    authorization: '633358c8-bd5b-4e2a-a46e-dcca440cd67f',
    'Content-Type': 'application/json'
  }
};

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

// Функция для получения списка карт
export function getInitialCards() {
  return fetch(`${apiConfig.url}/cards`, {
    headers: apiConfig.headers
  })
  .then((res) => getResponseData(res));
};

// Функция для получения профиля пользователя
export function getUserInfo() {
  return fetch(`${apiConfig.url}/users/me`, {
    headers: apiConfig.headers
  })
  .then((res) => getResponseData(res));
};

export function getInitialInfo() {
  return Promise.all([getUserInfo(), getInitialCards()]);
};

// Функция для сохранения профиля пользователя
export function updateUserProfile(userProfileData) {
  return fetch(`${apiConfig.url}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: userProfileData.name,
      about: userProfileData.about
    })
  })
  .then((res) => getResponseData(res));
}


// Функция для сохранения аватара пользователя
export function updateUserAvatar(avatarLink) {
  return fetch(`${apiConfig.url}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: avatarLink
    }),
  })
  .then((res) => getResponseData(res));
};

// Функция для создания новой карты
export function postNewCard(cardData) {
  return fetch(`${apiConfig.url}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link
    })
  })
  .then((res) => getResponseData(res));
};

// Функция для удаления карты
export function deleteCardFromServer(cardId) {
  return fetch(`${apiConfig.url}/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
  .then((res) => getResponseData(res));
};

// Функция для добавления лайка к карте
export function putLike(cardId) {
  return fetch(`${apiConfig.url}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: apiConfig.headers
  })
  .then((res) => getResponseData(res));
};

// Функция для удаления лайка с карты
export function deleteLike(cardId) {
  return fetch(`${apiConfig.url}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
  .then((res) => getResponseData(res));
};
