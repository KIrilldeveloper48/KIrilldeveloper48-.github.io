"use strict";
(function () {
  let createAdForm = document.querySelector(".ad-form");

  var deleteDisableForm = function () {
    createAdForm.classList.remove("ad-form--disabled");
  };

  var formManagement = function (parameter) {
    let fieldset = createAdForm.querySelectorAll("fieldset");
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].disabled = parameter;
    }
  };

  formManagement("disable");

  //Filling form address
  var fillingFormAddress = function (mod) {
    let parameter = {
      width: Math.floor(window.mainPin.clientWidth / 2),
      heigth: Math.floor(window.mainPin.clientHeight / 2),
      left: window.mainPin.style.left,
      top: window.mainPin.style.top,
    };
    let adFormAddres = createAdForm.querySelector("#address");

    adFormAddres.value =
      getCoord(parameter.left, parameter.width) +
      "," +
      (getCoord(parameter.top, parameter.heigth) + mod);
  };

  var getCoord = function (side, parameter) {
    return Number(side.slice(0, side.indexOf("px"))) + parameter;
  };

  fillingFormAddress(0);
  //----------------------------------------------------------------------------
  //Matching the fields of price to the fields of house type
  let type = createAdForm.querySelector("#type");
  type.addEventListener("change", function () {
    let price = createAdForm.querySelector("#price");

    let houseMap = new Map([
      ["bungalo", 0],
      ["flat", 1000],
      ["house", 5000],
      ["palace", 10000],
    ]);

    price.placeholder = houseMap.get(type.value);
    price.min = houseMap.get(type.value);
  });

  //----------------------------------------------------------------------------
  //Matching the fields of check-in to the fields of checkout
  let timein = createAdForm.querySelector("#timein");
  let timeout = createAdForm.querySelector("#timeout");

  timein.addEventListener("change", function () {
    timeout.value = timein.value;
  });

  timeout.addEventListener("change", function () {
    timein.value = timeout.value;
  });

  //----------------------------------------------------------------------------
  //Validating the form and showing errors, if any found
  let submitButton = createAdForm.querySelector(".ad-form__submit");

  let capacity = createAdForm.querySelector("#capacity");
  let errorMessage = "";

  submitButton.addEventListener("click", function (evt) {
    checkinGuest();
    showErrors();
    //Если нет ошибок, отправляем данные на сервер
    if (errorMessage == "") {
      window.upload(new FormData(createAdForm), function () {
          createAdForm.reset();
        },
        function (message) {
          console.error(message);
        });
      evt.preventDefault();
    }

    errorMessage = "";
  });

  var checkinGuest = function () {
    let errorMessageHelp =
      "Пожалуйста выберите другое кол-во гостей или комнат";
    let rooms = createAdForm.querySelector("#room_number");

    if (rooms.value != capacity.value && capacity.value > rooms.value) {
      for (var i = 0; i < 3; i++) {
        if (rooms.value == i) {
          errorMessage =
            "Выбранное вами кол-во комнат подходит для " +
            i +
            " или менее гостей. " +
            errorMessageHelp;
        }
      }
    }

    if (rooms.value == "100" && capacity.value != "0") {
      errorMessage =
        "Выбранное вами кол-во комнат не подходит для гостей. " +
        errorMessageHelp;
    }
  };

  var showErrors = function () {
    capacity.setCustomValidity(errorMessage);
  };

  window.mainPin.addEventListener("mouseup", function () {
    let modifier = 22 + Math.floor(window.mainPin.clientHeight / 2);
    deleteDisableForm();
    formManagement("");
    fillingFormAddress(modifier);
  });
})();
