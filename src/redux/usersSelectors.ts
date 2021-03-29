import {RootReduxStateType} from "./redux-store";

//селектор выбора из стэйта
//  пользователей
export const getUsers = (state:RootReduxStateType) => state.usersPage.users
// размера страниц
export const getPageSizes = (state:RootReduxStateType) => state.usersPage.pageSizes
// общего колисества пользователей
export const getTotalUsersCount = (state:RootReduxStateType) => state.usersPage.totalUsersCount
// текущей страницы
export const getCurrentPage= (state:RootReduxStateType) => state.usersPage.currentPage
// идет ли загрузка
export const getIsFetching= (state:RootReduxStateType) => state.usersPage.isFetching
// идет ли загрузка
export const getFollowingProgress= (state:RootReduxStateType) => state.usersPage.followingProgress