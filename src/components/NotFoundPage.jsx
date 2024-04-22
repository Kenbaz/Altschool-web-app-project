import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function PageNotFound() {

    return (
      <div className="error-page">
        <Helmet title="404 error page" />
        <header></header>
        <div className="not-found-container">
          <div className="fontawesome-icon">
            <FontAwesomeIcon icon={faCircleExclamation} />
          </div>
          <div className="error-list">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looing for does not exist</p>
          </div>
        </div>
        <Link to={"/"}>
          <button type="button">
            Home <FontAwesomeIcon icon={faHome} />
          </button>
        </Link>
      </div>
    );
}

export default PageNotFound;