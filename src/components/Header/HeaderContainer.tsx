import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {RootReduxStateType} from "../../redux/redux-store";
import { setAuthUserData} from "../../redux/authReducer";


export type HeaderContainerPropsType =MapStatePropsType&MapDispatchPropsType

let mapStateToProps = (state: RootReduxStateType):MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})
class HeaderContainer extends React.Component<HeaderContainerPropsType,{}>{
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        }).then(response => {
            if (response.data.resultCode === 0) { // проверка на то, что ответ пришел правильно
                let {id, email, login} = response.data.data; // деструктуризация приходящих данных
                this.props.setAuthUserData(id, email, login);
            }
        })

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
    setAuthUserData:(id: number, email: string, login: string) => void
}


export default connect <MapStatePropsType, MapDispatchPropsType, {}, RootReduxStateType>(mapStateToProps,
    {setAuthUserData})(HeaderContainer);