

import { addItem } from "../Cart/CRUD.js";
import { renderBadge, showAddedToast } from "../Cart/Render.js";

export function eventAddToCart() {
  document.getElementById('addToCartBtn').addEventListener('click', function () {
    const product = {
      id: Number(this.dataset.productId),
      title: this.dataset.productTitle,
      price: parseFloat(this.dataset.productPrice),
      image: this.dataset.productImage
    };

    addItem(product);
    renderBadge();
    showAddedToast(`${product.title} agregado al carrito.`);
  });
}

