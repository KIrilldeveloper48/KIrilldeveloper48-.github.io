var slides = document.querySelectorAll("#slides .first-screen_slider-item");
var currentSlide = 0;
var slideInterval = setInterval(nextSlide, 20000);

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function previousSlide() {
  goToSlide(currentSlide - 1);
}

function goToSlide(n) {
  slides[currentSlide].className = "first-screen_slider-item";
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].className = "first-screen_slider-item show";
}

var next = document.getElementById("next");
var previous = document.getElementById("back");

next.onclick = function() {
  nextSlide();
};
previous.onclick = function() {
  previousSlide();
};
