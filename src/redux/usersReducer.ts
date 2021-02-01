import {ActionTypes, UsersPageType, UserType} from "./store";

export const TOGGLE_FOLLOW = "TOGGLE-FOLLOW"
export const SET_USERS = "SET-USERS"

// начальные значения. нужны, чтобы передавать состояния части  state для его инициализации
let initialState: UsersPageType = {
    users:[]
    //     [{
    //         id: 1,
    //         photoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Wikipe-tan_avatar.png",
    //         followed: false,
    //         fullName: "Dima K",
    //         status: "I'm the best",
    //         location: {city: "Minsk", country: "Belarus"}
    //     },
    //         {
    //             id: 2,
    //             photoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Wikipe-tan_avatar.png",
    //             followed: true,
    //             fullName: "Sasha G",
    //             status: "I'm the most clever man forever",
    //             location: {city: "Moscow", country: "Russia"}
    //         },
    //         {
    //             id: 3,
    //             photoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Wikipe-tan_avatar.png",
    //             followed: false,
    //             fullName: "Angrey X",
    //             status: "I'm coding...",
    //             location: {city: "Kiev", country: "Ukraine"}
    //         }
    //     ]
}
//  редюсер для redux-store для  изменения части стэйта (dialogsPage)
export const usersReducer = (state: UsersPageType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case TOGGLE_FOLLOW:  //смена  followed на обратное значение у конкретного user
            return {
                ...state,
                users: state.users.map(u =>
                {
                    if (u.id === action.userId) {
                        return {...u, followed: !u.followed}
                    }
                    return u
                })
            }

        //добавление в state новых users
        case SET_USERS: {
            return {...state, users: [...state.users, ...action.users]}
        }
        default:
            return state
    }
}
// добавление типов action для страницы users
export type FollowUserActionType = ReturnType<typeof FollowUserActionCreator>
export type SetUserActionType = ReturnType<typeof SetUsersActionCreator>

//следить не следить за человеком из списка users
export const FollowUserActionCreator = (userId: number) => ({type: TOGGLE_FOLLOW, userId: userId}) as const
//первоначальное добавление users:
export const SetUsersActionCreator = (users: Array<UserType>) => ({type: SET_USERS, users}) as const