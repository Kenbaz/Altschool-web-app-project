import useFetch from "./UseFetch";
import Avatar from "./Avatar";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";

function Readme() {
  const { data, error } = useFetch(
    "https://api.github.com/repos/Kenbaz/Kenbaz/readme"
  );
  if (error) {
    return (
      <div>
        There was an error while fetching this data,{" "}
        <Link to={"/"}>please refresh page</Link>
      </div>
    );
  }

  if (!data) {
    return (
        <div className="loading-readme">
          <LoadingSpinner />
        </div>
    );
  }
  
    const readmeContent = atob(data.content).slice(1, 393)
    const newReadmeContent = readmeContent.replace(/\./g, ".\n")

    return (
      <div className="readme-container">
        <div className="readme-content-container">
          <p>
            Kenbaz <span>/ </span>README<span>.md</span>
          </p>
          <Avatar/>
          <div className="readme-content">{newReadmeContent}</div>
        </div>
        <hr className="line"/>
      </div>
    );
}

export default Readme