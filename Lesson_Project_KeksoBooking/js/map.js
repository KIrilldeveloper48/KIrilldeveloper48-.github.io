var OFFER_TITLE = [
  "Большая уютная квартира",
  "Маленькая неуютная квартира",
  "Огромный прекрасный дворец",
  "Маленький ужасный дворец",
  "Красивый гостевой домик",
  "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря",
  "Неуютное бунгало по колено в воде"
];

var AD_Y = {
  min: 130,
  max: 630
};

var AD_X = 1200;

var HOUSE_PRICE = {
  min: 1000,
  max: 1000000
};

var HOUSE_TYPE = ["palace", "flat", "house", "bungalo"];
var HOUSE_TYPE_RU = ["Дворец", "Квартира", "Дом", "Бунгало"];

var CHECKIN_THE_HOUSE = ["12:00", "13:00", "14:00"];

var CHECKOUT_HOUSE = ["12:00", "13:00", "14:00"];

//Collect an array of random length from the features of the house
var getRandomFeaturesHouse = function() {
  let FEATURES_HOUSE = [
    "wifi",
    "dishwasher",
    "parking",
    "washer",
    "elevator",
    "conditioner"
  ];
  let RandomFeaturesHouse = [];
  for (
    var i = 0;
    i < Math.floor(Math.random() * FEATURES_HOUSE.length) + 1;
    i++
  ) {
    let randomIndex = Math.floor(Math.random() * FEATURES_HOUSE.length);
    RandomFeaturesHouse.push(FEATURES_HOUSE[randomIndex]);
    FEATURES_HOUSE.splice(randomIndex, 1);
  }
  return RandomFeaturesHouse;
};

//Collect an array with a random arrangement of photos
var getRandomArrayPhotos = function() {
  let photos = [
    "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
    "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
    "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
  ];
  let randomPhotos = [];
  while (photos.length > 0) {
    let randomIndex = Math.floor(Math.random() * photos.length);
    randomPhotos.push(photos[randomIndex]);
    photos.splice(randomIndex, 1);
  }
  return randomPhotos;
};

//Generation an array with objects
var generationAd = function() {
  //creating an empty array
  let arrayAd = [];

  //filling the array with objects
  for (var i = 0; i < 8; i++) {
    //adding a new object in the array
    arrayAd.push({});

    //adding a random avatar
    arrayAd[i].author = {
      avatar: "img/avatars/user" + "0" + String(i + 1) + ".png"
    };

    //adding random x y coordinates
    arrayAd[i].location = {
      x: Math.floor(Math.random() * AD_X),
      y: Math.floor(Math.random() * (AD_Y.max - AD_Y.min + 1)) + AD_Y.min
    };

    //adding an offer
    arrayAd[i].offer = {
      //adding an offer title from the OFFER_TITLE array
      title: OFFER_TITLE[i],

      //adding an address
      address:
        String(arrayAd[i].location.x) + ", " + String(arrayAd[i].location.y),

      //adding a random price
      price:
        Math.floor(Math.random() * (HOUSE_PRICE.max - HOUSE_PRICE.min + 1)) +
        HOUSE_PRICE.min,

      //adding a random house type from the HOUSE_TYPE array
      type: HOUSE_TYPE[Math.floor(Math.random() * HOUSE_TYPE.length)],

      //adding a random room quantity
      rooms: Math.floor(Math.random() * 5) + 1,

      //adding a random guest quantity
      guests: Math.floor(Math.random() * 5),

      //adding a random time of checking in from the CHECKIN_THE_HOUSE array
      checkin:
        CHECKIN_THE_HOUSE[Math.floor(Math.random() * CHECKIN_THE_HOUSE.length)],
      //adding a random time of checking out from the CHECKOUT_HOUSE array
      checkout:
        CHECKOUT_HOUSE[Math.floor(Math.random() * CHECKOUT_HOUSE.length)],

      //adding random house features
      features: getRandomFeaturesHouse(),

      //adding a description
      decription: "",

      //adding a photos
      photos: getRandomArrayPhotos()
    };
  }
  return arrayAd;
};

var arrayAD = generationAd();

//---------------------------------------------------------------//
var map = document.querySelector(".map");

//finding map mark ana card templates
var templateMap = document.querySelector("template").content;

var mapPin = templateMap.querySelector(".map__pin");

//Finding a container for map marks
var mapPins = document.querySelector(".map__pins");

//Setting the offset along the Y axis based on the heigth of the map mark
var axisShiftY = mapPin.clientHeight / 2 + 18;

//Map mark generation
var generetionMapPin = function() {
  for (var i = 0; i < arrayAD.length; i++) {
    //Cloning DOM element
    let cloneMapPin = mapPin.cloneNode(true);

    let mapAvatar = cloneMapPin.querySelector("img");
    let left = String(arrayAD[i].location.x) + "px";
    let top = String(arrayAD[i].location.y - axisShiftY) + "px";

    //Setting the parameters
    cloneMapPin.style.left = left;
    cloneMapPin.style.top = top;
    mapAvatar.src = arrayAD[i].author.avatar;
    mapAvatar.alt = arrayAD[i].offer.title;

    addingMapPin(cloneMapPin);
  }
};

//Adding the pins on the map
var addingMapPin = function(cloneMapPin) {
  mapPins.appendChild(cloneMapPin);
};

generetionMapPin();

map.classList.remove("map--faded");

//-----------------------------------------------------//

//Starting generation of the house card
var generationCard = function() {
  //finding a container for the card
  var mapFilter = map.querySelector(".map__filters-container");

  //finding the card in the template
  var mapCard = templateMap.querySelector(".map__card");

  //Cloning the DOM element
  let cloneMapCard = mapCard.cloneNode(true);

  let cardTitle = cloneMapCard.querySelector(".popup__title");
  cardTitle.textContent = arrayAD[0].offer.title;

  let cardAddress = cloneMapCard.querySelector(".popup__text--address");
  cardAddress.textContent = arrayAD[0].offer.address;

  let cardPrice = cloneMapCard.querySelector(".popup__text--price");
  cardPrice.textContent = arrayAD[0].offer.price + "₽/ночь";

  let cardType = cloneMapCard.querySelector(".popup__type");
  let houseTypeIndex = HOUSE_TYPE.indexOf(arrayAD[0].offer.type);
  cardType.textContent = HOUSE_TYPE_RU[houseTypeIndex];

  let cardCapacity = cloneMapCard.querySelector(".popup__text--capacity");
  cardCapacity.textContent =
    arrayAD[0].offer.rooms + " комнаты для гостей " + arrayAD[0].offer.guests;

  let cardCheckInAndOut = cloneMapCard.querySelector(".popup__text--time");
  cardCheckInAndOut.textContent =
    "Заезд после " +
    arrayAD[0].offer.checkin +
    ", выезд до " +
    arrayAD[0].offer.checkout;

  let cardFeatures = cloneMapCard.querySelector(".popup__features");
  removeChildPopupFeatures(cardFeatures);
  createListFeatures(cardFeatures);

  let cardDescription = cloneMapCard.querySelector(".popup__description");
  cardDescription.textContent = arrayAD[0].offer.decription;

  let cardPhotos = cloneMapCard.querySelector(".popup__photos");
  createlistPhotos(cardPhotos);

  let cardAvatar = cloneMapCard.querySelector(".popup__avatar");
  cardAvatar.src = arrayAD[0].author.avatar;

  mapFilter.before(cloneMapCard);
};

//Clearing the list of features
var removeChildPopupFeatures = function(cardFeatures) {
  var cardFeaturesChildren = cardFeatures.children;
  while (cardFeaturesChildren.length > 0) {
    let li = cardFeatures.firstElementChild;
    li.remove();
  }
};

//Creating the list of features
var createListFeatures = function(cardFeatures) {
  for (var i = 0; i < arrayAD[0].offer.features.length; i++) {
    let feature = document.createElement("li");
    feature.classList.add("feature--" + arrayAD[0].offer.features[i]);
    feature.classList.add("feature");
    cardFeatures.append(feature);
  }
};

//Creating the list of photos
var createlistPhotos = function(cardPhotos) {
  for (var i = 0; i < arrayAD[0].offer.photos.length; i++) {
    let li = document.createElement("li");
    let img = document.createElement("img");
    img.src = arrayAD[0].offer.photos[i];
    li.append(img);
    cardPhotos.append(li);
  }
};

generationCard();
