import React from "react";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemonCard">
      <div className="pokemonCardImage">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <h3 className="pokemonCardName">{pokemon.name}</h3>
      <div className="pokemonCardTypes">
        <div>Types</div>
        {pokemon.types.map((type) => {
          return (
            <div key={type.type.name}>
              <span className="typeName">{type.type.name}</span>
            </div>
          );
        })}
      </div>
      <div className="pokemonCardInfo">
        <div className="pokemonCardData">
          <p className="title">Weight: {pokemon.weight}</p>
        </div>
        <div className="pokemonCardData">
          <p className="title">Height: {pokemon.height}</p>
        </div>
        <div className="pokemonCardData">
          <p className="title">Ablities: {pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
