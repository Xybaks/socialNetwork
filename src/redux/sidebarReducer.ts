import {ActionTypes, SidebarType} from "./store";
let initialState=
     {
        friends: [
            {id: 0, name: "Vasia", avatarWay: "../../pictures/friend1.png"},
            {id: 1, name: "Ilia", avatarWay: "../../pictures/friend2.jpg"},
            {id: 2, name: "Kate", avatarWay: "../../pictures/friend3.jpg"}]
    }
export const sidebarReducer = (state: SidebarType =initialState, action: ActionTypes) => {
    switch (action.type) {
        case "UPDATE-SIDEBAR": // добавление сообщения в компоненте  Dialogs

            return state;

        default:
            return state
    }
}