import { useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import { addCartItem, setCartItemQuantity, removeCartItem, cartItemCount } from "./utils/cart";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import CoffeeDetail from "./pages/CoffeeDetail";
import Home from "./pages/Home";
import Orders from "./pages/Orders";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const cartCount = useMemo(
    () => cartItemCount(cartItems),
    [cartItems]
  );

  const addToCart = (coffee) => {
    setCartItems((items) => addCartItem(items, coffee));
  };

  const updateQuantity = (coffeeId, quantity) => {
    setCartItems((items) => setCartItemQuantity(items, coffeeId, quantity));
  };

  const removeFromCart = (coffeeId) => {
    setCartItems((items) => removeCartItem(items, coffeeId));
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
