import React from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {postsType} from "../../../redux/state";

type MyPostsType = {
    posts: Array<postsType>
    addPost: () => void
    newPostText: string
    changeNewTextCallback: (newPostMessage: string) => void
}

const MyPosts: React.FC<MyPostsType> = (props) => {

    let postsElement = props.posts.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

    function addSomePost() {
        props.addPost()
    }

    function onPostChange (e:  React.ChangeEvent<HTMLTextAreaElement>) {
        props.changeNewTextCallback(e.currentTarget.value)
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