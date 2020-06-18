(function () {
  window.load(function (data) {
      window.data = data;
      picture();
      preview();
    },
    function (message) {
      console.error(message);
    });
})();
