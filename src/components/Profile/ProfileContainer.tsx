import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, ProfileType, getStatus, updateStatus} from "../../redux/profileReducer";
import {RootReduxStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {AuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";

// типизациятия стэйта для коннекта
type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: number | null,
    isAuth: boolean
}
// типизация диспатча в функцию для коннекта
type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
}
//общая типизация
let mapStateToProps = (state: RootReduxStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
})
//типизация на выходе connect'a
export type ConnectPropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: number
    isAuth: boolean
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
}
type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & ConnectPropsType
type PathParamsType = {
    userId?: string
}

//  снова классовый компонент для учебных целей
class ProfileContainer extends React.Component<ProfileContainerPropsType, {}> {

    componentDidMount() {
// авторизирован ли пользователь
        let userId = Number(this.props.match.params.userId);
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login") // перенаправление на станицу логина, если не зарегистрирован
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    render() {
        return <Profile
            {...this.props}
            profile={this.props.profile}
            status={this.props.status}
            updateStatus={this.props.updateStatus}/>
    }
}

//  с помощью функции compose  мы можем несколько оберток делать друг на друга
export default compose<React.ComponentType>(
    AuthRedirect,// редирект на страницу логина, если не заавторизован
    connect<MapStatePropsType, MapDispatchPropsType, {}, RootReduxStateType>(mapStateToProps,
        {getUserProfile, getStatus, updateStatus}),
    withRouter)  // получение данных из редаксовского стора
    (ProfileContainer)// целефой комопнент для compose


