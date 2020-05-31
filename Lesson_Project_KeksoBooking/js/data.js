"use strict";
(function () {

  var inData = {
    headline: [
      "Большая уютная квартира",
      "Маленькая неуютная квартира",
      "Огромный прекрасный дворец",
      "Маленький ужасный дворец",
      "Красивый гостевой домик",
      "Некрасивый негостеприимный домик",
      "Уютное бунгало далеко от моря",
      "Неуютное бунгало по колено в воде"
    ],
    houseType: [
      "palace",
      "flat",
      "house",
      "bungalo"
    ],
    houseTypeRU: [
      "Дворец",
      "Квартира",
      "Дом",
      "Бунгало"
    ],
    houseFeats: [
      "wifi",
      "dishwasher",
      "parking",
      "washer",
      "elevator",
      "conditioner"
    ],
    housePhotos: [
      "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
      "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
      "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
    ],
    housePrice: {
      min: 1000,
      max: 1000000
    },
    inAndOutTime: [
      "12:00",
      "13:00",
      "14:00"
    ],
    houseLocation: {
      axisY: {
        min: 130,
        max: 630
      },
      axisX: 1200
    }
  }

  //Generation an array with objects
  var genArrAd = function () {
    let arrAd = [];

    for (var i = 0; i < 8; i++) {
      arrAd.push({});

      arrAd[i].author = {
        avatar: "img/avatars/user" + "0" + String(i + 1) + ".png"
      };
      //adding random x y coordinates for map pin
      arrAd[i].location = {
        x: getRndNum(inData.houseLocation.axisX),
        y: getRndNumRange(inData.houseLocation.axisY)
      };
      arrAd[i].offer = {
        title: inData.headline[i],
        address: String(arrAd[i].location.x) + ", " + String(arrAd[i].location.y),
        price: getRndNumRange(inData.housePrice),
        type: inData.houseType[getRndNum(inData.houseType.length)],
        rooms: getRndNum(5) + 1,
        guests: getRndNum(5),
        checkin: inData.inAndOutTime[getRndNum(inData.inAndOutTime.length)],
        checkout: inData.inAndOutTime[getRndNum(inData.inAndOutTime.length)],
        features: getRndArrFeats(),
        decription: "",
        photos: getRndArrPhotos()
      };
    }
    return arrAd;
  };

  //Collect an array of random length from the features of the house
  var getRndArrFeats = function () {
    let arr = [];
    let cycleTime = getRndNum(inData.houseFeats.length) + 1;
    for (var i = 0; i < cycleTime; i++) {
      let index = getRndNum(inData.houseFeats.length);
      if (arr.indexOf(inData.houseFeats[index]) >= 0) {
        i--
      } else arr.push(inData.houseFeats[index]);

    }
    return arr;
  };

  //Collect an array with a random arrangement of photos
  var getRndArrPhotos = function () {
    let arr = [];
    for (var i = 0; i < inData.housePhotos.length; i++) {
      let index = getRndNum(inData.housePhotos.length);
      if (arr.indexOf(inData.housePhotos[index]) >= 0) {
        i--
      } else arr.push(inData.housePhotos[index]);
    }
    return arr;
  };

  var getRndNum = function (factor) {
    return Math.floor(Math.random() * factor)
  }

  var getRndNumRange = function (factor) {
    return Math.floor(Math.random() * (factor.max - factor.min + 1)) + factor.min
  }

  window.arrayAD = genArrAd();

})();
