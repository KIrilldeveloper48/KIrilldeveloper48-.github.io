(function () {
  //Сохраняем название выбранного фильтра для дальнейших манипуляций с ним
  let currentFilter;
  //Функция для скрытия или показа полузнка насыщенности
  let displayLevel = function () {
    let levelContainer = window.uploadOverlay.querySelector(".effect-level");
    //Если текущий фильтр - "Оригинал", то скрываем ползунок насыщенности, иначе наоборот показываем его
    if (currentFilter.classList.contains("effects__preview--none")) {
      levelContainer.classList.add("hidden");
    } else levelContainer.classList.remove("hidden");
  };
  //Изображение для редактирования
  let imgPreview = window.uploadOverlay.querySelector(
    ".img-upload__preview>img"
  );
  //Глубина эффекта изображения
  let levelDepth = window.uploadOverlay.querySelector(".effect-level__depth");
  //Пин ползунка насыщенности
  let levelPin = window.uploadOverlay.querySelector(".effect-level__pin");
  //Функция для очистки редакироваемого изображения от стилей и классов, а также скрытия ползунка насыщенности
  window.cleaning = function () {
    imgPreview.style.filter = "";
    imgPreview.className = "";
    window.uploadOverlay.querySelector(".effect-level").classList.add("hidden");
    levelPin.style.left = 0;
    levelDepth.style.width = 0;
  };
  //Навешиваем обработчик клика на контейнер, в котором лежат radioButtons с превью эффектов
  let effectsContainer = window.uploadOverlay.querySelector(".effects__list");
  effectsContainer.addEventListener("click", function (evt) {
    //Проверяем что клик прошёл именно по превью
    if (evt.target.classList.contains("effects__preview")) {
      //Присваиваем переменной элемент, по которому прошёл клик
      currentFilter = evt.target;
      window.cleaning();
      displayLevel();
    }
  });

  //-------------------------------------------------------------------

  //Перезаписываем значение инпута для соотвествия ТЗ
  let rewriteEffectValue = function (transparency) {
    window.uploadOverlay.querySelector(
      ".effect-level__value"
    ).value = transparency;
  };
  //Достаём значение свойства filter из текущего выбранного фильтра, отрезаем всё лишнее и возврщаем только название
  var getObjKey = function () {
    let currentStyle = getComputedStyle(currentFilter).filter;
    return currentStyle.slice(0, currentStyle.indexOf("("));
  };
  //Функция, которая возвращает уже готовое значение свойства filter для подставновки его в style редактируемого изображения
  let getEffect = function (transparency) {
    //Объект с названием фильтра, значением (произведение положения ползунка (в процентах) на множитель конкретного фильтра), и единицей измерения
    const effects = {
      grayscale: {
        value: 0.01 * transparency,
        unit: "",
      },
      sepia: {
        value: 0.01 * transparency,
        unit: "",
      },
      invert: {
        value: 1 * transparency,
        unit: "%",
      },
      blur: {
        value: 0.03 * transparency,
        unit: "px",
      },
      brightness: {
        value: 0.02 * transparency + 1,
        unit: "",
      },
    };
    //Получаем название фильтра, по которому будет искать в объекте
    let nameEffect = getObjKey();
    //Для упрощённой записи запишем значения объекта в отдельные переменные
    let value = effects[nameEffect].value;
    let unit = effects[nameEffect].unit;

    return nameEffect + "(" + value + unit + ")";
  };
  //Добавляем в style свойство filter со значением из функции getEffect
  var addEffect = function (effect) {
    imgPreview.style.filter = effect;
  };
  //Берём первый класс из списка классов у выбранного фильтра и добавляем его к изображению
  var imgAddClass = function () {
    let nameClass = currentFilter.classList[1];
    imgPreview.classList.add(nameClass);
  };
  //Эту функцию передаём в модуль slider.js
  let filtering = function (position) {
    levelDepth.style.width = position + "%";
    rewriteEffectValue(position);
    addEffect(getEffect(position));
    imgAddClass();
  };
  //Вызываем функцию из модуля slider.js для работы ползунка насыщенности
  window.slider(filtering);
})();
