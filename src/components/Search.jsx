import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState("");

    function handleSearch() {
        onSearch(searchQuery);
        setSearchQuery("")
    }

    return (
        <div className="search-container">
            <input
                className="search-input"
                type="text"
                placeholder="Search Repo"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="button" onClick={handleSearch}>
                <FontAwesomeIcon icon={faSearch}/>
            </button>
        </div>
    )
}

export default SearchBar;