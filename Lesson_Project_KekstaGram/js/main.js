var targetPicture;
var currentModalWindow = "";


//------------------------------------------------------------------------------
//Collecting previously drawn photos into a collection


var overlayClose = document.querySelector(".big-picture__cancel");



//------------------------------------------------------------------------------
//The window for uploading and filtering the selected file
var uploadFile = document.querySelector("#upload-file");

var uploadCancel = document.querySelector("#upload-cancel");




uploadFile.addEventListener("change", function () {
  window.uploadOverlay.classList.remove("hidden");
  currentModalWindow = window.uploadOverlay;
});

// Setting up the event listener for filters and resetting the transparency value. Cleaning the filter value, deleting the image class


//When users interact whith the transparency slider, we calculate the filter transparency. Triggering the function for adding the effect to the photo, adding a class name to the image and rewriting the effect value



//----------------------------------------------------------------------------//


//----------------------------------------------------------------------------//

//-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //

//The algorythms for closing the window
document.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (currentModalWindow !== "") {
      if (currentFocusEl != "") {
        currentFocusEl.blur();
        currentFocusEl = "";
      } else closeModal();
    }
  }
});

uploadCancel.addEventListener("click", function () {
  closeModal();
});

overlayClose.addEventListener("click", function () {
  closeModal();
});

var closeModal = function () {
  currentModalWindow.classList.add("hidden");
  if (currentModalWindow == window.uploadOverlay) {
    resetValue();
  }
  currentModalWindow = "";
};

var resetValue = function () {
  uploadFile.value = "";
};
