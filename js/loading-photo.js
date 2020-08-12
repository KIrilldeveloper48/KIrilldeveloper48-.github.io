(function () {
  //Список допустимых расширений файлов для загрузки
  const fileTypes = ["gif", "png", "jpg", "jpeg"];
  //Инпут
  let inputImage = document.querySelector("#upload-file");
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

  inputImage.addEventListener("change", function (evt) {
    //Куда вставляем изображения
    let image = document.querySelector(".img-upload__preview>img");
    loadPhoto(evt.target, image);
  });
})();
