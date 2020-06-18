(function () {
  return (window.utils = {
    getRndNum: function (factor) {
      return Math.floor(Math.random() * factor);
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESCKeyCode) {
        action();
      }
    },
  });
})();
