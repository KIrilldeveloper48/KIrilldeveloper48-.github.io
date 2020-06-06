//Drawing photos
(function () {
  let container = document.querySelector(".pictures");
  let template = document.querySelector("#picture").content;
  let cycleTime = window.data.length;

  for (var i = 0; i < cycleTime; i++) {
    let clone = template.cloneNode(true);

    let img = clone.querySelector("img");
    let likes = clone.querySelector(".picture__likes");
    let comments = clone.querySelector(".picture__comments");

    img.src = window.data[i].url;
    img.id = "img" + "_" + i;
    likes.textContent = window.data[i].likes;
    comments.textContent = window.data[i].comments.length;

    container.append(clone);
  }
})();
