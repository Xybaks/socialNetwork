import React from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {ActionTypes, addPostActionCreator, PostsType, UpdateNewPostActionCreator} from "../../../redux/state";

type MyPostsType = {
    posts: Array<PostsType>
    newPostText: string
    dispatch:(action:ActionTypes) => void
}



const MyPosts: React.FC<MyPostsType> = (props) => {



    let postsElement = props.posts.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)
//добавление поста
    function addSomePost() {
        props.dispatch(addPostActionCreator(props.newPostText))
    }
// колбэк набранного текста в новом посте
    function onPostChange (e:  React.ChangeEvent<HTMLTextAreaElement>) {
        let newText:string=  e.currentTarget.value
        props.dispatch(UpdateNewPostActionCreator(newText))
    }


    return (
        <div className={s.postsBlock}>
            <h3> My posts</h3>
            <div><textarea
                onChange={onPostChange}
                value={props.newPostText}
            /></div>
            <div>
                <button onClick={addSomePost}>Add post</button>
            </div>
            <div className={s.posts}>
                {postsElement}


            </div>
        </div>
    )
}

export default MyPosts