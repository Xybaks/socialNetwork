import React from "react"
import s from "./../Dialogs.module.css"
import {messagesType} from "../../../redux/state";


const Message: React.FC<messagesType> =(props) => {
    return (
        <div className={s.dialog}> {props.message}</div>
    )
}

    export default Message