window.util = (function () {
  let ESCKeyCode = 27;

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESCKeyCode) {
        action();
      }
    },
  }
})();
