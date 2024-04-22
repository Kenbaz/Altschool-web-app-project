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
          <h2><FontAwesomeIcon className="icon" icon={faExclamation}/>Something went wrong.</h2>
          <p>
            Please go back to the <Link to="/">home page <FontAwesomeIcon icon={faHome}/></Link>.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
