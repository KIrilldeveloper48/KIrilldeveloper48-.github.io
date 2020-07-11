(function () {
  window.imgFilters = function () {
    let getDataRnd = function () {
      let dataClone = window.dataOriginal.slice();
      let dataRandom = [];
      for (let i = 0; i < 10; i++) {
        let indexRnd = Math.floor(Math.random() * dataClone.length);
        dataRandom.push(dataClone[indexRnd]);
        dataClone.splice(indexRnd, 1);
      }
      return dataRandom;
    };

    let getDataDiscussed = function () {
      let dataDiscussed = window.dataOriginal.slice();
      for (let i = 0; i < dataDiscussed.length - 1; i++) {
        for (let j = i + 1; j < dataDiscussed.length; j++) {
          if (
            dataDiscussed[j].comments.length > dataDiscussed[i].comments.length
          ) {
            let min = dataDiscussed[i];
            dataDiscussed[i] = dataDiscussed[j];
            dataDiscussed[j] = min;
          }
        }
      }
      return dataDiscussed;
    };

    let removePicture = function () {
      for (let item of document.querySelectorAll(".picture")) {
        item.remove();
      }
    };

    let sorted = {
      "filter-random": getDataRnd(),
      "filter-default": window.dataOriginal,
      "filter-discussed": getDataDiscussed(),
    };

    let filterButtons = document.querySelectorAll(".img-filters__button");
    for (let button of filterButtons) {
      button.addEventListener("click", function (evt) {
        if (!evt.target.classList.contains("img-filters__button--active")) {
          for (let button of filterButtons) {
            button.classList.remove("img-filters__button--active");
          }
          evt.target.classList.add("img-filters__button--active");
          removePicture();
          window.picture(sorted[evt.target.id]);
          window.preview(sorted[evt.target.id]);
        }
      });
    }
  };
})();
