import React from 'react';
import {addPostActionCreator, UpdateNewPostActionCreator} from "../../../redux/store";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";


const MyPostsContainer = () => {
// const state = store.getState()
//добавление поста
//     function addSomePost(newPostText: string) {
//         props.store.dispatch(addPostActionCreator(newPostText))
//     }
// // колбэк набранного текста в новом посте
//     function onPostChange (newText:string) {
//         props.store.dispatch(UpdateNewPostActionCreator(newText))
//     }

    return (
        <StoreContext.Consumer>
            {store => {
                let state = store.getState().profile
                const addSomePost = (newPostText: string) => {
                    store.dispatch(addPostActionCreator(newPostText))
                }
                // колбэк набранного текста в новом посте
                const onPostChange = (newText: string) => {
                    store.dispatch(UpdateNewPostActionCreator(newText))
                }

                return (
                    <MyPosts
                        posts={state.posts}
                        newPostText={state.newPostText}
                        addPost={addSomePost}
                        UpdateNewPostText={onPostChange}
                    />)
            }
            }
        </StoreContext.Consumer>
    )
}

export default MyPostsContainer