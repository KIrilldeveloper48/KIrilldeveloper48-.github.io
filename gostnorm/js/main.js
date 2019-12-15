$(document).ready(function() {
  $(".tenth-block_slider-item").slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "40px",
    autoplay: false,
    autoplaySpeed: 2000,
    appendArrows: $(".slider-arrow"),
    prevArrow:
      '<button id="prev" type="button" class="slider-btn slider-btn_prev"><img src="img/block-ten/icon/arrow-1.png" alt=""></button>',
    nextArrow:
      '<button id="next" type="button" class="slider-btn slider-btn_next"><img src="img/block-ten/icon/arrow-2.png" alt=""></button>'
  });

  // On swipe event
  $(".tenth-block_slider-item").on("swipe", function(event, slick, direction) {
    console.log(direction);
    // left
  });

  // On edge hit
  $(".tenth-block_slider-item").on("edge", function(event, slick, direction) {
    console.log("edge was hit");
  });

  // On before slide change
  $(".tenth-block_slider-item").on("beforeChange", function(
    event,
    slick,
    currentSlide,
    nextSlide
  ) {
    console.log(nextSlide);
  });
});

// СЛАЙДЕР
// массив слайдов(тексты)
var slides = document.querySelectorAll("#slides .first-screen_slider-item");
// массив элементов с картинкой-слайдом в качестве фона
var bgs = document.querySelectorAll(".slider-bg");
// текущие значения номера слайда и класса для фона
var currentSlide = 0;
var currentbg = "bg_0";
// автопрокрутка
var slideInterval = setInterval(nextSlide, 20000);

// следующий слайд
function nextSlide() {
  goToSlide(currentSlide + 1);
}

// предыдущий слайд
function previousSlide() {
  goToSlide(currentSlide - 1);
}

// переключение на слайд n
function goToSlide(n) {
  // прячем текущий слайд
  slides[currentSlide].className = "first-screen_slider-item";
  // номер слайда для отображения
  currentSlide = (n + slides.length) % slides.length;
  // показываем новый слайд
  slides[currentSlide].className = "first-screen_slider-item show";
  // класс для нового фона
  var newbg = "bg_" + currentSlide;

  // для всех элементов с фоновой картинкой-слайдом:
  bgs.forEach(el => {
    // убираем класс  текущего фона
    el.classList.remove(currentbg);
    // добавляем класс нового фона
    el.classList.add(newbg);
  });
  // новый фон стал текуцщим
  currentbg = newbg;
}

// кнопки для переключения слайдов
var next = document.getElementById("next");
var previous = document.getElementById("back");

next.onclick = function() {
  nextSlide();
};
previous.onclick = function() {
  previousSlide();
};

// МЕНЮ
// массив всех подменю
var subs = document.querySelectorAll(".sub-menu");
// прячем все подменю
function sub_menu_off(n) {
  subs.forEach(el => {
    if (el.id != "sub-menu-" + n) {
      el.classList.remove("sub-menu_active");
    }
  });
}
// переключаем видимость подменю по клику
function click_item(n) {
  sub_menu_off(n);
  $("#sub-menu-" + n).toggleClass("sub-menu_active");
}

var card = document.querySelectorAll(".ninth-block_news");
var link = document.querySelectorAll(".ninth-block_link");
// прячем все подменю
function news_off(n) {
  card.forEach(el => {
    if (el.id != "news-" + n) {
      el.classList.remove("ninth-block_news-active");
    }
  });
}
function link_off(n) {
  link.forEach(el => {
    if (el.id != "link-news-" + n) {
      el.classList.remove("active");
    }
  });
}
// переключаем видимость подменю по клику
function click_news(n) {
  news_off(n);
  $("#news-" + n).addClass("ninth-block_news-active");
  link_off(n);
  $("#link-news-" + n).addClass("active");
}

/*
$("#nav-menu_item-1").click(function() {
  sub_menu_off();
  $("#sub-menu-1").toggleClass("sub-menu_active");
});
$("#nav-menu_item-2").click(function() {
  sub_menu_off();
  $("#sub-menu-2").toggleClass("sub-menu_active");
});

$("#nav-menu_item-3").click(function() {
  sub_menu_off();
  $("#sub-menu-3").toggleClass("sub-menu_active");
});

$("#nav-menu_item-4").click(function() {
  sub_menu_off();
  $("#sub-menu-4").toggleClass("sub-menu_active");
});
$("#nav-menu_item-5").click(function() {
  sub_menu_off();
  $("#sub-menu-5").toggleClass("sub-menu_active");
});
*/
