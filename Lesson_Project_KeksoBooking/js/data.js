"use strict";
(function () {
  window.load(
    function (data) {
      window.arrayAD = data;
      window.mainPin.addEventListener("mouseup", function () {
        window.genMapPin(data);
      });
      window.mainPin.addEventListener("mouseup", function () {
        window.addClickPin();
      });
    },
    function (message) {
      console.error(message);
    }
  );
})();
