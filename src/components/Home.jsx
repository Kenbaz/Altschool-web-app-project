import useFetch from "./UseFetch";
import SidebarRepoList from "./SidebarRepo";
import Repos from "./RepoHome";
import Readme from "./Readme";
import SearchBar from "./Search";

function Home() {
    return (
      <div className="home">
        <header className="header2"></header>
        <aside className="sidebar">
          <SidebarRepoList />
        </aside>
        <main className="main">
          <Readme />
          <Repos />
        </main>
      </div>
    );
}

export default Home;