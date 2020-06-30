(function () {
  let hashTagInput = window.uploadOverlay.querySelector(".text__hashtags");
  let uploadButton = window.uploadOverlay.querySelector(".img-upload__submit");
  let uploadform = document.querySelector(".img-upload__form");
  //Элемент в который будут добавляться на страницу теги с текстом ошибок
  let errorList = document.querySelector(".hashtags__errors");

  //Чтобы показывать ошибки в реальном времени, запускаем проверку и вывод ошибок при каждом вводе символа
  hashTagInput.addEventListener("keyup", function () {
    checkHashTag();
    if (errorList.querySelector("ul").children.length > 0) {
      shownError();
    } else hideError();
  });

  let shownError = function () {
    errorList.classList.remove("hidden");
    hashTagInput.classList.add("hashtags-error");
  };

  window.hideError = function () {
    errorList.classList.add("hidden");
    hashTagInput.classList.remove("hashtags-error");
  };

  //Возвращает массив с хеш-тегами для его дальнейшей проверки
  let getHashTagArr = function () {
    //В эту строку посимвольно будет добавляться хеш-тег для дальнейшего его добавления в массив.
    let str = "";
    //Записываем строку со всеми хеш-тегами в отдельную переменную для удобства.
    let val = hashTagInput.value;
    //Заранее создаём массив в котрый будет записывать хеш-теги
    let hashTagArr = [];
    //Проходимся по каждому символу в полученной строке с хеш-тегами
    for (let symbol of val) {
      //Определяем и запоминаем является ли текущий символ пробелом
      let space = symbol === " ";
      //Если текущий символ не является пробелом то добавляем его к строке
      if (!space) str += symbol;
      //Если текущий символ - пробел, значит хеш-тег закончился и его можно добавить в массив, затем очистить строку для следующего тега
      else {
        pushStr(str, hashTagArr);
        str = "";
      }
    }
    //После завершения цикла, ещё раз запускаем функцию для добавления последнего хеш-тега
    pushStr(str, hashTagArr);
    //Возвращаем собранный массив
    return hashTagArr;
  };

  //Вспомогательная функция для добавления строки в массив
  let pushStr = function (str, arr) {
    if (str !== "") {
      arr.push(str.toLowerCase());
    }
  };

  //Проверяем хеш-теги на соответствие условиям. Все несоответствия записываем в строку с ошибками
  let checkHashTag = function () {
    //Перед началом проверки очищаем список с ошибками
    window.cleanError();

    //Проходимся по каждому элементу массива
    for (item of getHashTagArr()) {
      //Проверяем стоит ли в начале хеш-тега "#"
      if (item[0] !== "#") {
        createErrorEl("У хеш-тега " + item + " отсутствует знак #");
      }
      //Проверяем из скольки символов состоит хеш-тег
      if (item.length == 1) {
        createErrorEl(
          "Хеш-тег " +
          item +
          " слишком короткий. Мин. длина - 1 символ, не включая решётку"
        );
      }
      //Проверяем из скольки символов состоит хеш-тег
      if (item.length > 20) {
        createErrorEl(
          "Хеш-тег " +
          item +
          " слишком длинный. Макс. длина - 20 символов, не включая решётку"
        );
      }
      //Начиная со второго символа, проверяем, есть ли ещё в этом элементе символ "#"
      if (item.indexOf("#", 1) > 0) {
        createErrorEl("Хэш-теги нужно разделять пробелами (" + item + ")");
      }
    }
    //Запускаем проверку на кол-во хеш-тегов
    if (getHashTagArr().length > 5) {
      createErrorEl("Нельзя указать более пяти хэш-тегов");
    }
    //Запускаем проверку на дубликаты
    checkDupl();
  };

  //Удаление тегов с тектом ошибок
  window.cleanError = function () {
    while (errorList.querySelector("ul").firstChild) {
      errorList.querySelector("ul").firstChild.remove();
    }
  };

  let checkDupl = function () {
    let arr = getHashTagArr();
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr.indexOf(arr[i], i + 1) > 0) {
        createErrorEl("Хэш-теги не должны повторяться (" + arr[i] + ")");
      }
    }
  };

  //Функция для создания элемента с текстом ошибки и добавления его в список
  let createErrorEl = function (txt) {
    let li = document.createElement("li");
    li.textContent = txt;
    //Перед добавлением нового элемента в список, проверяем сколько элементов уже добавленно, чтобы не было переполнения
    if (errorList.querySelector("ul").children.length < 6) {
      errorList.querySelector("ul").append(li);
    }
  };

  //При нажатии на кнопку отправки формы, проверяем есть ли у элемента ul дочерние элементы (которые содержат текст ошибок), если дочерних элементов нет, то вызываем функцию отправки формы.
  uploadButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    if (errorList.querySelector("ul").children.length === 0) {
      window.upload(
        new FormData(uploadform),
        function () {
          formClose();
        },
        function (message) {
          console.error(message);
        }
      );
    }
  });
})();
