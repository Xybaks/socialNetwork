import React from 'react';
import skyline from "../../pictures/ufo-banner2.gif";
import s from "./ProfileInfo.module.css";

// skyline объект импорта  картинки профиля



  function ProfileInfo() {
    return (<div >
        <div>
            <img src={skyline}/>
        </div>
        <div className={s.descriptionBlock}>
            ava + description
        </div>
    </div>)
}

export default ProfileInfo;