import image from "../../pictures/friend2.jpg"
import s from "./Friend.module.css";
import {FriendType} from "../../../redux/state";
import React from "react";

const Friend: React.FC<FriendType>=(props) =>{

    return (<div className={s.friend}>
            <img src={image}/>
            <div>{props.name} </div>
        </div>
    )
}

export default Friend