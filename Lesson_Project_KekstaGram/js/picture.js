(function () {
  window.uploadOverlay = document.querySelector(".img-upload__overlay");
  window.picture = function (data) {
    let container = document.querySelector(".pictures");
    let template = document.querySelector("#picture").content;

    for (let item of data) {
      let clone = template.cloneNode(true);

      let img = clone.querySelector("img");
      let likes = clone.querySelector(".picture__likes");
      let comments = clone.querySelector(".picture__comments");

      img.src = item.url;
      img.id = "img" + "_" + data.indexOf(item);
      likes.textContent = item.likes;
      comments.textContent = item.comments.length;

      container.append(clone);
    }
    //Показываем блок с сортировкой фотографий
    document
      .querySelector(".img-filters")
      .classList.remove("img-filters--inactive");
  };
})();
