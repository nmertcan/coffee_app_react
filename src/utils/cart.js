export function addCartItem(items, coffee) {
  const existing = items.find((item) => item.id === coffee.id);
  return existing
    ? items.map((item) => item.id === coffee.id ? { ...item, quantity: item.quantity + 1 } : item)
    : [...items, { ...coffee, quantity: 1 }];
}

export function setCartItemQuantity(items, coffeeId, quantity) {
  if (quantity <= 0) return items.filter((item) => item.id !== coffeeId);
  return items.map((item) => item.id === coffeeId ? { ...item, quantity } : item);
}

export function removeCartItem(items, coffeeId) {
  return items.filter((item) => item.id !== coffeeId);
}

export function cartItemCount(items) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function cartTotal(items) {
  return items.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
}
