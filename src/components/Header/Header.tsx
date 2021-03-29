import React from 'react';
import {NavLink} from 'react-router-dom';
import emblem from "../pictures/ufoEmblem256x256.png";
import s from "./Header.module.css";

type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    logout:()=>void
}
const Header = (props: HeaderPropsType) => {
    return <header className={s.header}>
        <img src={emblem}/>
        <div className={s.loginBlock}>
            {props.isAuth
                ? <div>{props.login}-<button onClick={props.logout}>Log out</button></div>
                : <NavLink to={'/login'}> Login</NavLink>
            }

        </div>
    </header>
}
export default Header;