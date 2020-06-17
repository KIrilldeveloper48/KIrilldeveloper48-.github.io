(function () {

  window.load = function (onSuccess, onError) {

    let URL

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

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    })

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    })

    xhr.timeout = 10000;

    //Конфигурация запроса
    xhr.open('GET', 'https://javascript.pages.academy/keksobooking/data');
    //Отправка запроса
    xhr.send();
  };
})();
