import {ActionTypes, RootStateType} from "./store";
import {usersAPI} from "../api/api";
import {ThunkAction,ThunkDispatch} from "redux-thunk";
import {RootReduxStateType} from "./redux-store";


export const TOGGLE_FOLLOW = "TOGGLE-FOLLOW"
export const SET_USERS = "SET-USERS"
export const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
export const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT"
export const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING"
export const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE-IS-FOLLOWING-PROGRESS"


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
    isFetching: boolean
    followingProgress: Array<number> // массив id юзеров, по которым не завершены запросы на сервер
}

// начальные значения. нужны, чтобы передавать состояния части  state для его инициализации
let initialState: UsersPageType = {
    users: [],
    pageSizes: 5,
    totalUsersCount: 100,
    currentPage: 1,
    isFetching: false,
    followingProgress: []
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
        //отображение крутилки
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        // подписка /отписка от пользователя
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingProgress: action.isFetching
                    ? [...state.followingProgress, action.userId]
                    : state.followingProgress.filter(id => id !== action.userId)
            }
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
export type FollowingInProgressActionType = ReturnType<typeof toggleFollowingInProgress>
//добавлены ActionCreator'ы для
// toggleFollow - подписка/отписка от пользователя
//setUsers- выбор списка users
//setCurrentPage -  переключение страниц
//setTotalUsersCount - выбор количества users на 1 странице
//toggleIsFetching - для отображения процесса загрузки
//toggleFollowingInProgress - для деактивации кнопки во время обрадотки сервером подписки-отписки
export const toggleFollow = (userId: number, userFollowed: boolean) => ({
    type: TOGGLE_FOLLOW,
    userId,
    userFollowed
}) as const
export const setUsers = (users: Array<UserType>) => ({type: SET_USERS, users} as const)
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const)
export const setTotalUsersCount = (totalUsersCount: number) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const)
export const toggleFollowingInProgress = (isFetching: boolean, userId: number) => (
    {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId} as const)

export type ThunkType = ThunkAction<void, RootReduxStateType, unknown, ActionTypes>
// ThunkCreator - функция, возвращающая thunk с обращением к серверу для
// requestUsers -  получения списка пользователей
//follow - подписку на пользователя
//unfollow - отписку на пользователя
export const requestUsers = (page: number, pageSizes: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(page))
        usersAPI.getUsers(page, pageSizes).then(data => {
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(data.items))
                dispatch(setTotalUsersCount(data.totalCount))
            }
        )
    }
}
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleFollowingInProgress(true, userId))
        usersAPI.followUser(userId)
            .then(response => {
                    if (response.resultCode === 0)
                        dispatch(toggleFollow(userId, true))
                    dispatch(toggleFollowingInProgress(false, userId))
                }
            )
    }
}
export const unFollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleFollowingInProgress(true, userId))
        usersAPI.unfollowUser(userId)
            .then(response => {
                    if (response.resultCode === 0)
                        dispatch(toggleFollow(userId, false))
                    dispatch(toggleFollowingInProgress(false, userId))
                }
            )
    }
}
