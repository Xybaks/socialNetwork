import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, ProfileType} from "../../redux/profileReducer";
import {RootReduxStateType} from "../../redux/redux-store";
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';

// типизациятия стэйта для коннекта
type MapStatePropsType={
    profile:ProfileType|null
    isAuth:boolean

}
// типизация диспатча в функцию для коннекта
type MapDispatchPropsType={
    getUserProfile:(userId: number) => void
}
//общая типизация
let mapStateToProps = (state: RootReduxStateType):MapStatePropsType => ({
       profile:state.profilePage.profile,
    isAuth:state.auth.isAuth
})
//типизация на выходе connect'a
export type ConnectPropsType =MapStatePropsType&MapDispatchPropsType
type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & ConnectPropsType
type PathParamsType = {
    userId?: string
}

//  снова классовый компонент для учебных целей
class ProfileContainer  extends React.Component<ProfileContainerPropsType,{}>{

    componentDidMount() {
// авторизирован ли пользователь
        let userId= this.props.match.params.userId
        if (!userId){
            userId="14520"
        }
this.props.getUserProfile(+userId)
    }
    render(){
        // редирект на страница логина, если не зарегистрирован куками
        if (!this.props.isAuth) return <Redirect to='/login'/>
        return <Profile {...this.props} profile={this.props.profile}/>
}
}

// при экспорте идет оборачивание контейнера еще 1 контейнером,mapDispatchToProps заменен объектом, параметрами которого сделаны
// actionCreator'ы,но т.к. они имеют то же название, что и коллбэки, то присваивание опускается

let WithUrlDataContainerComponent = withRouter(ProfileContainer);
export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootReduxStateType>(mapStateToProps,
     {getUserProfile})(WithUrlDataContainerComponent)
