

// CartManager.js
// Módulo que maneja el carrito usando localStorage

// Obtener el carrito guardado (o un array vacío si no existe)
export function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Guardar el carrito en localStorage
export function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Agregar un producto al carrito
export function addToCart(product) {
  const cart = getCart(); // Leer carrito actual
  const existing = cart.find(item => item.id === product.id); // Buscar si ya está

  if (existing) {
    existing.quantity += 1; // Si existe, sumar cantidad
  } else {
    cart.push({ ...product, quantity: 1 }); // Si no, agregar con cantidad 1
  }

  saveCart(cart); // Guardar cambios
  console.log('Producto agregado al carrito:', product);
}
