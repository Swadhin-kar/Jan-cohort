import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 500);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (debounced.trim()) {
      navigate(`/${debounced}`);
    }
  };

  return (
    <div className="flex gap-2 w-full max-w-3xl">
      {/* <input
        type="text"
        placeholder="Search jobs, companies, skills..."
        className="flex-1 border px-4 py-2 rounded-lg"
        onChange={e => setQuery(e.target.value)}
      /> */}
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-6 rounded-lg"
      >
        Search
      </button>
    </div>
  );
}
