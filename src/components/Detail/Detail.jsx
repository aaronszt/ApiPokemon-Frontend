import { getDetails } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './Detail.module.css';

const Detail = () => {
    const {name, types, attack, defense, hp, speed, height, weight, image} = useSelector((state) => state.pokemonDetail)
    console.log(useSelector((state) => state.pokemonDetail))
    const { id } = useParams()

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDetails(id))
    },[dispatch])
    
    return (
        <div className={style.background}>
            <div className={style.container}>
                <div className={style.card}>
                    <img src={image} alt="imgagePoke"/>
                    <h4>NAME: {name}</h4>
                    <h4>HP: {hp}</h4>
                    <h4>ATTACK: {attack}</h4>
                    <h4>DEFENSE: {defense}</h4>
                    <h4>SPEED: {speed}</h4>
                    <h4>TYPES: 
                    {
                    types?.map(type =>{
                            return(
                                type!== null?
                            <span>{` ${type} `}</span>
                            : ""
                         )
                        })
                    }
                    </h4>
                    <h4>HEIGHT: {height}</h4>
                    <h4>WEIGHT: {weight}</h4>
                </div>
            </div>
        </div>
    )
}

export default Detail;