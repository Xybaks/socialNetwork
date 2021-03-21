import {DialogsPageType} from "../../redux/store";
import Dialogs from "./Dialogs";
import {RootReduxStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {connect} from "react-redux";
import {sendMessage} from "../../redux/dialogsReducer";
import {AuthRedirect} from "../../hoc/AuthRedirect";
import React from "react";

type MapStatePropsType = {
    dialogsPage: DialogsPageType
}

type MapDispatchPropsType = {
    sendMessage: (newMessageBody: string) => void
}
// функция получения из redux-store части стэйта (dialogsPage)
let mapStateToProps = (state: RootReduxStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
// получение через dispatch функций управления части стэйта redux-store
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        //  функция добавления message
        sendMessage: (newMessageBody: string) => {
            dispatch(sendMessage(newMessageBody))
        }
    }
}
// const DialogsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, RootReduxStateType>
// (mapStateToProps,mapDispatchToProps)(Dialogs);
export default compose<React.ComponentType>(AuthRedirect) // HOC  для ереадресации на страницу логина, если не авторизирован
    (connect<MapStatePropsType, MapDispatchPropsType, {}, RootReduxStateType>(mapStateToProps, mapDispatchToProps)
        // получение данных с редакс-стора для прокидывания в целевлй компонент
        (Dialogs)) // целевой компонент
