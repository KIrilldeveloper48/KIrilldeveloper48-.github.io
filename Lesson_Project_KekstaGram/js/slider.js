(function () {
  return window.slider = function (callback) {

    //пин ползунка
    let pin = document.querySelector(".effect-level__pin");

    //Область перемещения пина ползунка
    let line = document.querySelector(".effect-level__line")

    //Область в которой происходить отслеживание клика по пину
    let area = document.querySelector(".img-upload__overlay");

    //Перемещение начинаеться с нажатия мыши на пине
    pin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      //Запоминаем стартовые координаты пина
      let startsCoord = {
        x: evt.clientX
      };

      //Описываем действия проиходящие при перемещении мыши
      //moveEvt при каждом движении мыши передаёт положение перемещаемого элемента по осям x и y 
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        //Вычисляем и запоминаем на сколько пикселей произошло смещение
        let shift = {
          x: startsCoord.x - moveEvt.clientX
        };

        //Обновляем стартовые координаты
        startsCoord = {
          x: moveEvt.clientX
        };

        //Записываем в стили пина ползунка его обновлённое положение от левого края области перемещения. 
        //Чтобы пин не вышел за пределы полоски, перед добавлением стилей, проверяем впишется ли новое положение в заданные рамки
        if ((pin.offsetLeft - shift.x) >= 0 && (pin.offsetLeft - shift.x) <= line.clientWidth) {
          pin.style.left = (pin.offsetLeft - shift.x) + 'px';
        }

        //Положение пина ползунка в процентах от  0 до 100
        let position = getPosition();

        //Вызываем функцию для дальнейшей работы с положением ползунка
        callback(position);
      };

      //При отпускании кнопи мыши перестаём отслеживать движения
      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        area.removeEventListener('mousemove', onMouseMove);
        area.removeEventListener('mouseup', onMouseUp);
      };

      area.addEventListener('mousemove', onMouseMove);
      area.addEventListener('mouseup', onMouseUp);

    });

    //вычисляем положение пина ползунка
    var getPosition = function () {
      return Math.floor((100 / line.clientWidth) * pin.offsetLeft);
    }
  };
})();
