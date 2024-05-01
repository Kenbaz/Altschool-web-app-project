import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function PageNotFound() {
  return (
    <div className="error-page">
      <Helmet title="404 error page" />
      <div className="not-found-container mb-10 mt-44 relative">
        <div className="fontawesome-icon absolute left-3 top-7 md:text-3xl md:top-20 md:left-60 lg:left-1/3 ">
          <FontAwesomeIcon icon={faCircleExclamation} />
        </div>
        <div className="error-list grid place-items-center">
          <h1 className="text-xl font-medium md:text-6xl md:mb-6">
            404 - Page Not Found
          </h1>
          <p className="md:text-2xl">
            The page you are looking for does not exist
          </p>
          <Link to={"/"}>
            <button
              className="mt-10 bg-tinWhite text-gray-800 md:w-44 md:h-16 md:text-3xl md:p-1 "
              type="button"
            >
              Home <FontAwesomeIcon icon={faHome} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
