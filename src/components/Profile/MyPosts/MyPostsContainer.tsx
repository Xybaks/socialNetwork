import React from 'react';
import MyPosts from "./MyPosts";
import {addPostActionCreator, updateNewPostActionCreator} from "../../../redux/profileReducer";
import {PostsType} from "../../../redux/store";
import {RootReduxStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";
import {connect} from "react-redux";



//типизация стэйта для отдачи в пропсы
type MapStatePropsType = {
    posts: Array<PostsType>
    newPostText: string
}
// типизация функций для отдачи в пропсы
type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
    updateNewPostText : (newText: string) =>void
}
// функция получения из redux-store части стэйта (dialogsPage)
let mapStateToProps = (state: RootReduxStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText:state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        //функция добавления поста в профайле
        addPost: (newPostText: string)=> {
            dispatch(addPostActionCreator(newPostText))
        },
        //  функция обновления вводимого текста в профайле
        updateNewPostText: (newText: string) => {
            dispatch(updateNewPostActionCreator(newText))
        }
    }
}

const MyPostsContainer = connect <MapStatePropsType, MapDispatchPropsType, {}, RootReduxStateType>
(mapStateToProps,mapDispatchToProps)(MyPosts);


export default MyPostsContainer