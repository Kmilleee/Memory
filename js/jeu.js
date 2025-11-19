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

const cartesRetournees = [];
let bloqueJeu = false;

// Gestion des cartes retournées
function cardClicked() {
  this.classList.toggle("is-flipped");
  cartesRetournees.push(this);
}

// Méthode Fisher-Yates Shuffle (échange)
function photoAleatoire() {
  var memoPhotos = document.querySelectorAll(".photo");
  var i, j, tmp;
  // Mélange les cartes dans le tableau
  for (i = mesImages.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1)); // Index d'une image tirée au hasard (exemple : index 2 = /img/image1.png )
    tmp = mesImages[i]; // Stocke l'image de l'index du tableau où la boucle était rendue (en partant de la fin vers le début) (exemple index 8 donc image 4)
    mesImages[i] = mesImages[j]; // l'index 8 avait l'image 4 elle prend l'image de l'index tiré aléatoirement (index 2 donc image 1)
    mesImages[j] = tmp; // L'index 2 à échangé son image et récupère sa nouvelle image qui était dans le tmp (image 4)
  }
  // Récupère le tableau déjà mélangé donc distribue à chaque .photo dans l'ordre (élément = destination (.photo) et index = index d'une image dans le tableau)
  memoPhotos.forEach((element, index) => {
    element.innerHTML = '<img src="' + mesImages[index] + '" class="w-100" />';
    element.parentElement.parentElement.setAttribute(
      "data-pair",
      mesImages[index]
    );
  });
}

photoAleatoire();

// Execute la fonction cardClicked lorsqu'une card est cliquée
[...cards].forEach((card) => {
  card.addEventListener("click", cardClicked);
});
