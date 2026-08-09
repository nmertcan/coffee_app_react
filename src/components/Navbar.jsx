import { Coffee, ClipboardList, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";

function Navbar({ cartCount }) {
  return (
    <header className="site-header">
      <nav className="navbar">
        <NavLink to="/" className="brand" aria-label="Ana sayfa">
          <span className="brand-mark">
            <Coffee size={22} />
          </span>
          <span>Kahve Durağı</span>
        </NavLink>

        <div className="nav-links">
          <NavLink to="/" end>
            Menü
          </NavLink>
          <NavLink to="/orders">
            <ClipboardList size={18} />
            Siparişler
          </NavLink>
          <NavLink to="/cart" className="cart-link">
            <ShoppingCart size={18} />
            Sepet
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
