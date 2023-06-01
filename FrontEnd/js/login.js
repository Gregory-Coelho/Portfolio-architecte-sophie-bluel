const submit = document.querySelector('input[type="submit"]');

submit.addEventListener("click", function (e) {
  e.preventDefault();
  FetchUserLogin();
});
