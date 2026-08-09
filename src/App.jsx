import { useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import CoffeeDetail from "./pages/CoffeeDetail";
import Home from "./pages/Home";
import Orders from "./pages/Orders";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const addToCart = (coffee) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === coffee.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === coffee.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...coffee, quantity: 1 }];
    });
  };

  const updateQuantity = (coffeeId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(coffeeId);
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === coffeeId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (coffeeId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== coffeeId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addOrder = (order) => {
    setOrders((currentOrders) => [order, ...currentOrders]);
  };

  const updateOrder = (orderId, updatedOrder) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        String(order.id) === String(orderId) ? { ...order, ...updatedOrder } : order
      )
    );
  };

  return (
    <div className="app-shell">
      <Navbar cartCount={cartCount} />
      <main>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route
            path="/coffee/:id"
            element={<CoffeeDetail addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                addOrder={addOrder}
              />
            }
          />
          <Route
            path="/orders"
            element={<Orders orders={orders} updateOrder={updateOrder} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
