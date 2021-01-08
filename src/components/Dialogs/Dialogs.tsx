import React from "react"
import s from "./Dialogs.module.css"
import {BrowserRouter} from "react-router-dom";
import DialogItem from "./DialogItem/Dialog";
import Message from "./Message/Message";
import {dialogsPageType} from "../../redux/state";

type DialogsType = {
    state: dialogsPageType

}
const Dialogs: React.FC<DialogsType> = (props) => {

    let dialogsElements = props.state.dialogs.map(d => < DialogItem id={d.id} name={d.name}/>)
    let messagesElements = props.state.messages.map(m => <Message id={m.id} message={m.message}/>)
    let newMessageElement = React.createRef<HTMLTextAreaElement>()

    function addMessage() {
        if (newMessageElement.current) {
            let text = newMessageElement.current.value
            alert(text)
        }
    }

    return (
        <BrowserRouter>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    {messagesElements}
                    <div><textarea ref={newMessageElement}> </textarea></div>
                    <div>
                        <button onClick={addMessage}>Add post</button>
                    </div>
                </div>

            </div>
        </BrowserRouter>
    )
}

export default Dialogs