(()=>{"use strict";var e={url:"https://nomoreparties.co/v1/wff-cohort-22",headers:{authorization:"633358c8-bd5b-4e2a-a46e-dcca440cd67f","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function n(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",c),e.addEventListener("mousedown",o)}function r(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c),e.removeEventListener("mousedown",o)}function o(e){e.target===e.currentTarget&&r(e.currentTarget)}function c(e){"Escape"===e.key&&r(document.querySelector(".popup_is-opened"))}var a=document.getElementById("card-template").content,u=document.querySelector(".popup_type_delete-card"),i={get card(){return this._dataCard},set card(e){this._dataCard=e}};function l(e){i.card=e.target.closest(".card"),n(u)}function s(n,r){var o=n.target.parentNode.querySelector(".card__like-count");n.target.classList.contains("card__like-button_is-active")?function(n){return fetch("".concat(e.url,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))}(r).then((function(e){n.target.classList.remove("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){console.log(e)})):function(n){return fetch("".concat(e.url,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))}(r).then((function(e){n.target.classList.add("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){console.log(e)}))}function d(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t,n,r,o,c){var a=Array.from(e.querySelectorAll(t)),u=e.querySelector(o);f(a,u,c),a.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,n,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?p(e,t,n,r):function(e,t,n,r,o){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r),c.textContent=n,c.classList.add(o)}(e,t,t.validationMessage,n,r)}(e,t,n,r),f(a,u,c)}))}))}(t,e.inputSelector,e.inputErrorClass,e.errorClass,e.submitButtonSelector,e.inactiveButtonClass)}))}function p(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),o.textContent="",o.classList.remove(r)}function f(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n),t.disabled=!1):(t.classList.add(n),t.disabled=!0)}function m(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));e.querySelector(t.submitButtonSelector).classList.add(t.inactiveButtonClass),n.forEach((function(n){p(e,n,t.inputErrorClass,t.errorClass),n.setCustomValidity("")}))}var _,v=document.querySelector(".places__list"),y={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},h=document.querySelector(".popup_type_edit"),S=document.querySelector(".profile__edit-button"),b=h.querySelector(".popup__close"),q=document.forms["edit-profile"],L=q.elements.name,E=q.elements.description,g=document.querySelector(".profile__title"),k=document.querySelector(".profile__description"),C=document.querySelector(".popup_type_avatar"),x=document.forms["edit-avatar"],A=document.querySelector(".profile__image-container"),P=document.querySelector(".popup_type_new-card"),w=document.querySelector(".profile__add-button"),B=P.querySelector(".popup__close"),T=document.forms["new-place"],F=T.elements["place-name"],D=T.elements.link,M=document.querySelector(".popup_type_image"),N=M.querySelector(".popup__close"),O=M.querySelector(".popup__image"),j=M.querySelector(".popup__caption");function V(e,t){t.textContent=e?"Сохранение...":"Сохранить"}function H(e){g.textContent=e.name,k.textContent=e.about,profileAvatar.style.backgroundImage="url(".concat(e.avatar,")")}function I(e){O.setAttribute("src",e.target.src),O.setAttribute("alt",e.target.alt),j.textContent=e.target.alt,n(M)}d(y),Promise.all([fetch("".concat(e.url,"/users/me"),{headers:e.headers}).then((function(e){return t(e)})),fetch("".concat(e.url,"/cards"),{headers:e.headers}).then((function(e){return t(e)}))]).then((function(e){var t=e[0];_=t._id;var n=e[1];H(t),function(e,t){e.forEach((function(e){renderCard(e,t,v,s,l,I)}))}(n,_)})).catch((function(e){console.log(e)})),validateForm(q,d),L.value=g.textContent,E.value=k.textContent,A.addEventListener("click",(function(e){m(x,y),x.reset(),n(C)})),x.addEventListener("submit",(function(n){var o;n.preventDefault(),V(!0,x.querySelector(".popup__button")),(o=x.link.value,fetch("".concat(e.url,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:o})}).then((function(e){return t(e)}))).then((function(e){H(e),r(C),m(x,y)})).catch((function(e){console.log(e)})).finally((function(){V(!1,x.querySelector(".popup__button"))}))})),C.addEventListener("click",(function(e){closeOnOverlayModal(e)})),S.addEventListener("click",(function(){n(h)})),b.addEventListener("click",(function(){r(h)})),q.addEventListener("submit",(function(n){var o;n.preventDefault(),V(!0,popupProfileForm.querySelector(".popup__button")),(o={name:popupProfileForm.name.value,about:popupProfileForm.description.value},fetch("".concat(e.url,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:o.name,about:o.about})}).then((function(e){return t(e)}))).then((function(e){H(e),r(popupProfile),m(popupProfileForm,y)})).catch((function(e){console.log(e)})).finally((function(){V(!1,popupProfileForm.querySelector(".popup__button"))}))})),N.addEventListener("click",(function(){r(M)})),w.addEventListener("click",(function(){n(P)})),B.addEventListener("click",(function(){r(P)})),T.addEventListener("submit",(function(e){e.preventDefault();var t=function(e,t,n){var r=a.querySelector(".places__item").cloneNode(!0),o=r.querySelector(".card__image"),c=r.querySelector(".card__title"),u=r.querySelector(".card__delete-button"),i=r.querySelector(".card__like-button");return r.querySelector(".card__like-count"),o.src=e.link,o.alt=e.name,c.textContent=e.name,u.addEventListener("click",n),i.addEventListener("click",t),o.addEventListener("click",void 0),r}({name:F.value,link:D.value},s,l);v.prepend(t),T.reset(),r(P)}))})();