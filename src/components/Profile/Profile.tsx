import React, {ReactNode} from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profileReducer";


// ProfileInfo - компонент отрисовки сведений профиля
// MyPostsContainer  - компонент-контейнер отрисовки  сообщений  на стене в профиле

type ProfilePropsType={
    children?: ReactNode
    profile: ProfileType | null
}

const Profile = (props:ProfilePropsType) => {
    return (<div>
        <ProfileInfo  profile={props.profile}/>
        <MyPostsContainer/>
    </div>)
}

export default Profile;