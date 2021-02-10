import React from 'react';
import {UserType} from "../../redux/store";
import axios from 'axios';
import userIcon from "../../asseds/images/userIcon.png"
import s from "./Users.module.css"

type UsersPropsType = {
    users: Array<UserType>
    toggleFollow: (usersId: number) => void
    setUsers: (users: Array<UserType>) => void
}

//В целях обучения работе с классовыми компонентами создам классовый компонент Users

class Users extends React.Component<UsersPropsType, {}> {
    componentDidMount(){
        if (this.props.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response =>
                this.props.setUsers(response.data.items)
            )
        }

    }

    render() {
        return (
            <div>
                {
                    this.props.users.map(user => <div key={user.id}>
               <span>
              <div>
                <img className={s.icon} src={user.photos.small !== null ? user.photos.small : userIcon}/>
              </div>
                   <div>
                      <button
                          onClick={() => this.props.toggleFollow(user.id)}>{user.followed ? "Unfollow" : "Follow"}</button>
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
}

// функциональный комопнент Users
// const Users: React.FC<UsersPropsType> = (props) => {
//     const getUsers = () => {
//         if (props.users.length === 0) {
//             axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response =>
//                 props.setUsers(response.data.items)
//             )
//         }
//     }
//     return <div>
//         <button onClick={getUsers}> get users</button>
//         {
//             props.users.map(user => <div key={user.id}>
//                <span>
//               <div>
//                 <img className={s.icon} src={user.photos.small !== null ? user.photos.small : userIcon}/>
//               </div>
//                    <div>
//                        <button
//                            onClick={() => props.toggleFollow(user.id)}>{user.followed ? "Unfollow" : "Follow"}</button>
//                    </div>
//             </span>
//                 <span>
//             <span>
//            <div>{user.name}</div>
//             <div>{user.status}</div>
//             </span>
//             <span>
//            <div>{"user.location.country"}</div>
//                 <div>{"user.location.city"}</div>
//             </span>
//                     </span>
//             </div>)
//         }
//     </div>
// }

export default Users
