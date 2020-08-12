(function () {
  //Открытие формы после выбора загружаемого файла
  let uploadFile = document.querySelector("#upload-file");
  uploadFile.addEventListener("change", function () {
    window.uploadOverlay.classList.remove("hidden");
  });

  //Функционал закрытия формы
  let close = window.uploadOverlay.querySelector("#upload-cancel");
  //Элемент в котором находятся теги с текстом ошибок. (Продублировал этот элемент из модуля form.js для удобства)

  window.formClose = function () {
    window.uploadOverlay.classList.add("hidden");
    //Запускаем функцию из модуля filtering.js для сброса фильтров с изображения
    cleaning();
    //Запускаем функцию из модуля form.js для удаления тегов с текстом ошибок
    window.cleanError();
    //Запускаем функцию из модуля form.js для удаления стлией поля ввода
    window.hideError();
    //Очищаем поля ввода
    document.querySelector(".img-upload__form").reset();
  };

  close.addEventListener("click", formClose);

  //Закрываем форму, елси был произведён клик за её пределами
  window.uploadOverlay.addEventListener("click", function (evt) {
    if (evt.target == window.uploadOverlay) {
      formClose();
    }
  });
})();
