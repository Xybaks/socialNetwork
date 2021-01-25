import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {StoreType} from "../../redux/redux-store";

// ProfileInfo - компонент отрисовки сведений профиля
// MyPostsContainer  - компонент-контейнер отрисовки  сообщений  на стене в профиле

type ProfileProps = {
    store:StoreType
}
const Profile: React.FC<ProfileProps> = (props) => {

    return (<div>
        <ProfileInfo/>
        <MyPostsContainer store={props.store}/>
    </div>)
}

export default Profile;