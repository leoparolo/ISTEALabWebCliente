const STORAGE_KEY = "cart:v1";

function read() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

function write(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getCart() {
  return read();
}

export function getCount() {
  return read().reduce((acc, it) => acc + it.qty, 0);
}

export function addItem(product) {
  const cart = read();
  const idx = cart.findIndex(it => it.id === product.id);
  if (idx >= 0) {
    cart[idx].qty += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      qty: 1
    });
  }
  write(cart);
  return cart;
}

export function removeItem(id) {
  const cart = read().filter(it => it.id !== id);
  write(cart);
  return cart;
}

export function updateQty(id, delta) {
  let cart = read().map(it =>
    it.id === id ? { ...it, qty: it.qty + delta } : it
  );
  cart = cart.filter(it => it.qty > 0);
  write(cart);
  return cart;
}

export function clearCart() {
  write([]);
  return [];
}

export function getTotal() {
  const cart = read();
  return cart.reduce((acc, it) => acc + (it.price * it.qty), 0);
}
