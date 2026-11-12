import test from 'node:test';
import assert from 'node:assert/strict';
import { addCartItem, setCartItemQuantity, removeCartItem, cartItemCount, cartTotal } from '../src/utils/cart.js';

const latte = { id: 1, name: 'Latte', price: 90 };
const mocha = { id: 2, name: 'Mocha', price: '110' };

test('adding a product creates a line with quantity one', () => {
  assert.deepEqual(addCartItem([], latte), [{ ...latte, quantity: 1 }]);
});

test('adding the same product increments quantity without duplicating lines', () => {
  const initial = [{ ...latte, quantity: 1 }];
  const result = addCartItem(initial, latte);
  assert.deepEqual(result, [{ ...latte, quantity: 2 }]);
  assert.equal(initial[0].quantity, 1);
});

test('quantity zero removes the product', () => {
  assert.deepEqual(setCartItemQuantity([{ ...latte, quantity: 1 }], 1, 0), []);
});

test('removing one product preserves the others', () => {
  assert.deepEqual(removeCartItem([{ ...latte, quantity: 1 }, { ...mocha, quantity: 2 }], 1), [{ ...mocha, quantity: 2 }]);
});

test('cart count and total reflect quantities and numeric string prices', () => {
  const items = [{ ...latte, quantity: 2 }, { ...mocha, quantity: 1 }];
  assert.equal(cartItemCount(items), 3);
  assert.equal(cartTotal(items), 290);
});
