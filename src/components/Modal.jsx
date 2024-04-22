import { useState } from "react";

function Modal({ isOpen, onSubmit, onClose }) {
  const [repoName, setRepoName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(repoName);
    setRepoName(""); // Clear the input field after submission
  };

  return (
    isOpen && (
      <div className="modal-container">
        <div className="modal-content">
            <h2>Create new repository</h2>
          <form onSubmit={handleSubmit}>
            <div className="repo-item">
              <label htmlFor="repoName">Repository name</label>
              <input
                type="text"
                id="repoName"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
              />
            </div>
            <div className="repo-item">
              <label htmlFor="description">
                Description<span>(optional)</span>
              </label>
              <input type="text" id="description" name="description" />
            </div>
            <div className="btn-container">
              <button type="submit">Create repository</button>
              <button type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default Modal;
