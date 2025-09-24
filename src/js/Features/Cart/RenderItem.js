// CartEvents.js
import { getCart, saveCart } from "./LocalStorage.js";

// Elementos del DOM
const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");
const cartBadge = document.getElementById("cart-badge");
const btnClear = document.getElementById("btn-clear-cart");

// Función para renderizar el carrito
function render() {
    const cart = getCart();

    // Limpiar lista
    cartList.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `
      <div>
        <strong>${item.title}</strong><br>
        <small>Cant: ${item.quantity} x $${item.price.toFixed(2)}</small>
      </div>
      <span class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</span>
    `;

        cartList.appendChild(li);
        total += item.price * item.quantity;
    });

    // Actualizar total
    cartTotal.textContent = `$${total.toFixed(2)}`;

    // Actualizar badge en navbar
    if (cart.length > 0) {
        cartBadge.classList.remove("d-none");
        cartBadge.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    } else {
        cartBadge.classList.add("d-none");
    }
}


export function renderItems() {
    // Vaciar carrito
    btnClear.addEventListener("click", () => {
        saveCart([]);
        render();
    });

    // Refrescar carrito al abrir el offcanvas
    document.getElementById("offcanvasCart")
        .addEventListener("show.bs.offcanvas", render);

    // Render inicial (para que se vea aunque no abras el offcanvas aún)
    render();
}