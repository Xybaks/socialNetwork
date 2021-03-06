import {ActionTypes, ProfilePageType} from "./store";
import {profileAPI,} from "../api/api";
import {ThunkType} from "./usersReducer";


export const ADD_POST = "ADD-POST"
export const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
export const SET_USER_PROFILE = "SET-USER-PROFILE"
export const SET_STATUS = "SET-STATUS"

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
    profile: null,
    status:""
}
export const profileReducer = (state: ProfilePageType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case ADD_POST: //добавление функции добавления поста в компоненту Profile
        {

            if (state.newPostText.replace(/\s/g, '') !== "") {
                return {
                    ...state,
                    posts: [{id: 5, message: state.newPostText, likesCount: 0}, ...state.posts],
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
        case SET_STATUS:{
            return {...state, status:action.status}
        }
        default: // возврат по дефолту (по идее никогда не пригодится)
            return state
    }
}
// добавление типов action для страницы profile
export type AddPostActionType = ReturnType<typeof addPostActionCreator>
export type UpdateNewPostTextType = ReturnType<typeof updateNewPostActionCreator>
export type SetUserProfileType = ReturnType<typeof setUserProfile>
export type SetStatusType = ReturnType<typeof setStatus>

// добавление  ActionCreator-в для для страницы profile
//добавление постов
export const addPostActionCreator = (postText: string) =>
    ({type: ADD_POST, newPostText: postText}) as const
//обновление текста  нового поста  newPostText в state
export const updateNewPostActionCreator = (newText: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: newText}) as const
// выбор отображаемого профайла
export const setUserProfile = (profile: ProfileType) =>
    ({type: SET_USER_PROFILE, profile} as const)
// задание статуса в профайле
export const setStatus = (status: string) =>
    ({type: SET_STATUS, status} as const)
//
// type ThunkType = ThunkAction<void, RootReduxStateType, unknown, ActionTypes>;

// ThunkCreator - функция, возвращающая thunk с обращением к серверу для  получения информации о пользователе
export const getUserProfile = (userId: number): ThunkType => {
    return async (dispatch) => {
        profileAPI.getProfile(userId).then(response => {
                dispatch(setUserProfile(response.data))
            }
        )
    }
}
// ThunkCreator - функция, возвращающая thunk с обращением к серверу для  получения информации о статусе пользователя
//по его id
export const getStatus = (userId: number): ThunkType => {
    return (dispatch) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatus(response.data));
            })
    }
};

export const updateStatus = (status: string): ThunkType => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status));
                }
            })
    }
}