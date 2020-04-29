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

var CHECKIN_THE_HOUSE = ["12: 00", "13: 00", "14: 00"];

var CHECKOUT_HOUSE = ["12: 00", "13: 00", "14: 00"];

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
var generetionMapPin = function(arrayAD) {
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

generetionMapPin(arrayAD);

map.classList.remove("map--faded");
