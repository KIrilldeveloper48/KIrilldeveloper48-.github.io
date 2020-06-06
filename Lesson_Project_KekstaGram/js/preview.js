(function () {

  var addOnClick = function () {
    var pictures = document.querySelectorAll(".picture__img");

    for (var i = 0; i < pictures.length; i++) {
      pictures[i].addEventListener("click", function (evt) {
        evt.preventDefault();

        let index = findIndex(evt.target.id);
        let currentEl = window.data[index];

        fillingPreview(currentEl);
        getComments(currentEl);
        showPreview();
      });
    }
  }();

  //Determinig the object index according to the id of the image
  var findIndex = function (imgId) {
    return imgId.slice(4, imgId.length);
  };

  //Filling the preview with content
  var fillingPreview = function (currentEl) {
    let commentsCount = document.querySelector(".social__comment-count");
    let comments = document.querySelector(".comments-count");
    let img = document.querySelector(".big-picture__img>img");
    let likes = document.querySelector(".likes-count");
    let desc = document.querySelector(".social__caption");

    img.src = currentEl.url;
    likes.textContent = currentEl.likes;
    comments.textContent = currentEl.comments.length;
    desc.textContent = currentEl.description;

    commentsCount.classList.add("hidden");
  };

  //Creating DOM elements for the comments
  var getComments = function (currentEl) {
    let container = document.querySelector(".social__comments");
    let cycleTime = currentEl.comments.length;

    clearContainer(container)

    for (var i = 0; i < cycleTime; i++) {
      let createLi = document.createElement("li");
      let createImg = document.createElement("img");
      let createDesc = document.createElement("p");

      addAtributes(createLi, createImg, createDesc);
      fillinigDesc(createDesc, currentEl, i)

      createLi.append(createImg);
      createLi.append(createDesc);
      container.append(createLi);
    }
  };

  var clearContainer = function (container) {
    while (container.firstChild) {
      container.firstChild.remove();
    }
  };

  var addAtributes = function (li, img, desc) {
    let rndNum = window.utils.getRndNum(6) + 1;

    let data = {
      src: "img/avatar-" + rndNum + ".svg",
      alt: "Автар комментатора фотографии",
      width: "35px",
      height: "35px"
    }

    li.classList.add("social__comment", "social__comment--text");

    img.classList.add("social__picture");
    img.src = data.src;
    img.alt = data.alt;
    img.style.width = data.width;
    img.style.height = data.height;

    desc.classList.add("social__text");
  };

  var fillinigDesc = function (desc, currentEl, i) {
    desc.textContent = currentEl.comments[i];
  }

  var showPreview = function () {
    let preview = document.querySelector(".overlay");
    preview.classList.remove("hidden");
    currentModalWindow = preview;
  };

})();
