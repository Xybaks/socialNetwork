import React from 'react';
import {NavLink} from 'react-router-dom';
import emblem from "../pictures/ufoEmblem256x256.png";
import s from "./Header.module.css";

type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    getAuthUserData:() => void
}
const Header = (props: HeaderPropsType) => {
    return <header className={s.header}>
        <img src={emblem}/>
        <div className={s.loginBlock}>
            {props.isAuth
                ? props.login
                : <NavLink to={'/login'}> Login</NavLink>
            }

        </div>
    </header>
}
export default Header;