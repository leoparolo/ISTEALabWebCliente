import { renderCart } from "./Features/Cart/Render.js";
import { renderProducts } from "./Features/Products/Render.js";
import { renderItems } from "./Features/Cart/RenderItem.js";
import { eventAddToCart } from "./Features/Products/Detail.js"

function start() {
    const container = document.getElementById("products-container");
    renderProducts(container);
    eventAddToCart();
    renderCart();
    renderItems();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
} else {
    start();
}