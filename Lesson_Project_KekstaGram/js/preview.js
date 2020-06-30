(function () {
  window.preview = function () {
    let overlay = document.querySelector(".overlay");
    let addOnClick = (function () {
      let pictures = document.querySelectorAll(".picture__img");

      for (let item of pictures) {
        item.addEventListener("click", function (evt) {
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
    let findIndex = function (imgId) {
      return imgId.slice(4, imgId.length);
    };

    //Filling the preview with content
    let fillingPreview = function (currentEl) {
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
    let getComments = function (currentEl) {
      let container = document.querySelector(".social__comments");

      clearContainer(container);

      for (let item of currentEl.comments) {
        let list = getList();
        let avatar = getImg(item);
        let message = getDesc(item);

        list.append(avatar);
        list.append(message);
        container.append(list);
      }
    };

    let clearContainer = function (container) {
      while (container.firstChild) {
        container.firstChild.remove();
      }
    };

    let getList = function () {
      let li = document.createElement("li");
      li.classList.add("social__comment", "social__comment--text");
      return li;
    };

    let getImg = function (el) {
      let img = document.createElement("img");
      img.classList.add("social__picture");
      img.src = el.avatar;
      img.alt = el.name;
      img.style.width = "35px";
      img.style.height = "35px";

      return img;
    };

    let getDesc = function (el) {
      desc = document.createElement("p");
      desc.classList.add("social__text");
      desc.textContent = el.message;

      return desc;
    };

    let showPreview = function () {
      overlay.classList.remove("hidden");
      overlay.focus();
    };

    //Функционал для закрытия превью
    let close = document.querySelector("#picture-cancel");

    let closePopup = function () {
      overlay.classList.add("hidden");
    };

    overlay.addEventListener("keydown", function (evt) {
      window.util.isEscEvent(evt, closePopup);
    });

    overlay.addEventListener("click", function (evt) {
      if (evt.target == overlay) {
        closePopup();
      }
    });

    close.addEventListener("click", closePopup);
  };
})();
