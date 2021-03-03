import {ActionTypes} from "./store";
import {authAPI} from "../api/api";
import {ThunkType} from "./usersReducer";


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
//
export const setAuthUserData = (id: number, email: string, login: string) => (
    {type: SET_USER_DATA,data:{ id, email, login}}as const)

export const getAuthUserData = (): ThunkType => {
    return async (dispatch) => {
        authAPI.me()
            .then(response => {
            if (response.data.resultCode === 0) { // проверка на то, что ответ пришел правильно
                let {id, email, login} = response.data.data // деструктуризация приходящих данных
                dispatch(setAuthUserData(id, email, login))
            }
        })
    }
}


