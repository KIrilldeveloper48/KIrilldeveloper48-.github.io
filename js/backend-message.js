'use strict';
(function () {
  //Показ сообщений об ошибках при загрузке формы на сервер
  window.shownError = function (message) {
    //Находим шаблон, клонируем его и уже в клоне находим элементы для изменения контента
    let template = document.querySelector('#error').content;
    let modal = template.querySelector('.error');
    let clone = modal.cloneNode(true);
    let txt = clone.querySelector('.error__title');
    let button = clone.querySelector('.error__button');
    //Меняем содержимое и немного правим стили
    txt.textContent = 'Не удалось загрузить изображение: ' + message;
    button.textContent = 'Попробовать ещё раз';
    txt.style.lineHeight = '36px';
    //Функционал для закрытия попапа
    //Основная функция
    let closePopup = function () {
      clone.remove();
    };
    //Закрытие по кнопке
    button.addEventListener('click', function () {
      closePopup();
    });
    //По нажатию ESC
    clone.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, closePopup)
    });
    //Добавляем попап на страницу
    window.uploadOverlay.append(clone);
    //Устанавливаем на нём фокус, чтобы нажатие клавиши ESC происходило на нём
    clone.focus();
  };

  //Показ сообщения при успешной загрузке формы на сервер
  window.shownSuccess = function () {
    //Попап будем добавлять в body
    let container = document.querySelector('body');
    //Находим шаблон и клонируем его
    let template = document.querySelector('#success').content;
    let modal = template.querySelector('.success');
    let clone = modal.cloneNode(true);
    //Функционал для закрытия попапа
    //Основная функция
    let closePopup = function () {
      clone.remove();
    };
    //Закрытие по кнопке
    let button = clone.querySelector('.success__button');
    button.addEventListener('click', function () {
      closePopup();
    });
    //По нажатию ESC
    clone.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, closePopup);
    });
    //Добавляем попап на страницу
    container.append(clone);
    //Устанавливаем на нём фокус, чтобы нажатие клавиши ESC происходило на нём
    clone.focus();
  }
})();
