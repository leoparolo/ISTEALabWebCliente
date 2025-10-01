import { renderCart } from "./Features/Cart/Render.js";
import { renderProducts } from "./Features/Products/Render.js";
import { eventAddToCart } from "./Features/Products/Detail.js";

function start() {
  const container = document.getElementById("products-container");

  // Renderizar productos
  renderProducts(container);

  // Conectar botón "Agregar al carrito" del modal
  eventAddToCart();

  // Inicializar carrito (badge, offcanvas, eventos)
  renderCart();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
