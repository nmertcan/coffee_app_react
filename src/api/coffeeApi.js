import axios from "axios";
import { mockCoffee } from "../data/mockCoffee.js";

const api = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json"
  }
});

export async function getCoffeeList() {
  try {
    const response = await api.get("/api/coffee");
    return Array.isArray(response.data) ? response.data : response.data.coffee;
  } catch (error) {
    console.warn("API kahve verisi alınamadı, demo veri kullanılıyor.", error);
    return mockCoffee;
  }
}

export async function createOrder(order, client = api) {
  const response = await client.post("/orders", order);
  return response.data;
}

export async function getOrders(client = api) {
  try {
    const response = await client.get("/orders");
    return Array.isArray(response.data) ? response.data : response.data.orders;
  } catch (error) {
    console.warn("Siparişler alınamadı.", error);
    return [];
  }
}

export async function markOrderReady(orderId, client = api) {
  const response = await client.put(`/orders/${orderId}/ready`);
  return response.data;
}
