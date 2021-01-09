export type postsType = {
    id: number
    message: string
    likesCount: number
}
export type profilePageType = {
    posts: Array<postsType>
    newPostText: string
}
export type dialogsType = {
    id: number
    name: string
}
export type messagesType = {
    id: number
    message: string
}
export type dialogsPageType = {
    dialogs: Array<dialogsType>
    messages: Array<messagesType>
}
export type friendType = {
    id: number
    name: string
    avatarWay: string
}
export type SideBarType = {
    friends: Array<friendType>
}
export type rootStateType = {
    profilePage: profilePageType
    dialogsPage: dialogsPageType,
    sidebar: SideBarType
}
export type StoreType = {
    _state: rootStateType,
    addPost: () => void
    updateNewPostText: (newText: string) => void
    subscribe: (observer: () => void) => void
    _render: () => void
    getState:() => rootStateType
}

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
    //добавление функции добовления поста в компоненту Profile
    addPost() {
        if (this._state.profilePage.newPostText !=="")
        {const newPost: postsType = {
            id: 5,
            message: this._state.profilePage.newPostText,
            likesCount: 0
        }
        this._state.profilePage.posts.push(newPost)
        this._state.profilePage.newPostText = ""
        this._render()}
    },
    //   обновление текста, введенного в MyPosts
    updateNewPostText(newText) {
        this._state.profilePage.newPostText = newText
        this._render()

    },
    //    паттерн наблюдатель - функция renderTree переопределена, вызывается та функция,
    // что передана как observer
    subscribe(observer) {
        this._render = observer //
    },
    // перерисовка  state
    _render() {
        console.log(this._state)
    },
    //геттер для state
    getState(){
        return this._state
    }
}
//добавление функции добовления поста в компоненту Profile


export default store