import React from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {postsType} from "../../../redux/state";
import {stringify} from "querystring";

type MyPostsType = {
    posts: Array<postsType>
    addPost:(postMessage: string) => void
}

const MyPosts: React.FC<MyPostsType> = (props) => {

    let postsElement = props.posts.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)
    let newPostElement = React.createRef<HTMLTextAreaElement>()

    function addSomePost() {
        if (newPostElement.current?.value) {
            props.addPost(newPostElement.current.value)
            newPostElement.current.value=""
        }
    }

    return (
        <div className={s.postsBlock}>
            <h3> My posts</h3>

            <div><textarea ref={newPostElement}> </textarea></div>
            <div>
                <button onClick={addSomePost}>Add post</button>
            </div>
            <div className={s.posts}>
                {postsElement}
                {/*<Post id= {postsData[1].id} message={postsData[1].message} likesCount={postsData[1].likesCount}/>*/}
                {/*<Post id= {postsData[2].id} message={postsData[2].message} likesCount={postsData[2].likesCount}/>*/}
                {/*    <Post id= {postsData[3].id} message={postsData[3].message} likesCount={postsData[3].likesCount}/>*/}


            </div>
        </div>
    )
}

export default MyPosts;