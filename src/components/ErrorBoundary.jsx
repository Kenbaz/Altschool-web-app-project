import { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation, faHome } from "@fortawesome/free-solid-svg-icons";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>
            <FontAwesomeIcon className="icon" icon={faExclamation} />
            Something went wrong.
          </h2>
          <button onClick={() => window.location.reload()}>refresh page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
