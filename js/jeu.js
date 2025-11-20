var cards = document.querySelectorAll(".memory-card");
document.addEventListener("keydown", relancerPartie);

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
let nombreCoups = 0;

// Méthode Fisher-Yates Shuffle (échange)
function melangerCartes() {
  var i, j, tmp;
  for (i = mesImages.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1)); // Index d'une image tirée au hasard (exemple : index 2 = /img/image1.png )
    tmp = mesImages[i]; // Stocke l'image de l'index du tableau où la boucle était rendue (en partant de la fin vers le début) (exemple index 8 donc image 4)
    mesImages[i] = mesImages[j]; // l'index 8 avait l'image 4 elle prend l'image de l'index tiré aléatoirement (index 2 donc image 1)
    mesImages[j] = tmp; // L'index 2 à échangé son image et récupère sa nouvelle image qui était dans le tmp (image 4)
  }
  afficherCartes();
}

// Récupère le tableau déjà mélangé donc distribue à chaque .photo le tableau dans l'ordre (élément = destination (.photo) et index = index de l'image à insérer)
function afficherCartes() {
  var memoPhotos = document.querySelectorAll(".photo");
  memoPhotos.forEach((element, index) => {
    element.innerHTML = '<img src="' + mesImages[index] + '" class="w-100" />';
    // Ajoute un attribut data-pair à chaque carte pour vérifier les paires via l'index (nom de l'image)
    element.parentElement.parentElement.setAttribute(
      "data-pair",
      mesImages[index]
    );
  });
}

// Gestion d'événement lors du clic sur une carte (this = carte cliquée) puis appelle la fonction verifierPaire si deux cartes sont retournées
function cardClicked() {
  // Empêche de retourner une carte déjà retournée ou si le jeu est bloqué (entre le moment où deux cartes sont retournées et la vérification de la paire)
  if (this.classList.contains("is-flipped") || bloqueJeu) {
    return;
  }
  // Ajoute la classe is-flipped à la carte cliquée pour la retourner (même chose que .add mais toggle est plus adapté ici car indique clairement l'état ON/OFF)
  this.classList.toggle("is-flipped");
  cartesRetournees.push(this);
  if (cartesRetournees.length === 2) {
    verifierPaire();
  }
}

// Vérifie si les deux cartes retournées forment une paire
function verifierPaire() {
  bloqueJeu = true;
  nombreCoups++;
  document.getElementById("compteurCoups").innerHTML = nombreCoups;
  const carte1 = cartesRetournees[0].getAttribute("data-pair");
  const carte2 = cartesRetournees[1].getAttribute("data-pair");
  // Si les deux cartes sont identiques on les laisse retournées et on enlève l'événement de clic dessus
  if (carte1 === carte2) {
    cartesRetournees[0].removeEventListener("click", cardClicked);
    cartesRetournees[1].removeEventListener("click", cardClicked);
    // Reset du tableau contenant les cartes retournées et débloque le jeu
    cartesRetournees.length = 0;
    bloqueJeu = false;
    paireTrouvee++;
    // Vérifie si toutes les paires ont été trouvées (length du tableau d'images divisé par 2 car chaque image est en double pour former une paire)
    if (paireTrouvee === mesImages.length / 2) {
      console.log("Victoire !");
    }
    // Sinon on les retourne face cachée après un délai de 2 secondes
  } else {
    setTimeout(() => {
      cartesRetournees[0].classList.remove("is-flipped");
      cartesRetournees[1].classList.remove("is-flipped");
      cartesRetournees.length = 0;
      bloqueJeu = false;
    }, 2000);
  }
}

function relancerPartie(event) {
  if (event.code === "Space") {
    // Désactive le scroll de page avec espace
    event.preventDefault();
    // Reset toutes les variables / constantes à 0
    cartesRetournees.length = 0;
    bloqueJeu = false;
    paireTrouvee = 0;
    nombreCoups = 0;
    document.getElementById("compteurCoups").textContent = nombreCoups;

    // Enlève le retournement sur chaque cartes + on réactive le click
    [...cards].forEach((card) => {
      card.classList.remove("is-flipped");
      card.addEventListener("click", cardClicked);
    });
    // Mélange les cartes à la fin de l'animation du retournement de cartes (définit à 0.75s) pour ne pas voir les nouvelles images attribuées face visible
    setTimeout(() => {
      melangerCartes();
    }, 800);
  } else {
    return;
  }
}

melangerCartes();

// Ajoute l'événement de clic à chaque carte puis appelle la fonction cardClicked
[...cards].forEach((card) => {
  card.addEventListener("click", cardClicked);
});
