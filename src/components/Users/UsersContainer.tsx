import React from "react"
import {connect} from "react-redux";
import Users from "./Users";
import {UsersPageType, UserType} from "../../redux/store";
import {Dispatch} from "redux";
import {FollowUserActionCreator, SetUsersActionCreator} from "../../redux/usersReducer";
import {RootReduxStateType} from "../../redux/redux-store";


//типизация стэйта для отдачи в пропсы
type MapStatePropsType = {
   users:Array<UserType>
}
//типизация функций для отдачи в пропсы
type MapDispatchPropsType = {
    toggleFollow: (usersId:number)=>void
    setUsers:(users:Array<UserType>)=>void
}
// функция получения из redux-store части стэйта (dialogsPage)
let mapStateToProps = (state: RootReduxStateType) => {
    console.log(state)
    return {
       users:state.usersPage.users
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        toggleFollow: (usersId:number)=>{
            dispatch(FollowUserActionCreator(usersId))
        },
        setUsers:(users:Array<UserType>)=>{
            dispatch(SetUsersActionCreator(users))
        }
    }
}

const UsersContainer =  connect<MapStatePropsType, MapDispatchPropsType, {}, RootReduxStateType>
(mapStateToProps,mapDispatchToProps)(Users)
export default UsersContainer