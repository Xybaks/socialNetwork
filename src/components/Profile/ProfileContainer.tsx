import React from 'react';
import axios from "axios";
import Profile from "./Profile";
import {connect} from "react-redux";
import {ProfileType, setUserProfile} from "../../redux/profileReducer";
import {RootReduxStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter } from 'react-router-dom';
// короче, наворочено много. Сначала вызывается контейнернаы комопнент, в котором идет через коннект соединение со стором
//потом идет контейнерный комопнент WithUrlDataContainerComponent, который с помощью withRouter оборачивает ProfileContainer
// потом идет контейнерный комопнент ProfileContainer, который делает запрос на сервер  и вызывает Profile
// типизациятия стэйта для коннекта
type MapStatePropsType={
    profile:ProfileType|null

}
// типизация диспатча в функцию для коннекта
type MapDispatchPropsType={
    setUserProfile:(profile:ProfileType) => void
}
//общая типизация
let mapStateToProps = (state: RootReduxStateType):MapStatePropsType => ({
       profile:state.profilePage.profile
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
            axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`).then(response => {
                    this.props.setUserProfile(response.data)
                console.log(this.props.setUserProfile(response.data))
                }
            )
    }
    render(){
        return <Profile {...this.props} profile={this.props.profile}/>
}
}

// при экспорте идет оборачивание контейнера еще 1 контейнером,mapDispatchToProps заменен объектом, параметрами которого сделаны
// actionCreator'ы,но т.к. они имеют то же название, что и коллбэки, то присваивание опускается

let WithUrlDataContainerComponent = withRouter(ProfileContainer);
export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootReduxStateType>(mapStateToProps,
     {setUserProfile})(WithUrlDataContainerComponent)
