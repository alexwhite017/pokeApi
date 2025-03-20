import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <header className="fixed top-0 z-50 hidden w-full bg-neutral-900/50 p-4 backdrop-blur sm:block">
      <nav>
        <ul className="flex justify-center gap-x-8">
          <li>
            <Link
              to="/search"
              className="-m-1.5 p-1.5 rounded-md font-bold first-letter:uppercase hover:transition-colors hover:duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 sm:hover:text-orange-500 text-neutral-100"
            >
              Search
            </Link>
          </li>
          <li>
            <Link
              to="/pokedex"
              className="-m-1.5 p-1.5 rounded-md font-bold first-letter:uppercase hover:transition-colors hover:duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 sm:hover:text-orange-500 text-neutral-100"
            >
              Pokedex
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
