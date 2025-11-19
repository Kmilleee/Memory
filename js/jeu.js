var cards = document.querySelectorAll(".memory-card");
const mesImages = [
  "/img/image0.png",
  "/img/image0.png",
  "/img/image1.png",
  "/img/image1.png",
  "/img/image2.png",
  "/img/image2.png",
  "/img/image3.png",
  "/img/image3.png",
  "/img/image4.png",
  "/img/image4.png",
  "/img/image5.png",
  "/img/image5.png",
];

[...cards].forEach((card) => {
  card.addEventListener("click", function () {
    card.classList.toggle("is-flipped");
  });
});

function photo() {
  var memoPhotos = document.querySelectorAll(".photo");
  memoPhotos.forEach((element, index) => {
    element.innerHTML = '<img src="' + mesImages[index] + '" class="w-100" />';
  });
}

photo();
