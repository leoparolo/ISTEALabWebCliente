import { initCartUI } from "./Features/Cart/UICart.js";
import { renderProducts } from "./Features/Products/ListProducts.js";

function start() {
    const container = document.getElementById("products-container");
    initCartUI();
    renderProducts(container);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
} else {
    start();
}