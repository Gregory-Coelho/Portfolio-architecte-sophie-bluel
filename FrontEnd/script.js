let itemArray;

async function fetchDataWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const dataWorks = await response.json();
  addGallery(dataWorks);
  itemArray = dataWorks;
}

fetchDataWorks();

async function fetchDataCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  const dataCategories = await response.json();
  addButton(dataCategories);
}

fetchDataCategories();

function addGallery(data) {
  data.forEach((element) => {
    document.querySelector(".gallery").innerHTML += `<figure>
      <img src=${element.imageUrl} alt=${element.title}>
      <figcaption>${element.title}</figcaption>
    </figure>`;
  });
}

function addButton(categories) {
  categories.forEach((element) => {
    document.querySelector(
      ".filterButtons"
    ).innerHTML += `<button class="filterButtons__button" id=${element.id}>${element.name}</button>`;
  });
  filters();
}

function filters() {
  const buttons = document.getElementsByClassName("filterButtons__button");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
      const filterButton = itemArray.filter((element) => {
        return element.categoryId === i;
      });
      buttons[0].classList.remove("active");
      buttons[1].classList.remove("active");
      buttons[2].classList.remove("active");
      buttons[3].classList.remove("active");
      buttons[i].classList.add("active");
      console.log(filterButton);

      document.querySelector(".gallery").innerHTML = "";
      addGallery(filterButton);
    });

    buttons[0].addEventListener("click", () => {
      const filterTous = itemArray.filter((element) => {
        return element.categoryId;
      });
      buttons[0].classList.add("active");
      buttons[i].classList.remove("active");
      console.log(filterTous);

      document.querySelector(".gallery").innerHTML = "";
      addGallery(filterTous);
    });
  }
}
