import useFetch from "./UseFetch";
import Avatar from "./Avatar";
import LoadingSpinner from "./LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function Info() {
  const { data, error } = useFetch("https://api.github.com/users/Kenbaz");

  if (error) {
    return (
      <div>
        There was an error while fetching this data, please refresh page
      </div>
    );
  }

  if (!data) {
    return (
      <div className="loading-readme ms-44 mt-20 md:ms-96 lg:relative lg:left-48">
        <LoadingSpinner />
      </div>
    );
  }

  const repoCount = data.public_repos;

  return (
    <div className=" grid place-items-center border-secondary border-b md:mb-5  lg:w-11/12 lg:m-auto lg:mb-8">
      <div className="md:grid md:place-items-center lg:mt-5">
        <div className="flex justify-center items-center gap-3 font-medium text-lg mb-2 md:text-3xl lg:text-2xl">
          <Avatar />
          <p>Kenneth Bassey</p>
        </div>
        <div className="text-sm mb-2 md:text-2xl lg:text-base">
          Web Developer <span className="text-secondary">|</span> HTML{" "}
          <span className="text-secondary">|</span> CSS{" "}
          <span className="text-secondary">|</span> JavaScript{" "}
          <span className="text-secondary">|</span> React <br />{" "}
          <span className="text-secondary">|</span> Python{" "}
          <span className="text-secondary">|</span> Django{" "}
          <span className="text-secondary">|</span> Tailwindcss
        </div>
        <div className="ms-20 mb-2 md:text-2xl md:mt-2 md:mb-3 lg:text-xl">
          Public Repository: {repoCount}
        </div>
        <div className="flex gap-4 justify-center items-center mb-1 md:mb-3 md:gap-8">
          <a href="mailto:kbassey016@gmail.com" target="_blank">
            <FontAwesomeIcon
              className="w-6 h-6 md:w-10 md:h-10 lg:w-8 lg:h-8"
              icon={faEnvelope}
            />
          </a>
          <a href="https://github.com/Kenbaz" target="_blank">
            <FontAwesomeIcon
              className="w-6 h-6 md:w-10 md:h-10 lg:w-8 lg:h-8"
              icon={faGithub}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/kenneth-bassey-593150251"
            target="_blank"
          >
            <FontAwesomeIcon
              className="w-6 h-6 md:w-10 md:h-10 lg:w-8 lg:h-8"
              icon={faLinkedin}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Info;
