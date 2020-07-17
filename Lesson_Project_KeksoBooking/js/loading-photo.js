(function () {
  //Список допустимых расширений файлов для загрузки
  const fileTypes = ["gif", "png", "jpg", "jpeg"];
  //Инпуты
  let inputAvatar = document.querySelector("#avatar");
  let inputImages = document.querySelector("#images");
  //Куда вставляем изображения
  let avatar = document.querySelector(".ad-form-header__preview>img");
  //Основная функция для загрузки фото, в параметрах передаём инпут с которого будем забирать файл и img в src которого будем подставлять data: URL
  let loadPhoto = function (input, img) {
    //Сохраняем в отдельную переменную объект, описывающий файл, который хотим загрузить
    let file = input.files[0];
    //Отдельно сохраняем название файла вместе с расширением в нижнем регистре, чтобы при проверке исключить несовпадения из-за написания одного и того-же расширения в разных регистрах (JPG и jpg)
    let fileName = file.name.toLowerCase();
    //Проверяем входит ли окончание названия файла (расширение) в список допустимых расширений. Функция возвращает булево значение
    let mathces = fileTypes.some(function (it) {
      return fileName.endsWith(it);
    });
    //Если загружен файл с допустимым расширением то...
    if (mathces) {
      //Создаём объект для записи загружаемого файла в кодировке base64 в протокол data: URL
      let reader = new FileReader();
      //Когда чтение будет закончено записываем полученный результат в src
      reader.addEventListener("load", function () {
        img.src = reader.result;
      });
      //Запускаем процесс чтения данных, передавая в качестве параметра загружаемый файл
      reader.readAsDataURL(file);
    }
  };

  let getPhotoContainer = function () {
    let container = document.createElement("div");
    container.classList.add("ad-form__photo");
    return container;
  };

  let getImg = function () {
    let img = document.createElement("img");
    img.style.width = "70px";
    img.style.height = "70px";
    return img;
  };

  //Добавляем изображение на страницу
  let addHousePhotos = function (img) {
    //Создаём контейнер в который будем добавлять изображение
    let container = getPhotoContainer();
    container.append(img);
    document.querySelector(".ad-form__photo-container").append(container);
  };

  inputAvatar.addEventListener("change", function (evt) {
    loadPhoto(evt.target, avatar);
  });

  inputImages.addEventListener("change", function (evt) {
    //Создаём img в src которого будет записывать data: URL загружаемого файла
    let houseImg = getImg();
    loadPhoto(evt.target, houseImg);
    addHousePhotos(houseImg);
  });
})();
