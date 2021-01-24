import React from "react"
import s from "./Dialogs.module.css"
import {BrowserRouter} from "react-router-dom";
import DialogItem from "./DialogItem/Dialog";
import Message from "./Message/Message";
import {
    ActionTypes,
    DialogsPageType, SendMessageActionCreator,
    UpdateNewMessageBodyActionCreator,
} from "../../redux/store";

type DialogsType = {
    state: DialogsPageType
    dispatch:(action:ActionTypes) => void

}
const Dialogs: React.FC<DialogsType> = (props) => {
    let dialogsElements = props.state.dialogs.map(d => < DialogItem id={d.id} name={d.name}/>)
    let messagesElements = props.state.messages.map(m => <Message id={m.id} message={m.message}/>)


    const onSendMessageClick=()=> {
        if (props.state.newMessageText!=="") {
            props.dispatch(SendMessageActionCreator(props.state.newMessageText))
        }
    }

    function onMessageChange (e:  React.ChangeEvent<HTMLTextAreaElement>) {
        let newText:string=  e.currentTarget.value
        props.dispatch(UpdateNewMessageBodyActionCreator(newText))
    }
    return (
        <BrowserRouter>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    {messagesElements}
                    <div>
                        <textarea
                            placeholder= "Enter your message"
                            value={props.state.newMessageText}
                            onChange={onMessageChange}
                            /></div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>

            </div>
        </BrowserRouter>
    )
}

export default Dialogs