(function () {
  const ESCKeyCode = 27;
  window.isEscEvent = function (evt, action) {
    if (evt.keyCode === ESCKeyCode) {
      action();
    }
  };
})();
