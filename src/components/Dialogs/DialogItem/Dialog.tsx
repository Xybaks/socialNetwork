import React from "react"
import s from "./../Dialogs.module.css"
import {NavLink} from "react-router-dom";
import {DialogsType} from "../../../redux/store";

// создание  фукции DialogItem, которая добавляет путь  через переменную path в зависимости от id

const DialogItem: React.FC<DialogsType> = (props) => {
    return (
        <div className={s.dialog}>
            <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
        </div>
    )
}


    export default DialogItem