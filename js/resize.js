(function () {
  //Изображение для редактирования
  let imgPreview = window.uploadOverlay.querySelector(
    ".img-upload__preview>img"
  );
  //Кнопки управления масштабом
  let resizePlus = window.uploadOverlay.querySelector(
    ".scale__control--bigger"
  );
  let resizeMinus = window.uploadOverlay.querySelector(
    ".scale__control--smaller"
  );
  //Отображение текущего масштаб и его значение
  let resizeValue = window.uploadOverlay.querySelector(
    ".scale__control--value"
  );
  let scaleValue = 100;

  //Меняем отображение значения масштаба
  let addResizeValue = function () {
    resizeValue.value = String(scaleValue) + "%";
  };
  //Добавляем свойство transform-scale на избражение
  let addResizeImg = function () {
    imgPreview.style.transform = "scale" + "(" + resizeValue.value + ")";
  };
  //Нажатие на плюс увеличивает масштаб на 25%, если текущий масштаб менее 100%
  resizePlus.addEventListener("click", function () {
    if (resizeValue.value != "100%") {
      scaleValue += 25;
      addResizeValue();
      addResizeImg();
    }
  });
  //Нажатие на минус уменшает масштаб на 25%, если текущий масштаб более 25%
  resizeMinus.addEventListener("click", function () {
    if (resizeValue.value != "25%") {
      scaleValue -= 25;
      addResizeValue();
      addResizeImg();
    }
  });
})();
