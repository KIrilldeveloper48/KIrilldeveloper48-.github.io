(function () {
  let formSelect = document.querySelectorAll(".map__filters > select");
  let formInput = document.querySelectorAll(".map__features > input");
  let formSelectObj = {};
  let formInputObj = {};
  //Собираем массив со значениями полей фильтров
  let getObj = function (arr, val, obj, num) {
    for (let item of arr) {
      let key = item.id.slice(num, item.id.length);
      obj[key] = item[val];
    }
  };

  getObj(formSelect, "value", formSelectObj, 8);
  getObj(formInput, "checked", formInputObj, 7);

  //-----------------------------

  let checkingOther = function (key, value) {
    return formSelectObj[key] == "any" || formSelectObj[key] == value;
  };

  let checkingPrice = function (housePrice) {
    let cost = {
      min: 10000,
      max: 50000,
    };
    let priceList = {
      middle: function () {
        return housePrice >= cost.min && housePrice <= cost.max;
      },
      low: function () {
        return housePrice < cost.min;
      },
      high: function () {
        return housePrice > cost.max;
      },
      any: function () {
        return true;
      },
    };

    return priceList[formSelectObj.price]();
  };

  let checkingSelectors = function (key, value) {
    if (key == "price") {
      return checkingPrice(value);
    } else return checkingOther(key, value);
  };

  let checkingInputs = function (key, arr) {
    return arr.indexOf(key) >= 0;
  };

  let filtering = function () {
    let newData = window.arrayAD.slice();
    for (let i = 0; i < newData.length; i++) {
      newData[i].visible = true;
      for (let key in formSelectObj) {
        if (newData[i].visible) {
          newData[i].visible = checkingSelectors(key, newData[i].offer[key]);
        }
      }
      for (let key in formInputObj) {
        if (newData[i].visible && formInputObj[key]) {
          newData[i].visible = checkingInputs(key, newData[i].offer.features);
        }
      }
    }
    window.genMapPin(newData);
    window.addClickPin();
  };

  //--------------------------
  //Вешаем обработчик события change на фильтры. При изменении значения фильтра - с помощью id изменившегося фильтра находим ключ в объекте и меняем его значение

  let onChangeField = function (arr, obj, num, val) {
    for (item of arr) {
      item.addEventListener("change", function (evt) {
        let key = evt.target.id.slice(num, evt.target.id.length);
        obj[key] = evt.target[val];
        setTimeout(filtering, 500);
      });
    }
  };

  onChangeField(formSelect, formSelectObj, 8, "value");
  onChangeField(formInput, formInputObj, 7, "checked");
})();
