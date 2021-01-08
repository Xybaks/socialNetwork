import React from 'react';
import emblem from "../pictures/ufoEmblem256x256.png";
import st from "./Header.module.css";
function Header () {
    return <header className ={st.header} >
        <img src={emblem} />
    </header>
}
export default Header;