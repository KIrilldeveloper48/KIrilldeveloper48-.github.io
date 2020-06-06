(function () {
  var currentFilter;
  var transparency;
  var imgPreview = window.uploadOverlay.querySelector(".img-upload__preview>img");
  var filters = window.uploadOverlay.querySelectorAll(".effects__radio");
  let levelPin = window.uploadOverlay.querySelector(".effect-level__pin");
  let levelDepth = window.uploadOverlay.querySelector(".effect-level__depth");

  var filtersOnClick = function () {
    let levelContainer = window.uploadOverlay.querySelector(".effect-level");

    for (var i = 0; i < filters.length; i++) {
      filters[i].addEventListener("click", function (evt) {
        currentFilter = getFilter(evt);
        cleaning();

        if (currentFilter != "effect-none") levelShow();
        else levelHidden();
      });
    };

    var getFilter = function (evt) {
      return evt.originalTarget.id
    }

    var cleaning = function () {
      imgPreview.style.filter = "";
      imgPreview.className = "";
      transparency = 0;
      levelPin.style.left = 0;
      levelDepth.style.width = 0;
    };

    var levelShow = function () {
      levelContainer.classList.remove("hidden");
    };

    var levelHidden = function () {
      levelContainer.classList.add("hidden");
    };
  }();

  //-------------------------------------------------------------------

  var filtering = function () {
    let levelLine = window.uploadOverlay.querySelector(".effect-level__line");

    levelPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      let levelFieldset = window.uploadOverlay.querySelector(".effect-level");

      let startsCoord = {
        x: evt.clientX
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        let shift = {
          x: startsCoord.x - moveEvt.clientX
        };

        startsCoord = {
          x: moveEvt.clientX
        };

        if ((levelPin.offsetLeft - shift.x) > 0 && (levelPin.offsetLeft - shift.x) < 455) {
          levelPin.style.left = (levelPin.offsetLeft - shift.x) + 'px';
        }

        transparency = getTransparency();
        levelDepth.style.width = transparency + "%"
        rewriteEffectValue(transparency);
        addEffects();
        imgAddClass();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        levelFieldset.removeEventListener('mousemove', onMouseMove);
        levelFieldset.removeEventListener('mouseup', onMouseUp);
      };
      levelFieldset.addEventListener('mousemove', onMouseMove);
      levelFieldset.addEventListener('mouseup', onMouseUp);
    })

    var getTransparency = function () {
      return Math.floor((100 / levelLine.clientWidth) * (levelPin.offsetLeft + levelPin.clientWidth / 2));
    }

    var rewriteEffectValue = function () {
      let effectsValue = window.uploadOverlay.querySelector(".effect-level__value");
      effectsValue.value = transparency;
    };

    //Creating the dictionary for matching filters and effects
    var getMap = function () {
      let effects = [
        [" ", 1, ""],
        ["grayscale", 0.01, ""],
        ["sepia", 0.01, ""],
        ["invert", 1, "%"],
        ["blur", 0.03, "px"],
        ["brightness", 0.03, ""],
      ];

      let map = new Map();

      for (var i = 0; i < filters.length; i++) {
        map.set(filters[i].id, effects[i]);
      }
      return map
    };

    var addEffects = function () {
      //Finding the effect index that matches the filter in the dictionary
      effectArr = getMap().get(currentFilter);
      imgPreview.style.filter = setFilter(
        effectArr[0],
        effectArr[1],
        effectArr[2]
      );
    };

    var setFilter = function (effect, value, unit) {
      transparency *= value;

      if (effect === "brightness") {
        transparency++;
      }

      return effect + "(" + transparency + unit + ")";
    };

    var imgAddClass = function () {
      let nameClass = "effects__preview--" + currentFilter.slice(7, currentFilter.length);
      imgPreview.classList.add(nameClass);
    };

  }();

  //----------------------------------------------
  var scaleControl = function () {
    let resizePlus = window.uploadOverlay.querySelector(".scale__control--bigger");
    let resizeMinus = window.uploadOverlay.querySelector(".scale__control--smaller");
    let resizeValue = window.uploadOverlay.querySelector(".scale__control--value");
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
  }();
})();
