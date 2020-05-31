"use strict";
(function () {

  var genMapPin = function () {
    let template = document.querySelector("#pin").content;
    let mapPin = template.querySelector(".map__pin");
    let mapPins = document.querySelector(".map__pins");
    let axisShift = {
      y: mapPin.clientHeight,
      x: mapPin.clientWidth / 2
    }

    for (var i = 0; i < window.arrayAD.length; i++) {
      let clone = mapPin.cloneNode(true);
      let avatar = clone.querySelector("img");
      let left = String(window.arrayAD[i].location.x - axisShift.x) + "px";
      let top = String(window.arrayAD[i].location.y - axisShift.y) + "px";

      //Setting the parameters
      clone.style.left = left;
      clone.style.top = top;
      clone.id = 'pin-' + i;
      avatar.src = arrayAD[i].author.avatar;
      avatar.alt = arrayAD[i].offer.title;

      mapPins.append(clone);
    }
  };

  window.mainPin.addEventListener("mouseup", genMapPin)

})();
