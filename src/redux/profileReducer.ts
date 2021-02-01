import {ActionTypes, ProfilePageType} from "./store";

export const ADD_POST = "ADD-POST"
export const UPDATE_NEW_POST_TEXT ="UPDATE-NEW-POST-TEXT"



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
        case ADD_POST: //добавление функции добавления поста в компоненту Profile
        {

            if (state.newPostText.replace(/\s/g, '') !== ""){
            return {
                ...state,
                posts: [...state.posts,{id: 5, message: state.newPostText, likesCount: 0}],
                newPostText: ""
            };}
            return state
        }

        case UPDATE_NEW_POST_TEXT: //   обновление текста, введенного в MyPosts
            if (action.newText !== "") {
                //возврат копии state для того, чтобы connect видел , что state менялся
                return {
                    ...state,
                    newPostText: action.newText
                }
            }
            return state;
        default: // возврат по дефолту (по идее никогда не пригодится)
            return state
    }
}
// добавление типов action для страницы profile
export type AddPostActionType = ReturnType<typeof addPostActionCreator>
export type UpdateNewPostTextType = ReturnType<typeof updateNewPostActionCreator>
// добавление  ActionCreator-в для для страницы profile
//добавление постов
export const addPostActionCreator = (postText: string) =>
    ({type: ADD_POST, newPostText: postText}) as const
//обновление текста  нового поста  newPostText в state
export const updateNewPostActionCreator = (newText: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: newText}) as const