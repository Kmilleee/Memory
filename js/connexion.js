let inputEmail = document.getElementById("email");
let inputMdp = document.getElementById("mdp");
let btnSubmit = document.getElementById("submit-btn");

btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  let utilisateurs = JSON.parse(localStorage.getItem("utilisateurs") ) || []; // Récupère les utilisateurs existants ou un tableau vide s'il n'y en a pas
  const utilisateurTrouve = utilisateurs.find((user) => user.email === inputEmail.value && user.password === inputMdp.value); // Compare email et mot de passe avec les utilisateurs stockés dans le localStorage

  if (utilisateurTrouve) {
    sessionStorage.setItem("utilisateurConnecte", JSON.stringify(utilisateurTrouve)); // Convertit l'objet en chaîne JSON avant de le stocker
    alert("Connexion réussie !");
    window.location.href = "../index.html";
  } else {
    alert("Email ou mot de passe incorrect.");
  }
});