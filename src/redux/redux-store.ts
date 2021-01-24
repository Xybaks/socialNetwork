import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {dialogsReducer} from "./dialogsReducer";
import {sidebarReducer} from "./sidebarReducer";

export type StoreType=typeof store

let reducers= combineReducers({
         profile: profileReducer, // добавление поста в компонент Profile
         dialogs: dialogsReducer,// добавление сообщения в компонент Dialogs
        sidebar:sidebarReducer//   перерисовка друзей в Navbar
})
let store = createStore(reducers)
export default store