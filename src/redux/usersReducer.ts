import {ActionTypes} from "./store";

export const TOGGLE_FOLLOW = "TOGGLE-FOLLOW"
export const SET_USERS = "SET-USERS"
export const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
export const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT"
export const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING"


export type UserType = {
    name: string,
    id: number,
    uniqueUrlName: string
    photos: {
        small: string
        large: string
    },
    status: string,
    followed: boolean,

}
export type UsersPageType = {
    users: Array<UserType>
    pageSizes: number
    totalUsersCount: number
    currentPage: number
    isFetching:boolean
}

// начальные значения. нужны, чтобы передавать состояния части  state для его инициализации
let initialState: UsersPageType = {
    users: [],
    pageSizes: 5,
    totalUsersCount: 100,
    currentPage: 2,
    isFetching:false
}
//  редюсер для redux-store для  изменения части стэйта (dialogsPage)
export const usersReducer = (state: UsersPageType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case TOGGLE_FOLLOW:  //смена  followed на обратное значение у конкретного user
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: action.userFollowed}
                    }
                    return u
                })
            }

        //добавление в state новых users
        case SET_USERS: {
            return {...state, users: [...action.users]}
        }
        //изменение в state текущей страницы отбражение пользователей
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        default:
            return state
    }
}
// добавление типов action для страницы users
export type FollowUserActionType = ReturnType<typeof toggleFollow>
export type SetUserActionType = ReturnType<typeof setUsers>
export type SetCurrentPageActionType = ReturnType<typeof setCurrentPage>
export type SetTotalUsersCountActionType = ReturnType<typeof setTotalUsersCount>
export type ToggleIsFetchingActionType = ReturnType<typeof toggleIsFetching>
//следить не следить за человеком из списка users
export const toggleFollow = (userId: number,userFollowed:boolean) => ({type: TOGGLE_FOLLOW,userId,userFollowed}) as const
//первоначальное добавление users:
export const setUsers = (users: Array<UserType>) => ({type: SET_USERS, users}) as const
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage}) as const
export const setTotalUsersCount = (totalUsersCount: number) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount}) as const
export const toggleIsFetching = (isFetching: boolean) => ({type:TOGGLE_IS_FETCHING , isFetching}) as const

