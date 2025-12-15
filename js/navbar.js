let utilisateurConnecte = sessionStorage.getItem("utilisateurConnecte");

const btnInscription = document.getElementById("btn-inscription");
const btnConnexion = document.getElementById("btn-connexion");
const btnDeconnexion = document.getElementById("btn-deconnexion");

if (utilisateurConnecte !== null) {
  btnInscription.style.display = "none";
  btnConnexion.style.display = "none";
  btnDeconnexion.style.display = "block";
} else {
  btnInscription.style.display = "block";
  btnConnexion.style.display = "block";
  btnDeconnexion.style.display = "none";
}

btnDeconnexion.addEventListener("click", () => {
  sessionStorage.removeItem("utilisateurConnecte");
  alert("Déconnexion réussie !");
  if (window.location.pathname.includes("pages/")) {
    window.location.href = "../index.html";
    return;
  } else {
  window.location.href = "index.html";
}});