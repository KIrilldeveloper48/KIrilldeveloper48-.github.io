"use strict";
(function () {

  var deleteFadedMap = function () {

    window.map.classList.remove("map--faded");
  };

  window.mainPin.addEventListener("click", deleteFadedMap);

})();
