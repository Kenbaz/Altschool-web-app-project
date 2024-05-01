import { useState } from "react";

function SidebarSearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  function handleChange(event) {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  }

  return (
    <div className="w-3/4 rounded-md border border-secondary hover:border-cyan-700 lg:w-full lg:h-9">
      <input
        className="w-full rounded-md placeholder-gray-600 relative font-medium focus:outline-none lg:text-md md:pl-4 lg:h-9"
        type="text"
        placeholder="Search repository..."
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
}

export default SidebarSearchBar;
