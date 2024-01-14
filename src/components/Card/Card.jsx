import style from './Card.module.css';
import { NavLink } from 'react-router-dom';
import { closeCard } from "../../redux/actions";
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const Card = ({ name, image, types, id }) => {
  const [cardClose, setCardClose] = useState();
  const dispatch = useDispatch();

  const deleteCard = () => {
    const pokemonDelete = id;
    setCardClose(pokemonDelete);
    dispatch(closeCard(pokemonDelete));
  };
  
  return (
    <div className={`${style.container} ${style.sparkle}`}>
      <img className={style.image} src={image} alt="image" />
      <div className={`${style['sparkle::additional-star']} ${style.star1}`} />
      <div className={`${style['sparkle::additional-star']} ${style.star2}`} />
      <div className={`${style['sparkle::additional-star']} ${style.star3}`} />
      <div className={`${style['sparkle::additional-star']} ${style.star4}`} />
      <button className={style.buttonClose} onClick={deleteCard}>
        <span className={style.closeIcon}>x</span>
      </button>
      <NavLink to = {`/detail/${id}`}>
        <h3>{name}</h3>
      </NavLink>
      <div className={style.typesContainer}>
        {types.map((type, index) => (
          <h3 key={index} className={style.type}>{type}</h3>
        ))}
      </div>
    </div>
  );
};

export default Card;