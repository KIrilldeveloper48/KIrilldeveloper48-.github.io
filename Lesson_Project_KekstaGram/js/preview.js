(function () {
  window.preview = function () {
    var addOnClick = (function () {
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
    })();

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

      clearContainer(container);

      for (var i = 0; i < cycleTime; i++) {
        let list = getList();
        let avatar = getImg(currentEl, i);
        let message = getDesc(currentEl, i);

        list.append(avatar);
        list.append(message);
        container.append(list);
      }
    };

    var clearContainer = function (container) {
      while (container.firstChild) {
        container.firstChild.remove();
      }
    };

    var getList = function () {
      let li = document.createElement("li");
      li.classList.add("social__comment", "social__comment--text");
      return li;
    };

    var getImg = function (data, i) {
      let img = document.createElement("img");
      img.classList.add("social__picture");
      img.src = data.comments[i].avatar;
      img.alt = data.comments[i].name;
      img.style.width = "35px";
      img.style.height = "35px";

      return img;
    };

    var getDesc = function (data, i) {
      desc = document.createElement("p");
      desc.classList.add("social__text");
      desc.textContent = data.comments[i].message;

      return desc;
    };

    var showPreview = function () {
      let preview = document.querySelector(".overlay");
      preview.classList.remove("hidden");
      currentModalWindow = preview;
    };
  };
})();
