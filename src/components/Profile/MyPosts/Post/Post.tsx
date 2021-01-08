import React from 'react';
import s from "./Post.module.css";
import pic from "../../../pictures/avatar.jpg";
import {postsType} from "../../../../redux/state";



const Post: React.FC<postsType> = (props) =>
{
    let like: string;
    if (props.likesCount === 1) like = "like"
    else like = "likes"
    return (
        <div className={`${s.item} ${s.active}`}>
            <img src={pic}/>
            {props.message}
            <div className={s.item}> {props.likesCount} {like} {

            }</div>
        </div>

    )
}

export default Post;