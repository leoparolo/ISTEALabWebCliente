// Products/Render.js
import { GetProducts } from "../../Repository/Product.js";
import { createProductCard } from "./Card.js";

let allProducts = [];  // cache en memoria
let containerRef;      // referencia al contenedor para re-render

export async function renderProducts(container) {
  containerRef = container;
  const estadoCarga = document.getElementById("estado-carga");
  const estadoVacio = document.getElementById("estado-vacio");

  container.innerHTML = "";
  estadoVacio.classList.add("d-none");
  estadoCarga.classList.remove("d-none");

  try {
    allProducts = await GetProducts();

    if (!allProducts || allProducts.length === 0) {
      estadoVacio.textContent = "No se encontraron productos.";
      estadoVacio.classList.remove("d-none");
    } else {
      renderList(allProducts);
      setupSearch(); // 👈 engancha el buscador cuando ya hay data
      // Si viene ?q= en la URL, aplicar
      const params = new URLSearchParams(location.search);
      const q = params.get("q");
      if (q) applySearch(q);
    }
  } catch (error) {
    console.error("Error al cargar productos:", error);
    estadoVacio.textContent = "Ocurrió un error al cargar los productos. Intenta nuevamente.";
    estadoVacio.classList.remove("d-none");
  } finally {
    estadoCarga.classList.add("d-none");
  }
}

/* ---------- helpers ---------- */

function renderList(list) {
  const estadoVacio = document.getElementById("estado-vacio");
  containerRef.replaceChildren();

  if (!list || list.length === 0) {
    estadoVacio.textContent = "No se encontraron productos para la búsqueda.";
    estadoVacio.classList.remove("d-none");
    return;
  }
  estadoVacio.classList.add("d-none");

  const frag = document.createDocumentFragment();
  for (const p of list) {
    const card = createProductCard(p);
    // útil si luego querés scrollear/flash
    card.dataset.productId = String(p.id);
    frag.appendChild(card);
  }
  containerRef.appendChild(frag);
}

function setupSearch() {
  const form = document.getElementById("form-buscar");
  const input = document.getElementById("input-buscar");
  if (!form || !input) return;

  // evitar submit tradicional
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    applySearch(input.value);
  });

  // búsqueda en tiempo real (con debounce)
  const debounced = debounce(() => applySearch(input.value), 200);
  input.addEventListener("input", debounced);
}

function applySearch(rawQuery) {
  const q = (rawQuery ?? "").trim();
  if (q === "") {
    renderList(allProducts);
    return;
  }

  // Saltar directo por ID si usa "#123" o "id:123"
  const idMatch = q.match(/^#?id:?\s*(\d+)$/i) || q.match(/^#(\d+)$/);
  if (idMatch) {
    const id = Number(idMatch[1]);
    const product = allProducts.find(p => Number(p.id) === id);
    if (product) {
      renderList([product]);         // mostrar solo ese
      flashProductCard(String(product.id));
      return;
    }
    // si no está, seguí con búsqueda normal por texto
  }

  const nq = normalize(q);
  const filtered = allProducts.filter(p => {
    const title = normalize(p.title ?? "");
    const desc = normalize(p.description ?? "");
    const cat = normalize(p.category ?? "");
    return title.includes(nq) || desc.includes(nq) || cat.includes(nq);
  });

  renderList(filtered);
}

function normalize(str) {
  return String(str)
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, ""); // quita acentos
}

function debounce(fn, ms = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(null, args), ms);
  };
}

function flashProductCard(productId) {
  const el = containerRef?.querySelector(`[data-product-id="${CSS.escape(productId)}"]`);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.add("ring-flash");
  setTimeout(() => el.classList.remove("ring-flash"), 1200);
}
