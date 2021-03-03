import {ActionTypes, ProfilePageType} from "./store";

export const ADD_POST = "ADD-POST"
export const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
export const SET_USER_PROFILE = "SET-USER-PROFILE"

export type ProfileType = {
    aboutMe: string
    contacts: {
        facebook: string
        github: string
        instagram: string
        mainLink: string
        twitter: string
        vk: string
        website: string
        youtube: string
    }
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: {
        large: string | undefined
        small: string | undefined
    }
    userId: number
}

let initialState = {
    posts: [
        {id: 1, message: "Hello", likesCount: 1},
        {id: 2, message: "How hi your IT", likesCount: 5},
        {id: 3, message: "new meat in our garden", likesCount: 11},
        {id: 4, message: "hey", likesCount: 1},
        {id: 5, message: "YO", likesCount: 1}
    ],
    newPostText: "",
    profile: null
}
export const profileReducer = (state: ProfilePageType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case ADD_POST: //добавление функции добавления поста в компоненту Profile
        {

            if (state.newPostText.replace(/\s/g, '') !== "") {
                return {
                    ...state,
                    posts: [{id: 5, message: state.newPostText, likesCount: 0},...state.posts],
                    newPostText: ""
                };
            }
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

        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        default: // возврат по дефолту (по идее никогда не пригодится)
            return state
    }
}
// добавление типов action для страницы profile
export type AddPostActionType = ReturnType<typeof addPostActionCreator>
export type UpdateNewPostTextType = ReturnType<typeof updateNewPostActionCreator>
export type setUserProfileType = ReturnType<typeof setUserProfile>

// добавление  ActionCreator-в для для страницы profile
//добавление постов
export const addPostActionCreator = (postText: string) =>
    ({type: ADD_POST, newPostText: postText}) as const
//обновление текста  нового поста  newPostText в state
export const updateNewPostActionCreator = (newText: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: newText})as const
export const setUserProfile = (profile: ProfileType) =>
    ({type: SET_USER_PROFILE, profile}as const)