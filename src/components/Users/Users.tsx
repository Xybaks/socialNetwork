import React from 'react';
import {UserType} from "../../redux/store";


type UsersPropsType = {
    users: Array<UserType>
    toggleFollow: (usersId: number) => void
    setUsers: (users: Array<UserType>) => void
}

function Users(props: UsersPropsType) {
   if (props.users.length===0){
    props.setUsers(
    [{
        id: 1,
        photoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Wikipe-tan_avatar.png",
        followed: false,
        fullName: "Dima K",
        status: "I'm the best",
        location: {city: "Minsk", country: "Belarus"}
    },
        {
            id: 2,
            photoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Wikipe-tan_avatar.png",
            followed: true,
            fullName: "Sasha G",
            status: "I'm the most clever man forever",
            location: {city: "Moscow", country: "Russia"}
        },
        {
            id: 3,
            photoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Wikipe-tan_avatar.png",
            followed: false,
            fullName: "Angrey X",
            status: "I'm coding...",
            location: {city: "Kiev", country: "Ukraine"}
        }
    ]
    )}
    return <div>
        {
            props.users.map(user => <div key={user.id}>
               <span>
              <div>
                <img src={user.photoUrl}/>
              </div>
                   <div>
                       <button onClick={()=>props.toggleFollow(user.id )}>{user.followed? "Unfollow":"Follow"}</button>
                   </div>
            </span>
                <span>
            <span>
           <div>{user.fullName}</div>
            <div>{user.status}</div>
            </span>
            <span>
           <div>{user.location.country}</div>
                <div>{user.location.city}</div>
            </span>
                    </span>
            </div>)
        }
    </div>
}

export default Users
