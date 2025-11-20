let inputUsername = document.getElementById("username");
let inputEmail = document.getElementById("email");
let inputMdp = document.getElementById("mdp");
let inputVerifMdp = document.getElementById("mdpVerif");
inputMdp.addEventListener("click", affichageForce);

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
      console.log("25%");
      break;
    case 2:
      console.log("50%");
      break;
    case 3:
      console.log("75%");
      break;
    case 4:
      console.log("100%");
      break;
  }
};

/********************************************* */

function affichageForce() {
  let barre = document.getElementById("aide-mdp");
  barre.classList.remove("d-none");
}
