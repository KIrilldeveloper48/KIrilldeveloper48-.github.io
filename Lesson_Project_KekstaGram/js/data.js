(function () {
  window.load(
    function (data) {
      window.dataOriginal = data;
      window.picture(data);
      window.preview(data);
      window.imgFilters();
    },
    function (message) {
      console.error(message);
    }
  );
})();
