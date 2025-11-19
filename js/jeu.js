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
let paireTrouvee = 0;

// Gestion d'événement lors du clic sur une carte (this = carte cliquée) puis appelle la fonction verifierPaire si deux cartes sont retournées
function cardClicked() {
  if (this.classList.contains("is-flipped") || bloqueJeu) {
    return;
  }
    this.classList.toggle("is-flipped");
    cartesRetournees.push(this);
  if (cartesRetournees.length === 2) {
    verifierPaire();
  }
}

// 
function verifierPaire() {
    bloqueJeu = true;
    const carte1 = cartesRetournees[0].getAttribute("data-pair");
    const carte2 = cartesRetournees[1].getAttribute("data-pair");
    if (carte1 === carte2) {
      cartesRetournees[0].removeEventListener("click", cardClicked);
      cartesRetournees[1].removeEventListener("click", cardClicked);
      cartesRetournees.length = 0;
      bloqueJeu = false;
      paireTrouvee++;
      if (paireTrouvee === mesImages.length / 2) {
        console.log("Victoire !");
      }
    } else {
      setTimeout(() => {
        cartesRetournees[0].classList.remove("is-flipped");
        cartesRetournees[1].classList.remove("is-flipped");
        cartesRetournees.length = 0;
        bloqueJeu = false;
      }, 2000);
  }
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

// Ajoute l'événement de clic à chaque carte puis appelle la fonction cardClicked
[...cards].forEach((card) => {
  card.addEventListener("click", cardClicked);
});
