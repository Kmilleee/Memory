/***************** DECLARATION DES VARIABLES GLOBALES ***********************/

// Variables pour récupération les différents inputs du formulaire
let inputUsername = document.getElementById("username");
let inputEmail = document.getElementById("email");
let inputMdp = document.getElementById("mdp");
let inputVerifMdp = document.getElementById("mdpVerif");
let imageOeil = document.getElementById("oeil");
document
  .getElementById("btn-visibilite-password")
  .addEventListener("click", afficheMdp);
inputMdp.addEventListener("click", affichageForce);

// Variables pour affichage de la force du mot de passe
let barreForce = document.getElementById("barre-force");
let texteForce = document.getElementById("texte-force");
let barreContainer = document.getElementById("indicateur-force");

// Déclaration des Regex
const lettre = /[a-zA-Z]/;
const chiffreValide = /(?=.*\d)/;
const nbValide = /(?=.*.{6,})/;
const special = /(?=.*[!@#$%^&*()_+\-=[\]{};':",.<>/?])/;
const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Variables pour la récupération des différents messages d'erreur
let erreurUsername = document.getElementById("erreur-username");
let erreurEmail = document.getElementById("erreur-email");
let erreurMdpVerif = document.getElementById("erreur-mdpVerif");
let infoMdp = document.getElementById("info-mdp");

// Annule l'événement "submit" du form pour bloquer la requête POST/GET et permettre au JS de gérer la suite
let btnSubmit = document.getElementById("submit-btn");
btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();
});

/***************** VERIFICATION DES CHAMPS ***********************/

// Vérification format nom d'utilisateur
inputUsername.onkeyup = function () {
  if (inputUsername.value.length < 3) {
    erreurUsername.textContent =
      "Nom d'utilisateur invalide (minimum 3 caractères)";
  } else {
    erreurUsername.textContent = "";
  }
  verificationFormulaire();
};

// Vérification format Email
inputEmail.onkeyup = function () {
  if (inputEmail.value.match(validEmail)) {
    erreurEmail.textContent = "";
  } else {
    erreurEmail.textContent = "Email invalide (ex: nom@domaine.com)";
  }
  verificationFormulaire();
};

// Vérification correspondance mot de passe
inputVerifMdp.onkeyup = function () {
  if (inputMdp.value === inputVerifMdp.value) {
    erreurMdpVerif.textContent = "";
  } else {
    erreurMdpVerif.textContent =
      "Mot de passe invalide ( les deux mot de passe doivent être identiques)";
  }
  verificationFormulaire();
};

/********************************************* */

// Gestion de la force du mot de passe
inputMdp.onkeyup = function () {
  let force = 0;

  barreForce.classList.remove(
    "w-25",
    "w-50",
    "w-75",
    "w-100",
    "bg-danger",
    "bg-warning",
    "bg-success"
  );

  if (inputMdp.value.length <= 6) {
    force = 1;
  }

  if (
    inputMdp.value.length > 6 &&
    (inputMdp.value.match(special) || inputMdp.value.match(chiffreValide))
  ) {
    force = 2;
  }

  if (
    inputMdp.value.length > 9 &&
    inputMdp.value.match(special) &&
    inputMdp.value.match(chiffreValide)
  ) {
    force = 3;
  }

  switch (force) {
    case 1:
      barreForce.classList.add("w-25", "bg-danger");
      texteForce.textContent = "Faible";
      break;
    case 2:
      barreForce.classList.add("w-50", "bg-warning");
      texteForce.textContent = "Moyen";
      break;
    case 3:
      barreForce.classList.add("w-100", "bg-success");
      texteForce.textContent = "Fort";
      break;
  }

  // Gestion de l'affichage du message d'aide du mot de passe
  if (
    inputMdp.value.length >= 6 &&
    inputMdp.value.match(special) &&
    inputMdp.value.match(chiffreValide) &&
    inputMdp.value.match(lettre)
  ) {
    infoMdp.classList.add("d-none");
  } else {
    infoMdp.classList.remove("d-none");
  }

  verificationFormulaire();
};

// Bouton afficher / masquer mot de passe
function afficheMdp() {
  if (imageOeil.src.includes("oeil-ouvert.svg")) {
    imageOeil.src = "/img/oeil-ferme.svg";
    inputMdp.type = "password";
  } else {
    imageOeil.src = "/img/oeil-ouvert.svg";
    inputMdp.type = "texte";
  }
}

// Fonction de vérification du formulaire global pour activer/desactiver le bouton submit
function verificationFormulaire() {
  let usernameOk = inputUsername.value.length >= 3;
  let emailOk = inputEmail.value.match(validEmail);
  let mdpOk =
    inputMdp.value.length >= 6 &&
    inputMdp.value.match(special) &&
    inputMdp.value.match(chiffreValide) &&
    inputMdp.value.match(lettre);
  let mdpVerifOk = inputMdp.value === inputVerifMdp.value;

  if (usernameOk && emailOk && mdpOk && mdpVerifOk) {
    btnSubmit.disabled = false;
  } else {
    btnSubmit.disabled = true;
  }
}

// Fonction pour afficher le niveau de force du mot de passe (supprime la classe d-none lorsqu'on clique sur le champ mdp)
function affichageForce() {
  barreContainer.classList.remove("d-none");
  infoMdp.classList.remove("d-none");
}
