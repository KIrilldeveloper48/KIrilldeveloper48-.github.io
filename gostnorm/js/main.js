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
