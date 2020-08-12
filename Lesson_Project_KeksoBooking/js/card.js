"use strict";

(function () {
  window.addClickPin = function () {
    let mapPins = document.querySelectorAll(".map__pin");

    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].addEventListener("click", function (evt) {
        if (
          evt.target.parentElement.id != "" &&
          evt.target.parentElement != "SVG"
        ) {
          let currentAdClick = evt.target.offsetParent.id;
          let index = currentAdClick.slice(4, currentAdClick.length);

          createCard(index);
        }
      });
    }
  };

  var createCard = function (index) {
    let container = document.querySelector('.map__pins')

    let template = document.querySelector('#card').content;
    let mapFilter = document.querySelector(".map__filters-container");
    let card = template.querySelector(".map__card");

    let clone = card.cloneNode(true);
    let title = clone.querySelector(".popup__title");
    let address = clone.querySelector(".popup__text--address");
    let price = clone.querySelector(".popup__text--price");
    let type = clone.querySelector(".popup__type");
    let capacity = clone.querySelector(".popup__text--capacity");
    let inAndOut = clone.querySelector(".popup__text--time");
    let feats = clone.querySelector(".popup__features");
    let description = clone.querySelector(".popup__description");
    let photos = clone.querySelector(".popup__photos");
    let avatar = clone.querySelector(".popup__avatar");

    let currentEl = window.arrayAD[index];

    title.textContent = currentEl.offer.title;
    address.textContent = currentEl.offer.address;
    price.textContent = currentEl.offer.price + "₽/ночь";
    type.textContent = currentEl.offer.type;
    capacity.textContent =
      currentEl.offer.rooms + " комнаты для гостей " + currentEl.offer.guests;

    inAndOut.textContent =
      "Заезд после " +
      currentEl.offer.checkin +
      ", выезд до " +
      currentEl.offer.checkout;

    description.textContent = currentEl.offer.decription;
    avatar.src = currentEl.author.avatar;

    removeChildPopupFeats(feats);
    createListFeats(feats, currentEl);
    createListPhotos(photos, currentEl);

    removeCard();

    container.append(clone);

    cardClose();
  };

  //Clearing the list of features
  var removeChildPopupFeats = function (feats) {
    while (feats.children.length > 0) {
      feats.firstElementChild.remove()
    }
  };

  //Creating the list of features
  var createListFeats = function (cardFeats, currentEl) {
    for (var i = 0; i < currentEl.offer.features.length; i++) {
      let feats = document.createElement("li");
      feats.classList.add("popup__feature--" + currentEl.offer.features[i], "popup__feature");

      cardFeats.append(feats);
    }
  };

  //Creating the list of photos
  var createListPhotos = function (cardPhotos, currentEl) {
    for (var i = 0; i < currentEl.offer.photos.length; i++) {
      let img = document.createElement("img");
      img.src = currentEl.offer.photos[i];
      img.classList.add('popup__photo');
      img.width = '45';
      img.heigth = '45';
      img.alt = 'Фотография жилья'
      cardPhotos.append(img);
    }
  };

  var removeCard = function () {
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }
  }

  var cardClose = function () {
    let card = document.querySelector('.map__card');
    let button = card.querySelector('.popup__close');

    button.addEventListener('click', function () {
      card.remove();
    })
  }
})();
