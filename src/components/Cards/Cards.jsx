import React from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { useState } from "react";
import style from "./Cards.module.css";

const Cards = () => {
  let pokemons = useSelector((state) => state.pokemons);
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const safePokemons = Array.isArray(pokemons) ? pokemons : [];
  const totalPages = Math.ceil(safePokemons.length / itemsPerPage) || 1;

  const validCurrentPage = currentPage > totalPages ? 1 : currentPage;

  const indexOfLastItem = validCurrentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPokemons = safePokemons.slice(indexOfFirstItem, indexOfLastItem);

  const goToNextPage = () => {
    if (validCurrentPage < totalPages) {
      setCurrentPage(validCurrentPage + 1);
    }
  };
  
  const goToPrevPage = () => {
    if (validCurrentPage > 1) {
      setCurrentPage(validCurrentPage - 1);
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