import { useParams } from "react-router-dom";
import NavBar from "./Components/NavBar";
import fetchPokemon from "./fetchFunctions/fetchPokemon";
import { useEffect, useState } from "react";
import React from "react";

const Details = () => {
  const [pokemonData, setPokemonData] = useState({});
  const { pokemon } = useParams();

  async function getPokemonData() {
    const results = await fetchPokemon(pokemon);
    setPokemonData(results);
    console.log(results);
  }

  useEffect(() => {
    getPokemonData();
  }, []);
  return (
    <div>
      <NavBar />
      <div className="flex h-auto w-auto">
        <div className="description-container flex flex-col justify-center items-center text-white bg-neutral-700 p-1.5 w-4/5 h-auto my-20 mx-auto rounded-lg">
          <div className="name-container flex justify-center items-center bg-gray-600 rounded-md">
            <h1 className="text-2xl font-bold text-transform: capitalize mx-2 my-2">
              {pokemonData.name}
            </h1>
          </div>

          <div className="pokedex-data-container flex">
            <div className="image-container flex justify-center items-center">
              <img
                src={
                  pokemonData.sprites?.other["official-artwork"].front_default
                }
                alt={pokemonData.name}
                className=" h-auto"
              />
            </div>
            <table className="basic-data table-auto w-2/3 border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-center" colSpan="2">
                    Pokedex Data
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="h-5 row">
                  <th className="px-4 py-2 border-t">Type</th>
                  <td className="border-t">
                    {pokemonData.types?.map((type) => {
                      return (
                        <span
                          className="text-transform: capitalize"
                          key={type.type.name}
                        >
                          {type.type.name}{" "}
                        </span>
                      );
                    })}
                  </td>
                </tr>
                <tr className="h-5 row">
                  <th className="px-4 py-2 border-t">Weight</th>
                  <td className="border-t">{pokemonData.weight / 10}kg</td>
                </tr>
                <tr className="h-5 row">
                  <th className="px-4 py-2 border-t">Height</th>
                  <td className="border-t">{pokemonData.height / 10}m</td>
                </tr>
                <tr className="h-5 row">
                  <th className="px-4 py-2 border-t">Abilities</th>
                  <td className="border-t">
                    <ul>
                      {pokemonData.abilities?.map((ability) => {
                        if (ability.is_hidden) {
                          return (
                            <li key={ability.ability.name}>
                              <span className="text-transform: capitalize">
                                {ability.ability.name} (Hidden ability)
                              </span>
                            </li>
                          );
                        } else {
                          return (
                            <li key={ability.ability.name}>
                              <span className="text-transform: capitalize">
                                {ability.ability.name}
                              </span>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="training-data table-auto w-2/3 border-collapse border-gray-300 my-4">
              <thead>
                <tr>
                  <th className="px-4 py-1 text-center" colSpan={2}>
                    Training
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="h-5 row">
                  <th className="px-4 py-1 border-t">Base Happiness</th>
                  <td className="border-t">{pokemonData.base_happiness}</td>
                </tr>
                <tr className="h-5 row">
                  <th className="px-4 py-1 border-t">Capture Rate</th>
                  <td className="border-t">{pokemonData.capture_rate}</td>
                </tr>
                <tr className="h-5 row">
                  <th className="px-4 py-1 border-t">Base Experience</th>
                  <td className="border-t">{pokemonData.base_experience}</td>
                </tr>

                <tr className="h-5 row">
                  <th className="ev-yield border-t">EV Yield</th>
                  <td className="border-t">
                    <ul>
                      {pokemonData.stats?.map((stat) => {
                        if (stat.effort === 0) {
                          return null;
                        } else {
                          return (
                            <li key={stat.stat.name}>
                              <span className="font-bold">
                                {stat.stat.name}
                              </span>
                              : {stat.effort}
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="stats-container flex flex-col justify-start items-center">
            <h2 className="text-xl font-bold">Stats</h2>
            <ul>
              {pokemonData.stats?.map((stat) => {
                return (
                  <li key={stat.stat.name}>
                    <span className="font-bold">{stat.stat.name}</span>:{" "}
                    {stat.base_stat}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="moves-container flex flex-col justify-center items-center">
            <h2 className="text-xl font-bold">Moves</h2>
            <table className="moves-table table-auto w-2/3 border-collapse border-gray-300 my-4">
              <thead>
                <tr>
                  <th className="px-4 py-1 text-center">Level</th>
                  <th className="px-4 py-1 text-center">Move</th>
                </tr>
              </thead>
              <tbody>
                {pokemonData.moves
                  ?.filter(
                    (move) =>
                      move.version_group_details[0].move_learn_method.name ===
                      "level-up"
                  )
                  .sort(
                    (move1, move2) =>
                      move1.version_group_details[0].level_learned_at -
                      move2.version_group_details[0].level_learned_at
                  )
                  .map((move) => (
                    <tr key={move.move.name}>
                      <td className="px-4 py-1 text-center">
                        {move.version_group_details[0].level_learned_at}
                      </td>
                      <td className="px-4 py-1 text-center">
                        {move.move.name}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <h2 className="text-xl font-bold">Machine Moves</h2>
            <table className="machine-moves-table table-auto w-2/3 border-collapse border-gray-300 my-4">
              <thead>
                <tr>
                  <th className="px-4 py-1 text-center">Move</th>
                </tr>
              </thead>
              <tbody>
                {pokemonData.moves
                  ?.filter(
                    (move) =>
                      move.version_group_details[0].move_learn_method.name ===
                      "machine"
                  )
                  .map((move) => (
                    <tr key={move.move.name}>
                      <td className="px-4 py-1 text-center">
                        {move.move.name}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <h2 className="text-xl font-bold">Egg Moves</h2>
            <table className="egg-moves-table table-auto w-2/3 border-collapse border-gray-300 my-4">
              <thead>
                <tr>
                  <th className="px-4 py-1 text-center">Move</th>
                </tr>
              </thead>
              <tbody>
                {pokemonData.moves
                  ?.filter(
                    (move) =>
                      move.version_group_details[0].move_learn_method.name ===
                      "egg"
                  )
                  .map((move) => (
                    <tr key={move.move.name}>
                      <td className="px-4 py-1 text-center">
                        {move.move.name}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <h2 className="text-xl font-bold">Tutor Moves</h2>
            <table className="tutor-moves-table table-auto w-2/3 border-collapse border-gray-300 my-4">
              <thead>
                <tr>
                  <th className="px-4 py-1 text-center">Moves</th>
                </tr>
              </thead>
              <tbody>
                {pokemonData.moves
                  ?.filter(
                    (move) =>
                      move.version_group_details[0].move_learn_method.name ===
                      "tutor"
                  )
                  .map((move) => (
                    <tr key={move.move.name}>
                      <td className="px-4 py-1 text-center">
                        {move.move.name}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
