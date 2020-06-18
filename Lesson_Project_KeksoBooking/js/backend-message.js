'use strict';
(function () {
  //Показ сообщений об ошибках при загрузке формы на сервер
  window.shownError = function (message) {
    let container = document.querySelector('body')
    let template = document.querySelector('#error').content;
    let modal = template.querySelector('.error');
    let clone = modal.cloneNode(true);

    let txt = clone.querySelector('.error__message');
    let button = clone.querySelector('.error__button');
    txt.textContent = 'Ошибка загрузки данных: ' + message;

    let closePopup = function () {
      clone.remove();
    };

    button.addEventListener('click', function () {
      closePopup();
    });

    clone.addEventListener('keydown', function (evt) {
      window.isEscEvent(evt, closePopup)
    });

    container.append(clone);
    clone.focus();
  };

  //Показ сообщения при успешной загрузке формы на сервер
  window.shownSuccess = function () {
    let container = document.querySelector('body');
    let template = document.querySelector('#success').content;
    let modal = template.querySelector('.success');
    let clone = modal.cloneNode(true);

    let closePopup = function () {
      clone.remove();
    };

    clone.addEventListener('click', function () {
      closePopup();
    });

    clone.addEventListener('keydown', function (evt) {
      window.isEscEvent(evt, closePopup);
    });

    container.append(clone);
    clone.focus();
  }
})();
