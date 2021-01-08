import React from 'react';
import {NavLink} from 'react-router-dom';
import s from "./Navbar.module.css";
import Friends from "../Friends/Friends";
import {SideBarType} from "../../redux/state";

const Navbar: React.FC<SideBarType>=(props) =>{
    return (<nav className={s.nav}>
        <div className={s.item}>
            <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to="/messages" activeClassName={s.activeLink}>Messages</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to="/news" activeClassName={s.activeLink}>News</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to="/music" activeClassName={s.activeLink}>Music</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to="/settings" activeClassName={s.activeLink}>Settings</NavLink>
        </div>
        <div className={s.friends}>
            <NavLink to="/friends" activeClassName={s.activeLink}><Friends friends = {props.friends}/></NavLink>
        </div>
    </nav>)
}

export default Navbar;