import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary grid place-items-center mt-40">
          <h2 className="mb-5 text-xl font-medium md:text-5xl">
            Something went wrong <FontAwesomeIcon icon={faExclamation} />
          </h2>
          <button
            className="bg-tinWhite text-gray-800 md:w-44 md:h-16 md:text-2xl md:p-1"
            onClick={() => window.location.reload()}
          >
            Refresh page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
