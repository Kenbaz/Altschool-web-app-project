import useFetch from "./UseFetch";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useState } from "react";
import SidebarSearchBar from "./SidebarSearch";

function SidebarRepoList() {
  const [sidebarSearchQuery, setSidebarSearchQuery] = useState("");

  const { data, error } = useFetch("https://api.github.com/users/Kenbaz/repos");

  if (error) {
    return <div>Error: {error} </div>;
  }

  if (!data) {
    return (
      <div className="loading relative top-52 left-40">
        <LoadingSpinner />
      </div>
    );
  }

  const filteredData = sidebarSearchQuery
    ? data.filter((repo) =>
        repo.full_name.toLowerCase().includes(sidebarSearchQuery.toLowerCase())
      )
    : data;

  return (
    <>
      <div className="sidebar-container lg:mt-10">
        <h3 className="ms-4 mb-3 font-medium">Top Repositories</h3>

        <div className="lg:border lg:w-11/12 lg:m-auto lg:h-10 lg:rounded-md border-secondary hover:border-cyan-600">
          <SidebarSearchBar onSearch={setSidebarSearchQuery} />
        </div>
        <div className="sidebar-repo-wrapper ms-4 mt-2">
          {filteredData.map((repo) => (
            <div className="sidebar-repo-container mb-2" key={repo.id}>
              <Link to={`/RepoDetails/${repo.id}`}>
                <p className="data">{repo.full_name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SidebarRepoList;
