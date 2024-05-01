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
    <div className="w-3/4 rounded-md border border-secondary hover:border-cyan-700 lg:w-3/6 lg:h-11 lg:ms-96">
      <input
        className="w-full h-8 rounded-md placeholder-gray-600 relative pl-2 text-sm font-medium focus:outline-none md:h-14 md:text-2xl md:pl-4 lg:text-base lg:h-10"
        type="text"
        placeholder="Search repository..."
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
