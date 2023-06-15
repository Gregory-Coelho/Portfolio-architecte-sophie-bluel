async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(
      "Une erreur s'est produite lors de la récupération des données."
    );
  }
}

function addGallery(data, gallery) {
  data.forEach((element) => {
    const figure = `<figure>
      <img src=${element.imageUrl} alt=${element.title}>
      <figcaption>${element.title}</figcaption>
    </figure>`;
    gallery.innerHTML += figure;
  });
}

function addBtn(categories, allBtn) {
  categories.forEach((element) => {
    const button = `<button class="btn" id=${element.id}>${element.name}</button>`;
    allBtn.innerHTML += button;
  });
}

function initializeFilters(data) {
  const btns = document.getElementsByClassName("btn");
  const gallery = document.querySelector(".gallery");
  let elementArray = data;

  const handleFilterClick = (categoryId) => {
    const filterBtn = elementArray.filter((element) => {
      return element.categoryId === categoryId;
    });

    Array.from(btns).forEach((btn) => {
      btn.classList.remove("active");
    });
    btns[categoryId].classList.add("active");

    gallery.innerHTML = ""; // Clear gallery
    addGallery(filterBtn, gallery);
  };

  btns[0].addEventListener("click", () => {
    const filterTous = elementArray.filter((element) => element.categoryId);
    Array.from(btns).forEach((btn) => {
      btn.classList.remove("active");
    });
    btns[0].classList.add("active");

    gallery.innerHTML = ""; // Clear gallery
    addGallery(filterTous, gallery);
  });

  for (let i = 1; i < btns.length; i++) {
    btns[i].addEventListener("click", () => {
      handleFilterClick(i);
    });
  }
}

function editMode() {
  const log = document.querySelector("#log");
  const banner = document.querySelector(".banner");
  const modifierContainer = document.querySelector(".modifier-container");
  const modifierprojetsContainer = document.querySelector(
    ".modifier-projets-container"
  );
  const projetsContainer = document.querySelector(".projets-container");
  const allBtn = document.querySelector(".allBtn");

  if (localStorage.login) {
    banner.style.display = "flex";
    log.innerText = "logout";
    modifierContainer.style.display = "flex";
    modifierprojetsContainer.style.display = "flex";
    projetsContainer.style.marginBottom = "92px";
    allBtn.style.display = "none";

    console.log("Vous êtes connecté !");
  } else {
    console.log("Vous n'êtes pas connecté !");
  }
}

log.addEventListener("click", () => {
  localStorage.removeItem("login");
  localStorage.removeItem("token");
  log.innerText = "login";
});

function openModal1() {
  const modal1 = document.querySelector(".modal-container");
  modal1.classList.add("active");
}

function closeModal1() {
  const modal1 = document.querySelector(".modal-container");
  modal1.classList.remove("active");

  const modal2 = document.querySelector(".modal-container2");
  modal2.classList.remove("active");
}

function initializeModals() {
  const modalOpen = document.querySelectorAll(".modal-open");
  const modalClose = document.querySelectorAll(".modal-close");
  const addPicture = document.querySelector(".addpicture");
  const arrowBack = document.querySelector(".arrowback");

  modalOpen.forEach((trigger) => trigger.addEventListener("click", openModal1));

  modalClose.forEach((trigger) =>
    trigger.addEventListener("click", closeModal1)
  );

  arrowBack.addEventListener("click", openModal1);

  addPicture.addEventListener("click", () => {
    const modal2 = document.querySelector(".modal-container2");
    const modal1 = document.querySelector(".modal-container");
    modal2.classList.add("active");
    modal1.classList.remove("active");
  });
}

function addGalleryModale(data) {
  const imgContainer = document.querySelector(".img-container");

  data.forEach((element) => {
    const figure = `<figure class="element-modal">
      <img class="logobin" id="${element.id}" src="./assets/icons/bin.svg" alt="">
      <img class="img-modal" src=${element.imageUrl} alt=${element.title}>
      <figcaption>éditer</figcaption>
    </figure>`;
    imgContainer.innerHTML += figure;
  });

  const deleteTrash = document.querySelectorAll(".logobin");
  deleteTrash.forEach((element) => {
    element.addEventListener("click", () => {
      fetchDeleteWorks(element.id);
    });
  });
}

async function fetchDeleteWorks(id) {
  const token = localStorage.token;

  try {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Il y a eu une erreur lors de la suppression : " + error);
  }
}

function initializeImagePreview() {
  const addPicModal = document.querySelector(".input-addpic");
  const previewImg = document.querySelector(".import-pictures");
  const addTitle = document.querySelector(".title");
  const addCategory = document.querySelector(".category");
  const submit = document.querySelector(".valider");
  const msgError = document.querySelector(".msg-error");
  const form = document.querySelector(".formmodal2");

  let imgPreview = "";
  let inputTitle = "";
  let inputCategory = "";

  addPicModal.addEventListener("input", (e) => {
    imgPreview = e.target.files[0];
    const img = URL.createObjectURL(e.target.files[0]);
    previewImg.src = img;
    previewImg.style.visibility = "visible";
  });

  addTitle.addEventListener("input", (e) => {
    inputTitle = e.target.value;
  });

  addCategory.addEventListener("input", (e) => {
    inputCategory = e.target.selectedIndex;
  });

  form.addEventListener("change", () => {
    if (imgPreview !== "" && inputTitle !== "" && inputCategory !== "") {
      submit.style.background = "#1D6154";
      submit.style.cursor = "pointer";
    } else {
      submit.style.backgroundColor = "";
    }
  });

  form.addEventListener("submit", handleFormSubmit);

  function handleFormSubmit(e) {
    e.preventDefault();
    submitForm();
  }

  async function submitForm() {
    if (!imgPreview || !inputTitle || !inputCategory) {
      msgError.innerText = "Veuillez remplir tous les champs.";
      msgError.style.color = "red";
      setTimeout(() => {
        msgError.innerText = "";
      }, 4000);
      console.log("Tous les champs ne sont pas remplis !");
      return;
    }

    const formData = new FormData();
    formData.append("image", imgPreview);
    formData.append("title", inputTitle);
    formData.append("category", inputCategory);

    const token = localStorage.token;

    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Formulaire soumis avec succès !");
        closeModal1();
      } else {
        msgError.innerText = "Erreur lors de la soumission du formulaire.";
        msgError.style.color = "red";
        setTimeout(() => {
          msgError.innerText = "";
        }, 4000);
        console.log("Erreur lors de la soumission du formulaire !");
      }
    } catch (error) {
      console.log(
        "Une erreur s'est produite lors de la soumission du formulaire : " +
          error
      );
    }
  }
}

async function initializeApp() {
  const gallery = document.querySelector(".gallery");
  const allBtn = document.querySelector(".allBtn");

  try {
    const data = await fetchData("http://localhost:5678/api/works");
    const categories = await fetchData("http://localhost:5678/api/categories");

    addGallery(data, gallery);
    addBtn(categories, allBtn);
    initializeFilters(data);
    editMode();
    initializeModals();
    addGalleryModale(data);
    initializeImagePreview();
  } catch (error) {
    console.log(
      "Une erreur s'est produite lors de l'initialisation de l'application : " +
        error
    );
  }
}

initializeApp();
