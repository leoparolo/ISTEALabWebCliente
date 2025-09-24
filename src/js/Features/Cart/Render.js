// /js/Cart/CartUI.js
import { getCart, getCount, getTotal, updateQty, removeItem, clearCart } from "./CRUD.js";

const fmt = new Intl.NumberFormat("es-AR", { style: "currency", currency: "USD" });

const cartBadge = document.getElementById("cart-badge");
const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");
const btnOpenCart = document.getElementById("btn-open-cart");
const btnClear = document.getElementById("btn-clear-cart");

let offcanvas;
let toast;

export function renderCart() {
    // Badge inicial
    renderBadge();

    // Offcanvas
    const el = document.getElementById("offcanvasCart");
    offcanvas = new bootstrap.Offcanvas(el);

    // Toast
    const toastEl = document.getElementById("toast-cart");
    toast = new bootstrap.Toast(toastEl, { delay: 2000 });

    // Abrir offcanvas con render
    btnOpenCart?.addEventListener("click", () => {
        renderOffcanvas();
        offcanvas.show();
    });

    // Delegación de eventos dentro del offcanvas
    cartList?.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-action]");
        if (!btn) return;
        const id = Number(btn.dataset.id);
        const action = btn.dataset.action;

        if (action === "plus") {
            updateQty(id, +1);
        } else if (action === "minus") {
            updateQty(id, -1);
        } else if (action === "remove") {
            removeItem(id);
        }
        renderOffcanvas();
        renderBadge();
    });

    // Vaciar
    btnClear?.addEventListener("click", () => {
        clearCart();
        renderOffcanvas();
        renderBadge();
    });
}

export function renderBadge() {
    const count = getCount();
    if (count > 0) {
        cartBadge.textContent = String(count);
        cartBadge.classList.remove("d-none");
    } else {
        cartBadge.classList.add("d-none");
    }
}

export function renderOffcanvas() {
    const items = getCart();
    cartList.replaceChildren();

    if (items.length === 0) {
        cartList.innerHTML = `<li class="list-group-item text-center text-muted">Tu carrito está vacío.</li>`;
    } else {
        const frag = document.createDocumentFragment();
        for (const it of items) {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex align-items-center gap-2";
            li.innerHTML = `
        <img src="${it.image}" alt="${it.title}" width="48" height="48" class="rounded object-fit-contain">
        <div class="flex-grow-1">
            <div class="fw-semibold">${it.title}</div>
            <div class="small text-muted">${fmt.format(it.price)} c/u</div>
        </div>
        <div class="btn-group" role="group" aria-label="Cantidad">
            <button class="btn btn-outline-secondary" data-action="minus" data-id="${it.id}" aria-label="Disminuir">-</button>
            <span class="btn btn-outline-secondary disabled" aria-live="polite">${it.qty}</span>
            <button class="btn btn-outline-secondary" data-action="plus" data-id="${it.id}" aria-label="Aumentar">+</button>
        </div>
        <button class="btn btn-outline-danger ms-2" data-action="remove" data-id="${it.id}" aria-label="Quitar">
            <i class="bi bi-trash"></i>
        </button>
        `;
            frag.appendChild(li);
        }
        cartList.appendChild(frag);
    }
    cartTotal.textContent = fmt.format(getTotal());
}

export function showAddedToast(message = "Producto agregado al carrito.") {
    const body = document.getElementById("toast-cart-body");
    if (body) body.textContent = message;
    toast?.show();
}