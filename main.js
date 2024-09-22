(()=>{"use strict";var e={url:"https://nomoreparties.co/v1/wff-cohort-22",headers:{authorization:"633358c8-bd5b-4e2a-a46e-dcca440cd67f","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function n(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",c),e.addEventListener("mousedown",r)}function o(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c),e.removeEventListener("mousedown",r)}function r(e){e.target===e.currentTarget&&o(e.currentTarget)}function c(e){"Escape"===e.key&&o(document.querySelector(".popup_is-opened"))}var a=document.querySelector("#card-template").content,i=document.querySelector(".popup_type_confirm");function u(e,t,n,o,r,c){var i=arguments.length>6&&void 0!==arguments[6]?arguments[6]:"end",u=function(e,t,n,o,r){var c=a.querySelector(".card").cloneNode(!0),i=c.querySelector(".card__delete-button"),u=c.querySelector(".card__like-button"),s=c.querySelector(".card__image"),l=c.querySelector(".card__title"),d=c.querySelector(".card__like-count");return c.dataset.cardId=e._id,c.dataset.ownerId=e.owner._id,s.src=e.link,s.alt=e.description,l.textContent=e.name,d.textContent=e.likes.length,e.likes.some((function(e){return e._id===t}))&&u.classList.add("card__like-button_is-active"),e.owner._id===t?i.addEventListener("click",(function(t){n(t,e._id)})):i.remove(),u.addEventListener("click",(function(t){o(t,e._id)})),s.addEventListener("click",(function(){r(s.src,s.alt,l.textContent)})),c}(e,t,r,o,c);"end"===i?n.append(u):n.prepend(u)}function s(n,o){var r=n.target.parentNode.querySelector(".card__like-count");n.target.classList.contains("card__like-button_is-active")?function(n){return fetch(e.url+"/cards/likes/".concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))}(o).then((function(e){n.target.classList.remove("card__like-button_is-active"),r.textContent=e.likes.length})).catch((function(e){console.log(e)})):function(n){return fetch(e.url+"/cards/likes/".concat(n),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))}(o).then((function(e){n.target.classList.add("card__like-button_is-active"),r.textContent=e.likes.length})).catch((function(e){console.log(e)}))}function l(e,t){n(i),i.dataset.cardId=t}function d(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),r.textContent="",r.classList.remove(o)}function f(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n),t.disabled=!1):(t.classList.add(n),t.disabled=!0)}function p(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));e.querySelector(t.submitButtonSelector).classList.add(t.inactiveButtonClass),n.forEach((function(n){d(e,n,t.inputErrorClass,t.errorClass),n.setCustomValidity("")}))}var m,_=document.querySelector(".places__list"),v=document.querySelector(".profile__add-button"),y=document.querySelector(".popup_type_new-card"),h=document.forms["new-place"],S=document.querySelector(".popup_type_image"),L=S.querySelector(".popup__image"),k=S.querySelector(".popup__caption"),E=document.querySelector(".popup_type_avatar"),q=document.forms["edit-avatar"],b=document.querySelector(".profile__image-container"),g=document.querySelector(".popup_type_confirm"),C=g.querySelector(".popup__button"),O=document.querySelector(".popup_type_edit"),x=document.forms["edit-profile"],w=document.querySelector(".profile__title"),T=document.querySelector(".profile__description"),A=document.querySelector(".profile__image"),M=document.querySelector(".profile__edit-button"),N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function B(e,t){e.querySelector(".popup__button").textContent=t}function D(e){w.textContent=e.name,T.textContent=e.about,A.style.backgroundImage="url(".concat(e.avatar,")")}function I(e,t,o){L.src=e,L.alt=t,k.textContent=o,n(S)}S.addEventListener("click",(function(e){closeModalOnOverlay(e)})),M.addEventListener("click",(function(){var e,t,o;p(x,N),e=x,t=w.textContent,o=T.textContent,e.elements.name.value=t,e.elements.description.value=o,n(O)})),O.addEventListener("click",(function(e){closeModalOnOverlay(e)})),x.addEventListener("submit",(function(n){var r;n.preventDefault(),B(x,"Сохранение..."),(r={name:x.name.value,about:x.description.value},fetch(e.url+"/users/me",{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r.name,about:r.about})}).then((function(e){return t(e)}))).then((function(e){D(e),o(O),p(x,N)})).catch((function(e){console.log(e)})).finally((function(){B(x,"Сохранить")}))})),b.addEventListener("click",(function(e){p(q,N),q.reset(),n(E)})),E.addEventListener("click",(function(e){closeModalOnOverlay(e)})),q.addEventListener("submit",(function(n){var r;n.preventDefault(),B(q,"Сохранение..."),(r=q.link.value,fetch(e.url+"/users/me/avatar",{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then((function(e){return t(e)}))).then((function(e){D(e),o(E),p(q,N)})).catch((function(e){console.log(e)})).finally((function(){B(q,"Сохранить")}))})),v.addEventListener("click",(function(){h.reset(),p(h,N),n(y)})),y.addEventListener("click",(function(e){closeModalOnOverlay(e)})),h.addEventListener("submit",(function(n){var r;n.preventDefault(),B(h,"Сохранение..."),(r={name:h.elements["place-name"].value,link:h.elements.link.value},fetch(e.url+"/cards",{method:"POST",headers:e.headers,body:JSON.stringify({name:r.name,link:r.link})}).then((function(e){return t(e)}))).then((function(e){u(e,m,_,s,l,I,"start"),o(y),h.reset(),p(h,N)})).catch((function(e){console.log(e)})).finally((function(){B(h,"Сохранить")}))})),g.addEventListener("click",(function(e){closeModalOnOverlay(e)})),C.addEventListener("click",(function(n){var r;(r=g.dataset.cardId,fetch(e.url+"/cards/".concat(r),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))).then((function(e){document.querySelector("[data-card-id='".concat(g.dataset.cardId,"']")).remove(),o(g)})).catch((function(e){console.log(e)}))})),document.addEventListener("click",(function(e){e.target.classList.contains("popup__close")&&o(e.target.parentNode.parentNode)})),Promise.all([fetch(e.url+"/users/me",{headers:e.headers}).then((function(e){return t(e)})),fetch(e.url+"/cards",{headers:e.headers}).then((function(e){return t(e)}))]).then((function(e){var t=e[0];m=t._id;var n=e[1];D(t),function(e,t){e.forEach((function(e){u(e,t,_,s,l,I)}))}(n,m)})).catch((function(e){console.log(e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t,n,o,r,c){var a=Array.from(e.querySelectorAll(t)),i=e.querySelector(r);f(a,i,c),a.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,n,o){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?d(e,t,n,o):function(e,t,n,o,r){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o),c.textContent=n,c.classList.add(r)}(e,t,t.validationMessage,n,o)}(e,t,n,o),f(a,i,c)}))}))}(t,e.inputSelector,e.inputErrorClass,e.errorClass,e.submitButtonSelector,e.inactiveButtonClass)}))}(N)})();