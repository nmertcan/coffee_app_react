function Filter({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="filter-group" aria-label="Kategori filtresi">
      {categories.map((category) => (
        <button
          className={category === selectedCategory ? "filter active" : "filter"}
          key={category}
          onClick={() => setSelectedCategory(category)}
          type="button"
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Filter;
