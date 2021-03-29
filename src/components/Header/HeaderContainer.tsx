import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {RootReduxStateType} from "../../redux/redux-store";
import {logout} from "../../redux/authReducer";


export type HeaderContainerPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: RootReduxStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

class HeaderContainer extends React.Component<HeaderContainerPropsType, {}> {
    render() {
        return <Header {...this.props} />
    }
}


type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}
type MapDispatchPropsType = {
    logout: () => void
}


export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootReduxStateType>(mapStateToProps,
    {logout})(HeaderContainer);