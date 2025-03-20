import { useState } from "react";
import fetchPokemon from "../fetchFunctions/fetchPokemon";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [pokemonName, setPokemonName] = useState("");
  let navigate = useNavigate();

  async function getPokemon(pokemonName) {
    const pokemon = await fetchPokemon(pokemonName.toLowerCase());

    navigate(`/details/${pokemon.name}`);
  }

  return (
    <div className="search-bar flex flex-col justify-center items-center mb-6 text-white bg-neutral-700 p-1.5 w-1/3 h-auto mt-20 mx-auto rounded-lg">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          getPokemon(pokemonName);
        }}
      >
        <div className="grid grid-cols-1 gap-2 my-5">
          <input
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="pokemonName"
            type="pokemonName"
            placeholder="Enter a pokemon name"
            onChange={(e) => {
              setPokemonName(e.target.value);
            }}
          ></input>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
