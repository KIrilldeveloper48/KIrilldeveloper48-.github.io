const LIKES = {
  max: 200,
  min: 15,
};

const COMMENTS = [
  "Всё отлично!",
  "В целом всё неплохо.Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
];

const DESC = [
  "Тестим новую камеру!",
  "Затусили с друзьями на море",
  "Как же круто тут кормят",
  "Отдыхаем...",
  "Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......",
  "Вот это тачка!",
];
const NUMBER_OF_PHOTOS = 25;

var pictureContainer = document.querySelector(".pictures");

var targetPicture;
var currentModalWindow = "";
//Generating an array of photo data
var descArrGen = function () {
  let descArr = [];
  for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
    descArr.push({});

    let photoUrl = "photos/" + String(i + 1) + ".jpg";
    let numbersOfLikes =
      Math.floor(Math.random() * (LIKES.max - LIKES.min)) + LIKES.min;
    let description = DESC[Math.floor(Math.random() * DESC.length)];
    let commentsArr = genComments();

    descArr[i].url = photoUrl;
    descArr[i].likes = numbersOfLikes;
    descArr[i].comments = commentsArr;
    descArr[i].description = description;

    genComments();
  }
  return descArr;
};

//Randomly selecting one or two comments from the corresponding array
var genComments = function () {
  let oneOrTwo = Math.ceil(Math.random() * 2);
  let commentsArr = [];

  for (var i = 0; i < oneOrTwo; i++) {
    let randomIndex = Math.floor(Math.random() * COMMENTS.length);
    commentsArr.push(COMMENTS[randomIndex]);
  }

  return commentsArr;
};

var descArr = descArrGen();

//Filling the HTML template of the photo
var fillingATemplateAndDrawing = function () {
  var pictureTemplate = document.querySelector("#picture").content;

  for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
    var cloneTemplate = pictureTemplate.cloneNode(true);

    var pictureImg = cloneTemplate.querySelector("img");
    var pictureLikes = cloneTemplate.querySelector(".picture__likes");
    var pictureComments = cloneTemplate.querySelector(".picture__comments");

    pictureImg.src = descArr[i].url;
    pictureImg.id = "img" + "_" + i;
    pictureLikes.textContent = descArr[i].likes;
    pictureComments.textContent = descArr[i].comments.length;

    drawingPicture(cloneTemplate);
  }
};

//Drawing the picture on the page
var drawingPicture = function (cloneTemplate) {
  pictureContainer.append(cloneTemplate);
};

//The main function to trigger other functions
fillingATemplateAndDrawing();

//------------------------------------------------------------------------------
//Collecting previously drawn photos into a collection
var pictureArray = pictureContainer.querySelectorAll(".picture__img");

var bigPicture = document.querySelector(".overlay");
var bigPictureImg = document.querySelector(".big-picture__img>img");
var bigPictureLikes = document.querySelector(".likes-count");
var bigPictureDesc = document.querySelector(".social__caption");
var bigPictureCommentsCount = document.querySelector(".social__comment-count");
var bigPictureComments = document.querySelector(".comments-count");
var listCommentsContainer = document.querySelector(".social__comments");

var overlayClose = document.querySelector(".big-picture__cancel");

for (var i = 0; i < pictureArray.length; i++) {
  pictureArray[i].addEventListener("click", function (evt) {
    evt.preventDefault();

    let target = evt.target;
    let imgId = target.id;
    let indexPhoto = findIndex(imgId);

    fillingBigPicture(indexPhoto);
    createComments(indexPhoto);
    bigPictureCommentsCount.classList.add("hidden");
    showBigPicture();
  });
}

//Determinig the object index according to the id of the image
var findIndex = function (imgId) {
  return imgId.slice(4, imgId.length);
};

var showBigPicture = function () {
  bigPicture.classList.remove("hidden");
  currentModalWindow = bigPicture;
};

//Filling the preview with content
var fillingBigPicture = function (index) {
  bigPictureImg.src = descArr[index].url;
  bigPictureLikes.textContent = descArr[index].likes;
  bigPictureComments.textContent = descArr[index].comments.length;
  bigPictureDesc.textContent = descArr[index].description;
};

//Creating DOM elements for the comments
var createComments = function (index) {
  let lengthArray = descArr[index].comments.length;

  while (listCommentsContainer.firstChild) {
    listCommentsContainer.firstChild.remove();
  }

  for (var i = 0; i < lengthArray; i++) {
    var createListComments = document.createElement("li");
    var createImg = document.createElement("img");
    var createDesc = document.createElement("p");
    addingAtribytesToLi(createListComments);
    addingAtribytesToImg(createImg);
    addingAtribytesToDesc(createDesc, descArr[index], i);

    addingElementsInListComments(createListComments, createImg, createDesc);
    addingListCommentsInContainer(listCommentsContainer, createListComments);
  }
};

var addingAtribytesToLi = function (listComments) {
  listComments.classList.add("social__comment");
  listComments.classList.add("social__comment--text");
};

var addingAtribytesToImg = function (img) {
  let randomNumber = Math.floor(Math.random() * 6) + 1;
  img.classList.add("social__picture");
  img.src = "img/avatar-" + randomNumber + ".svg";
  img.alt = "Автар комментатора фотографии";
  img.style.width = "35px";
  img.style.heigth = "35px";
};

var addingAtribytesToDesc = function (desc, arr, i) {
  desc.classList.add("social__text");
  desc.textContent = arr.comments[i];
};

var addingElementsInListComments = function (listComments, img, desc) {
  listComments.append(img);
  listComments.append(desc);
};

var addingListCommentsInContainer = function (container, listComments) {
  container.append(listComments);
};

//------------------------------------------------------------------------------
//The window for uploading and filtering the selected file
var uploadFile = document.querySelector("#upload-file");
var uploadOverlay = document.querySelector(".img-upload__overlay");
var uploadCancel = document.querySelector("#upload-cancel");

//Transparency selection
var levelContainer = uploadOverlay.querySelector(".effect-level");
var levelPin = uploadOverlay.querySelector(".effect-level__pin");
var levelLine = uploadOverlay.querySelector(".effect-level__line");

var percentOFSaturation;
var effectsValue = uploadOverlay.querySelector(".effect-level__value");

//The filter list
var effectInputsContainer = uploadOverlay.querySelector(".img-upload__effects");
var effectInputs = effectInputsContainer.querySelectorAll("input");

//The effect, value and unit list
var effects = [
  [" ", 1, ""],
  ["grayscale", 0.01, ""],
  ["sepia", 0.01, ""],
  ["invert", 1, "%"],
  ["blur", 0.03, "px"],
  ["brightness", 0.03, ""],
];
//Creating the dictionary for matching filters and effects
var dictionary = new Map();
for (var i = 0; i < effectInputs.length; i++) {
  dictionary.set(effectInputs[i].id, effects[i]);
}

//Storing the last filter selection
var currentTg;

//The image for filtering
var imgPreview = uploadOverlay.querySelector(".img-upload__preview>img");

uploadFile.addEventListener("change", function () {
  uploadOverlay.classList.remove("hidden");
  currentModalWindow = uploadOverlay;
});

// Setting up the event listener for filters and resetting the transparency value. Cleaning the filter value, deleting the image class
for (var i = 0; i < effectInputs.length; i++) {
  effectInputs[i].addEventListener("click", function (evt) {
    percentOFSaturation = 0;
    currentTg = evt.originalTarget.id;

    clearFilter();
    imgRemoveClass();
    if (currentTg != "effect-none") levelContainer.classList.remove("hidden");
    else levelHidden();
  });
}

//When users interact whith the transparency slider, we calculate the filter transparency. Triggering the function for adding the effect to the photo, adding a class name to the image and rewriting the effect value
levelPin.addEventListener("mouseup", function () {
  percentOFSaturation = Math.floor(
    (100 / levelLine.clientWidth) *
    (levelPin.offsetLeft + levelPin.clientWidth / 2)
  );
  rewriteEffectValue();
  addEffects();
  imgAddClass();
});

var rewriteEffectValue = function () {
  effectsValue.value = percentOFSaturation;
};

var addEffects = function () {
  //Finding the effect index that matches the filter in the dictionary
  effectName = dictionary.get(currentTg);
  imgPreview.style.filter = setFilter(
    effectName[0],
    effectName[1],
    effectName[2]
  );
};

var setFilter = function (effect, quantity, unit) {
  let valueTransparency = percentOFSaturation * quantity;
  if (effect === "brightness") {
    valueTransparency = valueTransparency + 1;
  }

  return effect + "(" + valueTransparency + unit + ")";
};

var clearFilter = function () {
  imgPreview.style.filter = "";
};

var levelHidden = function () {
  levelContainer.classList.add("hidden");
};

var imgAddClass = function () {
  let nameClass = "effects__preview--" + currentTg.slice(7, currentTg.length);
  imgPreview.classList.add(nameClass);
};

var imgRemoveClass = function () {
  imgPreview.className = "";
};
//----------------------------------------------------------------------------//

//Image scale control
var resizePlus = uploadOverlay.querySelector(".scale__control--bigger");
var resizeMinus = uploadOverlay.querySelector(".scale__control--smaller");
var resizeValue = uploadOverlay.querySelector(".scale__control--value");
var val = 100;

resizePlus.addEventListener("click", function () {
  if (resizeValue.value != "100%") {
    val += 25;
    addResizeValue();
    addResizeImg();
  }
});

resizeMinus.addEventListener("click", function () {
  if (resizeValue.value != "25%") {
    val -= 25;
    addResizeValue();
    addResizeImg();
  }
});

var addResizeValue = function () {
  resizeValue.value = String(val) + "%";
};

var addResizeImg = function () {
  imgPreview.style.transform = "scale" + "(" + resizeValue.value + ")";
};
//----------------------------------------------------------------------------//

//The algorythms for closing the window
document.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (currentModalWindow !== "") {
      closeModal();
    }
  }
});

uploadCancel.addEventListener("click", function () {
  closeModal();
});

overlayClose.addEventListener("click", function () {
  closeModal();
});

var closeModal = function () {
  currentModalWindow.classList.add("hidden");
  if (currentModalWindow == uploadOverlay) {
    resetValue();
  }
  currentModalWindow = "";
};

var resetValue = function () {
  uploadFile.value = "";
};

//----------------------------------------------------------------------------//
//checking a hashTag
//TODO: Проставить комментарии
var hashTagInput = uploadOverlay.querySelector(".text__hashtags");
var uploadButton = uploadOverlay.querySelector(".img-upload__submit");
var hashTagInputVal;
var hashTagArray = [];
var erorrString;

uploadButton.addEventListener("click", function () {
  erorrString = "";
  hashTagInputVal = hashTagInput.value;
  hashTagArray = [];
  hashTagInput.setCustomValidity("");
  hastTagFillingArray();
  checkingTags();
  checkingTagsForDuplicates();
  checkingTagsForLength();
  erorrOutPut();
});

var hastTagFillingArray = function () {
  let space;
  let hashTagString = "";
  for (var i = 0; i < hashTagInputVal.length; i++) {
    if (hashTagInputVal[i] != " ") {
      space = false;
    } else space = true;

    if (!space) {
      hashTagString += hashTagInputVal[i];
    }

    if (space || i == hashTagInputVal.length - 1) {
      if (hashTagString !== "") {
        hashTagArray.push(hashTagString.toLowerCase());
      }
      hashTagString = "";
    }
  }
};

var checkingTags = function () {
  for (var i = 0; i < hashTagArray.length; i++) {
    if (hashTagArray[i][0] !== "#") {
      erorrString += " У хеш-тега №" + (i + 1) + " отсутствует знак #";
    }
    if (hashTagArray[i].length == 1) {
      erorrString +=
        " хеш-тег не может состоять из одного символа (хеш-тег №" +
        (i + 1) +
        ")";
    }
    if (hashTagArray[i].indexOf("#", 1) > 0) {
      erorrString += " хэш-теги нужно разделять пробелами";
    }
    if (hashTagArray[i].length > 20) {
      erorrString +=
        "максимальная длина одного хэш-тега 20 символов, включая решётку";
    }
  }
};

var checkingTagsForDuplicates = function () {
  for (var i = 0; i < hashTagArray.length - 1; i++) {
    let theOneBeingChecked = hashTagArray[i];
    for (var j = i + 1; j < hashTagArray.length; j++) {
      if (theOneBeingChecked === hashTagArray[j]) {
        erorrString += " хэш-теги не должны повторяться";
      }
    }
  }
};

var checkingTagsForLength = function () {
  if (hashTagArray.length > 5) {
    erorrString += " Нельзя указать более пяти хэш-тегов";
  }
};

var erorrOutPut = function () {
  if (erorrString !== "") {
    hashTagInput.setCustomValidity(erorrString);
  }
};
//----------------------------------------------------------------------------//
