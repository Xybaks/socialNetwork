import React from "react"
import {connect} from "react-redux";
import Users from "./Users";
import {
    toggleFollow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleIsFetching,
    UserType,
} from "../../redux/usersReducer";
import {RootReduxStateType} from "../../redux/redux-store";
import axios from "axios";
import PreLoader from "../common/PreLoader/PreLoader";


type UsersContainerPropsType = {
    isFetching: boolean
    users: Array<UserType>
    pageSizes: number
    currentPage: number
    totalUsersCount: number
    toggleFollow: (usersId: number, userFollowed: boolean) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
}
//типизация стэйта для отдачи в пропсы
type MapStatePropsType = {
    users: Array<UserType>
    pageSizes: number
    currentPage: number
    totalUsersCount: number
    isFetching: boolean
}
//типизация функций для отдачи в пропсы
type MapDispatchPropsType = {
    toggleFollow: (usersId: number, userFollowed: boolean) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
}
// функция получения из redux-store части стэйта (dialogsPage)
let mapStateToProps = (state: RootReduxStateType) => {
    return {
        users: state.usersPage.users,
        pageSizes: state.usersPage.pageSizes,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}


// в обучающих целях сделал UsersContainer классовым компонентом
class UsersContainer extends React.Component<UsersContainerPropsType, {}> {
    componentDidMount() {
        if (this.props.users.length === 0) {
            this.props.toggleIsFetching(true)
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${
                    this.props.pageSizes}`, {
                    withCredentials: true // withCredentials -свойство, определяющее , можно ли давать кросплатформеннне запросы
                }
            ).then(response => {
                    this.props.toggleIsFetching(false)
                    this.props.setUsers(response.data.items)
                    this.props.setTotalUsersCount(response.data.totalCount)
                }
            )
        }

    }

    onPageClick = (page: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(page)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSizes}`, {
            withCredentials: true
        }).then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
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
                    />}
            </>)
    }
}

// при экспорте идет оборачивание контейнера еще 1 контейнером,mapDispatchToProps заменен объектом, параметрами которого сделаны
// actionCreator'ы,но т.к. они имеют то же название, что и коллбэки, то присваивание опускается

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootReduxStateType>
(mapStateToProps, {toggleFollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching})
(UsersContainer)