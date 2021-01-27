import {profileReducer} from "./profileReducer";
import {dialogsReducer} from "./dialogsReducer";


export type PostsType = {
    id: number
    message: string
    likesCount: number
}
export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
}
export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    message: string
}
export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageText: string
}
export type FriendType = {
    id: number
    name: string
    avatarWay: string
}
export type SidebarType = {
    // friends: Array<FriendType>
}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType,
    sidebar: SidebarType
}
export type StoreType = {
    _state: RootStateType,
    subscribe: (observer: () => void) => void
    _render: () => void
    getState: () => RootStateType
    dispatch: (action: ActionTypes) => void
}
export type AddPostActionType = {
    type: "ADD-POST"
    newPostText: string
}
export type UpdateNewPostTextType = {
    type: "UPDATE-NEW-POST-TEXT"
    newText: string
}
export type UpdateSidebarActionType = {
    type: "UPDATE-SIDEBAR"
    newFiendId: string
}
export type AddMessageActionType = {
    type: "ADD-MESSAGE"
    newMessageText: string
}
export type SendMessageActionType = {
    type: "SEND-MESSAGE"
    sendMessageText: string
}

export type ActionTypes = AddPostActionType | UpdateNewPostTextType |
    AddMessageActionType | SendMessageActionType|UpdateSidebarActionType
export const addPostActionCreator = (postText: string): AddPostActionType =>
    ({type: "ADD-POST", newPostText: postText}) as const
export const UpdateSidebarActionType = (FriendId: string): UpdateSidebarActionType =>
    ({type: "UPDATE-SIDEBAR", newFiendId: FriendId}) as const
export const UpdateNewPostActionCreator = (newText: string): UpdateNewPostTextType =>
    ({type: "UPDATE-NEW-POST-TEXT", newText: newText}) as const
export const UpdateNewMessageBodyActionCreator = (newMessageText: string): AddMessageActionType =>
    ({type: "ADD-MESSAGE", newMessageText: newMessageText}) as const
export const SendMessageActionCreator = (sendMessageText: string): SendMessageActionType =>
    ({type: "SEND-MESSAGE", sendMessageText: sendMessageText}) as const

let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hello", likesCount: 1},
                {id: 2, message: "How hi your IT", likesCount: 5},
                {id: 3, message: "new meat in our garden", likesCount: 11},
                {id: 4, message: "hey", likesCount: 1},
                {id: 5, message: "YO", likesCount: 1}
            ],
            newPostText: ""
        },
        dialogsPage: {
            newMessageText: "",
            dialogs: [
                {id: 1, name: "Dimych"},
                {id: 2, name: "Andrey"},
                {id: 3, name: "Sveta"},
                {id: 4, name: "Sasha"},
                {id: 5, name: "Victor"},
                {id: 6, name: "Valera"}],
            messages: [
                {id: 1, message: "Hi"},
                {id: 2, message: "How is your IT"},
                {id: 3, message: "Hi"},
                {id: 4, message: "hey"},
                {id: 5, message: "YO"},
                {id: 6, message: "YO"}
            ]
        },
        sidebar: {
            friends: [
                {id: 0, name: "Vasia", avatarWay: "../../pictures/friend1.png"},
                {id: 1, name: "Ilia", avatarWay: "../../pictures/friend2.jpg"},
                {id: 2, name: "Kate", avatarWay: "../../pictures/friend3.jpg"}]
        }
    },
    // перерисовка  state
    _render() {
        console.log(this._state)
    },
    //    паттерн наблюдатель - функция renderTree переопределена, вызывается та функция,
    // что передана как observer
    subscribe(observer) {
        this._render = observer //
    },
    //геттер для state
    getState() {
        return this._state
    },
    dispatch(action: ActionTypes) {
        // if (action.type === "ADD-POST") { //добавление функции добовления поста в компоненту Profile
        //     if (this._state.profilePage.newPostText !== "") {
        //         const newPost: PostsType = {
        //             id: 5,
        //             message: action.newPostText,
        //             likesCount: 0
        //         }
        //         this._state.profilePage.posts.push(newPost)
        //         this._state.profilePage.newPostText = ""
        //         this._render()
        //     }
        // } else if (action.type === "UPDATE-NEW-POST-TEXT") { //   обновление текста, введенного в MyPosts
        //     this._state.profilePage.newPostText = action.newText
        //     this._render()

        profileReducer(this._state.profilePage, action) // добавление поста в компонент Profile
        dialogsReducer(this._state.dialogsPage, action)// добавление сообщения в компонент Dialogs
        this._render()
    }
}

export default store