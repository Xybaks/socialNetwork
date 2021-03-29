import {ActionTypes} from "./store";
import {ThunkType} from "./usersReducer";
import {ThunkDispatch} from "redux-thunk";
import {RootReduxStateType} from "./redux-store";
import {getAuthUserData} from "./authReducer";


export const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS"


export type AuthStateType = {
    initialized: boolean
}

// начальные значения. нужны, чтобы передавать состояния части  state для его инициализации через reducer в общий стор
let initialState: AuthStateType = {
    initialized: false
}
//  редюсер для redux-store для  изменения части стэйта
//!! FormAction - типизация для диспатча ошибки редакс-форм, в ActionTypes ее НЕ СУЕМ!!! только в санку!
export const appReducer = (state: AuthStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state
    }
}
// добавление типов  для action
export type SetInitializedActionType = ReturnType<typeof initializedSuccess>

//AC
export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS} as const)
// ThunkCreator  - запрашивет на сервер, залолгинены ли мы. Если да, то меняет через диспатч стэйт
// !! FormAction - типизация для диспатча ошибки редакс-форм, в ActionTypes ее НЕ СУЕМ!!!
export const initializeApp = (): ThunkType => {
    return (dispatch: ThunkDispatch<RootReduxStateType, unknown, ActionTypes>) => {
        const promise = dispatch(getAuthUserData())
        Promise.all([promise])
            .then(() => dispatch(initializedSuccess()))
    }
}

// ThunkCreator  - отправляет  на сервер логин
// export const login = (email: string, password: string, rememberme: boolean): ThunkType => {
//     return (dispatch:ThunkDispatch<RootReduxStateType, unknown, ActionTypes | FormAction>) => {
//         authAPI.login(email, password, rememberme)
//             .then(response => {
//                 debugger
//                 if (response.resultCode === ResultCodesEnum.Success) { // проверка на то, что ответ пришел правильно
//                     dispatch(getAuthUserData())
//                 } else {
//                     let ErrorMessageFromServer = response.messages.length > 0 ? response.messages[0] : "some error"
//                     dispatch(stopSubmit("login", {_error: ErrorMessageFromServer}));
//                 }
//             })
//     }
// }
//
// // ThunkCreator  - отправляет  на сервер запрос на удаление  логина
// export const logout = (): ThunkType => {
//     return (dispatch) => {
//         authAPI.logout()
//             .then(response => {
//                 if (response.data.resultCode === ResultCodesEnum.Success) {
//                     dispatch(setAuthUserData(null, null, null, false));
//                 }
//             })
//     }
// }
