async function fetchDataWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();
  addGallery(data);
}

const gallery = document.querySelector(".gallery");

function addGallery(data) {
  data.forEach((element) => {
    const figure = `<figure>
      <img src=${element.imageUrl} alt=${element.title}>
      <figcaption>${element.title}</figcaption>
    </figure>`;
    gallery.innerHTML += figure;
  });
}

fetchDataWorks();
