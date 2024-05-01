import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function LoadingSpinner() {
  return <FontAwesomeIcon className="w-6 h-6" icon={faSpinner} spin />;
}

export default LoadingSpinner;
