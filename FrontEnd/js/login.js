const submit = document.querySelector('input[type="submit"]');

submit.addEventListener("click", function (e) {
  e.preventDefault();
  FetchUserLogin();
});

async function FetchUserLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const dataUser = await response.json();
    localStorage.setItem("token", dataUser.token);
    localStorage.setItem("login", true);
    window.location.href = "./index.html";
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("login");
    document.querySelector(".errorMsg").innerText =
      "Erreur : mauvais email ou mauvais mot de passe";
  }
}
