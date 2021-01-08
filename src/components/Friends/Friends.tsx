import s from "./Friends.module.css";
import Friend from "./Friend/Friend";
import {SideBarType} from "../../redux/state";
import React from "react";


const Friends: React.FC<SideBarType>=(props) =>{

    let friendsNew = props.friends.map(f => <Friend name={f.name}
                                                           id={f.id}
                                                           avatarWay={f.avatarWay}/>)

    return (
        <div className={s.friends}>
            <span className={s.friendsText}>Friends</span>
            <div className={s.allFriends}>
                <div className={s.someFriend}>
                   {friendsNew}
                </div>
            </div>
        </div>
    )
}

export default Friends