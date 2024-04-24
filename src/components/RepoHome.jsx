import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./Search";
import useFetch from "./UseFetch";
import LoadingSpinner from "./LoadingSpinner";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";


const Repos = () => {
  const [fetchResults, setFetchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of items per page
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, error } = useFetch(`https://api.github.com/users/Kenbaz/repos`);

  useEffect(() => {
    if (!data) return;

    // Filter repositories based on search query
    const results = data.filter((repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFetchResults(results);
  }, [searchQuery, data]);

  // Calculate total pages
  const totalPages = Math.ceil(fetchResults.length / itemsPerPage);

  // Pagination handlers
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  function handleDeleteRepo(repoId) {
    // Filter out the deleted repo from the search results
    const updatedResults = fetchResults.filter((repo) => repo.id !== repoId);
    setFetchResults(updatedResults);
  }

  function handleCreateRepo(repoName) {
    const newRepo = { id: Date.now(), name: repoName };
    setFetchResults([...fetchResults, newRepo]);
    setIsModalOpen(false);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  if (!data) {
    return (
      <div className="loading">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        There was an error while fetching data, please<Link to={"/"}> refresh page</Link>
      </div>
    );
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = fetchResults.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="fragment">
      <Helmet title="Repository Home" />
      <div className="copy">
        <SearchBar onSearch={setSearchQuery} />
        <button className="create-btn" onClick={() => setIsModalOpen(true)}>
          <FontAwesomeIcon icon={faPlus} /> New
        </button>
      </div>
      {/* <header>
        <SearchBar onSearch={setSearchQuery} />
        <button className="create-btn" onClick={() => setIsModalOpen(true)}>
          <FontAwesomeIcon icon={faPlus} /> New
        </button>
      </header> */}
      <div className="main-repo-container">
        <Modal
          isOpen={isModalOpen}
          onSubmit={handleCreateRepo}
          onClose={handleCloseModal}
        />

        <div className="all-repos-container">
          {fetchResults.length > 0 && <h2>My Public Repositories</h2>}
          <div className="repo-wrapper">
            {currentItems.map((repo) => (
              <div className="repo-container" key={repo.id}>
                <h3>{repo.name}</h3>
                <Link to={`/RepoDetails/${repo.id}`}>
                  <button type="button" className="info-btn">
                    Get Info
                  </button>
                </Link>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => handleDeleteRepo(repo.id)}
                >
                  Delete
                </button>
                <hr className="line" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {fetchResults.length > 0 && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Repos;
