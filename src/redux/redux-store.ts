import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {dialogsReducer} from "./dialogsReducer";

export type StoreType=typeof store

let reducers= combineReducers({
         profilePage: profileReducer, // добавление поста в компонент Profile
         dialogsPage: dialogsReducer,// добавление сообщения в компонент Dialogs
})

export type RootReduxStateType = ReturnType<typeof reducers>

let store = createStore(reducers)
// export type RootReduxStateType= {
//     profilePage: ProfilePageType,
//     dialogsPage: DialogsPageType}


export default store