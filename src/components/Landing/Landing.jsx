import style from './Landing.module.css';
import { Link } from 'react-router-dom';
import logo from '../../img_pokemon/logo.png'
// import { useEffect} from 'react';
// import audioPoke from '../../assets/audio_pokemon.mpeg';

const Landing = () => {
//   useEffect(() => {
//     const audio = new Audio(audioPoke);
//     audio.play();

//     return () => {
//         audio.pause();
//     };
// }, []);
    return (
            <div className={style.meContainer}>
                <img src = {logo} alt="logo" className = {style.logo}/>
                <Link to = "/home">
                <button className = {style.button}>START</button>
                </Link>
            </div>
    );
}

export default Landing;