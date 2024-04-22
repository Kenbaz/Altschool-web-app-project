import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function LoadingSpinner() {
    return <FontAwesomeIcon className="spinner" icon={faSpinner} spin />;
}

export default LoadingSpinner;