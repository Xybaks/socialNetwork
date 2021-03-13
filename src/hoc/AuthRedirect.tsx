import {Redirect} from "react-router-dom";
import React, {ComponentType} from "react";
import {RootReduxStateType} from "../redux/redux-store";
import {connect} from "react-redux";

type MapStatePropsType={
    isAuth:boolean
}

const MapStateToProps=(state:RootReduxStateType):MapStatePropsType=>{
    return {
        isAuth:state.auth.isAuth
    }
}

export function AuthRedirect<T>(Component:ComponentType<T>) {
    // редирект на страница логина, если не зарегистрирован куками
    const RedirectComponent = (props: MapStatePropsType) => {
        let {isAuth, ...restProps} = props

        if (!isAuth) return <Redirect to='/login'/>
        return <Component {...restProps as T}/>
    }
    let ConnectedRedirectComponent=connect(MapStateToProps)(RedirectComponent)
    return ConnectedRedirectComponent
}