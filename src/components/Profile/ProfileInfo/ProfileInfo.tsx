import React from 'react';
import skyline from "../../pictures/ufo-banner2.gif";
import s from "./ProfileInfo.module.css";
import {ProfileType} from "../../../redux/profileReducer";
import PreLoader from "../../common/PreLoader/PreLoader";

// skyline объект импорта  картинки профиля
type ProfileInfoType = {
    profile: ProfileType | null
}


const ProfileInfo = (props: ProfileInfoType) => {
    if (!props.profile) {
        return <PreLoader/>
    }
    return (<div>
        <img src={skyline}/>
        <div> {props.profile.fullName}</div>
        <div>
            <img src={props.profile?.photos.large}/>
        </div>
        <div className={s.descriptionBlock}>
            <div>aboutMe: {props.profile.aboutMe}</div>
            <div> Contacts</div>
            <div> facebook: {props.profile.contacts.facebook}</div>
            <div>github: {props.profile.contacts.github}</div>
            <div>instagram: {props.profile.contacts.instagram}</div>
            <div>mainLink: {props.profile.contacts.mainLink}</div>
            <div>twitter: {props.profile.contacts.twitter}</div>
            <div> vk: {props.profile.contacts.vk}</div>
            <div>website: {props.profile.contacts.website}</div>
            <div>youtube: {props.profile.contacts.youtube}</div>
            <div>lookingForAJob: {props.profile.lookingForAJob}</div>
            <div>lookingForAJobDescription: {props.profile.lookingForAJobDescription}
            </div>
        </div>
    </div>)
}

export default ProfileInfo;