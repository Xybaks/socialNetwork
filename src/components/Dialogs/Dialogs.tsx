import React from "react"
import s from "./Dialogs.module.css"
import {BrowserRouter} from "react-router-dom";
import DialogItem from "./DialogItem/Dialog";
import Message from "./Message/Message";
import {DialogsPageType} from "../../redux/store";

type DialogsType = {
    onMessageChange: (newText: string) => void
    onSendMessageClick: () => void
    dialogsPage: DialogsPageType
}
const Dialogs: React.FC<DialogsType> = (props) => {
    let dialogsPage = props.dialogsPage
    //отрисовка диалогов (пользователей)
    let dialogsElements = dialogsPage.dialogs.map(d => < DialogItem id={d.id} name={d.name}/>)
    // отрисовка сообщений
    let messagesElements = dialogsPage.messages.map(m => <Message id={m.id} message={m.message}/>)

    const onSendMessageClick = () => {
        props.onSendMessageClick()
    }

    function onMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        props.onMessageChange(e.currentTarget.value)
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
                            placeholder="Enter your message"
                            value={props.dialogsPage.newMessageText}
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