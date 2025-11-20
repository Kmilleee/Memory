// Annule l'événement "submit" du form pour bloquer la requête POST/GET et permettre au JS de gérer la suite
let btnSubmit = document.getElementById("submit-btn");
btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();
});
