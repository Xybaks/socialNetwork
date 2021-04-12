import {ActionTypes} from "./store";
import {authAPI, ResultCodesEnum} from "../api/api";
import {ThunkType} from "./usersReducer";
import {FormAction, stopSubmit} from "redux-form";
import {ThunkDispatch} from "redux-thunk";
import {RootReduxStateType} from "./redux-store";


export const SET_USER_DATA = "SOCIAL-NETWORK/AUTH-REDUCER/SET-USER-DATA"


export type AuthStateType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

// начальные значения. нужны, чтобы передавать состояния части  state для его инициализации через reducer в общий стор
let initialState: AuthStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}
//  редюсер для redux-store для  изменения части стэйта
//!! FormAction - типизация для диспатча ошибки редакс-форм, в ActionTypes ее НЕ СУЕМ!!! только в санку!
export const authReducer = (state: AuthStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload,
            }
        }
        default:
            return state
    }
}
// добавление типов  для action
export type SetAuthUserDataActionType = ReturnType<typeof setAuthUserData>


export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {id, email, login, isAuth}
} as const)


// ThunkCreator  - запрашивет на сервер, залолгинены ли мы. Если да, то меняет через диспатч стэйт
//!! FormAction - типизация для диспатча ошибки редакс-форм, в ActionTypes ее НЕ СУЕМ!!!
export const getAuthUserData = (): ThunkType =>
    async (dispatch: ThunkDispatch<RootReduxStateType, unknown, ActionTypes>) => {
        const response = await authAPI.me()

        if (response.data.resultCode === ResultCodesEnum.Success) { // проверка на то, что ответ пришел правильно
            let {id, email, login} = response.data.data // деструктуризация приходящих данных
            dispatch(setAuthUserData(id, email, login, true))
        }
    }
// ThunkCreator  - отправляет  на сервер логин
export const login = (email: string, password: string, rememberme: boolean): ThunkType =>
    async (dispatch: ThunkDispatch<RootReduxStateType, unknown, ActionTypes | FormAction>) => {
        const response = await authAPI.login(email, password, rememberme)

        if (response.resultCode === ResultCodesEnum.Success) { // проверка на то, что ответ пришел правильно
            dispatch(getAuthUserData())
        } else {
            let ErrorMessageFromServer = response.messages.length > 0 ? response.messages[0] : "some error"
            dispatch(stopSubmit("login", {_error: ErrorMessageFromServer}));
        }
    }


// ThunkCreator  - отправляет  на сервер запрос на удаление  логина
export const logout = (): ThunkType =>
    async (dispatch: ThunkDispatch<RootReduxStateType, unknown, ActionTypes>) => {
        const response = await authAPI.logout()

        if (response.data.resultCode === ResultCodesEnum.Success) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }