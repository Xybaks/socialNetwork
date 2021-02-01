import {ActionTypes, AddMessageActionType, DialogsPageType, SendMessageActionType} from "./store";

// начальные значения. нужны, чтобы передавать состояния части  state для его инициализации
let initialState = {
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
    ]
}
//  редюсер для redux-store для  изменения части стэйта (dialogsPage)
export const dialogsReducer = (state: DialogsPageType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case "ADD-MESSAGE": // добавление сообщения в компоненте  Dialogs  через DialogsContainer
            if (action.newMessageText !== "") {
                //возврат копии state для того, чтобы connect видел , что state менялся
                return {...state,
                    newMessageText: action.newMessageText}
            }
            return state;
        case "SEND-MESSAGE": // добавление сообщения в компоненте  Dialogs через DialogsContainer
            if (state.newMessageText !== "") {
                //возврат копии state для того, чтобы connect видел , что state менялся
                return {
                    ...state,
                    messages: [...state.messages, {id: 6, message: state.newMessageText}],
                    newMessageText: ""
                }
            }
            return state;
        default:
            return state
    }
}

export const UpdateNewMessageBodyActionCreator = (newMessageText: string): AddMessageActionType =>
    ({type: "ADD-MESSAGE", newMessageText: newMessageText}) as const
export const SendMessageActionCreator = (): SendMessageActionType =>
    ({type: "SEND-MESSAGE"}) as const