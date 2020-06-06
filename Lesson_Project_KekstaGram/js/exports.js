(function () {
  return window.utils = {
    getRndNum: function (factor) {
      return Math.floor(Math.random() * factor)
    }
  }
})();

(function () {
  return window.uploadOverlay = document.querySelector(".img-upload__overlay");
})();
