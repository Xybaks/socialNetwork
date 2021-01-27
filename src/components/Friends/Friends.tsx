import s from "./Friends.module.css";
import Friend from "./Friend/Friend";
import {SidebarType} from "../../redux/store";
import React from "react";


const Friends: React.FC<SidebarType>=(props) =>{
// короче, закомменировал всё,чтобы не ругался на типизацию. потом восстановю. Связано с редакс-сторе
    // let friendsNew = props.friends.map(f => <Friend name={f.name}
    //                                                        id={f.id}
    //                                                        avatarWay={f.avatarWay}/>)
    //
    // return (
    //     <div className={s.friends}>
    //         <span className={s.friendsText}>Friends</span>
    //         <div className={s.allFriends}>
    //             <div className={s.someFriend}>
    //                {friendsNew}
    //             </div>
    //         </div>
    //     </div>
    // )

    return <div></div>
}

export default Friends