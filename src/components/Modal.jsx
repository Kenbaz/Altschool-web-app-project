// Import useState
import { useState } from "react";

function Modal({ isOpen, onSubmit, onClose }) {
  // Define state variables for repo name and description
  const [repoName, setRepoName] = useState("");
  const [repoDescription, setRepoDescription] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(repoName, repoDescription);
    setRepoName(""); // Clear the input field after submission
    setRepoDescription("");
  };

  return (
    isOpen && (
      <div
        className="modal-container border border-secondary bg-transparent backdrop-filter backdrop-blur-md backdrop-opacity-105 absolute top-10 h-72 w-11/12 md:h-96 md:top-16 lg:h-80 lg:-top-48 lg:-left-0"
      >
        <div className="modal-content ms-3 mt-3 grid place-items-center lg:place-items-start lg:ms-5">
          <h2 className="text-lg font-bold md:text-4xl mb-3 lg:text-2xl">
            Create new repository
          </h2>
          <form className="w-11/12" onSubmit={handleSubmit}>
            <div className="repo-item grid mb-2 md:text-3xl lg:text-lg gap-1">
              <label htmlFor="repoName">Repository name</label>
              <input
                className="border rounded-md h-8 w-full pl-2 text-sm font-medium placeholder-slate-200 focus:outline-none md:w-96 md:h-14 md:text-2xl md:w-full lg:text-base lg:h-10 lg:w-full"
                type="text"
                placeholder="Enter name"
                id="repoName"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)} // Add onChange handler
              />
            </div>
            <div className="repo-item grid mb-5 md:mt-5 md:text-3xl lg:text-lg gap-1">
              <label htmlFor="description">
                Description<span>(optional)</span>
              </label>
              <input
                className="border pl-2 rounded-md h-8 text-sm font-medium focus:outline-none md:h-14 md:text-2xl lg:text-base lg:h-10 placeholder:text-slate-200"
                type="text"
                id="description"
                value={repoDescription}
                onChange={(e) => setRepoDescription(e.target.value)} // Add onChange handler
                placeholder="Enter description" // Add placeholder
              />
            </div>
            <div className="btn-container flex gap-2 md:text-2xl lg:text-lg">
              <button className="hover:border-cyan-600" type="submit">
                Create repository
              </button>
              <button
                className="hover:border-cyan-600"
                type="button"
                onClick={onClose}
              >
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
