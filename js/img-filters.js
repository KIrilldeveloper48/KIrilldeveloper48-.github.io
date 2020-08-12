//Фильтрация фотографий на странице по кол-ву комментариев или случайным образом
(function () {
  window.imgFilters = function () {
    //Генарация рандомного списка фотографий
    let getDataRnd = function () {
      //Клонируем исходный массив с данными, чтобы не менять его в процессе обработки
      let dataRandom = window.dataOriginal.slice();
      //Кол-во случайных фотографий
      let photos = 10;
      while (dataRandom.length > photos) {
        //Получаем случайное число в диапозоне длинны массива
        let indexRnd = Math.floor(Math.random() * dataRandom.length);
        //Удаляем случайный элемент из массива
        dataRandom.splice(indexRnd, 1);
      }
      return dataRandom;
    };
    //Сортировка массива по кол-ву комментариев
    let getDataDiscussed = function () {
      //Клонируем массив
      let dataDiscussed = window.dataOriginal.slice();
      //Сортируем массив стандартным "пузырьковым методом"
      for (let i = 0; i < dataDiscussed.length - 1; i++) {
        for (let j = i + 1; j < dataDiscussed.length; j++) {
          if (
            dataDiscussed[j].comments.length > dataDiscussed[i].comments.length
          ) {
            let min = dataDiscussed[i];
            dataDiscussed[i] = dataDiscussed[j];
            dataDiscussed[j] = min;
          }
        }
      }
      return dataDiscussed;
    };
    //Удаление всех фотографий со страницы
    let removePicture = function () {
      for (let item of document.querySelectorAll(".picture")) {
        item.remove();
      }
    };
    //Привязываем соотвествующие массивы к id-шникам кнопок фильтрации
    const sorted = {
      "filter-random": getDataRnd(),
      "filter-default": window.dataOriginal,
      "filter-discussed": getDataDiscussed(),
    };
    //Находим кнопки фильтрации на странице
    let filterButtons = document.querySelectorAll(".img-filters__button");
    //На каждую кнопу вешаем обработчик клика
    for (let button of filterButtons) {
      button.addEventListener("click", function (evt) {
        //Если задействованная кнопка не активна, то...
        if (!evt.target.classList.contains("img-filters__button--active")) {
          //Находим активную и убираем у неё класс active
          document
            .querySelector(".img-filters__button--active")
            .classList.remove("img-filters__button--active");
          //Добавляем класс выбранной кнопке
          evt.target.classList.add("img-filters__button--active");
          //Удаляем со страницы все фотографии
          removePicture();
          //Передаём массив, которые соотвествует выбранному фильтру в функции отрисовки
          window.picture(sorted[evt.target.id]);
          window.preview(sorted[evt.target.id]);
        }
      });
    }
  };
})();
