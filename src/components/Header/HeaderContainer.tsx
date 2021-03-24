import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {RootReduxStateType} from "../../redux/redux-store";
import {getAuthUserData, logout} from "../../redux/authReducer";



export type HeaderContainerPropsType =MapStatePropsType&MapDispatchPropsType

let mapStateToProps = (state: RootReduxStateType):MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})
class HeaderContainer extends React.Component<HeaderContainerPropsType,{}>{
    componentDidMount() {
        this.props.getAuthUserData()

    }
    render(){
        return <Header {...this.props} />
    }
}

type MapStatePropsType={
    isAuth: boolean
    login: string | null
}
type MapDispatchPropsType={
    getAuthUserData:() => void
    logout:()=>void
}


export default connect <MapStatePropsType, MapDispatchPropsType, {}, RootReduxStateType>(mapStateToProps,
    {getAuthUserData,logout})(HeaderContainer);