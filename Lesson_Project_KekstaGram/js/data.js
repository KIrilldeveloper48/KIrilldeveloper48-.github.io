(function () {
  var inData = {
    likes: {
      max: 200,
      min: 15
    },
    comments: [
      "Всё отлично!",
      "В целом всё неплохо.Но не всё.",
      "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
      "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
      "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
      "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
    ],
    desc: [
      "Тестим новую камеру!",
      "Затусили с друзьями на море",
      "Как же круто тут кормят",
      "Отдыхаем...",
      "Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......",
      "Вот это тачка!",
    ],
    number: 25
  }

  //Generating an array of photo data
  var getData = function () {
    let data = [];
    for (var i = 0; i < inData.number; i++) {
      data.push({});

      data[i].url = "photos/" + String(i + 1) + ".jpg";
      data[i].likes = getRndRangeNum(inData.likes);
      data[i].comments = getComments();
      data[i].description = inData.desc[window.utils.getRndNum(inData.desc.length)];
    }
    return data;
  };

  //Randomly selecting one or two comments from the corresponding array
  var getComments = function () {
    let rndCycleTime = window.utils.getRndNum(2) + 1;
    let array = [];

    for (var i = 0; i < rndCycleTime; i++) {
      let rndIndex = window.utils.getRndNum(inData.comments.length);
      array.push(inData.comments[rndIndex]);
    }

    return array;
  };



  getRndRangeNum = function (factor) {
    return Math.floor(Math.random() * (factor.max - factor.min)) + factor.min
  }

  return window.data = getData()
})();
