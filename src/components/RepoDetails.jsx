import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "./LoadingSpinner";
import { Helmet } from "react-helmet-async";

function RepoDetails() {
  const { id } = useParams();
  const [repo, setRepo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repositories/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch repository");
        }
        const repoData = await response.json();
        setRepo(repoData);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRepo();
  }, [id]);

  useEffect(() => {
    const fetchLanguages = async () => {
      if (repo) {
        try {
          const response = await fetch(repo.languages_url);
          if (!response.ok) {
            throw new Error("Failed to fetch languages");
          }
          const languages = await response.json();
          setRepo((prevRepo) => ({
            ...prevRepo,
            languages: Object.keys(languages),
          }));
        } catch (error) {
          setError(error.message);
        }
      }
    };

    fetchLanguages();
  }, [repo]);

  if (loading) {
    return (
      <div className=" ms-44 mt-48 md:ms-96 lg:text-center lg:relative lg:right-60 lg:top-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Error: {error}{" "}
        <Link to={"/"}>
          Go back Home
          <FontAwesomeIcon icon={faHome} />
        </Link>
      </div>
    );
  }

  function handleHome() {
    navigate("/");
  }

  return (
    <div className="details-fragment">
      <Helmet title="Repository details" />
      <header className="flex justify-center items-center mb-3 h-16 border-secondary border-b md:h-20 ">
        <p className="font-medium md:text-2xl lg:text-2xl">{repo.full_name}</p>
      </header>
      <h2 className="text-center font-medium mb-2 md:text-3xl md:mb-4 lg:text-xl">
        Repository Details
      </h2>
      <div className="details-container lg:w-1/2 lg:m-auto">
        <main className="main-details">
          <div className="ms-2 mb-1 md:ms-4 md:text-2xl md:mb-4 lg:text-xl">
            <p className="mb-1 md:mb-2">
              <span className="span-style">Languages:</span>{" "}
              {repo.languages
                ? repo.languages.join(", ")
                : "..."}
            </p>
            <p className="mb-1 md:mb-2">
              <span className="span-style">Owner:</span> {repo.owner.login}
            </p>
            <p>
              <span className="span-style">Forks:</span> {repo.forks_count}
            </p>
          </div>
          <hr className="scale-y-20 lg:ms-4" />
          <div className="ms-2 mt-1 mb-1 md:ms-4 md:text-2xl md:mt-2 md:mb-4 lg:text-xl">
            <p className="mb-1 md:mb-2">
              <span className="span-style">Open Issues:</span>{" "}
              {repo.open_issues_count}
            </p>
            <p className="mb-1 md:mb-2">
              <span className="span-style">Created At:</span>{" "}
              {new Date(repo.created_at).toLocaleDateString()}
            </p>
            <p>
              <span className="span-style">Last Updated:</span>{" "}
              {new Date(repo.updated_at).toLocaleDateString()}
            </p>
          </div>
          <hr className="scale-y-20 lg:ms-4" />
          <div className="ms-2 mt-1 mb-1 md:ms-4 md:text-2xl md:mt-2 md:mb-4 lg:text-xl">
            <p className="mb-1 md:mb-2">
              <span className="span-style">License:</span>{" "}
              {repo.license ? repo.license.name : "This repo has no license"}
            </p>
            <p className="mb-1 md:mb-2">
              <span className="span-style">Defualt Branch:</span>{" "}
              {repo.default_branch}
            </p>
            <p>
              <span className="span-style">Stars:</span> {repo.stargazers_count}
            </p>
          </div>
          <hr className="scale-y-20 lg:ms-4" />
          <div className="ms-2 mt-1 mb-5 md:ms-4 md:mt-2 md:mb-4 md:text-2xl lg:text-xl">
            <p className="mb-1 md:mb-2">
              <span className="span-style">Watchers:</span>{" "}
              {repo.subscribers_count}
            </p>
            <p>
              <span className="span-style">Subscribers:</span>{" "}
              {repo.subscribers_count}
            </p>
          </div>
        </main>
      </div>
      <div className="flex justify-center items-center gap-2 md:mt-10 md:gap-5">
        {repo.homepage && (
          <Link to={repo.homepage} target="_blank" rel="noopener noreferrer">
            <button className="w-36 bg-spanColor text-slate-200 focus:outline-none md:w-44 md:h-16 md:text-2xl lg:text-xl lg:w-36 lg:h-14">
              Live site
            </button>
          </Link>
        )}
        <button
          onClick={handleHome}
          className="home-btn w-36 bg-spanColor text-slate-200 md:w-44 md:h-16 md:text-2xl lg:text-xl lg:w-36 lg:h-14"
          type="button"
        >
          Home <FontAwesomeIcon icon={faHome} />
        </button>
      </div>
    </div>
  );
}

export default RepoDetails;
