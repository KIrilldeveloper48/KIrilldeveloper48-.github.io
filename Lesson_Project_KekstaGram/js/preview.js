(function () {
  window.preview = function (data) {
    //Здесь будет храниться массив с данными об активной фоторафии
    let currentEl;
    //Родительский блок для комментариев
    let commentsContainer = document.querySelector(".social__comments");
    //Кол-во итераций цикла для добавления кмментариев
    let cycleTime;

    //Находим индекс нужного нам массива в исходном массиве с данными
    let findIndex = function (imgId) {
      return imgId.slice(4, imgId.length);
    };
    //Вставляем контент в превью
    let fillingPreview = function () {
      let img = document.querySelector(".big-picture__img>img");
      let likes = document.querySelector(".likes-count");
      let desc = document.querySelector(".social__caption");

      img.src = currentEl.url;
      likes.textContent = currentEl.likes;
      desc.textContent = currentEl.description;
    };
    //Удаляем прошлые комментарии, перед добавлением новых
    let removeComments = function () {
      while (commentsContainer.firstChild) {
        commentsContainer.firstChild.remove();
      }
    };
    //Создаём элемент для содержания комментария
    let getList = function () {
      let li = document.createElement("li");
      li.classList.add("social__comment", "social__comment--text");
      return li;
    };
    //Создаём тег img и задаём атрибуты
    let getImg = function (el) {
      let img = document.createElement("img");
      img.classList.add("social__picture");
      img.src = el.avatar;
      img.alt = el.name;
      img.style.width = "35px";
      img.style.height = "35px";

      return img;
    };
    //Создаём тег p и задаём атрибуты и содержание
    let getDesc = function (el) {
      desc = document.createElement("p");
      desc.classList.add("social__text");
      desc.textContent = el.message;

      return desc;
    };
    //Добавляем комментарии на страницу. Индекс добавляемого комментария в массиве  равен кол-ву текущих, уже добавленных комментариев.
    let addComments = function () {
      let index = commentsContainer.children.length;
      for (let i = index; i < index + cycleTime; i++) {
        let list = getList();
        let avatar = getImg(currentEl.comments[i]);
        let message = getDesc(currentEl.comments[i]);

        list.append(avatar);
        list.append(message);
        commentsContainer.append(list);
      }
    };
    //Обновляем число комментариев
    let refreshCommentsCount = function () {
      let commentsCount = document.querySelector(".social__comment-count");
      commentsCount.textContent =
        commentsContainer.children.length + " из " + currentEl.comments.length;
    };
    //Определяем кол-во итераций для добавления комментариев и вызываем функцию добавления
    let getComments = function () {
      if (currentEl.comments.length >= 5) {
        cycleTime = 5;
        document.querySelector(".comments-loader").classList.remove("hidden");
      } else {
        cycleTime = currentEl.comments.length;
      }
      addComments();
      refreshCommentsCount();
    };

    let previewOverlay = document.querySelector(".overlay");
    //На каждую фотку навешиваем обработчик
    for (let item of document.querySelectorAll(".picture__img")) {
      item.addEventListener("click", function (evt) {
        evt.preventDefault();

        let index = findIndex(evt.target.id);
        currentEl = data[index];

        fillingPreview();
        removeComments();
        getComments();
        //Показываем превью
        previewOverlay.classList.remove("hidden");
      });
    }

    //Находим элемент для добавления ещё пяти комментариев
    let loadmore = document.querySelector(".comments-loader");
    //При клике высчитываем кол-во итераций и вызываем функцию для добавления комментариев
    loadmore.addEventListener("click", function () {
      if (currentEl.comments.length - commentsContainer.children.length > 5) {
        cycleTime = 5;
      } else {
        document.querySelector(".comments-loader").classList.add("hidden");
        cycleTime =
          currentEl.comments.length - commentsContainer.children.length;
      }
      addComments();
      refreshCommentsCount();
    });

    //Функционал для закрытия превью
    let close = document.querySelector("#picture-cancel");

    let closePopup = function () {
      previewOverlay.classList.add("hidden");
    };

    previewOverlay.addEventListener("keydown", function (evt) {
      window.util.isEscEvent(evt, closePopup);
    });

    previewOverlay.addEventListener("click", function (evt) {
      if (evt.target == previewOverlay) {
        closePopup();
      }
    });

    close.addEventListener("click", closePopup);
  };
})();
