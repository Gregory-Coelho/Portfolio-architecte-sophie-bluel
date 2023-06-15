const submit = document.querySelector('input[type="submit"]');
const errorMsg = document.querySelector(".erreur-msg");

submit.addEventListener("click", async function (e) {
  e.preventDefault();
  try {
    await login();
    window.location.href = "./index.html";
  } catch (err) {
    console.log(err);
    errorMsg.innerText = "Erreur dans l’identifiant ou le mot de passe";
  }
});

function pageCredentials() {
  const fields = {
    email: "email",
    password: "password",
  };
  const email = document.getElementById(fields.email).value;
  const password = document.getElementById(fields.password).value;
  return { email, password };
}

function saveToken(data) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("login", true);
}

async function login() {
  const url = "http://localhost:5678/api/users/login";
  const creds = pageCredentials();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(creds),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la requête de connexion");
  }

  const json = await response.json();
  console.log("Je suis log et j'ai la réponse en JSON");
  saveToken(json);
}
