(function () {
  //checking a hashTag
  var hashTagInput = window.uploadOverlay.querySelector(".text__hashtags");
  var uploadButton = window.uploadOverlay.querySelector(".img-upload__submit");
  var uploadDescription = window.uploadOverlay.querySelector(
    ".text__description"
  );
  var uploadform = document.querySelector(".img-upload__form");
  var currentFocusEl = "";

  var hashTagInputVal;
  var hashTagArray;
  var erorrString = "";

  //Открытие формы после выбора загружаемого файла
  let uploadFile = document.querySelector("#upload-file");
  uploadFile.addEventListener("change", function () {
    window.uploadOverlay.classList.remove("hidden");
    hashTagInput.focus();
  });

  //When 'submit the form' button is pressed, reading and checking the entered data. Showing the error message, if any found
  uploadButton.addEventListener("click", function (evt) {
    hashTagInputVal = hashTagInput.value;
    clearValue();
    hastTagFillingArray();
    checkingTags();
    erorrOutPut();
    if (erorrString == "") {
      window.upload(
        new FormData(uploadform),
        function () {
          formClose();
        },
        function (message) {
          console.error(message);
        }
      );
      evt.preventDefault();
    }
  });

  var clearValue = function () {
    erorrString = "";
    hashTagArray = [];
    hashTagInput.setCustomValidity("");
  };

  var hastTagFillingArray = function () {
    let space;
    let hashTagString = "";
    for (var i = 0; i < hashTagInputVal.length; i++) {
      if (hashTagInputVal[i] != " ") {
        space = false;
      } else space = true;

      if (!space) {
        hashTagString += hashTagInputVal[i];
      }

      if (space || i == hashTagInputVal.length - 1) {
        if (hashTagString !== "") {
          hashTagArray.push(hashTagString.toLowerCase());
        }
        hashTagString = "";
      }
    }
  };

  var checkingTags = function () {
    for (var i = 0; i < hashTagArray.length; i++) {
      if (hashTagArray[i][0] !== "#") {
        erorrString += " У хеш-тега №" + (i + 1) + " отсутствует знак #";
      }
      if (hashTagArray[i].length == 1) {
        erorrString +=
          " хеш-тег не может состоять из одного символа (хеш-тег №" +
          (i + 1) +
          ")";
      }
      if (hashTagArray[i].indexOf("#", 1) > 0) {
        erorrString += " хэш-теги нужно разделять пробелами";
      }
      if (hashTagArray[i].length > 20) {
        erorrString +=
          "максимальная длина одного хэш-тега 20 символов, включая решётку";
      }
    }
    checkingTagsForDuplicates();
    checkingTagsForLength();
  };

  var checkingTagsForDuplicates = function () {
    for (var i = 0; i < hashTagArray.length - 1; i++) {
      let theOneBeingChecked = hashTagArray[i];
      for (var j = i + 1; j < hashTagArray.length; j++) {
        if (theOneBeingChecked === hashTagArray[j]) {
          erorrString += " хэш-теги не должны повторяться";
        }
      }
    }
  };

  var checkingTagsForLength = function () {
    if (hashTagArray.length > 5) {
      erorrString += " Нельзя указать более пяти хэш-тегов";
    }
  };

  var erorrOutPut = function () {
    if (erorrString !== "") {
      hashTagInput.setCustomValidity(erorrString);
    }
  };


})();
