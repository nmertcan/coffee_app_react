import { ArrowLeft, Plus, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCoffeeList } from "../api/coffeeApi";
import EmptyState from "../components/EmptyState";

function CoffeeDetail({ addToCart }) {
  const { id } = useParams();
  const [coffee, setCoffee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCoffee() {
      const coffeeList = await getCoffeeList();
      const selectedCoffee = coffeeList.find(
        (item) => String(item.id) === String(id)
      );
      setCoffee(selectedCoffee ?? null);
      setLoading(false);
    }

    loadCoffee();
  }, [id]);

  if (loading) {
    return (
      <section className="page">
        <p className="status-text">Kahve detayı yükleniyor...</p>
      </section>
    );
  }

  if (!coffee) {
    return (
      <section className="page">
        <EmptyState
          title="Kahve bulunamadı"
          description="Bu kahve menüde olmayabilir."
          action={
            <Link to="/" className="button secondary">
              Menüye dön
            </Link>
          }
        />
      </section>
    );
  }

  return (
    <section className="page detail-layout">
      <div>
        <Link to="/" className="back-link">
          <ArrowLeft size={18} />
          Menüye dön
        </Link>
        <img src={coffee.image} alt={coffee.name} className="detail-image" />
      </div>

      <div className="detail-content">
        <p className="eyebrow">{coffee.category}</p>
        <h1>{coffee.name}</h1>
        <span className="rating large">
          <Star size={18} fill="currentColor" />
          {coffee.rating}
        </span>
        <p>{coffee.description}</p>

        <div className="ingredient-list">
          {coffee.ingredients?.map((ingredient) => (
            <span key={ingredient}>{ingredient}</span>
          ))}
        </div>

        <div className="detail-actions">
          <strong>{coffee.price} TL</strong>
          <button type="button" onClick={() => addToCart(coffee)}>
            <Plus size={18} />
            Sepete ekle
          </button>
        </div>
      </div>
    </section>
  );
}

export default CoffeeDetail;
