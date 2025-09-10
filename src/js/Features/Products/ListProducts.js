import { GetProducts } from "../../Repository/ProductRepository.js";
import { createProductCard } from "./DOMCreateProductCard.js";

const container = document.getElementById("productsContainer");

GetProducts().then(products => {
  products.forEach(product => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
});
