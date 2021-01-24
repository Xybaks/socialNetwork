import {ActionTypes, DialogsPageType} from "./store";

// начальные значения. нужны, чтобы передавать состояния части  state для его инициализации
let initialState={
newMessageText: "",
    dialogs: [
    {id: 1, name: "Dimych"},
    {id: 2, name: "Andrey"},
    {id: 3, name: "Sveta"},
    {id: 4, name: "Sasha"},
    {id: 5, name: "Victor"},
    {id: 6, name: "Valera"}],
    messages: [
    {id: 1, message: "Hi"},
    {id: 2, message: "How is your IT"},
    {id: 3, message: "Hi"},
    {id: 4, message: "hey"},
    {id: 5, message: "YO"},
    {id: 6, message: "YO"}
]}
export const dialogsReducer = (state: DialogsPageType =initialState, action: ActionTypes) => {
    switch (action.type) {
        case "ADD-MESSAGE": // добавление сообщения в компоненте  Dialogs
            if (action.newMessageText !== "") {
                state.newMessageText = action.newMessageText
            }
            return state;
        case "SEND-MESSAGE": // добавление сообщения в компоненте  Dialogs
            if (action.sendMessageText !== "") {
                state.messages.push({id: 6, message: action.sendMessageText})
                state.newMessageText = ""
            }
            return state;

        default:
            return state
    }
}