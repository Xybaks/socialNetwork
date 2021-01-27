import React from "react"
import {SendMessageActionCreator, UpdateNewMessageBodyActionCreator} from "../../redux/store";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext"



const DialogsContainer = () => {
// let state = props.store.getState()
    //  функция добавления message
    // const onSendMessageClick=()=> {
    //     if (state.dialogs.newMessageText!=="") {
    //         props.store.dispatch(SendMessageActionCreator(state.dialogs.newMessageText))
    //     }
// }
// коллбэк  ввода message
//     function onMessageChange (newText:string) {
//         props.store.dispatch(UpdateNewMessageBodyActionCreator(newText))
//     }
    return (
        <StoreContext.Consumer>
            {store => {
                let state = store.getState().dialogs
                //  функция добавления message
                const onSendMessageClick = () => {
                    if (state.newMessageText !== "") {
                        store.dispatch(SendMessageActionCreator(state.newMessageText))
                    }
                }
                // коллбэк  ввода message
                const onMessageChange=(newText: string)=> {
                    store.dispatch(UpdateNewMessageBodyActionCreator(newText))
                }

                return (
                    <Dialogs
                        dialogsPage={state}
                        onMessageChange={onMessageChange}
                        onSendMessageClick={onSendMessageClick}
                    />)
            }
            }
        </StoreContext.Consumer>)
}
export default DialogsContainer