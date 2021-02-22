import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {dialogsReducer} from "./dialogsReducer";
import {usersReducer} from "./usersReducer";
import {authReducer} from "./authReducer";
// тип для общего store в redux-store
export type StoreType=typeof store
// создание общего reducer-а из отдельных, написанных для каждой страницы
let reducers= combineReducers({
         profilePage: profileReducer, // добавление поста в компонент Profile
         dialogsPage: dialogsReducer, // добавление сообщения в компонент Dialogs
            usersPage:usersReducer,
    auth: authReducer
})
// тип для общего _state в redux-store
export type RootReduxStateType = ReturnType<typeof reducers>

let store = createStore(reducers)
// export type RootReduxStateType= {
//     profilePage: ProfilePageType,
//     dialogsPage: DialogsPageType}
// @ts-ignore
window.store = store
export default store