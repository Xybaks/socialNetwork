import React, {ReactNode} from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profileReducer";


// ProfileInfo - компонент отрисовки сведений профиля
// MyPostsContainer  - компонент-контейнер отрисовки  сообщений  на стене в профиле

type ProfilePropsType = {
    children?: ReactNode
    profile: ProfileType | null
    updateStatus: (status: string) => void
    status: string
}

const Profile = (props: ProfilePropsType) => {
    return (<div>
        <ProfileInfo
            profile={props.profile}
            updateStatus={props.updateStatus}
            status={props.status}

        />
        <MyPostsContainer/>
    </div>)
}


export default Profile;