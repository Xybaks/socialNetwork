import React from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {PostsType} from "../../../redux/store";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type MyPostsType = {
    posts: Array<PostsType>
    addPost: (newPostText: string) => void

}


const MyPosts: React.FC<MyPostsType> = (props) => {
    let postsElement = props.posts.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

//добавление поста
    function onAddPost(values: AddPostFormType) {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3> My posts</h3>
            <AddPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElement}


            </div>
        </div>
    )
}

type AddPostFormType = {
    newPostText: string
}
const AddPostForm: React.FC<InjectedFormProps<AddPostFormType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field
            placeholder="Enter your post"
            name={"newPostText"}
            component={"textarea"}
        />
        <div>
            <button>Add post</button>
        </div>
    </form>
}
const AddPostFormRedux = reduxForm<AddPostFormType>({form: "profileAddPostForm"})(AddPostForm)

export default MyPosts