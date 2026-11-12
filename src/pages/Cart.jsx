import { Minus, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../api/coffeeApi";
import EmptyState from "../components/EmptyState";
import { cartTotal } from "../utils/cart";

function Cart({
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  addOrder
}) {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const totalPrice = useMemo(
    () =>
      cartTotal(cartItems),
    [cartItems]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");

    if (!customerName.trim()) {
      setSubmitError("Sipariş için isim girmen gerekiyor.");
      return;
    }

    const orderPayload = {
      customerName: customerName.trim(),
      note: note.trim(),
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalPrice,
      status: "preparing",
      createdAt: new Date().toISOString()
    };

    setIsSubmitting(true);

    try {
      const savedOrder = await createOrder(orderPayload);
      addOrder({ ...orderPayload, ...savedOrder });
      clearCart();
      navigate("/orders");
    } catch (error) {
      console.error(error);
      setSubmitError("Sipariş gönderilemedi. API bağlantısını kontrol et.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <section className="page">
        <EmptyState
          title="Sepetin boş"
          description="Menüden kahve seçerek sipariş oluşturmaya başlayabilirsin."
          action={
            <Link to="/" className="button">
              Menüye git
            </Link>
          }
        />
      </section>
    );
  }

  return (
    <section className="page split-layout">
      <div>
        <p className="eyebrow">Sepet</p>
        <h1>Sipariş özeti</h1>

        <div className="cart-list">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>{item.price} TL</p>
              </div>
              <div className="quantity-control">
                <button
                  aria-label="Adedi azalt"
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button
                  aria-label="Adedi artır"
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                aria-label="Sepetten sil"
                className="icon-danger"
                type="button"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 size={18} />
              </button>
            </article>
          ))}
        </div>
      </div>

      <form className="checkout-panel" onSubmit={handleSubmit}>
        <h2>Siparişi tamamla</h2>
        <label>
          İsim
          <input
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            placeholder="Müşteri adı"
          />
        </label>
        <label>
          Not
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Şeker, süt veya teslim notu"
            rows="4"
          />
        </label>
        <div className="total-row">
          <span>Toplam</span>
          <strong>{totalPrice} TL</strong>
        </div>
        {submitError && <p className="form-error">{submitError}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Gönderiliyor..." : "Sipariş oluştur"}
        </button>
      </form>
    </section>
  );
}

export default Cart;
