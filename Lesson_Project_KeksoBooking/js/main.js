const OFFER_TITLE = [
  "Большая уютная квартира",
  "Маленькая неуютная квартира",
  "Огромный прекрасный дворец",
  "Маленький ужасный дворец",
  "Красивый гостевой домик",
  "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря",
  "Неуютное бунгало по колено в воде"
];
const HOUSE_TYPE = ["palace", "flat", "house", "bungalo"];
const HOUSE_TYPE_RU = ["Дворец", "Квартира", "Дом", "Бунгало"];
const CHECKIN_THE_HOUSE = ["12:00", "13:00", "14:00"];
const CHECKOUT_HOUSE = ["12:00", "13:00", "14:00"];

const FEATURES_HOUSE = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner"
];

var photos = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];

const AD_Y = {
  min: 130,
  max: 630
};
const AD_X = 1200;
const HOUSE_PRICE = {
  min: 1000,
  max: 1000000
};

var createAdForm = document.querySelector('.ad-form');
var createAdFormEl = createAdForm.querySelectorAll('fieldset');

for (var i = 0; i < createAdFormEl.length; i++) {
  createAdFormEl[i].disabled = 'disable';
}

var activeAdForm = function () {
  for (var i = 0; i < createAdFormEl.length; i++) {
    createAdFormEl[i].disabled = '';
  }
}

//Generation an array with objects
var generationAd = function () {
  let arrayAd = [];

  for (var i = 0; i < 8; i++) {
    arrayAd.push({});

    arrayAd[i].author = {
      avatar: "img/avatars/user" + "0" + String(i + 1) + ".png"
    };

    //adding random x y coordinates for map pin
    arrayAd[i].location = {
      x: Math.floor(Math.random() * AD_X),
      y: Math.floor(Math.random() * (AD_Y.max - AD_Y.min + 1)) + AD_Y.min
    };

    arrayAd[i].offer = {
      title: OFFER_TITLE[i],

      address: String(arrayAd[i].location.x) + ", " + String(arrayAd[i].location.y),

      price: Math.floor(Math.random() * (HOUSE_PRICE.max - HOUSE_PRICE.min + 1)) + HOUSE_PRICE.min,

      type: HOUSE_TYPE[Math.floor(Math.random() * HOUSE_TYPE.length)],

      rooms: Math.floor(Math.random() * 5) + 1,

      guests: Math.floor(Math.random() * 5),

      checkin: CHECKIN_THE_HOUSE[Math.floor(Math.random() * CHECKIN_THE_HOUSE.length)],

      checkout: CHECKOUT_HOUSE[Math.floor(Math.random() * CHECKOUT_HOUSE.length)],

      features: getRandomFeaturesHouse(),

      decription: "",

      photos: getRandomArrayPhotos()
    };
  }
  return arrayAd;
};

//Collect an array of random length from the features of the house
var getRandomFeaturesHouse = function () {
  let RandomFeaturesHouse = [];
  let randomCycleTime = Math.ceil(Math.random() * FEATURES_HOUSE.length) - 1;
  if (randomCycleTime == 0) {
    randomCycleTime++;
  }
  for (var i = 0; i < randomCycleTime; i++) {
    let randomIndexFeatures = Math.ceil(Math.random() * FEATURES_HOUSE.length) - 1;
    if (RandomFeaturesHouse.indexOf(FEATURES_HOUSE[randomIndexFeatures]) >= 0) {
      i--
    } else RandomFeaturesHouse.push(FEATURES_HOUSE[randomIndexFeatures]);

  }
  return RandomFeaturesHouse;
};

//Collect an array with a random arrangement of photos
var getRandomArrayPhotos = function () {
  let randomPhotos = [];
  for (var i = 0; i < photos.length; i++) {
    let randomIndexPhotos = Math.ceil(Math.random() * photos.length) - 1;
    if (randomPhotos.indexOf(photos[randomIndexPhotos]) >= 0) {
      i--
    } else randomPhotos.push(photos[randomIndexPhotos]);
  }
  return randomPhotos;
};

var arrayAD = generationAd();
//---------------------------------------------------------------//

var map = document.querySelector(".map");
var templateMap = document.querySelector("#pin").content;
var mapPin = templateMap.querySelector(".map__pin");
var mapPins = document.querySelector(".map__pins");

var currentAdindex;
//Setting the offset along the Y axis based on the heigth of the map mark
var axisShiftY = mapPin.clientHeight;

var axisShiftX = mapPin.clientWidth / 2;


//Map mark generation
var generetionMapPin = function () {
  for (var i = 0; i < arrayAD.length; i++) {
    let cloneMapPin = mapPin.cloneNode(true);
    let mapAvatar = cloneMapPin.querySelector("img");
    let left = String(arrayAD[i].location.x - axisShiftX) + "px";
    let top = String(arrayAD[i].location.y - axisShiftY) + "px";

    //Setting the parameters
    cloneMapPin.style.left = left;
    cloneMapPin.style.top = top;
    cloneMapPin.id = 'pin-' + i;
    mapAvatar.src = arrayAD[i].author.avatar;
    mapAvatar.alt = arrayAD[i].offer.title;

    mapPins.append(cloneMapPin);
  }
};

mapPins.addEventListener('click', function (evt) {

  if (evt.target.parentElement.id != '' && evt.target.parentElement != 'SVG') {
    let currentAdClick = evt.target.offsetParent.id;
    currentAdindex = currentAdClick.slice(4, currentAdClick.length);
    generationCard();
  }

});
//-----------------------------------------------------//



var templateCard = document.querySelector('#card').content;

//Starting generation of the house card
var generationCard = function () {
  var mapFilter = map.querySelector(".map__filters-container");
  var mapCard = templateCard.querySelector(".map__card");
  let cloneMapCard = mapCard.cloneNode(true);
  let cardTitle = cloneMapCard.querySelector(".popup__title");
  let cardAddress = cloneMapCard.querySelector(".popup__text--address");
  let cardPrice = cloneMapCard.querySelector(".popup__text--price");
  let cardType = cloneMapCard.querySelector(".popup__type");
  let cardCapacity = cloneMapCard.querySelector(".popup__text--capacity");
  let cardCheckInAndOut = cloneMapCard.querySelector(".popup__text--time");
  let cardFeatures = cloneMapCard.querySelector(".popup__features");
  let cardDescription = cloneMapCard.querySelector(".popup__description");
  let cardPhotos = cloneMapCard.querySelector(".popup__photos");
  let cardAvatar = cloneMapCard.querySelector(".popup__avatar");

  let houseTypeIndex = HOUSE_TYPE.indexOf(arrayAD[currentAdindex].offer.type);

  cardTitle.textContent = arrayAD[currentAdindex].offer.title;
  cardAddress.textContent = arrayAD[currentAdindex].offer.address;
  cardPrice.textContent = arrayAD[currentAdindex].offer.price + "₽/ночь";
  cardType.textContent = HOUSE_TYPE_RU[houseTypeIndex];
  cardCapacity.textContent =
    arrayAD[currentAdindex].offer.rooms + " комнаты для гостей " + arrayAD[currentAdindex].offer.guests;
  cardCheckInAndOut.textContent =
    "Заезд после " +
    arrayAD[currentAdindex].offer.checkin +
    ", выезд до " +
    arrayAD[currentAdindex].offer.checkout;
  cardDescription.textContent = arrayAD[currentAdindex].offer.decription;
  cardAvatar.src = arrayAD[currentAdindex].author.avatar;
  mapFilter.before(cloneMapCard);

  removeChildPopupFeatures(cardFeatures);
  createListFeatures(cardFeatures);
  createlistPhotos(cardPhotos);
};

//Clearing the list of features
var removeChildPopupFeatures = function (cardFeatures) {
  var cardFeaturesChildren = cardFeatures.children;
  while (cardFeaturesChildren.length > 0) {
    let li = cardFeatures.firstElementChild;
    li.remove();
  }
};

//Creating the list of features
var createListFeatures = function (cardFeatures) {
  for (var i = 0; i < arrayAD[currentAdindex].offer.features.length; i++) {
    let feature = document.createElement("li");
    feature.classList.add("popup__feature--" + arrayAD[currentAdindex].offer.features[i]);
    feature.classList.add("popup__feature");
    cardFeatures.append(feature);
  }
};

//Creating the list of photos
var createlistPhotos = function (cardPhotos) {
  for (var i = 0; i < arrayAD[currentAdindex].offer.photos.length; i++) {
    let img = document.createElement("img");
    img.src = arrayAD[currentAdindex].offer.photos[i];
    img.classList.add('popup__photo');
    img.width = '45';
    img.heigth = '45';
    img.alt = 'Фотография жилья'
    cardPhotos.append(img);
  }
};


//------------------------------------------------------------------------------
var mainPin = document.querySelector('.map__pin--main');
var adFormAddres = createAdForm.querySelector('#address');

var mainPinHalfWidth = Math.floor(mainPin.clientWidth / 2);
var mainPinHalfHeigth = Math.floor(mainPin.clientHeight / 2);
var mainPinSharpEndHeigth = 22;

mainPin.addEventListener('mouseup', function () {
  deleteDisable();
  generetionMapPin();
  activeAdForm();
  adFormAddres.value = fillingFormAdAddress(mainPinSharpEndHeigth);
});

var deleteDisable = function () {
  createAdForm.classList.remove('ad-form--disabled');
  map.classList.remove("map--faded");
};


//------------------------------------------------------------------------------
//Filling the adrress field
var fillingFormAdAddress = function (heigth) {
  return getCoordinate(mainPin.style.left, mainPinHalfWidth) + ', ' + (getCoordinate(mainPin.style.top, mainPinHalfHeigth) + heigth);
}

var getCoordinate = function (side, parameter) {
  return Number(side.slice(0, side.indexOf('px'))) - parameter
};

adFormAddres.value = fillingFormAdAddress(0);

//------------------------------------------------------------------------------
//Setting the fields price and type house conformity
var typeAdForm = createAdForm.querySelector('#type');
var priceAdForm = createAdForm.querySelector('#price');

var houseMap = new Map([
  ['bungalo', 0],
  ['flat', 1000],
  ['house', 5000],
  ['palace', 10000]
]);

typeAdForm.addEventListener('change', function () {
  priceAdForm.placeholder = houseMap.get(typeAdForm.value);
  priceAdForm.min = houseMap.get(typeAdForm.value);
})
//----------------------------------------------------------------------------
