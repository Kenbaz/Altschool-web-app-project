import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./Search";
import useFetch from "./UseFetch";
import LoadingSpinner from "./LoadingSpinner";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";

const Repos = () => {
  const [fetchResults, setFetchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of items per page
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const { data, error, isLoading } = useFetch(
    `https://api.github.com/users/Kenbaz/repos`
  );

  useEffect(() => {
    if (error) {
      setErrorMessage("Failed to fetch");
    }
    if (data) {
      setFetchResults(data);
    }
  }, [data, error]);

  useEffect(() => {
    const filteredRepos = searchQuery
      ? fetchResults.filter((repo) =>
          repo.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : fetchResults;
    setFilteredResults(filteredRepos);
  }, [searchQuery, fetchResults]);

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = filteredResults.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePrevPage = () => setCurrentPage((prevPage) => prevPage - 1);
  const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);

  const handleDeleteRepo = (repoId) => {
    setFetchResults((prevResults) =>
      prevResults.filter((repo) => repo.id !== repoId)
    );
  };

  const handleCreateRepo = (repoName, description) => {
    const newRepo = {
      id: Date.now(),
      name: repoName,
      description: description,
    };
    setFetchResults((prevResults) => [...prevResults, newRepo]);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="fragment mt-2 relative">
      <Helmet title="Repository Home" />

      <div className="main-repo-container w-11/12 rounded-lg m-auto transition ease-linear duration-500">
        <Modal
          isOpen={isModalOpen}
          onSubmit={handleCreateRepo}
          onClose={handleCloseModal}
        />

        {isLoading ? (
          <div className="loading ms-40 mt-48 md:ms-80 md:mt-80 lg:relative lg:left-52">
            <LoadingSpinner />
          </div>
        ) : errorMessage ? (
          <div>{errorMessage}</div>
        ) : (
          <div className="all-repos-container grid place-items-center">
            {fetchResults && (
              <>
                <div className="flex justify-around w-11/12 m-auto mt-4 mb-4 lg:w-2/3">
                  <SearchBar
                    onSearch={setSearchQuery}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                  <button
                    className="h-9 w-20 -ms-4 p-1 border-secondary text-sm hover:border-cyan-600 md:w-32 md:-ms-10 md:h-14 md:text-2xl lg:h-9 lg:text-sm lg:w-16 lg:absolute lg:-left-10 lg:-top-56"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <FontAwesomeIcon icon={faPlus} /> New
                  </button>
                </div>
                <h2 className="mb-3 text-lg font-semibold md:text-3xl md:mb-4 lg:text-2xl lg:mb-8">
                  My Public Repositories
                </h2>
              </>
            )}
            <div className="repo-wrapper text-sm grid gap-2 md:text-2xl md:gap-4 lg:text-base lg:repo-grid lg:mb-7">
              {currentResults.map((repo) => (
                <div
                  className="repo-container border w-11/12 m-auto border-secondary rounded-md grid place-items-center lg:w-full lg:rounded-lg lg:h-80"
                  key={repo.id}
                >
                  <h3 className="font-bold md:text-3xl mt-3 lg:text-xl lg:font-medium lg:mt-1 lg:-mb-3">
                    {repo.name}
                  </h3>
                  <p className="m-1 mt-0 md:m-3">{repo.description}</p>
                  <div className="mt-2 flex gap-2 mb-2 md:mb-3">
                    <Link to={`/RepoDetails/${repo.id}`}>
                      <button
                        type="button"
                        className="info-btn h-8 w-20 p-1 bg-tinWhite text-gray-800 hover:border-cyan-600 md:w-32 md:h-12 lg:w-28 lg:h-10"
                      >
                        More Info
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="delete-btn h-8 p-1 w-20 bg-tinWhite text-gray-800 hover:border-cyan-600 md:w-32 md:h-12 lg:w-28 lg:h-10"
                      onClick={() => handleDeleteRepo(repo.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination mt-5 mb-5 flex justify-center">
              <button
                className="h-8 p-1 w-20 bg-tinWhite text-gray-800 text-sm md:w-32 md:h-12 md:text-2xl lg:w-28 lg:h-10 lg:text-base"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <FontAwesomeIcon className="mr-1" icon={faChevronLeft} />
                Previous
              </button>
              <span className="m-1 text-sm md:m-2 md:text-2xl lg:text-base">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="h-8 py-0 w-20 text-sm bg-tinWhite text-gray-800 md:w-32 md:h-12 md:text-2xl md:py-1 lg:w-24 lg:h-10 lg:text-base"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
                <FontAwesomeIcon
                  className="ms-1 mt-2 md:relative md:bottom-9 md:mt-2.5 md:left-9 lg:-left-0 lg:top-0"
                  icon={faChevronRight}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Repos;
