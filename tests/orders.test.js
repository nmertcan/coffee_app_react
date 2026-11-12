import test from "node:test";
import assert from "node:assert/strict";
import { createOrder, getOrders, markOrderReady } from "../src/api/coffeeApi.js";

test("createOrder sends payload to /orders and returns saved order", async () => {
  const payload = { customerName: "Test", items: [], totalPrice: 0 };
  const saved = { ...payload, id: 42 };
  const client = {
    post: async (path, body) => {
      assert.equal(path, "/orders");
      assert.deepEqual(body, payload);
      return { data: saved };
    }
  };
  assert.deepEqual(await createOrder(payload, client), saved);
});

test("createOrder propagates API errors without claiming success", async () => {
  const client = { post: async () => { throw new Error("server unavailable"); } };
  await assert.rejects(createOrder({ items: [] }, client), /server unavailable/);
});

test("getOrders accepts an array response", async () => {
  const orders = [{ id: 1 }];
  assert.deepEqual(await getOrders({ get: async (path) => {
    assert.equal(path, "/orders");
    return { data: orders };
  } }), orders);
});

test("getOrders accepts an orders wrapper", async () => {
  assert.deepEqual(await getOrders({ get: async () => ({ data: { orders: [{ id: 2 }] } }) }), [{ id: 2 }]);
});

test("getOrders returns an empty list when request fails", async () => {
  const originalWarn = console.warn;
  console.warn = () => {};
  try {
    assert.deepEqual(await getOrders({ get: async () => { throw new Error("offline"); } }), []);
  } finally {
    console.warn = originalWarn;
  }
});

test("markOrderReady uses the correct endpoint and returns response", async () => {
  const client = { put: async (path) => {
    assert.equal(path, "/orders/17/ready");
    return { data: { id: 17, status: "ready" } };
  } };
  assert.deepEqual(await markOrderReady(17, client), { id: 17, status: "ready" });
});

test("markOrderReady propagates errors", async () => {
  await assert.rejects(markOrderReady(17, { put: async () => { throw new Error("failed"); } }), /failed/);
});
