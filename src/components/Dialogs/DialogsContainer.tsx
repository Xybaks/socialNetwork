import {DialogsPageType} from "../../redux/store";
import Dialogs from "./Dialogs";
import {RootReduxStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {SendMessageActionCreator, UpdateNewMessageBodyActionCreator} from "../../redux/dialogsReducer";

type MapStatePropsType = {
    dialogsPage: DialogsPageType
    isAuth:boolean
}

type MapDispatchPropsType = {
    onMessageChange: (newMessageText: string) => void
    onSendMessageClick: () => void
}
// функция получения из redux-store части стэйта (dialogsPage)
let mapStateToProps = (state: RootReduxStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth:state.auth.isAuth
    }
}
// получение через dispatch функций управления части стэйта redux-store
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        onMessageChange: (newMessageText:string) => {
            dispatch(UpdateNewMessageBodyActionCreator(newMessageText));
        },
        //  функция добавления message
        onSendMessageClick: () => {
            dispatch(SendMessageActionCreator())
        }
    }
}
const DialogsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, RootReduxStateType>
(mapStateToProps,mapDispatchToProps)(Dialogs);



// const DialogsContainer = () => {
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
//     return (
//         <StoreContext.Consumer>
//             {store => {
//                 let state = store.getState().dialogs
//                 //  функция добавления message
//                 const onSendMessageClick = () => {
//                     if (state.newMessageText !== "") {
//                         store.dispatch(SendMessageActionCreator(state.newMessageText))
//                     }
//                 }
//                 // коллбэк  ввода message
//                 const onMessageChange=(newText: string)=> {
//                     store.dispatch(UpdateNewMessageBodyActionCreator(newText))
//                 }
//
//                 return (
//                     <Dialogs
//                         dialogsPage={state}
//                         onMessageChange={onMessageChange}
//                         onSendMessageClick={onSendMessageClick}
//                     />)
//             }
//             }
//         </StoreContext.Consumer>)
// }
export default DialogsContainer