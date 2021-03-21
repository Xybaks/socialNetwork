import React from "react"
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/Dialog";
import Message from "./Message/Message";
import {DialogsPageType} from "../../redux/store";
import {reduxForm,Field, InjectedFormProps} from "redux-form";

type DialogsType = {
    sendMessage: (newMessageBody:string) => void
    dialogsPage: DialogsPageType
}
const Dialogs: React.FC<DialogsType> = (props) => {
    let dialogsPage = props.dialogsPage
    //отрисовка диалогов (пользователей)
    let dialogsElements = dialogsPage.dialogs.map(d => < DialogItem key={d.id} id={d.id} name={d.name}/>)
    // отрисовка сообщений
    let messagesElements = dialogsPage.messages.map(m => <Message key={m.id} id={m.id} message={m.message}/>)

    const addNewMessage = (values: AddMessageFormType) => {
        props.sendMessage(values.newMessageBody);
    }

    debugger
    return (
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    {messagesElements}
                    <AddMessageFormRedux onSubmit={addNewMessage}/>
                </div>
            </div>
    )
}

type AddMessageFormType={
    newMessageBody: string
}

const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormType>> = (props) => {
   return <form onSubmit={props.handleSubmit}>
        <Field
            placeholder="Enter your message"
            name={"newMessageBody"}
            component={"textarea"}
              />
        <div>
            <button>Send</button>
        </div>
    </form>
}

// создаем обертку с reduxForm, называя  "dialogAddMessageForm"
const AddMessageFormRedux=reduxForm<AddMessageFormType>({form:"dialogAddMessageForm"})(AddMessageForm)

export default Dialogs