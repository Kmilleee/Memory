let inputUsername = document.getElementById("username");
let inputEmail = document.getElementById("email");
let inputMdp = document.getElementById("mdp");
let inputVerifMdp = document.getElementById("mdpVerif");
inputMdp.addEventListener("click", affichageForce);

let barreForce = document.getElementById("barre-force");
let texteForce = document.getElementById("texte-force");
let barreContainer = document.getElementById("indicateur-force");

// Annule l'événement "submit" du form pour bloquer la requête POST/GET et permettre au JS de gérer la suite
let btnSubmit = document.getElementById("submit-btn");
btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();
});

/***************** REGEX ***********************/

// Vérification format Email
inputEmail.onkeyup = function () {
  let validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (inputEmail.value.match(validEmail)) {
    console.log("Email valide");
  } else {
    console.log("Email invalide");
  }
};

// Vérification conditions mot de passe
inputMdp.onkeyup = function () {
  var force = 0;

  barreForce.classList.remove(
    "w-25",
    "w-50",
    "w-75",
    "w-100",
    "bg-danger",
    "bg-warning",
    "bg-success"
  );

  let lettreMinuscule = /(?=.*[a-z])/;
  if (inputMdp.value.match(lettreMinuscule)) {
    console.log("minuscule ok");
    force++;
  }

  let lettreMajuscule = /(?=.*[A-Z])/;
  if (inputMdp.value.match(lettreMajuscule)) {
    force++;
  }

  let chiffreValide = /(?=.*\d)/;
  if (inputMdp.value.match(chiffreValide)) {
    force++;
  }
  let nbValide = /(?=.*.{6,})/;
  if (inputMdp.value.match(nbValide)) {
    force++;
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
      barreForce.classList.add("w-75", "bg-primary");
      texteForce.textContent = "Bon";
      break;
    case 4:
      barreForce.classList.add("w-100", "bg-success");
      texteForce.textContent = "Fort";
      break;
  }
};

/********************************************* */

function affichageForce() {
  barreContainer.classList.remove("d-none");
}
