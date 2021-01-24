import React from "react"
import s from "./../Dialogs.module.css"
import {MessagesType} from "../../../redux/store";


const Message: React.FC<MessagesType> =(props) => {
    return (
        <div className={s.dialog}> {props.message}</div>
    )
}

    export default Message