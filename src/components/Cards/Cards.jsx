import React from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { useState } from "react";
import style from "./Cards.module.css";

const Cards = () => {
  let pokemons = useSelector((state) => state.pokemons);
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(pokemons.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className={style.cardsContainer}>
        {currentPokemons.map((pokemon) => (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            image={pokemon.image}
            name={pokemon.name}
            types={pokemon.types}
          />
        ))}
      </div>

      <div className={style.pagination}>
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? style.activePage : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Cards;