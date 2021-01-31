import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

// ProfileInfo - компонент отрисовки сведений профиля
// MyPostsContainer  - компонент-контейнер отрисовки  сообщений  на стене в профиле


const Profile = () => {

    return (<div>
        <ProfileInfo/>
        <MyPostsContainer/>
    </div>)
}

export default Profile;