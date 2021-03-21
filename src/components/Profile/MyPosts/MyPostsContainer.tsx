import React from 'react';
import MyPosts from "./MyPosts";
import {addPostActionCreator} from "../../../redux/profileReducer";
import {PostsType} from "../../../redux/store";
import {RootReduxStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";
import {connect} from "react-redux";


//типизация стэйта для отдачи в пропсы
type MapStatePropsType = {
    posts: Array<PostsType>
}
// типизация функций для отдачи в пропсы
type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}
// функция получения из redux-store части стэйта (dialogsPage)
let mapStateToProps = (state: RootReduxStateType) => {
    return {
        posts: state.profilePage.posts,
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        //функция добавления поста в профайле
        addPost: (newPostText: string) => {
            dispatch(addPostActionCreator(newPostText))
        }
    }
}

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, RootReduxStateType>
(mapStateToProps, mapDispatchToProps)(MyPosts);


export default MyPostsContainer