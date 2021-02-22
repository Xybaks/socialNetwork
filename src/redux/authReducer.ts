import {ActionTypes} from "./store";

export const SET_USER_DATA = "SET-USER-DATE"


export type AuthStateType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

// начальные значения. нужны, чтобы передавать состояния части  state для его инициализации
let initialState: AuthStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}
//  редюсер для redux-store для  изменения части стэйта
export const authReducer = (state: AuthStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {...state,
                ...action.data,
                isAuth: true
            }
        }
        default:
            return state
    }
}
// добавление типов  для action
export type setAuthUserDataActionType = ReturnType<typeof setAuthUserData>

//следить не следить за человеком из списка users
export const setAuthUserData = (id: number, email: string, login: string) => ({type: SET_USER_DATA,data:{ id, email, login}}as const)

// export const toggleIsFetching = (isFetching: boolean) => ({type:TOGGLE_IS_FETCHING , isFetching}) as const

