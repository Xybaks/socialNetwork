import React from "react"
import {connect} from "react-redux";
import Users from "./Users";
import {
    toggleFollow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleIsFetching,
    UserType, toggleFollowingInProgress,
} from "../../redux/usersReducer";
import {RootReduxStateType} from "../../redux/redux-store";
import PreLoader from "../common/PreLoader/PreLoader";
import {usersAPI} from "../../api/api";


type UsersContainerPropsType = {
    isFetching: boolean
    users: Array<UserType>
    followingProgress: Array <number>
    pageSizes: number
    currentPage: number
    totalUsersCount: number
    toggleFollow: (usersId: number, userFollowed: boolean) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingInProgress:(isFetching: boolean, userId: number) =>void
}
//типизация стэйта для отдачи в пропсы
type MapStatePropsType = {
    users: Array<UserType>
    pageSizes: number
    currentPage: number
    totalUsersCount: number
    isFetching: boolean
    followingProgress:Array <number>

}
//типизация функций для отдачи в пропсы
type MapDispatchPropsType = {
    toggleFollow: (usersId: number, userFollowed: boolean) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingInProgress:(isFetching: boolean, userId: number) =>void
}
// функция получения из redux-store части стэйта (dialogsPage)
let mapStateToProps = (state: RootReduxStateType) => {
    return {
        users: state.usersPage.users,
        pageSizes: state.usersPage.pageSizes,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingProgress: state.usersPage.followingProgress
    }
}


// в обучающих целях сделал UsersContainer классовым компонентом
class UsersContainer extends React.Component<UsersContainerPropsType, {}> {
    componentDidMount() {
        if (this.props.users.length === 0) {
            this.props.toggleIsFetching(true)
            usersAPI.getUsers(this.props.currentPage, this.props.pageSizes).then(data => {
                    this.props.toggleIsFetching(false)
                    this.props.setUsers(data.items)
                    this.props.setTotalUsersCount(data.totalCount)
                }
            )
        }

    }

    onPageClick = (page: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(page)
        usersAPI.getUsers(page, this.props.pageSizes).then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
            }
        )
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
                        toggleFollow={this.props.toggleFollow}
                        setUsers={this.props.setUsers}
                        onPageClick={this.onPageClick}
                        followingProgress={this.props.followingProgress}
                        toggleFollowingInProgress={this.props.toggleFollowingInProgress}
                    />}
            </>)
    }
}

// при экспорте идет оборачивание контейнера еще 1 контейнером,mapDispatchToProps заменен объектом, параметрами которого сделаны
// actionCreator'ы,но т.к. они имеют то же название, что и коллбэки, то присваивание опускается

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootReduxStateType>
(mapStateToProps, {toggleFollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching,toggleFollowingInProgress})
(UsersContainer)