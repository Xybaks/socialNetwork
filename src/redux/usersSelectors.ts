import {RootReduxStateType} from "./redux-store";
import {createSelector} from "reselect";
import {UserType} from "./usersReducer";

//селектор выбора из стэйта
//  пользователей
//  для предотвращения лишних  перерисовок испоьлзуется связка : простым селектором getUsers получаем необохимый  кусок стэйта,
// с помощью библиотеки "reselect" создаем  через createSelector необходимый селектор getUserSuperSelector  с логикой
// фильтр для примера, чтобы показать, что могут быть действаия с куском стэйта. по факту в приложении нам не нужен
export const getUsers = ((state:RootReduxStateType) => state.usersPage.users)
export const getUserSuperSelector=createSelector(getUsers,(users:Array<UserType>)=>users.filter(u=>true))
// размера страниц
export const getPageSizes = (state:RootReduxStateType) => state.usersPage.pageSizes
// общего количества пользователей
export const getTotalUsersCount = (state:RootReduxStateType) => state.usersPage.totalUsersCount
// текущей страницы
export const getCurrentPage= (state:RootReduxStateType) => state.usersPage.currentPage
// идет ли загрузка
export const getIsFetching= (state:RootReduxStateType) => state.usersPage.isFetching
// идет ли загрузка
export const getFollowingProgress= (state:RootReduxStateType) => state.usersPage.followingProgress