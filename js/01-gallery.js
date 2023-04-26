import { galleryItems } from "./gallery-items.js";

const galleryItemElement = document.querySelector(".gallery");
let instance;
galleryItemElement.insertAdjacentHTML(
  "beforeend",
  createGalleryItem(galleryItems)
);

galleryItemElement.addEventListener("click", onImgClick);

function createGalleryItem(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
  <li class='gallery__item'>
		<a class='gallery__link' href='${original}'>
	<img 
      class='gallery__image' 
      src='${preview}' 
      data-source='${original}' 
      alt='${description}' />
		</a>
	</li>`;
    })
    .join(" ");
}

function onImgClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") {
    return;
  }

  const imgSource = e.target.dataset.source;

  instance = basicLightbox.create(`
    <div class="modal">
    <img src="${imgSource}"/>
    </div>
`);

  instance.show();
  document.addEventListener("keydown", closeImgCard);
}

function closeImgCard(e) {
  if (e.code !== "Escape") return;

  instance.close();
  document.removeEventListener("keydown", closeImgCard);
}
console.log(galleryItems);
