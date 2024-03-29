import {ActionTypes, DialogsPageType} from "./store";

export const SEND_MESSAGE ="SOCIAL-NETWORK/DIALOGS-REDUCER/SEND-MESSAGE"

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

        case SEND_MESSAGE: // добавление сообщения в компоненте  Dialogs через DialogsContainer
            if (action.newMessageBody !== "") {
                //возврат копии state для того, чтобы connect видел , что state менялся
                return {
                    ...state,
                    messages: [...state.messages, {id: 8, message: action.newMessageBody}],
                }
            }
            return state;
        default:
            return state
    }
}

// добавление типов action для страницы Dialogs
export type SendMessageActionType = ReturnType<typeof sendMessage >
// добавление  ActionCreator-в для для страницы Dialogs
//добавление сообщения
export const sendMessage = (newMessageBody:string)=>({type: SEND_MESSAGE,newMessageBody}) as const
//обновление сообщения для переменной newMessageText в стэйте

