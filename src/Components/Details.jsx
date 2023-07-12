import React from "react";
import "./Details.css";
import BarChart from "./BarChart";

function Details({ result }) {
  const statData = {
    labels: result.stats.map((stat) => stat.stat.name),
    datasets: [
      {
        label: "Stats",
        data: result.stats.map((stat) => stat.base_stat),
      },
    ],
  };

  const options = {
    scales: {
      y: {
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };
  const imgURL = result.sprites.other.dream_world.front_default
    ? result.sprites.other.dream_world.front_default
    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
      result.id +
      ".png";
  return (
    <div className="detailsContainer">
      <div className="combine">
        <div className="image">{result && <img src={imgURL} alt="" />}</div>
        <div className="detail">
          <p>
            <span className="keyText">Type: </span>
            {result.types[0].type.name}
          </p>
          <p>
            <span className="keyText">Weight: </span>
            {result.weight}
          </p>
          <p>
            <span className="keyText">Height: </span>
            {result.height}
          </p>
          <p>
            <span className="keyText">Abilities:</span>
            {result.abilities.map((ability, index) => {
              return " " + ability.ability.name;
            })}
          </p>
          <BarChart chartData={statData} options={options} />
        </div>
      </div>
    </div>
  );
}

export default Details;
