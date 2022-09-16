import PokemonCard from "./components/Card/PokemonCard";
import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  // const [searching, setsearching] = useState(true);
  // const [allPokemonData, setAllPokemonData] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState([]);
  const [prevURL, setPrevURL] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      // Get all Data of Pokemon
      let res = await getAllPokemon(initialURL);
      // Get detailed data of each Pokémon
      loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        // console.log(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  // const searchPokemon = async () => {
  //   if (document.getElementById("search").value) {
  //     let keyword = document.getElementById("search").value;
  //     console.log(keyword);
  //     let _pokemonData = getPokemon(initialURL + "/" + keyword + "/");
  //     console.log(initialURL + "/" + keyword + "/");
  //     setPokemonData(_pokemonData);
  //   } else {
  //     return true;
  //   }
  // };

  const handlePrevPage = async () => {
    if (!prevURL) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handleNextPage = async () => {
    if (!nextURL) return;
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setPrevURL(data.previous);
    setNextURL(data.next);
    setLoading(false);
  };

  const changeButtonColor = () => {
    if (!prevURL) {
      let prevButton = document.getElementById("backButton");
      prevButton.style.backgroundColor = "#ffffff";
    }
  };
  window.onload = changeButtonColor;

  return (
    <>
      <Navbar />
      {/* <input type="search" id="search" />
      <input type="submit" value="Button" onClick={searchPokemon} /> */}
      <div className="App">
        {loading ? (
          <h1>Loading now...</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <PokemonCard key={i} pokemon={pokemon}></PokemonCard>;
              })}
            </div>
            <div className="btn">
              <button id="backButton" onClick={handlePrevPage}>
                Back
              </button>
              <button id="nextButton" onClick={handleNextPage}>
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
