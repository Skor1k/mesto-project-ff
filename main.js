(()=>{"use strict";var e={url:"https://nomoreparties.co/v1/wff-cohort-22",headers:{authorization:"633358c8-bd5b-4e2a-a46e-dcca440cd67f","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var n=document.querySelector("#card-template").content;function r(n,r){var o=n.target.parentNode.querySelector(".card__like-count");n.target.classList.contains("card__like-button_is-active")?function(n){return fetch(e.url+"/cards/likes/".concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))}(r).then((function(e){n.target.classList.remove("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){console.log(e)})):function(n){return fetch(e.url+"/cards/likes/".concat(n),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))}(r).then((function(e){n.target.classList.add("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){console.log(e)}))}function o(e,t){e.querySelector(".popup__button").textContent=t}function c(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",u),e.addEventListener("mousedown",a)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u),e.removeEventListener("mousedown",a)}function a(e){e.target===e.currentTarget&&i(e.currentTarget)}function u(e){"Escape"===e.key&&i(document.querySelector(".popup_is-opened"))}function s(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));d(n,e.querySelector(t.submitButtonSelector),t),n.forEach((function(n){n.classList.remove(t.inputErrorClass);var r=e.querySelector(".".concat(n.id,"-error"));r.classList.remove(t.errorClass),r.textContent=""}))}function d(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}var l,p=document.querySelector(".places__list"),f=document.querySelector(".profile__add-button"),_=document.querySelector(".popup_type_new-card"),m=document.forms["new-place"],v=document.querySelector(".popup_type_image"),y=v.querySelector(".popup__image"),h=v.querySelector(".popup__caption"),S=document.querySelector(".popup_type_avatar"),k=document.forms["edit-avatar"],L=document.querySelector(".profile__image-container"),q=document.querySelector(".popup_type_confirm"),E=q.querySelector(".popup__button"),g=document.querySelector(".popup_type_edit"),C=document.forms["edit-profile"],b=document.querySelector(".profile__title"),x=document.querySelector(".profile__description"),w=document.querySelector(".profile__image"),A=document.querySelector(".profile__edit-button"),T=C.querySelector(".popup__input_type_name"),B=C.querySelector(".popup__input_type_description"),N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function P(e,t,r,o,c,i){var a=arguments.length>6&&void 0!==arguments[6]?arguments[6]:"end",u=function(e,t,r,o,c){var i=n.querySelector(".card").cloneNode(!0),a=i.querySelector(".card__delete-button"),u=i.querySelector(".card__like-button"),s=i.querySelector(".card__image"),d=i.querySelector(".card__title"),l=i.querySelector(".card__like-count");return i.dataset.cardId=e._id,i.dataset.ownerId=e.owner._id,s.src=e.link,s.alt=e.description,d.textContent=e.name,l.textContent=e.likes.length,e.likes.some((function(e){return e._id===t}))&&u.classList.add("card__like-button_is-active"),e.owner._id===t?a.addEventListener("click",(function(t){r(t,e._id)})):a.remove(),u.addEventListener("click",(function(t){o(t,e._id)})),s.addEventListener("click",(function(){c(s.src,s.alt,d.textContent)})),i}(e,t,c,o,i);"end"===a?r.append(u):r.prepend(u)}function I(e,t,n){y.src=e,y.alt=t,h.textContent=n,c(v)}function D(e,t){c(q),q.dataset.cardId=t}function j(e){b.textContent=e.name,x.textContent=e.about,w.setAttribute("style","background-image: url(".concat(e.avatar,")"))}Promise.all([fetch(e.url+"/users/me",{headers:e.headers}).then((function(e){return t(e)})),fetch(e.url+"/cards",{headers:e.headers}).then((function(e){return t(e)}))]).then((function(e){var t=e[0];l=t._id;var n=e[1];j(t),function(e,t){e.forEach((function(e){P(e,t,p,r,D,I)}))}(n,l)})).catch((function(e){console.log(e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);d(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),d(n,r,t)}))}))}(t,e)}))}(N),v.addEventListener("click",(function(e){a(e)})),A.addEventListener("click",(function(){s(C,N),T.value=b.textContent,B.value=x.textContent,openPopup(g)})),g.addEventListener("click",(function(e){a(e)})),L.addEventListener("click",(function(e){s(k,N),k.reset(),c(S)})),S.addEventListener("click",(function(e){a(e)})),k.addEventListener("submit",(function(n){var r;n.preventDefault(),o(k,"Сохранение..."),(r=k.link.value,fetch(e.url+"/users/me/avatar",{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then((function(e){return t(e)}))).then((function(e){j(e),i(S),s(k,N)})).catch((function(e){console.log(e)})).finally((function(){o(k,"Сохранить")}))})),f.addEventListener("click",(function(){m.reset(),c(_)})),_.addEventListener("click",(function(e){a(e)})),m.addEventListener("submit",(function(n){var c;n.preventDefault(),o(m,"Сохранение..."),(c={name:m.elements["place-name"].value,link:m.elements.link.value},fetch(e.url+"/cards",{method:"POST",headers:e.headers,body:JSON.stringify({name:c.name,link:c.link})}).then((function(e){return t(e)}))).then((function(e){P(e,l,p,r,D,I,"start"),i(_),m.reset(),s(m,N)})).catch((function(e){console.log(e)})).finally((function(){o(m,"Сохранить")}))})),q.addEventListener("click",(function(e){a(e)})),E.addEventListener("click",(function(n){var r;(r=q.dataset.cardId,fetch(e.url+"/cards/".concat(r),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))).then((function(e){document.querySelector("[data-card-id='".concat(q.dataset.cardId,"']")).remove(),i(q)})).catch((function(e){console.log(e)}))})),document.addEventListener("click",(function(e){e.target.classList.contains("popup__close")&&i(e.target.parentNode.parentNode)}))})();