import React from "react"
import {SendMessageActionCreator, UpdateNewMessageBodyActionCreator} from "../../redux/store";
import {StoreType} from "../../redux/redux-store";
import Dialogs from "./Dialogs";

type DialogsContainerType = {
    store:StoreType
}
const DialogsContainer: React.FC<DialogsContainerType> = (props) => {
let state = props.store.getState()
    //  функция добавления message
    const onSendMessageClick=()=> {
        if (state.dialogs.newMessageText!=="") {
            props.store.dispatch(SendMessageActionCreator(state.dialogs.newMessageText))
        }
    }
// коллбэк  ввода message
    function onMessageChange (newText:string) {
        props.store.dispatch(UpdateNewMessageBodyActionCreator(newText))
    }
    return <Dialogs
       dialogsPage={props.store.getState().dialogs}
    onMessageChange={onMessageChange}
    onSendMessageClick={onSendMessageClick}
    />
}

export default DialogsContainer