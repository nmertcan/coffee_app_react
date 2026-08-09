import { Plus, Star } from "lucide-react";
import { Link } from "react-router-dom";

function CoffeeCard({ coffee, addToCart }) {
  return (
    <article className="coffee-card">
      <Link to={`/coffee/${coffee.id}`} className="coffee-image-link">
        <img src={coffee.image} alt={coffee.name} className="coffee-image" />
      </Link>
      <div className="coffee-card-body">
        <div className="coffee-card-top">
          <div>
            <p className="eyebrow">{coffee.category}</p>
            <h3>{coffee.name}</h3>
          </div>
          <span className="rating">
            <Star size={16} fill="currentColor" />
            {coffee.rating}
          </span>
        </div>

        <p className="coffee-description">{coffee.description}</p>

        <div className="coffee-card-actions">
          <strong>{coffee.price} TL</strong>
          <button type="button" onClick={() => addToCart(coffee)}>
            <Plus size={18} />
            Sepete ekle
          </button>
        </div>
      </div>
    </article>
  );
}

export default CoffeeCard;
