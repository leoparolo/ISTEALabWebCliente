import { GetProducts } from "../../Repository/Product.js";
import { createProductCard } from "./Card.js";

export async function renderProducts(container) {
  const estadoCarga = document.getElementById("estado-carga");
  const estadoVacio = document.getElementById("estado-vacio");

  container.innerHTML = "";
  estadoVacio.classList.add("d-none");
  estadoCarga.classList.remove("d-none");

  try {
    const products = await GetProducts();

    if (!products || products.length === 0) {
      estadoVacio.textContent = "No se encontraron productos.";
      estadoVacio.classList.remove("d-none");
    } else {
      products.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Error al cargar productos:", error);
    estadoVacio.textContent = "Ocurrió un error al cargar los productos. Intenta nuevamente.";
    estadoVacio.classList.remove("d-none");
  } finally {
    estadoCarga.classList.add("d-none");
  }
}
