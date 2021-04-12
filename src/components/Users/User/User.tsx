import React from 'react';
import userIcon from "../../../asseds/images/userIcon.png"
import s from "./User.module.css"
import {UserType} from "../../../redux/usersReducer";
import {NavLink} from "react-router-dom";


type UserPropsType = {
    user: UserType
    unFollow: (userId: number) => void
    follow: (userId: number) => void
    followingProgress: Array<number>
}

const User: React.FC<UserPropsType> = ({user,followingProgress, unFollow,follow}) => {
    return (
        <div>
               <span>
              <div>
                 <NavLink to={"/profile/" + user.id}>
                <img alt="user-photos-small" className={s.icon}
                     src={user.photos.small !== null ? user.photos.small : userIcon}/>
                </NavLink>
              </div>
                   <div>
                       {user.followed ?
                           <button
                               disabled={followingProgress.some(id => id === user.id)}
                               onClick={() => {
                                  unFollow(user.id)
                               }}
                           >Unfollow</button>
                           : <button
                               disabled={followingProgress.some(id => id === user.id)}
                               onClick={() => {
                                   follow(user.id)
                               }}
                           >Follow</button>}
                               </div>
                               </span>
                    <span>
                               <span>
                               <div>{user.name}</div><div>{user.status}</div>
                               </span>
                               <span>
                               <div>{"user.location.country"}</div>
                               <div>{"user.location.city"}</div>
                               </span>
                               </span>
                </div>)
}


export default User
