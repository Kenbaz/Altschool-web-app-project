import SidebarRepoList from "./SidebarRepo";
import Repos from "./RepoHome";
import Info from "./Info";

function Home() {
  return (
    <>
      <div className="">
        <header className="w-full h-16 border-b border-solid border-secondary mb-5 md:h-24 lg:h-20"></header>
        <div className="main-wrapper lg:grid-styles lg:margin">
          <aside className="hidden lg:block lg:border lg:border-t-0 lg:border-l-0 lg:border-b-0 lg:border-secondary">
            <SidebarRepoList />
          </aside>
          <main className="main">
            <Info />
            <Repos />
          </main>
        </div>
      </div>
      <footer className="border-secondary border-t mt-16 h-20 text-center p-5 font-light text-sm md:text-2xl lg:text-sm lg:text-start">
        &copy;{` Kenneth Bassey ${new Date().getFullYear()}`}
      </footer>
    </>
  );
}

export default Home;
