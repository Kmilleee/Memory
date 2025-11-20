let inputUsername = document.getElementById("username");
let inputEmail = document.getElementById("email");
let inputMdp = document.getElementById("mdp");
let inputVerifMdp = document.getElementById("mdpVerif");

// Annule l'événement "submit" du form pour bloquer la requête POST/GET et permettre au JS de gérer la suite
let btnSubmit = document.getElementById("submit-btn");
btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();
});

inputEmail.onkeyup = function () {
  let validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (inputEmail.value.match(validEmail)) {
    console.log("Email valide");
  } else {
    console.log("Email invalide");
  }
};

inputMdp.onkeyup = function () {
  let lettreMinuscule = /(?=.*[a-z])/;
  if (inputMdp.value.match(lettreMinuscule)) {
    console.log("minuscule ok");
  } else {
    console.log("minuscule pas ok");
  }

  let lettreMajuscule = /(?=.*[A-Z])/;
  if (inputMdp.value.match(lettreMajuscule)) {
    console.log("majuscule ok");
  } else {
    console.log("majuscule pas ok");
  }

  let chiffreValide = /(?=.*\d)/;
  if (inputMdp.value.match(chiffreValide)) {
    console.log("chiffre ok");
  } else {
    console.log("chiffre pas ok");
  }

  let nbValide = /(?=.*.{6,})/;
  if (inputMdp.value.match(nbValide)) {
    console.log("nbCaracteres ok");
  } else {
    console.log("nbCaracteres pas ok");
  }
};
