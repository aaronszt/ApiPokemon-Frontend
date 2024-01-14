import { NavLink, Link } from 'react-router-dom';
import style from './Nav.module.css';
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { getName } from '../../redux/actions';

const Nav = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const onSearch = () => {
        dispatch(getName(name));
    };

    const handlerName = (event) => {
        setName(event.target.value);
    };

    const enter = (event) => {
        if (event.keyCode === 13) {
            onSearch(name);
        }
    }
    return (
        <div className = {style.mainContainer}>
            <input type="text" onChange={handlerName} value = {name} onKeyDown={enter}/>
            <button onClick={onSearch}>SEARCH</button>
            <Link to='https://www.linkedin.com/in/aaron-sztychmasjter-218307266/'>
                <h2 className={style.containH2}>AARON SZTYCHMASJTER-40B</h2>
            </Link>
            <NavLink className={style.nav} to = '/home'>HOME</NavLink>
            <NavLink className={style.navCreate} to = '/create'>FORM/CREATE</NavLink>
        </div>
    )
}

export default Nav;