import { CheckCircle2, Clock3 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders, markOrderReady } from "../api/coffeeApi";
import EmptyState from "../components/EmptyState";

function Orders({ orders, updateOrder }) {
  const [apiOrders, setApiOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      const orderList = await getOrders();
      setApiOrders(orderList ?? []);
      setLoading(false);
    }

    loadOrders();
  }, []);

  const allOrders = [...orders, ...apiOrders].filter(
    (order, index, orderList) =>
      orderList.findIndex((item) => String(item.id) === String(order.id)) ===
      index
  );

  const handleReady = async (orderId) => {
    setActionError("");

    try {
      const updatedOrder = await markOrderReady(orderId);
      updateOrder(orderId, { status: "ready", ...updatedOrder });
      setApiOrders((currentOrders) =>
        currentOrders.map((order) =>
          String(order.id) === String(orderId)
            ? { ...order, status: "ready", ...updatedOrder }
            : order
        )
      );
    } catch (error) {
      console.error(error);
      setActionError("Sipariş hazır durumuna alınamadı.");
    }
  };

  if (loading) {
    return (
      <section className="page">
        <p className="status-text">Siparişler yükleniyor...</p>
      </section>
    );
  }

  if (allOrders.length === 0) {
    return (
      <section className="page">
        <EmptyState
          title="Henüz sipariş yok"
          description="İlk siparişi oluşturmak için menüye dönebilirsin."
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
    <section className="page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Siparişler</p>
          <h1>Aktif sipariş takibi</h1>
        </div>
        {actionError && <p className="form-error">{actionError}</p>}
      </div>

      <div className="orders-list">
        {allOrders.map((order) => {
          const isReady = order.status === "ready";

          return (
            <article className="order-card" key={order.id ?? order.createdAt}>
              <div className="order-card-header">
                <div>
                  <h2>{order.customerName}</h2>
                  <p>{new Date(order.createdAt).toLocaleString("tr-TR")}</p>
                </div>
                <span className={isReady ? "status ready" : "status preparing"}>
                  {isReady ? <CheckCircle2 size={16} /> : <Clock3 size={16} />}
                  {isReady ? "Hazır" : "Hazırlanıyor"}
                </span>
              </div>

              <ul className="order-items">
                {order.items?.map((item) => (
                  <li key={`${order.id}-${item.id}`}>
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <strong>{item.price * item.quantity} TL</strong>
                  </li>
                ))}
              </ul>

              {order.note && <p className="order-note">Not: {order.note}</p>}

              <div className="order-footer">
                <strong>{order.totalPrice} TL</strong>
                {!isReady && (
                  <button type="button" onClick={() => handleReady(order.id)}>
                    Hazır yap
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Orders;
