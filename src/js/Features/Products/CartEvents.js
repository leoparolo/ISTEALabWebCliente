

// Escucha el clic en el botón "Agregar al carrito" del modal
// y llama a la función addToCart() para guardar el producto en localStorage.

import { addToCart } from "./CartManager.js";

// Cuando se hace clic en el botón del modal...
document.getElementById('addToCartBtn').addEventListener('click', function () {
  // Armamos un objeto con los datos del producto desde los atributos data-* del botón
  const product = {
    id: this.dataset.productId,
    title: this.dataset.productTitle,
    price: parseFloat(this.dataset.productPrice),
    image: this.dataset.productImage
  };

  // Llamamos a la función que agrega el producto al carrito
  addToCart(product);
});
