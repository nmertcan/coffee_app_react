import { Search } from "lucide-react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <label className="search-bar">
      <Search size={18} />
      <input
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Kahve ara"
      />
    </label>
  );
}

export default SearchBar;
