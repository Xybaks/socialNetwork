import React from 'react';
import userIcon from "../../asseds/images/userIcon.png"
import s from "./Users.module.css"
import {UserType} from "../../redux/usersReducer";
import {NavLink} from "react-router-dom";
import axios from "axios";

type UsersPropsType = {
    users: Array<UserType>
    pageSizes: number
    currentPage: number
    totalUsersCount: number
    toggleFollow: (usersId: number, userFollowed: boolean) => void
    setUsers: (users: Array<UserType>) => void
    onPageClick: (page: number) => void
}

let Users: React.FC<UsersPropsType> = (props) => {
    let PagesCount = Math.ceil(props.totalUsersCount / props.pageSizes)
    let pages: Array<number> = []
    for (let i = 1; i <= PagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                {pages.map(page => {
                    return <span key={page}
                                 className={page === props.currentPage ? s.active : ""}
                                 onClick={() => props.onPageClick(page)}>{page}</span>
                })
                }
            </div>
            {
                props.users.map(user => <div key={user.id}>
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
                               onClick={()=>
                                   axios.delete(`https://social-network.samuraijs.com/api/1.0//follow/${user.id}`,
                                        {
                                            withCredentials: true,
                                        headers:{
                                                "API-KEY": "82f4b5ca-f1e3-4d75-b4a1-7334dd345bb3"}
                                        })
                                       .then(response => {
                                               if (response.data.resultCode == 0)
                                                   props.toggleFollow(user.id, false)
                                           }
                                       )}
                           >Unfollow </button>
                           : <button onClick={()=>
                               axios.post(`https://social-network.samuraijs.com/api/1.0//follow/${user.id}`,
                                   {}, {
                                   withCredentials: true,
                                       headers:{
                                           "API-KEY": "82f4b5ca-f1e3-4d75-b4a1-7334dd345bb3"}})
                                   .then(response => {
                                           if (response.data.resultCode == 0)
                                               props.toggleFollow(user.id, true)
                                       }
                                   )}>Follow</button>}
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
        </div>
    )
}


export default Users
