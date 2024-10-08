// Открытие попапа
export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePressEscapeModal);
  popup.addEventListener('mousedown', closeOverlayModal);
}

// Закрытие попапа
export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePressEscapeModal);
  popup.removeEventListener('mousedown', closeOverlayModal);
}

// Оверлэй
export function closeOverlayModal(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

// Закрыти по кнопке Esc
function closePressEscapeModal(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}
