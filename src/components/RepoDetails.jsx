import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";
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

    if (loading) {
      return (
        <div className="loading-details-icon">
          <LoadingSpinner/>
        </div>
      )
    }

    if (error) {
      return <div>Error: {error} <Link to={"/"}>Go back Home<FontAwesomeIcon icon={faHome}/></Link></div>;
    }


    function handleHome() {
        navigate("/")
    }


  return (
    <div className="details-fragment">
      <Helmet title="Repository details" />
      <header>
        <img className="avatar" src="/src/IMG_2152.JPG" alt="avatar" />
        <p>{repo.full_name}</p>
        <h2>Repository Details</h2>
      </header>
      <div className="details-container">
        <main className="main-details">
          <p>
            <span>Repo Name:</span> {repo.full_name}
          </p>
          <p>
            <span>Description:</span> {repo.description || "No description"}
          </p>
          <p>
            <span>Language:</span> {repo.language || "No language specified"}
          </p>
          <p>
            <span>Owner:</span> {repo.owner.login}
          </p>
          <hr />
          <p>
            <span>Forks:</span> {repo.forks_count}
          </p>
          <p>
            <span>Open Issues:</span> {repo.open_issues_count}
          </p>
          <p>
            <span>Created At:</span>{" "}
            {new Date(repo.created_at).toLocaleDateString()}
          </p>
          <p>
            <span>Last Updated:</span>{" "}
            {new Date(repo.updated_at).toLocaleDateString()}
          </p>
          <hr />
          <p>
            <span>License:</span>{" "}
            {repo.license ? repo.license.name : "This repo has no license"}
          </p>
          <p>
            <span>Defualt Branch:</span> {repo.default_branch}
          </p>
          <p>
            <span>Stars:</span> {repo.stargazers_count}
          </p>
          <hr />
          <p>
            <span>Watchers:</span> {repo.subscribers_count}
          </p>
          <p>
            <span>Subscribers:</span> {repo.subscribers_count}
          </p>
        </main>
      </div>
      <button onClick={handleHome} className="home-btn" type="button">
        Home <FontAwesomeIcon icon={faHome} />
      </button>
    </div>
  );
}

export default RepoDetails;