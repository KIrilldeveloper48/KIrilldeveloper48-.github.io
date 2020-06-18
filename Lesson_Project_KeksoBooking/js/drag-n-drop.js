(function () {
  window.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    }

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      }

      window.mainPin.style.top = (window.mainPin.offsetTop - shift.y) + 'px';
      window.mainPin.style.left = (window.mainPin.offsetLeft - shift.x) + 'px';
    }

    var onMouseup = function (upEvt) {
      upEvt.preventDefault();
      window.map.removeEventListener('mousemove', onMouseMove);
      window.map.removeEventListener('mouseup', onMouseup);
    }

    window.map.addEventListener('mousemove', onMouseMove);
    window.map.addEventListener('mouseup', onMouseup);

  })
})();
