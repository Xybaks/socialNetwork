import React from 'react';

import {UserType} from "../../redux/usersReducer";

import Paginator from "./Paginator";
import User from "./User/User";

type UsersPropsType = {
    users: Array<UserType>
    pageSizes: number
    currentPage: number
    totalUsersCount: number
    unFollow: (userId: number) => void
    follow: (userId: number) => void
    onPageClick: (page: number) => void
    followingProgress: Array<number>
}

const Users: React.FC<UsersPropsType> = (props) => {
    return (
        <div>
            <Paginator
                pageSizes={props.pageSizes}
                currentPage={props.currentPage}
                totalUsersCount={props.totalUsersCount}
                onPageClick={props.onPageClick}
            />
            {
                props.users.map(user =>
                    <User
                        user={user}
                        followingProgress={props.followingProgress}
                        follow={props.follow}
                        unFollow={props.unFollow}
                        key={user.id}/>)
            }
        </div>
    )
}


export default Users
