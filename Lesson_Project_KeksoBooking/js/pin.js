"use strict";
(function () {
  window.genMapPin = function (arrayAD) {
    let template = document.querySelector("#pin").content;
    let mapPin = template.querySelector(".map__pin");
    let mapPins = document.querySelector(".map__pins");
    let axisShift = {
      y: mapPin.clientHeight,
      x: mapPin.clientWidth / 2,
    };

    let cycleTime = mapPins.children.length - 2;
    for (let i = 0; i < cycleTime; i++) {
      mapPins.lastChild.remove();
    }

    for (var i = 0; i < arrayAD.length; i++) {
      if (arrayAD[i].visible === false) {
        continue;
      }
      let clone = mapPin.cloneNode(true);
      let avatar = clone.querySelector("img");
      let left = String(arrayAD[i].location.x - axisShift.x) + "px";
      let top = String(arrayAD[i].location.y - axisShift.y) + "px";

      //Setting the parameters
      clone.style.left = left;
      clone.style.top = top;
      clone.id = "pin-" + i;
      avatar.src = arrayAD[i].author.avatar;
      avatar.alt = arrayAD[i].offer.title;

      mapPins.append(clone);
    }
  };
})();
