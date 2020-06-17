'use strict';

(function () {
  let URL = 'https://javascript.pages.academy/keksobooking';

  window.upload = function (data, onSuccess) {

    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      let error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        case 400:
          error = 'Неверный запрос';
          break;

        case 401:
          error = 'Пользователь не авторизован';
          break;

        case 404:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
          break;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
