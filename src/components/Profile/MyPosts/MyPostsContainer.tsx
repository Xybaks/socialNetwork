import React from 'react';
import { addPostActionCreator,UpdateNewPostActionCreator} from "../../../redux/store";
import {StoreType} from "../../../redux/redux-store";
import MyPosts from "./MyPosts";


type MyPostsContainerType={
    store:StoreType
}

const MyPostsContainer: React.FC<MyPostsContainerType> = (props) => {

//добавление поста
    function addSomePost(newPostText: string) {
        props.store.dispatch(addPostActionCreator(newPostText))
    }
// колбэк набранного текста в новом посте
    function onPostChange (newText:string) {
        props.store.dispatch(UpdateNewPostActionCreator(newText))
    }


    return (
        <MyPosts
            posts={props.store.getState().profile.posts}
            newPostText={props.store.getState().profile.newPostText}
            addPost={addSomePost}
            UpdateNewPostText={onPostChange}
        />
    )
}

export default MyPostsContainer