import React from 'react';

import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionTypes, ProfilePageType} from "../../redux/store";

// ProfileInfo - компонент отрисовки сведений профиля

// MyPosts - компонент отрисовки  сообщений  на стене в профиле

type ProfileProps = {
    profilePage: ProfilePageType //    передача постов
    dispatch:(action:ActionTypes) => void
}
const Profile: React.FC<ProfileProps> = (props) => {

    return (<div>
        <ProfileInfo/>
        <MyPosts posts={props.profilePage.posts}
                 newPostText = {props.profilePage.newPostText}
                 dispatch ={props.dispatch}/>
    </div>)
}

export default Profile;