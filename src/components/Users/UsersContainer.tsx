import React from "react"
import {connect} from "react-redux";
import Users from "./Users";
import {
    UserType, getUses, follow, unFollow,
} from "../../redux/usersReducer";
import {RootReduxStateType} from "../../redux/redux-store";
import PreLoader from "../common/PreLoader/PreLoader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingProgress,
    getIsFetching,
    getPageSizes,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";


type UsersContainerPropsType = {
    isFetching: boolean
    users: Array<UserType>
    followingProgress: Array<number>
    pageSizes: number
    currentPage: number
    totalUsersCount: number
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    getUses: (currentPage: number, pageSizes: number) => void
}
//типизация стэйта для отдачи в пропсы
type MapStatePropsType = {
    users: Array<UserType>
    pageSizes: number
    currentPage: number
    totalUsersCount: number
    isFetching: boolean
    followingProgress: Array<number>

}
//типизация функций для отдачи в пропсы
type MapDispatchPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    getUses: (currentPage: number, pageSizes: number) => void
}
// функция получения из redux-store части стэйта (dialogsPage)
let mapStateToProps = (state: RootReduxStateType) => {
    return {
        users: getUsers(state),
        pageSizes: getPageSizes(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingProgress: getFollowingProgress(state)
    }
}

// в обучающих целях сделал UsersContainer классовым компонентом
class UsersContainer extends React.Component<UsersContainerPropsType, {}> {
    componentDidMount() {
        this.props.getUses(this.props.currentPage, this.props.pageSizes)
    }

    onPageClick = (page: number) => {
        this.props.getUses(page, this.props.pageSizes)
    }
    render = () => {
        return (
            <>
                {this.props.isFetching
                    ? <PreLoader/>
                    : <Users
                        users={this.props.users}
                        pageSizes={this.props.pageSizes}
                        currentPage={this.props.currentPage}
                        totalUsersCount={this.props.totalUsersCount}
                        unFollow={this.props.unFollow}
                        follow={this.props.follow}
                        onPageClick={this.onPageClick}
                        followingProgress={this.props.followingProgress}
                    />}
            </>)
    }
}

// экспорт по дефолту обернут
export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, RootReduxStateType>
    (mapStateToProps, {follow, unFollow, getUses}))
(UsersContainer)