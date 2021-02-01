import {ActionTypes, AddPostActionType, PostsType, ProfilePageType, UpdateNewPostTextType} from "./store";


let initialState = {
    posts: [
        {id: 1, message: "Hello", likesCount: 1},
        {id: 2, message: "How hi your IT", likesCount: 5},
        {id: 3, message: "new meat in our garden", likesCount: 11},
        {id: 4, message: "hey", likesCount: 1},
        {id: 5, message: "YO", likesCount: 1}
    ],
    newPostText: ""
}
export const profileReducer = (state: ProfilePageType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case "ADD-POST": //добавление функции добавления поста в компоненту Profile
        {
            if (state.newPostText.replace(/\s/g, '') !== ""){
            return {
                ...state,
                posts: [...state.posts,{id: 5, message: state.newPostText, likesCount: 0}],
                newPostText: ""
            };}
            return state
        }
            // if (state.newPostText !== "") {
            //     return {
            //         ...state,
            //         posts: [state.posts, {id:5, message: action.newPostText , likesCount: 1}],
            //         newPostText: ""
                //}
            // }
            // return state;
        case "UPDATE-NEW-POST-TEXT": //   обновление текста, введенного в MyPosts
            if (action.newText !== "") {
                //возврат копии state для того, чтобы connect видел , что state менялся
                return {
                    ...state,
                    newPostText: action.newText
                }
            }
            return state;
        default:
            return state
    }
}

export const addPostActionCreator = (postText: string): AddPostActionType =>
    ({type: "ADD-POST", newPostText: postText}) as const
export const UpdateNewPostActionCreator = (newText: string): UpdateNewPostTextType =>
    ({type: "UPDATE-NEW-POST-TEXT", newText: newText}) as const