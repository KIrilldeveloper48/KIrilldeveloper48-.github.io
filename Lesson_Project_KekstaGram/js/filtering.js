(function () {
  let currentFilter;
  let listEffects = window.uploadOverlay.querySelector(".effects__list");
  listEffects.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("effects__preview")) {
      onClickMouse(evt);
    }
  });

  var onClickMouse = function (evt) {
    currentFilter = getFilter(evt);
    cleaning();

    if (currentFilter.classList.contains("effects__preview--none") == false) {
      levelShow();
    } else levelHidden();
  };

  var getFilter = function (evt) {
    return evt.target;
  };

  let imgPreview = window.uploadOverlay.querySelector(
    ".img-upload__preview>img"
  );
  let levelDepth = window.uploadOverlay.querySelector(".effect-level__depth");
  let levelPin = window.uploadOverlay.querySelector(".effect-level__pin");

  var cleaning = function () {
    imgPreview.style.filter = "";
    imgPreview.className = "";
    transparency = 0;
    levelPin.style.left = 0;
    levelDepth.style.width = 0;
  };

  let levelContainer = window.uploadOverlay.querySelector(".effect-level");

  var levelShow = function () {
    levelContainer.classList.remove("hidden");
  };

  var levelHidden = function () {
    levelContainer.classList.add("hidden");
  };

  //-------------------------------------------------------------------

  var filtering = function (position) {
    levelDepth.style.width = position + "%";
    rewriteEffectValue(position);
    let effect = getEffect(position);
    addEffect(effect);
    imgAddClass();
  };

  var rewriteEffectValue = function (transparency) {
    let effectsValue = window.uploadOverlay.querySelector(
      ".effect-level__value"
    );
    effectsValue.value = transparency;
  };

  var getEffect = function (transparency) {
    let effects = {
      grayscale: {
        multiplier: 0.01,
        unit: "",
      },
      sepia: {
        multiplier: 0.01,
        unit: "",
      },
      invert: {
        multiplier: 1,
        unit: "%",
      },
      blur: {
        multiplier: 0.03,
        unit: "px",
      },
      brightness: {
        multiplier: 0.03,
        unit: "",
      },
    };

    let nameEffect = getObj();
    let value = transparency * effects[nameEffect].multiplier;

    if (nameEffect == "brightness") {
      value++;
    }

    let unit = effects[nameEffect].unit;
    return nameEffect + "(" + value + unit + ")";
  };

  var getObj = function () {
    let currentStyle = getComputedStyle(currentFilter).filter;
    return currentStyle.slice(0, currentStyle.indexOf("("));
  };

  var addEffect = function (effect) {
    imgPreview.style.filter = effect;
  };

  var imgAddClass = function () {
    let nameClass = currentFilter.classList[1];
    imgPreview.classList.add(nameClass);
  };

  var callSlider = (function () {
    window.slider(filtering);
  })();

  //Функционал закрытия формы
  let close = window.uploadOverlay.querySelector("#upload-cancel");

  window.formClose = function () {
    window.uploadOverlay.classList.add("hidden");
    cleaning();
    document.querySelector('.img-upload__form').reset();
  };

  close.addEventListener("click", formClose);

  window.uploadOverlay.addEventListener("click", function (evt) {
    if (evt.target == window.uploadOverlay) {
      formClose();
    }
  });
})();

//----------------------------------------------
var scaleControl = (function () {
  let resizePlus = window.uploadOverlay.querySelector(
    ".scale__control--bigger"
  );
  let resizeMinus = window.uploadOverlay.querySelector(
    ".scale__control--smaller"
  );
  let resizeValue = window.uploadOverlay.querySelector(
    ".scale__control--value"
  );
  let scaleValue = 100;

  resizePlus.addEventListener("click", function () {
    if (resizeValue.value != "100%") {
      scaleValue += 25;
      addResizeValue();
      addResizeImg();
    }
  });

  resizeMinus.addEventListener("click", function () {
    if (resizeValue.value != "25%") {
      scaleValue -= 25;
      addResizeValue();
      addResizeImg();
    }
  });

  var addResizeValue = function () {
    resizeValue.value = String(scaleValue) + "%";
  };

  var addResizeImg = function () {
    imgPreview.style.transform = "scale" + "(" + resizeValue.value + ")";
  };
})();
