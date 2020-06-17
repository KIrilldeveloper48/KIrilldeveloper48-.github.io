'use strict';

(function () {
  let URL = 'https://javascript.pages.academy/keksobooking';

  window.upload = function (data, onSuccess, onError) {

    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      let error;
      switch (xhr.status) {
        case 200:
          onSuccess();
          shownSuccess();
          break;

        default:
          error = xhr.status + ' ' + xhr.statusText;
          break;
      }

      if (error) {
        onError(error);
        shownError(error);
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
