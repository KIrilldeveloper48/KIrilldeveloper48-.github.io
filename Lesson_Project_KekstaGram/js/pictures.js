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

//Filling the HTML template of the photo
var fillingATemplateAndDrawing = function (descArr) {
  for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
    var pictureTemplate = document.querySelector("#picture-template").content;
    var cloneTemplate = pictureTemplate.cloneNode(true);

    var pictureImg = cloneTemplate.querySelector("img");
    var pictureLikes = cloneTemplate.querySelector(".picture-likes");
    var pictureComments = cloneTemplate.querySelector(".picture-comments");

    pictureImg.src = descArr[i].url;
    pictureLikes.textContent = descArr[i].likes;
    pictureComments.textContent = descArr[i].comments.length;

    drawingPicture(cloneTemplate);
  }
};

//Drawing the picture on the page
var drawingPicture = function (cloneTemplate) {
  var pictureContainer = document.querySelector(".pictures");
  pictureContainer.append(cloneTemplate);
};

//Showing the big preview
var showBigPicture = function () {
  var bigPicture = document.querySelector(".gallery-overlay");
  bigPicture.classList.remove("hidden");
};

//Filling the preview with content
var fillingBigPicture = function (descArr) {
  var bigPictureImg = document.querySelector(".gallery-overlay-image");
  var bigPictureLikes = document.querySelector(".likes-count");
  var bigPictureComments = document.querySelector(".comments-count");

  bigPictureImg.src = descArr[0].url;
  bigPictureLikes.textContent = descArr[0].likes;
  bigPictureComments.textContent = descArr[0].comments.length;
};

//Creating DOM elements for the comments
var createComments = function (descArr) {
  var lengthArray = descArr[0].comments.length;
  var listCommentsContainer = document.querySelector(".social__comments");

  for (var i = 0; i < lengthArray; i++) {
    var createListComments = document.createElement("li");
    var createImg = document.createElement("img");
    var createDesc = document.createElement("p");

    addingAtribytesToLi(createListComments);
    addingAtribytesToImg(createImg);
    addingAtribytesToDesc(createDesc, descArr, i);

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
  img.src = "img/avatar-" + randomNumber + ".jpg";
  img.alt = "Автар комментатора фотографии";
  img.style.width = "35px";
  img.style.heigth = "35px";
};

var addingAtribytesToDesc = function (desc, arr, i) {
  desc.classList.add("social__text");
  desc.textContent = arr[0].comments[i];
};

var addingElementsInListComments = function (listComments, img, desc) {
  listComments.append(img);
  listComments.append(desc);
};

var addingListCommentsInContainer = function (container, listComments) {
  container.append(listComments);
};

//The main function to trigger other functions
var drawingPhotos = function () {
  let descArr = descArrGen();
  fillingATemplateAndDrawing(descArr);
  fillingBigPicture(descArr);
  //showBigPicture();
  createComments(descArr);
};

drawingPhotos();

//------------------------------------------------------------------------------
//Window for upload and filtering selected file
var uploadFile = document.querySelector("#upload-file");
var uploadOverlay = document.querySelector(".upload-overlay");
var uploadCancel = document.querySelector("#upload-cancel");

//Saturation selection
var levelPin = uploadOverlay.querySelector(".upload-effect-level-pin");
var levelLine = uploadOverlay.querySelector(".upload-effect-level-line");

var percentOFSaturation;

//The List of filters
var effectInputsContainer = uploadOverlay.querySelector(
  ".upload-effect-controls"
);
var effectInputs = effectInputsContainer.querySelectorAll("input");

//The List of effects
var effects = [" ", "grayscale", "sepia", "invert", "blur", "brightness"];

//The Image for filtering
var imgPreview = uploadOverlay.querySelector(".effect-image-preview");

uploadFile.addEventListener("change", function () {
  uploadOverlay.classList.remove("hidden");
});

uploadCancel.addEventListener("click", function () {
  uploadOverlay.classList.add("hidden");
  uploadFile.value = "";
});

//Stares the last filter selected
var currentTg;

// Setting up event listener on filters and reset the saturation value
for (var i = 0; i < effectInputs.length; i++) {
  effectInputs[i].addEventListener("click", function (evt) {
    percentOFSaturation = 0;
    currentTg = evt;
  });
}

//When interacting whis the saturation slider, we calculate the filter saturation. Triggering the function for creating a dictionary of matching filters and effects.Triggering the according function for adding effect to the photo
levelPin.addEventListener("mouseup", function () {
  percentOFSaturation = String(
    Math.floor(
      (100 / levelLine.clientWidth) *
        (levelPin.offsetLeft + levelPin.clientWidth / 2)
    )
  );
  let dictionary = creatingDict();
  addEffects(dictionary);
});

var addEffects = function (dictionary) {
  for (var i = 0; i < effectInputs.length; i++) {
    
    //Finding in dictionary effect of mathing filter
    effectName = dictionary.get(currentTg.originalTarget.id);

    if (effectName === "grayscale" || effectName === "sepia") {
      addGreyOrSepia(effectName);
    } else if (effectName === "invert") {
      addInvert(effectName);
    } else if (effectName === "blur") {
      addBlur(effectName);
    } else if (effectName === "brightness") {
      addBrightness(effectName);
    } else if (effectName === " ") {
      clearFilter();
    }
  }
};

//Creating dictionary of matching filters and effects
var creatingDict = function () {
  let dictOfEffects = new Map();
  for (var i = 0; i < effectInputs.length; i++) {
    dictOfEffects.set(effectInputs[i].id, effects[i]);
  }
  return dictOfEffects;
};

var addGreyOrSepia = function (effect) {
  imgPreview.style.filter = effect + "(" + percentOFSaturation / 100 + ")";
};

var addInvert = function (effect) {
  imgPreview.style.filter = effect + "(" + percentOFSaturation + "%" + ")";
};

var addBlur = function (effect) {
  let pixelOFSaturation = (5 / 100) * percentOFSaturation;
  imgPreview.style.filter = effect + "(" + pixelOFSaturation + "px" + ")";
};

var addBrightness = function (effect) {
  let numberOFSaturation = (3 / 100) * percentOFSaturation + 1;
  imgPreview.style.filter = effect + "(" + numberOFSaturation + ")";
};

var clearFilter = function () {
  imgPreview.style.filter = "";
};
