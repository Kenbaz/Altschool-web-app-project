import { useState } from "react";

function SearchBar({ onSearch, currentPage, setCurrentPage }) {
  const [searchQuery, setSearchQuery] = useState("");

  function handleChange(event) {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);

    if (query === "") {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(1);
    }
  }

  return (
    <div className="rounded-md w-2/3 border border-secondary hover:border-cyan-700 lg:w-3/4 lg:h-11 lg:rounded-lg">
      <input
        className="w-full h-full rounded-md placeholder-gray-600 relative pl-2 text-sm font-medium focus:outline-none md:h-14 md:text-2xl md:pl-4 lg:text-base lg:h-full lg:rounded-lg"
        type="text"
        placeholder="Search repository..."
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
