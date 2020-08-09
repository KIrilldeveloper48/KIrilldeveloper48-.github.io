"use strict";
(function () {
  window.load(
    function (data) {
      window.arrayAD = data;
      console.log(window.arrayAD);
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
