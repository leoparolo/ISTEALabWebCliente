import { GetProducts } from "../../Repository/ProductRepository.js";
import { createProductCard } from "./UIProductCard.js";

export async function renderProducts(container) {
  const products = await GetProducts();
  products.forEach(product => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}


// import { GetProducts } from "../../Repository/ProductRepository.js";
// import { createProductCard } from "./DOMCreateProductCard.js";
// import { initCartUI } from "../Cart/DOMCart.js";

// const container = document.getElementById("productsContainer");

// function start() {
//   initCartUI();
//   GetProducts().then(products => {
//     products.forEach(product => {
//       const card = createProductCard(product);
//       container.appendChild(card);
//     });
//   });
// }

// if (document.readyState === "loading") {
//   document.addEventListener("DOMContentLoaded", start);
// } else {
//   start();
// }
