import useFetch from "./UseFetch";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

function SidebarRepoList() {
    const { data, error } = useFetch(
      "https://api.github.com/users/Kenbaz/repos"
    );

    if (error) {
      return <div>Error: {error} </div>;
    }

    if (!data) {
      return <div className="loading"><LoadingSpinner/></div>;
    }

  return (
    <>
      <div className="sidebar-container">
        <h3>Top Repositories</h3>
        <div className="sidebar-repo-wrapper">
          {data.map((repo) => (
            <div className="sidebar-repo-container" key={repo.id}>
              <Link to={`/RepoDetails/${repo.id}`}>
                <p className="data">
                  {repo.full_name}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SidebarRepoList;