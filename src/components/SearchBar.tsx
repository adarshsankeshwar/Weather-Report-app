import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = city.trim();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-md mx-auto">
      <div className="relative flex-1">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city name..."
          className="input-glass w-full rounded-2xl px-5 py-4 pl-12 text-sm transition-all duration-200"
          disabled={isLoading}
        />
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !city.trim()}
        className="rounded-2xl bg-primary px-6 py-4 text-primary-foreground font-semibold text-sm transition-all duration-200 hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 flex-shrink-0"
      >
        {isLoading ? (
          <span className="block w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
        ) : (
          <Search size={16} />
        )}
        Search
      </button>
    </form>
  );
};

export default SearchBar;
