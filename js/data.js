(function () {
  //Запускаем функцию из модуля backend
  window.load(
    function (data) {
      //Присваиваем глобальной переменной полученные данные 
      window.dataOriginal = data;
      //Запускаем фунции по отрисовки фотографии и превью
      window.picture(data);
      window.preview(data);
      //Запускаем функцию для сортировки фотографий
      window.imgFilters();
    },
    function (message) {
      console.error(message);
    }
  );
})();
