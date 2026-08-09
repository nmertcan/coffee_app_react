import { useEffect, useMemo, useState } from "react";
import CoffeeCard from "../components/CoffeeCard";
import EmptyState from "../components/EmptyState";
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";
import { getCoffeeList } from "../api/coffeeApi";

function Home({ addToCart }) {
  const [coffees, setCoffees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadCoffees() {
      try {
        const coffeeList = await getCoffeeList();
        setCoffees(coffeeList ?? []);
      } catch (error) {
        setErrorMessage("Kahve listesi yüklenirken bir sorun oluştu.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCoffees();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = coffees.map((coffee) => coffee.category);
    return ["Tümü", ...new Set(uniqueCategories)];
  }, [coffees]);

  const filteredCoffees = useMemo(() => {
    return coffees.filter((coffee) => {
      const matchesSearch = coffee.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());
      const matchesCategory =
        selectedCategory === "Tümü" || coffee.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [coffees, searchTerm, selectedCategory]);

  return (
    <section className="page">
      <div className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Günlük kahve menüsü</p>
          <h1>Kahveni seç, sepetini hazırla, siparişini takip et.</h1>
          <p>
            Sıcak, soğuk, sütlü veya sade kahveleri hızlıca filtreleyip sepete
            ekleyebilirsin.
          </p>
        </div>
        <div className="hero-panel">
          <span>Bugünün önerisi</span>
          <strong>Latte + Mocha</strong>
          <p>Yoğun günler için yumuşak başlangıç ve tatlı kapanış.</p>
        </div>
      </div>

      <div className="toolbar">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Filter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {loading && <p className="status-text">Kahveler yükleniyor...</p>}
      {errorMessage && <p className="status-text error">{errorMessage}</p>}

      {!loading && filteredCoffees.length > 0 && (
        <div className="coffee-grid">
          {filteredCoffees.map((coffee) => (
            <CoffeeCard
              key={coffee.id}
              coffee={coffee}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}

      {!loading && filteredCoffees.length === 0 && (
        <EmptyState
          title="Sonuç bulunamadı"
          description="Arama kelimesini veya filtreyi değiştirerek tekrar dene."
        />
      )}
    </section>
  );
}

export default Home;
