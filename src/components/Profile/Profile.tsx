import React from 'react';

import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {profilePageType} from "../../redux/state";

// ProfileInfo - компонент отрисовки сведений профиля

// MyPosts - компонент отрисовки  сообщений  на стене в профиле

type ProfileProps = {
    state: profilePageType
    addPost:(postMessage: string) => void
}
const Profile: React.FC<ProfileProps> = (props) => {

    return (<div>
        <ProfileInfo/>
        <MyPosts posts={props.state.posts}
                 addPost={props.addPost}/>
    </div>)
}

export default Profile;