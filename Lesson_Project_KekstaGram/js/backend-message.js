'use strict';
(function () {
  //Показ сообщений об ошибках при загрузке формы на сервер
  window.shownError = function (message) {
    let container = document.querySelector('body')
    let template = document.querySelector('#error').content;
    let modal = template.querySelector('.error');
    let clone = modal.cloneNode(true);

    let txt = clone.querySelector('.error__title');
    let button = clone.querySelector('.error__button');
    txt.textContent = 'Не удалось загрузить изображение: ' + message;
    txt.style.lineHeight = '36px';
    button.textContent = 'Попробовать ещё раз';

    let closePopup = function () {
      clone.remove();
    };

    button.addEventListener('click', function () {
      closePopup();
    });

    clone.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, closePopup)
    });

    window.uploadOverlay.append(clone);
    clone.focus();
  };

  //Показ сообщения при успешной загрузке формы на сервер
  window.shownSuccess = function () {
    let container = document.querySelector('body');
    let template = document.querySelector('#success').content;
    let modal = template.querySelector('.success');
    let clone = modal.cloneNode(true);
    let button = clone.querySelector('.success__button')

    let closePopup = function () {
      clone.remove();
    };

    button.addEventListener('click', function () {
      closePopup();
    });

    clone.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, closePopup);
    });

    container.append(clone);
    clone.focus();
  }
})();
