import React from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {PostsType} from "../../../redux/store";

type MyPostsType = {
    posts: Array<PostsType>
    newPostText: string
    updateNewPostText: (newText: string) => void
    addPost:(newPostText: string) => void

}


const MyPosts: React.FC<MyPostsType> = (props) => {
debugger
    let postsElement = props.posts.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

//добавление поста
    function onAddPost() {
        props.addPost(props.newPostText)
    }

// колбэк набранного текста в новом посте
    function onPostChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        let newText: string = e.currentTarget.value
        props.updateNewPostText(newText)
    }


    return (
        <div className={s.postsBlock}>
            <h3> My posts</h3>
            <div><textarea
                onChange={onPostChange}
                value={props.newPostText}
            /></div>
            <div>
                <button onClick={onAddPost}>Add post</button>
            </div>
            <div className={s.posts}>
                {postsElement}


            </div>
        </div>
    )
}

export default MyPosts