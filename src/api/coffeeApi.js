import axios from "axios";
import { mockCoffee } from "../data/mockCoffee";

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

export async function createOrder(order) {
  const response = await api.post("/orders", order);
  return response.data;
}

export async function getOrders() {
  try {
    const response = await api.get("/orders");
    return Array.isArray(response.data) ? response.data : response.data.orders;
  } catch (error) {
    console.warn("Siparişler alınamadı.", error);
    return [];
  }
}

export async function markOrderReady(orderId) {
  const response = await api.put(`/orders/${orderId}/ready`);
  return response.data;
}
