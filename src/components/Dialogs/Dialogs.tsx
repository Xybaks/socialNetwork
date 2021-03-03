import React from "react"
import s from "./Dialogs.module.css"
import {BrowserRouter, Redirect} from "react-router-dom";
import DialogItem from "./DialogItem/Dialog";
import Message from "./Message/Message";
import {DialogsPageType} from "../../redux/store";

type DialogsType = {
    onMessageChange: (newText: string) => void
    onSendMessageClick: () => void
    dialogsPage: DialogsPageType
    isAuth:boolean
}
const Dialogs: React.FC<DialogsType> = (props) => {
    let dialogsPage = props.dialogsPage
    //отрисовка диалогов (пользователей)
    let dialogsElements = dialogsPage.dialogs.map(d => < DialogItem key={d.id} id={d.id} name={d.name}/>)
    // отрисовка сообщений
    let messagesElements = dialogsPage.messages.map(m => <Message key={m.id} id={m.id} message={m.message}/>)

    const onSendMessageClick = () => {
        props.onSendMessageClick()
    }

    function onMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        props.onMessageChange(e.currentTarget.value)
    }


    // если не залогинен поьлзователь, то вызываем редирект и перенапрапвляем на авторизацию!
    if (!props.isAuth) return <Redirect to='/login'/>

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