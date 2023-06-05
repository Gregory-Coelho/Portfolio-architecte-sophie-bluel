const submit = document.querySelector('input[type="submit"]');

submit.addEventListener("click", function (e) {
  e.preventDefault();
  login();
});

// objectif de récupérer les credentials de l'utilisateur dans la page
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

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(creds),
  })
    .then(async (res) => {
      return await res.json();
    })
    .then((json) => {
      console.log("Je suis log et j'ai la réponse en JSON");
      saveToken(json);
      // redirect to index page when everything went well
      window.location.href = "./index.html";
    })
    .catch((err) => {
      console.log(err);
    });
}
