import React from 'react';

import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {profilePageType} from "../../redux/state";

// ProfileInfo - компонент отрисовки сведений профиля

// MyPosts - компонент отрисовки  сообщений  на стене в профиле

type ProfileProps = {
    profilePage: profilePageType //    передача постов
    addPost:() => void  // добавление нового поста
    updateNewPostText:(newText: string) => void // слежение за вводом текста и передача в state
}
const Profile: React.FC<ProfileProps> = (props) => {

    return (<div>
        <ProfileInfo/>
        <MyPosts posts={props.profilePage.posts}
                 newPostText = {props.profilePage.newPostText}
                 changeNewTextCallback = {props.updateNewPostText}
                 addPost={props.addPost}/>
    </div>)
}

export default Profile;